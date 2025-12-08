# Custom Sort String

## Problem Description

**Real-World Scenario:**
A contact list sorter orders names based on a user-defined custom alphabet preference (e.g., prioritizing family members or specific letters).

**Example Setup:** 
A DNA sequencer reorders gene fragments based on a non-standard nucleotide priority order.

**What is Custom Sort String?**
You are given two strings `order` and `s`. All the characters of `order` are unique and were sorted in some custom order previously. Permute the characters of `s` so that they match the order that `order` was sorted. More specifically, if a character `x` occurs before a character `y` in `order`, then `x` should occur before `y` in the permuted string. Return any permutation of `s` that satisfies this property.

**Why is it important?**
- Custom Comparator / Sorting
- Frequency Counting (Bucket Sort)
- String manipulation
- Interview classic

**Your Task:** 
Return the sorted string.

**Difficulty:** Medium
**Tags:** String, Sorting, Custom Comparator / Sorting, Frequency Counting, String Manipulation, Interview Classic, O(N + M), Interview

---

## Examples

### Example 1:
**Input:** `order = "cba", s = "abcd"`
**Output:** `"cbad"`
**Explanation:** "a", "b", "c" appear in order "c", "b", "a". "d" is not in order, so it can be anywhere.

### Example 2:
**Input:** `order = "cbafg", s = "abcd"`
**Output:** `"cbad"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Length | 1 ≤ len ≤ 200 |
| Characters | Lowercase English letters |
| Data Type | String |
| Time Complexity | O(N + M) |
| Space Complexity | O(1) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Pinterest |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Snap |
| 🔵 Google | 🟡 Apple | 🟢 Twitter |

---

## Follow-up Questions

1. Why use a frequency array (count of each char in s)?
2. Why iterate through `order` string first to build result?
3. How to handle characters not in `order`?
4. Can you use a custom comparator with `Arrays.sort`?
