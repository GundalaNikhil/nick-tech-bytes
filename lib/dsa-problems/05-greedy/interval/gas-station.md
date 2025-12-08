# Gas Station

## Problem Description

**Real-World Scenario:**
A delivery truck must visit gas stations in a circular route. Each station has some gas, and traveling to the next costs some gas. Can the truck complete the circuit? If so, where should it start?

**Example Setup:** 
A road trip planner shows circular routes with gas stations. Find if there's a starting point that allows completing the full loop without running out of gas.

**What is Gas Station?**
Given n gas stations in a circle with gas[i] and cost[i] to reach next station, find the starting index to complete the circuit, or -1 if impossible.

**Why is it important?**
- Circular array
- Greedy thinking
- Transportation/logistics
- Single valid answer property

**Your Task:** 
Find the starting station index, or -1 if impossible.

**Difficulty:** Medium
**Tags:** Greedy, Interval, Circular Array, Greedy Thinking, Transportation/Logistics, Single Valid Answer Property, O(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
gas = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]
```
**Output:** `3`
**Explanation:** Start at station 3. Tank: 0+4-1=3, 3+5-2=6, 6+1-3=4, 4+2-4=2, 2+3-5=0. Just makes it!

### Example 2:
**Input:** 
```
gas = [2, 3, 4]
cost = [3, 4, 3]
```
**Output:** `-1`
**Explanation:** Total gas (9) < total cost (10). Impossible.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Stations | 1 ≤ n ≤ 10⁵ |
| Gas/Cost | 0 ≤ gas[i], cost[i] ≤ 10⁴ |
| Data Type | Integer arrays |
| Special Conditions | Unique answer if it exists |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Index or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Lyft |
| 🔵 Google | 🟡 Uber | 🟢 DoorDash |
| 🔵 Microsoft | 🟡 Apple | 🟢 Instacart |

---

## Follow-up Questions

1. Why is there at most one valid starting point?
2. How does tracking "tank deficit" help?
3. What's the reset strategy when tank goes negative?
4. Why compare total gas vs total cost first?
