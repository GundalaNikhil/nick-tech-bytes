# Missing Number

## Problem Description

**Real-World Scenario:**
A museum has exhibits numbered 0 to n, but one exhibit plaque went missing. Given the numbers of remaining plaques, find the missing exhibit number.

**Example Setup:** 
A raffle draws numbers 0 to n, but one ticket fell out. Given all drawn numbers except one, find the missing ticket.

**What is Missing Number?**
Given an array of n distinct numbers in [0, n], find the one number missing from the range.

**Why is it important?**
- XOR technique
- Math formula approach
- Bit manipulation
- Space-efficient solution

**Your Task:** 
Find the missing number.

**Difficulty:** Medium
**Tags:** Array, Basic Operations, Xor, Math Formula, Bit Manipulation, Space-Efficient Solution, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [3, 0, 1]`
**Output:** `2`
**Explanation:** n=3, range [0,3], 2 is missing.

### Example 2:
**Input:** `nums = [0, 1]`
**Output:** `2`
**Explanation:** n=2, 2 is missing.

### Example 3:
**Input:** `nums = [9,6,4,2,3,5,7,0,1]`
**Output:** `8`
**Explanation:** n=9, 8 is missing.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | n = nums.length |
| Element Range | 0 to n (distinct) |
| Data Type | Integer array |
| Special Conditions | Exactly one missing |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Missing integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Qualcomm |
| 🔵 Apple | 🟡 Oracle | 🟢 Intel |

---

## Follow-up Questions

1. How does XOR find the missing number?
2. How does the sum formula work: n(n+1)/2?
3. What if there could be duplicates?
4. What about finding first missing positive?
