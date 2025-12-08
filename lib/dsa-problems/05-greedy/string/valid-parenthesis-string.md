# Valid Parenthesis String

## Problem Description

**Real-World Scenario:**
A compiler's syntax checker validates code blocks where asterisks can be used as wildcards (representing '(', ')', or empty string) to fix minor syntax errors.

**Example Setup:** 
A text editor's auto-correct feature checks if a mathematical expression with optional placeholders is valid.

**What is Valid Parenthesis String?**
Given a string containing only '(', ')', and '*', determine if the string is valid. '*' can be treated as '(', ')', or empty string.

**Why is it important?**
- Greedy approach (min/max open count)
- Two-stack approach
- Dynamic Programming
- Handling wildcards

**Your Task:** 
Return true if the string is valid.

**Difficulty:** Medium
**Tags:** Greedy, String, Greedy Approach, Two-Stack, Dynamic Programming, Handling Wildcards, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "()"`
**Output:** `true`

### Example 2:
**Input:** `s = "(*)"`
**Output:** `true`
**Explanation:** '*' becomes empty string or ')'.

### Example 3:
**Input:** `s = "(*))"`
**Output:** `true`
**Explanation:** '*' becomes '('.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 100 |
| Characters | '(', ')', '*' |
| Data Type | String |
| Special Conditions | '*' is wildcard |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 LinkedIn |
| 🔵 Amazon | 🟡 Apple | 🟢 Oracle |
| 🔵 Google | 🟡 Microsoft | 🟢 Salesforce |

---

## Follow-up Questions

1. How does the greedy approach with `low` and `high` counters work?
2. Why do we need two counters?
3. Can you solve this with DP?
4. What if there were multiple types of brackets?
