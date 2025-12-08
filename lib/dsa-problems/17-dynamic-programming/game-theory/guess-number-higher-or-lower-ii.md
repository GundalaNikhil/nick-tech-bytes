# Guess Number Higher or Lower II

## Problem Description

**Real-World Scenario:**
Minimizing the worst-case cost of finding a bug in a codebase where each test (guess) has a cost associated with the module being tested.

**Example Setup:** 
A strategy game where you pay to ask questions and want to guarantee a win with minimum budget.

**What is Guess Number Higher or Lower II?**
We are playing the Guessing Game. The game is as follows:
I pick a number from `1` to `n`. You have to guess which number I picked.
Every time you guess wrong, I will tell you whether the number I picked is higher or lower.
However, when you guess a particular number `x`, and you guess wrong, you pay `$x`. You win the game when you guess the number I picked.
Given a particular `n`, return the minimum amount of money you need to guarantee a win regardless of what number I picked.

**Why is it important?**
- Minimax Algorithm
- Dynamic Programming (Interval DP)
- Game Theory

**Your Task:** 
Return min cost.

---

## Examples

### Example 1:
**Input:** `n = 10`
**Output:** `16`
**Explanation:** The winning strategy is to guess 7.
If num > 7 (8,9,10), guess 9.
  If num > 9 (10), pay 7+9=16. Win.
  If num < 9 (8), pay 7+9=16. Win.
If num < 7 (1..6), guess 3.
  If num > 3 (4,5,6), guess 5. Pay 7+3+5=15.
  If num < 3 (1,2), guess 1. Pay 7+3+1=11.
Worst case is 16.

### Example 2:
**Input:** `n = 1`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| n | 1 ≤ n ≤ 200 |
| Time Complexity | O(N^3) |
| Space Complexity | O(N^2) |
| Output Format | Integer cost |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Baidu |
| 🔵 Facebook | 🟡 Apple | 🟢 Alibaba |

---

## Follow-up Questions

1. Why Minimax? (We want to minimize our loss in the worst-case scenario controlled by the opponent/luck).
2. Recurrence? `dp[i][j] = min(k + max(dp[i][k-1], dp[k+1][j]))` for k in i..j.
3. Why `max` inside `min`? (Max represents the worst outcome of a guess, Min represents our optimal choice of guess).
