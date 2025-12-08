# Cherry Pickup

## Problem Description

**Real-World Scenario:**
Two warehouse robots start from corners and collect packages. They can't pick the same package twice. Maximize total.

**Example Setup:** 
A game with two players traversing a grid, collecting coins. Find maximum coins if both play optimally.

**What is Cherry Pickup?**
Start from (0,0) go to (n-1,n-1) and back. Can only move right/down, then left/up. Pick cherries (1s) once. Find maximum.

**Why is it important?**
- 3D DP / two simultaneous paths
- Grid optimization
- Dual traversal problems
- Hard DP classic

**Your Task:** 
Return maximum cherries collected in the round trip.

---

## Examples

### Example 1:
**Input:** 
```
[[0,1,-1],
 [1,0,-1],
 [1,1,1]]
```
**Output:** `5`
**Explanation:** Optimal paths collect 5 cherries.

### Example 2:
**Input:** `[[1,1,-1],[1,-1,1],[-1,1,1]]`
**Output:** `0`
**Explanation:** No valid path to reach bottom-right.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | n × n where 1 ≤ n ≤ 50 |
| Cell Values | -1 (blocked), 0 (empty), 1 (cherry) |
| Data Type | Integer matrix |
| Special Conditions | Can't walk through -1 |
| Time Complexity | O(n³) |
| Space Complexity | O(n³) or O(n²) optimized |
| Output Format | Maximum cherries |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Amazon Robotics |
| 🔵 Amazon | 🟡 DoorDash | 🟢 Ocado |
| 🔵 Microsoft | 🟡 Uber | 🟢 Symbotic |

---

## Follow-up Questions

1. Why model as two simultaneous walks?
2. What does dp[r1][c1][r2] represent (c2 derived)?
3. How handle blocked cells?
4. What about Cherry Pickup II (3D grid)?
