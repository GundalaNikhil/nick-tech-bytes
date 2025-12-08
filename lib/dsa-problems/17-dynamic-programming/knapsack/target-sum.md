# Target Sum

## Problem Description

**Real-World Scenario:**
A budget planner assigns + or - to each expense category to see if total equals a target. How many different ways can categories be assigned signs to reach the budget?

**Example Setup:** 
A game designer is balancing item stats. Given stat modifiers, count ways to assign + or - to each to achieve a specific balance point.

**What is Target Sum?**
Given an array and a target, assign + or - to each integer to make them sum to the target. Return the count of different assignments.

**Why is it important?**
- Subset sum variant
- DP count problems
- 0/1 knapsack pattern
- Expression building

**Your Task:** 
Count the number of ways to assign +/- to reach target.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Knapsack, Subset Sum Variant, Dp Count Problems, 0/1 Knapsack Pattern, Expression Building, O(n × sum), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1, 1, 1, 1, 1], target = 3`
**Output:** `5`
**Explanation:** 
- -1 + 1 + 1 + 1 + 1 = 3
- +1 - 1 + 1 + 1 + 1 = 3
- +1 + 1 - 1 + 1 + 1 = 3
- +1 + 1 + 1 - 1 + 1 = 3
- +1 + 1 + 1 + 1 - 1 = 3

### Example 2:
**Input:** `nums = [1], target = 1`
**Output:** `1`
**Explanation:** Only +1 works.

### Example 3:
**Input:** `nums = [1, 0], target = 1`
**Output:** `2`
**Explanation:** +1+0 and +1-0 both work.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 20 |
| Element Value | 0 ≤ nums[i] ≤ 1000 |
| Sum | 0 ≤ sum(nums) ≤ 1000 |
| Target | -1000 ≤ target ≤ 1000 |
| Time Complexity | O(n × sum) |
| Space Complexity | O(sum) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Apple |
| 🔵 Google | 🟡 Uber | 🟢 Lyft |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Snap |

---

## Follow-up Questions

1. Why is this related to subset sum?
2. How do you transform to a subset sum problem?
3. What's the formula: find subset with sum (total + target) / 2?
4. Can you use memoization instead of tabulation?
