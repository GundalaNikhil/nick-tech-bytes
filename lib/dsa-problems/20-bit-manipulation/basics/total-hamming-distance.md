# Total Hamming Distance

## Problem Description

**Real-World Scenario:**
A geneticist calculates the total genetic difference (mutations) between all pairs of DNA sequences in a population.

**Example Setup:** 
Measuring the total "distance" between all nodes in a hypercube network.

**What is Total Hamming Distance?**
The Hamming distance between two integers is the number of positions at which the corresponding bits are different.
Given an integer array `nums`, return the sum of Hamming distances between all the pairs of the integers in `nums`.

**Why is it important?**
- Bit Manipulation
- Counting (Bit by Bit)
- Optimization (O(N) vs O(N^2))

**Your Task:** 
Return total distance.

---

## Examples

### Example 1:
**Input:** `nums = [4,14,2]`
**Output:** `6`
**Explanation:** 
4:  0100
14: 1110
2:  0010
Hamming(4,14) = 2
Hamming(4,2) = 2
Hamming(14,2) = 2
Total = 6.

### Example 2:
**Input:** `nums = [4,14,4]`
**Output:** `4`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10^4 |
| Values | 0 ≤ nums[i] ≤ 10^9 |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Facebook |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Apple |
| 🔵 Facebook | 🟡 Apple | 🟢 Netflix |

---

## Follow-up Questions

1. Why not compute pairwise? (O(N^2) is too slow).
2. How to compute bit by bit? (For each bit position `i`, count numbers with bit set `k`. Contribution is `k * (n-k)`).
3. Why `k * (n-k)`? (Each set bit forms a pair with each unset bit).
