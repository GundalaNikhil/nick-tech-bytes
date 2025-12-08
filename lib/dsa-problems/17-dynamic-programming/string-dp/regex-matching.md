# Regular Expression Matching

## Problem Description

**Real-World Scenario:**
A text search engine supports wildcards: '.' matches any character, '*' matches zero or more of the previous character. Implement this pattern matching.

**Example Setup:** 
A file search tool: `*.txt` matches all text files. Pattern `a*b.c` matches "ab.c", "aaab.c", "b.c", etc.

**What is Regular Expression Matching?**
Given string s and pattern p, implement wildcard matching where:
- '.' matches any single character
- '*' matches zero or more of the preceding element

**Why is it important?**
- Text processing
- Search engines
- DP on strings
- Compiler design

**Your Task:** 
Return true if the pattern matches the entire string.

**Difficulty:** Medium
**Tags:** Dynamic Programming, String Dp, Text Processing, Search Engines, Dp On Strings, Compiler Design, O(s × p), Interview

---

## Examples

### Example 1:
**Input:** `s = "aa", p = "a"`
**Output:** `false`
**Explanation:** "a" doesn't match entire "aa".

### Example 2:
**Input:** `s = "aa", p = "a*"`
**Output:** `true`
**Explanation:** '*' means zero or more 'a's.

### Example 3:
**Input:** `s = "ab", p = ".*"`
**Output:** `true`
**Explanation:** ".*" means zero or more of any character.

### Example 4:
**Input:** `s = "aab", p = "c*a*b"`
**Output:** `true`
**Explanation:** c* = empty, a* = "aa", b = "b".

---

## Constraints

| Constraint | Value |
|------------|-------|
| S Length | 1 ≤ s.length ≤ 20 |
| P Length | 1 ≤ p.length ≤ 20 |
| Data Type | Lowercase letters, '.', '*' |
| Special Conditions | '*' always follows valid char |
| Time Complexity | O(s × p) with DP |
| Space Complexity | O(s × p) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Algolia |
| 🔵 Facebook | 🟡 Uber | 🟢 Elastic |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Splunk |

---

## Follow-up Questions

1. What's the DP state definition?
2. How do you handle '*' (0 or more matches)?
3. What's Wildcard Matching (simpler variant)?
4. Can you use memoization?
