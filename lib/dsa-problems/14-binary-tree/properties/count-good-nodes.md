# Count Good Nodes in Binary Tree

## Problem Description

**Real-World Scenario:**
A company org chart counts "senior" positions where no one above has higher rank. Count nodes where no ancestor has greater value.

**Example Setup:** 
A game leaderboard tracks "record-holders" - positions where no previous player had a higher score.

**What is Count Good Nodes?**
A node X is "good" if in the path from root to X, no node has a value greater than X. Count all good nodes.

**Why is it important?**
- DFS with max tracking
- Path problems
- Tree traversal with state
- Prefix maximum concept

**Your Task:** 
Return the number of good nodes in the tree.

**Difficulty:** Medium
**Tags:** Binary Tree, Properties, Dfs With Max Tracking, Path Problems, Tree Traversal With State, Prefix Maximum Concept, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    3
   / \
  1   4
 /   / \
3   1   5
```
**Output:** `4`
**Explanation:** Good nodes: 3, 4, 3, 5.

### Example 2:
**Input:** 
```
    3
   / 
  3
 / \
4   2
```
**Output:** `3`
**Explanation:** Good nodes: 3, 3, 4.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 10⁵ |
| Node Value | -10⁴ ≤ val ≤ 10⁴ |
| Data Type | Binary tree |
| Special Conditions | Root is always good |
| Time Complexity | O(n) |
| Space Complexity | O(h) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Epic |
| 🔵 Amazon | 🟡 Adobe | 🟢 Riot Games |
| 🔵 Google | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. What state do you pass during DFS?
2. How do you update the max along the path?
3. Can you solve iteratively?
4. What about counting "bad" nodes?
