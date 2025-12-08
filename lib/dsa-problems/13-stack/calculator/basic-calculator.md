# Basic Calculator

## Problem Description

**Real-World Scenario:**
A compiler parser evaluating mathematical expressions with parentheses, addition, and subtraction.

**Example Setup:** 
Evaluating formulas in a spreadsheet cell.

**What is Basic Calculator?**
Given a string `s` representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.
Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.
The expression string may contain open `(` and closing parentheses `)`, the plus `+` or minus sign `-`, non-negative integers and empty spaces ` `.

**Why is it important?**
- Stack
- String Parsing
- Operator Precedence (Simple here)
- Recursion (Alternative)

**Your Task:** 
Return integer result.

---

## Examples

### Example 1:
**Input:** `s = "1 + 1"`
**Output:** `2`

### Example 2:
**Input:** `s = " 2-1 + 2 "`
**Output:** `3`

### Example 3:
**Input:** `s = "(1+(4+5+2)-3)+(6+8)"`
**Output:** `23`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ len ≤ 3 * 10^5 |
| Characters | Digits, '+', '-', '(', ')', ' ' |
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

1. How to handle parentheses? (Push current result and sign to stack, reset).
2. How to handle multi-digit numbers? (Parse loop).
3. Why is sign tracking important? (To handle `-(a+b)` correctly).
