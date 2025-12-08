# Implement Trie II (Prefix Tree)

## Problem Description

**Real-World Scenario:**
A more advanced autocomplete system that not only checks for existence but also counts how many words start with a prefix (for ranking suggestions) and how many times a specific word has been inserted (frequency analysis).

**Example Setup:** 
A search engine indexing words and keeping track of their popularity.

**What is Implement Trie II?**
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
Implement the `Trie` class:
- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `int countWordsEqualTo(String word)` Returns the number of instances of the string `word` in the trie.
- `int countWordsStartingWith(String prefix)` Returns the number of strings in the trie that have the string `prefix` as a prefix.
- `void erase(String word)` Erases the string `word` from the trie.

**Why is it important?**
- Trie Data Structure
- Prefix Counting
- Dynamic Updates (Insert/Erase)

**Your Task:** 
Implement the class.

**Difficulty:** Easy
**Tags:** Tries, Basics, Trie Data Structure, Prefix Counting, Dynamic Updates, O(L), Interview

---

## Examples

### Example 1:
**Input:** 
`insert("apple")`
`insert("apple")`
`countWordsEqualTo("apple")` -> 2
`countWordsStartingWith("app")` -> 2
`erase("apple")`
`countWordsEqualTo("apple")` -> 1
`countWordsStartingWith("app")` -> 1
`erase("apple")`
`countWordsStartingWith("app")` -> 0

---

## Constraints

| Constraint | Value |
|------------|-------|
| Word Length | 1 ≤ length ≤ 2000 |
| Calls | At most 3 * 10^4 calls |
| Characters | Lowercase English letters |
| Time Complexity | O(L) per operation |
| Space Complexity | O(Total Characters) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Duolingo |
| 🔵 Facebook | 🟡 Apple | 🟢 Scribd |

---

## Follow-up Questions

1. How to handle `erase` safely? (Decrement counts, remove nodes if count becomes 0).
2. Difference from standard Trie? (Need `count` at each node for prefix, and `endCount` for exact match).
3. Memory optimization? (Array vs Map for children).
