# Minimum Height Trees

## Problem Description

**Real-World Scenario:**
A network topology designer finds the "center" nodes of a network to place a central server, minimizing the maximum latency (distance) to any other node.

**Example Setup:** 
A city planner identifies the most central intersections to place emergency response stations to minimize max response time.

**What is Minimum Height Trees?**
A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree. Given a tree of `n` nodes labelled from `0` to `n - 1`, and an array of `n - 1` `edges` where `edges[i] = [ai, bi]` indicates that there is an undirected edge between the two nodes `ai` and `bi` in the tree, you can choose any node of the tree as the root. When you select a node `x` as the root, the result tree has height `h`. Among all possible rooted trees, those with minimum height (i.e. `min(h)`)  are called minimum height trees (MHTs). Return a list of all MHTs' root labels.

**Why is it important?**
- Topological Sort (Onion Peeling)
- BFS from leaves
- Graph centrality
- Tree diameter

**Your Task:** 
Return list of root labels.

---

## Examples

### Example 1:
**Input:** `n = 4, edges = [[1,0],[1,2],[1,3]]`
**Output:** `[1]`
**Explanation:** 1 is the center. Height 1. Others have height 2.

### Example 2:
**Input:** `n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]`
**Output:** `[3,4]`
**Explanation:** Centers of the longest path.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 2 × 10⁴ |
| Edges | n - 1 edges |
| Data Type | Undirected Graph |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | List of integers |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Cisco |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Juniper |
| 🔵 Facebook | 🟡 Apple | 🟢 Arista |

---

## Follow-up Questions

1. Why peel leaves layer by layer (like Topological Sort)?
2. Why are there at most 2 MHT roots?
3. How is this related to the Tree Diameter?
4. Can you find the diameter first and take the middle nodes?
