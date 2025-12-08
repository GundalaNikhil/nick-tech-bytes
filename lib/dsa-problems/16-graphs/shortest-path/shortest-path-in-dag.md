# Shortest Path in DAG

## Problem Description

**Real-World Scenario:**
In a project management tool like Jira, tasks have dependencies and each task takes time (weight). Since dependencies form a DAG (you can't have circular dependencies), you can find the critical path - the longest/shortest sequence of tasks.

**Example Setup:** 
Shreya manages a construction project. Each task (foundation, walls, roof) has a duration and dependencies. She needs to find the shortest completion time. Since task dependencies form a DAG, she can use topological sort + relaxation.

**What is Shortest Path in DAG?**
In a Directed Acyclic Graph, you can find shortest paths in O(V + E) time using topological sort followed by edge relaxation. This is faster than Dijkstra's!

**Why is it important?**
- Faster than Dijkstra's for DAGs
- Works with negative edge weights
- Critical path analysis in project management
- Sequence alignment in bioinformatics

**Your Task:** 
Given a weighted DAG, find the shortest distances from source to all vertices.

**Difficulty:** Medium
**Tags:** Graphs, Shortest Path, Faster Than Dijkstra'S For Dags, Works With Negative Edge Weights, Critical Path Analysis In Project Management, Sequence Alignment In Bioinformatics, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
n = 6
edges = [[0,1,2], [0,4,1], [1,2,3], [4,2,2], [4,5,4], [2,3,6], [5,3,1]]
source = 0
```
**Output:** 
```
distances = [0, 2, 3, 9, 1, 5]
```
**Explanation:** Topological order: [0, 1, 4, 2, 5, 3]. Relax edges in this order.

### Example 2:
**Input:** 
```
n = 4
edges = [[0,1,1], [0,2,4], [1,2,-2], [2,3,3]]
source = 0
```
**Output:** 
```
distances = [0, 1, -1, 2]
```
**Explanation:** Works with negative edges! 0→1→2 = 1+(-2) = -1.

### Example 3:
**Input:** 
```
n = 3
edges = [[0,1,5], [1,2,3]]
source = 0
```
**Output:** 
```
distances = [0, 5, 8]
```
**Explanation:** Simple linear DAG.

### Example 4:
**Input:** 
```
n = 4
edges = [[1,2,3], [2,3,2]]
source = 0
```
**Output:** 
```
distances = [0, INF, INF, INF]
```
**Explanation:** Nodes 1, 2, 3 are unreachable from 0.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁵ |
| Edges | 0 ≤ E ≤ 2 × 10⁵ |
| Edge Weight | -10⁴ ≤ weight ≤ 10⁴ |
| Special Conditions | Graph MUST be a DAG (no cycles) |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Array of shortest distances |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Asana | 🟢 Monday.com |
| 🔵 Microsoft | 🟡 Atlassian | 🟢 Notion |
| 🔵 Amazon | 🟡 Slack | 🟢 ClickUp |

---

## Follow-up Questions

1. Why does this algorithm work only for DAGs?
2. How do you find the longest path in a DAG?
3. Why is this O(V + E) while Dijkstra's is O((V + E) log V)?
4. How would you find the critical path in a project network?
