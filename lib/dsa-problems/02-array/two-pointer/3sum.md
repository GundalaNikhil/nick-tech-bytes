# 3Sum

## Problem Description

**Real-World Scenario:**
A financial fraud detection system looks for three transactions that sum to zero, indicating a potential wash trade or circular transaction loop.

**Example Setup:** 
A chemistry lab mixes three solutions with different charge values to create a neutral mixture (sum = 0).

**What is 3Sum?**
Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.

**Why is it important?**
- Two-pointer technique extension
- Sorting + Two Sum
- Handling duplicates
- Classic interview problem

**Your Task:** 
Return the list of unique triplets summing to zero.

**Difficulty:** Medium
**Tags:** Array, Two Pointer, Two-Pointer Technique Extension, Sorting + Two Sum, Handling Duplicates, Classic Interview, O(n²), Interview

---

## Examples

### Example 1:
**Input:** `nums = [-1,0,1,2,-1,-4]`
**Output:** `[[-1,-1,2],[-1,0,1]]`
**Explanation:** 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].

### Example 2:
**Input:** `nums = [0,1,1]`
**Output:** `[]`
**Explanation:** No triplet sums to 0.

### Example 3:
**Input:** `nums = [0,0,0]`
**Output:** `[[0,0,0]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 0 ≤ n ≤ 3000 |
| Element Value | -10⁵ ≤ nums[i] ≤ 10⁵ |
| Data Type | Integer array |
| Special Conditions | Unique triplets |
| Time Complexity | O(n²) |
| Space Complexity | O(1) or O(n) for sorting |
| Output Format | List of lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Walmart |
| 🔵 Amazon | 🟡 Adobe | 🟢 Target |
| 🔵 Microsoft | 🟡 Apple | 🟢 eBay |

---

## Follow-up Questions

1. Why sort the array first?
2. How do you skip duplicates to avoid duplicate triplets?
3. What is the difference between 3Sum and 3Sum Closest?
4. Can you solve it using a hash map?
