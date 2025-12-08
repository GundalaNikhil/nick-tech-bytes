# Dijkstra's Algorithm

## Problem Description

**Real-World Scenario:**
When you use Google Maps to find the fastest route to work, it uses algorithms like Dijkstra's. Each road has a travel time (weight), and you want the path that minimizes total travel time, not just the fewest roads.

**Example Setup:** 
Priya works at Zomato and needs to find the fastest delivery route. The city map has restaurants, customer locations, and roads with different travel times due to traffic. She needs the quickest path to ensure hot food delivery.

**What is Dijkstra's Algorithm?**
Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights. It greedily picks the unvisited vertex with the smallest known distance.

**Why is it important?**
- GPS navigation systems
- Network routing protocols (OSPF)
- Finding shortest paths in games
- Logistics and delivery optimization

**Your Task:** 
Given a weighted graph with non-negative edges, find the shortest distances from a source vertex to all other vertices.

---

## Examples

### Example 1:
**Input:** 
```
n = 5
edges = [[0,1,4], [0,2,1], [2,1,2], [1,3,1], [2,3,5], [3,4,3]]
source = 0
```
**Output:** 
```
distances = [0, 3, 1, 4, 7]
```
**Explanation:** 
- 0→0: 0
- 0→2→1: 1+2=3 (better than 0→1: 4)
- 0→2: 1
- 0→2→1→3: 1+2+1=4
- 0→2→1→3→4: 4+3=7

### Example 2:
**Input:** 
```
n = 3
edges = [[0,1,1], [1,2,2], [0,2,4]]
source = 0
```
**Output:** 
```
distances = [0, 1, 3]
```
**Explanation:** Path 0→1→2 (cost 3) is shorter than 0→2 (cost 4).

### Example 3:
**Input:** 
```
n = 4
edges = [[0,1,1], [1,2,2]]
source = 0
```
**Output:** 
```
distances = [0, 1, 3, INF]
```
**Explanation:** Node 3 is unreachable from node 0.

### Example 4:
**Input:** 
```
n = 2
edges = [[0,1,100], [1,0,50]]
source = 0
target = 1
```
**Output:** `100`
**Explanation:** Only one edge from 0 to 1 with weight 100.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Edge Weight | 0 ≤ weight ≤ 10⁶ |
| Special Conditions | No negative edge weights |
| Time Complexity | O((V + E) log V) with min-heap |
| Space Complexity | O(V + E) |
| Output Format | Array of shortest distances |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Ola |
| 🔵 Facebook | 🟡 Lyft | 🟢 Swiggy |
| 🔵 Amazon | 🟡 Airbnb | 🟢 Zomato |
| 🔵 Apple | 🟡 LinkedIn | 🟢 HERE Maps |

---

## Follow-up Questions

1. Why doesn't Dijkstra's work with negative edge weights?
2. How do you reconstruct the actual shortest path, not just the distance?
3. What data structure makes Dijkstra's most efficient?
4. How does Dijkstra's compare to BFS for unweighted graphs?
