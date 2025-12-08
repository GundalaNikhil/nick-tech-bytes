# Short Encoding of Words

## Problem Description

**Real-World Scenario:**
A data compression algorithm stores a list of words in a single string by overlapping suffixes to save space (e.g., "time" and "me" stored as "time#").

**Example Setup:** 
A dictionary storage system minimizes space by removing words that are suffixes of other words.

**What is Short Encoding of Words?**
A valid encoding of an array of `words` is any reference string `s` and array of indices `indices` such that:
- `words.length == indices.length`
- The reference string `s` ends with the '#' character.
- For each index `indices[i]`, the substring of `s` starting from `indices[i]` and up to (but not including) the next '#' character is equal to `words[i]`.
Return the length of the shortest reference string `s` possible of any valid encoding of `words`.

**Why is it important?**
- Trie (Suffix Trie)
- HashSet
- String manipulation
- Optimization

**Your Task:** 
Return minimum length.

**Difficulty:** Medium
**Tags:** Trie, Basic, Hashset, String Manipulation, Optimization, O(N * L), Interview

---

## Examples

### Example 1:
**Input:** `words = ["time", "me", "bell"]`
**Output:** `10`
**Explanation:** s = "time#bell#". indices = [0, 2, 5]. "me" is a suffix of "time".

### Example 2:
**Input:** `words = ["t"]`
**Output:** `2`
**Explanation:** "t#"

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words | 1 ≤ n ≤ 2000 |
| Length | 1 ≤ len ≤ 7 |
| Data Type | Lowercase letters |
| Time Complexity | O(N * L) |
| Space Complexity | O(N * L) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Dropbox |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Box |
| 🔵 Facebook | 🟡 Apple | 🟢 Evernote |

---

## Follow-up Questions

1. Why insert words into a Trie in reverse?
2. Why count only leaves of the Trie?
3. How to use a HashSet to remove suffixes?
4. What if we wanted to reconstruct the string?
