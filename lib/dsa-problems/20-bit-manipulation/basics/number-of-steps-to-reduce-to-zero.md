# Number of Steps to Reduce a Number to Zero

## Problem Description

**Real-World Scenario:**
A countdown timer logic where even numbers can be divided by 2 (fast skip) but odd numbers must be decremented (slow step).

**Example Setup:** 
Calculating the cost to reduce a resource to zero with specific operations.

**What is Number of Steps...?**
Given an integer `num`, return the number of steps to reduce it to zero.
In one step, if the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.

**Why is it important?**
- Bit Manipulation
- Simulation
- Simple Logic

**Your Task:** 
Return number of steps.

---

## Examples

### Example 1:
**Input:** `num = 14`
**Output:** `6`
**Explanation:** 
14 is even -> 7
7 is odd -> 6
6 is even -> 3
3 is odd -> 2
2 is even -> 1
1 is odd -> 0

### Example 2:
**Input:** `num = 8`
**Output:** `4`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Value | 0 ≤ num ≤ 10^6 |
| Time Complexity | O(log N) |
| Space Complexity | O(1) |
| Output Format | Integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Apple |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Cisco |
| 🔵 Facebook | 🟡 Apple | 🟢 IBM |

---

## Follow-up Questions

1. Relationship to binary representation? (Steps = number of bits + number of set bits - 1).
2. Why? (Divide by 2 is right shift. Subtract 1 is clearing LSB).
3. Can you solve it with bit count?
