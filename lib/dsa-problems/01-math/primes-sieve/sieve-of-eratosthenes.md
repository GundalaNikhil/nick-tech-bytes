# Sieve of Eratosthenes

## Problem Description

**Real-World Scenario:**
A password generator needs to find all prime numbers up to 1 million to create cryptographically secure keys. Checking each number individually is too slow. Sieve of Eratosthenes efficiently finds ALL primes in a range!

**Example Setup:** 
A competitive programming contest asks: "How many primes exist below one million?" With the sieve, you can precompute all primes in O(n log log n) instead of O(n√n).

**What is Sieve of Eratosthenes?**
An ancient algorithm to find all primes up to N by iteratively marking multiples of each prime as composite (not prime).

**Why is it important?**
- Most efficient way to find all primes in range
- Foundation for many number theory problems
- Cryptographic applications
- Segmented sieve for very large ranges

**Your Task:** 
Find all prime numbers less than or equal to N.

**Difficulty:** Medium
**Tags:** Math, Primes Sieve, Most Efficient Way To Find All Primes In Range, Foundation For Many Number Theory Problems, Cryptographic Applications, Segmented Sieve For Very Large Ranges, O(n log log n), Interview

---

## Examples

### Example 1:
**Input:** `n = 10`
**Output:** `[2, 3, 5, 7]`
**Explanation:** Primes ≤ 10.

### Example 2:
**Input:** `n = 30`
**Output:** `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`
**Explanation:** 10 primes ≤ 30.

### Example 3:
**Input:** `n = 1`
**Output:** `[]`
**Explanation:** No primes ≤ 1.

### Example 4:
**Input:** `n = 2`
**Output:** `[2]`
**Explanation:** Only 2 is prime.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 1 ≤ n ≤ 10⁷ |
| Data Type | Integer |
| Special Conditions | Primes ≤ n, not just < n |
| Time Complexity | O(n log log n) |
| Space Complexity | O(n) |
| Output Format | Array/List of primes |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Citadel |
| 🔵 Amazon | 🟡 DE Shaw | 🟢 Two Sigma |
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 HRT |

---

## Follow-up Questions

1. Why do we start marking from p² instead of 2p?
2. What is the Segmented Sieve for very large numbers?
3. How would you count primes in a range [L, R]?
4. What's the space-optimized version using only odd numbers?
