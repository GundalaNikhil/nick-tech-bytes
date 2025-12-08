# Maximum Product Subarray

## Problem Description

**Real-World Scenario:**
A factory measures machine efficiency multipliers. Find the contiguous run of machines with highest combined efficiency (product).

**Example Setup:** 
A genetics lab multiplies gene expression values. Find the consecutive sequence with maximum product (handling negatives flipping sign).

**What is Maximum Product Subarray?**
Find the contiguous subarray with largest product. Negative numbers can flip min to max!

**Why is it important?**
- Kadane variant with products
- Track both min and max
- Handle negatives and zeros
- Sign flipping insight

**Your Task:** 
Return the maximum product of any contiguous subarray.

---

## Examples

### Example 1:
**Input:** `nums = [2, 3, -2, 4]`
**Output:** `6`
**Explanation:** [2, 3] has product 6.

### Example 2:
**Input:** `nums = [-2, 0, -1]`
**Output:** `0`
**Explanation:** Can't skip the zero.

### Example 3:
**Input:** `nums = [-2, 3, -4]`
**Output:** `24`
**Explanation:** Entire array: -2 × 3 × -4 = 24.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 2 × 10⁴ |
| Element Range | -10 ≤ nums[i] ≤ 10 |
| Data Type | Integer array |
| Special Conditions | Product fits in 32-bit integer |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Maximum product |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Illumina |
| 🔵 Google | 🟡 LinkedIn | 🟢 23andMe |
| 🔵 Microsoft | 🟡 Apple | 🟢 Genentech |

---

## Follow-up Questions

1. Why track both min and max?
2. How do negatives affect the algorithm?
3. How do zeros reset the computation?
4. Can you solve with prefix/suffix products?
