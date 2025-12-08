# Replace Words

## Problem Description

**Real-World Scenario:**
A text normalizer replaces derivative words with their root forms (stems) to standardize text for NLP processing.

**Example Setup:** 
A URL shortener replaces long path segments with registered short aliases if they start with a known prefix.

**What is Replace Words?**
In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another". Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.

**Why is it important?**
- Trie application
- Prefix matching
- String processing
- Tokenization

**Your Task:** 
Return the modified sentence.

**Difficulty:** Medium
**Tags:** Trie, Basic, Trie Application, Prefix Matching, String Processing, Tokenization, O(N * L), Interview

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
| Dictionary | 1 ≤ dict.length ≤ 1000 |
| Sentence | 1 ≤ words ≤ 1000 |
| Word Length | 1 ≤ length ≤ 100 |
| Data Type | Lowercase letters |
| Time Complexity | O(N * L) where N is sentence words |
| Space Complexity | O(D * L) for Trie |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 Yelp |

---

## Follow-up Questions

1. Why is Trie better than HashSet for finding shortest prefix?
2. How do you mark the end of a root in the Trie?
3. What if the sentence is very large (streaming)?
4. How to handle punctuation?
