# Search in BST

## Problem Description

**Real-World Scenario:**
A database index uses BST structure for fast lookups. Given a value, search the tree and return the subtree rooted at that node.

**Example Setup:** 
A phone directory (sorted by name) uses BST. To find all contacts starting with "Smith", first search for "Smith" and return all descendants.

**What is Search in BST?**
Given the root of a BST and a value, find the node with that value. Return the subtree rooted at that node, or null if not found.

**Why is it important?**
- BST fundamental operation
- O(log n) average lookup
- Foundation for BST operations
- Database indexing

**Your Task:** 
Return the subtree rooted at the node with the given value.

**Difficulty:** Medium
**Tags:** Bst, Operations, Bst Fundamental Operation, O Average Lookup, Foundation For Bst Operations, Database Indexing, O(h), Interview

---

## Examples

### Example 1:
**Input:** 
```
    4
   / \
  2   7
 / \
1   3
val = 2
```
**Output:** 
```
  2
 / \
1   3
```
**Explanation:** Found node 2, return its subtree.

### Example 2:
**Input:** Same tree, val = 5
**Output:** `null`
**Explanation:** 5 not in tree.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 5000 |
| Node Value | 1 ≤ val ≤ 10⁷ |
| Data Type | Valid BST |
| Special Conditions | All values unique |
| Time Complexity | O(h) where h = height |
| Space Complexity | O(1) iterative |
| Output Format | TreeNode or null |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Salesforce |
| 🔵 Amazon | 🟡 Oracle | 🟢 Cisco |
| 🔵 Apple | 🟡 Adobe | 🟢 Nvidia |

---

## Follow-up Questions

1. What's the difference from searching in a regular binary tree?
2. Can you do this iteratively?
3. What's the worst-case for a skewed tree?
4. How would you find the closest value?
