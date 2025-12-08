# Construct Binary Tree from Preorder and Inorder

## Problem Description

**Real-World Scenario:**
A backup system stores tree structures in two different traversal orders. During recovery, the original tree must be reconstructed from these two representations.

**Example Setup:** 
A genealogy service stores family trees as serialized arrays. Given preorder (parents first) and inorder (sorted) lists of family members, reconstruct the family tree.

**What is Construct Tree from Preorder/Inorder?**
Given preorder and inorder traversal of a tree, construct the binary tree. The first element of preorder is root; find it in inorder to split left/right subtrees.

**Why is it important?**
- Tree reconstruction
- Understanding traversal properties
- Serialization/deserialization
- Divide and conquer

**Your Task:** 
Build and return the binary tree.

**Difficulty:** Medium
**Tags:** Binary Tree, Construction, Tree Reconstruction, Understanding Traversal Properties, Serialization/Deserialization, Divide And Conquer, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]
```
**Output:** 
```
    3
   / \
  9  20
    /  \
   15   7
```
**Explanation:** 3 is root (first in preorder), splits inorder.

### Example 2:
**Input:** `preorder = [-1], inorder = [-1]`
**Output:** `[-1]`
**Explanation:** Single node tree.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 3000 |
| Node Value | -3000 ≤ val ≤ 3000 |
| Data Type | Integer arrays |
| Special Conditions | All values unique |
| Time Complexity | O(n) with hash map |
| Space Complexity | O(n) |
| Output Format | TreeNode root |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Ancestry |
| 🔵 Microsoft | 🟡 Adobe | 🟢 MyHeritage |
| 🔵 Facebook | 🟡 Oracle | 🟢 Geni |

---

## Follow-up Questions

1. How do you use inorder to find subtree boundaries?
2. What information does preorder's first element give?
3. What if you had postorder instead of preorder?
4. Can you do this iteratively?
