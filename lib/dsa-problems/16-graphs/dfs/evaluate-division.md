# Evaluate Division

## Problem Description

**Real-World Scenario:**
A currency converter needs to determine the exchange rate between two currencies given a set of known exchange rates (e.g., USD->EUR, EUR->GBP, find USD->GBP).

**Example Setup:** 
Unit conversion (meters to feet, feet to inches, find meters to inches).

**What is Evaluate Division?**
You are given an array of variable pairs `equations` and an array of real numbers `values`, where `equations[i] = [Ai, Bi]` and `values[i]` represent the equation `Ai / Bi = values[i]`. Each `Ai` or `Bi` is a string that represents a single variable.
You are also given some `queries`, where `queries[j] = [Cj, Dj]` represents the `j-th` query where you must find the answer for `Cj / Dj = ?`.
Return the answers to all queries. If a single answer cannot be determined, return `-1.0`.

**Why is it important?**
- Graph Construction (Weighted Directed Graph)
- BFS / DFS / Union-Find
- Path Finding with Product weights
- Transitive Property

**Your Task:** 
Return array of answers.

**Difficulty:** Medium
**Tags:** Graphs, Dfs, Graph Construction, Bfs / Dfs / Union-Find, Path Finding With Product Weights, Transitive Property, O(M * N), Interview

---

## Examples

### Example 1:
**Input:** `equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]`
**Output:** `[6.00000,0.50000,-1.00000,1.00000,-1.00000]`
**Explanation:** 
a/b = 2.0, b/c = 3.0 -> a/c = a/b * b/c = 6.0.
b/a = 1/2.0 = 0.5.
a/e -> e unknown. -1.0.
a/a -> 1.0.
x/x -> x unknown. -1.0.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Equations | 1 ≤ n ≤ 20 |
| Queries | 1 ≤ m ≤ 20 |
| Data Type | List of Lists, Doubles |
| Time Complexity | O(M * N) |
| Space Complexity | O(N) |
| Output Format | Double array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Snap |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Citadel |

---

## Follow-up Questions

1. How to represent the graph? (Adjacency list with weights).
2. Why store both `a->b` (val) and `b->a` (1/val)?
3. BFS vs Union-Find? (Union-Find with path compression and weight tracking is faster but harder to implement).
4. Handling disconnected components?
