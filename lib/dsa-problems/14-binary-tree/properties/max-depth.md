# Maximum Depth of Binary Tree

## Problem Description

**Real-World Scenario:**
In a corporate hierarchy, the "depth" represents the longest chain from CEO to the lowest-level employee. HR needs to know this to understand organizational complexity and communication delays.

**Example Setup:** 
A game has a skill tree where players unlock abilities. The "depth" of the tree determines the maximum number of skills a player needs to unlock before reaching the most advanced ability. What's the longest unlock path?

**What is Maximum Depth?**
The maximum depth (or height) of a binary tree is the number of nodes along the longest path from the root to the farthest leaf node.

**Why is it important?**
- Determines tree balance
- Affects algorithm complexity
- Used in tree balancing (AVL, Red-Black)
- Organizational hierarchy analysis

**Your Task:** 
Return the maximum depth of a binary tree.

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
**Output:** `3`
**Explanation:** Path 3→20→15 or 3→20→7 has 3 nodes.

### Example 2:
**Input:** 
```
  1
   \
    2
```
**Output:** `2`
**Explanation:** Path 1→2 has 2 nodes.

### Example 3:
**Input:** Empty tree
**Output:** `0`
**Explanation:** No nodes, depth is 0.

### Example 4:
**Input:** 
```
    1
```
**Output:** `1`
**Explanation:** Single node has depth 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁴ |
| Node Value | -100 ≤ val ≤ 100 |
| Data Type | TreeNode structure |
| Special Conditions | Can be empty or skewed |
| Time Complexity | O(n) |
| Space Complexity | O(h) where h = height |
| Output Format | Integer depth |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Spotify |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Facebook | 🟡 Adobe | 🟢 Twitch |
| 🔵 Apple | 🟡 Uber | 🟢 Reddit |

---

## Follow-up Questions

1. Can you solve this iteratively with BFS?
2. What's the difference between depth and height?
3. How would you find minimum depth instead?
4. What if you needed to count edges instead of nodes?
