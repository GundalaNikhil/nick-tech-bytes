# Concatenated Words

## Problem Description

**Real-World Scenario:**
A dictionary analysis tool identifies compound words that are formed entirely by combining other shorter words from the same dictionary.

**Example Setup:** 
A language learning app highlights "supercalifragilisticexpialidocious" if it's composed of smaller valid words in the database.

**What is Concatenated Words?**
Given an array of strings `words` (without duplicates), return all the concatenated words in the given list of words. A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.

**Why is it important?**
- DP / DFS with Memoization
- Trie optimization
- String composition
- Hard interview problem

**Your Task:** 
Return list of concatenated words.

**Difficulty:** Medium
**Tags:** Dynamic Programming, String Dp, Dp / Dfs With Memoization, Trie Optimization, String Composition, Hard Interview, O(N * L^2), Interview

---

## Examples

### Example 1:
**Input:** `words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]`
**Output:** `["catsdogcats","dogcatsdog","ratcatdogcat"]`
**Explanation:** "catsdogcats" = "cats"+"dog"+"cats".

### Example 2:
**Input:** `words = ["cat","dog","catdog"]`
**Output:** `["catdog"]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Word Count | 1 ≤ words.length ≤ 10⁴ |
| Word Length | 0 ≤ words[i].length ≤ 30 |
| Total Length | Sum ≤ 10⁵ |
| Data Type | Lowercase letters |
| Time Complexity | O(N * L^2) or O(N * L) with Trie |
| Space Complexity | O(N * L) |
| Output Format | List of strings |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Pinterest |
| 🔵 Google | 🟡 Apple | 🟢 Snap |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Twitter |

---

## Follow-up Questions

1. Why sort words by length?
2. How is this related to Word Break?
3. Why use a HashSet for fast lookup?
4. Can you use a Trie to optimize prefix matching?
