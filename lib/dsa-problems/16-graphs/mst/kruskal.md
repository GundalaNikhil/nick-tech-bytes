# Kruskal's Algorithm (Minimum Spanning Tree)

## Problem Description

**Real-World Scenario:**
A telecom company needs to connect 10 cities with fiber optic cables. They want to connect all cities with the minimum total cable length. Some city pairs have shorter distances than others. Kruskal's algorithm finds the cheapest way to connect everything.

**Example Setup:** 
Sanjay is designing the electrical wiring for a new housing society. He has 8 buildings and needs to connect all of them with the minimum wire. Each possible connection has a cost. He needs the cheapest way to wire all buildings.

**What is Kruskal's Algorithm?**
Kruskal's algorithm builds a minimum spanning tree by repeatedly adding the smallest edge that doesn't create a cycle. It uses Union-Find to efficiently detect cycles.

**Why is it important?**
- Network design (telecom, electrical)
- Clustering (removing most expensive edges)
- Approximation for traveling salesman
- Image segmentation

**Your Task:** 
Given a weighted undirected graph, find the minimum spanning tree using Kruskal's algorithm.

---

## Examples

### Example 1:
**Input:** 
```
n = 4
edges = [[0,1,10], [0,2,6], [0,3,5], [1,3,15], [2,3,4]]
```
**Output:** 
```
MST edges: [[2,3,4], [0,3,5], [0,1,10]]
Total weight: 19
```
**Explanation:** Sort edges, pick smallest that doesn't create cycle.

### Example 2:
**Input:** 
```
n = 5
edges = [[0,1,2], [0,3,6], [1,2,3], [1,3,8], [1,4,5], [2,4,7], [3,4,9]]
```
**Output:** 
```
MST edges: [[0,1,2], [1,2,3], [1,4,5], [0,3,6]]
Total weight: 16
```
**Explanation:** MST has n-1 = 4 edges connecting all 5 nodes.

### Example 3:
**Input:** 
```
n = 3
edges = [[0,1,1], [1,2,2], [0,2,3]]
```
**Output:** 
```
MST edges: [[0,1,1], [1,2,2]]
Total weight: 3
```
**Explanation:** Edge [0,2,3] would create a cycle, so it's skipped.

### Example 4 (Disconnected):
**Input:** 
```
n = 4
edges = [[0,1,1], [2,3,2]]
```
**Output:** `MST not possible (graph is disconnected)`
**Explanation:** Cannot connect all 4 nodes with given edges.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Edge Weight | 1 ≤ weight ≤ 10⁶ |
| Special Conditions | Graph must be connected for MST to exist |
| Time Complexity | O(E log E) for sorting + O(E α(V)) for Union-Find |
| Space Complexity | O(V) for Union-Find |
| Output Format | List of MST edges and total weight |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Cisco | 🟢 Juniper |
| 🔵 Amazon | 🟡 Qualcomm | 🟢 Nokia |
| 🔵 Microsoft | 🟡 Intel | 🟢 Ericsson |

---

## Follow-up Questions

1. How does Union-Find help detect cycles efficiently?
2. When would you prefer Kruskal's over Prim's?
3. What is the inverse Ackermann function α(V)?
4. How would you find the second-best MST?
