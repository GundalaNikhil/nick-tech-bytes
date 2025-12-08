# Short Encoding of Words

## Problem Description

**Real-World Scenario:**
Compressing a list of words by storing them in a way that suffixes are shared (e.g., "time" and "me" can be stored as "time#").

**Example Setup:** 
Storing DNA sequences where some are suffixes of others.

**What is Short Encoding of Words?**
A valid encoding of an array of `words` is any reference string `s` and array of indices `indices` such that:
- `words.length == indices.length`
- The reference string `s` ends with the '#' character.
- For each index `indices[i]`, the substring of `s` starting from `indices[i]` and up to (but not including) the next '#' character is equal to `words[i]`.
Given an array of `words`, return the length of the shortest reference string `s` possible of any valid encoding of `words`.

**Why is it important?**
- Trie (Reverse Insertion)
- Suffix Tree
- String Compression

**Your Task:** 
Return length of encoding.

---

## Examples

### Example 1:
**Input:** `words = ["time", "me", "bell"]`
**Output:** `10`
**Explanation:** A valid encoding would be s = "time#bell#" and indices = [0, 2, 5].
words[0] = "time", s[0..4] = "time"
words[1] = "me", s[2..4] = "me"
words[2] = "bell", s[5..9] = "bell"

### Example 2:
**Input:** `words = ["t"]`
**Output:** `2`
**Explanation:** "t#"

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words (n) | 1 ≤ n ≤ 2000 |
| Word Length | 1 ≤ len ≤ 7 |
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

1. Why insert words in reverse? (To identify if one word is a suffix of another).
2. Why sum the lengths of leaves? (Only words that are not suffixes of other words contribute to the length).
3. Why add 1 for '#'?
4. Sorting approach? (Sort reverse strings).
