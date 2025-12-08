# Permutation Sequence

## Problem Description

**Real-World Scenario:**
Finding the N-th lexicographical arrangement of a set of items without generating all previous arrangements (e.g., N-th possible schedule).

**Example Setup:** 
Directly computing the N-th password in a brute-force sequence.

**What is Permutation Sequence?**
The set `[1, 2, 3, ..., n]` contains a total of `n!` unique permutations.
By listing and labeling all of the permutations in order, we get the following sequence for `n = 3`:
1. "123"
2. "132"
3. "213"
4. "231"
5. "312"
6. "321"
Given `n` and `k`, return the `k-th` permutation sequence.

**Why is it important?**
- Math (Factorial Number System)
- Combinatorics
- Constructive Algorithm

**Your Task:** 
Return string permutation.

---

## Examples

### Example 1:
**Input:** `n = 3, k = 3`
**Output:** `"213"`

### Example 2:
**Input:** `n = 4, k = 9`
**Output:** `"2314"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| n | 1 ≤ n ≤ 9 |
| k | 1 ≤ k ≤ n! |
| Time Complexity | O(N^2) (due to list removal) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Twitter |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Snap |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Why not generate all permutations? (Too slow, O(N!)).
2. How to determine the first digit? `index = k / (n-1)!`.
3. Why update k? `k = k % (n-1)!`.
4. Why remove used digit? (To maintain relative order of remaining digits).
