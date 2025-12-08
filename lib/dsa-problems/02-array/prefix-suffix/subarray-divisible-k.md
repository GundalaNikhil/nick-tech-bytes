# Subarray Sum Divisible by K

## Problem Description

**Real-World Scenario:**
A restaurant schedules staff in shifts. Find combinations of consecutive shifts whose total hours are divisible by the work-week length for fair scheduling.

**Example Setup:** 
A finance system needs to find all date ranges where total transactions are divisible by batch size for processing.

**What is Subarray Sum Divisible by K?**
Given an array of integers and K, find the number of contiguous subarrays whose sum is divisible by K.

**Why is it important?**
- Prefix sum + modular arithmetic
- Counting subarrays pattern
- Financial batch processing
- Modular remainder grouping

**Your Task:** 
Return the count of subarrays divisible by K.

---

## Examples

### Example 1:
**Input:** `nums = [4, 5, 0, -2, -3, 1], k = 5`
**Output:** `7`
**Explanation:** [4,5,0,-2,-3,1], [5], [5,0], [5,0,-2,-3], [0], [0,-2,-3], [-2,-3].

### Example 2:
**Input:** `nums = [5], k = 9`
**Output:** `0`
**Explanation:** No subarray divisible by 9.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 3 × 10⁴ |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| K Value | 2 ≤ k ≤ 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(n) |
| Space Complexity | O(k) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Square |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Stripe |
| 🔵 Google | 🟡 Microsoft | 🟢 Paypal |

---

## Follow-up Questions

1. Why count remainders with same value?
2. How do you handle negative remainders?
3. How is this related to subarray sum equals K?
4. What's the prefix sum mod relationship?
