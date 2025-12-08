# Kth Smallest Element in BST

## Problem Description

**Real-World Scenario:**
In a leaderboard system stored as a BST (players sorted by score), find the player ranked Kth. This gives you the Kth smallest score efficiently.

**Example Setup:** 
An e-commerce platform stores product prices in a BST for quick range queries. The team needs to find the Kth cheapest product for a "budget picks" feature.

**What is Kth Smallest in BST?**
Find the Kth smallest element in a BST. Since inorder traversal of BST gives sorted order, the Kth element in inorder is the answer.

**Why is it important?**
- BST + inorder property
- Kth order statistics
- Can be optimized with augmented BST
- Real-world ranking queries

**Your Task:** 
Return the Kth smallest value in the BST.

---

## Examples

### Example 1:
**Input:** 
```
    3
   / \
  1   4
   \
    2
k = 1
```
**Output:** `1`
**Explanation:** Inorder: [1, 2, 3, 4]. 1st smallest = 1.

### Example 2:
**Input:** 
```
    5
   / \
  3   6
 / \
2   4
/
1
k = 3
```
**Output:** `3`
**Explanation:** Inorder: [1, 2, 3, 4, 5, 6]. 3rd smallest = 3.

### Example 3:
**Input:** 
```
  2
 / \
1   3
k = 2
```
**Output:** `2`
**Explanation:** Inorder: [1, 2, 3]. 2nd smallest = 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 10⁴ |
| K Value | 1 ≤ k ≤ n |
| Node Value | 0 ≤ val ≤ 10⁴ |
| Special Conditions | k always valid |
| Time Complexity | O(H + k) where H = height |
| Space Complexity | O(H) |
| Output Format | Integer value |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Facebook | 🟡 Uber | 🟢 Spotify |
| 🔵 Google | 🟡 LinkedIn | 🟢 Zillow |

---

## Follow-up Questions

1. What if the BST is modified frequently (augmented BST)?
2. Can you do this iteratively?
3. How would you find Kth largest instead?
4. What's the optimal approach for frequent Kth queries?
