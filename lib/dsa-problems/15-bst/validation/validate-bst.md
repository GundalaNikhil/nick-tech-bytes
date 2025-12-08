# Validate Binary Search Tree

## Problem Description

**Real-World Scenario:**
A database indexes data using a BST for fast lookup. Before queries, the system verifies the index is properly sorted (valid BST). An invalid BST would return wrong query results!

**Example Setup:** 
A student built a BST for their assignment. The grading system needs to verify if their tree is actually a valid BST where left < root < right for every node.

**What is Validate BST?**
Check if a binary tree satisfies BST property: for every node, all values in left subtree are less than the node's value, and all values in right subtree are greater.

**Why is it important?**
- Data structure verification
- Range-based validation
- Common interview question
- Tests understanding of BST property

**Your Task:** 
Return true if the tree is a valid BST.

**Difficulty:** Medium
**Tags:** Bst, Validation, Data Structure Verification, Range-Based Validation, Common Interview Question, Tests Understanding Of Bst Property, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    2
   / \
  1   3
```
**Output:** `true`
**Explanation:** Left < Root < Right satisfied.

### Example 2:
**Input:** 
```
    5
   / \
  1   4
     / \
    3   6
```
**Output:** `false`
**Explanation:** Node 4 has value less than 5 but is in right subtree wrongly. Also 3 < 5 but in right subtree.

### Example 3:
**Input:** 
```
    2
   / \
  2   2
```
**Output:** `false`
**Explanation:** Duplicates not allowed (strictly less/greater).

### Example 4:
**Input:** Single node
**Output:** `true`
**Explanation:** Single node is always valid.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 10⁴ |
| Node Value | -2³¹ ≤ val ≤ 2³¹-1 |
| Data Type | Binary tree |
| Special Conditions | Strictly less/greater (no duplicates) |
| Time Complexity | O(n) |
| Space Complexity | O(h) recursion |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Visa |
| 🔵 Facebook | 🟡 Uber | 🟢 Oracle |
| 🔵 Microsoft | 🟡 LinkedIn | 🟢 Qualcomm |

---

## Follow-up Questions

1. Why can't you just check left < root < right locally?
2. What's the range-based approach with min/max bounds?
3. Can you use inorder traversal to validate?
4. How do you handle integer overflow with bounds?
