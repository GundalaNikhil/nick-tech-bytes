# Counting Bits

## Problem Description

**Real-World Scenario:**
Network protocols count "1" bits in IP addresses for subnet calculations. Given a range of numbers, efficiently count bits in each without recalculating from scratch.

**Example Setup:** 
A data compression algorithm needs the "bit density" (number of 1s) for each number from 0 to N. Computing this efficiently enables faster compression.

**What is Counting Bits?**
For each number from 0 to n, count the number of 1s in its binary representation. Use DP to build on previous results.

**Why is it important?**
- Bit manipulation
- Dynamic programming on bits
- Population count (popcount)
- Hardware-level operations

**Your Task:** 
Return an array where ans[i] is the number of 1s in binary representation of i.

**Difficulty:** Easy
**Tags:** Bit Manipulation, Basics, Dynamic Programming On Bits, Population Count, Hardware-Level Operations, O(n), Interview

---

## Examples

### Example 1:
**Input:** `n = 2`
**Output:** `[0, 1, 1]`
**Explanation:** 
- 0 → 0b0 → 0 ones
- 1 → 0b1 → 1 one
- 2 → 0b10 → 1 one

### Example 2:
**Input:** `n = 5`
**Output:** `[0, 1, 1, 2, 1, 2]`
**Explanation:** 
- 0→0, 1→1, 2→1, 3→2, 4→1, 5→2

### Example 3:
**Input:** `n = 0`
**Output:** `[0]`
**Explanation:** Just 0.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 0 ≤ n ≤ 10⁵ |
| Data Type | Integer |
| Special Conditions | Build on previous results |
| Time Complexity | O(n) |
| Space Complexity | O(n) for output |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Qualcomm |
| 🔵 Amazon | 🟡 Adobe | 🟢 Intel |
| 🔵 Apple | 🟡 Nvidia | 🟢 ARM |

---

## Follow-up Questions

1. What's the DP recurrence? (ans[i] = ans[i>>1] + (i&1))
2. Can you use i&(i-1) to count bits?
3. What's Brian Kernighan's algorithm?
4. Why is this O(n) instead of O(n log n)?
