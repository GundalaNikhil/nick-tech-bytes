# Gas Station

## Problem Description

**Real-World Scenario:**
A car needs to travel around a circular route of gas stations. You want to find the starting station from which you can complete the full circle without running out of gas.

**Example Setup:** 
Finding a starting point in a cyclic process where resources are consumed and replenished.

**What is Gas Station?**
There are `n` gas stations along a circular route, where the amount of gas at the `i-th` station is `gas[i]`.
You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `i-th` station to its next `(i + 1)-th` station. You begin the journey with an empty tank at one of the gas stations.
Given two integer arrays `gas` and `cost`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. If there exists a solution, it is guaranteed to be unique.

**Why is it important?**
- Greedy
- Prefix Sum
- Circular Array Logic

**Your Task:** 
Return starting index.

**Difficulty:** Easy
**Tags:** Greedy, Basics, Prefix Sum, Circular Array Logic, O(N), Interview

---

## Examples

### Example 1:
**Input:** `gas = [1,2,3,4,5], cost = [3,4,5,1,2]`
**Output:** `3`
**Explanation:** 
Start at station 3 (index 3) with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3.

### Example 2:
**Input:** `gas = [2,3,4], cost = [3,4,3]`
**Output:** `-1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Stations (n) | 1 ≤ n ≤ 10^5 |
| Values | 0 ≤ gas[i], cost[i] ≤ 10^4 |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer index |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 IBM |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Oracle |
| 🔵 Facebook | 🟡 Apple | 🟢 Cisco |

---

## Follow-up Questions

1. Why check `total_gas < total_cost` first? (If total gas < total cost, impossible).
2. Why reset start to `i + 1` if tank < 0? (If you can't reach `i` from `start`, you can't reach `i` from any station between `start` and `i`).
3. Why is the solution unique? (Problem statement guarantee).
