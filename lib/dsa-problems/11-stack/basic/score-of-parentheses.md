# Score of Parentheses

## Problem Description

**Real-World Scenario:**
A nested data parser calculates the "depth score" of a structured document where nested blocks multiply value and adjacent blocks add value.

**Example Setup:** 
A game scoring system where nested achievements double the points of the inner achievement.

**What is Score of Parentheses?**
Given a balanced parentheses string `s`, return the score of the string.
The score rule is:
- `()` has score 1.
- `AB` has score `A + B`, where A and B are balanced parentheses strings.
- `(A)` has score `2 * A`, where A is a balanced parentheses string.

**Why is it important?**
- Stack application
- Recursion / Divide and Conquer
- Depth tracking (O(1) space approach)
- Parsing logic

**Your Task:** 
Return the score.

**Difficulty:** Medium
**Tags:** Stack, Basic, Stack Application, Recursion / Divide And Conquer, Depth Tracking, Parsing Logic, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "()"`
**Output:** `1`

### Example 2:
**Input:** `s = "(())"`
**Output:** `2`

### Example 3:
**Input:** `s = "()()"`
**Output:** `2`

### Example 4:
**Input:** `s = "(()(()))"`
**Output:** `6`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 2 ≤ s.length ≤ 50 |
| Characters | '(' and ')' |
| Special Conditions | Balanced string |
| Time Complexity | O(n) |
| Space Complexity | O(n) or O(1) |
| Output Format | Integer score |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Reddit |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Quora |
| 🔵 Facebook | 🟡 Apple | 🟢 Discord |

---

## Follow-up Questions

1. How does the stack approach work (push 0 for '(', add/multiply on ')')?
2. How to solve in O(1) space by tracking depth?
3. What is the contribution of each '()' based on its depth?
4. Can you solve it using recursion?
