# Sudoku Solver

## Problem Description

**Real-World Scenario:**
A Sudoku puzzle app needs an automatic solver for hints. Given any valid partial puzzle, fill in the remaining cells following Sudoku rules.

**Example Setup:** 
A newspaper offers daily Sudoku challenges. The app verifies solutions and provides step-by-step solving logic.

**What is Sudoku Solver?**
Solve a 9×9 Sudoku puzzle by filling every empty cell with digits 1-9 such that each row, column, and 3×3 box contains all digits exactly once.

**Why is it important?**
- Backtracking classic
- Constraint satisfaction
- Game AI
- Logical reasoning

**Your Task:** 
Fill the board with valid numbers in-place.

**Difficulty:** Medium
**Tags:** Backtracking, Complex, Backtracking Classic, Constraint Satisfaction, Game Ai, Logical Reasoning, O(9^(empty cells), Interview

---

## Examples

### Example 1:
**Input:** Partially filled 9×9 board
**Output:** Completed valid Sudoku solution
**Explanation:** Apply backtracking with constraint checking.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Board Size | 9 × 9 |
| Cell Value | '1'-'9' or '.' (empty) |
| Data Type | 2D character array |
| Special Conditions | Guaranteed valid input with unique solution |
| Time Complexity | O(9^(empty cells)) worst case |
| Space Complexity | O(81) for recursion |
| Output Format | Modified board in-place |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Amazon | 🟡 Uber | 🟢 King |
| 🔵 Apple | 🟡 Adobe | 🟢 Puzzle Baron |

---

## Follow-up Questions

1. How do you optimize with bitmasks for seen numbers?
2. What's the order of cell selection (most constrained first)?
3. Can you find multiple solutions?
4. What about dancing links (Algorithm X)?
