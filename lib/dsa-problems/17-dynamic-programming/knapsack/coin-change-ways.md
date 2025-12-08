# Coin Change II (Number of Ways)

## Problem Description

**Real-World Scenario:**
A vending machine needs to display "X ways to pay" for any amount using available coin denominations. Count all distinct combinations (not permutations).

**Example Setup:** 
A currency exchange shows travelers how many ways they can receive a target amount using available bill denominations.

**What is Coin Change II?**
Given coin denominations and a target amount, find the number of combinations to make the amount. This is the unbounded knapsack pattern.

**Why is it important?**
- Unbounded knapsack
- Counting vs optimization DP
- Currency/payment systems
- Combination vs permutation

**Your Task:** 
Return the number of combinations to make the amount.

---

## Examples

### Example 1:
**Input:** `amount = 5, coins = [1, 2, 5]`
**Output:** `4`
**Explanation:** 5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1.

### Example 2:
**Input:** `amount = 3, coins = [2]`
**Output:** `0`
**Explanation:** Can't make 3 with only 2s.

### Example 3:
**Input:** `amount = 10, coins = [10]`
**Output:** `1`
**Explanation:** Only one 10.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Coins | 1 ≤ n ≤ 300 |
| Amount | 0 ≤ amount ≤ 5000 |
| Coin Value | 1 ≤ coins[i] ≤ 5000 |
| Data Type | Integer array |
| Time Complexity | O(n × amount) |
| Space Complexity | O(amount) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Square |
| 🔵 Amazon | 🟡 Uber | 🟢 Stripe |
| 🔵 Facebook | 🟡 Goldman Sachs | 🟢 PayPal |

---

## Follow-up Questions

1. Why iterate coins first (combinations not permutations)?
2. What's the difference from Coin Change I (min coins)?
3. How is this unbounded vs 0/1 knapsack?
4. What if order matters (permutations)?
