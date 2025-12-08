# Distribute Coins in Binary Tree

## Problem Description

**Real-World Scenario:**
A load balancer redistributes tasks among servers in a hierarchy so that every server has exactly one task.

**Example Setup:** 
A resource manager moves excess resources from over-provisioned nodes to under-provisioned nodes in a tree network to achieve equilibrium.

**What is Distribute Coins?**
You are given the `root` of a binary tree with `n` nodes where each node in the tree has `node.val` coins. There are `n` coins in total throughout the whole tree. In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent. Return the number of moves required to make every node have exactly one coin.

**Why is it important?**
- Post-order Traversal
- Flow balance
- Greedy approach
- Tree DP

**Your Task:** 
Return minimum moves.

---

## Examples

### Example 1:
**Input:** `root = [3,0,0]`
**Output:** `2`
**Explanation:** Root has 3, needs 1. Excess 2. Move 1 to left, 1 to right. Total 2 moves.

### Example 2:
**Input:** `root = [0,3,0]`
**Output:** `3`
**Explanation:** Root needs 1. Left has 3 (excess 2). Right needs 1.
Move 2 from Left to Root (2 moves). Root has 2. Move 1 from Root to Right (1 move). Total 3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 100 |
| Coins | 0 ≤ val ≤ n |
| Total Coins | n |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(H) |
| Output Format | Integer moves |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Yelp |
| 🔵 Facebook | 🟡 Apple | 🟢 Redfin |

---

## Follow-up Questions

1. Why is the number of moves equal to sum of absolute balance of each subtree?
2. What is the balance of a node (`val + left + right - 1`)?
3. Why Post-order traversal?
4. Can coins be negative (debt)?
