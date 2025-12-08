# Pow(x, n) - Power Function

## Problem Description

**Real-World Scenario:**
A graphics engine calculates exponential transformations for scaling animations. Compute x^n efficiently.

**Example Setup:** 
A compound interest calculator computes (1 + rate)^years for investment growth.

**What is Pow(x, n)?**
Implement pow(x, n) which calculates x raised to the power n. Must handle negative exponents and use binary exponentiation for O(log n).

**Why is it important?**
- Binary exponentiation (fast power)
- Divide and conquer
- Handling edge cases (negative n, x=0)
- Fundamental algorithm

**Your Task:** 
Return x^n.

**Difficulty:** Medium
**Tags:** Math, Exponentiation, Binary Exponentiation, Divide And Conquer, Handling Edge Cases, Fundamental, O(log n), Interview

---

## Examples

### Example 1:
**Input:** `x = 2.0, n = 10`
**Output:** `1024.0`

### Example 2:
**Input:** `x = 2.1, n = 3`
**Output:** `9.261`

### Example 3:
**Input:** `x = 2.0, n = -2`
**Output:** `0.25`
**Explanation:** 2^(-2) = 1/(2^2) = 1/4 = 0.25.

---

## Constraints

| Constraint | Value |
|------------|-------|
| X Value | -100.0 < x < 100.0 |
| N Value | -2³¹ ≤ n ≤ 2³¹-1 |
| Data Type | Double |
| Special Conditions | Handle negative n |
| Time Complexity | O(log n) |
| Space Complexity | O(log n) for recursion |
| Output Format | Double |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Unity |
| 🔵 Amazon | 🟡 Apple | 🟢 Unreal |
| 🔵 Google | 🟡 Microsoft | 🟢 Adobe |

---

## Follow-up Questions

1. How does binary exponentiation work (square and multiply)?
2. How do you handle negative n?
3. What about overflow for large n?
4. Can you do it iteratively?
