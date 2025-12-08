# Letter Combinations of Phone Number

## Problem Description

**Real-World Scenario:**
Old phone keypads (T9) mapped letters to numbers (2=ABC, 3=DEF, etc.). Given a digit sequence, generate all possible word combinations - exactly what predictive text needs!

**Example Setup:** 
A new messaging app supports T9 input for users who prefer it. Given digits pressed, show all possible letter combinations for word suggestions.

**What is Letter Combinations of Phone Number?**
Given a string of digits 2-9, return all possible letter combinations that the number could represent (like on a phone keypad).

**Why is it important?**
- Backtracking/enumeration
- Cartesian product of sets
- Old phone predictive text
- Pattern generation

**Your Task:** 
Return all letter combinations for the input digits.

**Difficulty:** Medium
**Tags:** Backtracking, String, Backtracking/Enumeration, Cartesian Product Of Sets, Old Phone Predictive Text, Pattern Generation, O(4^n × n), Interview

---

## Examples

### Example 1:
**Input:** `digits = "23"`
**Output:** `["ad","ae","af","bd","be","bf","cd","ce","cf"]`
**Explanation:** 2→ABC, 3→DEF. All combinations.

### Example 2:
**Input:** `digits = ""`
**Output:** `[]`
**Explanation:** No digits, no combinations.

### Example 3:
**Input:** `digits = "2"`
**Output:** `["a", "b", "c"]`
**Explanation:** Just digit 2 = a, b, c.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Length | 0 ≤ digits.length ≤ 4 |
| Digit Range | '2' to '9' |
| Data Type | String of digits |
| Special Conditions | No 0 or 1 |
| Time Complexity | O(4^n × n) |
| Space Complexity | O(n) for recursion |
| Output Format | List of strings |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Adobe | 🟢 Lyft |
| 🔵 Google | 🟡 Microsoft | 🟢 Snap |

---

## Follow-up Questions

1. Why is this similar to Cartesian product?
2. Can you solve iteratively without recursion?
3. How would you find combinations that form valid words?
4. What's the relationship to the subsets problem?
