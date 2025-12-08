# Snakes and Ladders

## Problem Description

**Real-World Scenario:**
A board game simulator calculates the minimum number of dice rolls required to reach the end of a Snakes and Ladders board, considering all possible shortcuts and setbacks.

**Example Setup:** 
A network routing protocol finds the shortest path in a network where some links (ladders) jump forward and others (snakes) jump backward.

**What is Snakes and Ladders?**
You are given an `n x n` integer matrix `board` where the cells are labeled from `1` to `n^2` in a Boustrophedon style starting from the bottom left of the board (i.e. `board[n - 1][0]`) and alternating direction each row. You start on square `1` of the board. In each move, starting from square `curr`, do the following:
- Choose a destination square `next` with a label in the range `[curr + 1, min(curr + 6, n^2)]`.
- If `board[next]` has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to `next`.
- The game ends when you reach the square `n^2`.
Return the least number of moves required to reach the square `n^2`. If it is not possible to reach the square, return `-1`.

**Why is it important?**
- BFS (Shortest Path in Unweighted Graph)
- Coordinate mapping (1D to 2D)
- Game simulation
- Interview classic

**Your Task:** 
Return minimum moves.

---

## Examples

### Example 1:
**Input:** `board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]`
**Output:** `4`
**Explanation:** 
Start at 1.
Roll 2 -> 3? No.
Roll to 2 (ladder to 15).
From 15, roll to 17 (ladder to 13)? No.
From 15, roll to 21? No.
Path: 1 -> 2(15) -> 17(13) -> ...
Optimal: 1 -> 2(15) -> 17(13) -> 19? No.
1 -> 2(15) -> 16 -> 17(13) -> ...
Actually: 1 -> 2 (jump to 15). 15 -> 17 (jump to 13). 13 -> 14. 14 -> 35. 35 -> 36. 4 moves.

### Example 2:
**Input:** `board = [[-1,-1],[-1,3]]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Board Size | 2 ≤ n ≤ 20 |
| Cells | 1 to n^2 |
| Data Type | 2D Grid |
| Time Complexity | O(N^2) |
| Space Complexity | O(N^2) |
| Output Format | Integer moves |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Google | 🟡 Microsoft | 🟢 King |
| 🔵 Facebook | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. How to map 1D label to 2D coordinates `(r, c)`?
2. Why use BFS instead of DFS?
3. How to handle cycles (visited array)?
4. Why `min(curr + 6, n^2)`?
