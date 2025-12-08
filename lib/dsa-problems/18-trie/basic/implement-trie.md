# Implement Trie (Prefix Tree)

## Problem Description

**Real-World Scenario:**
When you type in Google's search box, it instantly suggests completions. This autocomplete feature uses a Trie (prefix tree) to find all words starting with what you've typed.

**Example Setup:** 
A dictionary app needs to support:
1. Add new words
2. Check if a word exists
3. Find all words starting with a prefix
Traditional hash maps can't do efficient prefix search!

**What is a Trie?**
A Trie is a tree-like data structure where each node represents a character. Paths from root to marked nodes form words. Perfect for prefix-based operations.

**Why is it important?**
- Autocomplete systems
- Spell checkers
- IP routing (longest prefix match)
- Word games (Boggle, Scrabble)

**Your Task:** 
Implement a Trie with insert, search, and startsWith methods.

---

## Examples

### Example 1:
**Operations:**
```
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   → true
trie.search("app");     → false
trie.startsWith("app"); → true
trie.insert("app");
trie.search("app");     → true
```

### Example 2:
**Operations:**
```
trie.insert("car");
trie.insert("card");
trie.insert("care");
trie.startsWith("car"); → true
trie.search("car");     → true
```

### Example 3:
**Operations:**
```
trie.search(""); → false (empty string not inserted)
trie.startsWith(""); → true (empty is prefix of all)
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Word Length | 1 ≤ word.length ≤ 2000 |
| Characters | Lowercase English letters |
| Operations | Up to 3 × 10⁴ |
| Special Conditions | All words consist of lowercase letters |
| Time Complexity | O(m) per operation, m = word length |
| Space Complexity | O(ALPHABET_SIZE × m × n) worst case |
| Output Format | Boolean for search/startsWith |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Algolia |
| 🔵 Facebook | 🟡 Twitter | 🟢 Elastic |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Yelp |

---

## Follow-up Questions

1. How would you implement delete operation?
2. How can you optimize space with compressed tries?
3. How would you implement wildcard search (. matches any)?
4. What's the difference between Trie and Suffix Tree?
