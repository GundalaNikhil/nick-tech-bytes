# Quick Sort

## Problem Description

**Real-World Scenario:**
When organizing a deck of playing cards, you might pick a "pivot" card and partition others into "less than pivot" and "greater than pivot" piles. Then repeat for each pile. This is quicksort!

**Example Setup:** 
A sports league ranks teams. Pick the middle team as pivot, put worse teams on left, better teams on right. Repeat recursively until all teams are ranked.

**What is Quick Sort?**
A divide-and-conquer algorithm that:
1. Picks a pivot element
2. Partitions array around pivot (smaller left, larger right)
3. Recursively sorts the partitions

**Why is it important?**
- Average O(n log n), often faster than merge sort
- In-place sorting (no extra array)
- Cache-friendly
- Standard library default in many languages

**Your Task:** 
Sort an array using quick sort.

**Difficulty:** Medium
**Tags:** Sorting, Algorithms, Average O, Often Faster Than Merge Sort, In-Place Sorting, Cache-Friendly, Standard Library Default In Many Languages, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [10, 7, 8, 9, 1, 5]`
**Output:** `[1, 5, 7, 8, 9, 10]`
**Explanation:** Partition around pivot, recursively sort.

### Example 2:
**Input:** `nums = [5, 2, 3, 1]`
**Output:** `[1, 2, 3, 5]`
**Explanation:** Pick pivot, partition, recurse.

### Example 3:
**Input:** `nums = [3, 3, 3]`
**Output:** `[3, 3, 3]`
**Explanation:** All same elements - handle duplicates properly.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 5 × 10⁴ |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array |
| Special Conditions | In-place sorting |
| Time Complexity | O(n log n) average, O(n²) worst |
| Space Complexity | O(log n) for recursion |
| Output Format | Sorted array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Amazon | 🟡 Adobe | 🟢 Intel |
| 🔵 Microsoft | 🟡 Apple | 🟢 Qualcomm |

---

## Follow-up Questions

1. Why can worst case be O(n²)? How to avoid?
2. What's the difference between Lomuto and Hoare partition?
3. Why is quicksort faster than merge sort in practice?
4. What's the 3-way partition for duplicates?
