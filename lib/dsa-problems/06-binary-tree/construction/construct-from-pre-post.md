# Construct Binary Tree from Preorder and Postorder Traversal

## Problem Description

**Real-World Scenario:**
A compiler reconstructs the Abstract Syntax Tree (AST) of a program given the order of node visits during parsing (preorder) and code generation (postorder).

**Example Setup:** 
A data recovery tool reconstructs a hierarchical file system structure given logs of directory entry (preorder) and exit (postorder).

**What is Construct Binary Tree...?**
Given two integer arrays, `preorder` and `postorder` where `preorder` is the preorder traversal of a binary tree of distinct values and `postorder` is the postorder traversal of the same tree, reconstruct and return the binary tree. If there exist multiple answers, you can return any of them.

**Why is it important?**
- Tree Construction
- Recursion
- Array Indexing
- Understanding Traversal properties

**Your Task:** 
Return the root node.

---

## Examples

### Example 1:
**Input:** `preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]`
**Output:** `[1,2,3,4,5,6,7]`
**Explanation:** 
Root is 1 (first in pre, last in post).
Left child is 2 (second in pre).
In post, 2 is index 2. Left subtree size is 3 (indices 0-2 in post).

### Example 2:
**Input:** `preorder = [1], postorder = [1]`
**Output:** `[1]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 30 |
| Values | 1 ≤ val ≤ n |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | TreeNode |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Amazon |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Apple |
| 🔵 LinkedIn | 🟡 Uber | 🟢 Twitter |

---

## Follow-up Questions

1. Why is the root always `pre[0]` and `post[n-1]`?
2. Why is `pre[1]` the root of the left subtree (if it exists)?
3. How to find the size of the left subtree using `postorder`?
4. Why is the solution not unique if a node has only one child?
