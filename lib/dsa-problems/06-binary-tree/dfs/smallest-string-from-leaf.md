# Smallest String Starting From Leaf

## Problem Description

**Real-World Scenario:**
A file path generator constructs the canonical path of a file by traversing from the file (leaf) up to the root, choosing the lexicographically smallest path if multiple exist (e.g. symlinks).

**Example Setup:** 
A dictionary word builder constructs words by traversing from leaf to root in a trie-like structure.

**What is Smallest String From Leaf?**
You are given the `root` of a binary tree where each node has a value in the range `[0, 25]` representing the letters `'a'` to `'z'`. Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

**Why is it important?**
- DFS / Recursion
- String building
- Lexicographical comparison
- Tree traversal

**Your Task:** 
Return the smallest string.

**Difficulty:** Medium
**Tags:** Binary Tree, Dfs, Dfs / Recursion, String Building, Lexicographical Comparison, Tree Traversal, O(N), Interview

---

## Examples

### Example 1:
**Input:** `root = [0,1,2,3,4,3,4]`
**Output:** `"dba"`
**Explanation:** 
Paths:
3->1->0 ("dba")
4->1->0 ("eba")
3->2->0 ("dca")
4->2->0 ("eca")
Smallest is "dba".

### Example 2:
**Input:** `root = [25,1,3,1,3,0,2]`
**Output:** `"adz"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 8500 |
| Values | 0 ≤ val ≤ 25 |
| Data Type | Binary Tree |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Grammarly |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Duolingo |
| 🔵 Facebook | 🟡 Apple | 🟢 Scribd |

---

## Follow-up Questions

1. Why pass the current string down the recursion?
2. Why reverse the string at the leaf?
3. How to compare strings lexicographically?
4. Why is BFS not ideal here?
