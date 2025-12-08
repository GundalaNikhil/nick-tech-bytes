# Count Servers that Communicate

## Problem Description

**Real-World Scenario:**
A network monitoring tool counts the number of active servers that are part of a cluster (can communicate with at least one other server in the same rack/row or same switch/column).

**Example Setup:** 
A social gathering analyzer counts people who are not standing alone (share a row or column with someone else).

**What is Count Servers...?**
You are given a map of a server center, represented as a `m * n` integer matrix `grid`, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column. Return the number of servers that communicate with any other server.

**Why is it important?**
- Matrix Traversal
- Precomputation (Row/Col Counts)
- Optimization
- Array processing

**Your Task:** 
Return count of communicating servers.

**Difficulty:** Medium
**Tags:** Graphs, Matrix, Matrix Traversal, Precomputation, Optimization, Array Processing, O(M * N), Interview

---

## Examples

### Example 1:
**Input:** `grid = [[1,0],[0,1]]`
**Output:** `0`
**Explanation:** No servers share row or column.

### Example 2:
**Input:** `grid = [[1,0],[1,1]]`
**Output:** `3`
**Explanation:** All 3 servers communicate.

### Example 3:
**Input:** `grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]`
**Output:** `4`
**Explanation:** First two in row 0. Middle two in col 2. Last one isolated? No, last one at (3,3) is isolated. Total 4.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 250 |
| Values | 0 or 1 |
| Data Type | Integer matrix |
| Time Complexity | O(M * N) |
| Space Complexity | O(M + N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Akamai |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Cloudflare |
| 🔵 Facebook | 🟡 Apple | 🟢 Cisco |

---

## Follow-up Questions

1. Why count servers in each row and column first?
2. Condition: `rowCount[i] > 1 || colCount[j] > 1`?
3. Can you do it in one pass? (Hard, usually need two passes).
4. What if the grid is sparse?
