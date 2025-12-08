# Longest Valid Parentheses

## Problem Description

**Real-World Scenario:**
A code linter finds the longest valid bracket sequence in malformed code. This helps suggest where to add/remove brackets.

**Example Setup:** 
A math expression parser finds the longest correctly-nested portion of a broken expression for partial evaluation.

**What is Longest Valid Parentheses?**
Given a string of '(' and ')', find the length of the longest substring with valid matching parentheses.

**Why is it important?**
- DP on strings
- Stack-based approach
- Compiler/parser logic
- Challenging edge cases

**Your Task:** 
Return the length of the longest valid substring.

---

## Examples

### Example 1:
**Input:** `s = "(()"`
**Output:** `2`
**Explanation:** Longest valid is "()".

### Example 2:
**Input:** `s = ")()())"`
**Output:** `4`
**Explanation:** Longest valid is "()()".

### Example 3:
**Input:** `s = ""`
**Output:** `0`
**Explanation:** Empty string.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 0 ≤ n ≤ 3 × 10⁴ |
| Characters | '(' and ')' only |
| Data Type | String |
| Special Conditions | Substring must be contiguous |
| Time Complexity | O(n) |
| Space Complexity | O(n) for stack, O(1) for two-pass |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 JetBrains |
| 🔵 Facebook | 🟡 Uber | 🟢 IntelliJ |
| 🔵 Microsoft | 🟡 Adobe | 🟢 VS Code |

---

## Follow-up Questions

1. How does the stack approach track invalid positions?
2. What's the DP recurrence?
3. How does the two-pass O(1) space work?
4. How is this related to longest balanced arrangement?
