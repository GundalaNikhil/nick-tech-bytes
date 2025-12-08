# The Skyline Problem

## Problem Description

**Real-World Scenario:**
A city planner generates a 2D silhouette of a city skyline from a list of building locations and heights to analyze view corridors.

**Example Setup:** 
A computer graphics engine renders the outline of overlapping 2D shapes for shadow generation.

**What is The Skyline Problem?**
A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively. Each building is represented by `[left, right, height]`. The skyline is a list of "key points" `[x, y]` sorted by x.

**Why is it important?**
- Sweep Line algorithm
- Heap / Segment Tree / TreeMap
- Geometric processing
- Hard interview problem

**Your Task:** 
Return the list of key points representing the skyline.

**Difficulty:** Medium
**Tags:** Heaps, Applications, Sweep Line, Heap / Segment Tree / Treemap, Geometric Processing, Hard Interview, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]`
**Output:** `[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]`
**Explanation:** The outline points where height changes.

### Example 2:
**Input:** `buildings = [[0,2,3],[2,5,3]]`
**Output:** `[[0,3],[5,0]]`
**Explanation:** Buildings merge into one block.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Buildings | 1 ≤ n ≤ 10⁴ |
| Coordinates | 0 ≤ left < right ≤ 2³¹-1 |
| Height | 1 ≤ height ≤ 2³¹-1 |
| Data Type | Integer arrays |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | List of [x, y] points |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yelp |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Zillow |
| 🔵 Facebook | 🟡 Apple | 🟢 Redfin |

---

## Follow-up Questions

1. Why separate start and end points of buildings?
2. Why use a max-heap to track current max height?
3. How to handle buildings starting/ending at same x?
4. What is the Divide and Conquer approach?
