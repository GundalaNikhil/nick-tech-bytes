# Fibonacci Sequence

## Problem Description

**Real-World Scenario:**
The Fibonacci sequence appears in nature - from the spiral of a sunflower to rabbit population growth. It's also the gateway to understanding dynamic programming!

**Example Setup:** 
A pair of rabbits produces a new pair every month. Starting with one pair, how many pairs will exist after N months? This is the classic Fibonacci problem that Leonardo of Pisa solved in 1202!

**What is Fibonacci?**
Each number is the sum of the two preceding ones: F(n) = F(n-1) + F(n-2), with F(0) = 0 and F(1) = 1.

**Why is it important?**
- Foundation of recursion
- Introduces memoization
- Shows time complexity explosion
- Gateway to DP

**Your Task:** 
Calculate the Nth Fibonacci number.

**Difficulty:** Medium
**Tags:** Recursion, Basic, Foundation Of Recursion, Introduces Memoization, Shows Time Complexity Explosion, Gateway To Dp, O(n), Interview

---

## Examples

### Example 1:
**Input:** `n = 2`
**Output:** `1`
**Explanation:** F(2) = F(1) + F(0) = 1 + 0 = 1

### Example 2:
**Input:** `n = 3`
**Output:** `2`
**Explanation:** F(3) = F(2) + F(1) = 1 + 1 = 2

### Example 3:
**Input:** `n = 10`
**Output:** `55`
**Explanation:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

### Example 4:
**Input:** `n = 0`
**Output:** `0`
**Explanation:** Base case.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 0 ≤ n ≤ 30 |
| Data Type | Integer |
| Special Conditions | F(0) = 0, F(1) = 1 |
| Time Complexity | O(n) with memoization, O(1) with formula |
| Space Complexity | O(1) optimized |
| Output Format | Nth Fibonacci number |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Apple | 🟢 Qualcomm |
| 🔵 Amazon | 🟡 Adobe | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Intel |

---

## Follow-up Questions

1. Why is naive recursion O(2^n)?
2. How does memoization reduce to O(n)?
3. Can you use O(1) space with two variables?
4. What's the matrix exponentiation method for O(log n)?
