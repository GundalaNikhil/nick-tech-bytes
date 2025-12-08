# Path with Maximum Probability

## Problem Description

**Real-World Scenario:**
A reliability engineer finds the most reliable path for data transmission in a network where each link has a specific probability of success.

**Example Setup:** 
A logistics planner finds the route with the highest probability of on-time delivery, multiplying probabilities along the path.

**What is Path with Maximum Probability?**
You are given an undirected weighted graph of `n` nodes (0-indexed), represented by an edge list where `edges[i] = [a, b]` is an undirected edge connecting the nodes `a` and `b` with a probability of success of traversing that edge `succProb[i]`. Given two nodes `start` and `end`, find the path with the maximum probability of success to go from `start` to `end` and return its success probability.

**Why is it important?**
- Modified Dijkstra (Max-Heap)
- Product of probabilities
- Shortest Path variant
- Graph optimization

**Your Task:** 
Return maximum probability.

**Difficulty:** Medium
**Tags:** Graphs, Shortest Path, Modified Dijkstra, Product Of Probabilities, Shortest Path Variant, Graph Optimization, O(E log V), Interview

---

## Examples

### Example 1:
**Input:** `n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2`
**Output:** `0.25`
**Explanation:** Path 0->1->2 has prob 0.5 * 0.5 = 0.25. Path 0->2 has prob 0.2. Max is 0.25.

### Example 2:
**Input:** `n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2`
**Output:** `0.3`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 2 ≤ n ≤ 10⁴ |
| Edges | 0 ≤ edges.length ≤ 2 × 10⁴ |
| Probability | 0 ≤ succProb[i] ≤ 1 |
| Data Type | Undirected weighted graph |
| Time Complexity | O(E log V) |
| Space Complexity | O(V + E) |
| Output Format | Double probability |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Akamai |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Cloudflare |
| 🔵 Facebook | 🟡 Apple | 🟢 Cisco |

---

## Follow-up Questions

1. Why use Max-Heap instead of Min-Heap?
2. Why multiply probabilities instead of adding weights?
3. Can you use Logarithms to convert to additive shortest path?
4. What if probabilities are 0?
