# Check If Array Pairs Are Divisible by k

## Problem Description

**Real-World Scenario:**
A load balancer pairs requests with complementary resource needs such that their combined load is perfectly divisible by a block size `k`.

**Example Setup:** 
A cryptography tool pairs data blocks so that their sum is congruent to 0 modulo k.

**What is Check If Array Pairs Are Divisible by k?**
Given an array of integers `arr` of even length `n` and an integer `k`. We want to divide the array into exactly `n / 2` pairs such that the sum of each pair is divisible by `k`. Return true If you can find a way to do that or false otherwise.

**Why is it important?**
- Math / Modulo Arithmetic
- Frequency Array / HashMap
- Remainder properties
- Array processing

**Your Task:** 
Return true if possible.

---

## Examples

### Example 1:
**Input:** `arr = [1,2,3,4,5,10,6,7,8,9], k = 5`
**Output:** `true`
**Explanation:** Pairs: (1,9), (2,8), (3,7), (4,6), (5,10). All sums divisible by 5.

### Example 2:
**Input:** `arr = [1,2,3,4,5,6], k = 7`
**Output:** `true`
**Explanation:** (1,6), (2,5), (3,4).

### Example 3:
**Input:** `arr = [1,2,3,4,5,6], k = 10`
**Output:** `false`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| K Value | 1 ≤ k ≤ 10⁵ |
| Element Value | -10⁹ ≤ arr[i] ≤ 10⁹ |
| Data Type | Integer array |
| Time Complexity | O(N) |
| Space Complexity | O(k) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Goldman Sachs |
| 🔵 Google | 🟡 Microsoft | 🟢 Morgan Stanley |
| 🔵 Facebook | 🟡 Apple | 🟢 JP Morgan |

---

## Follow-up Questions

1. Why calculate `rem = ((x % k) + k) % k` (handle negative)?
2. Why must `freq[rem] == freq[k - rem]`?
3. What about `rem == 0` (must be even count)?
4. What about `rem == k/2` (must be even count)?
