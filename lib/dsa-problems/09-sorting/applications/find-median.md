# Find Median in Array

## Problem Description

**Real-World Scenario:**
A teacher needs to find the median test score to determine the class average performance. For odd count, it's the middle; for even, it's the average of two middle values.

**Example Setup:** 
A real estate website shows median home prices in an area. Unlike average (skewed by mansions), median gives a true "typical" price.

**What is Find Median?**
Given an array, find the median value. For sorted array of n elements:
- If n is odd: middle element
- If n is even: average of two middle elements

**Why is it important?**
- Statistical analysis
- Foundation for streaming median
- Quickselect algorithm
- More robust than mean

**Your Task:** 
Find the median of the given array.

**Difficulty:** Medium
**Tags:** Sorting, Applications, Statistical Analysis, Foundation For Streaming Median, Quickselect, More Robust Than Mean, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [3, 1, 2, 5, 4]`
**Output:** `3`
**Explanation:** Sorted: [1, 2, 3, 4, 5]. Middle = 3.

### Example 2:
**Input:** `nums = [1, 2, 3, 4]`
**Output:** `2.5`
**Explanation:** Sorted: [1, 2, 3, 4]. Average of 2 and 3 = 2.5.

### Example 3:
**Input:** `nums = [7]`
**Output:** `7`
**Explanation:** Single element is the median.

### Example 4:
**Input:** `nums = [1, 3]`
**Output:** `2`
**Explanation:** Average of 1 and 3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| Element Range | -10⁶ ≤ nums[i] ≤ 10⁶ |
| Data Type | Integer array |
| Special Conditions | Handle even/odd cases |
| Time Complexity | O(n log n) with sort, O(n) with quickselect |
| Space Complexity | O(1) with in-place sort |
| Output Format | Double (for even case) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Redfin |
| 🔵 Facebook | 🟡 Uber | 🟢 Trulia |

---

## Follow-up Questions

1. Can you find median in O(n) using quickselect?
2. How about median of two sorted arrays?
3. What if data streams in (median from stream)?
4. Why is median more robust than mean?
