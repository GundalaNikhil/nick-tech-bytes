# Set Matrix Zeroes

## Problem Description

**Real-World Scenario:**
In a spreadsheet, when a cell has an error (0), the entire row and column should be highlighted (set to 0). This propagation must be done efficiently without affecting the detection of other error cells.

**Example Setup:** 
A Minesweeper-like game: when a bomb (0) is clicked, the entire row and column clear out. Implement this "explosion" effect on the grid.

**What is Set Matrix Zeroes?**
If an element is 0, set its entire row and column to 0. Do this in-place with O(1) extra space.

**Why is it important?**
- In-place matrix manipulation
- Clever use of matrix itself as storage
- Space optimization techniques
- Common interview problem

**Your Task:** 
Set entire row and column to 0 for every 0 in the matrix, in-place.

---

## Examples

### Example 1:
**Input:** 
```
matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
]
```
**Output:** 
```
[
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1]
]
```
**Explanation:** The 0 at (1,1) zeros out row 1 and column 1.

### Example 2:
**Input:** 
```
matrix = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5]
]
```
**Output:** 
```
[
  [0, 0, 0, 0],
  [0, 4, 5, 0],
  [0, 3, 1, 0]
]
```
**Explanation:** Two 0s propagate through rows and columns.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Rows | 1 ≤ m ≤ 200 |
| Columns | 1 ≤ n ≤ 200 |
| Element Range | -2³¹ ≤ matrix[i][j] ≤ 2³¹-1 |
| Special Conditions | In-place modification |
| Time Complexity | O(m × n) |
| Space Complexity | O(1) extra |
| Output Format | Modified matrix |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Indeed |
| 🔵 Facebook | 🟡 Oracle | 🟢 Qualtrics |
| 🔵 Microsoft | 🟡 Adobe | 🟢 ServiceNow |

---

## Follow-up Questions

1. Can you use O(m+n) space with marker arrays?
2. How do you use the first row/column as markers for O(1)?
3. Why do you need a separate variable for first column?
4. What if you need to preserve original matrix?
