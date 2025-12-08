# Max Points on a Line

## Problem Description

**Real-World Scenario:**
A computer vision system detects straight lines (edges) in an image by finding the maximum number of collinear pixels.

**Example Setup:** 
A surveying tool finds the longest straight boundary line from a set of marker points.

**What is Max Points on a Line?**
Given an array of `points` where `points[i] = [xi, yi]`, return the maximum number of points that lie on the same straight line.

**Why is it important?**
- Geometry / Math
- GCD for slope calculation
- HashMap optimization
- Hard interview problem

**Your Task:** 
Return max collinear points.

**Difficulty:** Medium
**Tags:** Math, Geometry, Geometry / Math, Gcd For Slope Calculation, Hashmap Optimization, Hard Interview, O(n²), Interview

---

## Examples

### Example 1:
**Input:** `points = [[1,1],[2,2],[3,3]]`
**Output:** `3`

### Example 2:
**Input:** `points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]`
**Output:** `4`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Points | 1 ≤ n ≤ 300 |
| Coordinates | -10⁴ ≤ x, y ≤ 10⁴ |
| Data Type | Integer pairs |
| Special Conditions | Duplicate points possible? (Usually distinct in LeetCode) |
| Time Complexity | O(n²) |
| Space Complexity | O(n) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 LinkedIn |
| 🔵 Amazon | 🟡 Apple | 🟢 Twitter |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Snap |

---

## Follow-up Questions

1. Why use GCD to represent slope (dy/dx) instead of double?
2. How to handle vertical lines (dx = 0)?
3. Why iterate through each point as a starting point?
4. How to handle duplicate points (if allowed)?
