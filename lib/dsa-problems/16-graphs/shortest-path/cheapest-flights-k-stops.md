# Cheapest Flights Within K Stops

## Problem Description

**Real-World Scenario:**
Travel booking sites find the cheapest flight with connection limits. Find the cheapest route from A to B with at most K layovers.

**Example Setup:** 
A budget traveler wants the cheapest flight but hates long journeys. Find the cheapest price with at most 2 connections.

**What is Cheapest Flights Within K Stops?**
Given n cities connected by flights with prices, find the cheapest price from source to destination with at most K stops. Return -1 if no such route.

**Why is it important?**
- Modified Dijkstra/Bellman-Ford
- Constraint on path length
- Travel planning
- State space BFS

**Your Task:** 
Return the cheapest price with at most K stops.

**Difficulty:** Medium
**Tags:** Graphs, Shortest Path, Modified Dijkstra/Bellman-Ford, Constraint On Path Length, Travel Planning, State Space Bfs, O(V × E), Interview

---

## Examples

### Example 1:
**Input:** `n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1`
**Output:** `700`
**Explanation:** 0→1→3 costs 100+600=700 with 1 stop.

### Example 2:
**Input:** Same, k = 0
**Output:** `-1`
**Explanation:** No direct flight from 0 to 3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Cities | 1 ≤ n ≤ 100 |
| Flights | 0 ≤ m ≤ n(n-1)/2 |
| Price | 1 ≤ price ≤ 10⁴ |
| Stops | 0 ≤ k < n |
| Time Complexity | O(V × E) or O(k × E) |
| Space Complexity | O(V) |
| Output Format | Cheapest price or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Expedia |
| 🔵 Google | 🟡 Uber | 🟢 Booking.com |
| 🔵 Facebook | 🟡 Airbnb | 🟢 Kayak |

---

## Follow-up Questions

1. Why does standard Dijkstra fail here?
2. How does Bellman-Ford with K iterations work?
3. Can you use BFS with step tracking?
4. What about using DFS with memoization?
