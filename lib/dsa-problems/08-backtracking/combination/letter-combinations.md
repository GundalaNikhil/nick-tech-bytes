# Letter Combinations of a Phone Number

## Problem Description

**Real-World Scenario:**
A vanity phone number generator finds all possible words spelled by a phone number like 1-800-FLOWERS.

**Example Setup:** 
A T9 predictive text system generates all possible word combinations from number input.

**What is Letter Combinations?**
Given a string of digits 2-9, return all possible letter combinations that the number could represent (like a phone keypad).

**Why is it important?**
- Backtracking classic
- Cartesian product
- Phone/text systems
- Recursive enumeration

**Your Task:** 
Return all possible letter combinations.

---

## Examples

### Example 1:
**Input:** `digits = "23"`
**Output:** `["ad","ae","af","bd","be","bf","cd","ce","cf"]`
**Explanation:** 2→abc, 3→def, combine all.

### Example 2:
**Input:** `digits = ""`
**Output:** `[]`
**Explanation:** Empty input.

### Example 3:
**Input:** `digits = "2"`
**Output:** `["a","b","c"]`
**Explanation:** Single digit.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Digits Length | 0 ≤ digits.length ≤ 4 |
| Digit Value | 2-9 (no 0 or 1) |
| Data Type | String of digits |
| Special Conditions | Order doesn't matter |
| Time Complexity | O(4^n × n) |
| Space Complexity | O(n) for recursion |
| Output Format | List of strings |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Twilio |
| 🔵 Facebook | 🟡 Apple | 🟢 RingCentral |
| 🔵 Google | 🟡 Microsoft | 🟢 Vonage |

---

## Follow-up Questions

1. How do you map digits to letters?
2. What's the iterative approach?
3. Why is this a Cartesian product?
4. What about filtering to only valid words?
