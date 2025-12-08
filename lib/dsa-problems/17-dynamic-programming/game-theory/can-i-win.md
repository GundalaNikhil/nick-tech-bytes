# Can I Win

## Problem Description

**Real-World Scenario:**
A competitive bidding process where two companies bid on projects with values 1 to N. The first to reach a total value of T wins. Can the first bidder guarantee a win?

**Example Setup:** 
A game of "Race to N" with a shared pool of numbers.

**What is Can I Win?**
In the "100 game" two players take turns adding, to a running total, any integer from `1` to `10`. The player who first causes the running total to reach or exceed `100` wins.
What if we change the game so that players cannot re-use integers?
For example, two players might take turns drawing from a common pool of numbers from `1` to `15` without replacement until they reach a total >= `100`.
Given two integers `maxChoosableInteger` and `desiredTotal`, return `true` if the first player to move can force a win, otherwise, return `false`. Assume both players play optimally.

**Why is it important?**
- Minimax with Memoization
- Bitmask DP (State Representation)
- Game Theory

**Your Task:** 
Return boolean.

---

## Examples

### Example 1:
**Input:** `maxChoosableInteger = 10, desiredTotal = 11`
**Output:** `false`
**Explanation:** 
No matter which integer the first player chooses, the first player will lose.
The first player can choose an integer from 1 up to 10.
If the first player chooses 1, the second player can choose 10.
The total is 1 + 10 = 11, which is >= 11.
Same for any other choice.

### Example 2:
**Input:** `maxChoosableInteger = 10, desiredTotal = 0`
**Output:** `true`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Max Integer | 1 ≤ maxChoosableInteger ≤ 20 |
| Desired Total | 0 ≤ desiredTotal ≤ 300 |
| Time Complexity | O(2^N * N) |
| Space Complexity | O(2^N) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 LinkedIn |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Lyft |

---

## Follow-up Questions

1. Why Bitmask? (N <= 20, so we can use an integer to represent the set of used numbers).
2. Pruning? (If sum(1..N) < desiredTotal, no one can win -> false. Actually, if sum < total, game is impossible to finish? Problem says "reach or exceed". If sum < total, no one wins? Usually implies draw or false).
3. Memoization key? (The bitmask is sufficient state).
