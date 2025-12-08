# Most Stones Removed with Same Row or Column

## Problem Description

**Real-World Scenario:**
A game board cleaner removes pieces that share a row or column with another piece. Maximize the number of pieces removed (leaving minimal pieces to cover the board).

**Example Setup:** 
A network clustering algorithm groups nodes that share a common attribute (row or column ID) into a single component.

**What is Most Stones Removed...?**
On a 2D plane, we place `n` stones at some integer coordinate points. Each coordinate point may have at most one stone. A stone can be removed if it shares either the same row or the same column as another stone that has not been removed. Given an array `stones` of length `n` where `stones[i] = [xi, yi]` represents the location of the `ith` stone, return the largest possible number of stones that can be removed.

**Why is it important?**
- Union-Find (Component Counting)
- Graph modeling (Row/Col as nodes)
- Connected Components
- Optimization

**Your Task:** 
Return max stones removed.

**Difficulty:** Medium
**Tags:** Graphs, Union Find, Union-Find, Graph Modeling, Connected Components, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]`
**Output:** `5`
**Explanation:** All connected. Leave 1. Remove 5.

### Example 2:
**Input:** `stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]`
**Output:** `3`
**Explanation:** 
Component 1: [0,0], [0,2], [2,0], [2,2]. Size 4. Remove 3.
Component 2: [1,1]. Size 1. Remove 0.
Total 3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Stones | 1 ≤ n ≤ 1000 |
| Coordinates | 0 ≤ x, y ≤ 10⁴ |
| Data Type | 2D Points |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Amazon | 🟡 Microsoft | 🟢 King |
| 🔵 Facebook | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. Why is the answer `N - number_of_components`?
2. How to model rows and columns as nodes in Union-Find?
3. Why offset column indices (e.g., `col + 10001`)?
4. Can you use DFS to count components?
