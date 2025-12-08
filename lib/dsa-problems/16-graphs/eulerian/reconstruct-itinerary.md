# Reconstruct Itinerary

## Problem Description

**Real-World Scenario:**
A travel agent reconstructs a complete trip itinerary from a pile of unsorted flight tickets, using every ticket exactly once.

**Example Setup:** 
A network packet tracer reconstructs the full path of a packet through a network given a set of hop-to-hop logs.

**What is Reconstruct Itinerary?**
Given a list of airline tickets where `tickets[i] = [from, to]`, reconstruct the itinerary in order. All tickets belong to a man who departs from "JFK". You must use all the tickets once and only once. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order.

**Why is it important?**
- Eulerian Path (Hierholzer's Algorithm)
- DFS / Graph Traversal
- Handling cycles and dead ends
- Lexicographical sorting

**Your Task:** 
Return the itinerary list.

**Difficulty:** Medium
**Tags:** Graphs, Eulerian, Eulerian Path, Dfs / Graph Traversal, Handling Cycles And Dead Ends, Lexicographical Sorting, O(E log E), Interview

---

## Examples

### Example 1:
**Input:** `tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]`
**Output:** `["JFK","MUC","LHR","SFO","SJC"]`

### Example 2:
**Input:** `tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]`
**Output:** `["JFK","ATL","JFK","SFO","ATL","SFO"]`
**Explanation:** Start with JFK. Lexical order prefers ATL over SFO.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Tickets | 1 ≤ n ≤ 300 |
| Airport Codes | 3 uppercase letters |
| Data Type | String pairs |
| Special Conditions | Valid itinerary exists |
| Time Complexity | O(E log E) due to sorting |
| Space Complexity | O(E) |
| Output Format | List of airport codes |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Expedia |
| 🔵 Amazon | 🟡 Uber | 🟢 TripAdvisor |
| 🔵 Facebook | 🟡 Apple | 🟢 Booking.com |

---

## Follow-up Questions

1. Why is this an Eulerian Path problem (visit every edge)?
2. Why use a PriorityQueue for destinations?
3. Why add to result in post-order (reverse)?
4. How to handle disconnected components (though problem guarantees valid)?
