# Last Stone Weight II

## Problem Description

**Real-World Scenario:**
A cargo loader balances two piles of stones to minimize the weight difference between them.

**Example Setup:** 
A load balancer distributes tasks between two servers to minimize the difference in total processing time.

**What is Last Stone Weight II?**
You are given an array of integers `stones` where `stones[i]` is the weight of the `ith` stone. We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights `x` and `y` with `x <= y`. The result of this smash is:
- If `x == y`, both stones are destroyed, and
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.
At the end of the game, there is at most one stone left. Return the smallest possible weight of the left stone.

**Why is it important?**
- Reduction to Partition Equal Subset Sum
- Knapsack variation
- Subset sum minimization
- Mathematical transformation

**Your Task:** 
Return the smallest possible weight of the last stone.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Knapsack, Reduction To Partition Equal Subset Sum, Knapsack Variation, Subset Sum Minimization, Mathematical Transformation, O(n * sum), Interview

---

## Examples

### Example 1:
**Input:** `stones = [2,7,4,1,8,1]`
**Output:** `1`
**Explanation:** 
Combine 2 and 4 to get 2. Stones: [2,7,1,8,1].
Combine 7 and 8 to get 1. Stones: [2,1,1,1].
Combine 2 and 1 to get 1. Stones: [1,1,1].
Combine 1 and 1 to get 0. Stones: [1].
Result is 1.

### Example 2:
**Input:** `stones = [31,26,33,21,40]`
**Output:** `5`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Stones | 1 ≤ n ≤ 30 |
| Weight | 1 ≤ stones[i] ≤ 100 |
| Total Weight | Sum ≤ 3000 |
| Data Type | Integer array |
| Time Complexity | O(n * sum) |
| Space Complexity | O(sum) |
| Output Format | Integer weight |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Roblox |
| 🔵 Amazon | 🟡 Apple | 🟢 Wish |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Coupang |

---

## Follow-up Questions

1. How is this equivalent to partitioning into two subsets with min difference?
2. Why is the target sum `total / 2`?
3. What is the DP state `dp[w]` (can weight w be formed)?
4. Why is this O(n*sum) and not exponential?
