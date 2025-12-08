# Maximum Product of Splitted Binary Tree

## Problem Description

**Real-World Scenario:**
A power grid analyzer finds the optimal point to cut a transmission line (edge) to split the grid into two independent sub-grids such that the product of their total power loads is maximized.

**Example Setup:** 
A load balancer splits a task tree into two parallel execution groups to maximize the product of their computational weights (balancing load).

**What is Maximum Product...?**
Given the `root` of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized. Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 10^9 + 7.

**Why is it important?**
- Post-order Traversal
- Subtree Sum Calculation
- Optimization
- Tree properties

**Your Task:** 
Return max product.

---

## Examples

### Example 1:
**Input:** `root = [1,2,3,4,5,6]`
**Output:** `110`
**Explanation:** 
Total sum = 21.
Remove edge 1-2: Subtree 2 (sum 11), Subtree 1 (sum 10). Product 110.
Remove edge 1-3: Subtree 3 (sum 9), Subtree 1 (sum 12). Product 108.
Max 110.

### Example 2:
**Input:** `root = [1,null,2,3,4,null,null,5,6]`
**Output:** `90`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 50000 |
| Values | 1 ≤ val ≤ 10000 |
| Data Type | Binary Tree |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(N) |
| Space Complexity | O(H) |
| Output Format | Integer product |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Expedia |
| 🔵 Google | 🟡 Microsoft | 🟢 TripAdvisor |
| 🔵 Facebook | 🟡 Apple | 🟢 Booking |

---

## Follow-up Questions

1. Why calculate total tree sum first?
2. Why calculate subtree sum for every node?
3. Product = `subtree_sum * (total_sum - subtree_sum)`?
4. Why use `long` for product calculation before modulo?
