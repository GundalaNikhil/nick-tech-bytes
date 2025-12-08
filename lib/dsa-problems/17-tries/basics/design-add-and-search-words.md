# Design Add and Search Words Data Structure

## Problem Description

**Real-World Scenario:**
A crossword puzzle helper that allows searching for words with wildcards (e.g., "b.t" matches "bat", "bet", "bit").

**Example Setup:** 
File search with glob patterns (e.g., "*.txt").

**What is Design Add and Search Words Data Structure?**
Design a data structure that supports adding new words and finding if a string matches any previously added string.
Implement the `WordDictionary` class:
- `WordDictionary()` Initializes the object.
- `void addWord(word)` Adds `word` to the data structure, it can be matched later.
- `bool search(word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `'.'` where dots can be matched with any letter.

**Why is it important?**
- Trie with DFS
- Wildcard Matching
- Recursion

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** 
`addWord("bad")`
`addWord("dad")`
`addWord("mad")`
`search("pad")` -> false
`search("bad")` -> true
`search(".ad")` -> true
`search("b..")` -> true

---

## Constraints

| Constraint | Value |
|------------|-------|
| Word Length | 1 ≤ len ≤ 25 |
| Calls | At most 10^4 calls |
| Characters | Lowercase English letters and '.' |
| Time Complexity | O(M) for add, O(M * 26^M) for search |
| Space Complexity | O(N * M) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yelp |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Pinterest |
| 🔵 Facebook | 🟡 Apple | 🟢 Twitter |

---

## Follow-up Questions

1. How to handle the dot `.`? (Iterate over all 26 children).
2. Why is search slower than standard Trie? (Branching factor).
3. Optimization? (Store max word length to prune early).
