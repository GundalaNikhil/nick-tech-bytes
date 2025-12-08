# Clone Graph

## Problem Description

**Real-World Scenario:**
A social network clones a user's entire friend network for testing. Given a reference to one user, deep copy the entire connected network.

**Example Setup:** 
A game engine clones a scene graph for saving/loading. Each node references neighbors that must also be cloned.

**What is Clone Graph?**
Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a value and list of neighbors.

**Why is it important?**
- Deep copy techniques
- Graph traversal (BFS/DFS)
- Hash map for old→new mapping
- Memory management

**Your Task:** 
Return the clone of the graph.

---

## Examples

### Example 1:
**Input:** `adjList = [[2,4],[1,3],[2,4],[1,3]]`
**Output:** Deep copy with same structure
**Explanation:** 4 nodes connected in a cycle.

### Example 2:
**Input:** `adjList = [[]]`
**Output:** Single node with no neighbors

### Example 3:
**Input:** `adjList = []`
**Output:** `null`
**Explanation:** Empty graph.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Node Value | 1 ≤ val ≤ 100, val = node index |
| Data Type | Undirected graph |
| Special Conditions | No repeated edges or self-loops |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Cloned graph node |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Unity |
| 🔵 Amazon | 🟡 Uber | 🟢 Epic Games |
| 🔵 Google | 🟡 LinkedIn | 🟢 Unreal |

---

## Follow-up Questions

1. Why use hash map (old node → new node)?
2. BFS vs DFS for cloning?
3. How to handle cycles without infinite loop?
4. What about directed graphs?
