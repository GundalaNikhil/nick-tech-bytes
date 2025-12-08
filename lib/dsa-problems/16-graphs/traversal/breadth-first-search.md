# Breadth First Search (BFS)

## Problem Description

**Real-World Scenario:**
Imagine you drop a stone in a pond. Ripples spread outward in circles - first the closest water, then further out. BFS works the same way: explore all neighbors at distance 1, then all neighbors at distance 2, and so on.

**Example Setup:** 
Kavitha is building a "People You May Know" feature for LinkedIn. She wants to suggest friends-of-friends (2nd degree connections). BFS naturally finds all 1st degree connections first, then 2nd degree, making it perfect for this feature.

**What is BFS?**
Breadth First Search is a graph traversal algorithm that explores all vertices at the current depth before moving to vertices at the next depth level. It uses a queue.

**Why is it important?**
- Finds shortest path in unweighted graphs
- Level-order traversal of trees
- Finding nearest/closest elements
- Social network degree connections
- Web crawling

**Your Task:** 
Implement BFS traversal for a graph and find the shortest path between two nodes.

---

## Examples

### Example 1:
**Input:** 
```
graph = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 5],
  3: [1],
  4: [1],
  5: [2]
}
start = 0
```
**Output:** `[0, 1, 2, 3, 4, 5]`
**Explanation:** Level 0: [0], Level 1: [1,2], Level 2: [3,4,5]. BFS visits all nodes at each level.

### Example 2:
**Input:** 
```
graph = {
  0: [1, 2],
  1: [3],
  2: [3],
  3: [4],
  4: []
}
start = 0, end = 4
```
**Output:** Shortest path length = 3
**Path:** `0 → 1 → 3 → 4` or `0 → 2 → 3 → 4`
**Explanation:** BFS guarantees shortest path in unweighted graphs.

### Example 3:
**Input:** 
```
graph = {
  0: [1],
  1: [2],
  2: [3],
  3: [4],
  4: [5]
}
start = 0
```
**Output:** `[0, 1, 2, 3, 4, 5]`
**Explanation:** Linear graph - each level has one node.

### Example 4 (Disconnected):
**Input:** 
```
graph = {
  0: [1],
  1: [0],
  2: [3],
  3: [2]
}
start = 0
```
**Output:** `[0, 1]`
**Explanation:** Only the connected component containing start is traversed.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 10⁵ |
| Data Type | Integer node indices |
| Special Conditions | Graph may have cycles |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) for queue and visited array |
| Output Format | Array of visited nodes or shortest distance |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Zillow |
| 🔵 Facebook | 🟡 Uber | 🟢 Yelp |
| 🔵 Amazon | 🟡 Airbnb | 🟢 Pinterest |
| 🔵 Microsoft | 🟡 Twitter | 🟢 Dropbox |

---

## Follow-up Questions

1. Why does BFS find the shortest path in unweighted graphs?
2. How would you modify BFS to track the actual shortest path (not just distance)?
3. What's the space complexity difference between BFS and DFS?
4. How do you implement BFS for a binary tree (level order traversal)?
