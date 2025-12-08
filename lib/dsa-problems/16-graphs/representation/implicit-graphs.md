# Implicit Graphs

## Problem Description

**Real-World Scenario:**
Imagine you're playing a puzzle game like Rubik's Cube. Each state of the cube is a "node", and each move creates an edge to a new state. You can't store all 43 quintillion possible states! Instead, you generate neighbors on-the-fly as you explore.

**Example Setup:** 
Vikram is building an AI to solve the "Sliding Puzzle" (those 15-tile puzzles). Each arrangement is a state, and valid moves are edges. With factorial(16) possible arrangements, he can't pre-build the graph - he generates neighbors as he searches.

**What is an Implicit Graph?**
An implicit graph is one where vertices and edges aren't explicitly stored. Instead, neighbors are computed dynamically when needed. The graph structure is defined by rules rather than stored data.

**Why is it important?**
- Essential for state-space search problems
- Saves memory for exponentially large graphs
- Used in game AI, puzzle solvers, and planning algorithms
- BFS/DFS work without storing the entire graph

**Your Task:** 
Given a state-space problem (like word ladder, puzzle, or game state), implement neighbor generation and search without explicit graph construction.

**Difficulty:** Medium
**Tags:** Graphs, Representation, Essential For State-Space Search Problems, Saves Memory For Exponentially Large Graphs, Used In Game Ai, Puzzle Solvers, And Planning Algorithms, Bfs/Dfs Work Without Storing The Entire Graph, O(V + E), Interview

---

## Examples

### Example 1 (Word Ladder):
**Input:** 
```
startWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
```
**Implicit Graph:**
```
"hit" → ["hot"] (one letter change)
"hot" → ["dot", "lot"]
"dot" → ["dog", "lot", "hot"]
...
```
**Output:** `["hit","hot","dot","dog","cog"]`
**Explanation:** Neighbors are words differing by one letter - computed on demand.

### Example 2 (Grid Navigation):
**Input:** 
```
grid = [
  [0,0,0],
  [1,1,0],
  [0,0,0]
]
start = (0,0), end = (2,2)
```
**Implicit Graph:**
```
(0,0) → [(0,1), (1,0)]  // blocked: (1,0)
(0,1) → [(0,0), (0,2)]
...
```
**Output:** Shortest path length = 4
**Explanation:** Neighbors are adjacent cells that aren't blocked.

### Example 3 (Knight's Moves):
**Input:** 
```
n = 8 (chessboard)
start = (0,0)
end = (7,7)
```
**Implicit Graph:**
```
(0,0) → [(1,2), (2,1)]
(1,2) → [(0,0), (2,0), (3,1), (3,3), (0,4), (2,4)]
...
```
**Output:** Minimum moves = 6
**Explanation:** Knight's valid L-shaped moves define the neighbors.

### Example 4 (Open Lock):
**Input:** 
```
deadends = ["0201","0101","0102","1212","2002"]
target = "0202"
```
**Implicit Graph:**
```
"0000" → ["1000","9000","0100","0900","0010","0090","0001","0009"]
Each digit can go +1 or -1 (wrapping)
```
**Output:** 6 turns
**Explanation:** Each lock state has 8 neighbors (4 wheels × 2 directions).

---

## Constraints

| Constraint | Value |
|------------|-------|
| State Space | Can be exponential |
| Branching Factor | Typically 2-8 neighbors per state |
| Data Type | States can be strings, arrays, or custom objects |
| Special Conditions | Need efficient state hashing for visited tracking |
| Time Complexity | O(V + E) for BFS, but V and E are implicit |
| Space Complexity | O(V) for visited set |
| Output Format | Path or distance to goal state |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Zynga |
| 🔵 Facebook | 🟡 Uber | 🟢 Electronic Arts |
| 🔵 Amazon | 🟡 Snapchat | 🟢 Riot Games |

---

## Follow-up Questions

1. How do you avoid revisiting states in implicit graphs?
2. When would you use BFS vs DFS for implicit graph problems?
3. How can you optimize memory for very large state spaces (e.g., bidirectional search)?
