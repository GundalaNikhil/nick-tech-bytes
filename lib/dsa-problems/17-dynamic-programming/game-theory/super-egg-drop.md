# Super Egg Drop

## Problem Description

**Real-World Scenario:**
A product safety tester determines the highest floor from which a phone can be dropped without breaking, using a limited number of test phones.

**Example Setup:** 
A material scientist finds the critical stress point of a new alloy using limited samples.

**What is Super Egg Drop?**
You are given k eggs and an n-floor building. Determine the minimum number of moves needed to find the critical floor f (0 <= f <= n) with certainty. If egg drops from floor > f, it breaks. If <= f, it doesn't.

**Why is it important?**
- DP with Binary Search
- Minimax optimization
- Mathematical insight
- Hard interview problem

**Your Task:** 
Return minimum moves.

---

## Examples

### Example 1:
**Input:** `k = 1, n = 2`
**Output:** `2`
**Explanation:** Drop from floor 1. If breaks, f=0. If not, drop from floor 2.

### Example 2:
**Input:** `k = 2, n = 6`
**Output:** `3`

### Example 3:
**Input:** `k = 3, n = 14`
**Output:** `4`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Eggs | 1 ≤ k ≤ 100 |
| Floors | 1 ≤ n ≤ 10⁴ |
| Data Type | Integers |
| Special Conditions | Certainty required |
| Time Complexity | O(k log n) or O(k * moves) |
| Space Complexity | O(nk) or O(k) |
| Output Format | Integer moves |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Goldman Sachs |
| 🔵 Amazon | 🟡 Apple | 🟢 Citadel |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Two Sigma |

---

## Follow-up Questions

1. Why is this different from binary search (limited eggs)?
2. What does `dp[moves][k]` represent (max floors checkable)?
3. Why is the recurrence `dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1`?
4. How to optimize to O(k log n)?
