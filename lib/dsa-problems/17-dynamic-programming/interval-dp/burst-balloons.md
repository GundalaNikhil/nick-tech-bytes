# Burst Balloons

## Problem Description

**Real-World Scenario:**
A game developer creates a balloon-popping game. Each balloon has coins; popping balloon i gives coins = nums[left] × nums[i] × nums[right]. Maximize total coins.

**Example Setup:** 
A demolition planner removes buildings in sequence. Each removal pays based on adjacent building values. Plan the optimal sequence.

**What is Burst Balloons?**
Given n balloons with coin values, burst them one by one. For each burst, get coins = nums[left] × nums[i] × nums[right]. Maximize total coins.

**Why is it important?**
- Interval DP classic
- "Which to do last" thinking
- Matrix chain multiplication variant
- Hard DP problem

**Your Task:** 
Return the maximum coins obtainable.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Interval Dp, Interval Dp Classic, "Which To Do Last" Thinking, Matrix Chain Multiplication Variant, Hard Dp, O(n³), Interview

---

## Examples

### Example 1:
**Input:** `nums = [3, 1, 5, 8]`
**Output:** `167`
**Explanation:** Pop order 1→5→3→8 gives 3×1×5 + 3×5×8 + 1×3×8 + 1×8×1 = 167.

### Example 2:
**Input:** `nums = [1, 5]`
**Output:** `10`
**Explanation:** Pop 1 first: 1×1×5=5, then 5: 1×5×1=5. Total=10.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 300 |
| Coin Value | 0 ≤ nums[i] ≤ 100 |
| Data Type | Integer array |
| Special Conditions | Treat boundaries as value 1 |
| Time Complexity | O(n³) |
| Space Complexity | O(n²) |
| Output Format | Maximum coins |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Amazon | 🟡 Uber | 🟢 King |
| 🔵 Facebook | 🟡 Apple | 🟢 Scopely |

---

## Follow-up Questions

1. Why think about which balloon to burst LAST?
2. What does dp[i][j] represent?
3. How do boundaries (value 1) help?
4. What's the relationship to matrix chain multiplication?
