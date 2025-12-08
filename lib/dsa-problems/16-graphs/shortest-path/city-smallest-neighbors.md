# Find the City With the Smallest Number of Neighbors at a Threshold Distance

## Problem Description

**Real-World Scenario:**
A logistics company chooses a central warehouse location that is "least connected" to far-away cities to minimize long-haul traffic congestion? (Wait, usually you want most connected).
Better: A privacy-focused network chooses a server location that reaches the fewest nodes within a certain hop count to minimize exposure.

**Example Setup:** 
A city planner identifies the most isolated city within a certain distance threshold for a specific zoning requirement.

**What is Find the City...?**
There are `n` cities numbered from `0` to `n-1`. Given the array `edges` where `edges[i] = [from, to, weight]` represents a bidirectional and weighted edge between cities, and an integer `distanceThreshold`. Return the city with the smallest number of cities that are reachable through some path and whose distance is at most `distanceThreshold`. If there are multiple such cities, return the city with the greatest number.

**Why is it important?**
- Floyd-Warshall Algorithm (All-Pairs Shortest Path)
- Dijkstra from every node
- Graph centrality
- Network analysis

**Your Task:** 
Return the city index.

**Difficulty:** Medium
**Tags:** Graphs, Shortest Path, Floyd-Warshall Algorithm, Dijkstra From Every Node, Graph Centrality, Network Analysis, O(n³), Interview

---

## Examples

### Example 1:
**Input:** `n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4`
**Output:** `3`
**Explanation:** 
City 0: [1,2] (neighbors within 4). Count 2.
City 1: [0,2,3]. Count 3.
City 2: [0,1,3]. Count 3.
City 3: [1,2]. Count 2.
Cities 0 and 3 have 2 neighbors. 3 is greater.

### Example 2:
**Input:** `n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Cities | 2 ≤ n ≤ 100 |
| Edges | 1 ≤ edges.length ≤ n*(n-1)/2 |
| Weight | 1 ≤ weight ≤ 10⁴ |
| Data Type | Undirected weighted graph |
| Time Complexity | O(n³) Floyd-Warshall |
| Space Complexity | O(n²) |
| Output Format | Integer city index |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Google | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 DoorDash |

---

## Follow-up Questions

1. Why is Floyd-Warshall suitable here (small N)?
2. How to implement Floyd-Warshall (3 nested loops)?
3. Can you use Dijkstra n times (O(N * E log V))?
4. What if weights are negative?
