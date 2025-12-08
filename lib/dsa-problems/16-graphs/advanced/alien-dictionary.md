# Alien Dictionary

## Problem Description

**Real-World Scenario:**
Archaeologists discovered texts in an unknown language. Given some words in sorted order, deduce the ordering of the alien alphabet. This is topological sort on characters!

**Example Setup:** 
A linguist is analyzing a lost civilization's dictionary. The words are sorted in their alphabetical order. From this sorted list, reconstruct the character ordering rules.

**What is Alien Dictionary?**
Given a list of words sorted lexicographically by the rules of an alien language, derive the character order of the alien alphabet.

**Why is it important?**
- Graph construction from constraints
- Topological sorting
- Constraint satisfaction
- Linguistic analysis

**Your Task:** 
Return character order, or "" if invalid.

---

## Examples

### Example 1:
**Input:** `words = ["wrt", "wrf", "er", "ett", "rftt"]`
**Output:** `"wertf"`
**Explanation:** 
- wrt < wrf → t < f
- wrt < er → w < e
- er < ett → r < t
- ett < rftt → e < r

### Example 2:
**Input:** `words = ["z", "x"]`
**Output:** `"zx"`
**Explanation:** z comes before x.

### Example 3:
**Input:** `words = ["z", "x", "z"]`
**Output:** `""`
**Explanation:** Invalid - z < x and x < z is impossible (cycle).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Words | 1 ≤ words.length ≤ 100 |
| Word Length | 1 ≤ word.length ≤ 100 |
| Data Type | Lowercase letters |
| Special Conditions | Must detect invalid orderings |
| Time Complexity | O(C) where C = total characters |
| Space Complexity | O(1) - max 26 characters |
| Output Format | Character order string |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Uber | 🟢 Snap |
| 🔵 Google | 🟡 Airbnb | 🟢 Pinterest |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Yelp |

---

## Follow-up Questions

1. How do you build the graph from word comparisons?
2. What invalidates the ordering (cycle or prefix issue)?
3. Can there be multiple valid orderings?
4. How would you handle equal words?
