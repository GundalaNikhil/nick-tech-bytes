# Integer Break

## Problem Description

**Real-World Scenario:**
A product designer splits a resource budget into parts to maximize total productivity (product of parts).

**Example Setup:** 
A manufacturing optimizer breaks a length of material into segments to maximize area when segments form a rectangle.

**What is Integer Break?**
Given a positive integer n, break it into sum of at least two positive integers and maximize the product of those integers.

**Why is it important?**
- DP optimization
- Greedy insight (use 3s)
- Math analysis
- Product maximization

**Your Task:** 
Return the maximum product obtainable.

---

## Examples

### Example 1:
**Input:** `n = 2`
**Output:** `1`
**Explanation:** 2 = 1 + 1, product = 1×1 = 1.

### Example 2:
**Input:** `n = 10`
**Output:** `36`
**Explanation:** 10 = 3 + 3 + 4, product = 3×3×4 = 36.

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 2 ≤ n ≤ 58 |
| Data Type | Integer |
| Special Conditions | At least 2 parts |
| Time Complexity | O(n) DP or O(1) greedy |
| Space Complexity | O(n) or O(1) |
| Output Format | Maximum product |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 ABB |
| 🔵 Google | 🟡 Apple | 🟢 Siemens |
| 🔵 Microsoft | 🟡 Adobe | 🟢 GE |

---

## Follow-up Questions

1. Why prefer 3s over other numbers?
2. What's the greedy pattern (max 3s, at most two 2s)?
3. Why not use 1s or numbers > 4?
4. What's the math proof?
