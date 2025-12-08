# Kth Largest Element in Array

## Problem Description

**Real-World Scenario:**
A job portal ranks candidates by score. HR wants the 5th best candidate (not the top, already interviewed). Finding Kth largest efficiently is key for pagination.

**Example Setup:** 
A leaderboard shows top 100 players, but you want to find exactly who's in 50th place. You need the Kth largest score.

**What is Kth Largest Element?**
Find the Kth largest element in an unsorted array. This can be done with sorting O(n log n) or quickselect O(n) average.

**Why is it important?**
- Order statistics
- Top-K problems foundation
- Quickselect algorithm
- Heap-based solutions

**Your Task:** 
Return the Kth largest element.

---

## Examples

### Example 1:
**Input:** `nums = [3,2,1,5,6,4], k = 2`
**Output:** `5`
**Explanation:** Sorted: [6,5,4,3,2,1]. 2nd largest = 5.

### Example 2:
**Input:** `nums = [3,2,3,1,2,4,5,5,6], k = 4`
**Output:** `4`
**Explanation:** Sorted desc: [6,5,5,4,3,3,2,2,1]. 4th = 4.

### Example 3:
**Input:** `nums = [1], k = 1`
**Output:** `1`
**Explanation:** Only element is 1st largest.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| K Value | 1 ≤ k ≤ n |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(n) average with quickselect |
| Space Complexity | O(1) for in-place quickselect |
| Output Format | Integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Splunk |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Yelp |
| 🔵 Google | 🟡 Uber | 🟢 Expedia |

---

## Follow-up Questions

1. How does quickselect achieve O(n)?
2. Why use min-heap of size K?
3. What's the worst case for quickselect?
4. How would you find K largest elements (not just Kth)?
