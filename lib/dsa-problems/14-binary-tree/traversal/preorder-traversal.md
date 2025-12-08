# Preorder Traversal

## Problem Description

**Real-World Scenario:**
A file system backup writes directories before their contents. This is preorder: process node, then left subtree, then right subtree.

**Example Setup:** 
A compiler parses expression trees in preorder to generate prefix notation output.

**What is Preorder Traversal?**
Visit nodes in order: root → left → right. Useful for copying trees, prefix expressions, and serialization.

**Why is it important?**
- Tree traversal fundamental
- Expression parsing
- Tree copying
- Serialization order

**Your Task:** 
Return the preorder traversal of a binary tree.

**Difficulty:** Medium
**Tags:** Binary Tree, Traversal, Tree Traversal Fundamental, Expression Parsing, Tree Copying, Serialization Order, O(n), Interview

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
**Output:** `[1, 2, 3]`
**Explanation:** 1 → 2 → 3 (root → right → left of right).

### Example 2:
**Input:** Empty tree
**Output:** `[]`

### Example 3:
**Input:** `[1]`
**Output:** `[1]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Binary tree |
| Special Conditions | Iterative preferred |
| Time Complexity | O(n) |
| Space Complexity | O(n) for stack |
| Output Format | List of values |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Cisco |
| 🔵 Google | 🟡 Adobe | 🟢 VMware |

---

## Follow-up Questions

1. Can you do this iteratively?
2. What's Morris traversal for O(1) space?
3. How is preorder useful for tree construction?
4. What's the relationship between preorder and DFS?
