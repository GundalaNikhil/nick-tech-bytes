# Fraction to Recurring Decimal

## Problem Description

**Real-World Scenario:**
A scientific calculator displays the exact decimal representation of a fraction, detecting and marking repeating sequences (e.g., 1/3 = 0.(3)).

**Example Setup:** 
A financial system converts division results to decimal strings for precise reporting, handling infinite repeating decimals.

**What is Fraction to Recurring Decimal?**
Given two integers representing the numerator and denominator of a fraction, return the fraction in string format. If the fractional part is repeating, enclose the repeating part in parentheses.

**Why is it important?**
- Math / Number Theory
- HashMap for cycle detection
- String manipulation
- Edge cases (negative, overflow)

**Your Task:** 
Return the decimal string.

**Difficulty:** Medium
**Tags:** Math, Number Theory, Math / Number Theory, Hashmap For Cycle Detection, String Manipulation, Edge Cases, O(denominator), Interview

---

## Examples

### Example 1:
**Input:** `numerator = 1, denominator = 2`
**Output:** `"0.5"`

### Example 2:
**Input:** `numerator = 2, denominator = 1`
**Output:** `"2"`

### Example 3:
**Input:** `numerator = 2, denominator = 3`
**Output:** `"0.(6)"`

### Example 4:
**Input:** `numerator = 4, denominator = 333`
**Output:** `"0.(012)"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Values | -2³¹ ≤ num, den ≤ 2³¹-1 |
| Denominator | den != 0 |
| Data Type | Integers |
| Special Conditions | Handle signs and overflow |
| Time Complexity | O(denominator) |
| Space Complexity | O(denominator) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Airbnb |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Lyft |

---

## Follow-up Questions

1. Why use a HashMap to store remainders?
2. When does a remainder repeat?
3. How to handle negative results?
4. What if numerator is 0?
