# Wildcard Matching

## Problem Description

**Real-World Scenario:**
A file system shell supporting commands like `ls *.txt` or `rm temp_?.*`.

**Example Setup:** 
Database query with `LIKE` operator (SQL).

**What is Wildcard Matching?**
Given an input string (`s`) and a pattern (`p`), implement wildcard pattern matching with support for `'?'` and `'*'`.
- `'?'` Matches any single character.
- `'*'` Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

**Why is it important?**
- Dynamic Programming (2D)
- Greedy with Backtracking (O(1) space optimization)
- String Matching

**Your Task:** 
Return boolean match.

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

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Lengths | 0 ≤ s.length, p.length ≤ 2000 |
| Characters | Lowercase English letters, '?', '*' |
| Time Complexity | O(M * N) (DP) or O(M+N) average (Greedy) |
| Space Complexity | O(M * N) or O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Snap |
| 🔵 Facebook | 🟡 Apple | 🟢 Pinterest |

---

## Follow-up Questions

1. Why is this easier than Regex? (`*` is independent of previous char).
2. Greedy approach? (Keep track of last `*` position and match position. If mismatch, backtrack to `*` and consume one more char from `s`).
3. DP state? `dp[i][j]` = match `s[0..i]` and `p[0..j]`.
