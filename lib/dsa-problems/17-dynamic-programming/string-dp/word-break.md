# Word Break

## Problem Description

**Real-World Scenario:**
Text messages sometimes arrive without spaces: "ilovecoding". A smart keyboard needs to figure out if this can be split into valid words: "i love coding".

**Example Setup:** 
A URL shortener receives long strings and needs to verify if they can be broken into meaningful words for SEO purposes.

**What is Word Break?**
Given a string s and a dictionary of words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

**Why is it important?**
- Natural language processing
- DP on strings
- Dictionary-based problems
- Search engine optimization

**Your Task:** 
Return true if the string can be segmented into dictionary words.

**Difficulty:** Medium
**Tags:** Dynamic Programming, String Dp, Natural Language Processing, Dp On Strings, Dictionary-Based Problems, Search Engine Optimization, O(n² × m), Interview

---

## Examples

### Example 1:
**Input:** `s = "leetcode", wordDict = ["leet", "code"]`
**Output:** `true`
**Explanation:** "leetcode" = "leet" + "code"

### Example 2:
**Input:** `s = "applepenapple", wordDict = ["apple", "pen"]`
**Output:** `true`
**Explanation:** "apple" + "pen" + "apple"

### Example 3:
**Input:** `s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]`
**Output:** `false`
**Explanation:** No valid segmentation exists.

### Example 4:
**Input:** `s = "cars", wordDict = ["car", "ca", "rs"]`
**Output:** `true`
**Explanation:** "ca" + "rs" or could try "car" + "s" (fails).

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 300 |
| Dictionary Size | 1 ≤ wordDict.length ≤ 1000 |
| Word Length | 1 ≤ word.length ≤ 20 |
| Data Type | Lowercase English letters |
| Special Conditions | Same word reusable |
| Time Complexity | O(n² × m) where m = max word length |
| Space Complexity | O(n) for DP array |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Quora |
| 🔵 Amazon | 🟡 Uber | 🟢 Yelp |
| 🔵 Google | 🟡 Apple | 🟢 Pinterest |

---

## Follow-up Questions

1. What's the DP recurrence?
2. Can you use a Trie for word lookup?
3. How would you return all valid segmentations (Word Break II)?
4. Why does BFS/memoization work here?
