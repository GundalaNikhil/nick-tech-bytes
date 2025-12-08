# Divide Two Integers

## Problem Description

**Real-World Scenario:**
An embedded system without division hardware implements quotient calculation using only addition, subtraction, and bit shifts.

**Example Setup:** 
A calculator app computes division without using the / operator for educational purposes.

**What is Divide Two Integers?**
Given two integers dividend and divisor, divide them without using multiplication, division, or mod operators. Return the quotient (truncated toward zero).

**Why is it important?**
- Binary search on answer
- Bit manipulation
- Exponential search
- Hardware implementation

**Your Task:** 
Return the quotient.

**Difficulty:** Medium
**Tags:** Math, Arithmetic, Binary Search On Answer, Bit Manipulation, Exponential Search, Hardware Implementation, O(log²(dividend), Interview

---

## Examples

### Example 1:
**Input:** `dividend = 10, divisor = 3`
**Output:** `3`
**Explanation:** 10/3 = 3.333... truncates to 3.

### Example 2:
**Input:** `dividend = 7, divisor = -3`
**Output:** `-2`
**Explanation:** 7/-3 = -2.333... truncates to -2.

### Example 3:
**Input:** `dividend = -2147483648, divisor = -1`
**Output:** `2147483647`
**Explanation:** Overflow case, return MAX_INT.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Dividend | -2³¹ ≤ dividend ≤ 2³¹-1 |
| Divisor | -2³¹ ≤ divisor ≤ 2³¹-1, ≠ 0 |
| Data Type | 32-bit integers |
| Special Conditions | No *, /, % operators |
| Time Complexity | O(log²(dividend)) |
| Space Complexity | O(1) |
| Output Format | Integer quotient |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 ARM |
| 🔵 Amazon | 🟡 Apple | 🟢 Intel |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Qualcomm |

---

## Follow-up Questions

1. How does bit-shifting approach work (subtract divisor×2^k)?
2. How to handle overflow (MIN_INT / -1)?
3. How to handle signs?
4. What about using long vs staying in int?
