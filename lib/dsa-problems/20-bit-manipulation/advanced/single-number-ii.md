# Single Number II

## Problem Description

**Real-World Scenario:**
A sensor network receives data packets in triplets for redundancy. If one sensor malfunctions and sends only one packet (or a different value), you need to identify the anomaly.

**Example Setup:** 
Finding the unique card in a deck where every other card appears exactly three times.

**What is Single Number II?**
Given an integer array `nums` where every element appears **three times** except for one, which appears exactly once. Find the single element and return it.
You must implement a solution with a linear runtime complexity and use only constant extra space.

**Why is it important?**
- Bit Manipulation (State Machine)
- Karnaugh Maps
- Generalization of XOR trick

**Your Task:** 
Return the single number.

**Difficulty:** Hard
**Tags:** Bit Manipulation, Advanced, Karnaugh Maps, Generalization Of Xor Trick, O(N), Interview

---

## Examples

### Example 1:
**Input:** `nums = [2,2,3,2]`
**Output:** `3`

### Example 2:
**Input:** `nums = [0,1,0,1,0,1,99]`
**Output:** `99`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 3 * 10^4 |
| Values | Integer range |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Palantir |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Databricks |
| 🔵 Facebook | 🟡 Apple | 🟢 Snowflake |

---

## Follow-up Questions

1. Why standard XOR doesn't work? (XOR cancels out pairs, not triplets).
2. How to track bits modulo 3? (Count set bits at each position, result bit is count % 3).
3. Circuit design approach? (`ones` and `twos` variables).
