# Russian Doll Envelopes

## Problem Description

**Real-World Scenario:**
A shipping company nests boxes inside each other to minimize volume. A box can only fit inside another if both dimensions are strictly larger.

**Example Setup:** 
A Matryoshka doll manufacturer designs a set of nesting dolls. Find the maximum number of dolls that can be nested.

**What is Russian Doll Envelopes?**
Given pairs of integers (width, height), find the maximum number of envelopes you can Russian doll (put one inside another).

**Why is it important?**
- Sorting + LIS (Longest Increasing Subsequence)
- 2D sorting trick
- Binary search optimization
- Hard DP problem

**Your Task:** 
Return the maximum number of envelopes.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Lis, Sorting + Lis, 2D Sorting Trick, Binary Search Optimization, Hard Dp, O(n log n), Interview

---

## Examples

### Example 1:
**Input:** `envelopes = [[5,4],[6,4],[6,7],[2,3]]`
**Output:** `3`
**Explanation:** [2,3] => [5,4] => [6,7].

### Example 2:
**Input:** `envelopes = [[1,1],[1,1],[1,1]]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Envelopes | 1 ≤ n ≤ 10⁵ |
| Dimensions | 1 ≤ w, h ≤ 10⁵ |
| Data Type | Integer pairs |
| Special Conditions | Strict inequality required |
| Time Complexity | O(n log n) |
| Space Complexity | O(n) |
| Output Format | Maximum count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 FedEx |
| 🔵 Amazon | 🟡 Apple | 🟢 UPS |
| 🔵 Facebook | 🟡 Microsoft | 🟢 DHL |

---

## Follow-up Questions

1. Why sort width ascending and height descending?
2. How does this reduce to LIS?
3. What is the O(n log n) LIS algorithm?
4. Why does sorting height descending handle equal widths correctly?
