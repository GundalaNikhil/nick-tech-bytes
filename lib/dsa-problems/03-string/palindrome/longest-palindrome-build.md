# Longest Palindrome

## Problem Description

**Real-World Scenario:**
A license plate generator creates memorable plates using longest possible palindromic strings from available letters.

**Example Setup:** 
A word game challenges players to build the longest palindrome from a set of letter tiles.

**What is Longest Palindrome?**
Given a string of characters, find the length of the longest palindrome that can be built using those characters.

**Why is it important?**
- Character frequency
- Odd/even counting
- String building
- Interview warmup

**Your Task:** 
Return the length of the longest palindrome.

---

## Examples

### Example 1:
**Input:** `s = "abccccdd"`
**Output:** `7`
**Explanation:** "dccaccd" or "dccbccd" - length 7.

### Example 2:
**Input:** `s = "a"`
**Output:** `1`
**Explanation:** Just "a".

### Example 3:
**Input:** `s = "Aa"`
**Output:** `1`
**Explanation:** "A" and "a" are different (case-sensitive).

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 2000 |
| Data Type | Letters (a-z, A-Z) |
| Special Conditions | Case-sensitive |
| Time Complexity | O(n) |
| Space Complexity | O(1) - 52 letters max |
| Output Format | Maximum length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 DMV |
| 🔵 Google | 🟡 Apple | 🟢 Zynga |
| 🔵 Facebook | 🟡 Adobe | 🟢 King |

---

## Follow-up Questions

1. How many pairs of each character can we use?
2. When can we add a center character?
3. What's the formula for counting?
4. What about building the actual palindrome?
