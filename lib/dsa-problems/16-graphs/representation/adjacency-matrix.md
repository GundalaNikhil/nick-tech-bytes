# Adjacency Matrix Representation

## Problem Description

**Real-World Scenario:**
Imagine you're building a social network like Facebook. You have N users, and you need to quickly check if two users are friends. Think of it like a friendship chart where each row and column represents a user, and a mark at their intersection means they're friends.

**Example Setup:** 
Priya is building a simple social network for her college. She has 5 students and wants to store who is friends with whom. She needs a way to:
- Quickly check if student A is friends with student B
- Add or remove friendships easily

**What is an Adjacency Matrix?**
An adjacency matrix is a 2D array of size N×N where N is the number of vertices (nodes) in a graph. If there's an edge between vertex i and vertex j, then matrix[i][j] = 1 (or the edge weight), otherwise 0.

**Why is it important?**
- O(1) time to check if an edge exists
- Simple to implement and understand
- Perfect for dense graphs where most vertices are connected

**Your Task:** 
Given a list of edges, construct an adjacency matrix representation of the graph.

---

## Examples

### Example 1:
**Input:** 
```
n = 4
edges = [[0,1], [0,2], [1,2], [2,3]]
```
**Output:** 
```
[[0,1,1,0],
 [1,0,1,0],
 [1,1,0,1],
 [0,0,1,0]]
```
**Explanation:** There are 4 nodes. Edge [0,1] means node 0 and node 1 are connected, so matrix[0][1] = matrix[1][0] = 1.

### Example 2:
**Input:** 
```
n = 3
edges = [[0,1], [1,2]]
```
**Output:** 
```
[[0,1,0],
 [1,0,1],
 [0,1,0]]
```
**Explanation:** A simple path graph: 0 - 1 - 2

### Example 3:
**Input:** 
```
n = 2
edges = []
```
**Output:** 
```
[[0,0],
 [0,0]]
```
**Explanation:** No edges means all zeros - no connections exist.

### Example 4 (Directed Graph):
**Input:** 
```
n = 3
edges = [[0,1], [1,2], [2,0]]
directed = true
```
**Output:** 
```
[[0,1,0],
 [0,0,1],
 [1,0,0]]
```
**Explanation:** For directed graphs, only set matrix[from][to] = 1, not both directions.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 1 ≤ n ≤ 1000 |
| Edge Count | 0 ≤ edges.length ≤ n² |
| Data Type | Integer node indices (0-indexed) |
| Special Conditions | No self-loops, no duplicate edges |
| Time Complexity | O(V²) for construction |
| Space Complexity | O(V²) |
| Output Format | 2D matrix |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Atlassian |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Cisco |
| 🔵 Microsoft | 🟡 Salesforce | 🟢 VMware |

---

## Follow-up Questions

1. When would you prefer adjacency matrix over adjacency list?
2. How would you modify this for a weighted graph?
3. What's the space complexity trade-off for sparse vs dense graphs?
