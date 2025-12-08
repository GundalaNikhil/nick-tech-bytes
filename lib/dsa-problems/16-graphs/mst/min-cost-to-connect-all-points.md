# Min Cost to Connect All Points

## Problem Description

**Real-World Scenario:**
A telecommunications company wants to lay cables to connect a set of cities. The cost to connect two cities is the Manhattan distance between them. They want to connect all cities with the minimum total cost.

**Example Setup:** 
Connecting circuit components on a board with minimum wire length.

**What is Min Cost to Connect All Points?**
You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`.
The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the Manhattan distance between them: `|xi - xj| + |yi - yj|`.
Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

**Why is it important?**
- Minimum Spanning Tree (MST)
- Prim's Algorithm
- Kruskal's Algorithm
- Dense Graph (E = V^2)

**Your Task:** 
Return minimum cost.

**Difficulty:** Medium
**Tags:** Graphs, Mst, Minimum Spanning Tree, Prim'S, Kruskal'S, Dense Graph, O(N^2), Interview

---

## Examples

### Example 1:
**Input:** `points = [[0,0],[2,2],[3,10],[5,2],[7,0]]`
**Output:** `20`
**Explanation:** Connect (0,0)-(2,2) cost 4. (2,2)-(5,2) cost 3. (5,2)-(7,0) cost 4. (2,2)-(3,10) cost 9. Total 20.

### Example 2:
**Input:** `points = [[3,12],[-2,5],[-4,1]]`
**Output:** `18`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Points (n) | 1 ≤ n ≤ 1000 |
| Coordinates | -10^6 ≤ x, y ≤ 10^6 |
| Data Type | Integer array |
| Time Complexity | O(N^2) (Prim's) |
| Space Complexity | O(N) |
| Output Format | Integer cost |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Roblox |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Shopee |
| 🔵 Facebook | 🟡 Apple | 🟢 Garena |

---

## Follow-up Questions

1. Why Prim's algorithm is better here than Kruskal's? (Dense graph, N^2 edges. Kruskal is E log E = N^2 log N. Prim is N^2).
2. How to implement Prim's efficiently? (Min-heap or simple array scan).
3. What if we use Euclidean distance?
4. What if there are existing connections?
