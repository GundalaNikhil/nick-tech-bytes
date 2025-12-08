# Maximum Profit in Job Scheduling

## Problem Description

**Real-World Scenario:**
A freelancer chooses a subset of non-overlapping projects to maximize total earnings, where each project has a start time, end time, and payment.

**Example Setup:** 
A conference room scheduler selects the most profitable set of booking requests.

**What is Max Profit in Job Scheduling?**
We have `n` jobs, where every job is scheduled to be done from `startTime[i]` to `endTime[i]`, obtaining a profit of `profit[i]`. You're given the `startTime`, `endTime` and `profit` arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.

**Why is it important?**
- DP + Binary Search
- Weighted Interval Scheduling
- Sorting by end time
- Optimization

**Your Task:** 
Return maximum profit.

---

## Examples

### Example 1:
**Input:** `startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]`
**Output:** `120`
**Explanation:** Pick job 1 (1-3, profit 50) and job 4 (3-6, profit 70). Total 120.

### Example 2:
**Input:** `startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]`
**Output:** `150`
**Explanation:** Pick job 1 (1-3, 20), job 4 (4-6, 70), job 5 (6-9, 60). Total 150.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Jobs | 1 ≤ n ≤ 5 × 10⁴ |
| Time | 1 ≤ start < end ≤ 10⁹ |
| Profit | 1 ≤ profit ≤ 10⁴ |
| Data Type | Integer arrays |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | Integer profit |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Upwork |
| 🔵 Amazon | 🟡 Airbnb | 🟢 Fiverr |
| 🔵 Facebook | 🟡 Microsoft | 🟢 DoorDash |

---

## Follow-up Questions

1. Why sort jobs by end time?
2. How does binary search find the previous non-conflicting job?
3. What is the recurrence `dp[i] = max(dp[i-1], profit[i] + dp[prev])`?
4. How is this different from "Non-overlapping Intervals" (unweighted)?
