# Maximal Square

## Problem Description

**Real-World Scenario:**
A real estate developer looks at a city grid map. Some plots are buildable (1), some aren't (0). Find the largest square area that can be developed.

**Example Setup:** 
An image processing system detects the largest square region of white pixels in a black-and-white image for logo placement.

**What is Maximal Square?**
Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

**Why is it important?**
- 2D DP classic
- Image processing
- Area optimization
- Matrix patterns

**Your Task:** 
Return the area of the largest square of 1s.

**Difficulty:** Medium
**Tags:** Dynamic Programming, 2D Dp, 2D Dp Classic, Image Processing, Area Optimization, Matrix Patterns, O(m × n), Interview

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
**Output:** `4`
**Explanation:** 2×2 square of 1s exists.

### Example 2:
**Input:** 
```
matrix = [
  ["0","1"],
  ["1","0"]
]
```
**Output:** `1`
**Explanation:** Only 1×1 squares.

### Example 3:
**Input:** `matrix = [["0"]]`
**Output:** `0`
**Explanation:** No 1s in matrix.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 300 |
| Cell Value | '0' or '1' |
| Data Type | 2D character array |
| Special Conditions | Return area, not side length |
| Time Complexity | O(m × n) |
| Space Complexity | O(n) optimized |
| Output Format | Area integer (side²) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Amazon | 🟡 IBM | 🟢 Redfin |
| 🔵 Apple | 🟡 Adobe | 🟢 Realtor |

---

## Follow-up Questions

1. What's the DP recurrence: dp[i][j] = min(left, top, diagonal) + 1?
2. Why minimum of three neighbors?
3. How would you find maximal rectangle (harder)?
4. Can you optimize to O(n) space?
