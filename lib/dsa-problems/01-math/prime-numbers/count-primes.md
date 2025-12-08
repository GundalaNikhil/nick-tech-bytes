# Count Primes

## Problem Description

**Real-World Scenario:**
A cryptography library needs to know how many primes exist below n for key generation algorithms.

**Example Setup:** 
A math education app shows students prime distribution patterns - how many primes less than 100, 1000, etc.

**What is Count Primes?**
Count the number of prime numbers less than a non-negative number n. Use the Sieve of Eratosthenes for O(n log log n) efficiency.

**Why is it important?**
- Sieve of Eratosthenes
- Prime counting function
- Cryptography applications
- Number theory

**Your Task:** 
Return the count of primes less than n.

**Difficulty:** Medium
**Tags:** Math, Prime Numbers, Sieve Of Eratosthenes, Prime Counting Function, Cryptography Applications, Number Theory, O(n log log n), Interview

---

## Examples

### Example 1:
**Input:** `n = 10`
**Output:** `4`
**Explanation:** Primes < 10: 2, 3, 5, 7.

### Example 2:
**Input:** `n = 0`
**Output:** `0`
**Explanation:** No primes less than 0.

### Example 3:
**Input:** `n = 1`
**Output:** `0`
**Explanation:** No primes less than 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 0 ≤ n ≤ 5 × 10⁶ |
| Data Type | Integer |
| Special Conditions | Strict less than (not ≤) |
| Time Complexity | O(n log log n) |
| Space Complexity | O(n) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Wolfram |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Mathworks |
| 🔵 Apple | 🟡 Oracle | 🟢 Cryptomathic |

---

## Follow-up Questions

1. How does Sieve of Eratosthenes work?
2. Why start crossing from i² not 2i?
3. Can you optimize space with bitset?
4. What about segmented sieve for large n?
