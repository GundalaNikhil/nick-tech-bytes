# Design Add and Search Words Data Structure

## Problem Description

**Real-World Scenario:**
A dictionary app supports wildcards: searches like "b.d" match "bad", "bed", "bid". Implement efficient pattern matching.

**Example Setup:** 
A crossword puzzle helper finds words matching patterns with blanks (wildcards).

**What is Add and Search Words?**
Design a data structure supporting addWord(word) and search(word). Search can contain '.' which matches any letter.

**Why is it important?**
- Trie with wildcards
- Pattern matching
- DFS in Trie
- Dictionary applications

**Your Task:** 
Implement WordDictionary with addWord and search.

---

## Examples

### Example 1:
**Operations:**
```
WordDictionary dict = new WordDictionary()
dict.addWord("bad")
dict.addWord("dad")
dict.addWord("mad")
dict.search("pad")   // false
dict.search("bad")   // true
dict.search(".ad")   // true (matches bad, dad, mad)
dict.search("b..")   // true (matches bad)
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Word Length | 1 ≤ word.length ≤ 25 |
| Characters | Lowercase letters and '.' in search |
| Operations | Up to 10⁴ calls |
| Data Type | Trie structure |
| Time Complexity | O(m) add, O(26^dots × m) search |
| Space Complexity | O(total characters) |
| Output Format | Boolean for search |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 NY Times |
| 🔵 Amazon | 🟡 Apple | 🟢 Merriam-Webster |
| 🔵 Google | 🟡 Microsoft | 🟢 Dictionary.com |

---

## Follow-up Questions

1. How do you handle '.' in search (DFS)?
2. What's the worst case for many wildcards?
3. How does this differ from simple Trie search?
4. Can you optimize with pruning?
