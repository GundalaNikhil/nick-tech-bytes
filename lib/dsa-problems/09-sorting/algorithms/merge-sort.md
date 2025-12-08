# Merge Sort

## Problem Description

**Real-World Scenario:**
Database systems use merge sort for external sorting when data is too large for memory. Files are sorted in chunks, then merged - just like merge sort merges sorted halves!

**Example Setup:** 
A library is merging two sorted card catalogs into one. They go through both catalogs simultaneously, picking the smaller entry each time. This is the merge step of merge sort!

**What is Merge Sort?**
A divide-and-conquer sorting algorithm that:
1. Divides the array into halves
2. Recursively sorts each half
3. Merges the sorted halves

**Why is it important?**
- Guaranteed O(n log n) time
- Stable sort (preserves order of equal elements)
- Used in external sorting
- Foundation for many algorithms

**Your Task:** 
Sort an array using merge sort.

---

## Examples

### Example 1:
**Input:** `nums = [38, 27, 43, 3, 9, 82, 10]`
**Output:** `[3, 9, 10, 27, 38, 43, 82]`
**Explanation:** Divide → Sort halves → Merge

### Example 2:
**Input:** `nums = [5, 2, 3, 1]`
**Output:** `[1, 2, 3, 5]`
**Explanation:** [5,2] and [3,1] → [2,5] and [1,3] → [1,2,3,5]

### Example 3:
**Input:** `nums = [5, 1, 1, 2, 0, 0]`
**Output:** `[0, 0, 1, 1, 2, 5]`
**Explanation:** Stable sort - equal elements maintain order.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 5 × 10⁴ |
| Element Range | -5 × 10⁴ ≤ nums[i] ≤ 5 × 10⁴ |
| Data Type | Integer array |
| Special Conditions | Stable sort |
| Time Complexity | O(n log n) always |
| Space Complexity | O(n) for merge step |
| Output Format | Sorted array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Amazon | 🟡 Adobe | 🟢 Qualcomm |
| 🔵 Microsoft | 🟡 Apple | 🟢 Intel |

---

## Follow-up Questions

1. Why is merge sort stable but quicksort is not?
2. What's external merge sort for disk-based data?
3. Can you do in-place merge sort?
4. How is merge sort used for counting inversions?
