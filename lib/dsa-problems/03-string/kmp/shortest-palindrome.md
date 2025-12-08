# Shortest Palindrome

## Problem Description

**Real-World Scenario:**
A data recovery tool reconstructs corrupted palindrome files by appending the minimum necessary data to the front.

**Example Setup:** 
A DNA sequencer completes a partial palindrome sequence by adding the fewest nucleotides to the beginning.

**What is Shortest Palindrome?**
You are given a string s. You can convert s to a palindrome by adding characters in front of it. Find and return the shortest palindrome you can find by performing this transformation.

**Why is it important?**
- KMP Algorithm (Prefix Function)
- String matching
- Palindrome properties
- Hard string problem

**Your Task:** 
Return the shortest palindrome.

**Difficulty:** Medium
**Tags:** String, Kmp, Kmp Algorithm, String Matching, Palindrome Properties, Hard String, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "aacecaaa"`
**Output:** `"aaacecaaa"`

### Example 2:
**Input:** `s = "abcd"`
**Output:** `"dcbabcd"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 0 ≤ s.length ≤ 5 × 10⁴ |
| Characters | Lowercase English letters |
| Time Complexity | O(n) using KMP |
| Space Complexity | O(n) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Pocket Gems |
| 🔵 Amazon | 🟡 Microsoft | 🟢 LeetCode |
| 🔵 Facebook | 🟡 Apple | 🟢 CodeSignal |

---

## Follow-up Questions

1. Why reverse the string and append to original?
2. How does KMP's failure function (LPS array) help?
3. What is the brute force complexity?
4. Can you use Rolling Hash (Rabin-Karp)?
