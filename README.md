# Complete DSA Learning Guide for Visual Learners

> A comprehensive roadmap to master Data Structures and Algorithms with visual explanations, patterns, and examples.

---

## Table of Contents

1. [Why Learn DSA?](#why-learn-dsa)
2. [Phase 1: Foundations](#phase-1-foundations-weeks-1-2)
3. [Phase 2: Core Algorithms](#phase-2-core-algorithms-weeks-3-4)
4. [Phase 3: 14 Essential Patterns](#phase-3-14-essential-problem-solving-patterns)
5. [Visual Resources](#visual-resources)
6. [10-Week Study Plan](#10-week-study-plan)
7. [Practice Platforms](#practice-platforms)
8. [LeetCode Tutorials (Python + Java)](#leetcode-tutorials-python--java)
9. [ASCII Algorithm Visuals](#ascii-algorithm-visuals)
10. [Practice Environment](#practice-environment)

---

## Why Learn DSA?

Data Structures and Algorithms (DSA) is the foundation of computer science and software engineering. Here's why it matters:

- **Interviews**: DSA is the primary filtering criteria for tech companies (Google, Meta, Amazon, Microsoft, etc.)
- **Problem Solving**: Improves your ability to think logically and structure solutions
- **Efficiency**: Teaches you to write code that scales
- **Career Growth**: Opens doors to better job opportunities and higher salaries

> **Key Insight**: You don't need to solve 3000 problems. You need to master ~15 patterns that cover 80%+ of interview problems!

---

## Phase 1: Foundations (Weeks 1-2)

### 1.1 Big-O Notation & Complexity Analysis

Big-O notation describes how the execution time or space requirements of an algorithm grows as input size increases.

#### Time Complexities (Fastest to Slowest)

| Complexity | Name | Visual Analogy | Example |
|------------|------|----------------|---------|
| O(1) | Constant | Instant lookup | Array index access |
| O(log n) | Logarithmic | Cutting in half each step | Binary search |
| O(n) | Linear | Scanning one by one | Linear search |
| O(n log n) | Linearithmic | Divide + conquer | Merge sort |
| O(n²) | Quadratic | Nested loops | Bubble sort |
| O(2^n) | Exponential | Doubling each step | Fibonacci recursive |

#### Space Complexity

Space complexity measures how much extra memory an algorithm needs.

```
O(1) - Constant space (no extra arrays)
O(n) - Linear space (creating new array of size n)
```

#### Visual Example: How Complexity Grows

```
Input Size (n)    O(1)    O(log n)    O(n)    O(n²)
--------------------------------------------------
10                1       3           10      100
100               1       7           100     10,000
1,000             1       10          1,000  1,000,000
```

---

### 1.2 Basic Data Structures

#### Arrays

**Visual Analogy**: A row of numbered lockers

```
Index:    [0]   [1]   [2]   [3]   [4]
Value:    [10]  [25]  [33]  [47]  [52]
          ↑
       Random access in O(1)
```

**Operations**:
- Access: O(1)
- Search: O(n)
- Insert: O(n) (need to shift elements)
- Delete: O(n) (need to shift elements)

#### Linked Lists

**Visual Analogy**: A train where each car points to the next

```
HEAD        NODE 1       NODE 2       NODE 3       NULL
[Data|Next]→[5 |Next]→[10|Next]→[15|Next]→NULL
```

**Types**:
- **Singly Linked List**: One direction only
- **Doubly Linked List**: Can go forward and backward

**Operations**:
- Insert at head: O(1)
- Insert at tail: O(1) with tail pointer
- Search: O(n)
- Delete: O(1) if you have the node

#### Stacks

**Visual Analogy**: Stack of plates - Last In, First Out (LIFO)

```
    [ Plates ]
       ↑
    Add here (push)
    
    Remove here (pop)
```

**Operations**:
- Push: O(1) - Add to top
- Pop: O(1) - Remove from top
- Peek: O(1) - View top element

**Use Cases**: Undo functionality, function call stack, expression evaluation

#### Queues

**Visual Analogy**: People standing in line - First In, First Out (FIFO)

```
FRONT                         REAR
[Person1] → [Person2] → [Person3] → [Person4]
  ↑                              ↑
 Dequeue                      Enqueue
 (remove)                     (add)
```

**Operations**:
- Enqueue: O(1) - Add to rear
- Dequeue: O(1) - Remove from front

#### Hash Tables (Hash Maps)

**Visual Analogy**: A dictionary where each word (key) maps to a definition (value)

```
Key (Word)     →    Value (Definition)
--------------------------------------
"apple"        →    "A fruit"
"book"         →    "Something to read"
"computer"     →    "An electronic device"
```

**Operations**:
- Insert: O(1) average
- Delete: O(1) average
- Search: O(1) average

**Collision Handling**: When two keys hash to the same index
- **Chaining**: Linked list at each bucket
- **Open Addressing**: Find next empty slot

---

## Phase 2: Core Algorithms (Weeks 3-4)

### 2.1 Searching Algorithms

#### Linear Search

Check each element one by one until you find the target.

```
Array: [4, 2, 7, 1, 9, 5], Target: 9

Step 1: Check 4 → No
Step 2: Check 2 → No
Step 3: Check 7 → No
Step 4: Check 1 → No
Step 5: Check 9 → Yes! Found at index 4

Time Complexity: O(n)
```

#### Binary Search

Only works on **sorted arrays**. Divide search space in half each step.

```
Sorted Array: [1, 3, 5, 7, 9, 11, 13, 15], Target: 11

Step 1: mid = index 3 (value 7)
        7 < 11 → search right half
        Search range: [9, 11, 13, 15]

Step 2: mid = index 5 (value 11)
        11 == 11 → Found! Return index 5

Time Complexity: O(log n)
```

**Visual Representation**:

```
Round 1: [1, 3, 5, 7, 9, 11, 13, 15]
              ↑
           mid=7

Round 2:          [9, 11, 13, 15]
                      ↑
                   mid=11 (FOUND!)
```

---

### 2.2 Sorting Algorithms

#### Bubble Sort

Repeatedly swap adjacent elements if they're in wrong order.

```
[5, 3, 8, 1]

Pass 1: [3, 5, 1, 8] → Swap 5,3
         [3, 1, 5, 8] → Swap 5,1
         [3, 1, 5, 8] → 8 in right place

Pass 2: [1, 3, 5, 8] → Swap 3,1
         [1, 3, 5, 8] → 5 in right place

Pass 3: [1, 3, 5, 8] → 3 in right place

Result: [1, 3, 5, 8]

Time: O(n²)  Space: O(1)
```

**Visual**:
```
Pass 1: 5 > 3? YES → [3, 5, 8, 1]
         5 > 8? NO  → [3, 5, 8, 1]
         8 > 1? YES → [3, 5, 1, 8] ✓ 8 at end
         
Pass 2: 3 > 5? NO  → [3, 5, 1, 8]
         5 > 1? YES → [3, 1, 5, 8] ✓ 5 in place
         
Pass 3: 3 > 1? YES → [1, 3, 5, 8] ✓ DONE!
```

#### Selection Sort

Find minimum element, place at beginning, repeat for remaining.

```
[64, 25, 12, 22, 11]

Find minimum: 11 → Swap with 64
Result: [11, 25, 12, 22, 64]

Find minimum in [25, 12, 22, 64]: 12 → Swap with 25
Result: [11, 12, 25, 22, 64]

Continue...
Final: [11, 12, 22, 25, 64]

Time: O(n²)  Space: O(1)
```

#### Insertion Sort

Build sorted array one element at a time (like sorting cards in hand).

```
[12, 11, 13, 5, 6]

Start with first element: [12]
Add 11: 11 < 12 → insert before → [11, 12]
Add 13: 13 > 12 → stays → [11, 12, 13]
Add 5:  5 < 13, 12, 11 → insert at start → [5, 11, 12, 13]
Add 6:  6 < 13, 12 → [5, 6, 11, 12, 13]

Time: O(n²) worst, O(n) best  Space: O(1)
```

#### Merge Sort

Divide array in half, sort each half, merge sorted halves.

```
[38, 27, 43, 3, 9, 82, 10]

Split: [38, 27, 43, 3] | [9, 82, 10]
Split: [38, 27] | [43, 3] | [9, 82] | [10]
Split: [38] | [27] | [43] | [3] | [9] | [82] | [10]

Merge: [27, 38] | [3, 43] | [9, 82] | [10]
Merge: [3, 27, 38, 43] | [9, 10, 82]
Merge: [3, 9, 10, 27, 38, 43, 82]

Time: O(n log n)  Space: O(n)
```

**Visual**:
```
        [38, 27, 43, 3, 9, 82, 10]
               /           \
    [38, 27, 43, 3]    [9, 82, 10]
        /     \            /     \
   [38,27]  [43,3]    [9,82]   [10]
    /   \     /  \      /   \
 [38] [27] [43] [3]  [9]  [82]

Now merge back up!
```

#### Quick Sort

Pick a pivot, partition around it, recursively sort partitions.

```
[10, 7, 8, 9, 1, 5]

Pick pivot = 5 (or last element)
Partition: [1] + [5] + [10, 7, 8, 9]
Sort left: [1]
Sort right: [10, 7, 8, 9]
           Pick 9 → [7, 8] + [9] + [10]
           
Result: [1, 5, 7, 8, 9, 10]

Time: O(n log n) average, O(n²) worst  Space: O(log n)
```

#### Heap Sort

Build a heap (max-heap for ascending sort), repeatedly extract max.

```
[4, 10, 3, 5, 1]

Build max-heap: [10, 5, 3, 4, 1]
Swap root with last: [1, 5, 3, 4, 10] → 10 in place
Heapify: [5, 4, 3, 1]
Swap: [1, 4, 3, 5, 10] → 5 in place
Continue...

Time: O(n log n)  Space: O(1)
```

---

## Phase 3: 14 Essential Problem-Solving Patterns

### Pattern 1: Sliding Window 🪟

**When to Use**:
- Problems involving contiguous subarrays or substrings
- Finding maximum/minimum in a window of size k
- Longest/shortest substring with certain properties

**Visual**:
```
Array: [2, 1, 5, 1, 3, 2], Window size k = 3

Window 1: [2, 1, 5] → sum = 8
           ↓ slide
Window 2: [1, 5, 1] → sum = 7  (reuse 8 - 2 + 1 = 7)
           ↓ slide
Window 3: [5, 1, 3] → sum = 9  (reuse 7 - 1 + 3 = 9)
                    ↑ MAX!
```

**Example Problem**: Maximum Sum Subarray of Size K

```python
def max_subarray_sum(nums, k):
    # Calculate sum of first window
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example
nums = [2, 1, 5, 1, 3, 2]
k = 3
print(max_subarray_sum(nums, k))  # Output: 9 (subarray [5,1,3])
```

**Why It Works**:
- Naive approach: O(n × k) - recalculate sum for each window
- Sliding window: O(n) - adjust sum by removing one element, adding one

**Practice Problems**:
- Maximum Sum Subarray of Size K (Easy)
- Longest Substring Without Repeating Characters (Medium)
- Minimum Window Substring (Hard)
- Sliding Window Maximum (Hard)

---

### Pattern 2: Two Pointers 👆👇

**When to Use**:
- Sorted arrays (find pairs, triplets)
- Palindrome checking
- Reversing arrays

**Visual**:
```
Sorted Array: [1, 3, 4, 5, 7, 9], Target = 12

Step 1: left=0 (1), right=5 (9) → 1+9=10 < 12 → move left++
Step 2: left=1 (3), right=5 (9) → 3+9=12 = 12 → FOUND! ✓

        [1, 3, 4, 5, 7, 9]
         ↑            ↑
       left        right
```

**Example Problem**: Two Sum in Sorted Array

```python
def two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need bigger sum
        else:
            right -= 1  # Need smaller sum
    
    return [-1, -1]  # No solution

# Example
arr = [1, 3, 4, 5, 7, 9]
target = 12
print(two_sum_sorted(arr, target))  # Output: [1, 5]
```

**Example Problem**: Container With Most Water

```python
def max_area(height):
    left = 0
    right = len(height) - 1
    max_water = 0
    
    while left < right:
        # Calculate width and height
        width = right - left
        h = min(height[left], height[right])
        
        max_water = max(max_water, width * h)
        
        # Move the shorter line
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water

# Example
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
print(max_area(height))  # Output: 49
```

**Why It Works**:
- Exploits sorted property: if sum is too small, increase left; if too large, decrease right
- Each element visited at most once → O(n) time

---

### Pattern 3: Fast & Slow Pointers (Tortoise & Hare) 🐢🐇

**When to Use**:
- Detect cycle in linked list
- Find middle of linked list
- Find start of cycle (Floyd's algorithm)

**Visual**:
```
Linked List with Cycle:

    1 → 2 → 3 → 4 → 5
            ↑       ↓
            └───────┘

Slow moves 1 step, Fast moves 2 steps
They will meet inside the cycle!
```

**Example Problem**: Linked List Cycle Detection

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    if not head or not head.next:
        return False
    
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next        # Move 1 step
        fast = fast.next.next   # Move 2 steps
        
        if slow == fast:
            return True  # Cycle detected
    
    return False  # No cycle
```

**Example Problem**: Find Middle of Linked List

```python
def find_middle(head):
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow.val if slow else None

# For odd length: 1→2→3→→ returns 2
# For even length: 1→2→3→4→ returns 2 (second middle)
```

**Why It Works**:
- Fast pointer catches up to slow pointer if cycle exists
- When fast reaches end, slow is at middle

---

### Pattern 4: Binary Search 🔍

**When to Use**:
- Search in sorted array
- Search in rotated sorted array
- Find first/last occurrence
- Find peak element
- Optimize by search space (monotonic functions)

**Visual**:
```
Sorted Array: [1, 3, 5, 7, 9, 11, 13, 15], Target: 11

Step 1: left=0, right=7, mid=3 → arr[3]=7
        7 < 11 → search right half
        left = 4

Step 2: left=4, right=7, mid=5 → arr[5]=11
        11 == 11 → FOUND! ✓

        [1, 3, 5, 7, 9, 11, 13, 15]
                   ↑     ↑
                  mid   target
```

**Example Problem**: Standard Binary Search

```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found

# Example
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 11))  # Output: 5
```

**Example Problem**: Search in Rotated Sorted Array

```python
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

# Example
nums = [4, 5, 6, 7, 0, 1, 2]
target = 0
print(search_rotated(nums, target))  # Output: 4
```

**Variations**:
1. **Find First Occurrence**: Continue search left after finding match
2. **Find Last Occurrence**: Continue search right after finding match
3. **Find Peak Element**: Binary search on mountain array
4. **Find Minimum in Rotated Array**: Modified binary search

---

### Pattern 5: Prefix Sum ➕

**When to Use**:
- Range sum queries
- Subarray sum problems
- Cumulative frequency problems

**Visual**:
```
Original:  [1,  2,  3,  4,  5]
Prefix:    [1,  3,  6, 10, 15]
            ↑
         cumulative

To find sum from index 1 to 3:
Sum = prefix[3] - prefix[0] = 10 - 1 = 9
     = 2 + 3 + 4 = 9 ✓
```

**Example Problem**: Subarray Sum Equals K

```python
def subarray_sum(nums, k):
    prefix_sum = 0
    count = 0
    prefix_count = {0: 1}  # Key: prefix sum, Value: frequency
    
    for num in nums:
        prefix_sum += num
        
        # If (prefix_sum - k) exists, we found a subarray
        if prefix_sum - k in prefix_count:
            count += prefix_count[prefix_sum - k]
        
        # Record current prefix sum
        prefix_count[prefix_sum] = prefix_count.get(prefix_sum, 0) + 1
    
    return count

# Example
nums = [1, 1, 1]
k = 2
print(subarray_sum(nums, k))  # Output: 2 ([1,1] at indices 0-1 and 1-2)
```

**Why It Works**:
- If prefix[j] - prefix[i] = k, then sum of subarray from i+1 to j equals k
- Using hash map to store prefix sum frequencies gives O(n) solution

---

### Pattern 6: BFS (Breadth-First Search) 🌊

**When to Use**:
- Shortest path in unweighted graph
- Level-order tree traversal
- Finding connected components
- Shortest path in maze

**Visual**:
```
Graph:
    A
   / \
  B   C
 / \   \
D   E   F

BFS Level by Level:
Level 0: A
Level 1: B, C
Level 2: D, E, F
```

**Example Problem**: Binary Tree Level Order Traversal

```python
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result

# Example Tree:
#     1
#    / \
#   2   3
#  / \
# 4   5

# Output: [[1], [2, 3], [4, 5]]
```

**Example Problem**: Shortest Path in Binary Matrix (BFS)

```python
from collections import deque

def shortest_path(grid):
    if not grid or grid[0][0] == 1:
        return -1
    
    n = len(grid)
    if n == 1:
        return 1
    
    queue = deque([(0, 0, 1)])  # (row, col, distance)
    grid[0][0] = 1  # Mark as visited
    
    directions = [(0,1), (1,0), (0,-1), (-1,0), 
                  (1,1), (1,-1), (-1,1), (-1,-1)]
    
    while queue:
        r, c, dist = queue.popleft()
        
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                if nr == n-1 and nc == n-1:
                    return dist + 1
                
                grid[nr][nc] = 1
                queue.append((nr, nc, dist + 1))
    
    return -1
```

---

### Pattern 7: DFS (Depth-First Search) 🎯

**When to Use**:
- Path finding
- Tree/graph traversal
- Connected components
- Topological sort
- Solving puzzles (sudoku, N-Queens)

**Visual**:
```
Graph:
    A
   / \
  B   C
 / \   \
D   E   F

DFS (Pre-order): A → B → D → E → C → F
```

**Example Problem**: Sum of Root to Leaf Numbers

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sum_numbers(root):
    def dfs(node, current_sum):
        if not node:
            return 0
        
        current_sum = current_sum * 10 + node.val
        
        # If leaf node, return the number
        if not node.left and not node.right:
            return current_sum
        
        # Recurse on children
        return dfs(node.left, current_sum) + dfs(node.right, current_sum)
    
    return dfs(root, 0)

# Example Tree:
#     1
#    / \
#   2   3
# Path 1→2 = 12, Path 1→3 = 13
# Sum = 12 + 13 = 25
```

**Example Problem**: Number of Islands

```python
def num_islands(grid):
    if not grid:
        return 0
    
    count = 0
    rows, cols = len(grid), len(grid[0])
    
    def dfs(r, c):
        # Boundary check and water check
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        
        # Mark as visited (turn to water)
        grid[r][c] = '0'
        
        # Visit all 4 directions
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count

# Example
grid = [
    ['1','1','1','1','0'],
    ['1','1','0','1','0'],
    ['1','1','0','0','0'],
    ['0','0','0','0','0']
]
# Output: 1 (one island)
```

---

### Pattern 8: Recursion & Backtracking 🔙

**When to Use**:
- Generate all permutations/combinations
- Solve puzzles (Sudoku, N-Queens)
- Subset problems
- Path finding in matrix

**Visual**:
```
Permutations of [1, 2, 3]:

        [ ]
       / | \
      1  2  3
     /|  |  |\
   12  1  2  3  1  2
    |  |\ |\ |\ |\ |\
   123 13 21 23 31 32
   
Result: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]
```

**Example Problem**: Generate All Permutations

```python
def permute(nums):
    result = []
    
    def backtrack(start):
        # Base case: all elements used
        if start == len(nums):
            result.append(nums[:])  # Add copy of current permutation
            return
        
        for i in range(start, len(nums)):
            # Swap to fix element at position
            nums[start], nums[i] = nums[i], nums[start]
            
            # Recurse for remaining positions
            backtrack(start + 1)
            
            # Backtrack (undo swap)
            nums[start], nums[i] = nums[i], nums[start]
    
    backtrack(0)
    return result

# Example
nums = [1, 2, 3]
print(permute(nums))
# Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2]]
```

**Example Problem**: N-Queens (Place N queens on N×N board)

```python
def solve_n_queens(n):
    result = []
    cols = set()
    pos_diag = set()  # row + col
    neg_diag = set()  # row - col
    
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def backtrack(row):
        if row == n:
            result.append([''.join(row) for row in board])
            return
        
        for col in range(n):
            # Check if position is safe
            if col in cols or (row + col) in pos_diag or (row - col) in neg_diag:
                continue
            
            # Place queen
            board[row][col] = 'Q'
            cols.add(col)
            pos_diag.add(row + col)
            neg_diag.add(row - col)
            
            # Recurse to next row
            backtrack(row + 1)
            
            # Backtrack
            board[row][col] = '.'
            cols.remove(col)
            pos_diag.remove(row + col)
            neg_diag.remove(row - col)
    
    backtrack(0)
    return result

# For n=4, solution:
# [".Q..", "...Q", "Q...", "..Q."]
# ["..Q.", "Q...", "...Q", ".Q.."]
```

---

### Pattern 9: Dynamic Programming (DP) 📊

**When to Use**:
- Optimization problems (min/max)
- Problems with overlapping subproblems
- Problems that can be broken into stages
- Counting problems

**Visual**:
```
Fibonacci without DP:
            fib(5)
           /        \
        fib(4)    fib(3)
        /    \     /    \
    fib(3) fib(2) fib(2) fib(1)
    ...     ...   ...

Many repeated calculations! O(2^n)

Fibonacci with DP:
fib(0)=0, fib(1)=1
fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5
Each computed once! O(n)
```

**Two Approaches**:

| Approach | Description | When to Use |
|----------|-------------|-------------|
| **Top-Down (Memoization)** | Recursion + cache | Easy to think, less efficient |
| **Bottom-Up (Tabulation)** | Build table iteratively | More efficient, but needs ordering |

**Example Problem**: Climbing Stairs

```python
# Top-Down (Memoization)
def climb_stairs_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 2:
        return n
    
    memo[n] = climb_stairs_memo(n-1) + climb_stairs_memo(n-2)
    return memo[n]

# Bottom-Up (Tabulation)
def climb_stairs(n):
    if n <= 2:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Space Optimized
def climb_stairs_optimized(n):
    if n <= 2:
        return n
    
    prev1, prev2 = 1, 2
    
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev1 = prev2
        prev2 = current
    
    return prev2

# Example
print(climb_stairs(5))  # Output: 8
# Ways: 11111, 1112, 1121, 1211, 2111, 12, 21
```

**Example Problem**: Longest Common Subsequence

```python
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

# Example
text1 = "abcde"
text2 = "ace"
print(lcs(text1, text2))  # Output: 3 ("ace")
```

**Example Problem**: Coin Change (Minimum Coins)

```python
def coin_change(coins, amount):
    # dp[i] = minimum coins to make amount i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# Example
coins = [1, 2, 5]
amount = 11
print(coin_change(coins, amount))  # Output: 3 (5+5+1)
```

---

### Pattern 10: Two Heaps ⚖️

**When to Use**:
- Median of data stream
- Sliding window median
- Dynamic median finding

**Visual**:
```
Data Stream: [2, 1, 3, 4]

Max-Heap (lower half): [2, 1]
Min-Heap (upper half): [3, 4]

Median = (max_heap_top + min_heap_top) / 2
       = (2 + 3) / 2 = 2.5
```

**Example Problem**: Find Median from Data Stream

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max-heap (inverted values)
        self.large = []  # Min-heap
    
    def add_num(self, num):
        # Add to max-heap (store negative for max-heap behavior)
        heapq.heappush(self.small, -num)
        
        # Balance: ensure all in small <= all in large
        heapq.heappush(self.large, -heapq.heappop(self.small))
        
        # Keep small heap larger or equal
        if len(self.small) < len(self.large):
            heapq.heappush(self.small, -heapq.heappop(self.large))
    
    def find_median(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2.0

# Example
mf = MedianFinder()
mf.add_num(1)
mf.add_num(2)
print(mf.find_median())  # Output: 1.5
mf.add_num(3)
print(mf.find_median())  # Output: 2
```

---

### Pattern 11: Top K Elements 🏆

**When to Use**:
- Find K largest/smallest elements
- Find K most frequent elements
- Find K closest elements

**Visual**:
```
Array: [7, 10, 4, 3, 20, 15], K = 3

Using Min-Heap of size K:

Step 1: Add 7 → Heap: [7]
Step 2: Add 10 → Heap: [7, 10]
Step 3: Add 4 → Heap: [4, 7, 10]
Step 4: Add 3 → Heap: [3, 4, 10], pop 7
Step 5: Add 20 → Heap: [3, 4, 10], 20 > 4, no change
Step 6: Add 15 → Heap: [3, 4, 10], 15 > 4, no change

Result: [3, 4, 10] (K smallest)
```

**Example Problem**: Kth Largest Element

```python
import heapq

def find_kth_largest(nums, k):
    # Use min-heap of size k
    min_heap = []
    
    for num in nums:
        heapq.heappush(min_heap, num)
        
        # Keep only k elements
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    
    return min_heap[0]

# Using QuickSelect (O(n) average)
def find_kth_largest_quick(nums, k):
    k = len(nums) - k  # Convert to (kth smallest)
    
    def quick_select(left, right):
        pivot = nums[right]
        p = left
        
        for i in range(left, right):
            if nums[i] <= pivot:
                nums[p], nums[i] = nums[i], nums[p]
                p += 1
        
        nums[p], nums[right] = nums[right], nums[p]
        
        if p == k:
            return nums[p]
        elif p < k:
            return quick_select(p + 1, right)
        else:
            return quick_select(left, p - 1)
    
    return quick_select(0, len(nums) - 1)

# Example
nums = [3, 2, 1, 5, 6, 4]
k = 2
print(find_kth_largest(nums, k))  # Output: 5
```

---

### Pattern 12: Merge Intervals 🔗

**When to Use**:
- Overlapping intervals
- Meeting rooms
- Schedule problems

**Visual**:
```
Intervals: [[1,3], [2,6], [8,10], [15,18]]

Step 1: Sort by start time
        [[1,3], [2,6], [8,10], [15,18]]

Step 2: Merge overlapping
        [1,3] and [2,6] overlap → merge to [1,6]
        [8,10] no overlap with [1,6]
        [15,18] no overlap

Result: [[1,6], [8,10], [15,18]]
```

**Example Problem**: Merge Intervals

```python
def merge(intervals):
    if len(intervals) <= 1:
        return intervals
    
    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    
    result = [intervals[0]]
    
    for i in range(1, len(intervals)):
        current = result[-1]
        next_interval = intervals[i]
        
        # Check for overlap
        if next_interval[0] <= current[1]:
            # Merge: take max of end times
            result[-1] = [current[0], max(current[1], next_interval[1])]
        else:
            result.append(next_interval)
    
    return result

# Example
intervals = [[1,3], [2,6], [8,10], [15,18]]
print(merge(intervals))  # Output: [[1,6], [8,10], [15,18]]
```

**Example Problem**: Meeting Rooms II

```python
import heapq

def min_meeting_rooms(intervals):
    if not intervals:
        return 0
    
    # Separate start and end times
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])
    
    rooms = 0
    end_ptr = 0
    
    for start in starts:
        if start < ends[end_ptr]:
            # Need new room
            rooms += 1
        else:
            # Room freed, reuse
            end_ptr += 1
    
    return rooms

# Example
intervals = [[0,30], [5,10], [15,20]]
print(min_meeting_rooms(intervals))  # Output: 2
```

---

### Pattern 13: Monotonic Stack 📈

**When to Use**:
- Next greater/smaller element
- Largest rectangle in histogram
- Daily temperatures
- Stock span problem

**Visual**:
```
Array: [2, 1, 2, 4, 3]
Find next greater element:

Index 0: 2 → Next greater = 4
Index 1: 1 → Next greater = 2
Index 2: 2 → Next greater = 4
Index 3: 4 → Next greater = -1 (none)
Index 4: 3 → Next greater = -1

Using stack (monotonic decreasing):
Stack maintains elements waiting for greater element
```

**Example Problem**: Next Greater Element

```python
def next_greater_element(nums):
    result = [-1] * len(nums)
    stack = []  # Store indices
    
    for i in range(len(nums)):
        # While current element is greater than stack top
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        
        # Push current index
        stack.append(i)
    
    # Elements with no greater element remain -1
    return result

# Example
nums = [2, 1, 2, 4, 3]
print(next_greater_element(nums))  # Output: [4, 2, 4, -1, -1]
```

**Example Problem**: Largest Rectangle in Histogram

```python
def largest_rectangle(heights):
    stack = []  # Store indices
    max_area = 0
    
    for i in range(len(heights)):
        # Calculate max area when current bar is shorter
        while stack and heights[stack[-1]] > heights[i]:
            h = heights[stack.pop()]
            w = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, h * w)
        stack.append(i)
    
    # Calculate for remaining bars
    while stack:
        h = heights[stack.pop()]
        w = len(heights) if not stack else len(heights) - stack[-1] - 1
        max_area = max(max_area, h * w)
    
    return max_area

# Example
heights = [2, 1, 5, 6, 2, 3]
print(largest_rectangle(heights))  # Output: 10
# Rectangle: height 5, width 2 (indices 2-3) = 10
```

---

### Pattern 14: Bit Manipulation 💡

**When to Use**:
- Single number (all pairs except one)
- Power of two checking
- Counting set bits
- Swapping without temp

**Visual**:
```
Binary operations:

AND  (a & b):  1 only if both 1
OR   (a | b):  1 if at least one 1
XOR  (a ^ b):  1 if different
NOT  (~a):     Flip bits
<<   (a << 1): Multiply by 2
>>   (a >> 1): Divide by 2

Example: Find single number
Input: [2, 2, 1]
2 XOR 2 = 0
0 XOR 1 = 1 ✓
```

**Key Properties of XOR**:
```
a ^ a = 0
a ^ 0 = a
a ^ b ^ a = b  (order doesn't matter)
```

**Example Problem**: Single Number (All pairs except one)

```python
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result

# Example
nums = [2, 2, 1]
print(single_number(nums))  # Output: 1

# Another example: [4,1,2,1,2]
# 4 ^ 1 ^ 2 ^ 1 ^ 2 = 4 ✓
```

**Example Problem**: Count Set Bits

```python
def count_bits(n):
    count = 0
    while n:
        # n & (n-1) removes the lowest set bit
        n = n & (n - 1)
        count += 1
    return count

# Or using built-in
def count_bits_builtin(n):
    return bin(n).count('1')

# Example
print(count_bits(7))   # Output: 3 (111 in binary)
print(count_bits(8))   # Output: 1 (1000 in binary)
```

**Example Problem**: Power of Two

```python
def is_power_of_two(n):
    # Power of 2 has only one bit set
    # n & (n-1) removes that bit, result should be 0
    return n > 0 and (n & (n - 1)) == 0

# Example
print(is_power_of_two(8))   # True
print(is_power_of_two(6))   # False
```

---

## Visual Resources

| Resource | Description | Link |
|----------|-------------|------|
| **VisuAlgo** | Animated visualizations of algorithms | [visualgo.net](https://visualgo.net/en) |
| **Grokking Algorithms** | Illustrated book with pictures | Manning Publications |
| **NeetCode** | Video explanations + practice | [neetcode.io](https://neetcode.io/) |
| **FreeCodeCamp DSA** | 49-hour comprehensive course | YouTube |
| **AlgoExpert** | Video explanations | algoexpert.io |

---

## 10-Week Study Plan

| Week | Topic | Focus Patterns | Practice Problems |
|------|-------|----------------|-------------------|
| 1 | Big-O, Arrays, Strings | Basic operations | 15 Easy |
| 2 | Linked Lists, Stacks, Queues | Implementation | 15 Easy |
| 3 | Sorting Algorithms | Comparison | 10 Medium |
| 4 | **Sliding Window** | Pattern #1 | 8 Problems |
| 5 | **Two Pointers + Binary Search** | Pattern #2, #4 | 10 Problems |
| 6 | **BFS + DFS** | Pattern #6, #7 | 10 Problems |
| 7 | **Recursion + Backtracking** | Pattern #8 | 12 Problems |
| 8 | **Dynamic Programming** | Pattern #9 | 15 Problems |
| 9 | **Two Heaps + Top K + Merge** | Pattern #10, #11, #12 | 10 Problems |
| 10 | Review + Mock Interviews | All combined | 20 Mixed |

---

## Practice Platforms

| Platform | Description | Difficulty |
|----------|-------------|------------|
| **LeetCode** | 3000+ problems | Easy to Hard |
| **NeetCode 150** | Curated 150 problems | Interview-focused |
| **Blind 75** | Top 75 interview problems | Essential |
| **HackerRank** | Company-specific | Various |
| **Codeforces** | Competitive programming | Hard |

---

## LeetCode Tutorials (Python + Java)

If you want a dedicated interview-prep path from pure basics to advanced concepts with examples in both Python and Java, use:

- [`LEETCODE_TUTORIALS.md`](LEETCODE_TUTORIALS.md)

It includes:
- Structured stages from foundations to expert topics
- Pattern-based learning for interview speed
- Python + Java code examples
- Real-world use cases for each core topic
- A 12-week interview preparation plan

---

## ASCII Algorithm Visuals

For concept-by-concept visual explanations of what algorithms are doing (using ASCII diagrams), see:

- [`ALGORITHM_VISUALS_ASCII.md`](ALGORITHM_VISUALS_ASCII.md)

It includes **why and where** to use each algorithm in interviews and real-world systems.

---

## Practice Environment

For hands-on practice by concept, difficulty, and question number, use:

- [`practice/README.md`](practice/README.md)

You can pick a concept, implement a function in `solutions.py`, then run tests by only passing:
- concept name
- difficulty (`easy`/`medium`/`hard`)
- question number

---

## How to Use This Guide

1. **Start with Phase 1**: Understand fundamentals
2. **Practice Phase 2**: Implement sorting algorithms from scratch
3. **Master Phase 3**: Learn one pattern per week
4. **Apply Patterns**: Solve 8-10 problems per pattern
5. **Review**: Do mock interviews after completing all patterns

> **Remember**: As a visual learner, always draw diagrams, trace through examples step by step, and use animation tools like VisuAlgo to understand how algorithms work!

---

## Contributing

Feel free to contribute by submitting a pull request or opening an issue.

---

## License

MIT License - Feel free to use and share!

---

*Last Updated: February 2026*
