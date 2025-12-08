# Number of Ways to Stay in the Same Place After Some Steps

## Problem Description

**Real-World Scenario:**
A random walker starts at position 0 and makes K steps (Left, Right, Stay). Calculate the probability (or ways) to return to 0 without going out of bounds.

**Example Setup:** 
A robot arm performs a sequence of operations in a linear workspace and must return to the home position safely.

**What is Number of Ways to Stay...?**
You have a pointer at index `0` in an array of size `arrLen`. At each step, you can move 1 position to the left, 1 position to the right in the array, or stay in the same place (The pointer should not be placed outside the array at any time). Given two integers `steps` and `arrLen`, return the number of ways such that your pointer is still at index `0` after exactly `steps` steps. Since the answer may be too large, return it modulo 10^9 + 7.

**Why is it important?**
- DP on Grid (1D + Time)
- Space Optimization
- Boundary conditions
- Combinatorics

**Your Task:** 
Return count of ways.

---

## Examples

### Example 1:
**Input:** `steps = 3, arrLen = 2`
**Output:** `4`
**Explanation:** 
Right, Left, Stay
Stay, Right, Left
Right, Stay, Left
Stay, Stay, Stay

### Example 2:
**Input:** `steps = 2, arrLen = 4`
**Output:** `2`
**Explanation:** 
Right, Left
Stay, Stay

---

## Constraints

| Constraint | Value |
|------------|-------|
| Steps | 1 ≤ steps ≤ 500 |
| Array Length | 1 ≤ arrLen ≤ 10⁶ |
| Data Type | Integer |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(steps^2) |
| Space Complexity | O(steps) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Roblox |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Unity |
| 🔵 Facebook | 🟡 Apple | 🟢 Epic Games |

---

## Follow-up Questions

1. Why can we ignore `arrLen` if it's > `steps/2`?
2. What is the DP state `dp[i][j]` (steps remaining, current index)?
3. Recurrence: `dp[i][j] = dp[i-1][j] + dp[i-1][j-1] + dp[i-1][j+1]`?
4. Can you optimize space to O(steps) using two arrays?
