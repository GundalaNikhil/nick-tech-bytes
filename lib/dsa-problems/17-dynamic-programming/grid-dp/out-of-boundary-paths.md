# Out of Boundary Paths

## Problem Description

**Real-World Scenario:**
A soccer ball is kicked randomly on a field. Calculate the number of ways the ball can go out of bounds within K kicks.

**Example Setup:** 
A heat diffusion model calculates the amount of heat escaping the edges of a plate after K time steps.

**What is Out of Boundary Paths?**
There is an `m x n` grid with a ball. The ball is initially at the position `[startRow, startColumn]`. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most `maxMove` moves to the ball. Given the five integers `m`, `n`, `maxMove`, `startRow`, `startColumn`, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo 10^9 + 7.

**Why is it important?**
- DP on Grid
- 3D DP State `(moves, r, c)`
- Recursion with Memoization
- Modulo Arithmetic

**Your Task:** 
Return count of paths.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Grid Dp, Dp On Grid, 3D Dp State ``, Recursion With Memoization, Modulo Arithmetic, O(K * M * N), Interview

---

## Examples

### Example 1:
**Input:** `m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0`
**Output:** `6`
**Explanation:** 
Move 1: Up (Out), Left (Out). (2 paths)
Move 2: Right->Up (Out), Down->Left (Out), ...

### Example 2:
**Input:** `m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1`
**Output:** `12`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 50 |
| Moves | 0 ≤ maxMove ≤ 50 |
| Data Type | Integer |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(K * M * N) |
| Space Complexity | O(M * N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 EA |
| 🔵 Google | 🟡 Microsoft | 🟢 Ubisoft |
| 🔵 Facebook | 🟡 Apple | 🟢 Activision |

---

## Follow-up Questions

1. Why sum results for moves 1 to maxMove?
2. Base case: if out of bounds, return 1?
3. Memoization key: `(move, r, c)`?
4. Can you optimize space to O(M*N)?
