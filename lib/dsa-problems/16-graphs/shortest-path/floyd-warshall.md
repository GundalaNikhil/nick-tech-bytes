# Floyd-Warshall Algorithm

## Problem Description

**Real-World Scenario:**
Airlines need to know the shortest flight time between ANY two cities in their network. Instead of running Dijkstra's from each city (expensive), Floyd-Warshall computes all-pairs shortest paths in one go.

**Example Setup:** 
Neha works at a travel aggregator. She needs to precompute travel times between ALL pairs of cities to instantly answer queries like "What's the fastest way from Jaipur to Kochi?" The system should handle thousands of queries per second.

**What is Floyd-Warshall Algorithm?**
Floyd-Warshall finds shortest paths between all pairs of vertices in a weighted graph. It uses dynamic programming: for each intermediate vertex k, it checks if going through k provides a shorter path.

**Why is it important?**
- All-pairs shortest paths in one pass
- Works with negative edges (no negative cycles)
- Simple implementation (just 3 nested loops)
- Transitive closure of graphs

**Your Task:** 
Given a weighted graph, compute the shortest distance between every pair of vertices.

---

## Examples

### Example 1:
**Input:** 
```
n = 4
dist = [
  [0, 5, INF, 10],
  [INF, 0, 3, INF],
  [INF, INF, 0, 1],
  [INF, INF, INF, 0]
]
```
**Output:** 
```
[
  [0, 5, 8, 9],
  [INF, 0, 3, 4],
  [INF, INF, 0, 1],
  [INF, INF, INF, 0]
]
```
**Explanation:** dist[0][2] = min(INF, 5+3) = 8 (through vertex 1)

### Example 2:
**Input:** 
```
n = 3
dist = [
  [0, 1, 4],
  [1, 0, 2],
  [4, 2, 0]
]
```
**Output:** 
```
[
  [0, 1, 3],
  [1, 0, 2],
  [3, 2, 0]
]
```
**Explanation:** 0→2 = min(4, 0→1→2) = min(4, 3) = 3

### Example 3 (Negative Edge):
**Input:** 
```
n = 3
dist = [
  [0, 2, INF],
  [INF, 0, -1],
  [INF, INF, 0]
]
```
**Output:** 
```
[
  [0, 2, 1],
  [INF, 0, -1],
  [INF, INF, 0]
]
```
**Explanation:** Even with negative edges, Floyd-Warshall works correctly.

### Example 4 (Disconnected):
**Input:** 
```
n = 3
dist = [
  [0, 1, INF],
  [1, 0, INF],
  [INF, INF, 0]
]
```
**Output:** 
```
[
  [0, 1, INF],
  [1, 0, INF],
  [INF, INF, 0]
]
```
**Explanation:** Node 2 is disconnected; distances remain INF.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 400 |
| Edge Weight | -10⁴ ≤ weight ≤ 10⁴ |
| Special Conditions | No negative cycles |
| Time Complexity | O(V³) |
| Space Complexity | O(V²) |
| Output Format | V×V distance matrix |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Coupang |
| 🔵 Amazon | 🟡 Lyft | 🟢 Grab |
| 🔵 Apple | 🟡 Airbnb | 🟢 Gojek |

---

## Follow-up Questions

1. Why is the time complexity O(V³)?
2. How would you reconstruct the actual shortest path?
3. When would you prefer Floyd-Warshall over running Dijkstra's V times?
4. How do you detect negative cycles using Floyd-Warshall?
