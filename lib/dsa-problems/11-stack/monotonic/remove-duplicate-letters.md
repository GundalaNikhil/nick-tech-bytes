# Remove Duplicate Letters

## Problem Description

**Real-World Scenario:**
A file compression algorithm removes duplicate characters to minimize size while maintaining the original relative order of unique characters and ensuring the lexicographically smallest result.

**Example Setup:** 
A library catalog system deduplicates book codes while keeping the earliest possible alphabetical sequence.

**What is Remove Duplicate Letters?**
Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

**Why is it important?**
- Monotonic stack
- Greedy choice with future knowledge
- Character frequency tracking
- Hard stack problem

**Your Task:** 
Return the lexicographically smallest string with unique characters.

---

## Examples

### Example 1:
**Input:** `s = "bcabc"`
**Output:** `"abc"`

### Example 2:
**Input:** `s = "cbacdcbc"`
**Output:** `acdb`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁴ |
| Characters | Lowercase English letters |
| Time Complexity | O(n) |
| Space Complexity | O(1) (stack size ≤ 26) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Apple | 🟢 Pandora |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Oracle |

---

## Follow-up Questions

1. Why do we need character counts?
2. When do we pop from the stack (current < top and top appears later)?
3. Why use a `visited` boolean array?
4. How is this different from "Smallest Subsequence of Distinct Characters"?
