# Possible Bipartition

## Problem Description

**Real-World Scenario:**
A camp counselor needs to split a group of campers into two teams such that no two campers who dislike each other are on the same team.

**Example Setup:** 
Scheduling conflicting tasks into two time slots such that no two conflicting tasks share a slot.

**What is Possible Bipartition?**
We want to split a group of `n` people (labeled `1` to `n`) into two groups of any size. Each person may dislike some other people, and they should not go into the same group.
Given the integer `n` and an array `dislikes` where `dislikes[i] = [a, b]` indicates that the person labeled `a` does not like the person labeled `b`, return `true` if it is possible to split everyone into two groups in this way.

**Why is it important?**
- Bipartite Graph Check
- Graph Coloring (2-Coloring)
- DFS / BFS
- Conflict Resolution

**Your Task:** 
Return boolean.

**Difficulty:** Medium
**Tags:** Graphs, Dfs, Bipartite Graph Check, Graph Coloring, Dfs / Bfs, Conflict Resolution, O(N + E), Interview

---

## Examples

### Example 1:
**Input:** `n = 4, dislikes = [[1,2],[1,3],[2,4]]`
**Output:** `true`
**Explanation:** Group 1: [1, 4], Group 2: [2, 3].

### Example 2:
**Input:** `n = 3, dislikes = [[1,2],[1,3],[2,3]]`
**Output:** `false`
**Explanation:** 1 dislikes 2 and 3. 2 dislikes 3. Triangle of dislikes. Impossible.

---

## Constraints

| Constraint | Value |
|------------|-------|
| People (n) | 1 ≤ n ≤ 2000 |
| Dislikes | 0 ≤ len ≤ 10^4 |
| Data Type | Adjacency List |
| Time Complexity | O(N + E) |
| Space Complexity | O(N + E) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Asana |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Trello |
| 🔵 Facebook | 🟡 Apple | 🟢 Slack |

---

## Follow-up Questions

1. How to model this as a graph? (People are nodes, dislikes are edges).
2. What is a bipartite graph?
3. How to use BFS/DFS with coloring (0, 1, -1)?
4. What if the graph is disconnected? (Must check all components).
