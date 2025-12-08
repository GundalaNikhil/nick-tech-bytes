# Palindrome Pairs

## Problem Description

**Real-World Scenario:**
A compound word generator finds pairs of words that form a palindrome when concatenated, for naming products or domains.

**Example Setup:** 
A bioinformatics tool identifies pairs of DNA fragments that form a palindromic sequence when joined.

**What is Palindrome Pairs?**
Given a list of unique words, return all the pairs of the distinct indices `(i, j)` in the given list, so that the concatenation of the two words `words[i] + words[j]` is a palindrome.

**Why is it important?**
- Trie / Hash Map
- String manipulation
- Palindrome checking optimization
- Hard string problem

**Your Task:** 
Return list of index pairs.

---

## Examples

### Example 1:
**Input:** `words = ["abcd","dcba","lls","s","sssll"]`
**Output:** `[[0,1],[1,0],[3,2],[2,4]]`
**Explanation:** "abcd"+"dcba", "dcba"+"abcd", "s"+"lls", "lls"+"sssll".

### Example 2:
**Input:** `words = ["bat","tab","cat"]`
**Output:** `[[0,1],[1,0]]`

### Example 3:
**Input:** `words = ["a",""]`
**Output:** `[[0,1],[1,0]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words Count | 1 ≤ words.length ≤ 5000 |
| Word Length | 0 ≤ words[i].length ≤ 300 |
| Total Length | Sum of lengths ≤ 3 × 10⁵ |
| Data Type | Lowercase letters |
| Time Complexity | O(N * K^2) where K is max word length |
| Space Complexity | O(N * K) |
| Output Format | List of index pairs |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Airbnb |
| 🔵 Amazon | 🟡 Uber | 🟢 Square |
| 🔵 Facebook | 🟡 Apple | 🟢 Pinterest |

---

## Follow-up Questions

1. Why check prefixes and suffixes for palindromes?
2. How does a Trie help optimize the search?
3. How to handle the empty string case?
4. What if words are very long?
