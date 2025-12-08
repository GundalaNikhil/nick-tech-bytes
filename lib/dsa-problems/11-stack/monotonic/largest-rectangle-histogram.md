# Largest Rectangle in Histogram

## Problem Description

**Real-World Scenario:**
An architect designs a skyline where buildings of varying heights sit side by side. Find the largest rectangular billboard that fits in the skyline without exceeding any building's height.

**Example Setup:** 
A warehouse manager stacks boxes of different heights. Find the maximum rectangular area that can be cleared for a large shipment.

**What is Largest Rectangle in Histogram?**
Given an array of heights where each element represents the height of a bar with width 1, find the area of the largest rectangle that fits in the histogram.

**Why is it important?**
- Monotonic stack mastery
- Maximal rectangle foundation
- Real architectural applications
- Interview hard problem

**Your Task:** 
Return the area of the largest rectangle.

**Difficulty:** Medium
**Tags:** Stack, Monotonic, Monotonic Stack Mastery, Maximal Rectangle Foundation, Real Architectural Applications, Interview Hard, O(n), Interview

---

## Examples

### Example 1:
**Input:** `heights = [2, 1, 5, 6, 2, 3]`
**Output:** `10`
**Explanation:** Rectangle spans indices 2-3 with height 5, area = 2×5 = 10.

### Example 2:
**Input:** `heights = [2, 4]`
**Output:** `4`
**Explanation:** Either 2×2 or 1×4, maximum is 4.

### Example 3:
**Input:** `heights = [1]`
**Output:** `1`
**Explanation:** Single bar.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Height Value | 0 ≤ heights[i] ≤ 10⁴ |
| Data Type | Integer array |
| Special Conditions | Each bar has width 1 |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | Maximum area integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 DoorDash |
| 🔵 Google | 🟡 Uber | 🟢 Rubrik |
| 🔵 Facebook | 🟡 Apple | 🟢 Cohesity |

---

## Follow-up Questions

1. How does monotonic stack help here?
2. How do you find left and right boundaries for each bar?
3. How is this used in Maximal Rectangle problem?
4. What's the divide-and-conquer approach?
