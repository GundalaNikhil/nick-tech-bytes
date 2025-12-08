# Allocate Mailboxes

## Problem Description

**Real-World Scenario:**
A postal service places `k` mailboxes along a street to minimize the total distance all residents must travel to reach their nearest mailbox.

**Example Setup:** 
A supply chain manager locates `k` warehouses to serve a set of retail stores along a highway to minimize total delivery distance.

**What is Allocate Mailboxes?**
Given the array `houses` where `houses[i]` is the location of the `ith` house along a straight line, and an integer `k`, allocate `k` mailboxes in the street. Return the minimum total distance between each house and its nearest mailbox. The answer is guaranteed to fit in a 32-bit signed integer.

**Why is it important?**
- Interval DP
- Median property (Best location for 1 mailbox is median)
- Precomputation of costs
- Optimization

**Your Task:** 
Return minimum total distance.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Interval Dp, Median Property, Precomputation Of Costs, Optimization, O(N^3), Interview

---

## Examples

### Example 1:
**Input:** `houses = [1,4,8,10,20], k = 3`
**Output:** `5`
**Explanation:** 
Mailboxes at 3 (covers 1,4), 9 (covers 8,10), 20 (covers 20).
Dist: |1-3| + |4-3| + |8-9| + |10-9| + |20-20| = 2 + 1 + 1 + 1 + 0 = 5.

### Example 2:
**Input:** `houses = [2,3,5,12,18], k = 2`
**Output:** `9`

### Example 3:
**Input:** `houses = [7,4,6,1], k = 1`
**Output:** `8`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Houses | 1 ≤ n ≤ 100 |
| K Value | 1 ≤ k ≤ n |
| Location | 1 ≤ pos ≤ 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(N^3) |
| Space Complexity | O(N^2) |
| Output Format | Integer distance |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 DoorDash |

---

## Follow-up Questions

1. Why sort the houses first?
2. Why is the cost for a range `[i, j]` with 1 mailbox minimized by placing it at the median?
3. What is the DP state `dp[k][i]` (min cost to cover first i houses with k mailboxes)?
4. Recurrence: `dp[k][i] = min(dp[k-1][j] + cost[j+1][i])`?
