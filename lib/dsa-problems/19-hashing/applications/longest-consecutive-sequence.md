# Longest Consecutive Sequence

## Problem Description

**Real-World Scenario:**
A genomics lab sequences DNA fragments. Find the longest consecutive sequence of chromosome positions to identify the largest complete gene region.

**Example Setup:** 
A marathon tracking system has bib numbers of finishers. Find the longest consecutive sequence of bib numbers (e.g., 3,4,5,6) that all finished.

**What is Longest Consecutive Sequence?**
Given an unsorted array, find the length of the longest sequence of consecutive integers. Must be O(n) time.

**Why is it important?**
- Hash set technique
- O(n) despite looking O(n²)
- Sequence finding
- Clever optimization

**Your Task:** 
Return the length of the longest consecutive sequence.

---

## Examples

### Example 1:
**Input:** `nums = [100, 4, 200, 1, 3, 2]`
**Output:** `4`
**Explanation:** [1, 2, 3, 4] is longest.

### Example 2:
**Input:** `nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]`
**Output:** `9`
**Explanation:** [0, 1, 2, 3, 4, 5, 6, 7, 8].

### Example 3:
**Input:** `nums = []`
**Output:** `0`
**Explanation:** Empty array.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 0 ≤ n ≤ 10⁵ |
| Element Value | -10⁹ ≤ nums[i] ≤ 10⁹ |
| Data Type | Integer array |
| Special Conditions | O(n) time required |
| Time Complexity | O(n) |
| Space Complexity | O(n) for hash set |
| Output Format | Length integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Palantir |
| 🔵 Amazon | 🟡 Uber | 🟢 Stripe |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Twitter |

---

## Follow-up Questions

1. Why check for (num-1) not in set before starting?
2. What makes this O(n) not O(n²)?
3. Can you use Union-Find?
4. What if duplicates exist?
