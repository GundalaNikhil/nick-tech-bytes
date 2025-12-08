# Matrix Chain Multiplication

## Problem Description

**Real-World Scenario:**
Graphics engines multiply multiple transformation matrices. The order of multiplication affects computation cost (number of scalar multiplications). Find the optimal parenthesization!

**Example Setup:** 
Scientific computing multiplies large matrices. For matrices A(10×30), B(30×5), C(5×60): computing (AB)C takes 10×30×5 + 10×5×60 = 4500, but A(BC) takes 30×5×60 + 10×30×60 = 27000. Order matters!

**What is Matrix Chain Multiplication?**
Given dimensions of matrices, find the minimum number of scalar multiplications needed to compute their product.

**Why is it important?**
- Classic interval DP
- Optimization problems
- Graphics/ML applications
- Parenthesization decisions

**Your Task:** 
Find the minimum cost to multiply all matrices.

---

## Examples

### Example 1:
**Input:** `dims = [10, 30, 5, 60]`
**Output:** `4500`
**Explanation:** Matrices: A(10×30), B(30×5), C(5×60). Optimal: (AB)C.

### Example 2:
**Input:** `dims = [40, 20, 30, 10, 30]`
**Output:** `26000`
**Explanation:** Four matrices with given dimensions.

### Example 3:
**Input:** `dims = [10, 20, 30]`
**Output:** `6000`
**Explanation:** Two matrices: 10×20 × 20×30 = 6000.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Matrices | 2 ≤ n ≤ 100 |
| Dimensions | 1 ≤ dims[i] ≤ 500 |
| Data Type | Integer array |
| Special Conditions | dims has n+1 elements for n matrices |
| Time Complexity | O(n³) |
| Space Complexity | O(n²) |
| Output Format | Minimum multiplications |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Nvidia | 🟢 AMD |
| 🔵 Amazon | 🟡 Intel | 🟢 ARM |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Qualcomm |

---

## Follow-up Questions

1. What's the DP recurrence?
2. How would you print the optimal parenthesization?
3. What's the relationship to interval DP?
4. Can you reduce to O(n log n) with Hu-Shing algorithm?
