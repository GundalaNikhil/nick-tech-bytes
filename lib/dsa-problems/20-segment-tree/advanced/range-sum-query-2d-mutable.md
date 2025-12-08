# Range Sum Query 2D - Mutable

## Problem Description

**Real-World Scenario:**
A spreadsheet application needs to calculate the sum of values in a rectangular region and support updating individual cell values efficiently.

**Example Setup:** 
A heat map visualization tool updates pixel intensities and queries the total intensity of rectangular areas.

**What is Range Sum Query 2D - Mutable?**
Given a 2D matrix `matrix`, handle multiple queries of the following types:
1. **Update**: Update the value of a cell in the matrix.
2. **Sum Region**: Calculate the sum of the elements of `matrix` inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.

**Why is it important?**
- 2D Binary Indexed Tree (Fenwick Tree)
- 2D Segment Tree (Quadtree)
- Dynamic 2D range queries
- Hard data structure problem

**Your Task:** 
Implement `NumMatrix` class with `update` and `sumRegion`.

---

## Examples

### Example 1:
**Operations:**
```
NumMatrix nm = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);
nm.sumRegion(2, 1, 4, 3); // return 8
nm.update(3, 2, 2);
nm.sumRegion(2, 1, 4, 3); // return 10
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Matrix Size | m, n ≤ 200 (Wait, usually smaller for 2D BIT?) Actually m*n <= 10^5 usually? |
| Operations | At most 10⁴ calls |
| Data Type | Integer matrix |
| Time Complexity | O(log m * log n) per operation |
| Space Complexity | O(m * n) |
| Output Format | Integer sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Tableau |
| 🔵 Amazon | 🟡 Apple | 🟢 Excel Team |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Airtable |

---

## Follow-up Questions

1. How does 2D BIT extend 1D BIT logic?
2. What is the update complexity O(log m * log n)?
3. Why is 2D Segment Tree (Quadtree) harder to implement?
4. How to handle immutable version (Prefix Sums O(1) query)?
