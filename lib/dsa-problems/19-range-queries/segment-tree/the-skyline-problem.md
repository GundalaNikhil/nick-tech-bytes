# The Skyline Problem

## Problem Description

**Real-World Scenario:**
A city architect wants to generate the 2D silhouette (skyline) of a city from a list of 3D building coordinates for a sunset view rendering.

**Example Setup:** 
Merging time intervals with different heights/intensities.

**What is The Skyline Problem?**
A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.
The geometric information of each building is given by a triplet `[left, right, height]`.
The output is a list of "key points" `[x, y]` in sorted order of their x-coordinate in the form `[[x1,y1],[x2,y2],...]`. A key point is the left endpoint of a horizontal line segment in the skyline.

**Why is it important?**
- Divide and Conquer
- Sweep Line Algorithm
- Heap / Priority Queue
- Segment Tree (Lazy Propagation)

**Your Task:** 
Return list of key points.

**Difficulty:** Medium
**Tags:** Range Queries, Segment Tree, Divide And Conquer, Sweep Line, Heap / Priority Queue, O(N log N), Interview

---

## Examples

### Example 1:
**Input:** `buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]`
**Output:** `[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]`

### Example 2:
**Input:** `buildings = [[0,2,3],[2,5,3]]`
**Output:** `[[0,3],[5,0]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Buildings (n) | 1 ≤ n ≤ 10^4 |
| Coordinates | 0 ≤ left < right ≤ 2^31 - 1 |
| Time Complexity | O(N log N) |
| Space Complexity | O(N) |
| Output Format | List of Lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yelp |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Twitter |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Why split buildings into (x, -h) and (x, h) events? (Start vs End).
2. Why use a Max Heap? (To keep track of current active heights).
3. Handling edge cases (same x, different h)?
4. Divide and Conquer approach? (Merge two skylines).
