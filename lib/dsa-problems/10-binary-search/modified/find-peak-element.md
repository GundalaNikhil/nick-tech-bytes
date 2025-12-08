# Find Peak Element

## Problem Description

**Real-World Scenario:**
A fitness tracker records elevation throughout a hike. Finding a "peak" element helps identify summit points where elevation is higher than both neighbors.

**Example Setup:** 
Stock price data - find any local maximum where the price is higher than both the previous and next day's prices.

**What is Find Peak Element?**
A peak element is greater than its neighbors. Given an array, find any peak element in O(log n) time using binary search.

**Why is it important?**
- Binary search on answer concept
- Local vs global maximum
- Gradient descent intuition
- Multiple valid answers

**Your Task:** 
Return the index of any peak element.

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 3, 1]`
**Output:** `2`
**Explanation:** 3 is greater than 2 and 1 (its neighbors).

### Example 2:
**Input:** `nums = [1, 2, 1, 3, 5, 6, 4]`
**Output:** `5` (or `1`)
**Explanation:** Both 6 and 2 are peaks. Return any.

### Example 3:
**Input:** `nums = [1, 2]`
**Output:** `1`
**Explanation:** nums[-1] = nums[n] = -∞. So 2 is a peak.

### Example 4:
**Input:** `nums = [2, 1]`
**Output:** `0`
**Explanation:** 2 is a peak.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 1000 |
| Element Range | -2³¹ ≤ nums[i] ≤ 2³¹-1 |
| Data Type | Integer array |
| Special Conditions | nums[-1] = nums[n] = -∞ |
| Time Complexity | O(log n) |
| Space Complexity | O(1) |
| Output Format | Index of any peak |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Airbnb |
| 🔵 Google | 🟡 Uber | 🟢 Expedia |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Yelp |

---

## Follow-up Questions

1. Why does binary search work for this problem?
2. Why move towards the larger neighbor?
3. What guarantees at least one peak exists?
4. How does this relate to gradient descent?
