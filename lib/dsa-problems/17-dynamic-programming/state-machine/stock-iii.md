# Best Time to Buy and Sell Stock III

## Problem Description

**Real-World Scenario:**
A day trader is limited to exactly two transactions per day due to platform regulations. Maximize profit from a sequence of prices.

**Example Setup:** 
A resource manager buys and sells a commodity twice during a season to capitalize on price fluctuations.

**What is Buy/Sell Stock III?**
Find the maximum profit you can achieve. You may complete at most two transactions. Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

**Why is it important?**
- State machine DP
- Bidirectional DP
- Generalization to k transactions
- Hard interview problem

**Your Task:** 
Return maximum profit with at most 2 transactions.

**Difficulty:** Medium
**Tags:** Dynamic Programming, State Machine, State Machine Dp, Bidirectional Dp, Generalization To K Transactions, Hard Interview, O(n), Interview

---

## Examples

### Example 1:
**Input:** `prices = [3,3,5,0,0,3,1,4]`
**Output:** `6`
**Explanation:** Buy at 3, sell at 5 (profit 2). Buy at 0, sell at 4 (profit 4). Total 6.

### Example 2:
**Input:** `prices = [1,2,3,4,5]`
**Output:** `4`
**Explanation:** Buy at 1, sell at 5 (profit 4).

### Example 3:
**Input:** `prices = [7,6,4,3,1]`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Prices | 1 ≤ n ≤ 10⁵ |
| Price Value | 0 ≤ prices[i] ≤ 10⁵ |
| Data Type | Integer array |
| Special Conditions | At most 2 transactions |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Integer profit |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Two Sigma |
| 🔵 Facebook | 🟡 Microsoft | 🟢 DE Shaw |

---

## Follow-up Questions

1. How do you track 4 states (buy1, sell1, buy2, sell2)?
2. Why does the order of updates matter?
3. How is this different from "unlimited transactions"?
4. Can you generalize to k transactions?
