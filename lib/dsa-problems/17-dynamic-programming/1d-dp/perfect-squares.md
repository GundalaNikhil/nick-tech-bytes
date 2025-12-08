# Perfect Squares

## Problem Description

**Real-World Scenario:**
A cash register dispenses the fewest coins for change using only square-valued denominations (1, 4, 9, 16...). Find the minimum count.

**Example Setup:** 
A puzzle game challenges players to express a number using the minimum count of perfect square numbers.

**What is Perfect Squares?**
Given integer n, return the minimum number of perfect square numbers that sum to n. For example, 12 = 4 + 4 + 4 (three squares).

**Why is it important?**
- DP on numbers
- Coin change variant
- Mathematical optimization
- Lagrange's four-square theorem

**Your Task:** 
Return the minimum number of perfect squares.

---

## Examples

### Example 1:
**Input:** `n = 12`
**Output:** `3`
**Explanation:** 12 = 4 + 4 + 4.

### Example 2:
**Input:** `n = 13`
**Output:** `2`
**Explanation:** 13 = 4 + 9.

### Example 3:
**Input:** `n = 1`
**Output:** `1`
**Explanation:** 1 = 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 1 ≤ n ≤ 10⁴ |
| Data Type | Integer |
| Special Conditions | Every number can be expressed (1² exists) |
| Time Complexity | O(n × √n) |
| Space Complexity | O(n) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Mathworks |
| 🔵 Amazon | 🟡 Uber | 🟢 Wolfram |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Brilliant |

---

## Follow-up Questions

1. How is this similar to coin change?
2. What squares can a number be decomposed into?
3. What does Lagrange's theorem say (max 4)?
4. Can you use BFS instead of DP?
