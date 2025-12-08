# Valid Square

## Problem Description

**Real-World Scenario:**
A computer vision system verifies if a detected shape is a perfect square (e.g., a QR code marker).

**Example Setup:** 
Checking if 4 GPS coordinates form a square building footprint.

**What is Valid Square?**
Given the coordinates of four points in 2D space `p1`, `p2`, `p3` and `p4`, return `true` if the four points construct a square.
The coordinate of a point `pi` is represented as `[xi, yi]`. The input is not given in any order.
A valid square has four equal sides with positive length and four equal angles (90-degree angles).

**Why is it important?**
- Geometry (Distance Formula)
- Sorting / Set
- Property Verification

**Your Task:** 
Return boolean.

---

## Examples

### Example 1:
**Input:** `p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]`
**Output:** `true`

### Example 2:
**Input:** `p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]`
**Output:** `false`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Coordinates | Integer range |
| Time Complexity | O(1) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Wayfair |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Yelp |
| 🔵 Facebook | 🟡 Apple | 🟢 Expedia |

---

## Follow-up Questions

1. How many distances between 4 points? (6 distances).
2. What are the properties of distances in a square? (4 equal sides, 2 equal diagonals. Diagonals > Sides).
3. Can we just sort the 6 distances? (Yes, should have 4 small equal values and 2 large equal values).
4. Check for zero area? (Yes, side length > 0).
