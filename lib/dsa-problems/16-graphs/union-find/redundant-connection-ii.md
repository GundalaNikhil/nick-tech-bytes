# Redundant Connection II

## Problem Description

**Real-World Scenario:**
A network topology validator checks a directed graph representing a hierarchy (tree) where exactly one extra edge was added, potentially creating a cycle or a node with two parents. Identify the edge to remove to restore the tree structure.

**Example Setup:** 
A dependency graph checker ensures a module hierarchy is a valid tree (single root, no cycles, unique parents).

**What is Redundant Connection II?**
In this problem, a rooted tree is a directed graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents. The given input is a directed graph that started as a rooted tree with `n` nodes (with distinct values from `1` to `n`), with one additional directed edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed. Return an edge that can be removed so that the resulting graph is a rooted tree of `n` nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array.

**Why is it important?**
- Union-Find (Disjoint Set)
- Directed Graph properties (Cycle, Two Parents)
- Case analysis (Cycle only, Two Parents only, Both)
- Hard graph problem

**Your Task:** 
Return the edge to remove.

**Difficulty:** Medium
**Tags:** Graphs, Union Find, Union-Find, Directed Graph Properties, Case Analysis, Hard Graph, O(N), Interview

---

## Examples

### Example 1:
**Input:** `edges = [[1,2],[1,3],[2,3]]`
**Output:** `[2,3]`
**Explanation:** Node 3 has two parents (1 and 2). Removing [2,3] leaves valid tree rooted at 1.

### Example 2:
**Input:** `edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]`
**Output:** `[4,1]`
**Explanation:** Cycle 1-2-3-4-1. Removing [4,1] breaks cycle.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 3 ≤ n ≤ 1000 |
| Edges | n edges |
| Data Type | Directed Graph |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Edge array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Google | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 Pinterest |

---

## Follow-up Questions

1. What are the 3 cases (Two Parents, Cycle, Both)?
2. Why check for Two Parents first?
3. If Two Parents exists, which edge do we remove (the one in the cycle, or the later one)?
4. How to detect cycle in directed graph using Union-Find?
