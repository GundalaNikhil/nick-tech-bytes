# Restore The Array

## Problem Description

**Real-World Scenario:**
A data recovery tool parses a corrupted stream of digits into a sequence of valid integers (each within a specific range [1, k]) to reconstruct the original data.

**Example Setup:** 
A message decoder splits a numeric string into codes where each code must be between 1 and K.

**What is Restore The Array?**
A program was supposed to print an array of integers. The program forgot to print whitespaces and the array is printed as a string of digits `s` and all we know is that all integers in the array were in the range `[1, k]` and there are no leading zeros in the array. Given the string `s` and the integer `k`, return the number of the possible arrays that can be printed as `s` using the mentioned rules. Return the answer modulo 10^9 + 7.

**Why is it important?**
- DP on Strings
- Partitioning
- Modulo Arithmetic
- Optimization

**Your Task:** 
Return count of arrays.

---

## Examples

### Example 1:
**Input:** `s = "1000", k = 10000`
**Output:** `1`
**Explanation:** Only [1000] is valid. [1,000] invalid (leading zero). [10,00] invalid.

### Example 2:
**Input:** `s = "1000", k = 10`
**Output:** `0`
**Explanation:** Cannot form numbers <= 10. 1 is ok, 0 is invalid (range [1, k]).

### Example 3:
**Input:** `s = "1317", k = 2000`
**Output:** `8`
**Explanation:** [1,3,1,7], [13,1,7], [1,31,7], [1,3,17], [13,17], [131,7], [1,317], [1317].

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| K Value | 1 ≤ k ≤ 10⁹ |
| Data Type | String |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(N * log K) |
| Space Complexity | O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Splunk |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Databricks |
| 🔵 Facebook | 🟡 Apple | 🟢 Snowflake |

---

## Follow-up Questions

1. Why iterate backwards?
2. How to handle leading zeros (`s[i] == '0'`)?
3. Why stop inner loop when number > k?
4. What is the max number of digits to check (approx 10)?
