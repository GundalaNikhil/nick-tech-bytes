# Subarray Sum Equals K

## Problem Description

**Real-World Scenario:**
A fitness app tracks daily step counts. Find how many contiguous day ranges have exactly the target total steps (e.g., 10,000 steps over multiple days).

**Example Setup:** 
An accountant needs to find how many consecutive transaction sequences sum to exactly a budget amount for audit purposes.

**What is Subarray Sum Equals K?**
Count the number of contiguous subarrays whose sum equals K. Use prefix sum + hash map for O(n) solution.

**Why is it important?**
- Prefix sum technique
- Hash map optimization
- Handles negative numbers
- Foundation for similar problems

**Your Task:** 
Return the count of subarrays with sum K.

---

## Examples

### Example 1:
**Input:** `nums = [1, 1, 1], k = 2`
**Output:** `2`
**Explanation:** Subarrays [1,1] at indices 0-1 and 1-2.

### Example 2:
**Input:** `nums = [1, 2, 3], k = 3`
**Output:** `2`
**Explanation:** [1,2] and [3] both sum to 3.

### Example 3:
**Input:** `nums = [1, -1, 0], k = 0`
**Output:** `3`
**Explanation:** [1,-1], [-1,0,1], and [0].

### Example 4:
**Input:** `nums = [3, 4, 7, 2, -3, 1, 4, 2], k = 7`
**Output:** `4`
**Explanation:** Multiple subarrays sum to 7.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 2 × 10⁴ |
| Element Range | -1000 ≤ nums[i] ≤ 1000 |
| K Range | -10⁷ ≤ k ≤ 10⁷ |
| Data Type | Integer array |
| Time Complexity | O(n) |
| Space Complexity | O(n) for hash map |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Twilio |
| 🔵 Google | 🟡 Uber | 🟢 Snap |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Yext |

---

## Follow-up Questions

1. Why does prefix sum + hash map work?
2. Why can't you use sliding window (negative numbers)?
3. How would you find the longest subarray with sum K?
4. What if you need exactly K distinct elements instead?
