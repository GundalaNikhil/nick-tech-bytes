# Balanced Binary Tree

## Problem Description

**Real-World Scenario:**
A network load balancer checks if the server tree is balanced. An unbalanced tree leads to hotspots. Verify depth difference ≤ 1 at every node.

**Example Setup:** 
A database index tree must stay balanced for O(log n) queries. Validate before queries.

**What is Balanced Binary Tree?**
A binary tree is height-balanced if the depth of two subtrees of every node never differs by more than 1.

**Why is it important?**
- Tree balance check
- Foundation for AVL/Red-Black
- Query optimization
- Bottom-up vs top-down

**Your Task:** 
Return true if the tree is height-balanced.

**Difficulty:** Medium
**Tags:** Binary Tree, Properties, Tree Balance Check, Foundation For Avl/Red-Black, Query Optimization, Bottom-Up Vs Top-Down, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    3
   / \
  9  20
    /  \
   15   7
```
**Output:** `true`
**Explanation:** All nodes have height diff ≤ 1.

### Example 2:
**Input:** 
```
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```
**Output:** `false`
**Explanation:** Left subtree too deep.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 5000 |
| Node Value | -10⁴ ≤ val ≤ 10⁴ |
| Data Type | Binary tree |
| Special Conditions | Check every node |
| Time Complexity | O(n) bottom-up |
| Space Complexity | O(h) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Akamai |
| 🔵 Google | 🟡 LinkedIn | 🟢 F5 |
| 🔵 Facebook | 🟡 Apple | 🟢 Citrix |

---

## Follow-up Questions

1. Why is bottom-up O(n) better than top-down O(n²)?
2. How do you propagate -1 for imbalance?
3. What's the connection to AVL trees?
4. How about checking if it can be balanced with one removal?
