# Search in 2D Matrix

## Problem Description

**Real-World Scenario:**
A spreadsheet search finds a value in a sorted table. Each row is sorted, and first element of each row > last element of previous row.

**Example Setup:** 
A database with sorted partitions searches for a record efficiently using binary search on the 2D structure.

**What is Search in 2D Matrix?**
Given an m×n matrix where each row is sorted and first integer of row > last of previous row, search for a target value.

**Why is it important?**
- Binary search on 2D
- Matrix as 1D array
- Efficient lookups
- Two-stage search

**Your Task:** 
Return true if target exists in matrix.

---

## Examples

### Example 1:
**Input:** 
```
matrix = [
  [1, 3, 5, 7],
  [10,11,16,20],
  [23,30,34,60]
]
target = 3
```
**Output:** `true`

### Example 2:
**Input:** Same matrix, target = 13
**Output:** `false`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Matrix Size | 1 ≤ m, n ≤ 100 |
| Element Range | -10⁴ ≤ matrix[i][j] ≤ 10⁴ |
| Data Type | Integer matrix |
| Special Conditions | Fully sorted (row-wise connected) |
| Time Complexity | O(log(m × n)) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Oracle |
| 🔵 Microsoft | 🟡 Adobe | 🟢 SAP |
| 🔵 Google | 🟡 Apple | 🟢 Salesforce |

---

## Follow-up Questions

1. How do you treat the matrix as a 1D array?
2. What's the conversion from 1D index to 2D?
3. What about Search a 2D Matrix II (different sorting)?
4. Can you do two binary searches instead?
