# Dungeon Game

## Problem Description

**Real-World Scenario:**
A spaceship navigates through a hazardous asteroid field. Each sector drains or recharges shields. Find the minimum initial shield capacity needed to survive the journey.

**Example Setup:** 
A knight enters a dungeon with rooms containing demons (damage) or magic orbs (health). Find minimum starting health to reach the princess alive.

**What is Dungeon Game?**
Given a grid where cells contain negative numbers (damage) or positive numbers (health), find the minimum initial health needed to go from top-left to bottom-right. Health must never drop to 0 or below.

**Why is it important?**
- 2D DP (bottom-up required)
- Reverse thinking
- Grid pathfinding
- Hard interview problem

**Your Task:** 
Return the minimum initial health.

---

## Examples

### Example 1:
**Input:** 
```
dungeon = [
  [-2, -3, 3],
  [-5, -10, 1],
  [10, 30, -5]
]
```
**Output:** `7`
**Explanation:** Path: Right->Right->Down->Down.
Start with 7: -2 -> 5, -3 -> 2, +3 -> 5, +1 -> 6, -5 -> 1. Alive.

### Example 2:
**Input:** `dungeon = [[0]]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Grid Size | 1 ≤ m, n ≤ 200 |
| Cell Value | -1000 ≤ val ≤ 1000 |
| Data Type | Integer matrix |
| Special Conditions | Health > 0 always |
| Time Complexity | O(m × n) |
| Space Complexity | O(m × n) |
| Output Format | Minimum initial health |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Blizzard |
| 🔵 Amazon | 🟡 Microsoft | 🟢 EA |
| 🔵 Facebook | 🟡 Apple | 🟢 Ubisoft |

---

## Follow-up Questions

1. Why must you solve this from bottom-right to top-left?
2. What is the recurrence relation?
3. How do you handle the boundary conditions?
4. Can you optimize space to O(n)?
