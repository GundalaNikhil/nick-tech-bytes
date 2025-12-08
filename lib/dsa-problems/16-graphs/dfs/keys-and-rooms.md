# Keys and Rooms

## Problem Description

**Real-World Scenario:**
A security audit checks if a master key set can eventually unlock every room in a building, starting from the lobby.

**Example Setup:** 
A video game level progression where unlocking one level gives access to keys for subsequent levels.

**What is Keys and Rooms?**
There are `n` rooms labeled from `0` to `n - 1` and all the rooms are locked except for room `0`. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.
When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.
Given an array `rooms` where `rooms[i]` is the set of keys that you can obtain if you visited room `i`, return `true` if you can visit all the rooms, or `false` otherwise.

**Why is it important?**
- Graph Traversal (DFS/BFS)
- Connected Components
- Reachability

**Your Task:** 
Return boolean.

**Difficulty:** Medium
**Tags:** Graphs, Dfs, Graph Traversal, Connected Components, Reachability, O(N + E), Interview

---

## Examples

### Example 1:
**Input:** `rooms = [[1],[2],[3],[]]`
**Output:** `true`
**Explanation:** 0 -> 1 -> 2 -> 3. All visited.

### Example 2:
**Input:** `rooms = [[1,3],[3,0,1],[2],[0]]`
**Output:** `false`
**Explanation:** 0 -> 1, 3. Room 2 is never reached.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Rooms (n) | 1 ≤ n ≤ 1000 |
| Keys | Total keys ≤ 3000 |
| Data Type | Adjacency List |
| Time Complexity | O(N + E) |
| Space Complexity | O(N) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Valve |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Epic Games |
| 🔵 Facebook | 🟡 Apple | 🟢 Riot Games |

---

## Follow-up Questions

1. Is this just checking if the graph is connected? (Yes, specifically if all nodes are reachable from 0).
2. DFS vs BFS?
3. Recursive vs Iterative?
4. What if there are cycles? (Handled by visited set).
