# Factorial Trailing Zeroes

## Problem Description

**Real-World Scenario:**
Calculating the precision or scale of a very large number (factorial) without computing the full number (which would overflow).

**Example Setup:** 
Determining how many times a number is divisible by 10.

**What is Factorial Trailing Zeroes?**
Given an integer `n`, return the number of trailing zeroes in `n!`.
Note that `n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1`.

**Why is it important?**
- Math (Number Theory)
- Prime Factorization (Count factors of 5)
- Logarithmic Time Complexity

**Your Task:** 
Return count of zeroes.

---

## Examples

### Example 1:
**Input:** `n = 3`
**Output:** `0`
**Explanation:** 3! = 6, no trailing zero.

### Example 2:
**Input:** `n = 5`
**Output:** `1`
**Explanation:** 5! = 120, one trailing zero.

### Example 3:
**Input:** `n = 0`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| n | 0 ≤ n ≤ 10^4 |
| Time Complexity | O(log N) |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Adobe |
| 🔵 Amazon | 🟡 Microsoft | 🟢 SalesForce |
| 🔵 Facebook | 🟡 Apple | 🟢 Oracle |

---

## Follow-up Questions

1. Why count 5s and not 2s? (There are always more factors of 2 than 5. Pairs of 2 and 5 make 10).
2. Why `n/5 + n/25 + n/125...`? (Multiples of 25 have two factors of 5, etc.).
3. Time complexity? (Log base 5 of N).
