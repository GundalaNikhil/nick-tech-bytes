# Delete and Earn

## Problem Description

**Real-World Scenario:**
A resource gatherer collects points from nodes, but collecting a node destroys adjacent value nodes (neighbors). Maximize total points.

**Example Setup:** 
A card game where taking a card of value X discards all cards of value X-1 and X+1.

**What is Delete and Earn?**
Given an array nums, you can perform operations: pick any `nums[i]`, earn `nums[i]` points, and delete all elements equal to `nums[i] - 1` and `nums[i] + 1`. Maximize points.

**Why is it important?**
- Reduction to House Robber
- Frequency bucket sort
- DP pattern recognition
- Optimization

**Your Task:** 
Return maximum points.

---

## Examples

### Example 1:
**Input:** `nums = [3,4,2]`
**Output:** `6`
**Explanation:** Delete 4, earn 4. 3 is deleted. Then delete 2, earn 2. Total 6.

### Example 2:
**Input:** `nums = [2,2,3,3,3,4]`
**Output:** `9`
**Explanation:** Delete 3s, earn 3*3=9. 2s and 4s are deleted.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 2 × 10⁴ |
| Element Value | 1 ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array |
| Special Conditions | Adjacent values conflict |
| Time Complexity | O(n + max(nums)) |
| Space Complexity | O(max(nums)) |
| Output Format | Integer points |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Goldman Sachs |
| 🔵 Google | 🟡 Microsoft | 🟢 Citadel |
| 🔵 Facebook | 🟡 Apple | 🟢 DE Shaw |

---

## Follow-up Questions

1. How do you convert this to House Robber?
2. Why sum up values for each number first?
3. What is the recurrence relation?
4. How to handle large gaps in values?
