# Best Time to Buy and Sell Stock with Transaction Fee

## Problem Description

**Real-World Scenario:**
A brokerage charges a fee per trade. Factor in transaction costs when deciding whether a trade is profitable.

**Example Setup:** 
A forex trader accounts for spread and commission. Only trade when profit exceeds the fee.

**What is Buy/Sell Stock with Transaction Fee?**
Find maximum profit with unlimited transactions, but each transaction has a fee. Only worth trading if profit > fee.

**Why is it important?**
- State machine DP
- Fee consideration in trading
- Practical finance
- DP optimization

**Your Task:** 
Return the maximum profit after fees.

**Difficulty:** Medium
**Tags:** Dynamic Programming, State Machine, State Machine Dp, Fee Consideration In Trading, Practical Finance, Dp Optimization, O(n), Interview

---

## Examples

### Example 1:
**Input:** `prices = [1, 3, 2, 8, 4, 9], fee = 2`
**Output:** `8`
**Explanation:** Buy at 1, sell at 8 (profit 5), buy at 4, sell at 9 (profit 3). Total = 8.

### Example 2:
**Input:** `prices = [1, 3, 7, 5, 10, 3], fee = 3`
**Output:** `6`
**Explanation:** Buy at 1, sell at 7 (profit 3), buy at 5, sell at 10 (profit 2). Could also buy at 1, sell at 10 without intermediate trades.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Prices | 1 ≤ n ≤ 5 × 10⁴ |
| Price Value | 1 ≤ prices[i] ≤ 5 × 10⁴ |
| Fee | 0 ≤ fee ≤ 5 × 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Maximum profit |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Interactive Brokers |
| 🔵 Facebook | 🟡 Goldman Sachs | 🟢 Charles Schwab |
| 🔵 Google | 🟡 Citadel | 🟢 E*Trade |

---

## Follow-up Questions

1. How do you incorporate fee into state transitions?
2. When should you NOT trade?
3. How does this compare to the cooldown version?
4. What if buy and sell have different fees?
