# Regular Expression Matching

## Problem Description

**Real-World Scenario:**
A text editor's find-and-replace feature supports regex patterns to match complex text structures.

**Example Setup:** 
A form validator checks if an input string matches a specific format (e.g., email validation) using regex.

**What is Regular Expression Matching?**
Implement regex matching with support for '.' and '*'.
- '.' Matches any single character.
- '*' Matches zero or more of the preceding element.

**Why is it important?**
- Complex 2D DP
- State transitions
- String parsing
- Hard interview problem

**Your Task:** 
Return true if the string matches the pattern.

---

## Examples

### Example 1:
**Input:** `s = "aa", p = "a"`
**Output:** `false`

### Example 2:
**Input:** `s = "aa", p = "a*"`
**Output:** `true`
**Explanation:** '*' means zero or more of 'a'.

### Example 3:
**Input:** `s = "ab", p = ".*"`
**Output:** `true`
**Explanation:** ".*" means zero or more of any char.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length, p.length ≤ 20 |
| Characters | Lowercase letters |
| Pattern Chars | Letters, '.', '*' |
| Special Conditions | '*' guarantees valid preceding char |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Google | 🟡 Uber | 🟢 JetBrains |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Slack |

---

## Follow-up Questions

1. How does '*' differ from Wildcard Matching?
2. What are the two cases for '*' (zero or more)?
3. How do you handle the initialization of the DP table?
4. Can you use recursion with memoization?
