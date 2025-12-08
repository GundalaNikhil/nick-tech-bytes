# Bipartite Graph Check

## Problem Description

**Real-World Scenario:**
At a college fest, organizers want to pair students with mentors for a speed-mentoring session. Students can only sit with mentors (not other students), and mentors can only sit with students. This is a bipartite matching problem - can we divide everyone into two groups?

**Example Setup:** 
Divya is building a dating app. She wants to ensure matches only happen between two distinct groups (e.g., college A and college B students). She needs to verify if the user graph can be partitioned into two non-overlapping sets.

**What is a Bipartite Graph?**
A bipartite graph can be divided into two disjoint sets U and V such that every edge connects a vertex in U to one in V. No edge exists within the same set. Equivalently, a graph is bipartite if and only if it's 2-colorable.

**Why is it important?**
- Matching problems (jobs to workers, students to schools)
- Two-party systems modeling
- Graph coloring with 2 colors
- Detecting odd-length cycles (non-bipartite indicator)

**Your Task:** 
Given an undirected graph, determine if it's bipartite.

**Difficulty:** Medium
**Tags:** Graphs, Bipartite, Matching Problems, Two-Party Systems Modeling, Graph Coloring With 2 Colors, Detecting Odd-Length Cycles, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
n = 4
edges = [[0,1], [0,3], [1,2], [2,3]]
```
**Output:** `true`
**Partition:** Set A = {0, 2}, Set B = {1, 3}
**Explanation:** 0-1-2-3-0 forms a square (even cycle) - bipartite!

### Example 2:
**Input:** 
```
n = 3
edges = [[0,1], [1,2], [2,0]]
```
**Output:** `false`
**Explanation:** Triangle (odd cycle) - cannot 2-color.

### Example 3:
**Input:** 
```
n = 5
edges = [[0,1], [2,3], [3,4]]
```
**Output:** `true`
**Explanation:** Disconnected graph, but each component is bipartite.

### Example 4:
**Input:** 
```
n = 4
edges = []
```
**Output:** `true`
**Explanation:** No edges means trivially bipartite.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Data Type | Integer node indices |
| Special Conditions | Graph may be disconnected |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Boolean (true if bipartite) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Bumble |
| 🔵 Facebook | 🟡 Airbnb | 🟢 Hinge |
| 🔵 Amazon | 🟡 Uber | 🟢 Indeed |

---

## Follow-up Questions

1. Why is a graph with an odd-length cycle never bipartite?
2. Can you use BFS instead of DFS for this check?
3. How would you return the actual partition if the graph is bipartite?
4. What's the relationship between bipartite graphs and 2-colorability?
