# Binary Tree Maximum Path Sum

## Problem Description

**Real-World Scenario:**
A shipping company calculates the most profitable route through a distribution network. Each warehouse has profit/loss; find the max-sum path that can start and end anywhere.

**Example Setup:** 
A pipeline network finds the path segment with maximum flow capacity, where capacity can be negative (blocked sections).

**What is Maximum Path Sum?**
Find the maximum sum of any path in a binary tree. A path is any sequence of connected nodes (doesn't have to go through root).

**Why is it important?**
- Tree DP classic
- Non-linear path problems
- Handling negative values
- Hard interview problem

**Your Task:** 
Return the maximum path sum.

**Difficulty:** Medium
**Tags:** Binary Tree, Path, Tree Dp Classic, Non-Linear Path Problems, Handling Negative Values, Hard Interview, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
    1
   / \
  2   3
```
**Output:** `6`
**Explanation:** Path 2→1→3 has sum 6.

### Example 2:
**Input:** 
```
    -10
   /   \
  9    20
      /  \
     15   7
```
**Output:** `42`
**Explanation:** Path 15→20→7 = 42.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 3 × 10⁴ |
| Node Value | -1000 ≤ val ≤ 1000 |
| Data Type | Binary tree |
| Special Conditions | Path need not pass through root |
| Time Complexity | O(n) |
| Space Complexity | O(h) |
| Output Format | Maximum sum integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 FedEx |
| 🔵 Amazon | 🟡 Microsoft | 🟢 UPS |
| 🔵 Google | 🟡 Apple | 🟢 DHL |

---

## Follow-up Questions

1. What's the difference between "gain" and "max path through node"?
2. Why return max(0, contribution) to parent?
3. How do you track the global maximum?
4. What about path with at least K nodes?
