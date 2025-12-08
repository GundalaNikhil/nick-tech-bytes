# Valid Palindrome II

## Problem Description

**Real-World Scenario:**
A spell checker allows one typo (extra character) in a palindrome to consider it valid.

**Example Setup:** 
A DNA sequence analyzer checks if a gene sequence is a palindrome allowing for a single mutation (insertion/deletion).

**What is Valid Palindrome II?**
Given a string `s`, return `true` if the `s` can be palindrome after deleting at most one character from it.

**Why is it important?**
- Two Pointers
- Greedy Choice
- String processing
- Interview classic

**Your Task:** 
Return true if valid.

**Difficulty:** Medium
**Tags:** String, Palindrome, Two Pointers, Greedy Choice, String Processing, Interview Classic, O(N), Interview

---

## Examples

### Example 1:
**Input:** `s = "aba"`
**Output:** `true`

### Example 2:
**Input:** `s = "abca"`
**Output:** `true`
**Explanation:** Delete 'c' -> "aba".

### Example 3:
**Input:** `s = "abc"`
**Output:** `false`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| Characters | Lowercase English letters |
| Data Type | String |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Google | 🟡 Microsoft | 🟢 Duolingo |
| 🔵 Amazon | 🟡 Apple | 🟢 Scribd |

---

## Follow-up Questions

1. When mismatch `s[i] != s[j]`, why check `isPalindrome(i+1, j)` OR `isPalindrome(i, j-1)`?
2. Why is this greedy approach correct?
3. Can you handle k deletions (Valid Palindrome III - DP)?
4. What if you could swap two characters?
