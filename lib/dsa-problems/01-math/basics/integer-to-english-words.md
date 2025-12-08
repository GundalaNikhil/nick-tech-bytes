# Integer to English Words

## Problem Description

**Real-World Scenario:**
A banking system converting check amounts (numbers) into text format for printing.

**Example Setup:** 
Text-to-speech engine reading out numbers.

**What is Integer to English Words?**
Convert a non-negative integer `num` to its English words representation.

**Why is it important?**
- String Manipulation
- Recursion / Iteration
- Handling Edge Cases (Zero, Billions, Millions)
- Real-world Application

**Your Task:** 
Return string representation.

---

## Examples

### Example 1:
**Input:** `num = 123`
**Output:** `"One Hundred Twenty Three"`

### Example 2:
**Input:** `num = 12345`
**Output:** `"Twelve Thousand Three Hundred Forty Five"`

### Example 3:
**Input:** `num = 1234567`
**Output:** `"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Value | 0 ≤ num ≤ 2^31 - 1 |
| Time Complexity | O(N) (Number of digits) |
| Space Complexity | O(1) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Square |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Stripe |
| 🔵 Facebook | 🟡 Apple | 🟢 Intuit |

---

## Follow-up Questions

1. How to group digits? (Groups of 3: Hundreds, Thousands, Millions, Billions).
2. Helper function for < 1000? (Handles "X Hundred Y").
3. Handling "Zero"? (Special case).
4. Spacing logic? (Trim extra spaces).
