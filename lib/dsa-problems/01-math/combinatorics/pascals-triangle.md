# Pascal's Triangle

## Problem Description

**Real-World Scenario:**
Pascal's Triangle appears in probability (binomial distribution) and combinatorics. Each number is the sum of the two above it - generating coefficient patterns used in statistics.

**Example Setup:** 
A math tutoring app visualizes Pascal's Triangle for students learning binomial expansion. Generate the first N rows dynamically.

**What is Pascal's Triangle?**
Generate the first n rows where:
- Row 0: [1]
- Row 1: [1, 1]
- Each subsequent row: edges are 1, middle values are sum of two above

**Why is it important?**
- Combinatorics (nCr values)
- Binomial theorem coefficients
- Probability calculations
- Pattern visualization

**Your Task:** 
Generate the first numRows of Pascal's Triangle.

---

## Examples

### Example 1:
**Input:** `numRows = 5`
**Output:** 
```
[
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1]
]
```
**Explanation:** Each element is sum of two above.

### Example 2:
**Input:** `numRows = 1`
**Output:** `[[1]]`
**Explanation:** Just the first row.

### Example 3:
**Input:** `numRows = 3`
**Output:** `[[1], [1, 1], [1, 2, 1]]`
**Explanation:** First 3 rows.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Rows | 1 ≤ numRows ≤ 30 |
| Data Type | Integer arrays |
| Special Conditions | Values fit in 32-bit integer |
| Time Complexity | O(n²) |
| Space Complexity | O(n²) for output |
| Output Format | 2D array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Amazon | 🟡 Adobe | 🟢 Qualcomm |
| 🔵 Apple | 🟡 Oracle | 🟢 Mathworks |

---

## Follow-up Questions

1. How would you get just the Nth row efficiently?
2. What's the relationship to binomial coefficients?
3. Can you generate in O(n) space?
4. How do the numbers relate to nCr formula?
