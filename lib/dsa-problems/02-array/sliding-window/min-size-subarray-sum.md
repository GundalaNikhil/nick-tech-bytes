# Minimum Size Subarray Sum

## Problem Description

**Real-World Scenario:**
A delivery planner finds the minimum consecutive days to achieve a shipping quota. Given daily shipments, find shortest subarray with sum ≥ target.

**Example Setup:** 
A sales manager finds the minimum consecutive months to hit annual target for bonus eligibility.

**What is Minimum Size Subarray Sum?**
Given an array of positive integers and target sum, find the minimal length of a contiguous subarray whose sum is ≥ target. Return 0 if none exists.

**Why is it important?**
- Sliding window classic
- Two-pointer technique
- Sum optimization
- Subarray problems

**Your Task:** 
Return the minimum subarray length.

---

## Examples

### Example 1:
**Input:** `target = 7, nums = [2,3,1,2,4,3]`
**Output:** `2`
**Explanation:** [4,3] has sum 7 with length 2.

### Example 2:
**Input:** `target = 4, nums = [1,4,4]`
**Output:** `1`
**Explanation:** [4] alone meets target.

### Example 3:
**Input:** `target = 11, nums = [1,1,1,1,1,1,1,1]`
**Output:** `0`
**Explanation:** Sum is only 8, can't reach 11.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Target | 1 ≤ target ≤ 10⁹ |
| Element Value | 1 ≤ nums[i] ≤ 10⁴ |
| Data Type | Positive integers |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Minimum length or 0 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Salesforce |
| 🔵 Facebook | 🟡 Goldman Sachs | 🟢 HubSpot |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Zendesk |

---

## Follow-up Questions

1. How does the two-pointer approach work?
2. Why does window only shrink when sum ≥ target?
3. What if array had negative numbers (different approach)?
4. What about O(n log n) solution with prefix sum + binary search?
