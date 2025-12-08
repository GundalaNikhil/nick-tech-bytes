# Remove All Adjacent Duplicates in String II

## Problem Description

**Real-World Scenario:**
A game mechanic (like Candy Crush) removes groups of `k` identical items from a linear board, causing items above to fall down and potentially form new groups.

**Example Setup:** 
A text compressor replaces runs of `k` identical characters with nothing (deletion) recursively.

**What is Remove All Adjacent Duplicates II?**
You are given a string `s` and an integer `k`, a `k` duplicate removal consists of choosing `k` adjacent and equal letters from `s` and removing them, causing the left and the right side of the deleted substring to concatenate together. We repeatedly make `k` duplicate removals on `s` until we no longer can. Return the final string after all such duplicate removals have been made.

**Why is it important?**
- Stack with Count
- String manipulation
- Recursion simulation
- Optimization

**Your Task:** 
Return the final string.

**Difficulty:** Medium
**Tags:** Stack, Basic, Stack With Count, String Manipulation, Recursion Simulation, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `s = "abcd", k = 2`
**Output:** `"abcd"`

### Example 2:
**Input:** `s = "deeedbbcccbdaa", k = 3`
**Output:** `"aa"`
**Explanation:** 
"deeedbbcccbdaa" -> "ddbbbdaa" (removed 'eee' and 'ccc')
"ddbbbdaa" -> "dddaa" (removed 'bbb')
"dddaa" -> "aa" (removed 'ddd')

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| K Value | 2 ≤ k ≤ 10⁴ |
| Data Type | String |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Bloomberg | 🟡 Google | 🟢 King |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Zynga |
| 🔵 Facebook | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. Why store `(char, count)` pairs in the stack?
2. Why increment count if `stack.peek().char == current`?
3. Why pop if `count == k`?
4. Can you use a two-pointer approach?
