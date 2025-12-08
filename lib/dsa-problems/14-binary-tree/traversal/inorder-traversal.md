# Binary Tree Inorder Traversal

## Problem Description

**Real-World Scenario:**
In a family tree, inorder traversal would visit: left ancestors, current person, right descendants. For a binary search tree, this gives you all values in sorted order - perfect for generating sorted reports!

**Example Setup:** 
A library organizes books in a binary tree structure by ISBN. To print a catalog in sorted order, the librarian needs to traverse the tree in "inorder" - left subtree, current book, right subtree.

**What is Inorder Traversal?**
Visit nodes in the order: Left subtree → Root → Right subtree. For BSTs, this produces sorted output.

**Why is it important?**
- Produces sorted output for BST
- Foundation for tree algorithms
- Expression tree evaluation
- Used in many tree manipulations

**Your Task:** 
Return the inorder traversal of a binary tree's nodes' values.

**Difficulty:** Medium
**Tags:** Binary Tree, Traversal, Produces Sorted Output For Bst, Foundation For Tree Algorithms, Expression Tree Evaluation, Used In Many Tree Manipulations, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    1
     \
      2
     /
    3
```
**Output:** `[1, 3, 2]`
**Explanation:** Left of 1 (none), 1, then inorder of right subtree (3, then 2).

### Example 2:
**Input:** Empty tree (null)
**Output:** `[]`
**Explanation:** No nodes to traverse.

### Example 3:
**Input:** 
```
    1
```
**Output:** `[1]`
**Explanation:** Single node - just return it.

### Example 4 (BST):
**Input:** 
```
      4
     / \
    2   6
   / \ / \
  1  3 5  7
```
**Output:** `[1, 2, 3, 4, 5, 6, 7]`
**Explanation:** Sorted order!

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | TreeNode with val, left, right |
| Special Conditions | Can be empty |
| Time Complexity | O(n) |
| Space Complexity | O(h) recursion, O(n) iterative |
| Output Format | Array of values |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 Epic Systems |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Atlassian |
| 🔵 Facebook | 🟡 Uber | 🟢 VMware |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Salesforce |

---

## Follow-up Questions

1. Can you implement this iteratively using a stack?
2. What's Morris Traversal and how does it achieve O(1) space?
3. How do preorder and postorder differ?
4. Why does inorder give sorted output for BST?
