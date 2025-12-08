# Design Underground System

## Problem Description

**Real-World Scenario:**
A subway system tracking passenger check-in/check-out times to calculate average travel time between stations.

**Example Setup:** 
Monitoring API latency between different service endpoints.

**What is Design Underground System?**
Implement the `UndergroundSystem` class:
- `void checkIn(int id, string stationName, int t)`
  - A customer with a card ID equal to `id`, gets in the station `stationName` at time `t`.
  - A customer can only be checked into one place at a time.
- `void checkOut(int id, string stationName, int t)`
  - A customer with a card ID equal to `id`, gets out from the station `stationName` at time `t`.
- `double getAverageTime(string startStation, string endStation)`
  - Returns the average time to travel between the `startStation` and the `endStation`.
  - The average time is computed from all the previous traveling from `startStation` to `endStation` that happened directly.
  - Call to `getAverageTime` is always valid.

**Why is it important?**
- Hash Map (Nested Maps)
- Data Aggregation
- System Design

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** 
`checkIn(45, "Leyton", 3)`
`checkIn(32, "Paradise", 8)`
`checkOut(45, "Waterloo", 15)` -> (15-3=12)
`checkOut(32, "Cambridge", 22)` -> (22-8=14)
`getAverageTime("Paradise", "Cambridge")` -> 14.0
`getAverageTime("Leyton", "Waterloo")` -> 12.0
`checkIn(10, "Leyton", 24)`
`getAverageTime("Leyton", "Waterloo")` -> 12.0
`checkOut(10, "Waterloo", 38)` -> (38-24=14)
`getAverageTime("Leyton", "Waterloo")` -> (12+14)/2 = 13.0

---

## Constraints

| Constraint | Value |
|------------|-------|
| Calls | At most 2 * 10^4 calls |
| IDs | Integer range |
| Time Complexity | O(1) |
| Space Complexity | O(P + S^2) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Transport for London (Joke) |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Lyft |

---

## Follow-up Questions

1. How to store check-in data? `Map<ID, Pair<Station, Time>>`.
2. How to store route data? `Map<Start_End, Pair<TotalTime, Count>>`.
3. Why combine Start and End station into a single key? (Simplifies lookup).
