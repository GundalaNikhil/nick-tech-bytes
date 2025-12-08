# Modular Exponentiation

## Problem Description

**Real-World Scenario:**
RSA encryption computes large powers modulo a prime: a^b mod m where a, b, m can be billions. Naive exponentiation overflows; modular fast exponentiation is essential.

**Example Setup:** 
Blockchain hashing often requires computing (base^power) % mod for cryptographic verification. With power = 10^18, you need fast exponentiation.

**What is Modular Exponentiation?**
Compute (base^exp) % mod efficiently without overflow using the property: (a*b) % m = ((a%m) * (b%m)) % m.

**Why is it important?**
- Cryptography (RSA, Diffie-Hellman)
- Competitive programming
- Large number computation
- Fermat's little theorem

**Your Task:** 
Compute (base^exp) % mod efficiently.

**Difficulty:** Medium
**Tags:** Math, Modular Arithmetic, Cryptography, Competitive Programming, Large Number Computation, Fermat'S Little Theorem, O(log exp), Interview

---

## Examples

### Example 1:
**Input:** `base = 2, exp = 10, mod = 1000`
**Output:** `24`
**Explanation:** 2^10 = 1024, 1024 % 1000 = 24.

### Example 2:
**Input:** `base = 2, exp = 100, mod = 1000000007`
**Output:** `976371285`
**Explanation:** 2^100 is huge, but result fits.

### Example 3:
**Input:** `base = 3, exp = 0, mod = 5`
**Output:** `1`
**Explanation:** Any number to power 0 is 1.

### Example 4:
**Input:** `base = 7, exp = 7, mod = 10`
**Output:** `3`
**Explanation:** 7^7 = 823543, 823543 % 10 = 3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Base | 1 ≤ base ≤ 10⁹ |
| Exponent | 0 ≤ exp ≤ 10¹⁸ |
| Modulo | 1 ≤ mod ≤ 10⁹ |
| Data Type | Long integers |
| Special Conditions | Avoid overflow |
| Time Complexity | O(log exp) |
| Space Complexity | O(1) iterative |
| Output Format | Integer result |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Citadel |
| 🔵 Amazon | 🟡 Morgan Stanley | 🟢 Two Sigma |
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Jane Street |

---

## Follow-up Questions

1. Why is this called "binary exponentiation"?
2. How does a^b = a^(b/2) * a^(b/2) help?
3. What's Fermat's little theorem for modular inverse?
4. How do you compute modular inverse using this?
