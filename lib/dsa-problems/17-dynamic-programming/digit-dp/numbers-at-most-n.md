# Numbers At Most N Given Digit Set

## Problem Description

**Real-World Scenario:**
A secure token generator counts how many valid tokens less than a certain value can be generated using a restricted set of allowed digits.

**Example Setup:** 
A page numbering system calculates how many pages can be numbered up to N using only a specific set of ink stamps.

**What is Numbers At Most N...?**
Given an array of `digits` which is sorted in non-decreasing order. You can write numbers using each `digits[i]` as many times as we want. For example, if `digits = ['1','3','5']`, we may write numbers such as '13', '551', '1351315'. Return the number of positive integers that can be generated that are less than or equal to a given integer `n`.

**Why is it important?**
- Digit DP
- Combinatorics (Math)
- Counting with constraints
- Hard interview problem

**Your Task:** 
Return the count.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Digit Dp, Combinatorics, Counting With Constraints, Hard Interview, O(log N), Interview

---

## Examples

### Example 1:
**Input:** `digits = ["1","3","5","7"], n = 100`
**Output:** `20`
**Explanation:** 
1-digit: 1,3,5,7 (4 numbers).
2-digits: 4*4 = 16 numbers (11, 13, ..., 77).
Total 20. (100 is 3 digits, but smallest 3-digit is 111 > 100).

### Example 2:
**Input:** `digits = ["1","4","9"], n = 1000000000`
**Output:** `29523`

### Example 3:
**Input:** `digits = ["7"], n = 8`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Digits | 1 ≤ len ≤ 9 |
| N Value | 1 ≤ n ≤ 10⁹ |
| Data Type | String array, Integer n |
| Time Complexity | O(log N) |
| Space Complexity | O(log N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 MathWorks |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Wolfram |
| 🔵 Facebook | 🟡 Apple | 🟢 Khan Academy |

---

## Follow-up Questions

1. Why count numbers with fewer digits first (simple power)?
2. How to handle numbers with the same number of digits?
3. What happens when `digit < n[i]`, `digit == n[i]`, `digit > n[i]`?
4. Why is this a Digit DP problem?
