# Basic Calculator II

## Problem Description

**Real-World Scenario:**
A spreadsheet engine evaluates mathematical formulas containing integers and basic operators (+, -, *, /) respecting order of operations.

**Example Setup:** 
A scientific calculator parses and evaluates an expression string entered by the user.

**What is Basic Calculator II?**
Given a string `s` which represents an expression, evaluate this expression and return its value. The integer division should truncate toward zero.

**Why is it important?**
- Stack for operator precedence
- String parsing
- Arithmetic evaluation
- Interview classic

**Your Task:** 
Return the calculated integer value.

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
| String Length | 1 ≤ s.length ≤ 3 × 10⁵ |
| Operators | +, -, *, / |
| Data Type | String |
| Special Conditions | Valid expression |
| Time Complexity | O(n) |
| Space Complexity | O(n) or O(1) |
| Output Format | Integer result |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 MathWorks |
| 🔵 Amazon | 🟡 Apple | 🟢 Wolfram |
| 🔵 Google | 🟡 Uber | 🟢 Desmos |

---

## Follow-up Questions

1. Why process multiplication/division immediately?
2. How to handle multi-digit numbers?
3. Can you do it without a stack (using `lastNumber` variable)?
4. What about parentheses (Basic Calculator I/III)?
