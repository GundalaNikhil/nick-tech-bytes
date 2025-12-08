# Longest ZigZag Path in a Binary Tree

## Problem Description

**Real-World Scenario:**
A network routing protocol finds the longest path that strictly alternates between left and right channels to maximize signal diversity.

**Example Setup:** 
A ski slalom course designer finds the longest continuous path of alternating left and right turns down a mountain.

**What is Longest ZigZag Path...?**
You are given the `root` of a binary tree. A ZigZag path for a binary tree is defined as follow:
- Choose any node in the binary tree and a direction (right or left).
- If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
- Change the direction from right to left or from left to right.
- Repeat the second and third steps until you cannot move in the tree.
Return the longest ZigZag path contained in that tree.

**Why is it important?**
- DFS / Recursion
- State tracking (direction)
- Path finding
- Tree traversal

**Your Task:** 
Return max length.

**Difficulty:** Medium
**Tags:** Binary Tree, Dfs, Dfs / Recursion, State Tracking, Path Finding, Tree Traversal, O(N), Interview

---

## Examples

### Example 1:
**Input:** `root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1,null,1]`
**Output:** `3`
**Explanation:** Longest ZigZag path is 3 (Right, Left, Right).

### Example 2:
**Input:** `root = [1,1,1,null,1,null,null,1,1,null,1]`
**Output:** `4`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 50000 |
| Values | 1 ≤ val ≤ 100 |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(H) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Expedia |
| 🔵 Amazon | 🟡 Microsoft | 🟢 TripAdvisor |
| 🔵 Facebook | 🟡 Apple | 🟢 Booking |

---

## Follow-up Questions

1. Why pass `(node, direction, length)` in DFS?
2. If direction was Left, next can be Right (len+1) or Left (reset to 1)?
3. Why reset length to 1 when direction is not alternating?
4. Can you do it iteratively?
