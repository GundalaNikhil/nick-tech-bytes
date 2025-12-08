# Redundant Connection

## Problem Description

**Real-World Scenario:**
A network engineer detects the redundant cable that creates a cycle in a tree network topology.

**Example Setup:** 
A family tree app identifies the contradictory relationship edge that creates a cycle (impossible in a valid tree).

**What is Redundant Connection?**
Given a graph that started as a tree, one edge was added creating exactly one cycle. Find the edge to remove to restore tree structure.

**Why is it important?**
- Union-Find cycle detection
- Tree validation
- Network redundancy
- Last edge creating cycle

**Your Task:** 
Return the redundant edge that appears last in input.

**Difficulty:** Medium
**Tags:** Graphs, Union Find, Union-Find Cycle Detection, Tree Validation, Network Redundancy, Last Edge Creating Cycle, O(n × α(n), Interview

---

## Examples

### Example 1:
**Input:** `edges = [[1,2],[1,3],[2,3]]`
**Output:** `[2,3]`
**Explanation:** Edge [2,3] creates the cycle.

### Example 2:
**Input:** `edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]`
**Output:** `[1,4]`
**Explanation:** Edge [1,4] completes the cycle.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | n edges, n nodes |
| Edge Values | 1 ≤ edges[i] ≤ n |
| Data Type | Undirected graph |
| Special Conditions | Exactly one redundant edge |
| Time Complexity | O(n × α(n)) ≈ O(n) |
| Space Complexity | O(n) |
| Output Format | Edge [u, v] |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Cisco |
| 🔵 Google | 🟡 Microsoft | 🟢 Juniper |
| 🔵 Facebook | 🟡 Apple | 🟢 Arista |

---

## Follow-up Questions

1. How does Union-Find detect the cycle edge?
2. Why return the last edge that creates cycle?
3. What about Redundant Connection II (directed)?
4. Can you use DFS instead?
