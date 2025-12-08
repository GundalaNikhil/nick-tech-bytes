# Minimum Remove to Make Valid Parentheses

## Problem Description

**Real-World Scenario:**
A code sanitizer removes unmatched parentheses from a code snippet to prevent syntax errors while preserving as much code as possible.

**Example Setup:** 
A mathematical expression cleaner removes invalid brackets to make the expression parseable.

**What is Minimum Remove...?**
Given a string `s` of '(' , ')' and lowercase English characters. Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

**Why is it important?**
- Stack / Two Pass
- String manipulation
- Balance tracking
- Interview classic

**Your Task:** 
Return the valid string.

**Difficulty:** Medium
**Tags:** Stack, Basic, Stack / Two Pass, String Manipulation, Balance Tracking, Interview Classic, O(N), Interview

---

## Examples

### Example 1:
**Input:** `s = "lee(t(c)o)de)"`
**Output:** `"lee(t(c)o)de"`
**Explanation:** Remove last ')'.

### Example 2:
**Input:** `s = "a)b(c)d"`
**Output:** `"ab(c)d"`
**Explanation:** Remove first ')'.

### Example 3:
**Input:** `s = "))(("`
**Output:** `""`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| Characters | '(', ')', lowercase letters |
| Data Type | String |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Duolingo |
| 🔵 Google | 🟡 Apple | 🟢 Scribd |

---

## Follow-up Questions

1. Why use a stack to track indices of invalid parentheses?
2. Why remove extra ')' immediately?
3. Why remove extra '(' at the end?
4. Can you do it in two passes without a stack (count balance)?
