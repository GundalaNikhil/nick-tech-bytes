# Edit Distance (Levenshtein Distance)

## Problem Description

**Real-World Scenario:**
When you type "teh" and spell check suggests "the", it's using edit distance. The algorithm calculates the minimum changes needed to transform one word into another - helping auto-correct know which word you probably meant.

**Example Setup:** 
Raj is building a search feature for his e-commerce app. When users search "samnsug phone", he wants to suggest "samsung phone". He needs to find how "close" a misspelled word is to real product names.

**What is Edit Distance?**
The minimum number of operations (insert, delete, replace) required to convert one string into another. Also known as Levenshtein distance.

**Why is it important?**
- Spell checkers and auto-correct
- DNA sequence alignment
- Plagiarism detection
- Fuzzy string matching
- Search engines

**Your Task:** 
Find the minimum number of operations to convert word1 to word2.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Lcs, Spell Checkers And Auto-Correct, Dna Sequence Alignment, Plagiarism Detection, Fuzzy String Matching, Search Engines, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** `word1 = "horse", word2 = "ros"`
**Output:** `3`
**Operations:** 
1. Replace 'h' with 'r' → "rorse"
2. Remove 'r' → "rose"
3. Remove 'e' → "ros"

### Example 2:
**Input:** `word1 = "intention", word2 = "execution"`
**Output:** `5`
**Explanation:** intention → inention → enention → exention → exection → execution

### Example 3:
**Input:** `word1 = "", word2 = "abc"`
**Output:** `3`
**Explanation:** Insert 3 characters.

### Example 4:
**Input:** `word1 = "abc", word2 = "abc"`
**Output:** `0`
**Explanation:** Strings are identical.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 0 ≤ len ≤ 500 |
| Data Type | Lowercase English letters |
| Operations | Insert, Delete, Replace |
| Time Complexity | O(m × n) |
| Space Complexity | O(min(m, n)) optimized |
| Output Format | Minimum operations count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Databricks |
| 🔵 Facebook | 🟡 Uber | 🟢 Elastic |
| 🔵 Microsoft | 🟡 Twitter | 🟢 Algolia |

---

## Follow-up Questions

1. How would you reconstruct the actual sequence of operations?
2. What if operations have different costs?
3. How is this used in DNA sequence alignment?
4. Can you optimize to O(min(m,n)) space?
