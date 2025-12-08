# Evaluate Reverse Polish Notation

## Problem Description

**Real-World Scenario:**
A stack-based virtual machine (like JVM) executes bytecode instructions where operands are pushed to a stack and operators consume them.

**Example Setup:** 
A postfix calculator evaluates mathematical expressions entered in Reverse Polish Notation (RPN).

**What is Evaluate RPN?**
Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are `+`, `-`, `*`, and `/`. Each operand may be an integer or another expression. The division between two integers always truncates toward zero.

**Why is it important?**
- Stack application
- Expression evaluation
- Parsing
- Interview classic

**Your Task:** 
Return the integer result.

**Difficulty:** Medium
**Tags:** Stack, Parsing, Stack Application, Expression Evaluation, Interview Classic, O(N), Interview

---

## Examples

### Example 1:
**Input:** `tokens = ["2","1","+","3","*"]`
**Output:** `9`
**Explanation:** ((2 + 1) * 3) = 9.

### Example 2:
**Input:** `tokens = ["4","13","5","/","+"]`
**Output:** `6`
**Explanation:** (4 + (13 / 5)) = 6.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Tokens | 1 ≤ n ≤ 10⁴ |
| Values | -200 ≤ val ≤ 200 |
| Data Type | String array |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer result |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 MathWorks |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Wolfram |
| 🔵 Facebook | 🟡 Apple | 🟢 Desmos |

---

## Follow-up Questions

1. Why is RPN easier to evaluate than Infix (no parentheses/precedence)?
2. How to handle negative division truncation?
3. Can you use an array as a stack for performance?
4. What if we add more operators (pow, mod)?
