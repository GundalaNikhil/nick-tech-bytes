# Longest Substring Without Repeating Characters

## Problem Description

**Real-World Scenario:**
A password validation system requires a password where no character repeats in any consecutive sequence. Find the longest valid sequence in a given password to show the user their strongest password segment.

**Example Setup:** 
Sneha is creating a username for a gaming platform. The platform awards bonus points for long stretches without repeated characters. In "gamerjohn2024", what's her longest streak of unique characters?

**What is the Problem?**
Given a string, find the length of the longest substring without any repeating characters. This is a classic sliding window problem.

**Why is it important?**
- Core sliding window technique
- Used in text processing
- Streaming data analysis
- Pattern recognition

**Your Task:** 
Return the length of the longest substring without repeating characters.

**Difficulty:** Medium
**Tags:** Array, Sliding Window, Core Sliding Window, Used In Text Processing, Streaming Data Analysis, Pattern Recognition, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "abcabcbb"`
**Output:** `3`
**Substring:** "abc"
**Explanation:** The longest substring without repeats is "abc".

### Example 2:
**Input:** `s = "bbbbb"`
**Output:** `1`
**Substring:** "b"
**Explanation:** All same characters - any single 'b' is the answer.

### Example 3:
**Input:** `s = "pwwkew"`
**Output:** `3`
**Substring:** "wke"
**Explanation:** Note: "pwke" is a subsequence, not a substring.

### Example 4:
**Input:** `s = ""`
**Output:** `0`
**Explanation:** Empty string has no characters.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 0 ≤ n ≤ 5 × 10⁴ |
| Data Type | English letters, digits, symbols, spaces |
| Special Conditions | Case-sensitive |
| Time Complexity | O(n) |
| Space Complexity | O(min(n, alphabet_size)) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 Spotify |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Snap |
| 🔵 Facebook | 🟡 Uber | 🟢 Yelp |
| 🔵 Apple | 🟡 ByteDance | 🟢 Pinterest |

---

## Follow-up Questions

1. How would you return the actual substring, not just length?
2. What if you need exactly K distinct characters?
3. How does the sliding window technique apply here?
4. What data structure helps track character positions efficiently?
