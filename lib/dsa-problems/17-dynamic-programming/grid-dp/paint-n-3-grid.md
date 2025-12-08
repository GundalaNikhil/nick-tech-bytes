# Number of Ways to Paint N × 3 Grid

## Problem Description

**Real-World Scenario:**
A fabric designer creates patterns on a grid where adjacent cells must have different colors to ensure visual contrast, using 3 available colors.

**Example Setup:** 
A chip layout planner assigns power domains to a grid of components such that no two adjacent components share the same domain to prevent interference.

**What is Number of Ways to Paint N x 3 Grid?**
You have a `grid` of size `n x 3` and you want to paint each cell of the grid with exactly one of the three colors: **Red**, **Yellow**, or **Green** while making sure that no two adjacent cells have the same color (i.e., no two cells that share vertical or horizontal sides have the same color). Given `n` the number of rows of the grid, return the number of ways you can paint this `grid`. As the answer may grow quite large, the answer must be computed modulo 10^9 + 7.

**Why is it important?**
- DP with State Compression
- Pattern recognition (ABA vs ABC types)
- Matrix Exponentiation
- Combinatorics

**Your Task:** 
Return count of ways.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Grid Dp, Dp With State Compression, Pattern Recognition, Matrix Exponentiation, Combinatorics, O(N), Interview

---

## Examples

### Example 1:
**Input:** `n = 1`
**Output:** `12`
**Explanation:** 
Types:
ABC (3*2*1 = 6 ways)
ABA (3*2*1 = 6 ways)
Total 12.

### Example 2:
**Input:** `n = 2`
**Output:** `54`

### Example 3:
**Input:** `n = 5000`
**Output:** `30228214`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Rows | 1 ≤ n ≤ 5000 |
| Columns | Fixed at 3 |
| Colors | 3 |
| Data Type | Integer |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Wayfair |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Etsy |
| 🔵 Facebook | 🟡 Apple | 🟢 Pinterest |

---

## Follow-up Questions

1. What are the two valid row patterns (ABC and ABA)?
2. How many ways to paint next row if current is ABC?
3. How many ways to paint next row if current is ABA?
4. Recurrence: `newABC = 2*ABC + 2*ABA`, `newABA = 2*ABC + 3*ABA`. Why?
