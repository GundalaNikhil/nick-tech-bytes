# Wildcard Matching

## Problem Description

**Real-World Scenario:**
A file search utility (like `ls *.txt`) matches filenames against patterns with `?` (single char) and `*` (any sequence).

**Example Setup:** 
A database query engine implements `LIKE` operator pattern matching.

**What is Wildcard Matching?**
Implement wildcard pattern matching with support for '?' and '*'.
- '?' Matches any single character.
- '*' Matches any sequence of characters (including the empty sequence).

**Why is it important?**
- 2D DP
- String matching
- Edge case handling
- Classic algorithm

**Your Task:** 
Return true if the string matches the pattern.

**Difficulty:** Medium
**Tags:** Dynamic Programming, String Dp, 2D Dp, String Matching, Edge Case Handling, Classic, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** `s = "aa", p = "a"`
**Output:** `false`

### Example 2:
**Input:** `s = "aa", p = "*"`
**Output:** `true`

### Example 3:
**Input:** `s = "cb", p = "?a"`
**Output:** `false`

### Example 4:
**Input:** `s = "adceb", p = "*a*b"`
**Output:** `true`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 0 ≤ s.length, p.length ≤ 2000 |
| Characters | Lowercase letters |
| Pattern Chars | Letters, '?', '*' |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Splunk |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Elastic |
| 🔵 Amazon | 🟡 Apple | 🟢 Adobe |

---

## Follow-up Questions

1. What is the recurrence for '*'?
2. How do you handle empty pattern/string?
3. Can you optimize space to O(n)?
4. What is the greedy approach with backtracking (O(1) space)?
