# Knight Probability in Chessboard

## Problem Description

**Real-World Scenario:**
A robotic arm moves randomly on a bounded grid. Calculate the probability that it remains within the workspace boundary after K random moves.

**Example Setup:** 
A particle diffusion simulation calculates the probability of a particle staying inside a container after K random steps.

**What is Knight Probability...?**
On an `n x n` chessboard, a knight starts at the cell `(row, column)` and attempts to make exactly `k` moves. The rows and columns are 0-indexed, so the top-left cell is `(0, 0)`, and the bottom-right cell is `(n - 1, n - 1)`. A chess knight has 8 possible moves it can make, as illustrated below. Each move is two cells in a cardinal direction, then one cell in an orthogonal direction. Each time the knight is to move, it chooses one of eight possible moves uniformly at random (even if the piece would go off the chessboard) and moves there. The knight continues moving until it has made `k` moves or has moved off the chessboard. Return the probability that the knight remains on the board after it has stopped moving.

**Why is it important?**
- DP with Probability
- 3D DP State `(k, r, c)`
- Simulation
- Optimization (Space O(N^2))

**Your Task:** 
Return probability.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Grid Dp, Dp With Probability, 3D Dp State ``, Simulation, Optimization, O(K * N^2), Interview

---

## Examples

### Example 1:
**Input:** `n = 3, k = 2, row = 0, column = 0`
**Output:** `0.0625`
**Explanation:** 
Start (0,0).
Move 1: (1,2), (2,1). 2 valid moves out of 8. Prob 2/8 = 0.25.
From (1,2): Valid next moves: (2,0), (0,0)? No, (2,0), (3,1)X, (3,3)X...
Actually, just sum probabilities.
Total valid paths / 8^k.

### Example 2:
**Input:** `n = 1, k = 0, row = 0, column = 0`
**Output:** `1.00000`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Board Size | 1 ≤ n ≤ 25 |
| Moves | 0 ≤ k ≤ 100 |
| Data Type | Double |
| Time Complexity | O(K * N^2) |
| Space Complexity | O(N^2) |
| Output Format | Double probability |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Twitch |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Chess.com |
| 🔵 Google | 🟡 Apple | 🟢 Lichess |

---

## Follow-up Questions

1. Why use `dp[k][r][c]`?
2. Why iterate k from 1 to K?
3. How to handle boundary checks?
4. Can you optimize space to O(N^2) using two 2D arrays?
