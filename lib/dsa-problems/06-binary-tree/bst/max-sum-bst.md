# Maximum Sum BST in Binary Tree

## Problem Description

**Real-World Scenario:**
A database optimizer analyzes a mixed index structure (partially corrupted tree) to find the largest valid sub-index (BST) to preserve during recovery.

**Example Setup:** 
A memory manager finds the largest contiguous block of memory that satisfies specific ordering constraints.

**What is Maximum Sum BST...?**
Given a binary tree `root`, return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).

**Why is it important?**
- Post-order Traversal
- BST Validation (Min/Max propagation)
- Bottom-up DP
- Tree properties

**Your Task:** 
Return max sum.

**Difficulty:** Medium
**Tags:** Binary Tree, Bst, Post-Order Traversal, Bst Validation, Bottom-Up Dp, Tree Properties, O(N), Interview

---

## Examples

### Example 1:
**Input:** `root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]`
**Output:** `20`
**Explanation:** The subtree rooted at 3 is a BST with sum 20 (3+2+5+4+6).

### Example 2:
**Input:** `root = [4,3,null,1,2]`
**Output:** `2`
**Explanation:** Subtree rooted at 2 is a BST (sum 2). Root 4 is not BST (left child 3 has right child 2 < 3? No. 3 > 1, 3 > 2. 4 > 3. But 4 > 2? Yes. Wait. 3->2 is right child. 2 < 3. Invalid BST).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 40000 |
| Values | -40000 ≤ val ≤ 40000 |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(H) |
| Output Format | Integer sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Oracle |
| 🔵 Google | 🟡 Microsoft | 🟢 SAP |
| 🔵 Facebook | 🟡 Apple | 🟢 Salesforce |

---

## Follow-up Questions

1. Why return `(isBST, min, max, sum)` from each node?
2. Condition: `left.isBST && right.isBST && left.max < val < right.min`?
3. How to handle null children (min=INF, max=-INF, sum=0)?
4. Why update global `maxSum` at each valid BST node?
