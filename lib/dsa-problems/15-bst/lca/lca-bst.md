# Lowest Common Ancestor of BST

## Problem Description

**Real-World Scenario:**
In a versioning system (like Git), find the common ancestor commit of two branches. The BST structure enables O(log n) search.

**Example Setup:** 
A genealogy app with a sorted family tree (by birth year) finds the earliest common ancestor of two family members.

**What is LCA in BST?**
Find the lowest common ancestor of two nodes in a BST. Unlike general binary tree LCA, BST property allows O(log n) solution.

**Why is it important?**
- BST property usage
- Simpler than general tree LCA
- Version control systems
- Range queries

**Your Task:** 
Return the LCA node of nodes p and q.

**Difficulty:** Medium
**Tags:** Bst, Lca, Bst Property Usage, Simpler Than General Tree Lca, Version Control Systems, Range Queries, O(h), Interview

---

## Examples

### Example 1:
**Input:** 
```
        6
       / \
      2   8
     / \ / \
    0  4 7  9
      / \
     3   5
p = 2, q = 8
```
**Output:** `6`
**Explanation:** 6 is the split point.

### Example 2:
**Input:** Same tree, p = 2, q = 4
**Output:** `2`
**Explanation:** 2 is ancestor of 4.

### Example 3:
**Input:** Same tree, p = 3, q = 5
**Output:** `4`
**Explanation:** 4 is LCA of 3 and 5.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 2 ≤ n ≤ 10⁵ |
| Node Value | -10⁹ ≤ val ≤ 10⁹ |
| Data Type | Valid BST |
| Special Conditions | p and q guaranteed to exist |
| Time Complexity | O(h) where h = height |
| Space Complexity | O(1) iterative |
| Output Format | LCA node |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 GitLab |
| 🔵 Amazon | 🟡 Microsoft | 🟢 GitHub |
| 🔵 LinkedIn | 🟡 Uber | 🟢 Bitbucket |

---

## Follow-up Questions

1. How does BST property help find LCA?
2. What's the decision at each node?
3. How is this different from general binary tree LCA?
4. Can you do this iteratively?
