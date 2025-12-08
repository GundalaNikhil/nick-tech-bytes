# Evaluate Reverse Polish Notation

## Problem Description

**Real-World Scenario:**
Scientific calculators process expressions in postfix notation (RPN) to avoid parentheses parsing. Evaluate expressions like "3 4 + 2 *" = 14.

**Example Setup:** 
A compiler converts infix expressions to postfix and evaluates them using a stack-based approach.

**What is Evaluate Reverse Polish Notation?**
Evaluate an arithmetic expression in Reverse Polish Notation. Operands come before operators. Use a stack to process.

**Why is it important?**
- Stack application
- Expression evaluation
- Compiler internals
- Calculator implementations

**Your Task:** 
Return the result of the RPN expression.

**Difficulty:** Medium
**Tags:** Stack, Applications, Stack Application, Expression Evaluation, Compiler Internals, Calculator Implementations, O(n), Interview

---

## Examples

### Example 1:
**Input:** `tokens = ["2", "1", "+", "3", "*"]`
**Output:** `9`
**Explanation:** ((2 + 1) * 3) = 9.

### Example 2:
**Input:** `tokens = ["4", "13", "5", "/", "+"]`
**Output:** `6`
**Explanation:** (4 + (13 / 5)) = 4 + 2 = 6.

### Example 3:
**Input:** `tokens = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]`
**Output:** `22`
**Explanation:** Complex expression evaluates to 22.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Tokens | 1 ≤ n ≤ 10⁴ |
| Data Type | Integer strings and operators |
| Operators | +, -, *, / |
| Special Conditions | Integer division truncates toward zero |
| Time Complexity | O(n) |
| Space Complexity | O(n) for stack |
| Output Format | Integer result |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Texas Instruments |
| 🔵 Google | 🟡 LinkedIn | 🟢 HP |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Casio |

---

## Follow-up Questions

1. How do you convert infix to postfix?
2. What about negative numbers?
3. How do you handle division truncation?
4. What about prefix notation (Polish)?
