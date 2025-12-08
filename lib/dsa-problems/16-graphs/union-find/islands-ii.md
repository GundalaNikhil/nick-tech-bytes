# Number of Islands II (Dynamic)

## Problem Description

**Real-World Scenario:**
A real-time satellite system detects new land formations (volcanoes, land reclamation). Count islands after each new land appears.

**Example Setup:** 
A game map reveals terrain tiles one by one. Track the island count as each tile is revealed.

**What is Number of Islands II?**
Given an m×n grid (initially all water), process a sequence of land additions. After each addition, return the current island count.

**Why is it important?**
- Union-Find application
- Dynamic connectivity
- Online algorithm
- Efficient island merging

**Your Task:** 
Return array of island counts after each land addition.

**Difficulty:** Medium
**Tags:** Graphs, Union Find, Union-Find Application, Dynamic Connectivity, Online, Efficient Island Merging, O(k × α(mn), Interview

---

## Examples

### Example 1:
**Input:** `m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]`
**Output:** `[1, 1, 2, 3]`
**Explanation:** After each addition: 1 island, 1 island (merged), 2 islands, 3 islands.

### Example 2:
**Input:** `m = 1, n = 1, positions = [[0,0]]`
**Output:** `[1]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 10⁴ |
| Positions | 1 ≤ positions.length ≤ 10⁴ |
| Data Type | 2D grid coordinates |
| Special Conditions | m × n ≤ 10⁴ |
| Time Complexity | O(k × α(mn)) where k = positions |
| Space Complexity | O(mn) |
| Output Format | Array of counts |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Planet Labs |
| 🔵 Amazon | 🟡 Uber | 🟢 Maxar |
| 🔵 Facebook | 🟡 Apple | 🟢 Satellite Imaging |

---

## Follow-up Questions

1. Why use Union-Find instead of DFS/BFS?
2. How do you handle merging islands?
3. What if a position is added twice?
4. How to optimize path compression?
