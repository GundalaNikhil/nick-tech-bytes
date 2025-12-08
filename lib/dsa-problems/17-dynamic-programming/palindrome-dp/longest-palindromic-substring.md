# Longest Palindromic Substring

## Problem Description

**Real-World Scenario:**
A DNA researcher is looking for palindromic sequences in genetic data - sections that read the same forward and backward. These are often biologically significant markers.

**Example Setup:** 
A wordplay app challenges users to find the longest palindrome hidden in a phrase. Given any text, identify the longest substring that forms a palindrome.

**What is Longest Palindromic Substring?**
Find the longest contiguous substring that reads the same forwards and backwards. Unlike subsequence, characters must be adjacent.

**Why is it important?**
- String pattern matching
- Expand around center technique
- Manacher's algorithm (O(n))
- Bioinformatics applications

**Your Task:** 
Return the longest palindromic substring.

---

## Examples

### Example 1:
**Input:** `s = "babad"`
**Output:** `"bab"` or `"aba"`
**Explanation:** Both are palindromes of length 3.

### Example 2:
**Input:** `s = "cbbd"`
**Output:** `"bb"`
**Explanation:** "bb" is longer than any single character.

### Example 3:
**Input:** `s = "a"`
**Output:** `"a"`
**Explanation:** Single character is a palindrome.

### Example 4:
**Input:** `s = "racecar"`
**Output:** `"racecar"`
**Explanation:** Entire string is a palindrome!

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 1000 |
| Data Type | Letters (upper and lowercase) |
| Special Conditions | Return any one if multiple |
| Time Complexity | O(n²) expand, O(n) Manacher |
| Space Complexity | O(1) for expansion |
| Output Format | Substring |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Microsoft | 🟡 Uber | 🟢 Quora |
| 🔵 Google | 🟡 Adobe | 🟢 Wayfair |

---

## Follow-up Questions

1. What's the expand around center approach?
2. Why consider both odd and even length palindromes?
3. What is Manacher's algorithm?
4. How is this different from longest palindromic subsequence?
