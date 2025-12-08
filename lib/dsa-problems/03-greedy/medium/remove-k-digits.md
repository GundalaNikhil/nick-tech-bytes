# Remove K Digits

## Problem Description

**Real-World Scenario:**
A data compressor wants to remove `k` digits from a number to make it as small as possible (e.g., minimizing a timestamp or ID).

**Example Setup:** 
Simplifying a version number by removing less significant parts.

**What is Remove K Digits?**
Given string `num` representing a non-negative integer `num`, and an integer `k`, return the smallest possible integer after removing `k` digits from `num`.

**Why is it important?**
- Monotonic Stack
- Greedy
- String Manipulation

**Your Task:** 
Return smallest string.

---

## Examples

### Example 1:
**Input:** `num = "1432219", k = 3`
**Output:** `"1219"`
**Explanation:** Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

### Example 2:
**Input:** `num = "10200", k = 1`
**Output:** `"200"`
**Explanation:** Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

### Example 3:
**Input:** `num = "10", k = 2`
**Output:** `"0"`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ len ≤ 10^5 |
| k | 0 ≤ k ≤ len |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Snapchat |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Lyft |

---

## Follow-up Questions

1. Why Monotonic Increasing Stack? (We want smaller digits at the front (higher significance)).
2. When to pop? (If current digit < stack top).
3. Handling leading zeros? (Remove them from result).
4. What if k > 0 after loop? (Remove from end).
