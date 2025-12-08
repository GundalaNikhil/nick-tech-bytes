# Check If Prime

## Problem Description

**Real-World Scenario:**
Cryptographic systems like RSA rely heavily on large prime numbers. Before using a number for encryption, you must verify it's prime. This is fundamental to secure communication!

**Example Setup:** 
A math tutoring app teaches kids about primes. Given any number, quickly determine if it's prime to give instant feedback and explanations.

**What is Prime Check?**
A prime number is greater than 1 and has no positive divisors other than 1 and itself. Efficiently determine if a number is prime.

**Why is it important?**
- Cryptography (RSA, key generation)
- Number theory problems
- Foundation for sieve algorithm
- Competitive programming

**Your Task:** 
Return true if the given number is prime, false otherwise.

**Difficulty:** Medium
**Tags:** Math, Primes Sieve, Cryptography, Number Theory Problems, Foundation For Sieve, Competitive Programming, O(√n), Interview

---

## Examples

### Example 1:
**Input:** `n = 7`
**Output:** `true`
**Explanation:** 7 has no divisors other than 1 and 7.

### Example 2:
**Input:** `n = 4`
**Output:** `false`
**Explanation:** 4 = 2 × 2, so not prime.

### Example 3:
**Input:** `n = 1`
**Output:** `false`
**Explanation:** 1 is not prime by definition.

### Example 4:
**Input:** `n = 2`
**Output:** `true`
**Explanation:** 2 is the smallest and only even prime.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 1 ≤ n ≤ 10⁹ |
| Data Type | Integer |
| Special Conditions | 1 is not prime |
| Time Complexity | O(√n) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Citadel |
| 🔵 Google | 🟡 Morgan Stanley | 🟢 Tower Research |
| 🔵 Microsoft | 🟡 JPMorgan | 🟢 Jane Street |

---

## Follow-up Questions

1. Why do we only check up to √n?
2. How can you optimize by checking only 6k±1 divisors?
3. What's the difference between primality test and factorization?
4. What is Miller-Rabin probabilistic primality test?
