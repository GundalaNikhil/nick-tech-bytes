# Binary Search

## Problem Description

**Real-World Scenario:**
When looking up a word in a physical dictionary, you don't start from page 1. You open to the middle, see if your word is before or after, and repeat. That's binary search - halving the search space each time!

**Example Setup:** 
A library has 100,000 books sorted by ISBN. Instead of checking books one by one (could take 100,000 checks), binary search finds any book in at most 17 checks (log₂ 100,000 ≈ 17).

**What is Binary Search?**
Given a sorted array, find if a target exists in O(log n) time by repeatedly dividing the search interval in half.

**Why is it important?**
- Foundation for logarithmic algorithms
- Used everywhere: databases, search engines, git bisect
- Base for many advanced problems
- Teaches divide and conquer

**Your Task:** 
Search for target in a sorted array and return its index, or -1 if not present.

---

## Examples

### Example 1:
**Input:** `nums = [-1, 0, 3, 5, 9, 12], target = 9`
**Output:** `4`
**Explanation:** 9 is at index 4.

### Example 2:
**Input:** `nums = [-1, 0, 3, 5, 9, 12], target = 2`
**Output:** `-1`
**Explanation:** 2 is not in the array.

### Example 3:
**Input:** `nums = [5], target = 5`
**Output:** `0`
**Explanation:** Single element found.

### Example 4:
**Input:** `nums = [1, 2, 3], target = 0`
**Output:** `-1`
**Explanation:** Target is less than all elements.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁴ |
| Element Range | -10⁴ < nums[i], target < 10⁴ |
| Data Type | Sorted integer array |
| Special Conditions | All elements unique |
| Time Complexity | O(log n) |
| Space Complexity | O(1) iterative |
| Output Format | Index or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Visa |
| 🔵 Facebook | 🟡 Uber | 🟢 VMware |
| 🔵 Amazon | 🟡 Adobe | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Intel |

---

## Follow-up Questions

1. How do you handle integer overflow in mid = (low + high) / 2?
2. What if there are duplicates and you need the first/last occurrence?
3. What's the difference between lower_bound and upper_bound?
4. Can you implement this recursively?
