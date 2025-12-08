# Coin Change (Minimum Coins)

## Problem Description

**Real-World Scenario:**
You're at a vending machine that only accepts exact change. You have unlimited coins of certain denominations. What's the minimum number of coins needed to make the exact amount?

**Example Setup:** 
Kiran is at a parking meter that needs ₹37. She has unlimited coins of ₹1, ₹2, ₹5, and ₹10. What's the minimum number of coins she needs? Being smart, she doesn't want to insert 37 one-rupee coins!

**What is the Coin Change Problem?**
Given coin denominations and a target amount, find the minimum number of coins needed to make that amount. If it's impossible, return -1.

**Why is it important?**
- Classic unbounded knapsack variant
- Foundation for optimization problems
- Real-world currency/change making
- Tests DP optimization skills

**Your Task:** 
Find the fewest number of coins needed to make up the given amount.

**Difficulty:** Medium
**Tags:** Dynamic Programming, 1D Dp, Classic Unbounded Knapsack Variant, Foundation For Optimization Problems, Real-World Currency/Change Making, Tests Dp Optimization Skills, O(amount × coins), Interview

---

## Examples

### Example 1:
**Input:** `coins = [1, 2, 5], amount = 11`
**Output:** `3`
**Explanation:** 11 = 5 + 5 + 1 (3 coins)

### Example 2:
**Input:** `coins = [2], amount = 3`
**Output:** `-1`
**Explanation:** Cannot make 3 with only coins of 2.

### Example 3:
**Input:** `coins = [1], amount = 0`
**Output:** `0`
**Explanation:** 0 coins needed for amount 0.

### Example 4:
**Input:** `coins = [1, 5, 10, 25], amount = 30`
**Output:** `2`
**Explanation:** 30 = 25 + 5 (2 coins) - optimal!

---

## Constraints

| Constraint | Value |
|------------|-------|
| Coins | 1 ≤ coins.length ≤ 12 |
| Coin Value | 1 ≤ coins[i] ≤ 2³¹ - 1 |
| Amount | 0 ≤ amount ≤ 10⁴ |
| Special Conditions | Unlimited coins of each type |
| Time Complexity | O(amount × coins) |
| Space Complexity | O(amount) |
| Output Format | Minimum coins or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Phonepe |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Paytm |
| 🔵 Apple | 🟡 Uber | 🟢 Razorpay |
| 🔵 Microsoft | 🟡 Airbnb | 🟢 Stripe |

---

## Follow-up Questions

1. How does this differ from the "count ways" variant?
2. What if we had limited coins of each type (bounded knapsack)?
3. Why does greedy fail for some coin systems?
4. How would you reconstruct which coins were used?
