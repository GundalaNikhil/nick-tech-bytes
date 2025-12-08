# Ugly Number III

## Problem Description

**Real-World Scenario:**
A signal processing filter selects frequencies that are multiples of specific base frequencies (a, b, c) to construct a harmonic series.

**Example Setup:** 
A scheduling system finds the nth time slot that is a multiple of any of three periodic tasks.

**What is Ugly Number III?**
An ugly number is a positive integer that is divisible by `a`, `b`, or `c`. Given four integers `n`, `a`, `b`, and `c`, return the `nth` ugly number.

**Why is it important?**
- Binary Search on Answer
- Number Theory (LCM, Inclusion-Exclusion)
- Optimization
- Math-heavy problem

**Your Task:** 
Return the nth ugly number.

---

## Examples

### Example 1:
**Input:** `n = 3, a = 2, b = 3, c = 5`
**Output:** `4`
**Explanation:** Ugly numbers: 2, 3, 4, 5, 6, 8, 9, 10... 3rd is 4.

### Example 2:
**Input:** `n = 4, a = 2, b = 3, c = 4`
**Output:** `6`
**Explanation:** Ugly numbers: 2, 3, 4, 6, 8... 4th is 6.

### Example 3:
**Input:** `n = 5, a = 2, b = 11, c = 13`
**Output:** `10`
**Explanation:** 2, 4, 6, 8, 10.

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 1 ≤ n ≤ 10⁹ |
| A, B, C | 1 ≤ a, b, c ≤ 10⁹ |
| Result | Fits in 64-bit integer |
| Data Type | Integers (Long for calculation) |
| Time Complexity | O(log(range)) |
| Space Complexity | O(1) |
| Output Format | Integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 ByteDance |
| 🔵 Amazon | 🟡 Microsoft | 🟢 TikTok |
| 🔵 Facebook | 🟡 Apple | 🟢 Tencent |

---

## Follow-up Questions

1. Why binary search on the answer range [1, 2*10^9]?
2. How to count numbers <= X divisible by a, b, c (Inclusion-Exclusion)?
3. Formula: `X/a + X/b + X/c - X/lcm(a,b) - X/lcm(b,c) - X/lcm(a,c) + X/lcm(a,b,c)`?
4. How to calculate LCM(a, b) efficiently?
