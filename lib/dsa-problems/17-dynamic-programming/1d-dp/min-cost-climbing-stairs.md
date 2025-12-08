# Min Cost Climbing Stairs

## Problem Description

**Real-World Scenario:**
A toll road has booths at each exit with different fees. You can skip one exit at a time. Find the minimum total toll to reach the end.

**Example Setup:** 
An escalator has steps with varying difficulty (energy cost). You can take 1 or 2 steps at a time. Find the minimum energy to reach the top.

**What is Min Cost Climbing Stairs?**
Given an array of costs, you can climb either 1 or 2 steps at a time. Find the minimum cost to reach the top (past the last step).

**Why is it important?**
- Basic 1D DP
- Extension of climbing stairs
- Real optimization problems
- Greedy doesn't work here

**Your Task:** 
Return the minimum cost to reach the top.

---

## Examples

### Example 1:
**Input:** `cost = [10, 15, 20]`
**Output:** `15`
**Explanation:** Start at cost[1], pay 15, jump 2 steps to top.

### Example 2:
**Input:** `cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]`
**Output:** `6`
**Explanation:** Optimal path skipping 100s.

### Example 3:
**Input:** `cost = [0, 0, 0]`
**Output:** `0`
**Explanation:** All costs are 0.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 2 ≤ n ≤ 1000 |
| Cost Range | 0 ≤ cost[i] ≤ 999 |
| Data Type | Integer array |
| Special Conditions | Start from index 0 or 1 |
| Time Complexity | O(n) |
| Space Complexity | O(1) optimized |
| Output Format | Minimum cost integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Google | 🟡 Uber | 🟢 Twitch |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Reddit |

---

## Follow-up Questions

1. What's the DP recurrence?
2. Why can you start at index 0 or 1?
3. Can you optimize to O(1) space?
4. How is this different from regular climbing stairs?
