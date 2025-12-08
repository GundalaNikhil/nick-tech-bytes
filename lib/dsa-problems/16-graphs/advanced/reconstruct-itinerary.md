# Reconstruct Itinerary

## Problem Description

**Real-World Scenario:**
You have a set of airline tickets. Starting from JFK, find the itinerary that uses all tickets exactly once, visiting airports in lexicographically smallest order when choices exist.

**Example Setup:** 
A travel agent has booked multiple flight segments for a client. Plan the complete journey starting from the home airport, using every ticket exactly once.

**What is Reconstruct Itinerary?**
Given a list of tickets [from, to], reconstruct the itinerary in order. The itinerary must:
1. Start from "JFK"
2. Use all tickets exactly once
3. Be lexicographically smallest if multiple solutions

**Why is it important?**
- Eulerian path
- Graph traversal with constraints
- Greedy + DFS combo
- Real travel planning

**Your Task:** 
Return the itinerary as a list of airports.

**Difficulty:** Hard
**Tags:** Graphs, Advanced, Eulerian Path, Graph Traversal With Constraints, Greedy + Dfs Combo, Real Travel Planning, O(E log E), Interview

---

## Examples

### Example 1:
**Input:** 
```
tickets = [
  ["MUC", "LHR"],
  ["JFK", "MUC"],
  ["SFO", "SJC"],
  ["LHR", "SFO"]
]
```
**Output:** `["JFK", "MUC", "LHR", "SFO", "SJC"]`
**Explanation:** JFK→MUC→LHR→SFO→SJC uses all tickets.

### Example 2:
**Input:** 
```
tickets = [
  ["JFK", "SFO"],
  ["JFK", "ATL"],
  ["SFO", "ATL"],
  ["ATL", "JFK"],
  ["ATL", "SFO"]
]
```
**Output:** `["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"]`
**Explanation:** Lexicographically smallest valid path.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Tickets | 1 ≤ n ≤ 300 |
| Airport Code | 3 uppercase letters |
| Data Type | String pairs |
| Special Conditions | Valid itinerary guaranteed |
| Time Complexity | O(E log E) for sorting |
| Space Complexity | O(E) |
| Output Format | List of airports |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Expedia |
| 🔵 Amazon | 🟡 Airbnb | 🟢 Kayak |
| 🔵 Facebook | 🟡 Bloomberg | 🟢 TripAdvisor |

---

## Follow-up Questions

1. What's Hierholzer's algorithm for Eulerian path?
2. Why use a min-heap or sorted list for neighbors?
3. Why add to result in post-order DFS?
4. What if no valid itinerary exists?
