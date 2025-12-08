# Super Egg Drop

## Problem Description

**Real-World Scenario:**
A product tester wants to determine the highest floor from which a new phone model can be dropped without breaking, using a limited number of test phones and drops.

**Example Setup:** 
Finding the breaking point of a material with minimal destructive tests.

**What is Super Egg Drop?**
You are given `k` identical eggs and you have access to a building with `n` floors labeled from `1` to `n`.
You know that there exists a floor `f` where `0 <= f <= n` such that any egg dropped at a floor higher than `f` will break, and any egg dropped at or below floor `f` will not break.
Each move, you may take an unbroken egg and drop it from any floor `x` (where `1 <= x <= n`). If the egg breaks, you can no longer use it. If the egg does not break, you may reuse it in future moves.
Return the minimum number of moves that you need to determine with certainty what the value of `f` is.

**Why is it important?**
- Dynamic Programming
- Binary Search Optimization
- Mathematical Insight (Binomial Coefficients)

**Your Task:** 
Return min moves.

**Difficulty:** Hard
**Tags:** Dynamic Programming, Advanced, Binary Search Optimization, Mathematical Insight, O(K log N), Interview

---

## Examples

### Example 1:
**Input:** `k = 1, n = 2`
**Output:** `2`
**Explanation:** Drop from floor 1. If breaks, f=0. If not, drop from floor 2. If breaks, f=1. If not, f=2.

### Example 2:
**Input:** `k = 2, n = 6`
**Output:** `3`

### Example 3:
**Input:** `k = 3, n = 14`
**Output:** `4`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Eggs (k) | 1 ≤ k ≤ 100 |
| Floors (n) | 1 ≤ n ≤ 10^4 |
| Time Complexity | O(K log N) or O(K * Moves) |
| Space Complexity | O(K * N) or O(K) |
| Output Format | Integer moves |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Goldman Sachs |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Citadel |
| 🔵 Facebook | 🟡 Apple | 🟢 Two Sigma |

---

## Follow-up Questions

1. Why not standard Binary Search? (Limited eggs. If egg breaks, you lose ability to search efficiently).
2. Recurrence: `dp[moves][eggs] = dp[moves-1][eggs-1] (break) + dp[moves-1][eggs] (no break) + 1 (current floor)`.
3. Why does this look like Pascal's Triangle? (Sum of binomial coefficients).
4. Optimization: Instead of finding min moves for N floors, find max floors for M moves.
