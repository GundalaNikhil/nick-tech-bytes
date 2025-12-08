# Largest Divisible Subset

## Problem Description

**Real-World Scenario:**
A compatibility checker finds the largest set of software versions where every pair is compatible (one is a prerequisite/divisor of the other).

**Example Setup:** 
A number theory tool finds the largest subset of integers where every pair satisfies the divisibility property.

**What is Largest Divisible Subset?**
Given a set of distinct positive integers `nums`, return the largest subset `answer` such that every pair `(answer[i], answer[j])` of elements in this subset satisfies:
- `answer[i] % answer[j] == 0`, or
- `answer[j] % answer[i] == 0`
If there are multiple solutions, return any of them.

**Why is it important?**
- DP (LIS variant)
- Sorting
- Path reconstruction
- Number Theory

**Your Task:** 
Return the subset list.

---

## Examples

### Example 1:
**Input:** `nums = [1,2,3]`
**Output:** `[1,2]`
**Explanation:** [1,3] is also valid. [1,2,3] invalid (2%3!=0, 3%2!=0).

### Example 2:
**Input:** `nums = [1,2,4,8]`
**Output:** `[1,2,4,8]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 1000 |
| Element Value | 1 ≤ nums[i] ≤ 2 × 10⁹ |
| Data Type | Integer array |
| Time Complexity | O(N^2) |
| Space Complexity | O(N) |
| Output Format | List of integers |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 MathWorks |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Wolfram |
| 🔵 Facebook | 🟡 Apple | 🟢 Khan Academy |

---

## Follow-up Questions

1. Why sort the array first?
2. If `a % b == 0` and `b % c == 0`, does `a % c == 0` (transitivity)?
3. Why is this similar to Longest Increasing Subsequence?
4. How to reconstruct the path using `prev` array?
