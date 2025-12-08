# Sum of Subarray Minimums

## Problem Description

**Real-World Scenario:**
A supply chain analyst calculates the "aggregate minimum capacity" of all possible continuous segments of a pipeline to estimate robustness.

**Example Setup:** 
A financial risk model sums the minimum price of a stock over all possible time windows to calculate a specific risk metric.

**What is Sum of Subarray Minimums?**
Given an array of integers `arr`, find the sum of `min(b)`, where `b` ranges over every (contiguous) subarray of `arr`. Since the answer may be large, return the answer modulo 10^9 + 7.

**Why is it important?**
- Monotonic Stack
- Contribution technique
- Previous/Next Less Element
- O(N) solution for O(N^2) problem

**Your Task:** 
Return the sum modulo 10^9 + 7.

**Difficulty:** Medium
**Tags:** Stack, Monotonic, Monotonic Stack, Contribution, Previous/Next Less Element, O(N), Interview

---

## Examples

### Example 1:
**Input:** `arr = [3,1,2,4]`
**Output:** `17`
**Explanation:** 
Subarrays:
[3] min 3
[1] min 1
[2] min 2
[4] min 4
[3,1] min 1
[1,2] min 1
[2,4] min 2
[3,1,2] min 1
[1,2,4] min 1
[3,1,2,4] min 1
Sum: 3+1+2+4+1+1+2+1+1+1 = 17.

### Example 2:
**Input:** `arr = [11,81,94,43,3]`
**Output:** `444`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 3 × 10⁴ |
| Element Value | 1 ≤ arr[i] ≤ 3 × 10⁴ |
| Data Type | Integer array |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Google | 🟡 Microsoft | 🟢 Two Sigma |
| 🔵 Facebook | 🟡 Apple | 🟢 HRT |

---

## Follow-up Questions

1. How many subarrays include `arr[i]` as the minimum?
2. Why find Previous Less Element (PLE) and Next Less Element (NLE)?
3. Why use `(i - PLE) * (NLE - i)` to calculate contribution?
4. How to handle duplicate elements (strict inequality on one side)?
