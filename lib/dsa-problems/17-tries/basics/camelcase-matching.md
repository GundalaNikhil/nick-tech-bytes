# Camelcase Matching

## Problem Description

**Real-World Scenario:**
IDE code completion matching "FB" to "FooBar" or "FrameBuffer".

**Example Setup:** 
Searching for files using CamelCase abbreviations.

**What is Camelcase Matching?**
Given an array of strings `queries` and a string `pattern`, return a boolean array `answer` where `answer[i]` is true if `queries[i]` matches `pattern`, and false otherwise.
A query word matches a given pattern if we can insert lowercase letters into the pattern so that it equals the query. (Meaning, the uppercase characters in the query must match the pattern exactly in order, and any extra characters in the query must be lowercase).

**Why is it important?**
- Trie / Two Pointers
- String Matching
- Pattern Validation

**Your Task:** 
Return boolean array.

---

## Examples

### Example 1:
**Input:** `queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FB"`
**Output:** `[true,false,true,true,false]`
**Explanation:** 
"FooBar" -> "F" + "oo" + "B" + "ar". Matches.
"FooBarTest" -> "F" + "oo" + "B" + "ar" + "T" + "est". "T" not in pattern. False.

### Example 2:
**Input:** `queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBa"`
**Output:** `[true,false,true,false,false]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Queries (n) | 1 ≤ n ≤ 100 |
| Pattern Length | 1 ≤ len ≤ 100 |
| Time Complexity | O(N * L) |
| Space Complexity | O(1) |
| Output Format | Boolean array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 IntelliJ |
| 🔵 Amazon | 🟡 Microsoft | 🟢 VS Code |
| 🔵 Facebook | 🟡 Apple | 🟢 Eclipse |

---

## Follow-up Questions

1. Why use Trie? (Insert pattern into Trie? Or queries? Actually Two Pointers is simpler here).
2. Why Two Pointers? (Iterate query and pattern. If match, advance both. If query is lower, advance query. If query is upper and no match, fail).
3. Can we use Trie for multiple patterns?
