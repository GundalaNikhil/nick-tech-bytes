# Spiral Matrix

## Problem Description

**Real-World Scenario:**
A printer prints a large poster in spiral pattern to minimize print head movement. Starting from top-left, it prints in a spiral until the entire poster is done.

**Example Setup:** 
A snake game moves in a spiral pattern to clear all cells. Given a grid, generate the sequence of cells visited in spiral order.

**What is Spiral Matrix?**
Given an m×n matrix, return all elements in spiral order: right → down → left → up → right... until all elements visited.

**Why is it important?**
- Matrix traversal patterns
- Boundary manipulation
- Image processing
- 2D array mastery

**Your Task:** 
Return all elements of the matrix in spiral order.

**Difficulty:** Medium
**Tags:** Array, Matrix, Matrix Traversal Patterns, Boundary Manipulation, Image Processing, 2D Array Mastery, O(m × n), Interview

---

## Examples

### Example 1:
**Input:** 
```
matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```
**Output:** `[1, 2, 3, 6, 9, 8, 7, 4, 5]`
**Explanation:** Spiral: right→down→left→up→right

### Example 2:
**Input:** 
```
matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
]
```
**Output:** `[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]`
**Explanation:** Rectangular matrix spiral.

### Example 3:
**Input:** `matrix = [[1, 2], [3, 4]]`
**Output:** `[1, 2, 4, 3]`
**Explanation:** 2×2 matrix spiral.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Rows | 1 ≤ m ≤ 10 |
| Columns | 1 ≤ n ≤ 10 |
| Element Range | -100 ≤ matrix[i][j] ≤ 100 |
| Special Conditions | Non-empty matrix |
| Time Complexity | O(m × n) |
| Space Complexity | O(1) extra |
| Output Format | 1D array in spiral order |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Qualcomm |
| 🔵 Apple | 🟡 Uber | 🟢 Snap |

---

## Follow-up Questions

1. How do you manage four boundaries?
2. Can you generate a spiral matrix (opposite problem)?
3. How would you do spiral traversal for n×n matrix?
4. What if the matrix is not square?
