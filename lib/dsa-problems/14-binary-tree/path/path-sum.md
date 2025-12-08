# Binary Tree Path Sum

## Problem Description

**Real-World Scenario:**
In a company expense tree, each node represents a department's budget. Find if there's a path from CEO to any team where budgets sum to a target amount.

**Example Setup:** 
A game skill tree tracks experience points needed. Given XP values at each node, determine if there's a path from root to leaf giving exactly the target XP total.

**What is Path Sum?**
Given a binary tree and a target sum, determine if the tree has a root-to-leaf path where all node values sum to the target.

**Why is it important?**
- Tree traversal
- Path tracking
- DFS application
- Foundation for path problems

**Your Task:** 
Return true if such a path exists.

**Difficulty:** Medium
**Tags:** Binary Tree, Path, Tree Traversal, Path Tracking, Dfs Application, Foundation For Path Problems, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
       5
      / \
     4   8
    /   / \
   11  13  4
  /  \      \
 7    2      1
targetSum = 22
```
**Output:** `true`
**Explanation:** Path 5→4→11→2 sums to 22.

### Example 2:
**Input:** 
```
  1
 / \
2   3
targetSum = 5
```
**Output:** `false`
**Explanation:** No root-to-leaf path sums to 5.

### Example 3:
**Input:** Empty tree, targetSum = 0
**Output:** `false`
**Explanation:** No path in empty tree.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 5000 |
| Node Value | -1000 ≤ val ≤ 1000 |
| Target | -1000 ≤ target ≤ 1000 |
| Data Type | Binary tree |
| Time Complexity | O(n) |
| Space Complexity | O(h) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Amazon | 🟡 Oracle | 🟢 Atlassian |
| 🔵 Microsoft | 🟡 Adobe | 🟢 VMware |

---

## Follow-up Questions

1. What if you need all paths (Path Sum II)?
2. What if path can start anywhere (Path Sum III)?
3. Why check for leaf node specifically?
4. How would you return the actual path?
