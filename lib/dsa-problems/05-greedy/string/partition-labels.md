# Partition Labels

## Problem Description

**Real-World Scenario:**
A video streaming buffer segments a video stream such that all frames belonging to a specific scene appear in only one segment.

**Example Setup:** 
A compiler optimization phase groups dependent instructions into blocks such that no dependency crosses block boundaries? No.
Better: A string partitioner splits a string so that each letter appears in at most one part.

**What is Partition Labels?**
You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part. Note that the partition is done so that after concatenating all the parts in order, the resultant string should be `s`. Return a list of integers representing the size of these parts.

**Why is it important?**
- Greedy Strategy
- Interval merging
- Last occurrence tracking
- String processing

**Your Task:** 
Return list of partition sizes.

**Difficulty:** Medium
**Tags:** Greedy, String, Greedy Strategy, Interval Merging, Last Occurrence Tracking, String Processing, O(N), Interview

---

## Examples

### Example 1:
**Input:** `s = "ababcbacadefegdehijhklij"`
**Output:** `[9,7,8]`
**Explanation:** 
"ababcbaca" (a,b,c only here)
"defegde" (d,e,f,g only here)
"hijhklij" (h,i,j,k,l only here)

### Example 2:
**Input:** `s = "eccbbbbdec"`
**Output:** `[10]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 500 |
| Characters | Lowercase English letters |
| Data Type | String |
| Time Complexity | O(N) |
| Space Complexity | O(1) (26 chars) |
| Output Format | List of integers |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Google | 🟡 Microsoft | 🟢 Disney |
| 🔵 Facebook | 🟡 Apple | 🟢 Netflix |

---

## Follow-up Questions

1. Why record the last index of each character?
2. How does `end = max(end, last[char])` extend the current partition?
3. When do we close a partition (`i == end`)?
4. Can you do it in one pass?
