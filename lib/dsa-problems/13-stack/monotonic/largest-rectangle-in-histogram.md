# Largest Rectangle in Histogram

## Problem Description

**Real-World Scenario:**
A city skyline analysis where you want to find the largest rectangular billboard that can be placed on a series of buildings of varying heights.

**Example Setup:** 
Finding the largest contiguous block of free memory in a fragmented heap.

**What is Largest Rectangle in Histogram?**
Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.

**Why is it important?**
- Monotonic Stack
- Divide and Conquer
- Segment Tree
- Optimization (O(N))

**Your Task:** 
Return max area.

---

## Examples

### Example 1:
**Input:** `heights = [2,1,5,6,2,3]`
**Output:** `10`
**Explanation:** The largest rectangle has an area = 10 units (height 5 and 6, width 2 -> 5*2=10).

### Example 2:
**Input:** `heights = [2,4]`
**Output:** `4`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10^5 |
| Height | 0 ≤ heights[i] ≤ 10^4 |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer area |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Zillow |
| 🔵 Facebook | 🟡 Apple | 🟢 Airbnb |

---

## Follow-up Questions

1. Why Monotonic Increasing Stack? (To find the first smaller element to the left and right).
2. How to calculate width? `right_index - left_index - 1`.
3. Why push -1 and N to stack/boundaries? (To handle edge cases where all elements are larger).
