# Maximal Rectangle

## Problem Description

**Real-World Scenario:**
A land developer wants to find the largest rectangular plot of land available in a grid map containing obstacles.

**Example Setup:** 
Finding the largest clear area on a screen for a popup window.

**What is Maximal Rectangle?**
Given a `rows x cols` binary matrix filled with `0`'s and `1`'s, find the largest rectangle containing only `1`'s and return its area.

**Why is it important?**
- Dynamic Programming
- Stack (Histogram approach)
- Matrix Traversal

**Your Task:** 
Return max area.

---

## Examples

### Example 1:
**Input:** `matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]`
**Output:** `6`
**Explanation:** The maximal rectangle is shown in the above picture (rows 1-2, cols 2-4).

### Example 2:
**Input:** `matrix = [["0"]]`
**Output:** `0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ rows, cols ≤ 200 |
| Values | '0' or '1' |
| Time Complexity | O(N * M) |
| Space Complexity | O(M) |
| Output Format | Integer area |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Wayfair |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Yelp |
| 🔵 Facebook | 🟡 Apple | 🟢 Expedia |

---

## Follow-up Questions

1. Relationship to "Largest Rectangle in Histogram"? (Each row can be treated as the base of a histogram).
2. How to update heights? (If `matrix[i][j] == '1'`, `height[j]++`, else `height[j] = 0`).
3. DP approach? (Compute left, right, height for each cell).
