# Best Time to Buy and Sell Stock

## Problem Description

**Real-World Scenario:**
You're a stock trader with a time machine (one trip!). Given historical stock prices, find the best day to buy and sell for maximum profit.

**Example Setup:** 
Ravi used to kick himself for selling his investments too early. If he had perfect hindsight on Tesla stock, which single day should he have bought and which day sold for maximum profit?

**What is Best Time to Buy and Sell Stock?**
Given an array where prices[i] is the stock price on day i, find the maximum profit from one buy and one sell (buy before sell). If no profit is possible, return 0.

**Why is it important?**
- Classic greedy problem
- Track minimum so far
- Foundation for multi-transaction variants
- Real-world trading applications

**Your Task:** 
Find the maximum profit from one transaction.

---

## Examples

### Example 1:
**Input:** `prices = [7, 1, 5, 3, 6, 4]`
**Output:** `5`
**Explanation:** Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6-1 = 5.

### Example 2:
**Input:** `prices = [7, 6, 4, 3, 1]`
**Output:** `0`
**Explanation:** Prices only decrease - no profitable transaction.

### Example 3:
**Input:** `prices = [2, 4, 1]`
**Output:** `2`
**Explanation:** Buy at 2, sell at 4. Profit = 2.

### Example 4:
**Input:** `prices = [1, 2]`
**Output:** `1`
**Explanation:** Simple case: buy day 1, sell day 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| Price Range | 0 ≤ prices[i] ≤ 10⁴ |
| Data Type | Integer array |
| Special Conditions | Only one transaction allowed |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Maximum profit integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Robinhood |
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Zerodha |
| 🔵 Google | 🟡 Morgan Stanley | 🟢 Trading firms |
| 🔵 Microsoft | 🟡 JPMorgan | 🟢 Citadel |

---

## Follow-up Questions

1. What if you can do multiple transactions (Stock II)?
2. What if there's a cooldown period (Stock with Cooldown)?
3. What if there's a transaction fee?
4. What if you can do at most K transactions?
