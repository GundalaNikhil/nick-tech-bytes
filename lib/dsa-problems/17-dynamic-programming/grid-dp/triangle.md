# Triangle

## Problem Description

**Real-World Scenario:**
A skier navigates down a mountain slope, choosing the path of least resistance (minimum effort). Can only move to adjacent spots below.

**Example Setup:** 
A network packet routing algorithm finds the lowest latency path through a triangular network topology.

**What is Triangle?**
Given a triangle array, return the minimum path sum from top to bottom. For each step, you may move to an adjacent number of the row below.

**Why is it important?**
- 2D DP (bottom-up or top-down)
- Path minimization
- In-place optimization
- Classic DP pattern

**Your Task:** 
Return the minimum path sum.

---

## Examples

### Example 1:
**Input:** 
```
triangle = [
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
```
**Output:** `11`
**Explanation:** 2 + 3 + 5 + 1 = 11.

### Example 2:
**Input:** `triangle = [[-10]]`
**Output:** `-10`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Rows | 1 ≤ rows ≤ 200 |
| Element Value | -10⁴ ≤ val ≤ 10⁴ |
| Data Type | List of lists |
| Special Conditions | Adjacent moves only |
| Time Complexity | O(n²) |
| Space Complexity | O(n) or O(1) in-place |
| Output Format | Minimum sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Vail Resorts |
| 🔵 Google | 🟡 Apple | 🟢 Burton |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Rossignol |

---

## Follow-up Questions

1. Why is bottom-up easier than top-down?
2. How to do it in O(n) space?
3. How to do it in O(1) extra space (modifying input)?
4. What if you wanted the maximum path sum?
