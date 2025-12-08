# Stone Game IV

## Problem Description

**Real-World Scenario:**
Two players remove items from a pile, but can only remove a perfect square number of items (1, 4, 9, 16...). Determine if the first player can force a win.

**Example Setup:** 
A resource depletion game where valid moves are restricted to quadratic quantities.

**What is Stone Game IV?**
Alice and Bob take turns playing a game, with Alice starting first. Initially, there are `n` stones in a pile. On each player's turn, that player makes a move consisting of removing any non-zero square number of stones in the pile. Also, if a player cannot make a move, he/she loses the game. Given a positive integer `n`, return `true` if and only if Alice wins the game otherwise return `false`, assuming both players play optimally.

**Why is it important?**
- DP / Game Theory
- Boolean State (Win/Loss)
- Optimization
- Math (Perfect Squares)

**Your Task:** 
Return true if Alice wins.

**Difficulty:** Hard
**Tags:** Dynamic Programming, Game Theory, Dp / Game Theory, Boolean State, Optimization, Math, O(N * sqrt(N), Interview

---

## Examples

### Example 1:
**Input:** `n = 1`
**Output:** `true`
**Explanation:** Alice removes 1. Bob has 0. Bob loses.

### Example 2:
**Input:** `n = 2`
**Output:** `false`
**Explanation:** Alice removes 1. Bob has 1. Bob removes 1. Alice has 0. Alice loses.

### Example 3:
**Input:** `n = 4`
**Output:** `true`
**Explanation:** Alice removes 4. Bob has 0. Bob loses.

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 1 ≤ n ≤ 10⁵ |
| Data Type | Integer |
| Time Complexity | O(N * sqrt(N)) |
| Space Complexity | O(N) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 DraftKings |
| 🔵 Amazon | 🟡 Microsoft | 🟢 FanDuel |
| 🔵 Facebook | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. Why is `dp[i]` true if there exists a square `k*k` such that `dp[i - k*k]` is false?
2. Why iterate k from 1 up to sqrt(i)?
3. What is the base case `dp[0]`?
4. Can you optimize the inner loop?
