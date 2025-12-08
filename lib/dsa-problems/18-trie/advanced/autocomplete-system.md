# Autocomplete System (Trie-based)

## Problem Description

**Real-World Scenario:**
Google's search bar suggests completions as you type. It uses a Trie to store popular queries and returns top suggestions based on frequency as you enter each character.

**Example Setup:** 
A mobile keyboard suggests words as you type. After typing "hel", it suggests "hello", "help", "helicopter" based on how often you've used each word.

**What is Autocomplete System?**
Design a search autocomplete system that:
1. Stores sentences with their occurrence times
2. Returns top 3 suggestions for each prefix typed
3. '#' marks end of input and adds to history

**Why is it important?**
- Real-world system design
- Trie + Priority Queue combo
- Search engines
- Input method editors

**Your Task:** 
Implement AutocompleteSystem with input method returning top 3 suggestions.

---

## Examples

### Example 1:
**Operations:**
```
AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2])
input('i') → ["i love you", "island", "i love leetcode"]
input(' ') → ["i love you", "i love leetcode"]
input('a') → []
input('#') → [] (stores "i a" with count 1)
```

### Example 2:
**Operations:**
```
input('i') → top 3 sentences starting with 'i'
input(' ') → top 3 sentences starting with 'i '
input('l') → top 3 sentences starting with 'i l'
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Sentences | 1 ≤ n ≤ 100 |
| Sentence Length | 1 ≤ len ≤ 100 |
| Input Calls | Up to 5000 |
| Special Conditions | Lowercase letters, space, and '#' |
| Time Complexity | O(p + q log q) per input, p = prefix length, q = matches |
| Space Complexity | O(total characters) |
| Output Format | List of up to 3 strings |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Twitter | 🟢 Algolia |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Elastic |
| 🔵 Microsoft | 🟡 Uber | 🟢 Yelp |

---

## Follow-up Questions

1. How do you handle tie-breaking by ASCII order?
2. How would you prune the Trie over time?
3. What if you need fuzzy matching (typo tolerance)?
4. How would you scale this for millions of queries?
