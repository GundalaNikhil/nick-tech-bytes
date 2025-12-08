# Super Ugly Number

## Problem Description

**Real-World Scenario:**
A signal generator produces frequencies that are harmonics of a specific set of prime base frequencies.

**Example Setup:** 
A number theory tool generates integers with prime factors restricted to a given set.

**What is Super Ugly Number?**
A super ugly number is a positive integer whose prime factors are in the array `primes`. Given an integer `n` and an array of integers `primes`, return the `nth` super ugly number.

**Why is it important?**
- Min-Heap (Priority Queue)
- DP with multiple pointers
- Number Theory
- Optimization

**Your Task:** 
Return the nth super ugly number.

**Difficulty:** Medium
**Tags:** Heaps, Applications, Min-Heap, Dp With Multiple Pointers, Number Theory, Optimization, O(n log k), Interview

---

## Examples

### Example 1:
**Input:** `n = 12, primes = [2,7,13,19]`
**Output:** `32`
**Explanation:** [1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32].

### Example 2:
**Input:** `n = 1, primes = [2,3,5]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 1 ≤ n ≤ 10⁵ |
| Primes | 1 ≤ primes.length ≤ 100 |
| Prime Value | 2 ≤ primes[i] ≤ 1000 |
| Data Type | Integer array |
| Time Complexity | O(n log k) |
| Space Complexity | O(n + k) |
| Output Format | Integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Wolfram |
| 🔵 Amazon | 🟡 Microsoft | 🟢 MathWorks |
| 🔵 Facebook | 🟡 Apple | 🟢 Khan Academy |

---

## Follow-up Questions

1. How is this different from Ugly Number II (fixed primes 2,3,5)?
2. Why use a Min-Heap of `(value, prime_index, pointer)`?
3. How to handle duplicates (e.g., 2*7 vs 7*2)?
4. Can you optimize to O(n * k) with DP?
