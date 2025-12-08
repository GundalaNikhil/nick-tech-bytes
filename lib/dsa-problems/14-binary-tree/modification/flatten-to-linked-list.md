# Flatten Binary Tree to Linked List

## Problem Description

**Real-World Scenario:**
A document outline stored as a tree needs to be flattened for linear display. Convert the tree to a linked list following preorder traversal.

**Example Setup:** 
A menu system's hierarchical structure needs to be displayed as a flat list for mobile view while preserving the original hierarchy order.

**What is Flatten Binary Tree to Linked List?**
Flatten a binary tree into a "linked list" in-place. The list should use the same TreeNode with right child as next and left as null, following preorder.

**Why is it important?**
- Tree manipulation
- Morris traversal variant
- In-place transformation
- UI linearization

**Your Task:** 
Flatten the tree to a right-skewed linked list (in-place).

**Difficulty:** Medium
**Tags:** Binary Tree, Modification, Tree Manipulation, Morris Traversal Variant, In-Place Transformation, Ui Linearization, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    1
   / \
  2   5
 / \   \
3   4   6
```
**Output:** 
```
1 → 2 → 3 → 4 → 5 → 6
(all nodes use right pointer, left is null)
```
**Explanation:** Preorder: [1,2,3,4,5,6].

### Example 2:
**Input:** Empty tree
**Output:** Empty

### Example 3:
**Input:** Single node [0]
**Output:** [0]

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 2000 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Binary tree |
| Special Conditions | In-place, use right pointer |
| Time Complexity | O(n) |
| Space Complexity | O(1) with Morris-like approach |
| Output Format | Flattened tree |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Dropbox |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Box |
| 🔵 Amazon | 🟡 Oracle | 🟢 Notion |

---

## Follow-up Questions

1. Can you flatten with O(1) extra space?
2. What's the right-first recursion approach?
3. How do you handle left subtree preservation?
4. What if you wanted inorder or postorder flattening?
