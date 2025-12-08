# Product of Array Except Self

## Problem Description

**Real-World Scenario:**
In a company, each employee's bonus is calculated as the product of all other employees' performance scores (not their own). Given everyone's scores, calculate each person's bonus multiplier without using division.

**Example Setup:** 
A startup has 4 team members with productivity scores [2, 3, 4, 5]. Each person's bonus is based on the product of everyone else's scores. Calculate each person's bonus multiplier efficiently.

**What is Product of Array Except Self?**
Given an array, return a new array where each element is the product of all elements except itself. The constraint: you can't use division!

**Why is it important?**
- Teaches prefix/suffix product technique
- Tests handling of edge cases (zeros)
- Division-free solution is clever
- Common in financial calculations

**Your Task:** 
Return an array where answer[i] equals the product of all elements except nums[i].

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 3, 4]`
**Output:** `[24, 12, 8, 6]`
**Explanation:** 
- answer[0] = 2 × 3 × 4 = 24
- answer[1] = 1 × 3 × 4 = 12
- answer[2] = 1 × 2 × 4 = 8
- answer[3] = 1 × 2 × 3 = 6

### Example 2:
**Input:** `nums = [-1, 1, 0, -3, 3]`
**Output:** `[0, 0, 9, 0, 0]`
**Explanation:** Zero in array makes most products 0 except at zero's position.

### Example 3:
**Input:** `nums = [2, 3]`
**Output:** `[3, 2]`
**Explanation:** Each is the other's value.

### Example 4:
**Input:** `nums = [0, 0]`
**Output:** `[0, 0]`
**Explanation:** Two zeros make all products zero.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 2 ≤ n ≤ 10⁵ |
| Element Range | -30 ≤ nums[i] ≤ 30 |
| Data Type | Integer array |
| Special Conditions | Don't use division, O(n) time |
| Time Complexity | O(n) |
| Space Complexity | O(1) extra (output doesn't count) |
| Output Format | Array of products |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Asana |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Lyft |
| 🔵 Facebook | 🟡 Uber | 🟢 Palantir |
| 🔵 Apple | 🟡 Bloomberg | 🟢 Tableau |

---

## Follow-up Questions

1. Why can't you use division? What about zeros?
2. How do prefix and suffix products help?
3. Can you solve with O(1) extra space?
4. What if there are multiple zeros in the array?
