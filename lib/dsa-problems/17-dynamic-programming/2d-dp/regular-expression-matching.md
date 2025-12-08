# Regular Expression Matching

## Problem Description

**Real-World Scenario:**
A text editor or grep tool implementing regex support for pattern matching (e.g., `a*b.`).

**Example Setup:** 
Validating input formats with wildcards.

**What is Regular Expression Matching?**
Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'`.
- `'.'` Matches any single character.
- `'*'` Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

**Why is it important?**
- Dynamic Programming (2D)
- Recursion with Memoization
- String Parsing
- Classic Hard Problem

**Your Task:** 
Return boolean match.

---

## Examples

### Example 1:
**Input:** `s = "aa", p = "a"`
**Output:** `false`

### Example 2:
**Input:** `s = "aa", p = "a*"`
**Output:** `true`
**Explanation:** '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

### Example 3:
**Input:** `s = "ab", p = ".*"`
**Output:** `true`
**Explanation:** ".*" means "zero or more (*) of any character (.)".

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Lengths | 1 ≤ s.length, p.length ≤ 20 |
| Characters | Lowercase English letters, '.', '*' |
| Time Complexity | O(M * N) |
| Space Complexity | O(M * N) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Airbnb |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Twitter |

---

## Follow-up Questions

1. How to handle `*`? (Two cases: ignore `x*` (0 occurrences) or match `x` and keep `x*` (1+ occurrences)).
2. Why DP? (Overlapping subproblems: `match(s[i:], p[j:])`).
3. Difference from Wildcard Matching? (`*` in regex depends on preceding char, `*` in wildcard matches any sequence).
