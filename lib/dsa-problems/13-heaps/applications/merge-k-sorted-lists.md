# Merge K Sorted Lists

## Problem Description

**Real-World Scenario:**
Multiple log servers produce sorted log entries by timestamp. Merge all logs into one sorted stream for unified monitoring - efficiently!

**Example Setup:** 
A music streaming service has K playlists sorted by play count. Create a global "most played" list by merging all playlists while maintaining sort order.

**What is Merge K Sorted Lists?**
Given an array of K sorted linked lists, merge them into one sorted list. Use a min-heap for O(log K) per element.

**Why is it important?**
- External sorting
- Log merging
- Heap priority queue usage
- Divide and conquer

**Your Task:** 
Merge K sorted lists into one sorted list.

---

## Examples

### Example 1:
**Input:** 
```
lists = [
  1→4→5,
  1→3→4,
  2→6
]
```
**Output:** `1→1→2→3→4→4→5→6`
**Explanation:** All merged and sorted.

### Example 2:
**Input:** `lists = []`
**Output:** `null`
**Explanation:** No lists to merge.

### Example 3:
**Input:** `lists = [[]]`
**Output:** `null`
**Explanation:** One empty list.

---

## Constraints

| Constraint | Value |
|------------|-------|
| K Value | 0 ≤ k ≤ 10⁴ |
| Total Nodes | 0 ≤ n ≤ 10⁴ |
| Node Value | -10⁴ ≤ val ≤ 10⁴ |
| Data Type | Array of sorted linked lists |
| Time Complexity | O(n log k) with heap |
| Space Complexity | O(k) for heap |
| Output Format | Merged sorted list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Twitch |
| 🔵 Facebook | 🟡 Uber | 🟢 Splunk |
| 🔵 Google | 🟡 Oracle | 🟢 Datadog |

---

## Follow-up Questions

1. Why is min-heap approach O(n log k)?
2. What's the divide-and-conquer approach?
3. How is this related to merge sort?
4. What if lists were arrays instead of linked lists?
