import argparse
import importlib.util
import json
import os
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

try:
    import inquirer
    HAS_INQUIRER = True
except ImportError:
    HAS_INQUIRER = False

try:
    from termcolor import colored
    HAS_TERMCOLOR = True
except ImportError:
    HAS_TERMCOLOR = False


def color(text: str, color_name: Optional[str] = None, attrs: Optional[List[str]] = None) -> str:
    if HAS_TERMCOLOR and color_name:
        return colored(text, color_name, attrs=attrs or [])
    return text


def green(text: str) -> str:
    return color(text, 'green')


def red(text: str) -> str:
    return color(text, 'red')


def yellow(text: str) -> str:
    return color(text, 'yellow')


def cyan(text: str) -> str:
    return color(text, 'cyan')


def magenta(text: str) -> str:
    return color(text, 'magenta')


def bold(text: str) -> str:
    return color(text, None, attrs=['bold'])


BASE_DIR = Path(__file__).resolve().parents[1]
CONCEPTS = [
    "arrays_strings",
    "linked_lists",
    "sliding_window",
    "trees_graphs",
    "dynamic_programming",
]
DIFFICULTIES = ["easy", "medium", "hard"]


def load_config(concept_dir: Path) -> Dict:
    config_path = concept_dir / "python" / "config.json"
    if not config_path.exists():
        return {}
    with open(config_path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_module(module_path: Path):
    spec = importlib.util.spec_from_file_location("user_solutions", module_path)
    assert spec is not None, f"Could not load spec from {module_path}"
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None, f"No loader for {module_path}"
    spec.loader.exec_module(module)
    return module


def normalize(value: Any):
    if isinstance(value, tuple):
        return [normalize(v) for v in value]
    if isinstance(value, list):
        return [normalize(v) for v in value]
    if isinstance(value, dict):
        return {k: normalize(v) for k, v in value.items()}
    return value


def get_difficulty_emoji(difficulty: str) -> str:
    emojis = {"easy": "🟢", "medium": "🟡", "hard": "🔴"}
    return emojis.get(difficulty.lower(), "⚪")


def list_questions(concept: str, difficulty: Optional[str] = None) -> None:
    concept_dir = BASE_DIR / concept
    if not concept_dir.exists():
        print(red(f"Unknown concept: {concept}"))
        print(f"Available concepts: {', '.join(CONCEPTS)}")
        return

    config = load_config(concept_dir)
    if not config:
        print(red(f"No config found for {concept}"))
        return

    title = config.get("concept", concept).replace("_", " ").title()
    print(bold(f"\n{'=' * 60}"))
    print(bold(f"  {title}"))
    print(bold(f"{'=' * 60}\n"))

    questions_by_diff = {d: [] for d in DIFFICULTIES}
    for qnum, qinfo in config.get("questions", {}).items():
        d = qinfo.get("difficulty", "easy").lower()
        if d in questions_by_diff:
            questions_by_diff[d].append((qnum, qinfo))

    diffs_to_show = [difficulty.lower()] if difficulty and difficulty.lower() in DIFFICULTIES else DIFFICULTIES

    for diff in diffs_to_show:
        questions = questions_by_diff[diff]
        if not questions:
            continue
        
        diff_header = f"{get_difficulty_emoji(diff).upper()} {diff.upper()}"
        print(bold(f"\n{diff_header}"))
        print("-" * 40)
        
        for qnum, qinfo in sorted(questions, key=lambda x: int(x[0])):
            func_name = qinfo.get("function", "unknown")
            print(f"  {cyan(f'Q{qnum:>3}')}  {qinfo.get('title', 'Untitled'):<35} ({func_name})")

    print()


def run_single_test(concept_dir: Path, difficulty: str, question_number: int, verbose: bool = True) -> Tuple[int, int]:
    config = load_config(concept_dir)

    qkey = str(question_number)
    if qkey not in config["questions"]:
        print(red(f"Question {question_number} is not configured for this concept."))
        print(f"Run with --list to see available questions: {cyan('python harness.py -c {concept} --list')}")
        return 0, 0

    question = config["questions"][qkey]
    if question["difficulty"].lower() != difficulty.lower():
        print(red(f"Question {question_number} exists but is '{question['difficulty']}', not '{difficulty}'."))
        return 0, 0

    testcase_path = concept_dir / "python" / "testcases" / difficulty.lower() / f"q{question_number:03d}.json"
    if not testcase_path.exists():
        print(red(f"Missing testcase file: {testcase_path}"))
        return 0, 0

    with open(testcase_path, "r", encoding="utf-8") as f:
        payload = json.load(f)

    solutions_path = concept_dir / "python" / "solutions.py"
    module = load_module(solutions_path)

    func_name = question["function"]
    if not hasattr(module, func_name):
        print(red(f"Function '{func_name}' not found in {solutions_path}"))
        return 0, 0

    fn = getattr(module, func_name)

    passed = 0
    total = len(payload["tests"])
    
    if verbose:
        print(f"{cyan('Running')} {concept_dir.name} {bold('|')} {yellow(f'Q{question_number:03d}')}: {question['title']} {get_difficulty_emoji(difficulty)}({difficulty.title()})")
        print("-" * 60)

    for idx, case in enumerate(payload["tests"], start=1):
        args = case["input"]
        expected = normalize(case["expected"])
        
        try:
            actual = normalize(fn(*args))
        except Exception as e:
            actual = f"Error: {e}"
            expected = str(expected)

        if str(actual) == str(expected):
            passed += 1
            status = green("PASS")
        else:
            status = red("FAIL")

        if verbose:
            print(f"Test {idx}: {status}")
            if status == red("FAIL") or verbose and len(payload["tests"]) <= 5:
                print(f"  Input:    {args}")
                print(f"  Expected: {expected}")
                print(f"  Actual:   {actual}")

    if verbose:
        print("-" * 60)
    
    return passed, total


def run_all_tests(concept: str, difficulty: Optional[str] = None) -> Dict:
    concept_dir = BASE_DIR / concept
    if not concept_dir.exists():
        print(red(f"Unknown concept: {concept}"))
        return {"passed": 0, "total": 0, "failed": []}

    config = load_config(concept_dir)
    if not config:
        print(red(f"No config found for {concept}"))
        return {"passed": 0, "total": 0, "failed": []}

    print(bold(f"\n{'=' * 60}"))
    print(bold(f"  Running All Tests: {concept.replace('_', ' ').title()}"))
    if difficulty:
        print(bold(f"  Difficulty: {difficulty.title()}"))
    print(bold(f"{'=' * 60}\n"))

    results = {"passed": 0, "total": 0, "failed": []}

    for qnum, qinfo in config.get("questions", {}).items():
        diff = qinfo.get("difficulty", "easy").lower()
        
        if difficulty and diff != difficulty.lower():
            continue

        print(f"{cyan('→')} Running Q{qnum}: {qinfo.get('title', 'Untitled')} ({diff})...")
        passed, total = run_single_test(concept_dir, diff, int(qnum), verbose=False)
        
        results["total"] += total
        results["passed"] += passed
        
        if passed != total:
            results["failed"].append({
                "question": qnum,
                "title": qinfo.get("title"),
                "difficulty": diff,
                "passed": passed,
                "total": total
            })
            print(f"    {red('FAILED')} {passed}/{total} tests passed\n")
        else:
            print(f"    {green('PASSED')} {total}/{total} tests passed\n")

    return results


def interactive_menu() -> None:
    if not HAS_INQUIRER:
        interactive_menu_fallback()
        return

    questions = [
        inquirer.List('concept',
            message=bold("Select a concept"),
            choices=[(c.replace('_', ' ').title(), c) for c in CONCEPTS],
            carousel=True,
        ),
    ]
    answers = inquirer.prompt(questions)
    concept = answers['concept']

    concept_dir = BASE_DIR / concept
    config = load_config(concept_dir)

    questions_by_diff = {d: [] for d in DIFFICULTIES}
    for qnum, qinfo in config.get("questions", {}).items():
        d = qinfo.get("difficulty", "easy").lower()
        if d in questions_by_diff:
            questions_by_diff[d].append((qnum, qinfo))

    diff_choices = []
    for d in DIFFICULTIES:
        count = len(questions_by_diff[d])
        if count > 0:
            diff_choices.append((f"{d.title()} ({count} questions)", d))

    questions = [
        inquirer.List('difficulty',
            message=bold("Select difficulty"),
            choices=diff_choices,
            carousel=True,
        ),
    ]
    answers = inquirer.prompt(questions)
    difficulty = answers['difficulty']

    q_list = questions_by_diff[difficulty]
    q_choices = []
    for qnum, qinfo in q_list:
        q_choices.append((f"Q{qnum}: {qinfo.get('title', 'Untitled')}", qnum))

    questions = [
        inquirer.List('question',
            message=bold("Select a question"),
            choices=q_choices,
            carousel=True,
        ),
    ]
    answers = inquirer.prompt(questions)
    question_num = int(answers['question'])

    print()
    passed, total = run_single_test(concept_dir, difficulty, question_num)
    
    print()
    if passed == total:
        print(bold(green(f"\n✓ All {total} tests passed! Great job!")))
    else:
        print(bold(red(f"\n✗ Only {passed}/{total} tests passed. Keep trying!")))


def interactive_menu_fallback() -> None:
    print(bold(cyan("\n=== DSA Practice - Interactive Mode ===\n")))
    
    print(bold("Select a concept:"))
    for i, c in enumerate(CONCEPTS, 1):
        print(f"  {i}. {c.replace('_', ' ').title()}")
    
    while True:
        try:
            choice = int(input(f"\nEnter number (1-{len(CONCEPTS)}): "))
            if 1 <= choice <= len(CONCEPTS):
                concept = CONCEPTS[choice - 1]
                break
        except ValueError:
            pass
        print(red("Invalid choice. Try again."))
    
    concept_dir = BASE_DIR / concept
    config = load_config(concept_dir)
    
    questions_by_diff = {d: [] for d in DIFFICULTIES}
    for qnum, qinfo in config.get("questions", {}).items():
        d = qinfo.get("difficulty", "easy").lower()
        if d in questions_by_diff:
            questions_by_diff[d].append((qnum, qinfo))

    print(bold(f"\nSelect difficulty:"))
    diff_options = []
    for i, d in enumerate(DIFFICULTIES):
        count = len(questions_by_diff[d])
        if count > 0:
            print(f"  {len(diff_options) + 1}. {d.title()} ({count} questions)")
            diff_options.append(d)
    
    while True:
        try:
            choice = int(input(f"\nEnter number (1-{len(diff_options)}): "))
            if 1 <= choice <= len(diff_options):
                difficulty = diff_options[choice - 1]
                break
        except ValueError:
            pass
        print(red("Invalid choice. Try again."))
    
    q_list = questions_by_diff[difficulty]
    print(bold(f"\nSelect a question:"))
    for i, (qnum, qinfo) in enumerate(sorted(q_list, key=lambda x: int(x[0])), 1):
        print(f"  {i}. Q{qnum}: {qinfo.get('title', 'Untitled')}")
    
    while True:
        try:
            choice = int(input(f"\nEnter number (1-{len(q_list)}): "))
            if 1 <= choice <= len(q_list):
                question_num = int(q_list[choice - 1][0])
                break
        except ValueError:
            pass
        print(red("Invalid choice. Try again."))

    print()
    passed, total = run_single_test(concept_dir, difficulty, question_num)
    
    print()
    if passed == total:
        print(bold(green(f"\n✓ All {total} tests passed! Great job!")))
    else:
        print(bold(red(f"\n✗ Only {passed}/{total} tests passed. Keep trying!")))


def main() -> None:
    parser = argparse.ArgumentParser(
        description=bold(cyan("DSA Practice - Test Runner")),
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=bold("""
Examples:
  %(prog)s -m                           Launch interactive menu
  %(prog)s -c arrays_strings -l         List all questions
  %(prog)s -c arrays_strings -d easy    Run easy questions
  %(prog)s -c arrays_strings -q 1       Run question 1
  %(prog)s -c arrays_strings --all      Run all questions
  %(prog)s -c arrays_strings -d easy --all  Run all easy questions
        """)
    )

    parser.add_argument("-c", "--concept", help="Concept folder name")
    parser.add_argument("-d", "--difficulty", choices=DIFFICULTIES, help="Difficulty level")
    parser.add_argument("-q", "--question", type=int, help="Question number")
    parser.add_argument("-l", "--list", action="store_true", help="List available questions")
    parser.add_argument("-m", "--menu", action="store_true", help="Launch interactive menu")
    parser.add_argument("-a", "--all", action="store_true", help="Run all questions")

    args = parser.parse_args()

    if args.menu:
        interactive_menu()
        return

    if not args.concept:
        print(bold(cyan("\n=== DSA Practice ===\n")))
        print(f"Welcome! Use {yellow('-m')} to launch interactive menu:")
        print(f"  {green('python practice/common/harness.py -m')}\n")
        print(f"Or specify a concept:")
        print(f"  {green('python practice/common/harness.py -c arrays_strings --list')}")
        print(f"  {green('python practice/common/harness.py -c arrays_strings -q 1')}")
        print()
        parser.print_help()
        return

    concept = args.concept
    if concept not in CONCEPTS:
        print(red(f"Unknown concept: {concept}"))
        print(f"Available: {', '.join(CONCEPTS)}")
        print(f"\nUse {yellow('-m')} for interactive menu")
        return

    if args.list:
        list_questions(concept, args.difficulty)
        return

    if args.all:
        results = run_all_tests(concept, args.difficulty)
        print(bold(f"\n{'=' * 60}"))
        print(bold(f"  Summary: {green(results['passed'])}/{results['total']} tests passed"))
        
        if results["failed"]:
            print(bold(red(f"  Failed: {len(results['failed'])} questions")))
            for f in results["failed"]:
                print(f"    - Q{f['question']}: {f['title']} ({f['difficulty']})")
        
        print(bold(f"{'=' * 60}\n"))
        
        if results["failed"]:
            sys.exit(1)
        return

    if args.question is None:
        print(red("Please specify a question number with -q or --question"))
        print(f"Use {yellow('--list')} to see available questions")
        return

    if args.difficulty is None:
        print(red("Please specify a difficulty with -d or --difficulty"))
        return

    concept_dir = BASE_DIR / concept
    passed, total = run_single_test(concept_dir, args.difficulty, args.question)

    if total > 0:
        print()
        if passed == total:
            print(bold(green(f"✓ All {total} tests passed!")))
        else:
            print(bold(red(f"✗ Only {passed}/{total} tests passed")))
            sys.exit(1)


if __name__ == "__main__":
    main()
