# Hamming Distance

## Problem Description

**Real-World Scenario:**
Error detection in data transmission uses Hamming distance to measure how many bits differ between sent and received data.

**Example Setup:** 
A DNA sequencing tool compares two gene codes and counts the number of different positions - this is the Hamming distance.

**What is Hamming Distance?**
The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

**Why is it important?**
- Error detection/correction
- DNA comparison
- Bit manipulation basics
- XOR application

**Your Task:** 
Return the Hamming distance between two integers.

**Difficulty:** Easy
**Tags:** Bit Manipulation, Basics, Error Detection/Correction, Dna Comparison, Bit Manipulation Basics, Xor Application, O(1), Interview

---

## Examples

### Example 1:
**Input:** `x = 1, y = 4`
**Output:** `2`
**Explanation:** 
- 1 = 0001
- 4 = 0100
- Two bits differ.

### Example 2:
**Input:** `x = 3, y = 1`
**Output:** `1`
**Explanation:** 
- 3 = 11
- 1 = 01
- One bit differs.

### Example 3:
**Input:** `x = 0, y = 0`
**Output:** `0`
**Explanation:** Same number, no difference.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 0 ≤ x, y ≤ 2³¹-1 |
| Data Type | Integer |
| Special Conditions | Count differing bits |
| Time Complexity | O(1) - 32 bits max |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Qualcomm |
| 🔵 Amazon | 🟡 Adobe | 🟢 Intel |
| 🔵 Apple | 🟡 Microsoft | 🟢 ARM |

---

## Follow-up Questions

1. How does XOR help find different bits?
2. How do you count set bits (popcount)?
3. What's Brian Kernighan's bit counting method?
4. What's total Hamming distance for an array?
