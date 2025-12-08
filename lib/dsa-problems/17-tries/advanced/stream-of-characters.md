# Stream of Characters

## Problem Description

**Real-World Scenario:**
A content moderation system monitors a live stream of chat messages and flags any forbidden words (profanity filter) as soon as they are typed.

**Example Setup:** 
A DNA sequencer monitoring a stream of nucleotides for specific gene markers.

**What is Stream of Characters?**
Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings `words`.
For example, if `words = ["abc", "xyz"]` and the stream adds the character 'a', then 'b', then 'c', your algorithm should detect that the suffix "abc" matches a word.
Implement the `StreamChecker` class:
- `StreamChecker(String[] words)` Initializes the object with the strings `words`.
- `boolean query(char letter)` Accepts a new character from the stream and returns `true` if any non-empty suffix from the stream forms a word that is in `words`.

**Why is it important?**
- Trie (Reverse Order)
- Aho-Corasick Algorithm (Advanced)
- Suffix Matching
- Real-time Processing

**Your Task:** 
Implement the class.

**Difficulty:** Hard
**Tags:** Tries, Advanced, Trie, Aho-Corasick Algorithm, Suffix Matching, Real-Time Processing, O(L), Interview

---

## Examples

### Example 1:
**Input:** 
`StreamChecker(["cd", "f", "kl"])`
`query('a')` -> false
`query('b')` -> false
`query('c')` -> false
`query('d')` -> true (suffix "cd")
`query('e')` -> false
`query('f')` -> true (suffix "f")
`query('g')` -> false
`query('h')` -> false
`query('i')` -> false
`query('j')` -> false
`query('k')` -> false
`query('l')` -> true (suffix "kl")

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words (n) | 1 ≤ n ≤ 2000 |
| Word Length | 1 ≤ len ≤ 2000 |
| Queries | At most 4 * 10^4 |
| Time Complexity | O(L) per query (L = max word length) |
| Space Complexity | O(N * L) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitch |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Discord |
| 🔵 Facebook | 🟡 Apple | 🟢 Slack |

---

## Follow-up Questions

1. Why insert words into the Trie in reverse? (To match suffixes easily from the end of the stream).
2. How much history do you need to keep? (Only up to the length of the longest word).
3. Aho-Corasick vs Reverse Trie? (AC is O(1) amortized, Reverse Trie is O(L)).
4. Memory usage?
