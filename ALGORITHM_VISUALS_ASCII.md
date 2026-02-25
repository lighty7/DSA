# Algorithm Visualizations in ASCII (Why + Where to Use)

This file explains **what each algorithm does visually**, plus **when and why to use it** in interviews and real systems.

---

## 1) Two Pointers

**Use when:** sorted arrays, pairs, shrinking ranges.

```
[1,2,3,4,6,8,11]
 L             R

if sum < target -> L++
if sum > target -> R--
if sum == target -> found
```

**Why:** avoids nested loops (`O(n)` instead of `O(n^2)`).
**Real world:** latency-sensitive filtering and pair-matching pipelines.

---

## 2) Sliding Window

**Use when:** contiguous subarray/substring constraints.

```
s = "A B C A D E"
    [L-----R]
Move R to expand
Move L to shrink when invalid
Track best window
```

**Why:** convert brute-force all-subarrays to linear scan.
**Real world:** stream analytics, fraud signals over recent events.

---

## 3) Prefix Sum

**Use when:** frequent range-sum queries.

```
nums:   [2, 4, 1, 5]
prefix: [0, 2, 6, 7, 12]
Sum(i..j) = prefix[j+1] - prefix[i]
```

**Why:** each range query becomes `O(1)`.
**Real world:** dashboards, cumulative metrics.

---

## 4) Binary Search

**Use when:** sorted data or monotonic answer space.

```
low ---------------- high
         mid
if condition(mid) true -> go left/right by monotonic rule
```

**Why:** cuts search space in half (`O(log n)`).
**Real world:** threshold tuning, capacity planning.

---

## 5) Fast and Slow Pointers

**Use when:** cycles, middle of linked list.

```
slow: 1 step
fast: 2 steps
if fast meets slow => cycle exists
```

**Why:** no extra memory.
**Real world:** pointer-structure validation, loop detection.

---

## 6) Stack (Monotonic)

**Use when:** next greater/smaller, histogram, temperature problems.

```
heights: [2,1,5,6,2,3]
stack keeps increasing indices
pop when current < stack top
```

**Why:** each element pushed/popped once => `O(n)`.
**Real world:** online span metrics, skyline calculations.

---

## 7) Queue / BFS

**Use when:** shortest path in unweighted graphs, level traversal.

```
Queue: [start]
pop front -> push neighbors
Layer 0 -> Layer 1 -> Layer 2
```

**Why:** guarantees shortest edge-count path.
**Real world:** dependency levels, nearest-service discovery.

---

## 8) DFS / Backtracking

**Use when:** enumerate choices/combinations/permutations.

```
choose -> recurse -> unchoose
        / yes
root --
        \ no
```

**Why:** systematic exploration with pruning.
**Real world:** configuration search, rule-based generation.

---

## 9) Heap / Priority Queue

**Use when:** top-k, dynamic minimum/maximum retrieval.

```
Min-Heap
      2
    /   \
   5     7
  / \
 9  10
```

**Why:** insertion/removal in `O(log n)`.
**Real world:** schedulers, ranking feeds, task prioritization.

---

## 10) Union-Find (Disjoint Set)

**Use when:** connectivity queries and dynamic merging.

```
parent: [0,1,2,3,4]
union(1,2) -> parent[2]=1
union(2,3) -> parent[3]=1
find(3) -> 1
```

**Why:** near-constant amortized operations.
**Real world:** network clustering, account deduplication.

---

## 11) Dynamic Programming

**Use when:** overlapping subproblems + optimal substructure.

```
DP table fills from base cases
dp[i] depends on earlier states
```

**Why:** turns exponential recursion into polynomial time.
**Real world:** cost optimization, sequencing, edits/recommendations.

---

## 12) Trie

**Use when:** prefix-based search.

```
(root)
 ├─ c ─ a ─ t
 └─ c ─ a ─ r
```

**Why:** fast prefix lookup.
**Real world:** autocomplete, dictionary features.

---

## 13) Dijkstra (Weighted Shortest Path)

**Use when:** non-negative weighted graph shortest path.

```
min-heap by distance
pick closest unvisited node
relax neighbors
```

**Why:** efficient weighted routing.
**Real world:** maps, network routing costs.

---

## 14) Topological Sort

**Use when:** DAG dependency ordering.

```
A -> C -> E
B -> C
D -> E
order could be: A,B,D,C,E
```

**Why:** valid sequence respecting prerequisites.
**Real world:** build systems, course planning.

---

## 15) Segment Tree / Fenwick Tree

**Use when:** frequent updates + range queries.

```
Array -> Tree of ranges
[0..7]
├─[0..3]
└─[4..7]
```

**Why:** query/update around `O(log n)`.
**Real world:** live analytics over changing data.

