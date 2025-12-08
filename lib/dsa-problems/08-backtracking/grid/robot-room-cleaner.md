# Robot Room Cleaner

## Problem Description

**Real-World Scenario:**
A cleaning robot navigates an unknown room without a map, systematically cleaning while avoiding obstacles.

**Example Setup:** 
An autonomous vacuum (like Roomba) must explore and clean every reachable cell in an unknown environment.

**What is Robot Room Cleaner?**
Design an algorithm for a robot to clean all cells in an unknown room. The robot can only move forward, turn left, turn right, and clean.

**Why is it important?**
- DFS with backtracking
- Unknown environment exploration
- Robotics algorithms
- State tracking

**Your Task:** 
Clean all reachable cells in the room.

**Difficulty:** Medium
**Tags:** Backtracking, Grid, Dfs With Backtracking, Unknown Environment Exploration, Robotics Algorithms, State Tracking, O(4^(n-m), Interview

---

## Examples

### Example 1:
**Input:** Room grid (hidden), robot starts at (1,3) facing right
**Output:** All accessible cells cleaned
**Explanation:** Robot explores using spiral/DFS pattern.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Room Size | 1 ≤ m, n ≤ 200 |
| Operations | move(), turnLeft(), turnRight(), clean() |
| Data Type | Hidden grid, robot API |
| Special Conditions | Robot doesn't know the room layout |
| Time Complexity | O(4^(n-m)) calls |
| Space Complexity | O(n × m) for visited |
| Output Format | All cells cleaned |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 iRobot |
| 🔵 Amazon | 🟡 Apple | 🟢 Roborock |
| 🔵 Facebook | 🟡 Microsoft | 🟢 Ecovacs |

---

## Follow-up Questions

1. Why use direction vectors for movement?
2. How do you track visited cells relative to start?
3. How does the backtrack work (turn 180°)?
4. What about optimizing path length?
