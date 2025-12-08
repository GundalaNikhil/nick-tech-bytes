# Minimum Time Difference

## Problem Description

**Real-World Scenario:**
A scheduler finds the minimum gap between any two recurring daily events (e.g., alarms, meeting slots) to detect potential conflicts or tight transitions.

**Example Setup:** 
A race timer calculates the smallest margin of victory between any two finishers in a 24-hour endurance race.

**What is Minimum Time Difference?**
Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.

**Why is it important?**
- String Parsing
- Sorting
- Circular Time (24-hour wrap around)
- Optimization

**Your Task:** 
Return minimum difference.

---

## Examples

### Example 1:
**Input:** `timePoints = ["23:59","00:00"]`
**Output:** `1`
**Explanation:** Difference is 1 minute.

### Example 2:
**Input:** `timePoints = ["00:00","23:59","00:00"]`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Time Points | 2 ≤ n ≤ 2 * 10⁴ |
| Format | "HH:MM" |
| Data Type | String array |
| Time Complexity | O(N log N) |
| Space Complexity | O(N) |
| Output Format | Integer minutes |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Fitbit |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Garmin |
| 🔵 Facebook | 🟡 Apple | 🟢 Strava |

---

## Follow-up Questions

1. Why convert all times to minutes from 00:00?
2. Why sort the time points?
3. How to handle the circular difference (between last and first + 24h)?
4. Can you use Bucket Sort (since only 1440 minutes in a day)?
