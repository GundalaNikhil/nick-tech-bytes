# Replace Words

## Problem Description

**Real-World Scenario:**
A text normalizer replaces derived words with their root form (stemming) to standardize text for analysis.

**Example Setup:** 
Auto-correct system replacing "batteries" with "battery".

**What is Replace Words?**
In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another".
Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.
Return the sentence after the replacement.

**Why is it important?**
- Trie (Shortest Prefix)
- String Tokenization
- Efficient Lookup

**Your Task:** 
Return modified sentence.

---

## Examples

### Example 1:
**Input:** `dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"`
**Output:** `"the cat was rat by the bat"`

### Example 2:
**Input:** `dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"`
**Output:** `"a a b c"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Dictionary (n) | 1 ≤ n ≤ 1000 |
| Sentence Length | 1 ≤ len ≤ 10^6 |
| Time Complexity | O(N * L + S) |
| Space Complexity | O(N * L) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 Snap |

---

## Follow-up Questions

1. Why Trie? (Find shortest prefix efficiently).
2. Why not HashSet? (Need to check all prefixes of each word in sentence).
3. How to handle multiple roots? (Stop at the first/shortest match in Trie).
