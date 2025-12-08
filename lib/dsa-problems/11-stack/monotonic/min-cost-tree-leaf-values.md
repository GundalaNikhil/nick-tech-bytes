# Minimum Cost Tree From Leaf Values

## Problem Description

**Real-World Scenario:**
A compiler optimization pass minimizes the cost of intermediate operations in an expression tree, where the cost of combining two operands is their product.

**Example Setup:** 
A matrix multiplication chain optimizer finds the order of multiplications that minimizes scalar operations (similar concept).

**What is Minimum Cost Tree From Leaf Values?**
Given an array `arr` of positive integers, consider all binary trees such that:
- Each node has either 0 or 2 children;
- The values of `arr` correspond to the values of each leaf in an in-order traversal of the tree.
The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtrees respectively. Among all possible binary trees considered, return the smallest possible sum of the values of each non-leaf node.

**Why is it important?**
- Monotonic Stack
- Interval DP
- Greedy Strategy
- Optimization

**Your Task:** 
Return minimum cost.

---

## Examples

### Example 1:
**Input:** `arr = [6,2,4]`
**Output:** `32`
**Explanation:** 
Tree 1: ((6,2), 4). Non-leaf 1: 6*2=12 (max 6). Non-leaf 2: 6*4=24. Total 12+24=36.
Tree 2: (6, (2,4)). Non-leaf 1: 2*4=8 (max 4). Non-leaf 2: 6*4=24. Total 8+24=32.
Min is 32.

### Example 2:
**Input:** `arr = [4,11]`
**Output:** `44`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 2 ≤ n ≤ 40 |
| Element Value | 1 ≤ arr[i] ≤ 15 |
| Data Type | Integer array |
| Time Complexity | O(N) (Stack) or O(N^3) (DP) |
| Space Complexity | O(N) |
| Output Format | Integer cost |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Adobe |
| 🔵 Google | 🟡 Microsoft | 🟢 Intel |
| 🔵 Facebook | 🟡 Apple | 🟢 Nvidia |

---

## Follow-up Questions

1. Why remove the smallest local element and multiply it with the smaller of its neighbors?
2. How does the Monotonic Stack help find the "next greater element"?
3. Why is this greedy approach optimal?
4. Can you solve it with Interval DP `dp[i][j]`?
