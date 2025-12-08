# Combination Sum IV

## Problem Description

**Real-World Scenario:**
A change machine counts how many ways to dispense a specific amount using available coin denominations (order matters).

**Example Setup:** 
A password cracker estimates the number of possible passwords formed by a set of allowed character blocks summing to a target length.

**What is Combination Sum IV?**
Given an array of distinct integers `nums` and a target integer `target`, return the number of possible combinations that add up to `target`. Note that different sequences are counted as different combinations.

**Why is it important?**
- Unbounded Knapsack variant (Permutations)
- DP counting
- Order matters (unlike Coin Change 2)
- Recursion with memoization

**Your Task:** 
Return the number of combinations.

---

## Examples

### Example 1:
**Input:** `nums = [1,2,3], target = 4`
**Output:** `7`
**Explanation:** 
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)

### Example 2:
**Input:** `nums = [9], target = 3`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ nums.length ≤ 200 |
| Element Value | 1 ≤ nums[i] ≤ 1000 |
| Target | 1 ≤ target ≤ 1000 |
| Data Type | Distinct integers |
| Special Conditions | Answer fits in 32-bit integer |
| Time Complexity | O(target * n) |
| Space Complexity | O(target) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Snapchat |
| 🔵 Amazon | 🟡 Apple | 🟢 Pinterest |
| 🔵 Facebook | 🟡 Microsoft | 🟢 TikTok |

---

## Follow-up Questions

1. How is this different from Coin Change 2 (combinations vs permutations)?
2. Why is the recurrence `dp[i] += dp[i - num]`?
3. What if negative numbers are allowed?
4. How to handle overflow?
