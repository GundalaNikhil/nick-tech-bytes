# Partition Labels

## Problem Description

**Real-World Scenario:**
A video streaming service wants to split a video into chunks such that all scenes involving a specific actor are contained within a single chunk (to optimize caching/loading).

**Example Setup:** 
Partitioning a string so that each letter appears in at most one part.

**What is Partition Labels?**
You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.
Note that the partition is done so that after concatenating all the parts in order, the resultant string should be `s`.
Return a list of integers representing the size of these parts.

**Why is it important?**
- Greedy
- Two Pointers
- Hash Map (Last Occurrence)

**Your Task:** 
Return list of sizes.

**Difficulty:** Medium
**Tags:** Greedy, Medium, Two Pointers, Hash Map, O(N), Interview

---

## Examples

### Example 1:
**Input:** `s = "ababcbacadefegdehijhklij"`
**Output:** `[9,7,8]`
**Explanation:** 
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.

### Example 2:
**Input:** `s = "eccbbbbdec"`
**Output:** `[10]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ len ≤ 500 |
| Characters | Lowercase English letters |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Baidu |
| 🔵 Facebook | 🟡 Apple | 🟢 Alibaba |

---

## Follow-up Questions

1. Why record last occurrence? (To know how far a partition *must* extend).
2. Greedy logic? (Extend `end` to `max(end, last[char])`. If `i == end`, partition complete).
3. Time complexity? (O(N) - two passes).
