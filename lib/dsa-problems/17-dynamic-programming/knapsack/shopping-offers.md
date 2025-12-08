# Shopping Offers

## Problem Description

**Real-World Scenario:**
A smart shopping assistant calculates the cheapest way to buy a specific list of items given individual prices and special "bundle" offers.

**Example Setup:** 
A cloud resource estimator finds the minimum cost to provision required CPU, RAM, and Storage using a mix of on-demand rates and reserved instance bundles.

**What is Shopping Offers?**
In a store, there are some items to sell. Each item has a price. However, there are some special offers, and a special offer consists of one or more different kinds of items with a sale price. Given the list of prices, special offers, and your needs, return the lowest price you have to pay for exactly certain items as given, where you could make optimal use of the special offers.

**Why is it important?**
- DP with Memoization (Top-Down)
- State representation (Needs as key)
- Knapsack variation
- Optimization

**Your Task:** 
Return the minimum cost.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Knapsack, Dp With Memoization, State Representation, Knapsack Variation, Optimization, O(m * n * prod(needs), Interview

---

## Examples

### Example 1:
**Input:** `price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]`
**Output:** `14`
**Explanation:** 
A: price 2, B: price 5.
Offer 1: 3A + 0B for 5.
Offer 2: 1A + 2B for 10.
Need: 3A, 2B.
Option 1: Buy 3A (Offer 1) + 2B (Normal). Cost = 5 + 2*5 = 15.
Option 2: Buy 1A+2B (Offer 2) + 2A (Normal). Cost = 10 + 2*2 = 14.
Min cost 14.

### Example 2:
**Input:** `price = [2,3,4], special = [[1,1,0,4],[2,2,1,9]], needs = [1,2,1]`
**Output:** `11`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Items | n ≤ 6 |
| Offers | 0 ≤ m ≤ 100 |
| Needs | 0 ≤ needs[i] ≤ 10 |
| Data Type | Integer lists |
| Special Conditions | Cannot buy more than needed |
| Time Complexity | O(m * n * prod(needs)) |
| Space Complexity | O(prod(needs)) |
| Output Format | Integer cost |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Shopify |
| 🔵 Amazon | 🟡 Apple | 🟢 Groupon |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Honey |

---

## Follow-up Questions

1. Why use a Map for memoization?
2. How do you represent the state (needs list)?
3. Why check if offer is valid (doesn't exceed needs)?
4. What is the base case (buy remaining individually)?
