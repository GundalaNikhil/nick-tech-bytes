# Word Break II

## Problem Description

**Real-World Scenario:**
An auto-complete system returns all possible sentence segmentations from a string without spaces using a dictionary.

**Example Setup:** 
A domain name squatting detector finds all possible word breakdowns of a domain like "expertsexchange" → ["expert sex change", "experts exchange"].

**What is Word Break II?**
Given a string and dictionary, return all possible sentences by adding spaces such that each word is in the dictionary.

**Why is it important?**
- Backtracking with memoization
- DP + recursion
- Natural language processing
- All solutions enumeration

**Your Task:** 
Return all possible valid sentences.

**Difficulty:** Medium
**Tags:** Dynamic Programming, String Dp, Backtracking With Memoization, Dp + Recursion, Natural Language Processing, All Solutions Enumeration, Exponential (With Pruning), Interview

---

## Examples

### Example 1:
**Input:** `s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]`
**Output:** `["cats and dog", "cat sand dog"]`

### Example 2:
**Input:** `s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]`
**Output:** `["pine apple pen apple","pineapple pen apple","pine applepen apple"]`

### Example 3:
**Input:** `s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]`
**Output:** `[]`
**Explanation:** No valid sentence.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 20 |
| Dictionary Size | 1 ≤ wordDict.length ≤ 1000 |
| Word Length | 1 ≤ word.length ≤ 10 |
| Data Type | Lowercase letters |
| Time Complexity | Exponential (with pruning) |
| Space Complexity | O(n²) with memo |
| Output Format | List of sentences |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Uber | 🟢 Quillbot |
| 🔵 Facebook | 🟡 Apple | 🟢 ProWritingAid |

---

## Follow-up Questions

1. How does memoization help here?
2. What's the difference from Word Break I?
3. Why prune with DP first (check if possible)?
4. What about Trie optimization?
