# Ugly Number II

## Problem Description

**Real-World Scenario:**
A video encoding system uses only specific compression ratios (2x, 3x, 5x). Find the nth number achievable using only these multipliers starting from 1.

**Example Setup:** 
A music tuning app generates frequencies based on harmonic ratios (2:3:5 relationships). Find the nth frequency in the series.

**What is Ugly Number II?**
An ugly number is a positive integer whose only prime factors are 2, 3, and 5. Find the nth ugly number starting from 1.

**Why is it important?**
- Multi-pointer DP
- Number generation
- Hamming numbers
- Merge K sorted lists variant

**Your Task:** 
Return the nth ugly number.

---

## Examples

### Example 1:
**Input:** `n = 10`
**Output:** `12`
**Explanation:** [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] - 12 is the 10th.

### Example 2:
**Input:** `n = 1`
**Output:** `1`
**Explanation:** 1 is considered ugly.

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 1 ≤ n ≤ 1690 |
| Data Type | Integer |
| Special Conditions | 1 is ugly by convention |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | nth ugly number |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Uber | 🟢 Ableton |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Native Instruments |

---

## Follow-up Questions

1. How do three pointers (i2, i3, i5) work?
2. Why avoid duplicates (case 6 = 2×3 = 3×2)?
3. What about general k factors (Super Ugly Number)?
4. Can you use min-heap approach?
