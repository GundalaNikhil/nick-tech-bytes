# Unique Paths

## Problem Description

**Real-World Scenario:**
A robot is placed in the top-left corner of a grid and needs to reach the bottom-right corner. It can only move right or down. How many unique paths can it take?

**Example Setup:** 
You're playing a mobile game where you guide a character from the top-left to bottom-right of a maze. Each move can only be right or down (no going back!). How many different routes can you take?

**What is the Unique Paths Problem?**
Given an m×n grid, count the number of unique paths from top-left (0,0) to bottom-right (m-1, n-1), moving only right or down.

**Why is it important?**
- Classic 2D DP introduction
- Combinatorics connection (C(m+n-2, m-1))
- Foundation for path-based problems
- Space optimization techniques

**Your Task:** 
Return the number of unique paths to reach the destination.

---

## Examples

### Example 1:
**Input:** `m = 3, n = 7`
**Output:** `28`
**Explanation:** There are 28 different paths in a 3×7 grid.

### Example 2:
**Input:** `m = 3, n = 2`
**Output:** `3`
**Paths:** 
- Right → Down → Down
- Down → Right → Down
- Down → Down → Right

### Example 3:
**Input:** `m = 1, n = 1`
**Output:** `1`
**Explanation:** Already at destination.

### Example 4:
**Input:** `m = 2, n = 2`
**Output:** `2`
**Explanation:** Either Right→Down or Down→Right.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Rows | 1 ≤ m ≤ 100 |
| Grid Cols | 1 ≤ n ≤ 100 |
| Data Type | Result fits in 32-bit integer |
| Special Conditions | Only right and down moves |
| Time Complexity | O(m × n) |
| Space Complexity | O(n) optimized |
| Output Format | Number of unique paths |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Mathworks |
| 🔵 Amazon | 🟡 Uber | 🟢 Quora |
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Citrix |

---

## Follow-up Questions

1. How can you solve this with combinatorics without DP?
2. What if some cells are blocked (Unique Paths II)?
3. Can you optimize to O(min(m,n)) space?
4. What if you could also move diagonally?
