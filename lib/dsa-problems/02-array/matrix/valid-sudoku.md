# Valid Sudoku

## Problem Description

**Real-World Scenario:**
A Sudoku app validates if a partially filled board follows the rules. Before solving, check if the current state is valid (no duplicates in rows, columns, 3×3 boxes).

**Example Setup:** 
A newspaper's Sudoku editor verifies submitted puzzles are valid before publishing.

**What is Valid Sudoku?**
Determine if a 9×9 Sudoku board is valid. Only filled cells need validation - no duplicates in each row, column, and 3×3 sub-box.

**Why is it important?**
- 2D array traversal
- Hash set usage
- Game validation
- Constraint checking

**Your Task:** 
Return true if the board is valid.

---

## Examples

### Example 1:
**Input:** A valid partially filled board
**Output:** `true`
**Explanation:** No duplicate in any row, column, or box.

### Example 2:
**Input:** Board with duplicate '8' in a row
**Output:** `false`
**Explanation:** Violates row constraint.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Board Size | 9 × 9 |
| Cell Value | '1'-'9' or '.' (empty) |
| Data Type | 2D character array |
| Special Conditions | Only check filled cells |
| Time Complexity | O(1) - fixed 81 cells |
| Space Complexity | O(1) - fixed 9 rows/cols/boxes |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Apple | 🟡 Uber | 🟢 King |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Puzzle Baron |

---

## Follow-up Questions

1. How do you identify which 3×3 box a cell belongs to?
2. What data structure tracks seen numbers?
3. Can you solve the Sudoku (Sudoku Solver)?
4. What's the optimal way to encode box + row + col seen?
