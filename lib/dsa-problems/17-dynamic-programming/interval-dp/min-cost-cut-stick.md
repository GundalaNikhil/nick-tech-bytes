# Minimum Cost to Cut a Stick

## Problem Description

**Real-World Scenario:**
A lumber mill cuts a long log into specific pieces. Each cut costs money proportional to the length of the log being cut. Determine the order of cuts to minimize total cost.

**Example Setup:** 
A metal fabrication shop cuts a metal rod at marked positions. The cost of a cut is the current length of the rod.

**What is Minimum Cost to Cut a Stick?**
Given a wooden stick of length `n` units. The stick is labelled from `0` to `n`. For example, a stick of length 6 is labelled as `[0, 1, 2, 3, 4, 5, 6]`. Given an integer array `cuts` where `cuts[i]` denotes a position you should perform a cut at. You should perform the cuts in order, you can change the order of the cuts as you wish. The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. Return the minimum total cost of the cuts.

**Why is it important?**
- Interval DP
- Matrix Chain Multiplication variant
- Optimization
- Recursion with Memoization

**Your Task:** 
Return minimum cost.

---

## Examples

### Example 1:
**Input:** `n = 7, cuts = [1,3,4,5]`
**Output:** `16`
**Explanation:** 
Order [3, 5, 1, 4]:
Cut at 3: Cost 7. Stick split into [0,3] and [3,7].
Cut at 5: Cost 4 (length of [3,7]). Split [3,7] into [3,5] and [5,7].
Cut at 1: Cost 3 (length of [0,3]). Split [0,3] into [0,1] and [1,3].
Cut at 4: Cost 2 (length of [3,5]). Split [3,5] into [3,4] and [4,5].
Total: 7 + 4 + 3 + 2 = 16.

### Example 2:
**Input:** `n = 9, cuts = [5,6,1,4,2]`
**Output:** `22`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Length | 2 ≤ n ≤ 10⁶ |
| Cuts | 1 ≤ cuts.length ≤ 100 |
| Data Type | Integer array |
| Time Complexity | O(M^3) where M is cuts |
| Space Complexity | O(M^2) |
| Output Format | Integer cost |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Goldman Sachs |
| 🔵 Amazon | 🟡 Microsoft | 🟢 JP Morgan |
| 🔵 Facebook | 🟡 Apple | 🟢 Morgan Stanley |

---

## Follow-up Questions

1. Why add 0 and n to the cuts array and sort it?
2. What is the DP state `dp[i][j]` (min cost to cut segment between cuts[i] and cuts[j])?
3. Recurrence: `dp[i][j] = length + min(dp[i][k] + dp[k][j])` for k between i and j?
4. Why is this O(M^3) and not O(N^3)?
