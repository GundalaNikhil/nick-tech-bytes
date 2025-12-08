# Count of Smaller Numbers After Self

## Problem Description

**Real-World Scenario:**
A leaderboard system tracks how many players with lower scores are listed after each player in the original ranking.

**Example Setup:** 
A stock analyst counts how many lower-priced days occur after each trading day.

**What is Count of Smaller Numbers After Self?**
Given an integer array, for each element find the count of smaller numbers to its right.

**Why is it important?**
- Merge sort with counting
- Binary Indexed Tree (BIT)
- Inversion counting variant
- Advanced sorting

**Your Task:** 
Return array of counts for each element.

**Difficulty:** Medium
**Tags:** Sorting, Applications, Merge Sort With Counting, Binary Indexed Tree, Inversion Counting Variant, Advanced Sorting, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [5,2,6,1]`
**Output:** `[2,1,1,0]`
**Explanation:** 5: [2,1], 2: [1], 6: [1], 1: [].

### Example 2:
**Input:** `nums = [-1]`
**Output:** `[0]`

### Example 3:
**Input:** `nums = [-1,-1]`
**Output:** `[0,0]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Value | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Data Type | Integer array |
| Special Conditions | Count to the right only |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | Array of counts |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Leaderboard.com |
| 🔵 Amazon | 🟡 Apple | 🟢 Kaggle |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Codeforces |

---

## Follow-up Questions

1. How does modified merge sort work?
2. What's Binary Indexed Tree approach?
3. Can you use AVL/Red-Black tree?
4. What about coordinate compression?
