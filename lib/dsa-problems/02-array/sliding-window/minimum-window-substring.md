# Minimum Window Substring

## Problem Description

**Real-World Scenario:**
A search engine highlights the shortest text snippet containing all search keywords. Given a document and query words, find the minimum window containing all query terms.

**Example Setup:** 
A DNA analysis tool finds the shortest gene segment containing all target markers. This is critical for identifying gene patterns.

**What is Minimum Window Substring?**
Given strings s and t, find the minimum window in s that contains all characters of t (including duplicates). Return empty string if no such window exists.

**Why is it important?**
- Sliding window classic
- Character frequency matching
- Search engine snippets
- Substring optimization

**Your Task:** 
Return the minimum window substring.

**Difficulty:** Medium
**Tags:** Array, Sliding Window, Sliding Window Classic, Character Frequency Matching, Search Engine Snippets, Substring Optimization, O(s + t), Interview

---

## Examples

### Example 1:
**Input:** `s = "ADOBECODEBANC", t = "ABC"`
**Output:** `"BANC"`
**Explanation:** Shortest window containing A, B, C.

### Example 2:
**Input:** `s = "a", t = "a"`
**Output:** `"a"`
**Explanation:** Exact match.

### Example 3:
**Input:** `s = "a", t = "aa"`
**Output:** `""`
**Explanation:** Need two 'a's, only have one.

---

## Constraints

| Constraint | Value |
|------------|-------|
| S Length | 1 ≤ s.length ≤ 10⁵ |
| T Length | 1 ≤ t.length ≤ 10⁵ |
| Data Type | English letters (upper and lowercase) |
| Special Conditions | Answer is unique |
| Time Complexity | O(s + t) |
| Space Complexity | O(s + t) for hash maps |
| Output Format | Substring or empty |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Algolia |
| 🔵 Amazon | 🟡 Uber | 🟢 Elastic |
| 🔵 Google | 🟡 LinkedIn | 🟢 Yelp |

---

## Follow-up Questions

1. How do you track "formed" characters count?
2. When to shrink vs expand window?
3. How to handle duplicate characters in t?
4. Can you optimize with filtered s?
