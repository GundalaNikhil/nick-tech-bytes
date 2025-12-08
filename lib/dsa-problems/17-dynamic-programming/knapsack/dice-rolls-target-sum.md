# Number of Dice Rolls With Target Sum

## Problem Description

**Real-World Scenario:**
A board game probability calculator determines the odds of rolling a specific sum with `n` dice to land on a target square.

**Example Setup:** 
A risk assessment model calculates the probability distribution of total loss from `n` independent risk events.

**What is Number of Dice Rolls...?**
You have `n` dice and each die has `k` faces numbered from `1` to `k`. Given three integers `n`, `k`, and `target`, return the number of possible ways (out of the `k^n` total ways) to roll the dice so the sum of the face-up numbers equals `target`. Return the answer modulo 10^9 + 7.

**Why is it important?**
- DP (Knapsack-like)
- Combinatorics
- Modulo arithmetic
- State transitions

**Your Task:** 
Return the count of ways.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Knapsack, Dp, Combinatorics, Modulo Arithmetic, State Transitions, O(n * target * k), Interview

---

## Examples

### Example 1:
**Input:** `n = 1, k = 6, target = 3`
**Output:** `1`
**Explanation:** You throw a die with 6 faces. There is only one way to get a sum of 3.

### Example 2:
**Input:** `n = 2, k = 6, target = 7`
**Output:** `6`
**Explanation:** 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Dice | 1 ≤ n ≤ 30 |
| Faces | 1 ≤ k ≤ 30 |
| Target | 1 ≤ target ≤ 1000 |
| Data Type | Integers |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(n * target * k) |
| Space Complexity | O(n * target) or O(target) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 DraftKings |
| 🔵 Google | 🟡 Microsoft | 🟢 FanDuel |
| 🔵 Facebook | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. What is the recurrence `dp[i][j] = sum(dp[i-1][j-face])`?
2. How to optimize space to O(target)?
3. What is the base case?
4. How to handle modulo efficiently?
