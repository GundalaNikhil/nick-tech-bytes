# Symmetric Tree

## Problem Description

**Real-World Scenario:**
A logo designer creates symmetric tree graphics. To verify perfect symmetry, check if the left side is a mirror image of the right side.

**Example Setup:** 
A family tree visualization app offers a "symmetry check" feature for artistic layouts - verifying if the tree structure is balanced and mirrored.

**What is Symmetric Tree?**
Check if a binary tree is a mirror of itself (symmetric around its center).

**Why is it important?**
- Tree comparison
- Recursive thinking
- Mirror/reflection problems
- Algorithm symmetry

**Your Task:** 
Return true if the tree is symmetric.

**Difficulty:** Medium
**Tags:** Binary Tree, Properties, Tree Comparison, Recursive Thinking, Mirror/Reflection Problems, Algorithm Symmetry, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```
**Output:** `true`
**Explanation:** Left subtree mirrors right subtree.

### Example 2:
**Input:** 
```
    1
   / \
  2   2
   \   \
   3    3
```
**Output:** `false`
**Explanation:** Right children don't mirror.

### Example 3:
**Input:** 
```
  1
```
**Output:** `true`
**Explanation:** Single node is symmetric.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 1000 |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | Binary tree |
| Special Conditions | Root always exists |
| Time Complexity | O(n) |
| Space Complexity | O(h) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Spotify |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Atlassian |
| 🔵 Facebook | 🟡 Adobe | 🟢 Cisco |

---

## Follow-up Questions

1. How do you compare left's left with right's right?
2. Can you solve iteratively with a queue?
3. What's the relationship to "are two trees identical"?
4. How would you make an asymmetric tree symmetric?
