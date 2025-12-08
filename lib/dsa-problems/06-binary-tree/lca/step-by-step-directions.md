# Step-By-Step Directions From a Binary Tree Node to Another

## Problem Description

**Real-World Scenario:**
A navigation system generates turn-by-turn directions ("Left", "Right", "Up") to get from a specific folder to another in a file hierarchy.

**Example Setup:** 
A robot path planner finds the sequence of moves to travel between two locations in a tree-structured map.

**What is Step-By-Step Directions?**
Given the `root` of a binary tree with `n` nodes. Each node is uniquely assigned a value from `1` to `n`. You are also given an integer `startValue` representing the value of the start node `s`, and a different integer `destValue` representing the value of the destination node `t`. Find the shortest path starting from node `s` and ending at node `t`. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction: 'L' means to go from a node to its left child node. 'R' means to go from a node to its right child node. 'U' means to go from a node to its parent node.

**Why is it important?**
- Lowest Common Ancestor (LCA)
- Path finding
- String manipulation
- Tree traversal

**Your Task:** 
Return the direction string.

**Difficulty:** Medium
**Tags:** Binary Tree, Lca, Lowest Common Ancestor, Path Finding, String Manipulation, Tree Traversal, O(N), Interview

---

## Examples

### Example 1:
**Input:** `root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6`
**Output:** `"UURL"`
**Explanation:** 3 -> 1 (U). 1 -> 5 (U). 5 -> 2 (R). 2 -> 6 (L).

### Example 2:
**Input:** `root = [2,1], startValue = 2, destValue = 1`
**Output:** `"L"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 2 ≤ n ≤ 10⁵ |
| Values | 1 ≤ val ≤ n |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Amazon |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Apple |
| 🔵 LinkedIn | 🟡 Uber | 🟢 Twitter |

---

## Follow-up Questions

1. Why find the LCA first?
2. Why is the path from start to LCA always 'U'?
3. How to find path from LCA to dest ('L'/'R')?
4. Can you optimize string concatenation (StringBuilder)?
