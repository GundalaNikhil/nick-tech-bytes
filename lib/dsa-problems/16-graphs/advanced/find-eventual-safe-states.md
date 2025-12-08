# Find Eventual Safe States

## Problem Description

**Real-World Scenario:**
A financial transaction system identifies "safe" accounts that are not part of any fraudulent cycle (money laundering loop) and will eventually settle.

**Example Setup:** 
A deadlock detector in an operating system identifies processes that will eventually terminate and are not part of a deadlock cycle.

**What is Find Eventual Safe States?**
There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a 0-indexed 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to node `i`, meaning there is an edge from node `i` to each node in `graph[i]`. A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node). Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

**Why is it important?**
- Cycle Detection (DFS)
- Topological Sort (Kahn's Algorithm)
- Graph coloring (White-Gray-Black)
- State analysis

**Your Task:** 
Return list of safe nodes.

---

## Examples

### Example 1:
**Input:** `graph = [[1,2],[2,3],[5],[0],[5],[],[]]`
**Output:** `[2,4,5,6]`
**Explanation:** 
Nodes 5 and 6 are terminal.
Node 4 leads to 5 (safe).
Node 2 leads to 5 (safe).
Node 1 leads to 2 and 3. 3 leads to 0. 0 leads to 1. Cycle 0-1-3-0. Not safe.
Safe nodes: 2, 4, 5, 6.

### Example 2:
**Input:** `graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]`
**Output:** `[4]`
**Explanation:** Only 4 is terminal. All others lead to cycle 0-1-2-3-0.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 10⁴ |
| Edges | 0 ≤ graph[i].length ≤ n |
| Data Type | Directed Graph (Adjacency List) |
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Output Format | Sorted list of integers |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Wayfair |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Expedia |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Why is a node safe if it's not part of a cycle and doesn't lead to a cycle?
2. How does 3-color DFS (0=unvisited, 1=visiting, 2=safe) work?
3. Can you use Topological Sort by reversing edges?
4. What if the graph is disconnected?
