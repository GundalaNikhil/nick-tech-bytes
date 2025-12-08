# Binary Tree Cameras

## Problem Description

**Real-World Scenario:**
A security system installer places the minimum number of cameras on tree-structured hallway intersections to monitor every node (camera covers self, parent, and children).

**Example Setup:** 
A network administrator places monitoring probes on servers in a tree topology to ensure every server is either monitored directly or is adjacent to a monitor.

**What is Binary Tree Cameras?**
You are given the `root` of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children. Return the minimum number of cameras needed to monitor all nodes of the tree.

**Why is it important?**
- Greedy on Tree (DFS)
- State tracking (Has Camera, Covered, Needs Cover)
- Tree DP
- Optimization

**Your Task:** 
Return minimum cameras.

**Difficulty:** Medium
**Tags:** Binary Tree, Dfs, Greedy On Tree, State Tracking, Tree Dp, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `root = [0,0,null,0,0]`
**Output:** `1`
**Explanation:** One camera at the child of root covers root, itself, and its children.

### Example 2:
**Input:** `root = [0,0,null,0,null,0,null,null,0]`
**Output:** `2`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 1000 |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(H) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Ring |
| 🔵 Amazon | 🟡 Microsoft | 🟢 ADT |
| 🔵 Facebook | 🟡 Apple | 🟢 SimpliSafe |

---

## Follow-up Questions

1. Why use a greedy strategy from bottom-up (leaves)?
2. What are the 3 states for a node (0: leaf/uncovered, 1: parent of leaf/has camera, 2: covered)?
3. Why place a camera at the parent of an uncovered leaf?
4. How to handle the root node (if it remains uncovered)?
