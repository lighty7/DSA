# DSA Practice Environment

This practice workspace lets learners select a **concept**, **difficulty**, and **question number**, then run tests instantly.

## Folder design

- `practice/common/harness.py`: shared runner that loads your solution and testcase library.
- `practice/<concept>/questions/{easy,medium,hard}.md`: problem statements and function mapping.
- `practice/<concept>/python/solutions.py`: where you code answers.
- `practice/<concept>/python/testcases/<difficulty>/qXXX.json`: testcase library used by runner.

## Run format

```bash
python practice/common/harness.py --concept <concept_name> --difficulty <easy|medium|hard> --question <number>
```

Example:

```bash
python practice/common/harness.py --concept arrays_strings --difficulty easy --question 1
```

Available concepts:
- arrays_strings
- linked_lists
- sliding_window
- trees_graphs
- dynamic_programming
