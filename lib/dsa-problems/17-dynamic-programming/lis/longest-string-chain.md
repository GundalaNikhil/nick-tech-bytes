# Longest String Chain

## Problem Description

**Real-World Scenario:**
A word game finds the longest sequence of words where each word is formed by adding exactly one letter to the previous word.

**Example Setup:** 
A genetic mutation tracker finds the longest evolutionary path where each step involves a single nucleotide insertion.

**What is Longest String Chain?**
You are given an array of `words` where each word consists of lowercase English letters. `wordA` is a predecessor of `wordB` if and only if we can insert exactly one letter anywhere in `wordA` without changing the order of the other characters to make it equal to `wordB`. Return the length of the longest possible word chain with words chosen from the given list of `words`.

**Why is it important?**
- DP (LIS variant)
- HashMap
- String manipulation
- Sorting by length

**Your Task:** 
Return max length.

---

## Examples

### Example 1:
**Input:** `words = ["a","b","ba","bca","bda","bdca"]`
**Output:** `4`
**Explanation:** "a" -> "ba" -> "bda" -> "bdca".

### Example 2:
**Input:** `words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]`
**Output:** `5`
**Explanation:** "xb" -> "xbc" -> "cxbc" -> "pcxbc" -> "pcxbcf".

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words | 1 ≤ n ≤ 1000 |
| Length | 1 ≤ len ≤ 16 |
| Data Type | String array |
| Time Complexity | O(N * L^2) |
| Space Complexity | O(N) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Duolingo |
| 🔵 Facebook | 🟡 Apple | 🟢 Scribd |

---

## Follow-up Questions

1. Why sort words by length?
2. Why try removing one character from current word to find predecessor?
3. Why is HashMap better than O(N^2) comparison here?
4. What if we could delete characters (Longest Predecessor Chain)?
