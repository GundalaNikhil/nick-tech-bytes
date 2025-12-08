# Best Time to Buy and Sell Stock with Cooldown

## Problem Description

**Real-World Scenario:**
A trading algorithm can buy/sell stocks but must wait one day after selling before buying again (settlement period).

**Example Setup:** 
A crypto trader operates under a platform's cooldown rule - after cashing out, wait a day before re-entering the market.

**What is Buy/Sell Stock with Cooldown?**
Find maximum profit with unlimited transactions but a 1-day cooldown after selling. You cannot buy on the day after you sell.

**Why is it important?**
- State machine DP
- Finance algorithms
- State transitions
- Advanced stock problems

**Your Task:** 
Return the maximum profit with cooldown.

**Difficulty:** Medium
**Tags:** Dynamic Programming, State Machine, State Machine Dp, Finance Algorithms, State Transitions, Advanced Stock Problems, O(n), Interview

---

## Examples

### Example 1:
**Input:** `prices = [1,2,3,0,2]`
**Output:** `3`
**Explanation:** buy→sell→cooldown→buy→sell = (2-1) + (2-0) = 3.

### Example 2:
**Input:** `prices = [1]`
**Output:** `0`
**Explanation:** Can't complete a transaction.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Prices | 1 ≤ n ≤ 5000 |
| Price Value | 0 ≤ prices[i] ≤ 1000 |
| Data Type | Integer array |
| Special Conditions | 1-day cooldown after sell |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Maximum profit |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Coinbase |
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Robinhood |
| 🔵 Facebook | 🟡 Citadel | 🟢 Gemini |

---

## Follow-up Questions

1. What are the three states (hold, sold, rest)?
2. How do state transitions work?
3. How does this differ from transaction fee version?
4. Can you draw the state machine?
