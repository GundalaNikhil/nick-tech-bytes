# Optimize Water Distribution in a Village

## Problem Description

**Real-World Scenario:**
A utility company wants to supply water to all houses in a village. They can either build a well at a house (cost `wells[i]`) or lay pipes between houses (cost `pipes[j]`). Minimize the total cost to supply water to everyone.

**Example Setup:** 
A cloud infrastructure planner connects servers to the internet. Each server can have a direct uplink (cost A) or connect via another server (cost B). Connect all servers with min cost.

**What is Optimize Water Distribution?**
There are `n` houses in a village. We want to supply water to all the houses by building wells and laying pipes. For each house `i`, we can either build a well inside it directly with cost `wells[i - 1]` (note the -1 due to 0-indexing), or pipe in water from another well to it. The costs to lay pipes between houses are given by the array `pipes` where each `pipes[j] = [house1, house2, cost]` represents the cost to connect `house1` and `house2` together using a pipe. Connections are bidirectional. Return the minimum total cost to supply water to all houses.

**Why is it important?**
- Minimum Spanning Tree (MST)
- Prim's or Kruskal's Algorithm
- Graph modeling (Virtual Node)
- Optimization

**Your Task:** 
Return minimum cost.

**Difficulty:** Medium
**Tags:** Graphs, Mst, Minimum Spanning Tree, Prim'S Or Kruskal'S, Graph Modeling, Optimization, O(E log E), Interview

---

## Examples

### Example 1:
**Input:** `n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]`
**Output:** `3`
**Explanation:** 
Build well at house 1 (cost 1).
Pipe 1 to 2 (cost 1).
Pipe 2 to 3 (cost 1).
Total 3.

### Example 2:
**Input:** `n = 2, wells = [1,1], pipes = [[1,2,1]]`
**Output:** `2`
**Explanation:** Build well at 1 and 2. Or pipe. Cost 2 either way.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Houses | 1 ≤ n ≤ 10⁴ |
| Wells | n costs |
| Pipes | 1 ≤ pipes.length ≤ 10⁴ |
| Data Type | Weighted Graph |
| Time Complexity | O(E log E) |
| Space Complexity | O(V + E) |
| Output Format | Integer cost |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yahoo |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Oracle |
| 🔵 Facebook | 🟡 Apple | 🟢 Salesforce |

---

## Follow-up Questions

1. Why introduce a virtual node "0" connected to all houses with edge weight `wells[i]`?
2. How does this transform the problem into a standard MST problem?
3. Can you use Prim's algorithm?
4. What if pipe costs are dynamic?
