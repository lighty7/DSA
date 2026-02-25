# DSA Practice Environment

This practice workspace lets learners select a **concept**, **difficulty**, and **question number**, then run tests instantly.

## Quick Start

```bash
# Launch interactive menu (Recommended!)
python3 practice/common/harness.py -m

# Or use direct commands
python3 practice/common/harness.py -c arrays_strings -d easy -q 1
```

## Usage Options

| Flag | Short | Description |
|------|-------|--------------|
| `--menu` | `-m` | Launch interactive menu |
| `--concept` | `-c` | Concept folder name |
| `--difficulty` | `-d` | easy, medium, or hard |
| `--question` | `-q` | Question number |
| `--list` | `-l` | List available questions |
| `--all` | `-a` | Run all questions |

## Examples

```bash
# List all questions for a concept
python3 practice/common/harness.py -c arrays_strings -l

# Run a specific question
python3 practice/common/harness.py -c arrays_strings -d easy -q 1

# Run all easy questions
python3 practice/common/harness.py -c arrays_strings -d easy --all

# Run all questions for a concept
python3 practice/common/harness.py -c arrays_strings --all
```

## Available Concepts

- `arrays_strings`
- `linked_lists`
- `sliding_window`
- `trees_graphs`
- `dynamic_programming`

## Folder Structure

- `practice/common/harness.py`: Test runner (this is the main entry point)
- `practice/<concept>/questions/{easy,medium,hard}.md`: Problem statements
- `practice/<concept>/python/solutions.py`: Where you write your solutions
- `practice/<concept>/python/testcases/<difficulty>/qXXX.json`: Test cases

## Interactive Menu

Run `-m` to launch an interactive menu that guides you through:
1. Selecting a concept
2. Selecting difficulty
3. Selecting a question

The menu runs your selected test automatically and shows results.
