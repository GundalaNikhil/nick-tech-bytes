# Concatenated Words

## Problem Description

**Real-World Scenario:**
A linguistic analyzer identifies compound words that are formed entirely by other smaller words in the dictionary (e.g., "doghouse" from "dog" and "house").

**Example Setup:** 
Decomposing a long transaction ID into valid sub-IDs.

**What is Concatenated Words?**
Given an array of strings `words` (without duplicates), return all the concatenated words in the given list of `words`.
A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.

**Why is it important?**
- Trie + DFS/Memoization
- Dynamic Programming
- Word Break Problem Variation
- String Processing

**Your Task:** 
Return list of concatenated words.

---

## Examples

### Example 1:
**Input:** `words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]`
**Output:** `["catsdogcats","dogcatsdog","ratcatdogcat"]`
**Explanation:** 
"catsdogcats" = "cats" + "dog" + "cats"
"dogcatsdog" = "dog" + "cats" + "dog"
"ratcatdogcat" = "rat" + "cat" + "dog" + "cat"

### Example 2:
**Input:** `words = ["cat","dog","catdog"]`
**Output:** `["catdog"]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words (n) | 1 ≤ n ≤ 10^4 |
| Word Length | 1 ≤ len ≤ 30 |
| Data Type | String array |
| Time Complexity | O(N * L^2) |
| Space Complexity | O(N * L) |
| Output Format | String list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Duolingo |
| 🔵 Facebook | 🟡 Apple | 🟢 Scribd |

---

## Follow-up Questions

1. Why sort words by length? (Shorter words form longer words).
2. Why use a Set or Trie for fast lookup?
3. Relationship to "Word Break"? (Same logic, applied to each word using other words).
4. Optimization: Only add words to the dictionary after checking if they can be formed? (Or just check against all).
