# Valid Parentheses

## Problem Description

**Real-World Scenario:**
Code editors highlight matching brackets to help programmers. When you type a closing bracket, the editor checks if it properly pairs with an opening bracket. Invalid nesting causes syntax errors!

**Example Setup:** 
Ramesh is building a JSON validator. JSON uses {}, [], and () for structure. He needs to verify that every opening bracket has a matching closing bracket in the correct order.

**What is Valid Parentheses?**
Given a string containing just '(', ')', '{', '}', '[', ']', determine if the input string has valid bracket matching where each opening bracket is closed by the same type and in correct order.

**Why is it important?**
- Code compilers and interpreters
- JSON/XML validation
- Mathematical expression parsing
- HTML/JSX tag matching

**Your Task:** 
Return true if the input string has valid parentheses matching.

---

## Examples

### Example 1:
**Input:** `s = "()"`
**Output:** `true`
**Explanation:** Simple pair, valid.

### Example 2:
**Input:** `s = "()[]{}"`
**Output:** `true`
**Explanation:** Three valid pairs side by side.

### Example 3:
**Input:** `s = "(]"`
**Output:** `false`
**Explanation:** Mismatched types.

### Example 4:
**Input:** `s = "([)]"`
**Output:** `false`
**Explanation:** Invalid nesting - [ is closed before (.

### Example 5:
**Input:** `s = "{[]}"`
**Output:** `true`
**Explanation:** Proper nesting - [ closes before {.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 10⁴ |
| Characters | Only '(', ')', '{', '}', '[', ']' |
| Data Type | String |
| Special Conditions | Empty string is valid |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 VMware |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zenefits |
| 🔵 Facebook | 🟡 Uber | 🟢 Twilio |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Zillow |

---

## Follow-up Questions

1. Can you do this without a stack?
2. What if there are other characters between brackets?
3. How would you find the longest valid parentheses substring?
4. How would you handle multiple types of brackets with priorities?
