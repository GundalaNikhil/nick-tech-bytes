# Smallest String With Swaps

## Problem Description

**Real-World Scenario:**
A data encryptor scrambles a string by allowing swaps only between specific pairs of positions. You want to find the lexicographically smallest string possible to verify the "canonical" form.

**Example Setup:** 
Sorting a list of items where only certain adjacent swaps are allowed (like a constrained bubble sort).

**What is Smallest String With Swaps?**
You are given a string `s`, and an array of pairs of indices in the string `pairs` where `pairs[i] = [a, b]` indicates that you can swap the characters at indices `a` and `b`.
Any pair of characters at indices `pairs[i][0]` and `pairs[i][1]` can be swapped any number of times.
Return the lexicographically smallest string that `s` can be changed to after using the swaps.

**Why is it important?**
- Union-Find (Connected Components)
- Sorting within Components
- Graph Theory

**Your Task:** 
Return smallest string.

**Difficulty:** Medium
**Tags:** Graphs, Union Find, Union-Find, Sorting Within Components, Graph Theory, O(N log N), Interview

---

## Examples

### Example 1:
**Input:** `s = "dcab", pairs = [[0,3],[1,2]]`
**Output:** `bacd`
**Explanation:** 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"

### Example 2:
**Input:** `s = "dcab", pairs = [[0,3],[1,2],[0,2]]`
**Output:** `abcd`
**Explanation:** All indices are connected. Sort entire string.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10^5 |
| Pairs | 0 ≤ pairs.length ≤ 10^5 |
| Data Type | String and List of Lists |
| Time Complexity | O(N log N) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 ByteDance |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Expedia |
| 🔵 Facebook | 🟡 Apple | 🟢 Morgan Stanley |

---

## Follow-up Questions

1. Why do connected components matter? (Indices in the same component can be permuted freely).
2. Algorithm: Find components -> Collect chars -> Sort chars -> Place back.
3. Why Union-Find?
4. What if pairs are directed? (Much harder).
