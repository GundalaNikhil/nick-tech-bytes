# Predict the Winner

## Problem Description

**Real-World Scenario:**
Two political parties take turns winning districts (with different electoral votes) from the edges of a state map. Who wins the election?

**Example Setup:** 
Same as Stone Game but without the "even piles" constraint, so the "always true" trick doesn't apply generally (though for even piles it does).

**What is Predict the Winner?**
You are given an integer array `nums`. Two players are playing a game with this array: player 1 and player 2.
Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of `0`. At each turn, the player takes one of the numbers from either end of the array (i.e., `nums[0]` or `nums[nums.length - 1]`) which reduces the size of the array by 1. The player adds the chosen number to their score. The game ends when there are no more elements in the array.
Return `true` if Player 1 can win the game. If the scores of both players are equal, then player 1 is still the winner, and you should also return `true`. You may assume that both players are playing optimally.

**Why is it important?**
- Dynamic Programming (Interval DP)
- Minimax
- Zero-Sum Game

**Your Task:** 
Return boolean.

---

## Examples

### Example 1:
**Input:** `nums = [1,5,2]`
**Output:** `false`
**Explanation:** 
Player 1 can choose 1 or 2.
If 1: P2 chooses 5. P1 chooses 2. Scores: P1=3, P2=5. Lose.
If 2: P2 chooses 5. P1 chooses 1. Scores: P1=3, P2=5. Lose.

### Example 2:
**Input:** `nums = [1,5,233,7]`
**Output:** `true`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 20 |
| Values | 0 ≤ nums[i] ≤ 10^7 |
| Time Complexity | O(N^2) |
| Space Complexity | O(N^2) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Goldman Sachs |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Snap |
| 🔵 Facebook | 🟡 Apple | 🟢 Twitter |

---

## Follow-up Questions

1. Recurrence? `dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1])`.
2. What does `dp[i][j]` represent? (The max score difference the current player can achieve over the opponent).
3. Base case? `dp[i][i] = nums[i]`.
