# GCD using Euclidean Algorithm

## Problem Description

**Real-World Scenario:**
A farmer has a rectangular field of 1680 × 1200 meters. He wants to divide it into largest possible square plots. The side of each square is the GCD of field dimensions - 120 meters!

**Example Setup:** 
Two gears with 48 and 18 teeth need to mesh properly. The number of complete rotations before they sync depends on LCM, which needs GCD. Finding GCD efficiently is essential!

**What is GCD (Greatest Common Divisor)?**
The largest number that divides both given numbers without leaving a remainder. Euclidean algorithm finds it efficiently using the property: GCD(a, b) = GCD(b, a mod b).

**Why is it important?**
- Simplifying fractions
- Finding LCM (LCM = a×b/GCD)
- Modular arithmetic
- Extended Euclidean Algorithm

**Your Task:** 
Find the GCD of two numbers using Euclidean algorithm.

---

## Examples

### Example 1:
**Input:** `a = 48, b = 18`
**Output:** `6`
**Explanation:** 
- 48 mod 18 = 12
- 18 mod 12 = 6
- 12 mod 6 = 0 → GCD is 6

### Example 2:
**Input:** `a = 17, b = 13`
**Output:** `1`
**Explanation:** Both are prime, GCD is 1 (coprime).

### Example 3:
**Input:** `a = 100, b = 25`
**Output:** `25`
**Explanation:** 25 divides 100, so GCD is 25.

### Example 4:
**Input:** `a = 0, b = 5`
**Output:** `5`
**Explanation:** GCD(0, n) = n.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 0 ≤ a, b ≤ 10⁹ |
| Data Type | Non-negative integers |
| Special Conditions | At least one should be non-zero |
| Time Complexity | O(log(min(a, b))) |
| Space Complexity | O(1) iterative, O(log n) recursive |
| Output Format | Integer GCD |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Quant firms |
| 🔵 Google | 🟡 Bloomberg | 🟢 Jane Street |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Citadel |

---

## Follow-up Questions

1. What's the Extended Euclidean Algorithm?
2. How do you find GCD of an array of numbers?
3. What's the relationship between GCD and LCM?
4. Why is Euclidean algorithm O(log n)?
