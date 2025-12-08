# Longest Repeating Character Replacement

## Problem Description

**Real-World Scenario:**
A signal processor tries to reconstruct a clean signal (e.g., a long beep) from a noisy transmission by correcting at most `k` errors.

**Example Setup:** 
Editing a text to make a long sequence of the same letter by changing at most `k` characters.

**What is Longest Repeating Character Replacement?**
You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.
Return the length of the longest substring containing the same letter you can get after performing the above operations.

**Why is it important?**
- Sliding Window
- Two Pointers
- Optimization (Max Frequency tracking)

**Your Task:** 
Return max length.

---

## Examples

### Example 1:
**Input:** `s = "ABAB", k = 2`
**Output:** `4`
**Explanation:** Replace the two 'A's with two 'B's or vice versa.

### Example 2:
**Input:** `s = "AABABBA", k = 1`
**Output:** `4`
**Explanation:** Replace the one 'A' in the middle with 'B' and form "AABBBBA". The substring "BBBB" has length 4.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ len ≤ 10^5 |
| k | 0 ≤ k ≤ len |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Pocket Gems |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Nutanix |

---

## Follow-up Questions

1. Condition for valid window? `(window_len - max_freq <= k)`.
2. Why don't we need to decrement `max_freq` when shrinking? (Because we only care about finding a *longer* valid window, and a smaller max_freq won't help us find a longer one).
3. Time complexity? (O(N) since left and right pointers move at most N times).
