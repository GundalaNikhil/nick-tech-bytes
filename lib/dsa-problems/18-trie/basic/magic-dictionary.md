# Implement Magic Dictionary

## Problem Description

**Real-World Scenario:**
A spell checker suggests words that are "one edit distance" away (specifically one character change) from a misspelled word.

**Example Setup:** 
A fuzzy search engine finds words that match a query with exactly one character mismatch.

**What is Implement Magic Dictionary?**
Design a data structure that is initialized with a list of different words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.

**Why is it important?**
- Trie / HashMap
- Fuzzy matching
- String manipulation
- Search optimization

**Your Task:** 
Implement `MagicDictionary` with `buildDict` and `search`.

**Difficulty:** Medium
**Tags:** Trie, Basic, Trie / Hashmap, Fuzzy Matching, String Manipulation, Search Optimization, O(N * L), Interview

---

## Examples

### Example 1:
**Operations:**
```
MagicDictionary magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
magicDictionary.search("hello"); // return False (must change exactly one char)
magicDictionary.search("hhllo"); // return True (change 'h' to 'e')
magicDictionary.search("hell");  // return False (length mismatch)
magicDictionary.search("leetcoded"); // return False
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Dictionary Size | 1 ≤ words.length ≤ 100 |
| Word Length | 1 ≤ word.length ≤ 100 |
| Search Calls | At most 100 calls |
| Data Type | Lowercase letters |
| Time Complexity | O(N * L) build, O(L * 26) search |
| Space Complexity | O(N * L) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yelp |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Grammarly |
| 🔵 Facebook | 🟡 Apple | 🟢 Duolingo |

---

## Follow-up Questions

1. Why use a Trie for efficient search?
2. How to implement recursive search with `mismatchCount`?
3. Can you use a HashMap with generalized neighbors (e.g., "*ello", "h*llo")?
4. What if we allowed k mismatches?
