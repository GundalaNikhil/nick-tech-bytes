# Find All Anagrams in a String

## Problem Description

**Real-World Scenario:**
A text analyzer finds all occurrences of a specific shuffled word (anagram) in a large document.

**Example Setup:** 
Finding all permutations of a gene sequence within a chromosome.

**What is Find All Anagrams in a String?**
Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Why is it important?**
- Sliding Window (Fixed Size)
- Hash Map / Frequency Array
- String Matching

**Your Task:** 
Return list of indices.

**Difficulty:** Medium
**Tags:** Sliding Window, Medium, Hash Map / Frequency Array, String Matching, O(N), Interview

---

## Examples

### Example 1:
**Input:** `s = "cbaebabacd", p = "abc"`
**Output:** `[0,6]`
**Explanation:** 
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".

### Example 2:
**Input:** `s = "abab", p = "ab"`
**Output:** `[0,1,2]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Lengths | 1 ≤ len ≤ 3 * 10^4 |
| Characters | Lowercase English letters |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yelp |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Snap |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Why fixed size window?
2. How to optimize the check? (Count matches variable instead of comparing arrays every time).
3. Difference from "Permutation in String"? (Return all indices vs boolean).
