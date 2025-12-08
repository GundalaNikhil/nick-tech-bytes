# Find K Closest Elements

## Problem Description

**Real-World Scenario:**
A restaurant finder shows the k closest restaurants to a target price point.

**Example Setup:** 
A temperature sensor finds the k readings closest to a target temperature from historical data.

**What is Find K Closest Elements?**
Given a sorted array and target x, find the k closest elements to x. Return them in sorted order.

**Why is it important?**
- Binary search + two-pointer
- Finding ranges
- Recommendation systems
- Sliding window on sorted data

**Your Task:** 
Return the k closest elements in sorted order.

**Difficulty:** Medium
**Tags:** Binary Search, Applications, Binary Search + Two-Pointer, Finding Ranges, Recommendation Systems, Sliding Window On Sorted Data, O(log n + k), Interview

---

## Examples

### Example 1:
**Input:** `arr = [1,2,3,4,5], k = 4, x = 3`
**Output:** `[1,2,3,4]`
**Explanation:** 4 elements closest to 3.

### Example 2:
**Input:** `arr = [1,2,3,4,5], k = 4, x = -1`
**Output:** `[1,2,3,4]`
**Explanation:** Closest to -1 are the smallest.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ k ≤ n ≤ 10⁴ |
| Element Range | -10⁴ ≤ arr[i] ≤ 10⁴ |
| Target | -10⁴ ≤ x ≤ 10⁴ |
| Data Type | Sorted integer array |
| Time Complexity | O(log n + k) or O(log(n-k)) |
| Space Complexity | O(1) |
| Output Format | Sorted list of k elements |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Yelp |
| 🔵 Google | 🟡 Uber | 🟢 Zomato |
| 🔵 Amazon | 🟡 Apple | 🟢 OpenTable |

---

## Follow-up Questions

1. How do you find the left boundary of the window?
2. Why binary search on window start position?
3. What's the two-pointer expansion approach?
4. How to handle ties (prefer smaller)?
