# Camelcase Matching

## Problem Description

**Real-World Scenario:**
A code editor's autocomplete feature filters function names based on CamelCase abbreviations (e.g., "FB" matches "FooBar", "FrameBuffer", etc.).

**Example Setup:** 
A search bar matches user queries against a list of contacts using CamelCase initials.

**What is Camelcase Matching?**
Given an array of strings `queries` and a string `pattern`, return a boolean array `answer` where `answer[i]` is `true` if `queries[i]` matches `pattern`, and `false` otherwise. A query word matches a given pattern if we can insert lowercase letters into the pattern so that it equals the query. You may only insert lowercase letters into the pattern, and you cannot delete any characters from the pattern.

**Why is it important?**
- Trie / Two Pointers
- String matching
- Pattern validation
- Interview classic

**Your Task:** 
Return boolean array.

**Difficulty:** Medium
**Tags:** Trie, Basic, Trie / Two Pointers, String Matching, Pattern Validation, Interview Classic, O(N * L), Interview

---

## Examples

### Example 1:
**Input:** `queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FB"`
**Output:** `[true,false,true,true,false]`
**Explanation:** 
"FooBar": F(oo)B(ar) -> Match.
"FooBarTest": F(oo)B(ar)Test -> 'T' mismatch (cannot insert uppercase).
"FootBall": F(oot)B(all) -> Match.
"FrameBuffer": F(rame)B(uffer) -> Match.
"ForceFeedBack": F(orce)F(eed)B(ack) -> Match? No, pattern is FB. Query has FFB.

### Example 2:
**Input:** `queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBa"`
**Output:** `[true,false,true,false,false]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Queries | 1 ≤ n ≤ 100 |
| Length | 1 ≤ len ≤ 100 |
| Data Type | Mixed case strings |
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

1. Why use Two Pointers for each query?
2. Why check if remaining characters in query are all lowercase?
3. Can you use a Trie if pattern is fixed?
4. What if we could insert uppercase letters too?
