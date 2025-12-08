# Broken Calculator

## Problem Description

**Real-World Scenario:**
A reverse engineering tool finds the minimum steps to transform a target system state back to an initial state using only inverse operations (divide by 2, add 1).

**Example Setup:** 
A chemical synthesis planner finds the shortest reaction path to synthesize a complex molecule from a simpler one using specific operations.

**What is Broken Calculator?**
There is a broken calculator that has the integer `startValue` on its display initially. In one operation, you can:
- multiply the number on display by 2, or
- subtract 1 from the number on display.
Given two integers `startValue` and `target`, return the minimum number of operations needed to display `target` on the calculator.

**Why is it important?**
- Greedy Strategy (Work Backwards)
- Math logic
- Tree Search pruning
- Optimization

**Your Task:** 
Return minimum operations.

---

## Examples

### Example 1:
**Input:** `startValue = 2, target = 3`
**Output:** `2`
**Explanation:** 2 -> 4 -> 3.

### Example 2:
**Input:** `startValue = 5, target = 8`
**Output:** `2`
**Explanation:** 5 -> 4 -> 8.

### Example 3:
**Input:** `startValue = 3, target = 10`
**Output:** `3`
**Explanation:** 3 -> 6 -> 5 -> 10.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Values | 1 ≤ x, y ≤ 10⁹ |
| Data Type | Integer |
| Time Complexity | O(log Target) |
| Space Complexity | O(1) |
| Output Format | Integer operations |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 MathWorks |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Wolfram |
| 🔵 Facebook | 🟡 Apple | 🟢 Desmos |

---

## Follow-up Questions

1. Why work backwards from target to startValue?
2. Inverse ops: Divide by 2 (if even), Add 1 (if odd).
3. Why is greedy (divide if even) always optimal?
4. What if `target < startValue`?
