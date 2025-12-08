# Palindrome Pairs

## Problem Description

**Real-World Scenario:**
A bioinformatics tool searches for DNA sequences that can form palindromic structures when combined (hairpin loops).

**Example Setup:** 
Finding word pairs in a dictionary that form a palindrome (e.g., "bat" + "tab" = "battab").

**What is Palindrome Pairs?**
Given a list of unique words, return all the pairs of the distinct indices `(i, j)` in the given list, so that the concatenation of the two words `words[i] + words[j]` is a palindrome.

**Why is it important?**
- Trie
- String Manipulation
- Palindrome Check
- Hard Problem

**Your Task:** 
Return list of pairs.

**Difficulty:** Hard
**Tags:** Tries, Advanced, Trie, String Manipulation, Palindrome Check, Hard, O(N * L^2), Interview

---

## Examples

### Example 1:
**Input:** `words = ["abcd","dcba","lls","s","sssll"]`
**Output:** `[[0,1],[1,0],[3,2],[2,4]]`
**Explanation:** 
"abcd" + "dcba" = "abcddcba"
"dcba" + "abcd" = "dcbaabcd"
"s" + "lls" = "slls"
"lls" + "sssll" = "llssssll"

### Example 2:
**Input:** `words = ["bat","tab","cat"]`
**Output:** `[[0,1],[1,0]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words (n) | 1 ≤ n ≤ 5000 |
| Word Length | 0 ≤ len ≤ 300 |
| Data Type | String array |
| Time Complexity | O(N * L^2) |
| Space Complexity | O(N * L) |
| Output Format | List of Lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Airbnb |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Expedia |
| 🔵 Facebook | 🟡 Apple | 🟢 Booking.com |

---

## Follow-up Questions

1. Why use a Trie? (To efficiently find words that are reverse of current word).
2. Case 1: Exact reverse exists.
3. Case 2: Reverse of suffix exists + prefix is palindrome.
4. Case 3: Reverse of prefix exists + suffix is palindrome.
5. Handling empty string?
