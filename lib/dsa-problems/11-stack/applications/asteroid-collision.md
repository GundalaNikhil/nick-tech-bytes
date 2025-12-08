# Asteroid Collision

## Problem Description

**Real-World Scenario:**
A space simulation tracks asteroid movements. Asteroids moving in opposite directions collide; the smaller one explodes (or both if equal size).

**Example Setup:** 
A physics game simulates balls on a track. Balls moving opposite directions collide based on their values.

**What is Asteroid Collision?**
Given an array of asteroids where positive = right, negative = left, simulate collisions. The larger one survives; if equal, both explode.

**Why is it important?**
- Stack collision simulation
- Sign-based direction
- Game physics
- Common pattern

**Your Task:** 
Return the state of asteroids after all collisions.

**Difficulty:** Medium
**Tags:** Stack, Applications, Stack Collision Simulation, Sign-Based Direction, Game Physics, Common Pattern, O(n), Interview

---

## Examples

### Example 1:
**Input:** `asteroids = [5, 10, -5]`
**Output:** `[5, 10]`
**Explanation:** 10 and -5 collide, 10 survives. 5 and 10 don't collide.

### Example 2:
**Input:** `asteroids = [8, -8]`
**Output:** `[]`
**Explanation:** Both explode.

### Example 3:
**Input:** `asteroids = [10, 2, -5]`
**Output:** `[10]`
**Explanation:** 2 and -5 collide, -5 wins. 10 and -5 collide, 10 wins.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Asteroids | 2 ≤ n ≤ 10⁴ |
| Size | 1 ≤ size ≤ 1000 |
| Data Type | Integer array with signs |
| Special Conditions | Same direction = no collision |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | Remaining asteroids |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 SpaceX |
| 🔵 Google | 🟡 Adobe | 🟢 Blue Origin |
| 🔵 Facebook | 🟡 Apple | 🟢 Rocket Lab |

---

## Follow-up Questions

1. When do collisions happen (positive before negative)?
2. How do you handle chain collisions?
3. Why use a stack?
4. What about different collision physics?
