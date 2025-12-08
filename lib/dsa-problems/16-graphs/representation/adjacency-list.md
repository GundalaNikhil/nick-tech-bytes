# Adjacency List Representation

## Problem Description

**Real-World Scenario:**
Think of a city's metro system. Each metro station is connected to only a few other stations (not all of them). Instead of storing connections to every station (most would be empty), it's more efficient to store only the actual connections for each station.

**Example Setup:** 
Rahul is designing a route planner for Delhi Metro. With 250+ stations, storing a 250×250 matrix wastes space since each station connects to only 2-4 others on average. He needs to store only the actual connections.

**What is an Adjacency List?**
An adjacency list represents a graph as an array of lists. The index represents a vertex, and the list at that index contains all vertices connected to it.

**Why is it important?**
- Space-efficient for sparse graphs: O(V + E) instead of O(V²)
- Iterating over neighbors is O(degree) instead of O(V)
- Most real-world graphs are sparse

**Your Task:** 
Given a list of edges, construct an adjacency list representation of the graph.

**Difficulty:** Medium
**Tags:** Graphs, Representation, Space-Efficient For Sparse Graphs: O, Iterating Over Neighbors Is O, Most Real-World Graphs Are Sparse, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
n = 4
edges = [[0,1], [0,2], [1,2], [2,3]]
```
**Output:** 
```
{
  0: [1, 2],
  1: [0, 2],
  2: [0, 1, 3],
  3: [2]
}
```
**Explanation:** Node 0 connects to 1 and 2. Node 2 connects to 0, 1, and 3.

### Example 2:
**Input:** 
```
n = 5
edges = [[0,1], [1,2], [2,3], [3,4]]
```
**Output:** 
```
{
  0: [1],
  1: [0, 2],
  2: [1, 3],
  3: [2, 4],
  4: [3]
}
```
**Explanation:** A linear chain graph: 0 - 1 - 2 - 3 - 4

### Example 3:
**Input:** 
```
n = 3
edges = [[0,1], [0,2], [1,2]]
```
**Output:** 
```
{
  0: [1, 2],
  1: [0, 2],
  2: [0, 1]
}
```
**Explanation:** A complete triangle - every node connects to every other node.

### Example 4 (Weighted Graph):
**Input:** 
```
n = 3
edges = [[0,1,5], [1,2,3], [0,2,10]]
```
**Output:** 
```
{
  0: [(1,5), (2,10)],
  1: [(0,5), (2,3)],
  2: [(1,3), (0,10)]
}
```
**Explanation:** Each neighbor stored with its edge weight.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 1 ≤ n ≤ 10⁵ |
| Edge Count | 0 ≤ edges.length ≤ 2 × 10⁵ |
| Data Type | Integer node indices (0-indexed) |
| Special Conditions | May contain parallel edges |
| Time Complexity | O(V + E) for construction |
| Space Complexity | O(V + E) |
| Output Format | Map/Dictionary of lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Atlassian |
| 🔵 Facebook | 🟡 Twitter | 🟢 Yelp |
| 🔵 Amazon | 🟡 Snapchat | 🟢 Zillow |

---

## Follow-up Questions

1. How would you implement this for a directed graph?
2. When should you use array of arrays vs hashmap of arrays?
3. How would you handle removing an edge efficiently?
