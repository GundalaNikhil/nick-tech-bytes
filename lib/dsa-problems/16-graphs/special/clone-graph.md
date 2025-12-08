# Clone Graph

## Problem Description

**Real-World Scenario:**
When you fork a repository on GitHub, you create a deep copy of the entire project - all files, branches, and their connections. Similarly, cloning a graph means creating an independent copy where changes to the clone don't affect the original.

**Example Setup:** 
Vikram is building a game level editor. When players want to create a variation of an existing level (graph of connected rooms), he needs to deep copy the entire level graph so modifications don't corrupt the original.

**What is Clone Graph?**
Given a reference to a node in a connected undirected graph, create and return a deep copy (clone) of the graph. Each node contains a value and a list of its neighbors.

**Why is it important?**
- Deep copy mechanisms in software
- Undo/redo functionality
- Creating sandbox environments
- Version control systems

**Your Task:** 
Create a deep copy of an undirected graph given a reference to one of its nodes.

**Difficulty:** Medium
**Tags:** Graphs, Special, Deep Copy Mechanisms In Software, Undo/Redo Functionality, Creating Sandbox Environments, Version Control Systems, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
adjList = [[2,4],[1,3],[2,4],[1,3]]
(Node 1 → [2,4], Node 2 → [1,3], etc.)
```
**Output:** Deep copy of the graph
**Explanation:** Clone all 4 nodes with the same connectivity pattern.

### Example 2:
**Input:** 
```
adjList = [[]]
(Single node with no neighbors)
```
**Output:** Deep copy of single isolated node
**Explanation:** Even a single node needs to be cloned.

### Example 3:
**Input:** 
```
adjList = []
(Empty graph - null/None input)
```
**Output:** `null/None`
**Explanation:** No graph to clone.

### Example 4:
**Input:** 
```
adjList = [[2],[1]]
(Two nodes connected to each other)
```
**Output:** 
```
New Node 1 → [New Node 2]
New Node 2 → [New Node 1]
```
**Explanation:** Simple case - two nodes with bidirectional edge.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Node Values | 1 ≤ val ≤ 100 |
| Data Type | Node with val and list of neighbors |
| Special Conditions | No repeated edges, no self-loops |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) for hash map + O(V) for new nodes |
| Output Format | Reference to cloned graph's node |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 GitHub | 🟢 GitLab |
| 🔵 Google | 🟡 Uber | 🟢 Atlassian |
| 🔵 Amazon | 🟡 Twitter | 🟢 Asana |

---

## Follow-up Questions

1. How do you handle cycles when cloning?
2. Can you use BFS instead of DFS for cloning?
3. What's the purpose of the visited/hash map?
4. How would you verify the clone is independent of the original?
