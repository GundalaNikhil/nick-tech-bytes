# Minimum Cost For Tickets

## Problem Description

**Real-World Scenario:**
A commuter plans travel for the upcoming year and wants to minimize costs by choosing between daily, weekly, or monthly passes based on travel dates.

**Example Setup:** 
A gym member optimizes subscription costs by buying day passes, 7-day passes, or 30-day passes based on their workout schedule.

**What is Minimum Cost For Tickets?**
Given an array `days` of travel dates and `costs` for 1-day, 7-day, and 30-day passes, return the minimum cost to travel every day in the given list.

**Why is it important?**
- DP optimization
- Calendar-based DP
- Cost minimization
- Practical scheduling

**Your Task:** 
Return minimum cost.

---

## Examples

### Example 1:
**Input:** `days = [1,4,6,7,8,20], costs = [2,7,15]`
**Output:** `11`
**Explanation:** 
Day 1: Buy 1-day ($2). Total $2.
Day 4: Buy 1-day ($2). Total $4.
Day 6: Buy 1-day ($2). Total $6.
Day 7: Buy 1-day ($2). Total $8.
Day 8: Buy 1-day ($2). Total $10.
Day 20: Buy 1-day ($2). Total $12.
Better: Buy 7-day on Day 1 ($7) covering 1-7. Buy 1-day on Day 8 ($2). Buy 1-day on Day 20 ($2). Total $11.

### Example 2:
**Input:** `days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]`
**Output:** `17`
**Explanation:** Buy 30-day on Day 1 ($15) + 1-day on Day 31 ($2) = 17.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Days | 1 ≤ days.length ≤ 365 |
| Date Range | 1 ≤ days[i] ≤ 365 |
| Costs | costs.length == 3 |
| Data Type | Integer arrays |
| Time Complexity | O(max_day) |
| Space Complexity | O(max_day) |
| Output Format | Integer cost |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Expedia |
| 🔵 Amazon | 🟡 Apple | 🟢 Booking.com |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Tripadvisor |

---

## Follow-up Questions

1. Why iterate through all 365 days instead of just travel days?
2. What is the recurrence `dp[i] = min(dp[i-1]+c1, dp[i-7]+c7, dp[i-30]+c30)`?
3. How to optimize for sparse travel days?
4. What if passes had different durations?
