# Permutation in String

## Problem Description

**Real-World Scenario:**
A password cracker checks if any scrambled version of a known password fragment appears in a captured data stream.

**Example Setup:** 
Checking if a ransom note could have been cut out from a magazine (contiguous segment).

**What is Permutation in String?**
Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.
In other words, return `true` if one of `s1`'s permutations is the substring of `s2`.

**Why is it important?**
- Sliding Window (Fixed Size)
- Hash Map / Frequency Array
- Anagram Check

**Your Task:** 
Return boolean.

---

## Examples

### Example 1:
**Input:** `s1 = "ab", s2 = "eidbaooo"`
**Output:** `true`
**Explanation:** s2 contains one permutation of s1 ("ba").

### Example 2:
**Input:** `s1 = "ab", s2 = "eidboaoo"`
**Output:** `false`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Lengths | 1 ≤ len ≤ 10^4 |
| Characters | Lowercase English letters |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Oracle |
| 🔵 Facebook | 🟡 Apple | 🟢 ByteDance |

---

## Follow-up Questions

1. Why fixed size window? (Window size must be `s1.length`).
2. How to update frequency map efficiently? (Add new char, remove old char).
3. Relationship to "Find All Anagrams"? (Same logic, just return boolean vs indices).
