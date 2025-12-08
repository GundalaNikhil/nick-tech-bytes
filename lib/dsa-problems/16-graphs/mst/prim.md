# Prim's Algorithm (Minimum Spanning Tree)

## Problem Description

**Real-World Scenario:**
A city planner is designing a water pipeline network. Starting from the water treatment plant, they want to extend pipes to all neighborhoods with minimum pipe length. Unlike Kruskal's, Prim's grows the tree from a starting point - perfect for this scenario.

**Example Setup:** 
Lakshmi is planning a metro rail network for Hyderabad. She starts from the central station and wants to connect all areas with minimum track length. Prim's algorithm grows the network outward from the center.

**What is Prim's Algorithm?**
Prim's algorithm builds a minimum spanning tree by starting from an arbitrary vertex and repeatedly adding the minimum weight edge that connects a vertex in the tree to a vertex outside it.

**Why is it important?**
- Network expansion from a central point
- Better than Kruskal's for dense graphs
- Natural fit for "grow from source" problems
- Efficient with priority queue

**Your Task:** 
Given a weighted undirected graph, find the minimum spanning tree using Prim's algorithm.

**Difficulty:** Medium
**Tags:** Graphs, Mst, Network Expansion From A Central Point, Better Than Kruskal'S For Dense Graphs, Natural Fit For "Grow From Source" Problems, Efficient With Priority Queue, O((V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
n = 5
edges = [[0,1,2], [0,3,6], [1,2,3], [1,3,8], [1,4,5], [2,4,7], [3,4,9]]
start = 0
```
**Output:** 
```
MST edges: [[0,1,2], [1,2,3], [1,4,5], [0,3,6]]
Total weight: 16
```
**Explanation:** Start at 0, pick cheapest edge to unvisited node, repeat.

### Example 2:
**Input:** 
```
n = 4
edges = [[0,1,10], [0,2,6], [0,3,5], [1,3,15], [2,3,4]]
start = 0
```
**Output:** 
```
MST edges: [[0,3,5], [3,2,4], [0,1,10]]
Total weight: 19
```
**Explanation:** Same MST as Kruskal's, different order of selection.

### Example 3:
**Input:** 
```
n = 3
edges = [[0,1,1], [0,2,3], [1,2,2]]
start = 0
```
**Output:** 
```
MST edges: [[0,1,1], [1,2,2]]
Total weight: 3
```
**Explanation:** Greedy selection from starting vertex.

### Example 4:
**Input:** 
```
n = 4
adjacency_matrix = [
  [0, 2, INF, 6],
  [2, 0, 3, 8],
  [INF, 3, 0, 7],
  [6, 8, 7, 0]
]
```
**Output:** 
```
Total weight: 11 (edges: 0-1, 1-2, 0-3)
```
**Explanation:** Works efficiently with adjacency matrix representation.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Edge Weight | 1 ≤ weight ≤ 10⁶ |
| Special Conditions | Graph must be connected |
| Time Complexity | O((V + E) log V) with min-heap |
| Space Complexity | O(V + E) |
| Output Format | MST edges and total weight |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Ola |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Swiggy |
| 🔵 Microsoft | 🟡 Oracle | 🟢 BYJU'S |

---

## Follow-up Questions

1. Why is Prim's better for dense graphs?
2. How does the priority queue implementation affect time complexity?
3. What's the difference between lazy and eager Prim's?
4. Prove that Prim's and Kruskal's always produce the same total weight.
