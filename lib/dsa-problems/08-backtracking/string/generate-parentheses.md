# Generate Parentheses

## Problem Description

**Real-World Scenario:**
A code generator creates all valid combinations of nested function calls. Each opening must have a matching closing - generating valid parentheses patterns.

**Example Setup:** 
A math education app shows students all valid ways to parenthesize an expression with N pairs of brackets.

**What is Generate Parentheses?**
Generate all combinations of n pairs of well-formed parentheses. Only valid combinations where every '(' has a matching ')'.

**Why is it important?**
- Classic backtracking
- Catalan numbers
- Expression parsing
- Valid sequence generation

**Your Task:** 
Return all valid parentheses strings with n pairs.

---

## Examples

### Example 1:
**Input:** `n = 3`
**Output:** `["((()))", "(()())", "(())()", "()(())", "()()()"]`
**Explanation:** All 5 valid combinations of 3 pairs.

### Example 2:
**Input:** `n = 1`
**Output:** `["()"]`
**Explanation:** Only one way.

### Example 3:
**Input:** `n = 2`
**Output:** `["(())", "()()"]`
**Explanation:** Two valid patterns.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Pairs | 1 ≤ n ≤ 8 |
| Data Type | String array |
| Special Conditions | Well-formed only |
| Time Complexity | O(4^n / √n) - Catalan number |
| Space Complexity | O(n) recursion |
| Output Format | List of strings |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Adobe | 🟢 Airbnb |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Snapchat |

---

## Follow-up Questions

1. What are the backtracking conditions (open < n, close < open)?
2. What's the count formula (Catalan numbers)?
3. How would you generate all bracket combinations?
4. Can you do this iteratively?
