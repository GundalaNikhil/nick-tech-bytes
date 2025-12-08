# Design Search Autocomplete System

## Problem Description

**Real-World Scenario:**
A search engine suggests the top 3 historical queries that start with the user's current input prefix, updating frequencies in real-time.

**Example Setup:** 
A command-line shell suggests the most frequently used commands matching the current typed prefix.

**What is Design Search Autocomplete System?**
Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character '#'). For each character they type except '#', you need to return the top 3 historical hot sentences that have prefix the same as the part of sentence already typed. Here are the specific rules:
1. The hot degree for a sentence is defined as the number of times a user typed this exactly before.
2. The returned top 3 hot sentences should be sorted by hot degree (The first is the hottest one). If several sentences have the same degree of hot, you need to use ASCII-code order (smaller one appears first).
3. If less than 3 hot sentences exist, then just return as many as you can.
4. When the input is a special character, it means the sentence ends, and in this case, you need to return an empty list.

**Why is it important?**
- Trie with Metadata
- Priority Queue / Sorting
- System Design (Real-time updates)
- String processing

**Your Task:** 
Implement `AutocompleteSystem` class.

**Difficulty:** Hard
**Tags:** Trie, Advanced, Trie With Metadata, Priority Queue / Sorting, System Design, String Processing, O(L), Interview

---

## Examples

### Example 1:
**Operations:**
```
AutocompleteSystem obj = new AutocompleteSystem(["i love you", "island", "ironman", "i love leetcode"], [5, 3, 2, 2]);
obj.input('i'); // return ["i love you", "island", "i love leetcode"]
obj.input(' '); // return ["i love you", "i love leetcode"]
obj.input('a'); // return []
obj.input('#'); // return []
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Sentences | 1 ≤ n ≤ 100 |
| Length | 1 ≤ len ≤ 100 |
| Calls | At most 5000 |
| Data Type | String stream |
| Time Complexity | O(L) per input |
| Space Complexity | O(N * L) |
| Output Format | List of strings |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Pinterest |
| 🔵 Facebook | 🟡 Apple | 🟢 Yelp |

---

## Follow-up Questions

1. Why store top 3 results at each Trie node (caching)?
2. How to handle updates (increment frequency)?
3. Why is Trie better than HashMap for prefix search?
4. What if the dataset is too large for memory?
