# Median of Two Sorted Arrays

## Problem Description

**Real-World Scenario:**
Merging two sorted databases of employee salaries and finding the median salary without fully merging them (for efficiency).

**Example Setup:** 
Finding the median latency from two different server logs that are already sorted by timestamp.

**What is Median of Two Sorted Arrays?**
Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.
The overall run time complexity should be `O(log (m+n))`.

**Why is it important?**
- Binary Search (on Answer / Partition)
- Divide and Conquer
- K-th Smallest Element in Two Sorted Arrays

**Your Task:** 
Return double median.

**Difficulty:** Medium
**Tags:** Array, Binary Search, Divide And Conquer, K-Th Smallest Element In Two Sorted Arrays, O(log (M+N), Interview

---

## Examples

### Example 1:
**Input:** `nums1 = [1,3], nums2 = [2]`
**Output:** `2.00000`
**Explanation:** merged array = [1,2,3] and median is 2.

### Example 2:
**Input:** `nums1 = [1,2], nums2 = [3,4]`
**Output:** `2.50000`
**Explanation:** merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Lengths | 0 ≤ m, n ≤ 1000 |
| Values | -10^6 ≤ nums[i] ≤ 10^6 |
| Time Complexity | O(log (M+N)) |
| Space Complexity | O(1) |
| Output Format | Double |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Goldman Sachs |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Adobe |
| 🔵 Facebook | 🟡 Apple | 🟢 Dropbox |

---

## Follow-up Questions

1. Why not merge and find median? (O(M+N) is too slow).
2. How to partition two arrays such that left half has same size as right half?
3. Binary Search on the smaller array? (Cut `nums1` at `i`, `nums2` at `j` such that `i+j = (m+n+1)/2`).
4. Handling edge cases (empty array, cut at 0 or max)?
