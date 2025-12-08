# Longest Substring with At Most K Distinct Characters

## Problem Description

**Real-World Scenario:**
A text analysis tool finds the longest text segment with at most K unique characters for vocabulary constraints.

**Example Setup:** 
A password generator creates the longest password using at most K different character types.

**What is Longest Substring with At Most K Distinct?**
Find the length of the longest substring that contains at most k distinct characters.

**Why is it important?**
- Sliding window with frequency
- Variable-size window
- Character counting
- Optimization problems

**Your Task:** 
Return the maximum substring length.

**Difficulty:** Medium
**Tags:** Array, Sliding Window, Sliding Window With Frequency, Variable-Size Window, Character Counting, Optimization Problems, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "eceba", k = 2`
**Output:** `3`
**Explanation:** "ece" or "eba" have 2 distinct chars.

### Example 2:
**Input:** `s = "aa", k = 1`
**Output:** `2`
**Explanation:** Entire string "aa".

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| K Value | 1 ≤ k ≤ 26 |
| Data Type | Lowercase letters |
| Special Conditions | At most k distinct |
| Time Complexity | O(n) |
| Space Complexity | O(k) |
| Output Format | Maximum length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Uber | 🟢 Quillbot |
| 🔵 Facebook | 🟡 Apple | 🟢 Duolingo |

---

## Follow-up Questions

1. How does sliding window maintain distinct count?
2. When to shrink the window?
3. What about exactly K distinct?
4. What about at most 2 distinct (variation)?
