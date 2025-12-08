# Minimum Area Rectangle

## Problem Description

**Real-World Scenario:**
A chip designer wants to find the smallest rectangular area formed by 4 pins on a circuit board to optimize space.

**Example Setup:** 
Finding the smallest rectangular plot of land defined by 4 corner markers.

**What is Minimum Area Rectangle?**
You are given an array of points in the X-Y plane `points` where `points[i] = [xi, yi]`.
Return the minimum area of a rectangle formed from these points, with sides parallel to the X and Y axes. If there is not any such rectangle, return 0.

**Why is it important?**
- Geometry
- Hash Set / Hash Map
- Diagonal Property

**Your Task:** 
Return minimum area.

---

## Examples

### Example 1:
**Input:** `points = [[1,1],[1,3],[3,1],[3,3],[2,2]]`
**Output:** `4`
**Explanation:** Rectangle with corners (1,1), (1,3), (3,1), (3,3). Area = 2 * 2 = 4.

### Example 2:
**Input:** `points = [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]`
**Output:** `2`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Points (n) | 1 ≤ n ≤ 500 |
| Coordinates | 0 ≤ x, y ≤ 4 * 10^4 |
| Time Complexity | O(N^2) |
| Space Complexity | O(N) |
| Output Format | Integer area |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Houzz |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Zillow |
| 🔵 Facebook | 🟡 Apple | 🟢 Redfin |

---

## Follow-up Questions

1. Why iterate pairs of points as diagonals? (If p1 and p2 form a diagonal, check if (p1.x, p2.y) and (p2.x, p1.y) exist).
2. Why use a Set? (O(1) lookup for existence).
3. Time complexity? (O(N^2) pairs).
