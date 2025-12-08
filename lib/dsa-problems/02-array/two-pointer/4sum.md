# 4Sum

## Problem Description

**Real-World Scenario:**
A logistics coordinator groups four packages to exactly fill a shipping container's weight capacity.

**Example Setup:** 
A poker game analyzer finds four cards that sum to a specific target value.

**What is 4Sum?**
Given an array nums of n integers, return an array of all the unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that:
- `0 <= a, b, c, d < n`
- `a, b, c, d` are distinct.
- `nums[a] + nums[b] + nums[c] + nums[d] == target`

**Why is it important?**
- Generalization of k-Sum
- Recursion or nested loops
- Handling duplicates
- Sorting + Two Pointers

**Your Task:** 
Return unique quadruplets summing to target.

---

## Examples

### Example 1:
**Input:** `nums = [1,0,-1,0,-2,2], target = 0`
**Output:** `[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]`

### Example 2:
**Input:** `nums = [2,2,2,2,2], target = 8`
**Output:** `[[2,2,2,2]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 200 |
| Element Value | -10⁹ ≤ nums[i] ≤ 10⁹ |
| Target | -10⁹ ≤ target ≤ 10⁹ |
| Data Type | Integer array |
| Special Conditions | Unique quadruplets |
| Time Complexity | O(n³) |
| Space Complexity | O(1) or O(n) for sorting |
| Output Format | List of lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Yahoo |
| 🔵 Google | 🟡 LinkedIn | 🟢 Snap |
| 🔵 Facebook | 🟡 Apple | 🟢 Pinterest |

---

## Follow-up Questions

1. How do you generalize 3Sum to 4Sum?
2. How do you handle integer overflow during summation?
3. Can you reduce complexity to O(n² log n) or O(n²)?
4. What is the generic k-Sum approach?
