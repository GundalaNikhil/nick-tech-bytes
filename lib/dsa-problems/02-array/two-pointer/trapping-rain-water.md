# Trapping Rain Water

## Problem Description

**Real-World Scenario:**
After heavy rain, water accumulates in the gaps between buildings of different heights. Given the heights of buildings in a row, calculate how much rainwater would be trapped between them.

**Example Setup:** 
Mumbai's Marine Drive has buildings of varying heights. After monsoon rain, water collects in the gaps between buildings. The municipal corporation wants to calculate the total water collected to plan drainage. Buildings are 3m, 0m, 0m, 2m, 0m, 4m high. How much water is trapped?

**What is Trapping Rain Water?**
Given an elevation map where each bar has width 1, compute how much water can be trapped after rain. Water at each position = min(maxLeft, maxRight) - height[i].

**Why is it important?**
- Combines prefix/suffix max concepts
- Multiple solution approaches (DP, two-pointer, stack)
- Tests visualization and problem decomposition
- Real-world drainage/flooding analysis

**Your Task:** 
Calculate the total units of water trapped.

---

## Examples

### Example 1:
**Input:** `height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`
**Output:** `6`
**Explanation:** Water fills the gaps: 1 + 1 + 2 + 1 + 1 = 6 units.

### Example 2:
**Input:** `height = [4, 2, 0, 3, 2, 5]`
**Output:** `9`
**Explanation:** Water trapped at indices 1,2,3,4 based on surrounding maxes.

### Example 3:
**Input:** `height = [1, 2, 3, 4, 5]`
**Output:** `0`
**Explanation:** Strictly increasing - no water trapped.

### Example 4:
**Input:** `height = [5, 4, 3, 2, 1]`
**Output:** `0`
**Explanation:** Strictly decreasing - no water trapped.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 2 × 10⁴ |
| Height Range | 0 ≤ height[i] ≤ 10⁵ |
| Data Type | Non-negative integers |
| Special Conditions | Width of each bar is 1 |
| Time Complexity | O(n) |
| Space Complexity | O(1) with two-pointer, O(n) with DP |
| Output Format | Total water units |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Lyft |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Rubrik |
| 🔵 Facebook | 🟡 Uber | 🟢 Databricks |
| 🔵 Microsoft | 🟡 Twitter | 🟢 Twilio |

---

## Follow-up Questions

1. Can you solve with O(1) space using two pointers?
2. How would you solve using a monotonic stack?
3. What if this was a 2D grid (Trapping Rain Water II)?
4. Explain the DP approach with prefix max arrays.
