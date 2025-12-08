# Power of Two

## Problem Description

**Real-World Scenario:**
Memory allocators check if requested size is a power of 2 for efficient alignment. Fast bit-check determines this.

**Example Setup:** 
A game engine validates texture dimensions - only power-of-2 textures are supported for efficient GPU processing.

**What is Power of Two?**
Check if a given integer is a power of 2. Use bit manipulation: a power of 2 has exactly one bit set.

**Why is it important?**
- Memory alignment
- GPU texture sizes
- Bit manipulation trick
- Computer architecture

**Your Task:** 
Return true if n is a power of 2.

---

## Examples

### Example 1:
**Input:** `n = 1`
**Output:** `true`
**Explanation:** 2⁰ = 1.

### Example 2:
**Input:** `n = 16`
**Output:** `true`
**Explanation:** 2⁴ = 16.

### Example 3:
**Input:** `n = 3`
**Output:** `false`
**Explanation:** 3 = 11 in binary, two bits set.

### Example 4:
**Input:** `n = 0`
**Output:** `false`
**Explanation:** 0 is not a power of 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | -2³¹ ≤ n ≤ 2³¹-1 |
| Data Type | Integer |
| Special Conditions | Negative numbers are not powers of 2 |
| Time Complexity | O(1) |
| Space Complexity | O(1) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Apple | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Google | 🟡 Adobe | 🟢 AMD |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Intel |

---

## Follow-up Questions

1. How does n & (n-1) == 0 work for powers of 2?
2. What about power of 3? Power of 4?
3. Can you use bit counting?
4. What's the fastest method?
