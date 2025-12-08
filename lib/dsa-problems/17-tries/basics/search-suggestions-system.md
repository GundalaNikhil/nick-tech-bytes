# Search Suggestions System

## Problem Description

**Real-World Scenario:**
A search bar on an e-commerce site that suggests up to 3 products as you type each character of your query.

**Example Setup:** 
Mobile phone keyboard suggesting the next word or completing the current word.

**What is Search Suggestions System?**
You are given an array of strings `products` and a string `searchWord`.
Design a system that suggests at most three product names from `products` after each character of `searchWord` is typed. Suggested products should have common prefix with the searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.
Return a list of lists of the suggested products after each character of `searchWord` is typed.

**Why is it important?**
- Trie with Buffer/Cache
- Sorting / Priority Queue
- Binary Search (alternative)
- String Manipulation

**Your Task:** 
Return list of suggestions.

---

## Examples

### Example 1:
**Input:** `products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"`
**Output:** 
`[
["mobile","moneypot","monitor"],
["mobile","moneypot","monitor"],
["mouse","mousepad"],
["mouse","mousepad"],
["mouse","mousepad"]
]`
**Explanation:** 
"m": ["mobile","moneypot","monitor"] (sorted: mobile, moneypot, monitor, mouse, mousepad)
"mo": ["mobile","moneypot","monitor"]
"mou": ["mouse","mousepad"]
...

### Example 2:
**Input:** `products = ["havana"], searchWord = "havana"`
**Output:** `[["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Products (n) | 1 ≤ n ≤ 1000 |
| Product Length | 1 ≤ len ≤ 3000 |
| SearchWord Length | 1 ≤ len ≤ 1000 |
| Time Complexity | O(N log N + M * L) |
| Space Complexity | O(N * L) |
| Output Format | List of Lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Shopify |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Wayfair |
| 🔵 Facebook | 🟡 Apple | 🟢 Etsy |

---

## Follow-up Questions

1. Why sort products first? (Simplifies finding top 3).
2. Trie vs Binary Search? (Trie is O(L) per char, BS is O(L log N)).
3. How to store top 3 in Trie node? (Pre-computation vs DFS at query time).
4. What if the dataset is huge (millions)? (Inverted index, database, not in-memory Trie).
