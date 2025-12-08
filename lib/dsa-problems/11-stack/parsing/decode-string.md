# Decode String

## Problem Description

**Real-World Scenario:**
A decompression utility expands a run-length encoded format where patterns are repeated in nested brackets.

**Example Setup:** 
A graphics renderer expands a compressed vector command string like "3[F100 R90]" (Draw Forward 100, Turn Right 90, three times).

**What is Decode String?**
Given an encoded string, return its decoded string. The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.

**Why is it important?**
- Stack (Nested structures)
- Recursion
- String parsing
- State management

**Your Task:** 
Return the decoded string.

**Difficulty:** Medium
**Tags:** Stack, Parsing, Recursion, String Parsing, State Management, O(output_length), Interview

---

## Examples

### Example 1:
**Input:** `s = "3[a]2[bc]"`
**Output:** `"aaabcbc"`

### Example 2:
**Input:** `s = "3[a2[c]]"`
**Output:** `"accaccacc"`

### Example 3:
**Input:** `s = "2[abc]3[cd]ef"`
**Output:** `"abcabccdcdcdef"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 30 |
| Repetitions | 1 ≤ k ≤ 300 |
| Data Type | String |
| Special Conditions | Well-formed input |
| Time Complexity | O(output_length) |
| Space Complexity | O(output_length) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Cisco |
| 🔵 Amazon | 🟡 Microsoft | 🟢 VMware |
| 🔵 Facebook | 🟡 Apple | 🟢 Intuit |

---

## Follow-up Questions

1. Why use two stacks (countStack and stringStack)?
2. How to handle nested brackets?
3. What is the recursive solution?
4. How to parse multi-digit numbers?
