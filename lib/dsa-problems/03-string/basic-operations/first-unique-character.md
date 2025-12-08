# First Unique Character in String

## Problem Description

**Real-World Scenario:**
A username validator finds the first character that makes a username unique. Given a string, find the first character that appears only once.

**Example Setup:** 
An airport code generator looks at city names and picks the first unique letter for the code.

**What is First Unique Character?**
Find the first non-repeating character in a string and return its index. Return -1 if no unique character exists.

**Why is it important?**
- Hash map frequency
- String scanning
- Interview warmup
- Two-pass technique

**Your Task:** 
Return the index of the first unique character.

---

## Examples

### Example 1:
**Input:** `s = "leetcode"`
**Output:** `0`
**Explanation:** 'l' is first unique.

### Example 2:
**Input:** `s = "loveleetcode"`
**Output:** `2`
**Explanation:** 'v' at index 2 is first unique.

### Example 3:
**Input:** `s = "aabb"`
**Output:** `-1`
**Explanation:** All characters repeat.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 10⁵ |
| Data Type | Lowercase English letters |
| Special Conditions | First occurrence |
| Time Complexity | O(n) |
| Space Complexity | O(1) - 26 letters max |
| Output Format | Index or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Microsoft | 🟡 Apple | 🟢 Zillow |
| 🔵 Google | 🟡 Adobe | 🟢 Yelp |

---

## Follow-up Questions

1. Can you do this in one pass?
2. What if you need first unique in a stream?
3. How would you find all unique characters?
4. What about case-insensitive?
