# Longest Happy Prefix

## Problem Description

**Real-World Scenario:**
A signal processor finds the longest repeating pattern at the start and end of a transmission to synchronize signals.

**Example Setup:** 
A string analyzer finds the longest proper prefix that is also a suffix (KMP preprocessing).

**What is Longest Happy Prefix?**
A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding itself). Given a string `s`, return the longest happy prefix of `s`. Return an empty string `""` if no such prefix exists.

**Why is it important?**
- KMP Algorithm (LPS Array)
- Rolling Hash (Rabin-Karp)
- String matching
- Optimization

**Your Task:** 
Return the prefix string.

**Difficulty:** Medium
**Tags:** String, Kmp, Kmp Algorithm, Rolling Hash, String Matching, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `s = "level"`
**Output:** `l`
**Explanation:** "l" is prefix and suffix. "level" is not proper.

### Example 2:
**Input:** `s = "ababab"`
**Output:** `"abab"`
**Explanation:** "abab" is prefix and suffix.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| Characters | Lowercase English letters |
| Data Type | String |
| Time Complexity | O(N) |
| Space Complexity | O(N) or O(1) with Rolling Hash |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Pinterest |
| 🔵 Facebook | 🟡 Apple | 🟢 Yelp |

---

## Follow-up Questions

1. How does KMP's LPS (Longest Prefix Suffix) array solve this?
2. What is the value of `lps[n-1]`?
3. How to use Rolling Hash to check prefix/suffix equality in O(1)?
4. How to handle hash collisions?
