# Count of Smaller Numbers After Self

## Problem Description

**Real-World Scenario:**
A ranking system calculating how many competitors performed worse than a specific candidate who participated earlier/later (depending on sort order).

**Example Setup:** 
Analyzing an array to find "inversions" for sorting algorithms.

**What is Count of Smaller Numbers After Self?**
Given an integer array `nums`, you have to return a new counts array. The counts array has the property where `counts[i]` is the number of smaller elements to the right of `nums[i]`.

**Why is it important?**
- Merge Sort (Divide and Conquer)
- Binary Indexed Tree (Fenwick Tree)
- Segment Tree
- Rank finding

**Your Task:** 
Return counts array.

**Difficulty:** Medium
**Tags:** Range Queries, Binary Indexed Tree, Merge Sort, Segment Tree, Rank Finding, O(N log N), Interview

---

## Examples

### Example 1:
**Input:** `nums = [5,2,6,1]`
**Output:** `[2,1,1,0]`
**Explanation:** 
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller elements.

### Example 2:
**Input:** `nums = [-1]`
**Output:** `[0]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10^5 |
| Values | -10^4 ≤ nums[i] ≤ 10^4 |
| Time Complexity | O(N log N) |
| Space Complexity | O(N) |
| Output Format | Integer list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Works Applications |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Coupang |
| 🔵 Facebook | 🟡 Apple | 🟢 LINE |

---

## Follow-up Questions

1. Why Merge Sort? (Count jumps during merge step).
2. Why BIT? (Discretize values to ranks, iterate backwards, query sum of ranks < current, add current to BIT).
3. Handling duplicates?
