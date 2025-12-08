# Champagne Tower

## Problem Description

**Real-World Scenario:**
A fluid dynamics simulation calculates liquid distribution in a stacked pyramid of containers where overflow cascades down.

**Example Setup:** 
A champagne tower at a party: glasses are stacked in a pyramid. When a glass is full, excess champagne flows equally to the two glasses below.

**What is Champagne Tower?**
We stack glasses in a pyramid, where the first row has 1 glass, the second row has 2 glasses, and so on until the 100th row. Each glass holds one cup of champagne. We pour some amount of champagne into the first glass at the top. When the topmost glass is full, any excess liquid pours equally to the glass immediately to the left and right of it. Return how full the `jth` glass in the `ith` row is (0 <= j <= i).

**Why is it important?**
- Simulation with DP
- Flow distribution
- Pascal's Triangle variant
- State tracking

**Your Task:** 
Return the amount of champagne in the target glass (0 to 1).

---

## Examples

### Example 1:
**Input:** `poured = 1, query_row = 1, query_glass = 1`
**Output:** `0.0`
**Explanation:** Top glass takes 1 cup. No overflow.

### Example 2:
**Input:** `poured = 2, query_row = 1, query_glass = 1`
**Output:** `0.5`
**Explanation:** Top glass takes 1. Excess 1 splits to 0.5 and 0.5.

### Example 3:
**Input:** `poured = 100000009, query_row = 33, query_glass = 17`
**Output:** `1.0`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Poured | 0 ≤ poured ≤ 10⁹ |
| Query Row | 0 ≤ query_row ≤ 99 |
| Query Glass | 0 ≤ query_glass ≤ query_row |
| Data Type | Double |
| Time Complexity | O(R²) where R is rows |
| Space Complexity | O(R²) or O(R) |
| Output Format | Double (0.0 to 1.0) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Moet |
| 🔵 Amazon | 🟡 Apple | 🟢 Veuve |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Dom Perignon |

---

## Follow-up Questions

1. Why simulate row by row?
2. How is overflow calculated `(q - 1) / 2.0`?
3. Why cap the value at 1.0 for the result?
4. Can you optimize space to O(R)?
