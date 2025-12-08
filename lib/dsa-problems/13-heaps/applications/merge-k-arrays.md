# Merge k Sorted Arrays

## Problem Description

**Real-World Scenario:**
A distributed database merges k sorted result sets from different shards into one sorted stream.

**Example Setup:** 
A log aggregator combines k sorted log files chronologically into a single timeline.

**What is Merge k Sorted Arrays?**
Given k sorted arrays, merge them into one sorted array efficiently using a min-heap.

**Why is it important?**
- Heap application
- Multi-way merge
- External sorting
- Distributed systems

**Your Task:** 
Return the merged sorted array.

**Difficulty:** Medium
**Tags:** Heaps, Applications, Heap Application, Multi-Way Merge, External Sorting, Distributed Systems, O(n log k), Interview

---

## Examples

### Example 1:
**Input:** `arrays = [[1,4,5],[1,3,4],[2,6]]`
**Output:** `[1,1,2,3,4,4,5,6]`
**Explanation:** Merge all sorted arrays.

### Example 2:
**Input:** `arrays = [[1,4],[2,3]]`
**Output:** `[1,2,3,4]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Arrays | 1 ≤ k ≤ 10⁴ |
| Total Elements | Total ≤ 10⁴ |
| Element Value | -10⁴ ≤ val ≤ 10⁴ |
| Data Type | Sorted integer arrays |
| Time Complexity | O(n log k) where n = total |
| Space Complexity | O(k) for heap |
| Output Format | Sorted array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Snowflake |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Databricks |
| 🔵 Facebook | 🟡 Apple | 🟢 MongoDB |

---

## Follow-up Questions

1. How does min-heap approach work?
2. What do you store in heap (value, array index, element index)?
3. Compare to pairwise merging O(nk)?
4. What about streaming version?
