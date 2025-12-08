# Minimum Window Substring

## Problem Description

**Real-World Scenario:**
A DNA sequence analyzer finds the shortest segment of a DNA strand that contains a specific set of markers (nucleotides).

**Example Setup:** 
Finding the smallest snippet of a document that contains all the search terms.

**What is Minimum Window Substring?**
Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.
The testcases will be generated such that the answer is unique.

**Why is it important?**
- Sliding Window (Variable Size)
- Two Pointers
- Hash Map / Frequency Array
- String Manipulation

**Your Task:** 
Return shortest substring.

**Difficulty:** Hard
**Tags:** Sliding Window, Hard, Two Pointers, Hash Map / Frequency Array, String Manipulation, O(M + N), Interview

---

## Examples

### Example 1:
**Input:** `s = "ADOBECODEBANC", t = "ABC"`
**Output:** `"BANC"`
**Explanation:** The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

### Example 2:
**Input:** `s = "a", t = "a"`
**Output:** `"a"`

### Example 3:
**Input:** `s = "a", t = "aa"`
**Output:** `""`
**Explanation:** t requires two 'a's, s only has one.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Lengths | 1 ≤ m, n ≤ 10^5 |
| Characters | English letters |
| Time Complexity | O(M + N) |
| Space Complexity | O(1) (since char set is fixed) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Airbnb |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. How to check if window is valid efficiently? (Maintain a count of "required" characters satisfied).
2. When to expand vs shrink window? (Expand until valid, then shrink to minimize).
3. Handling duplicates in `t`? (Frequency map handles this naturally).
4. Optimization? (Filter `s` to only relevant chars first? Usually not needed).
