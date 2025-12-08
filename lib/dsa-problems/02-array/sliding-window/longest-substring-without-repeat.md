# Longest Substring Without Repeating Characters

## Problem Description

**Real-World Scenario:**
A password strength checker measures the longest stretch without repeating characters - longer unique sequences indicate stronger passwords.

**Example Setup:** 
A text compression algorithm finds the longest unique character sequence as a potential compression unit.

**What is Longest Substring Without Repeating?**
Find the length of the longest substring without repeating characters. Use sliding window with character tracking.

**Why is it important?**
- Sliding window classic
- Character frequency/position tracking
- String optimization
- Interview must-know

**Your Task:** 
Return the length of the longest substring without repeating characters.

---

## Examples

### Example 1:
**Input:** `s = "abcabcbb"`
**Output:** `3`
**Explanation:** "abc" is the longest without repeats.

### Example 2:
**Input:** `s = "bbbbb"`
**Output:** `1`
**Explanation:** "b" is the longest.

### Example 3:
**Input:** `s = "pwwkew"`
**Output:** `3`
**Explanation:** "wke" is the longest.

### Example 4:
**Input:** `s = ""`
**Output:** `0`
**Explanation:** Empty string.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 0 ≤ s.length ≤ 5 × 10⁴ |
| Data Type | English letters, digits, symbols |
| Special Conditions | Case-sensitive |
| Time Complexity | O(n) |
| Space Complexity | O(min(n, charset size)) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Google | 🟡 Adobe | 🟢 Twitch |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Zoom |

---

## Follow-up Questions

1. Why use hash map to track last position?
2. How do you update the window start?
3. Can you use a set instead of hash map?
4. What about finding K unique characters?
