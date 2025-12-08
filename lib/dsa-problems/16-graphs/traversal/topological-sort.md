# Topological Sort

## Problem Description

**Real-World Scenario:**
Imagine you're planning your college course schedule. Some courses have prerequisites - you can't take "Advanced Algorithms" before "Data Structures". Topological sort gives you an order to take courses where all prerequisites are satisfied.

**Example Setup:** 
Deepak is building a build system like Make or Gradle. Files have dependencies - file A depends on file B, which depends on file C. He needs to compile them in the right order so dependencies are built first.

**What is Topological Sort?**
Topological sorting arranges the vertices of a Directed Acyclic Graph (DAG) in a linear order such that for every directed edge (u, v), vertex u comes before v.

**Why is it important?**
- Task scheduling with dependencies
- Build systems (Maven, Gradle, webpack)
- Course scheduling
- Package dependency resolution
- Data processing pipelines

**Your Task:** 
Given a DAG, return a valid topological ordering of vertices.

**Difficulty:** Medium
**Tags:** Graphs, Traversal, Task Scheduling With Dependencies, Build Systems, Course Scheduling, Package Dependency Resolution, Data Processing Pipelines, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
n = 4
edges = [[0,1], [0,2], [1,3], [2,3]]
```
**Output:** `[0, 1, 2, 3]` or `[0, 2, 1, 3]`
**Explanation:** 0 must come before 1 and 2; both 1 and 2 must come before 3.

### Example 2:
**Input:** 
```
n = 6
prereqs = [[1,0], [2,0], [3,1], [3,2], [4,3], [5,3]]
(edge [a,b] means a is prerequisite for b)
```
**Output:** `[0, 1, 2, 3, 4, 5]`
**Explanation:** Course 0 first, then 1 or 2, then 3, finally 4 and 5.

### Example 3:
**Input:** 
```
n = 3
edges = [[0,1], [1,2], [2,0]]
```
**Output:** `[]` (impossible - cycle exists!)
**Explanation:** Topological sort only works for DAGs. This graph has a cycle.

### Example 4:
**Input:** 
```
n = 3
edges = []
```
**Output:** `[0, 1, 2]` (any order)
**Explanation:** No dependencies means any order is valid.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁴ |
| Edges | 0 ≤ E ≤ 10⁵ |
| Data Type | Integer node indices |
| Special Conditions | Graph must be a DAG |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Array of vertices in topological order |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Coursera |
| 🔵 Facebook | 🟡 Airbnb | 🟢 Palantir |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Splunk |
| 🔵 Microsoft | 🟡 Snapchat | 🟢 Databricks |

---

## Follow-up Questions

1. What are the two main algorithms for topological sort (DFS-based vs Kahn's algorithm)?
2. How do you detect if a topological sort is possible (cycle detection)?
3. Can there be multiple valid topological orderings? When?
4. How would you implement this for lexicographically smallest ordering?
