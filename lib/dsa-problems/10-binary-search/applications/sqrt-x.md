# Sqrt(x) - Square Root

## Problem Description

**Real-World Scenario:**
A distance calculator computes Euclidean distance which requires square root. Implement integer square root without built-in functions.

**Example Setup:** 
A computer graphics system calculates vector magnitudes using integer square root for performance.

**What is Sqrt(x)?**
Compute and return the square root of x rounded down to the nearest integer. Don't use built-in functions like sqrt().

**Why is it important?**
- Binary search on answer
- Newton's method
- Bit manipulation
- Babylonian method

**Your Task:** 
Return floor(sqrt(x)).

**Difficulty:** Medium
**Tags:** Binary Search, Applications, Binary Search On Answer, Newton'S, Bit Manipulation, Babylonian, O(log x), Interview

---

## Examples

### Example 1:
**Input:** `x = 4`
**Output:** `2`

### Example 2:
**Input:** `x = 8`
**Output:** `2`
**Explanation:** sqrt(8) = 2.828..., rounded down = 2.

### Example 3:
**Input:** `x = 0`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| X Value | 0 ≤ x ≤ 2³¹ - 1 |
| Data Type | Integer |
| Special Conditions | No built-in sqrt |
| Time Complexity | O(log x) |
| Space Complexity | O(1) |
| Output Format | Integer (floor) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Unity |
| 🔵 Amazon | 🟡 Apple | 🟢 Unreal |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Epic Games |

---

## Follow-up Questions

1. How does binary search work here?
2. What's Newton's method (x_new = (x + n/x) / 2)?
3. How to avoid overflow (use long)?
4. What about bit-by-bit calculation?
