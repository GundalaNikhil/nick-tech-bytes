# Regions Cut By Slashes

## Problem Description

**Real-World Scenario:**
A land surveyor calculates the number of separate plots of land created by a series of fences or walls drawn on a grid.

**Example Setup:** 
Cutting a pizza or cake with multiple intersecting cuts and counting the pieces.

**What is Regions Cut By Slashes?**
An `n x n` grid is composed of `1 x 1` squares where each `1 x 1` square consists of a `'/'`, `'\'`, or blank space `' '`. These characters divide the square into contiguous regions.
Given the grid `grid` represented as a string array, return the number of regions.

**Why is it important?**
- Union-Find
- Grid Upscaling (3x3 trick)
- Graph Connectivity
- Spatial Reasoning

**Your Task:** 
Return number of regions.

---

## Examples

### Example 1:
**Input:** `grid = [" /","/ "]`
**Output:** `2`
**Explanation:** 2x2 grid. Two slashes form a closed loop in the middle? No, they split the grid into 2 regions.

### Example 2:
**Input:** `grid = ["/\\","\\/"]`
**Output:** `5`
**Explanation:** 
Recall that `\` escapes to `\`.
Top-left /, Top-right \.
Bottom-left \, Bottom-right /.
Creates a diamond in the center and 4 corners. Total 5.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ n ≤ 30 |
| Characters | '/', '\', ' ' |
| Data Type | String array |
| Time Complexity | O(N^2) |
| Space Complexity | O(N^2) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Datadog |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Unity |
| 🔵 Facebook | 🟡 Apple | 🟢 Roblox |

---

## Follow-up Questions

1. Why upscale each cell to 3x3? (To handle connections without fractional coordinates).
2. Can you do it with 2x2? (No, center point ambiguity).
3. Can you do it with 4x4? (Yes, but 3x3 is minimal sufficient).
4. Union-Find on the upscaled grid? (Count connected components of '0's).
