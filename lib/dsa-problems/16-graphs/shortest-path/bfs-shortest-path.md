# BFS for Shortest Path in Unweighted Graph

## Problem Description

**Real-World Scenario:**
In a social network, you want to find the "degrees of separation" between two people. Each friendship is one step (equal weight). BFS naturally finds the minimum number of connections needed.

**Example Setup:** 
Karan is building a feature to show "How you're connected" on LinkedIn. Given any two users, he needs to show the shortest chain of mutual connections. Since each connection has the same weight, BFS is perfect.

**What is BFS for Shortest Path?**
In an unweighted graph, BFS guarantees the shortest path because it explores vertices level by level. The first time you reach a vertex, you've found the shortest path to it.

**Why is it important?**
- Simpler than Dijkstra's for unweighted graphs
- O(V + E) complexity (faster than Dijkstra's)
- Natural solution for "minimum steps" problems
- Social network distance problems

**Your Task:** 
Given an unweighted graph, find the shortest path distance between two vertices using BFS.

---

## Examples

### Example 1:
**Input:** 
```
graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0, 3, 4],
  3: [1, 2, 5],
  4: [2],
  5: [3]
}
source = 0, target = 5
```
**Output:** `3`
**Path:** `0 → 2 → 3 → 5` or `0 → 1 → 3 → 5`
**Explanation:** Both paths have 3 edges - the shortest distance.

### Example 2:
**Input:** 
```
graph = {
  0: [1],
  1: [0, 2],
  2: [1]
}
source = 0, target = 2
```
**Output:** `2`
**Path:** `0 → 1 → 2`
**Explanation:** Linear graph, only one path.

### Example 3:
**Input:** 
```
graph = {
  0: [1],
  1: [0],
  2: [3],
  3: [2]
}
source = 0, target = 3
```
**Output:** `-1` (unreachable)
**Explanation:** Graphs are disconnected; no path exists.

### Example 4:
**Input:** 
```
graph = {
  0: [1, 2, 3, 4],
  1: [0, 4],
  2: [0, 4],
  3: [0, 4],
  4: [0, 1, 2, 3]
}
source = 1, target = 2
```
**Output:** `2`
**Path:** `1 → 0 → 2` or `1 → 4 → 2`
**Explanation:** Multiple shortest paths of same length.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Data Type | Integer node indices |
| Special Conditions | Unweighted (all edges have weight 1) |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Shortest distance or -1 if unreachable |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Pinterest |
| 🔵 Google | 🟡 Twitter | 🟢 Yelp |
| 🔵 Amazon | 🟡 Snap | 🟢 Reddit |

---

## Follow-up Questions

1. Why does BFS guarantee shortest path in unweighted graphs?
2. How would you track the actual path, not just the distance?
3. When would you use BFS over Dijkstra's?
4. How would you handle bidirectional BFS for optimization?
