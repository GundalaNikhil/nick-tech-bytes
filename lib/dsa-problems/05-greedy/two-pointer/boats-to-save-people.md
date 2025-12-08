# Boats to Save People

## Problem Description

**Real-World Scenario:**
A rescue operation evacuates people using boats with a weight limit. Each boat can carry at most two people. Minimize the number of boats.

**Example Setup:** 
A ride-sharing app groups at most two passengers into a car if their combined weight/size fits the vehicle capacity.

**What is Boats to Save People?**
You are given an array `people` where `people[i]` is the weight of the `ith` person, and an infinite number of boats where each boat can carry a maximum weight of `limit`. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most `limit`. Return the minimum number of boats to carry every given person.

**Why is it important?**
- Greedy Strategy
- Sorting + Two Pointers
- Bin packing variant (restricted)
- Optimization

**Your Task:** 
Return minimum boats.

**Difficulty:** Medium
**Tags:** Greedy, Two Pointer, Greedy Strategy, Sorting + Two Pointers, Bin Packing Variant, Optimization, O(N log N), Interview

---

## Examples

### Example 1:
**Input:** `people = [1,2], limit = 3`
**Output:** `1`
**Explanation:** 1 boat (1, 2).

### Example 2:
**Input:** `people = [3,2,2,1], limit = 3`
**Output:** `3`
**Explanation:** (1, 2), (2), (3).

### Example 3:
**Input:** `people = [3,5,3,4], limit = 5`
**Output:** `4`
**Explanation:** (3), (3), (4), (5).

---

## Constraints

| Constraint | Value |
|------------|-------|
| People | 1 ≤ n ≤ 5 × 10⁴ |
| Weight | 1 ≤ weight ≤ limit |
| Limit | 1 ≤ limit ≤ 3 × 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(N log N) |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Cruise |
| 🔵 Amazon | 🟡 Uber | 🟢 Zoox |
| 🔵 Facebook | 🟡 Apple | 🟢 Lyft |

---

## Follow-up Questions

1. Why sort the people by weight?
2. Why pair the heaviest with the lightest?
3. What if a boat could carry 3 people (3-Sum variant)?
4. Why is this optimal?
