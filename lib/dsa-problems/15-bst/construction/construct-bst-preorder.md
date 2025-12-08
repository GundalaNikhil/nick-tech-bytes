# Construct Binary Search Tree from Preorder

## Problem Description

**Real-World Scenario:**
A database index serialized in preorder needs to reconstruct the original BST for query optimization.

**Example Setup:** 
A file system backup stores directory trees in preorder. Reconstruct the original tree structure.

**What is Construct BST from Preorder?**
Given an array of integers representing the preorder traversal of a BST, construct the tree. Use BST property: left < root < right.

**Why is it important?**
- BST construction
- Preorder traversal properties
- O(n) bound tracking
- Tree serialization

**Your Task:** 
Return the root of the constructed BST.

**Difficulty:** Medium
**Tags:** Bst, Construction, Bst Construction, Preorder Traversal Properties, O Bound Tracking, Tree Serialization, O(n), Interview

---

## Examples

### Example 1:
**Input:** `preorder = [8, 5, 1, 7, 10, 12]`
**Output:** 
```
      8
     / \
    5   10
   / \    \
  1   7   12
```
**Explanation:** BST constructed from preorder.

### Example 2:
**Input:** `preorder = [1, 3]`
**Output:** Root 1 with right child 3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 100 |
| Node Value | 1 ≤ preorder[i] ≤ 10⁸ |
| Data Type | Integer array |
| Special Conditions | All values unique |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | TreeNode root |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 MongoDB |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Couchbase |
| 🔵 Google | 🟡 Oracle | 🟢 Redis |

---

## Follow-up Questions

1. How does the bound-tracking recursive approach work?
2. Why is O(n) possible without sorting?
3. What about construction from postorder?
4. Can you do this iteratively?
