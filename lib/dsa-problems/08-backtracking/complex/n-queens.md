# N-Queens

## Problem Description

**Real-World Scenario:**
The N-Queens puzzle is a classic chessboard challenge. Place N queens on an N×N chessboard so no two queens threaten each other. Queens can attack horizontally, vertically, and diagonally.

**Example Setup:** 
A chess tournament organizer is creating puzzles. For their most challenging puzzle, they ask: "In how many ways can you place 8 queens on a standard chessboard so that none can capture another?"

**What is N-Queens?**
Place N queens on an N×N chessboard such that no two queens attack each other. Return all distinct solutions.

**Why is it important?**
- Classic backtracking problem
- Constraint satisfaction problems
- AI and game solving
- Tests pruning and optimization

**Your Task:** 
Return all distinct solutions to the n-queens puzzle.

**Difficulty:** Medium
**Tags:** Backtracking, Complex, Classic Backtracking, Constraint Satisfaction Problems, Ai And Game Solving, Tests Pruning And Optimization, O(n!), Interview

---

## Examples

### Example 1:
**Input:** `n = 4`
**Output:** 
```
[
 [".Q..",
  "...Q",
  "Q...",
  "..Q."],
  
 ["..Q.",
  "Q...",
  "...Q",
  ".Q.."]
]
```
**Explanation:** 2 valid configurations for 4-Queens.

### Example 2:
**Input:** `n = 1`
**Output:** `[["Q"]]`
**Explanation:** Single queen on 1×1 board.

### Example 3:
**Input:** `n = 2`
**Output:** `[]`
**Explanation:** Impossible to place 2 non-attacking queens on 2×2.

### Example 4:
**Input:** `n = 8`
**Output:** 92 solutions
**Explanation:** The classic 8-Queens has 92 distinct solutions.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Board Size | 1 ≤ n ≤ 9 |
| Data Type | 2D character array representation |
| Special Conditions | Each row must have exactly one queen |
| Time Complexity | O(n!) approximately, with pruning |
| Space Complexity | O(n) for recursion + O(n²) for board |
| Output Format | List of valid board configurations |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Facebook | 🟡 Uber | 🟢 Epic Games |
| 🔵 Google | 🟡 Adobe | 🟢 Riot Games |
| 🔵 Microsoft | 🟡 Salesforce | 🟢 Roblox |

---

## Follow-up Questions

1. How do you efficiently check diagonal conflicts?
2. Can you return just the count of solutions (N-Queens II)?
3. What optimizations can reduce backtracking?
4. How would you visualize the solutions?
