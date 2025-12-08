# Construct Target Array With Multiple Sums

## Problem Description

**Real-World Scenario:**
A reverse engineering tool determines if a target system configuration (array of resource allocations) could have been generated from a base state [1, 1, ..., 1] using a specific "sum-replacement" rule.

**Example Setup:** 
A biological growth model checks if a population distribution could have evolved from a single ancestor using a cumulative growth mechanism.

**What is Construct Target Array...?**
You are given an array `target` of n integers. From a starting array `arr` consisting of `n` 1s, you may perform the following procedure:
1. let `x` be the sum of all elements currently in your array.
2. choose index `i`, such that `0 <= i < n` and set the value of `arr[i]` to `x`.
3. You may repeat this procedure as many times as needed.
Return `true` if it is possible to construct the `target` array from `arr`, otherwise, return `false`.

**Why is it important?**
- Max-Heap (Priority Queue)
- Working Backwards
- Modulo Arithmetic
- Math logic

**Your Task:** 
Return true if possible.

---

## Examples

### Example 1:
**Input:** `target = [9,3,5]`
**Output:** `true`
**Explanation:** 
[1,1,1] sum 3. Replace at 1 -> [1,3,1].
[1,3,1] sum 5. Replace at 2 -> [1,3,5].
[1,3,5] sum 9. Replace at 0 -> [9,3,5].

### Example 2:
**Input:** `target = [1,1,1,2]`
**Output:** `false`

### Example 3:
**Input:** `target = [8,5]`
**Output:** `true`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 5 × 10⁴ |
| Element Value | 1 ≤ val ≤ 10⁹ |
| Data Type | Integer array |
| Time Complexity | O(N log N) |
| Space Complexity | O(N) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 MathWorks |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Wolfram |
| 🔵 Facebook | 🟡 Apple | 🟢 Desmos |

---

## Follow-up Questions

1. Why work backwards (subtract sum of others from largest)?
2. Why use a Max-Heap?
3. How to optimize subtraction using modulo (`largest % sum_others`)?
4. What are the edge cases (sum_others == 1, sum_others == 0)?
