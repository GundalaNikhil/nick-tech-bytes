# Maximal Rectangle

## Problem Description

**Real-World Scenario:**
A smart crop monitoring system analyzes a grid of land plots (1=fertile, 0=barren) to find the largest rectangular area of fertile land for planting a single crop type.

**Example Setup:** 
A display driver allocates the largest possible rectangular buffer in a fragmented memory grid.

**What is Maximal Rectangle?**
Given a binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

**Why is it important?**
- DP or Stack-based solution
- Extension of Largest Rectangle in Histogram
- 2D grid optimization
- Hard interview problem

**Your Task:** 
Return the area of the largest rectangle.

**Difficulty:** Medium
**Tags:** Stack, Monotonic, Dp Or Stack-Based Solution, Extension Of Largest Rectangle In Histogram, 2D Grid Optimization, Hard Interview, O(rows * cols), Interview

---

## Examples

### Example 1:
**Input:** 
```
matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
```
**Output:** `6`
**Explanation:** The maximal rectangle is shown in the third row (indices 2,3,4) and second row (indices 2,3,4) is not fully connected, wait. Actually, the rectangle is formed by `["1","1","1"]` in row 2 and `["1","1","1"]` in row 3? No.
Correct explanation: The largest rectangle is 2x3 or 3x2?
In the example above, the last 3 columns of row 2 are "1","1","1". Row 3 has "1","1","1","1","1".
The intersection of row 2 and 3 at cols 2,3,4 is:
Row 2: 1 1 1
Row 3: 1 1 1
This forms a 2x3 rectangle. Area = 6.

### Example 2:
**Input:** `matrix = [["0"]]`
**Output:** `0`

### Example 3:
**Input:** `matrix = [["1"]]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Rows | 1 ≤ rows ≤ 200 |
| Columns | 1 ≤ cols ≤ 200 |
| Elements | '0' or '1' |
| Data Type | Character matrix |
| Time Complexity | O(rows * cols) |
| Space Complexity | O(cols) |
| Output Format | Integer area |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Wayfair |
| 🔵 Amazon | 🟡 Apple | 🟢 Zillow |
| 🔵 Microsoft | 🟡 Uber | 🟢 Redfin |

---

## Follow-up Questions

1. How can you convert this to "Largest Rectangle in Histogram" for each row?
2. What is the DP approach involving height, left, and right arrays?
3. How does the stack solution work?
4. Can you optimize space to O(cols)?
