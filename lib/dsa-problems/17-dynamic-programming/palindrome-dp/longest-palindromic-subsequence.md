# Longest Palindromic Subsequence

## Problem Description

**Real-World Scenario:**
DNA sequences sometimes have palindromic structures that are biologically significant. Scientists study the longest palindromic subsequence in gene sequences to understand genetic patterns and mutations.

**Example Setup:** 
Priya is building a word game where players score bonus points for finding palindromic patterns. Given any word, find the longest rearrangeable palindrome hidden within it by picking characters in order.

**What is the Longest Palindromic Subsequence?**
Given a string, find the length of the longest subsequence that reads the same forwards and backwards. Unlike substrings, characters don't need to be contiguous.

**Why is it important?**
- Bioinformatics (DNA/RNA analysis)
- Text processing
- Data compression
- Cryptography

**Your Task:** 
Find the length of the longest palindromic subsequence.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Palindrome Dp, Bioinformatics, Text Processing, Data Compression, Cryptography, O(n²), Interview

---

## Examples

### Example 1:
**Input:** `s = "bbbab"`
**Output:** `4`
**LPS:** "bbbb"
**Explanation:** Delete 'a' to get palindrome "bbbb".

### Example 2:
**Input:** `s = "cbbd"`
**Output:** `2`
**LPS:** "bb"
**Explanation:** The longest palindromic subsequence is "bb".

### Example 3:
**Input:** `s = "a"`
**Output:** `1`
**Explanation:** Single character is always a palindrome.

### Example 4:
**Input:** `s = "abcdef"`
**Output:** `1`
**Explanation:** No two characters are same - any single char works.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 1000 |
| Data Type | Lowercase English letters |
| Special Conditions | Subsequence, not substring |
| Time Complexity | O(n²) |
| Space Complexity | O(n²) or O(n) optimized |
| Output Format | Length of longest palindromic subsequence |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Illumina |
| 🔵 Google | 🟡 Uber | 🟢 23andMe |
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Epic Systems |

---

## Follow-up Questions

1. How is this related to LCS? (Hint: LPS = LCS(s, reverse(s)))
2. How would you print the actual palindromic subsequence?
3. What's the difference between palindromic subsequence and substring?
4. How many characters need to be deleted to make a palindrome?
