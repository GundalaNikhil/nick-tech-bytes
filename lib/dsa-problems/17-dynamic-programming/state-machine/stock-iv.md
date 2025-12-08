# Best Time to Buy and Sell Stock IV

## Problem Description

**Real-World Scenario:**
A high-frequency trading algorithm executes at most k trades to maximize returns from a price signal.

**Example Setup:** 
A portfolio manager rebalances a specific asset at most k times during a period to optimize gains.

**What is Buy/Sell Stock IV?**
You are given an integer array `prices` and an integer `k`. Find the maximum profit you can achieve. You may complete at most `k` transactions.

**Why is it important?**
- DP optimization
- Generalization of Stock III
- Handling large k (unlimited case)
- Hard interview problem

**Your Task:** 
Return maximum profit with at most k transactions.

---

## Examples

### Example 1:
**Input:** `k = 2, prices = [2,4,1]`
**Output:** `2`
**Explanation:** Buy at 2, sell at 4.

### Example 2:
**Input:** `k = 2, prices = [3,2,6,5,0,3]`
**Output:** `7`
**Explanation:** Buy at 2, sell at 6 (profit 4). Buy at 0, sell at 3 (profit 3).

---

## Constraints

| Constraint | Value |
|------------|-------|
| K Value | 0 ≤ k ≤ 100 |
| Prices | 0 ≤ n ≤ 1000 |
| Price Value | 0 ≤ prices[i] ≤ 1000 |
| Data Type | Integer array |
| Special Conditions | If k >= n/2, treat as unlimited |
| Time Complexity | O(nk) |
| Space Complexity | O(k) |
| Output Format | Integer profit |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 DRW |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Akuna |
| 🔵 Facebook | 🟡 Apple | 🟢 Jane Street |

---

## Follow-up Questions

1. Why treat k >= n/2 as unlimited transactions?
2. What is the DP state `dp[i][j]` (k transactions, holding/not)?
3. How to optimize space to O(k)?
4. What if k is very large (10^9)?
