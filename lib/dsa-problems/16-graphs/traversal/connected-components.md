# Connected Components

## Problem Description

**Real-World Scenario:**
Think of islands in an ocean. Each island is a group of connected land cells. Finding connected components is like counting how many separate islands exist where you can walk between any two points on the same island.

**Example Setup:** 
Meera is analyzing a social network to find friend groups. A friend group is where everyone is connected to each other directly or through mutual friends. She needs to identify how many separate friend groups exist.

**What are Connected Components?**
A connected component is a maximal subgraph where every vertex is reachable from every other vertex. In an undirected graph, it's a group of nodes that are interconnected.

**Why is it important?**
- Analyzing social network clusters
- Image processing (finding objects)
- Network reliability analysis
- Identifying independent systems

**Your Task:** 
Find the number of connected components in an undirected graph and identify which nodes belong to each component.

**Difficulty:** Medium
**Tags:** Graphs, Traversal, Analyzing Social Network Clusters, Image Processing, Network Reliability Analysis, Identifying Independent Systems, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
n = 5
edges = [[0,1], [1,2], [3,4]]
```
**Output:** `2 components`
- Component 1: [0, 1, 2]
- Component 2: [3, 4]

**Explanation:** Nodes 0-1-2 are connected. Nodes 3-4 are connected separately.

### Example 2:
**Input:** 
```
n = 4
edges = [[0,1], [1,2], [2,3], [3,0]]
```
**Output:** `1 component`
- Component 1: [0, 1, 2, 3]

**Explanation:** All nodes form a cycle - all connected.

### Example 3:
**Input:** 
```
n = 4
edges = []
```
**Output:** `4 components`
**Explanation:** No edges means each node is its own component.

### Example 4:
**Input:** 
```
n = 6
edges = [[0,1], [2,3], [4,5]]
```
**Output:** `3 components`
**Explanation:** Three separate pairs of connected nodes.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Data Type | Integer node indices |
| Special Conditions | Undirected graph |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Number of components or list of component nodes |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Twilio |
| 🔵 Facebook | 🟡 Uber | 🟢 Yelp |
| 🔵 Amazon | 🟡 Twitter | 🟢 Pinterest |

---

## Follow-up Questions

1. How would you use Union-Find to solve this?
2. What's the difference between connected components in directed vs undirected graphs?
3. How would you find the largest connected component?
4. Can BFS or DFS be used? Which is more efficient?
