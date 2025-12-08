# Next Greater Element

## Problem Description

**Real-World Scenario:**
On a hot day, you're checking weather forecasts. For each day, you want to know "when will it finally be hotter than today?" This is finding the next greater element for each day's temperature.

**Example Setup:** 
Kiran is analyzing stock prices. For each day, he wants to know: "On which future day will the price first exceed today's price?" This helps identify when to hold vs. sell.

**What is Next Greater Element?**
For each element in an array, find the first element that is greater than it appearing later (to its right). If none exists, output -1.

**Why is it important?**
- Stock span problems
- Temperature predictions
- Monotonic stack technique
- Foundation for histogram problems

**Your Task:** 
Find the next greater element for each element in the array.

**Difficulty:** Medium
**Tags:** Stack, Monotonic, Stock Span Problems, Temperature Predictions, Monotonic Stack, Foundation For Histogram Problems, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [4, 5, 2, 25]`
**Output:** `[5, 25, 25, -1]`
**Explanation:** 
- 4 → next greater is 5
- 5 → next greater is 25
- 2 → next greater is 25
- 25 → no greater, so -1

### Example 2:
**Input:** `nums = [13, 7, 6, 12]`
**Output:** `[-1, 12, 12, -1]`
**Explanation:** 
- 13 → no greater to right
- 7 → next greater is 12
- 6 → next greater is 12
- 12 → no greater

### Example 3:
**Input:** `nums = [1, 2, 3, 4]`
**Output:** `[2, 3, 4, -1]`
**Explanation:** Strictly increasing, each element's next is its neighbor.

### Example 4:
**Input:** `nums = [4, 3, 2, 1]`
**Output:** `[-1, -1, -1, -1]`
**Explanation:** Strictly decreasing, no element has greater to its right.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| Element Range | -10⁹ ≤ nums[i] ≤ 10⁹ |
| Data Type | Integer array |
| Special Conditions | May have duplicates |
| Time Complexity | O(n) with stack |
| Space Complexity | O(n) |
| Output Format | Array of next greater elements |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Rubrik |
| 🔵 Google | 🟡 Uber | 🟢 Sprinklr |
| 🔵 Facebook | 🟡 Goldman Sachs | 🟢 Atlassian |

---

## Follow-up Questions

1. Can you solve this in O(n) using a monotonic stack?
2. What if the array is circular (Next Greater Element II)?
3. How about finding Previous Greater Element?
4. How is this used in the histogram problem?
