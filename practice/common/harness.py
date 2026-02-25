import argparse
import importlib.util
import json
from pathlib import Path
from typing import Any, Dict, List


def load_module(module_path: Path):
    spec = importlib.util.spec_from_file_location("user_solutions", module_path)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
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


def run_testcases(concept_dir: Path, difficulty: str, question_number: int) -> int:
    config_path = concept_dir / "python" / "config.json"
    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    qkey = str(question_number)
    if qkey not in config["questions"]:
        print(f"Question {question_number} is not configured for this concept.")
        return 1

    question = config["questions"][qkey]
    if question["difficulty"].lower() != difficulty.lower():
        print(
            f"Question {question_number} exists but is '{question['difficulty']}', not '{difficulty}'."
        )
        return 1

    testcase_path = concept_dir / "python" / "testcases" / difficulty.lower() / f"q{question_number:03d}.json"
    if not testcase_path.exists():
        print(f"Missing testcase file: {testcase_path}")
        return 1

    with open(testcase_path, "r", encoding="utf-8") as f:
        payload = json.load(f)

    solutions_path = concept_dir / "python" / "solutions.py"
    module = load_module(solutions_path)

    func_name = question["function"]
    if not hasattr(module, func_name):
        print(f"Function '{func_name}' not found in {solutions_path}")
        return 1

    fn = getattr(module, func_name)

    passed = 0
    total = len(payload["tests"])
    print(f"Running {concept_dir.name} | Q{question_number:03d}: {question['title']} ({difficulty.title()})")
    print("-" * 72)

    for idx, case in enumerate(payload["tests"], start=1):
        args = case["input"]
        expected = normalize(case["expected"])
        actual = normalize(fn(*args))

        if actual == expected:
            passed += 1
            status = "PASS"
        else:
            status = "FAIL"

        print(f"Test {idx}: {status}")
        if status == "FAIL":
            print(f"  input:    {args}")
            print(f"  expected: {expected}")
            print(f"  actual:   {actual}")

    print("-" * 72)
    print(f"Result: {passed}/{total} tests passed")
    return 0 if passed == total else 2


def main() -> None:
    parser = argparse.ArgumentParser(description="Run concept testcases by question number.")
    parser.add_argument("--concept", required=True, help="Concept folder name, e.g., arrays_strings")
    parser.add_argument("--difficulty", required=True, choices=["easy", "medium", "hard"])
    parser.add_argument("--question", required=True, type=int, help="Question number like 1, 101, 201")
    args = parser.parse_args()

    base = Path(__file__).resolve().parents[1]
    concept_dir = base / args.concept
    if not concept_dir.exists():
        print(f"Unknown concept: {args.concept}")
        raise SystemExit(1)

    raise SystemExit(run_testcases(concept_dir, args.difficulty, args.question))


if __name__ == "__main__":
    main()
