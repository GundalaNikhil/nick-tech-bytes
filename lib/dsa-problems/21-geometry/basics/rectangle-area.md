# Rectangle Area

## Problem Description

**Real-World Scenario:**
Calculating the total covered area of two overlapping windows on a screen.

**Example Setup:** 
Finding the union area of two rectangular plots of land.

**What is Rectangle Area?**
Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles.
The first rectangle is defined by its bottom-left corner `(ax1, ay1)` and its top-right corner `(ax2, ay2)`.
The second rectangle is defined by its bottom-left corner `(bx1, by1)` and its top-right corner `(bx2, by2)`.

**Why is it important?**
- Geometry (Overlap Calculation)
- Math (Inclusion-Exclusion Principle)
- Bounding Box Logic

**Your Task:** 
Return total area.

---

## Examples

### Example 1:
**Input:** `ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2`
**Output:** `45`
**Explanation:** Area1 = 6*4 = 24. Area2 = 9*3 = 27. Overlap = 3*2 = 6. Total = 24 + 27 - 6 = 45.

### Example 2:
**Input:** `ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2`
**Output:** `16`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Coordinates | Integer range |
| Time Complexity | O(1) |
| Space Complexity | O(1) |
| Output Format | Integer area |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Redfin |
| 🔵 Facebook | 🟡 Apple | 🟢 Trulia |

---

## Follow-up Questions

1. How to calculate overlap width? `max(0, min(ax2, bx2) - max(ax1, bx1))`.
2. How to calculate overlap height? `max(0, min(ay2, by2) - max(ay1, by1))`.
3. Total Area = Area1 + Area2 - Overlap.
