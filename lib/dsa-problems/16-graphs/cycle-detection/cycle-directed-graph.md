# Cycle Detection in Directed Graph

## Problem Description

**Real-World Scenario:**
In a build system like Maven or npm, packages depend on other packages. If package A depends on B, B depends on C, and C depends on A, you have a circular dependency - the build can never complete! Detecting this cycle is crucial.

**Example Setup:** 
Anita is building a task scheduler. Each task might depend on other tasks. She needs to detect if there's a circular dependency that would make the schedule impossible to execute.

**What is Cycle Detection in Directed Graph?**
In a directed graph, a cycle exists if you can follow directed edges and return to your starting vertex. We use DFS with three states: unvisited, in-progress, and completed.

**Why is it important?**
- Dependency resolution (package managers)
- Deadlock detection in OS
- Compiler dependency analysis
- Course prerequisite validation

**Your Task:** 
Given a directed graph, determine if it contains a cycle.

---

## Examples

### Example 1:
**Input:** 
```
n = 4
edges = [[0,1], [1,2], [2,3], [3,1]]
```
**Output:** `true` (Cycle: 1→2→3→1)
**Explanation:** Node 3 has an edge back to node 1, creating a cycle.

### Example 2:
**Input:** 
```
n = 4
edges = [[0,1], [0,2], [1,3], [2,3]]
```
**Output:** `false`
**Explanation:** This is a DAG - no cycles.

### Example 3:
**Input:** 
```
n = 2
edges = [[0,1], [1,0]]
```
**Output:** `true` (Cycle: 0→1→0)
**Explanation:** Simple back-and-forth cycle.

### Example 4:
**Input:** 
```
n = 5
edges = [[0,1], [1,2], [2,3], [4,1]]
```
**Output:** `false`
**Explanation:** Multiple entry points to node 1, but no cycle.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Data Type | Integer node indices |
| Special Conditions | Directed graph |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Boolean (true if cycle exists) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Atlassian | 🟢 JFrog |
| 🔵 Amazon | 🟡 Uber | 🟢 CircleCI |
| 🔵 Microsoft | 🟡 GitLab | 🟢 Jenkins |

---

## Follow-up Questions

1. Why do we need three colors (states) for directed graphs but only two for undirected?
2. How does Kahn's algorithm (BFS) detect cycles?
3. What's the relationship between topological sort and cycle detection?
4. How would you find all nodes in the cycle?
