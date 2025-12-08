# Random Pick with Weight

## Problem Description

**Real-World Scenario:**
An ad serving system shows ads with probability proportional to their bid amounts. Higher bids get shown more often.

**Example Setup:** 
A lottery system picks winners where each ticket has a weight (number of entries). More entries = higher chance of winning.

**What is Random Pick with Weight?**
Given an array of positive weights, randomly pick an index where probability of picking index i is proportional to w[i].

**Why is it important?**
- Weighted random sampling
- Prefix sum + binary search
- Ad systems/lotteries
- Load balancing

**Your Task:** 
Implement pickIndex() that returns a weighted random index.

**Difficulty:** Medium
**Tags:** Binary Search, Applications, Weighted Random Sampling, Prefix Sum + Binary Search, Ad Systems/Lotteries, Load Balancing, O(log n), Interview

---

## Examples

### Example 1:
**Input:** `w = [1, 3]`
**Output:** Picks:
- Index 0 with probability 1/4 (25%)
- Index 1 with probability 3/4 (75%)

### Example 2:
**Input:** `w = [1, 1, 1]`
**Output:** Each index with probability 1/3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ w.length ≤ 10⁴ |
| Weight Value | 1 ≤ w[i] ≤ 10⁵ |
| Calls | Up to 10⁴ pickIndex calls |
| Data Type | Integer array |
| Time Complexity | O(log n) per pick |
| Space Complexity | O(n) for prefix sum |
| Output Format | Random index |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 The Trade Desk |
| 🔵 Google | 🟡 Uber | 🟢 Criteo |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 AdRoll |

---

## Follow-up Questions

1. How does prefix sum help with weighted sampling?
2. Why use binary search after generating random number?
3. What about reservoir sampling for streaming?
4. How to handle weight updates efficiently?
