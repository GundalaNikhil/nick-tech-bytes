# Trapping Rain Water

## Problem Description

**Real-World Scenario:**
Calculating how much water can be retained in a terrain profile after a heavy rainfall.

**Example Setup:** 
Designing a drainage system capacity based on elevation map.

**What is Trapping Rain Water?**
Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Why is it important?**
- Two Pointers
- Dynamic Programming (Left/Right Max Arrays)
- Monotonic Stack
- Classic Interview Problem

**Your Task:** 
Return total water volume.

**Difficulty:** Medium
**Tags:** Array, Two Pointers, Dynamic Programming, Monotonic Stack, Classic Interview, O(N), Interview

---

## Examples

### Example 1:
**Input:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
**Output:** `6`
**Explanation:** The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

### Example 2:
**Input:** `height = [4,2,0,3,2,5]`
**Output:** `9`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 2 * 10^4 |
| Height | 0 ≤ height[i] ≤ 10^5 |
| Time Complexity | O(N) |
| Space Complexity | O(1) (Two Pointers) or O(N) (DP/Stack) |
| Output Format | Integer volume |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Why `min(left_max, right_max) - height[i]`? (Water level is determined by the shorter wall).
2. Why Two Pointers works? (We can determine the shorter wall without knowing the exact height of the taller wall on the other side).
3. Monotonic Stack approach? (Finding "valleys" and filling them horizontally).
