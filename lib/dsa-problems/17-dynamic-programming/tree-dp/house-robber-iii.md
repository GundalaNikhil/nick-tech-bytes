# House Robber III

## Problem Description

**Real-World Scenario:**
A security consultant analyzes a neighborhood (binary tree) where robbing adjacent houses triggers alarms. Find the maximum loot without robbing directly connected houses.

**Example Setup:** 
A pest exterminator treats trees - can't treat parent and child nodes together due to chemical interference. Maximize coverage.

**What is House Robber III?**
The houses form a binary tree. You cannot rob two directly-linked houses (parent-child). Return maximum money you can rob.

**Why is it important?**
- Tree DP
- Post-order traversal
- Include/exclude pattern
- Extension of linear robber

**Your Task:** 
Return maximum amount without alerting police.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Tree Dp, Post-Order Traversal, Include/Exclude Pattern, Extension Of Linear Robber, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    3
   / \
  2   3
   \   \
    3   1
```
**Output:** `7`
**Explanation:** Rob 3 + 3 + 1 = 7.

### Example 2:
**Input:** 
```
    3
   / \
  4   5
 / \   \
1   3   1
```
**Output:** `9`
**Explanation:** Rob 4 + 5 = 9.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 10⁴ |
| Node Value | 0 ≤ val ≤ 10⁴ |
| Data Type | Binary tree |
| Special Conditions | No adjacent nodes |
| Time Complexity | O(n) |
| Space Complexity | O(h) |
| Output Format | Maximum value |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Ring |
| 🔵 Google | 🟡 Uber | 🟢 Vivint |
| 🔵 Microsoft | 🟡 Apple | 🟢 ADT |

---

## Follow-up Questions

1. What does the dfs return (rob, not_rob)?
2. How is this different from linear House Robber?
3. What's the recurrence for tree?
4. Can you use memoization instead?
