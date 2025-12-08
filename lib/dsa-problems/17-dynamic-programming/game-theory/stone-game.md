# Stone Game (Nim-like)

## Problem Description

**Real-World Scenario:**
Two players take turns picking from either end of a row of coins. Both play optimally to maximize their total. Does the first player always win?

**Example Setup:** 
A board game where kids alternate taking candy from ends of a line. Can the first player guarantee more candy?

**What is Stone Game?**
Alice and Bob take turns picking stones from either end of pile array. Alice goes first. Both play optimally. Return true if Alice wins.

**Why is it important?**
- Game theory DP
- Minimax concept
- Two-player optimal play
- Classic interview pattern

**Your Task:** 
Return true if Alice wins with optimal play.

**Difficulty:** Hard
**Tags:** Dynamic Programming, Game Theory, Game Theory Dp, Minimax Concept, Two-Player Optimal Play, Classic Interview Pattern, O(n²), Interview

---

## Examples

### Example 1:
**Input:** `piles = [5, 3, 4, 5]`
**Output:** `true`
**Explanation:** Alice takes 5, gets 5+4=9 > 3+5=8.

### Example 2:
**Input:** `piles = [3, 7, 2, 3]`
**Output:** `true`
**Explanation:** Alice can guarantee victory.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Piles | 2 ≤ n ≤ 500, n is even |
| Pile Value | 1 ≤ piles[i] ≤ 500 |
| Data Type | Integer array |
| Special Conditions | Total sum is odd, no ties |
| Time Complexity | O(n²) for DP |
| Space Complexity | O(n²) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Amazon | 🟡 Uber | 🟢 King |
| 🔵 Microsoft | 🟡 Apple | 🟢 Supercell |

---

## Follow-up Questions

1. What does dp[i][j] represent?
2. Why does first player always win (mathematical proof)?
3. What about picking from any position?
4. How do you reconstruct the actual moves?
