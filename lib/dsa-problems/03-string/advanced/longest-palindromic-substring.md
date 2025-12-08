# Longest Palindromic Substring

## Problem Description

**Real-World Scenario:**
A crossword puzzle app highlights palindromes - words/phrases that read the same forwards and backwards. Given a user's input, find the longest palindromic substring to award bonus points.

**Example Setup:** 
A DNA researcher is looking for "genetic palindromes" - sequences that are identical when read in reverse. Finding the longest palindromic region helps identify important genetic markers.

**What is Longest Palindromic Substring?**
Given a string, find the longest contiguous substring that is a palindrome (reads the same forwards and backwards).

**Why is it important?**
- Text analysis and processing
- Bioinformatics (DNA patterns)
- Word games
- Teaches expand-around-center technique

**Your Task:** 
Return the longest palindromic substring in the given string.

---

## Examples

### Example 1:
**Input:** `s = "babad"`
**Output:** `"bab"` or `"aba"`
**Explanation:** Both are valid palindromes of length 3.

### Example 2:
**Input:** `s = "cbbd"`
**Output:** `"bb"`
**Explanation:** "bb" is the longest palindrome.

### Example 3:
**Input:** `s = "a"`
**Output:** `"a"`
**Explanation:** Single character is a palindrome.

### Example 4:
**Input:** `s = "racecar"`
**Output:** `"racecar"`
**Explanation:** The entire string is a palindrome!

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 1000 |
| Data Type | Lowercase and uppercase English letters |
| Special Conditions | Return any one if multiple answers |
| Time Complexity | O(n²) expand around center, O(n) Manacher's |
| Space Complexity | O(1) for expansion, O(n) for Manacher's |
| Output Format | Substring string |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Adobe | 🟢 Illumina |
| 🔵 Google | 🟡 Bloomberg | 🟢 23andMe |
| 🔵 Microsoft | 🟡 Uber | 🟢 Zynga |
| 🔵 Apple | 🟡 ByteDance | 🟢 Wayfair |

---

## Follow-up Questions

1. What's the expand-around-center approach?
2. What's the difference between this and longest palindromic subsequence?
3. How does Manacher's algorithm achieve O(n)?
4. How would you handle case sensitivity?
