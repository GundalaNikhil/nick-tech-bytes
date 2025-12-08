# All Paths in Graph

## Problem Description

**Real-World Scenario:**
Imagine planning a road trip from Delhi to Mumbai. There are multiple routes through different cities. You want to see ALL possible paths to decide which one to take based on scenery, tolls, or interesting stops.

**Example Setup:** 
Ravi runs a ride-sharing app. When a customer requests a ride, he wants to show them all possible routes from pickup to destination, even if some are longer. The customer can then choose based on their preference.

**What are All Paths?**
Finding all paths means discovering every possible way to travel from a source vertex to a destination vertex, without revisiting any vertex (to avoid infinite loops).

**Why is it important?**
- Route planning with multiple options
- Finding alternative solutions
- Exploring all possibilities in games
- Network flow analysis

**Your Task:** 
Given a directed acyclic graph (DAG) and two vertices, find all paths from source to destination.

---

## Examples

### Example 1:
**Input:** 
```
graph = {
  0: [1, 2],
  1: [3],
  2: [3],
  3: []
}
source = 0, target = 3
```
**Output:** `[[0,1,3], [0,2,3]]`
**Explanation:** Two paths from 0 to 3: through 1 or through 2.

### Example 2:
**Input:** 
```
graph = {
  0: [1],
  1: [2],
  2: [3],
  3: []
}
source = 0, target = 3
```
**Output:** `[[0,1,2,3]]`
**Explanation:** Only one path exists in a linear graph.

### Example 3:
**Input:** 
```
graph = {
  0: [1, 2, 3],
  1: [3],
  2: [3],
  3: []
}
source = 0, target = 3
```
**Output:** `[[0,1,3], [0,2,3], [0,3]]`
**Explanation:** Three paths including the direct edge 0→3.

### Example 4:
**Input:** 
```
graph = {
  0: [4, 3, 1],
  1: [3, 2, 4],
  2: [3],
  3: [4],
  4: []
}
source = 0, target = 4
```
**Output:** `[[0,4], [0,3,4], [0,1,3,4], [0,1,2,3,4], [0,1,4]]`
**Explanation:** Multiple branching paths exist.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 2 ≤ V ≤ 15 |
| Edges | 0 ≤ E ≤ V(V-1) |
| Data Type | Integer node indices |
| Special Conditions | Graph is a DAG (no cycles) |
| Time Complexity | O(2^V × V) worst case |
| Space Complexity | O(V) for recursion + O(paths × V) for output |
| Output Format | List of all paths |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Ola |
| 🔵 Amazon | 🟡 Lyft | 🟢 MapmyIndia |
| 🔵 Apple | 🟡 Grab | 🟢 Here Maps |

---

## Follow-up Questions

1. Why is this problem typically limited to DAGs?
2. How would you modify the algorithm for graphs with cycles?
3. What's the maximum number of paths possible in a complete DAG?
4. How would you find all paths with total weight less than K in a weighted graph?
