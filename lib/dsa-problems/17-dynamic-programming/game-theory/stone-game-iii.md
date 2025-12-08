# Stone Game III

## Problem Description

**Real-World Scenario:**
Two companies bid on a sequence of contracts. In each turn, a company can take 1, 2, or 3 consecutive contracts. Maximize the total value of contracts secured relative to the competitor.

**Example Setup:** 
A resource allocation game where two players take turns claiming resources from a pile to maximize their total yield.

**What is Stone Game III?**
Alice and Bob continue their games with piles of stones. There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array `stoneValue`. Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take 1, 2, or 3 stones from the first remaining stones in the row. The score of each player is the sum of the values of the stones taken. The score of each player is 0 initially. The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken. Return "Alice" if Alice will win, "Bob" if Bob will win, or "Tie" if they will end the game with the same score.

**Why is it important?**
- Minimax / DP
- Game Theory
- Suffix Sums optimization
- State evaluation

**Your Task:** 
Return winner string.

---

## Examples

### Example 1:
**Input:** `values = [1,2,3,7]`
**Output:** `"Bob"`
**Explanation:** 
Alice takes 1 (score 1). Bob takes 2,3,7 (score 12). Bob wins.
Alice takes 1,2 (score 3). Bob takes 3,7 (score 10). Bob wins.
Alice takes 1,2,3 (score 6). Bob takes 7 (score 7). Bob wins.

### Example 2:
**Input:** `values = [1,2,3,-9]`
**Output:** `"Alice"`
**Explanation:** Alice takes 1,2,3 (score 6). Bob takes -9. Alice wins.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 5 × 10⁴ |
| Value | -1000 ≤ values[i] ≤ 1000 |
| Data Type | Integer array |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 DraftKings |
| 🔵 Amazon | 🟡 Microsoft | 🟢 FanDuel |
| 🔵 Facebook | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. Why define `dp[i]` as max relative score from index i?
2. Recurrence: `dp[i] = max(sum[i:i+k] - dp[i+k])` for k=1,2,3?
3. How to handle negative stone values?
4. Can you optimize space to O(1) (only need next 3 states)?
