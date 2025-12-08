# Depth First Search (DFS)

## Problem Description

**Real-World Scenario:**
Imagine you're exploring a maze. You pick one path and follow it as far as possible. When you hit a dead end, you backtrack to the last junction and try a different path. This is exactly how DFS works - go deep first, then backtrack.

**Example Setup:** 
Arun is building a file explorer for his operating system. When a user clicks a folder, the system needs to explore all subfolders and files inside it. DFS naturally models this: dive into a folder, explore its subfolders completely, then move to the next sibling folder.

**What is DFS?**
Depth First Search is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion call stack).

**Why is it important?**
- Detects cycles in graphs
- Finds connected components
- Topological sorting
- Solving mazes and puzzles
- Generating paths in games

**Your Task:** 
Implement DFS traversal for a graph, both recursively and iteratively.

**Difficulty:** Medium
**Tags:** Graphs, Traversal, Detects Cycles In Graphs, Finds Connected Components, Topological Sorting, Solving Mazes And Puzzles, Generating Paths In Games, O(V + E), Interview

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
**Output:** `[0, 1, 3, 4, 2, 5]`
**Explanation:** Start at 0, go deep to 1→3 (dead end), backtrack to 1→4, backtrack to 0→2→5.

### Example 2:
**Input:** 
```
graph = {
  0: [1],
  1: [2],
  2: [3],
  3: []
}
start = 0
```
**Output:** `[0, 1, 2, 3]`
**Explanation:** Linear graph - DFS visits nodes in order.

### Example 3:
**Input:** 
```
graph = {
  0: [],
  1: [],
  2: []
}
start = 0
```
**Output:** `[0]`
**Explanation:** Disconnected graph - only the starting component is visited.

### Example 4 (Cycle Detection):
**Input:** 
```
graph = {
  0: [1],
  1: [2],
  2: [0]
}
start = 0
```
**Output:** `[0, 1, 2]` + Cycle detected!
**Explanation:** When DFS encounters an already-visited node, a cycle exists.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 10⁵ |
| Data Type | Integer node indices |
| Special Conditions | Graph may be disconnected |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) for visited array + O(V) recursion stack |
| Output Format | Array of visited nodes in order |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Atlassian |
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Twitch |
| 🔵 Amazon | 🟡 Twitter | 🟢 Spotify |
| 🔵 Microsoft | 🟡 Airbnb | 🟢 Shopify |

---

## Follow-up Questions

1. What's the maximum recursion depth for DFS? How do you handle stack overflow?
2. How would you modify DFS to find a path between two nodes?
3. When would you prefer iterative DFS over recursive DFS?
4. How does DFS help in detecting cycles in directed vs undirected graphs?
