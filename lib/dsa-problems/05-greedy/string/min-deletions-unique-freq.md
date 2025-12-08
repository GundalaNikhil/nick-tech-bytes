# Minimum Deletions to Make Character Frequencies Unique

## Problem Description

**Real-World Scenario:**
A data compression tool adjusts character frequencies to ensure a unique Huffman coding tree structure? No.
Better: A load balancer ensures that no two servers have the exact same load count by shedding minimal load.

**Example Setup:** 
A histogram equalizer modifies bar heights so that no two bars have the same height (except zero) by reducing heights.

**What is Min Deletions...?**
A string `s` is called good if there are no two different characters in `s` that have the same frequency. Given a string `s`, return the minimum number of characters you need to delete to make `s` good.

**Why is it important?**
- Greedy Strategy
- Sorting / HashSet
- Frequency counting
- Optimization

**Your Task:** 
Return minimum deletions.

---

## Examples

### Example 1:
**Input:** `s = "aab"`
**Output:** `0`
**Explanation:** 'a': 2, 'b': 1. Unique.

### Example 2:
**Input:** `s = "aaabbbcc"`
**Output:** `2`
**Explanation:** 'a': 3, 'b': 3, 'c': 2. Delete one 'b' -> 2. Now 'b': 2, 'c': 2. Delete one 'c' -> 1. Freqs: 3, 2, 1. Total 2.

### Example 3:
**Input:** `s = "ceabaacb"`
**Output:** `2`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| Characters | Lowercase English letters |
| Data Type | String |
| Time Complexity | O(N) |
| Space Complexity | O(1) (26 chars) |
| Output Format | Integer deletions |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Tesla |
| 🔵 Amazon | 🟡 Apple | 🟢 Waymo |
| 🔵 Google | 🟡 Uber | 🟢 Nuro |

---

## Follow-up Questions

1. Why sort frequencies descending?
2. How to handle collisions (decrement until unique or 0)?
3. Why is this greedy approach optimal?
4. Can you do it without sorting using a HashSet?
