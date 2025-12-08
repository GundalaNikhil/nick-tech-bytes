# String to Integer (atoi)

## Problem Description

**Real-World Scenario:**
User input forms receive strings that need conversion to numbers. "   -42abc" should extract -42, handling whitespace, signs, and stopping at non-digits.

**Example Setup:** 
A calculator app parses user input. It must handle messy input like " +123" or "-456xyz" and extract the valid integer part.

**What is String to Integer?**
Implement atoi to convert a string to a 32-bit signed integer. Handle:
1. Leading whitespace
2. Optional +/- sign
3. Digits until non-digit
4. Integer overflow

**Why is it important?**
- Input parsing
- Edge case handling
- Overflow detection
- Real-world input validation

**Your Task:** 
Convert string to 32-bit signed integer.

**Difficulty:** Medium
**Tags:** String, Basic Operations, Input Parsing, Edge Case Handling, Overflow Detection, Real-World Input Validation, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "42"`
**Output:** `42`
**Explanation:** Simple positive number.

### Example 2:
**Input:** `s = "   -42"`
**Output:** `-42`
**Explanation:** Skip whitespace, handle negative sign.

### Example 3:
**Input:** `s = "4193 with words"`
**Output:** `4193`
**Explanation:** Stop at non-digit.

### Example 4:
**Input:** `s = "words and 987"`
**Output:** `0`
**Explanation:** First non-whitespace is not sign or digit.

### Example 5:
**Input:** `s = "-91283472332"`
**Output:** `-2147483648` (INT_MIN)
**Explanation:** Clamp to 32-bit range.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 0 ≤ n ≤ 200 |
| Data Type | ASCII characters |
| Output Range | [-2³¹, 2³¹-1] |
| Special Conditions | Clamp on overflow |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | 32-bit signed integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Paypal |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Cisco |
| 🔵 Apple | 🟡 Uber | 🟢 eBay |

---

## Follow-up Questions

1. How do you detect overflow before it happens?
2. Why check overflow before multiplying?
3. What if the string is empty or only whitespace?
4. How would you handle different bases (hex, octal)?
