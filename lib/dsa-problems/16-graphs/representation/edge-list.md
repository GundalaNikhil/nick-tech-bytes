# Edge List Representation

## Problem Description

**Real-World Scenario:**
Imagine you're tracking flight routes for an airline. Each flight is a connection between two cities with a ticket price. You receive this data as a simple list: "Delhi to Mumbai costs ₹5000", "Mumbai to Bangalore costs ₹3000", etc. The simplest way to store this is just a list of these connections.

**Example Setup:** 
Ananya works at MakeMyTrip and receives flight data from airlines as CSV files. Each row contains: source city, destination city, and fare. She needs to store this data to build route-finding features.

**What is an Edge List?**
An edge list is the simplest graph representation - just a list of all edges, where each edge is typically stored as (source, destination) or (source, destination, weight).

**Why is it important?**
- Simplest representation to implement
- Great for algorithms that iterate over all edges (like Kruskal's MST)
- Minimal preprocessing needed
- Perfect for input/output operations

**Your Task:** 
Store a graph using edge list representation and perform basic operations like adding edges and checking edge existence.

---

## Examples

### Example 1:
**Input:** 
```
edges = [[0,1], [1,2], [2,3], [3,0]]
```
**Edge List Output:** 
```
[(0,1), (1,2), (2,3), (3,0)]
```
**Explanation:** Simply store all edges as pairs. This represents a cycle: 0→1→2→3→0.

### Example 2:
**Input:** 
```
weighted_edges = [[0,1,10], [1,2,20], [2,0,30]]
```
**Edge List Output:** 
```
[(0,1,10), (1,2,20), (2,0,30)]
```
**Explanation:** For weighted graphs, store triplets (source, destination, weight).

### Example 3:
**Input:** 
```
Query: Does edge (1,2) exist in [(0,1), (1,2), (2,3)]?
```
**Output:** 
```
true
```
**Explanation:** Linear search through edge list - O(E) time.

### Example 4:
**Input:** 
```
edges = []
Add edge (0,1)
Add edge (1,2)
Remove edge (0,1)
```
**Output:** 
```
[(1,2)]
```
**Explanation:** Dynamic operations on edge list.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 1 ≤ n ≤ 10⁵ |
| Edge Count | 0 ≤ E ≤ 10⁶ |
| Data Type | Integer or String vertex identifiers |
| Special Conditions | May be directed or undirected |
| Time Complexity | O(E) for edge lookup, O(1) for adding |
| Space Complexity | O(E) |
| Output Format | List of tuples/arrays |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Lyft | 🟢 Expedia |
| 🔵 Amazon | 🟡 Uber | 🟢 Booking.com |
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 TripAdvisor |

---

## Follow-up Questions

1. What's the time complexity of finding all neighbors of a vertex in edge list?
2. When is edge list preferred over adjacency list?
3. How would you sort edges for Kruskal's algorithm?
