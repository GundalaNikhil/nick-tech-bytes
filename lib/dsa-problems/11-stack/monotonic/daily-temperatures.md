# Daily Temperatures

## Problem Description

**Real-World Scenario:**
A weather app shows "days until warmer" for each day. Given daily temperatures, calculate how many days you have to wait for a warmer temperature.

**Example Setup:** 
A clothing retailer tracks daily sales. For inventory planning, they want to know how many days until sales exceed today's for each day.

**What is Daily Temperatures?**
Given daily temperatures, return how many days you have to wait until a warmer temperature. If no future day is warmer, return 0.

**Why is it important?**
- Monotonic stack classic
- Next greater element variant
- Weather/time series analysis
- Stack optimization

**Your Task:** 
Return array of days to wait for warmer temperature.

---

## Examples

### Example 1:
**Input:** `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`
**Output:** `[1, 1, 4, 2, 1, 1, 0, 0]`
**Explanation:** 
- Day 0 (73°): Next warmer is day 1 (74°), wait 1 day
- Day 2 (75°): Next warmer is day 6 (76°), wait 4 days
- Day 6 (76°): No warmer day, wait 0 days

### Example 2:
**Input:** `temperatures = [30, 40, 50, 60]`
**Output:** `[1, 1, 1, 0]`
**Explanation:** Increasing temperatures.

### Example 3:
**Input:** `temperatures = [30, 60, 90]`
**Output:** `[1, 1, 0]`
**Explanation:** Each waits 1 day except last.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Temperature | 30 ≤ T ≤ 100 |
| Data Type | Integer array |
| Special Conditions | 0 if no warmer day |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Weather.com |
| 🔵 Facebook | 🟡 Apple | 🟢 Strava |
| 🔵 Google | 🟡 Adobe | 🟢 AccuWeather |

---

## Follow-up Questions

1. Why use a decreasing monotonic stack?
2. How is this similar to Next Greater Element?
3. Can you solve right-to-left vs left-to-right?
4. What if you wanted previous warmer day?
