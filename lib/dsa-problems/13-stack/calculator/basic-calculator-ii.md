# Basic Calculator II

## Problem Description

**Real-World Scenario:**
A scientific calculator evaluating expressions with standard order of operations (MDAS).

**Example Setup:** 
Parsing a math homework string.

**What is Basic Calculator II?**
Given a string `s` which represents an expression, evaluate this expression and return its value.
The integer division should truncate toward zero.
You may assume that the given expression is always valid. All intermediate results will be in the range of `[-2^31, 2^31 - 1]`.
The expression string contains integers, operator `+`, `-`, `*`, `/`, and empty spaces ` `.

**Why is it important?**
- Stack
- Operator Precedence (* / before + -)
- String Parsing

**Your Task:** 
Return integer result.

---

## Examples

### Example 1:
**Input:** `s = "3+2*2"`
**Output:** `7`

### Example 2:
**Input:** `s = " 3/2 "`
**Output:** `1`

### Example 3:
**Input:** `s = " 3+5 / 2 "`
**Output:** `5`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ len ≤ 3 * 10^5 |
| Characters | Digits, '+', '-', '*', '/', ' ' |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer result |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 Snap |

---

## Follow-up Questions

1. Why process `*` and `/` immediately? (Higher precedence).
2. How to handle `+` and `-`? (Push to stack, sum up at the end).
3. Can you do it with O(1) space? (Yes, keep `lastNumber` and `currentResult`).
