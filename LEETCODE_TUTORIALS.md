# LeetCode Interview Tutorials (Beginner to Advanced)

> A full interview-prep path from first principles to advanced problem-solving patterns, with **Python** and **Java** examples plus real-world usage.

---

## Table of Contents

1. [How to Use This Tutorial](#how-to-use-this-tutorial)
2. [Stage 0: Core Foundations](#stage-0-core-foundations)
3. [Stage 1: Basic Data Structures](#stage-1-basic-data-structures)
4. [Stage 2: Essential Problem Patterns](#stage-2-essential-problem-patterns)
5. [Stage 3: Intermediate to Advanced](#stage-3-intermediate-to-advanced)
6. [Stage 4: Expert Topics](#stage-4-expert-topics)
7. [Interview Strategy](#interview-strategy)
8. [12-Week Preparation Plan](#12-week-preparation-plan)

---

## How to Use This Tutorial

- Learn one concept at a time.
- For every concept:
  1. Understand the idea.
  2. Implement it in Python and Java.
  3. Solve 3–5 Easy, 3–5 Medium, then 1 Hard problem.
  4. Explain your solution out loud (interview simulation).
- Track every mistake in a "mistake log".

---

## Stage 0: Core Foundations

### 0.1 Big-O Thinking

Focus on:
- Time: `O(1), O(log n), O(n), O(n log n), O(n^2)`
- Space: in-place vs extra memory
- Trade-off: faster time may use more memory

**Interview tip:** Always say complexity after coding.

### 0.2 Pseudocode First

Before writing full code, state:
- Input / output
- Edge cases
- High-level steps

---

## Stage 1: Basic Data Structures

### 1.1 Arrays & Strings

**When used in real systems:** logs, event streams, telemetry buffers, text processing.

**Core techniques:** indexing, prefix sums, two pointers.

#### Example: Two Sum

```python
from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        need = target - num
        if need in seen:
            return [seen[need], i]
        seen[num] = i
    return []
```

```java
import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[]{seen.get(need), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}
```

### 1.2 Linked Lists

**Real-world usage:** memory-efficient chaining in systems, low-level allocators, LRU cache internals.

#### Example: Reverse Linked List

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverse_list(head: ListNode) -> ListNode:
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev
```

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
}
```

### 1.3 Stack & Queue

**Real-world usage:**
- Stack: undo/redo, expression parsing.
- Queue: task scheduling, message brokers.

### 1.4 HashMap / HashSet

**Real-world usage:** caching, deduplication, indexing by key.

---

## Stage 2: Essential Problem Patterns

### 2.1 Sliding Window

Use for contiguous subarray / substring constraints.

#### Example: Longest Substring Without Repeating Characters

```python
def length_of_longest_substring(s: str) -> int:
    last = {}
    left = 0
    ans = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        ans = max(ans, right - left + 1)
    return ans
```

```java
import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int left = 0, ans = 0;
        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            if (last.containsKey(ch) && last.get(ch) >= left) {
                left = last.get(ch) + 1;
            }
            last.put(ch, right);
            ans = Math.max(ans, right - left + 1);
        }
        return ans;
    }
}
```

### 2.2 Two Pointers

Use when array is sorted or when shrinking from both ends helps.

### 2.3 Binary Search on Answer

Use for monotonic feasibility problems (`can(mid)` true/false).

### 2.4 Prefix Sum + HashMap

Use for subarray sum counting and range queries.

### 2.5 Fast/Slow Pointers

Use in linked list cycle detection and middle-node problems.

---

## Stage 3: Intermediate to Advanced

### 3.1 Trees (DFS/BFS)

**Real-world usage:** file systems, org charts, routing hierarchies.

#### Example: Level Order Traversal (BFS)

```python
from collections import deque

def level_order(root):
    if not root:
        return []
    q = deque([root])
    out = []
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        out.append(level)
    return out
```

```java
import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> out = new ArrayList<>();
        if (root == null) return out;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            out.add(level);
        }
        return out;
    }
}
```

### 3.2 Heaps / Priority Queues

**Real-world usage:** top-k analytics, scheduling, stream ranking.

### 3.3 Backtracking

Use for combinations/permutations, sudoku-like search.

### 3.4 Dynamic Programming (DP)

DP checklist:
1. Define state.
2. Write recurrence.
3. Set base case.
4. Choose top-down or bottom-up.

#### Example: House Robber

```python
def rob(nums):
    prev2, prev1 = 0, 0
    for x in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + x)
    return prev1
```

```java
class Solution {
    public int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int cur = Math.max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}
```

### 3.5 Graphs (BFS/DFS, Union-Find, Topological Sort)

**Real-world usage:** social networks, dependency resolution, infrastructure graphs.

---

## Stage 4: Expert Topics

- Tries (autocomplete/search suggest)
- Segment Trees / Fenwick Trees (range updates/queries)
- Monotonic Stack (next greater, histogram)
- Shortest Paths: Dijkstra, Bellman-Ford, Floyd-Warshall
- Advanced DP: bitmask DP, digit DP, interval DP

**Note:** Master Stage 0–3 first for interviews.

---

## Interview Strategy

### 1) Communication Framework (Always follow)

1. Clarify requirements.
2. Discuss brute-force quickly.
3. Propose optimized approach.
4. Code cleanly.
5. Dry-run with sample.
6. State complexity and edge cases.

### 2) Common Edge Cases

- Empty input
- Single element
- Duplicates
- Negative values / zero
- Very large input

### 3) If Stuck

- Reduce to smaller example.
- Draw pointers/indices.
- Convert recursion ↔ iteration.
- Start with brute force and optimize.

---

## 12-Week Preparation Plan

| Week | Topic | Goal |
|------|-------|------|
| 1 | Big-O, Arrays, Strings | 20 easy problems |
| 2 | Hashing, Two Pointers | 20 easy/medium |
| 3 | Sliding Window, Prefix Sum | 20 medium |
| 4 | Linked List, Stack, Queue | 20 mixed |
| 5 | Binary Search | 15 medium |
| 6 | Trees BFS/DFS | 20 medium |
| 7 | BST, Recursion, Backtracking | 20 medium |
| 8 | Heaps, Top K | 15 medium |
| 9 | Graph basics, Union-Find | 15 medium |
| 10 | Dynamic Programming I | 20 medium |
| 11 | Dynamic Programming II, Advanced Graph | 15 medium/hard |
| 12 | Mock interviews + revision | 6 mocks + targeted review |

---

## Recommended LeetCode Sets

- Blind 75
- NeetCode 150
- LeetCode Top Interview 150

---

## Final Advice

- Consistency beats intensity.
- Re-solve problems after 3 days, 7 days, 21 days.
- Prioritize pattern recognition over memorizing solutions.
- Be interview-ready in both implementation and explanation.

