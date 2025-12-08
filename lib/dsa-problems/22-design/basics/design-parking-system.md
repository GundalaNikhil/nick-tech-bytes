# Design Parking System

## Problem Description

**Real-World Scenario:**
A smart parking lot system that tracks available spots for different vehicle sizes (Big, Medium, Small).

**Example Setup:** 
Resource allocator managing slots for different types of jobs.

**What is Design Parking System?**
Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.
Implement the `ParkingSystem` class:
- `ParkingSystem(int big, int medium, int small)` Initializes object of the `ParkingSystem` class. The number of slots for each parking space are given as part of the constructor.
- `bool addCar(int carType)` Checks whether there is a parking space of `carType` for the car that wants to get into the parking lot. `carType` can be of three kinds: big, medium, or small, which are represented by 1, 2, and 3 respectively. A car can only park in a parking space of its `carType`. If there is no space available, return `false`, else park the car in that size space and return `true`.

**Why is it important?**
- Object Oriented Design
- State Management
- Simple Logic

**Your Task:** 
Implement the class.

**Difficulty:** Hard
**Tags:** Design, Basics, Object Oriented Design, State Management, Simple Logic, O(1), Interview

---

## Examples

### Example 1:
**Input:** 
`ParkingSystem(1, 1, 0)`
`addCar(1)` -> true (big car parked)
`addCar(2)` -> true (medium car parked)
`addCar(3)` -> false (no small spots)
`addCar(1)` -> false (no big spots left)

---

## Constraints

| Constraint | Value |
|------------|-------|
| Calls | At most 1000 calls |
| Slots | 0 ≤ slots ≤ 1000 |
| Time Complexity | O(1) |
| Space Complexity | O(1) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Grab |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Gojek |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. How to extend to more car types? (Use an array or map).
2. Thread safety? (Use atomic integers or locks).
3. Real-time monitoring? (Add `removeCar` method).
