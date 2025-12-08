# Lowest Common Ancestor of Binary Tree

## Problem Description

**Real-World Scenario:**
On LinkedIn, when viewing two people's profiles, you might see "You both know [Person X]". Finding the lowest common ancestor is like finding the closest mutual connection in a network hierarchy.

**Example Setup:** 
In a genealogy app, two cousins want to find their nearest common ancestor. The family tree is stored as a binary tree. Find the grandparent (or great-grandparent) they both share who is closest to them.

**What is Lowest Common Ancestor?**
The LCA of two nodes p and q is the deepest node that has both p and q as descendants (a node can be a descendant of itself).

**Why is it important?**
- Genealogy and family trees
- Organizational hierarchies
- Network routing (finding common node)
- Compiler design (expression trees)

**Your Task:** 
Find the lowest common ancestor of two given nodes in a binary tree.

**Difficulty:** Medium
**Tags:** Binary Tree, Lca, Genealogy And Family Trees, Organizational Hierarchies, Network Routing, Compiler Design, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
        3
       / \
      5   1
     / \ / \
    6  2 0  8
      / \
     7   4
p = 5, q = 1
```
**Output:** `3`
**Explanation:** LCA of 5 and 1 is their parent 3.

### Example 2:
**Input:** Same tree, p = 5, q = 4
**Output:** `5`
**Explanation:** 5 is ancestor of 4 and itself, so LCA is 5.

### Example 3:
**Input:** 
```
  1
 /
2
p = 1, q = 2
```
**Output:** `1`
**Explanation:** Root 1 is ancestor of both.

### Example 4:
**Input:** Same tree as Example 1, p = 6, q = 4
**Output:** `5`
**Explanation:** Path to 6 and path to 4 diverge at 5.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 2 ≤ n ≤ 10⁵ |
| Node Values | All unique |
| Data Type | TreeNode, both p and q exist |
| Special Conditions | p ≠ q |
| Time Complexity | O(n) |
| Space Complexity | O(h) |
| Output Format | TreeNode reference |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 LinkedIn | 🟢 Ancestry |
| 🔵 Amazon | 🟡 Uber | 🟢 MyHeritage |
| 🔵 Google | 🟡 Bloomberg | 🟢 23andMe |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Geni |

---

## Follow-up Questions

1. How does the solution differ for BST (values are ordered)?
2. What if one of the nodes doesn't exist?
3. Can you solve this with parent pointers?
4. How would you find LCA for more than 2 nodes?
