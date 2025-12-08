# K Closest Points to Origin

## Problem Description

**Real-World Scenario:**
A GPS system finds the `K` nearest points of interest (restaurants, gas stations) to your current location (origin).

**Example Setup:** 
Selecting the K strongest signals received by an antenna.

**What is K Closest Points to Origin?**
Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.
The distance between two points on the X-Y plane is the Euclidean distance (i.e., `√(x1 - x2)^2 + (y1 - y2)^2`).
You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

**Why is it important?**
- Heap / Priority Queue (Max Heap)
- QuickSelect (Average O(N))
- Sorting (O(N log N))

**Your Task:** 
Return list of K points.

**Difficulty:** Easy
**Tags:** Geometry, Basics, Heap / Priority Queue, Quickselect, Sorting, O(N log K), Interview

---

## Examples

### Example 1:
**Input:** `points = [[1,3],[-2,2]], k = 1`
**Output:** `[[-2,2]]`
**Explanation:** 
Distance (1, 3) = sqrt(10).
Distance (-2, 2) = sqrt(8).
Sqrt(8) < Sqrt(10).

### Example 2:
**Input:** `points = [[3,3],[5,-1],[-2,4]], k = 2`
**Output:** `[[3,3],[-2,4]]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Points (n) | 1 ≤ n ≤ 10^4 |
| k | 1 ≤ k ≤ n |
| Time Complexity | O(N log K) or O(N) |
| Space Complexity | O(K) |
| Output Format | List of Lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Asana |
| 🔵 Amazon | 🟡 Microsoft | 🟢 DoorDash |
| 🔵 Facebook | 🟡 Apple | 🟢 Grubhub |

---

## Follow-up Questions

1. Why Max Heap of size K? (Keep smallest K elements. If new element < max of heap, replace).
2. Why QuickSelect? (Find K-th smallest element in O(N) average, then return all elements to the left).
3. Do we need Sqrt? (No, compare squared distances to avoid precision issues).
