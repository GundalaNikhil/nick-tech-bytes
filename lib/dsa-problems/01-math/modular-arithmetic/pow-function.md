# Pow(x, n) - Implement Power Function

## Problem Description

**Real-World Scenario:**
Scientific calculators compute x^n for any real x and integer n. For n = 10^9, naive multiplication is impossibly slow. Use fast exponentiation!

**Example Setup:** 
Financial software calculates compound interest using (1+r)^n where n can be very large. Efficient power function is essential for performance.

**What is Pow(x, n)?**
Compute x raised to the power n (x^n). Handle negative exponents and optimize for large n using binary exponentiation.

**Why is it important?**
- Binary exponentiation
- Negative power handling
- Divide and conquer
- Numerical computing

**Your Task:** 
Compute x^n efficiently.

**Difficulty:** Medium
**Tags:** Math, Modular Arithmetic, Binary Exponentiation, Negative Power Handling, Divide And Conquer, Numerical Computing, O(log n), Interview

---

## Examples

### Example 1:
**Input:** `x = 2.0, n = 10`
**Output:** `1024.0`
**Explanation:** 2^10 = 1024.

### Example 2:
**Input:** `x = 2.1, n = 3`
**Output:** `9.261`
**Explanation:** 2.1^3 ≈ 9.261.

### Example 3:
**Input:** `x = 2.0, n = -2`
**Output:** `0.25`
**Explanation:** 2^(-2) = 1/4 = 0.25.

### Example 4:
**Input:** `x = 1.0, n = 1000000000`
**Output:** `1.0`
**Explanation:** 1 to any power is 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| X Range | -100.0 < x < 100.0 |
| N Range | -2³¹ ≤ n ≤ 2³¹-1 |
| Data Type | Double, Integer |
| Special Conditions | Handle n = INT_MIN |
| Time Complexity | O(log n) |
| Space Complexity | O(1) iterative |
| Output Format | Double result |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Two Sigma |
| 🔵 LinkedIn | 🟡 Uber | 🟢 Jane Street |

---

## Follow-up Questions

1. How does binary exponentiation work?
2. Why handle n = -2³¹ specially?
3. What's the recurrence: x^n = (x^(n/2))^2?
4. How do you handle x = 0 and n < 0?
