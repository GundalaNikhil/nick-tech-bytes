# Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

## Problem Description

**Real-World Scenario:**
A sensor data filter identifies the longest continuous stream of readings where the fluctuation (max - min) does not exceed a safety tolerance.

**Example Setup:** 
A stock market stabilizer finds the longest period where the price volatility (high - low) stays within a specific range.

**What is Longest Continuous Subarray...?**
Given an array of integers `nums` and an integer `limit`, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to `limit`.

**Why is it important?**
- Sliding Window
- Monotonic Deque (Min and Max)
- TreeMap / Multiset
- Optimization

**Your Task:** 
Return max length.

---

## Examples

### Example 1:
**Input:** `nums = [8,2,4,7], limit = 4`
**Output:** `2`
**Explanation:** [2,4] (diff 2), [4,7] (diff 3). [8,2] diff 6 > 4. [2,4,7] diff 5 > 4.

### Example 2:
**Input:** `nums = [10,1,2,4,7,2], limit = 5`
**Output:** `4`
**Explanation:** [2,4,7,2] max 7, min 2, diff 5.

### Example 3:
**Input:** `nums = [4,2,2,2,4,4,2,2], limit = 0`
**Output:** `3`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Value | 1 ≤ nums[i] ≤ 10⁹ |
| Limit | 0 ≤ limit ≤ 10⁹ |
| Data Type | Integer array |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 DoorDash |

---

## Follow-up Questions

1. Why use two Deques (one for min, one for max)?
2. How to maintain the max/min in the current window in O(1)?
3. When do you shrink the window (`max - min > limit`)?
4. Can you use a TreeMap (O(N log N))?
