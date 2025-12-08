# Longest Common Prefix

## Problem Description

**Real-World Scenario:**
A file manager auto-completes directory paths. If you've typed "/home/user/doc", it shows the longest common prefix of all matching paths to help you type faster.

**Example Setup:** 
A mobile keyboard predicts words. Given partially typed words by many users, find the longest common beginning that all words share.

**What is Longest Common Prefix?**
Given an array of strings, find the longest string that is a prefix of ALL strings in the array.

**Why is it important?**
- Trie applications
- Autocomplete systems
- DNA sequence analysis
- Database indexing

**Your Task:** 
Return the longest common prefix string.

**Difficulty:** Medium
**Tags:** String, Basic Operations, Trie Applications, Autocomplete Systems, Dna Sequence Analysis, Database Indexing, O(S), Interview

---

## Examples

### Example 1:
**Input:** `strs = ["flower", "flow", "flight"]`
**Output:** `"fl"`
**Explanation:** All three start with "fl".

### Example 2:
**Input:** `strs = ["dog", "racecar", "car"]`
**Output:** `""`
**Explanation:** No common prefix.

### Example 3:
**Input:** `strs = ["a"]`
**Output:** `"a"`
**Explanation:** Single string.

### Example 4:
**Input:** `strs = ["ab", "abc", "abcd"]`
**Output:** `"ab"`
**Explanation:** Shortest string determines max prefix.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 200 |
| String Length | 0 ≤ strs[i].length ≤ 200 |
| Data Type | Lowercase letters |
| Special Conditions | Empty string possible |
| Time Complexity | O(S) where S = sum of all chars |
| Space Complexity | O(1) |
| Output Format | Prefix string |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 Yelp |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Dropbox |
| 🔵 Facebook | 🟡 Uber | 🟢 Indeed |

---

## Follow-up Questions

1. Can you solve using horizontal scanning?
2. Can you use binary search on prefix length?
3. How would a Trie help for multiple queries?
4. What if strings are very long but share short prefix?
