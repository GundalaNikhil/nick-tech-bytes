# Maximum Difference Between Node and Ancestor

## Problem Description

**Real-World Scenario:**
A genealogy analyzer finds the largest generation gap (age difference) between any ancestor and descendant in a family tree.

**Example Setup:** 
A stock price tree (where children are future prices) finds the maximum profit/loss possible between any two points in a timeline branch.

**What is Max Difference...?**
Given the `root` of a binary tree, find the maximum value `v` for which there exist different nodes `a` and `b` where `v = |a.val - b.val|` and `a` is an ancestor of `b`.

**Why is it important?**
- DFS / Recursion
- Tracking Min/Max in path
- Tree traversal
- Optimization

**Your Task:** 
Return the max difference.

---

## Examples

### Example 1:
**Input:** `root = [8,3,10,1,6,null,14,null,null,4,7,13]`
**Output:** `7`
**Explanation:** 
|8 - 1| = 7.
|8 - 3| = 5.
|10 - 13| = 3.
Max is 7.

### Example 2:
**Input:** `root = [1,null,2,null,0,3]`
**Output:** `3`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 2 ≤ n ≤ 5000 |
| Values | 0 ≤ val ≤ 10⁵ |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(H) |
| Output Format | Integer difference |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Ancestry |
| 🔵 Amazon | 🟡 Microsoft | 🟢 23andMe |
| 🔵 Facebook | 🟡 Apple | 🟢 MyHeritage |

---

## Follow-up Questions

1. Why pass `min` and `max` down the recursion?
2. Why update result at leaf nodes (or every node)?
3. `result = max(result, |val - min|, |val - max|)`?
4. Can you do it iteratively?
