# Find All Duplicates in Array

## Problem Description

**Real-World Scenario:**
A warehouse inventory scan should show each item once, but some items were scanned twice. Find all items that appear exactly twice without using extra storage.

**Example Setup:** 
A student attendance system marks IDs. Due to a bug, some students were marked twice. Find all duplicate IDs without additional memory.

**What is Find All Duplicates?**
Given an array of n integers where 1 ≤ nums[i] ≤ n, some elements appear twice while others appear once. Find all duplicates in O(n) time and O(1) extra space.

**Why is it important?**
- Index-as-hash technique
- In-place modification
- Space-optimized algorithms
- Clever array manipulation

**Your Task:** 
Return all duplicates.

---

## Examples

### Example 1:
**Input:** `nums = [4,3,2,7,8,2,3,1]`
**Output:** `[2, 3]`
**Explanation:** 2 and 3 appear twice.

### Example 2:
**Input:** `nums = [1,1,2]`
**Output:** `[1]`
**Explanation:** 1 appears twice.

### Example 3:
**Input:** `nums = [1]`
**Output:** `[]`
**Explanation:** No duplicates.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Range | 1 ≤ nums[i] ≤ n |
| Data Type | Integer array |
| Special Conditions | O(n) time, O(1) extra space |
| Time Complexity | O(n) |
| Space Complexity | O(1) extra |
| Output Format | List of duplicates |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Palantir |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Dropbox |
| 🔵 Google | 🟡 Apple | 🟢 Box |

---

## Follow-up Questions

1. How does marking index as negative find duplicates?
2. Why does value range 1-n enable this trick?
3. What if you could use extra space?
4. What about finding the single duplicate (Floyd's)?
