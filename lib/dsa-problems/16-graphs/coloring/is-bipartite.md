# Is Graph Bipartite?

## Problem Description

**Real-World Scenario:**
A hiring platform matches candidates with jobs. Check if the network can be split into two groups (candidates and jobs) with connections only between groups.

**Example Setup:** 
A college course scheduler checks if courses and timeslots can be assigned such that conflicting courses get different slots.

**What is Graph Bipartite?**
A graph is bipartite if nodes can be divided into two disjoint sets such that every edge connects nodes in different sets. Check if the given graph is bipartite.

**Why is it important?**
- Graph coloring
- BFS/DFS with states
- Matching problems
- Two-party systems

**Your Task:** 
Return true if the graph is bipartite.

**Difficulty:** Medium
**Tags:** Graphs, Coloring, Graph Coloring, Bfs/Dfs With States, Matching Problems, Two-Party Systems, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** `graph = [[1,2,3],[0,2],[0,1,3],[0,2]]`
**Output:** `false`
**Explanation:** Triangle 0-1-2 cannot be 2-colored.

### Example 2:
**Input:** `graph = [[1,3],[0,2],[1,3],[0,2]]`
**Output:** `true`
**Explanation:** Sets {0,2} and {1,3} work.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 100 |
| Edges | Adjacency list format |
| Data Type | Undirected graph |
| Special Conditions | No self-loops |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Indeed |
| 🔵 Facebook | 🟡 LinkedIn | 🟢 ZipRecruiter |
| 🔵 Google | 🟡 Microsoft | 🟢 Glassdoor |

---

## Follow-up Questions

1. How do you use 2-coloring (BFS/DFS)?
2. What indicates non-bipartite (odd cycle)?
3. How do you handle disconnected components?
4. What's the relationship to matching algorithms?
