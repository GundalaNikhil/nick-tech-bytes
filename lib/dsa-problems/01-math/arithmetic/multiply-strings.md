# Multiply Strings

## Problem Description

**Real-World Scenario:**
A cryptocurrency calculator handles numbers too large for standard integers. Multiply them as strings.

**Example Setup:** 
A scientific calculator for arbitrary-precision arithmetic - multiply numbers with hundreds of digits.

**What is Multiply Strings?**
Given two numbers as strings, multiply them without using BigInteger/BigDecimal and without converting to integers directly.

**Why is it important?**
- Arbitrary precision
- Digit-by-digit multiplication
- Financial systems
- Scientific computing

**Your Task:** 
Return the product as a string.

---

## Examples

### Example 1:
**Input:** `num1 = "2", num2 = "3"`
**Output:** `"6"`

### Example 2:
**Input:** `num1 = "123", num2 = "456"`
**Output:** `"56088"`

### Example 3:
**Input:** `num1 = "0", num2 = "12345"`
**Output:** `"0"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Num1 Length | 1 ≤ m ≤ 200 |
| Num2 Length | 1 ≤ n ≤ 200 |
| Data Type | Digit strings, no leading zeros |
| Special Conditions | No BigInteger/BigDecimal |
| Time Complexity | O(m × n) |
| Space Complexity | O(m + n) |
| Output Format | Product string |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Coinbase |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Kraken |
| 🔵 Google | 🟡 Apple | 🟢 Binance |

---

## Follow-up Questions

1. How do positions in result array map to digit positions?
2. How do you handle carry?
3. Why is result length at most m+n?
4. What about Karatsuba multiplication (O(n^1.58))?
