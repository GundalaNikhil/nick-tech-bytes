# Reverse Bits

## Problem Description

**Real-World Scenario:**
Some communication protocols transmit data LSB-first but receivers expect MSB-first. Reversing bits is essential for protocol translation between systems.

**Example Setup:** 
Embedded systems often need to reverse bit order when interfacing between little-endian and big-endian devices.

**What is Reverse Bits?**
Given a 32-bit unsigned integer, reverse all its bits. The bit at position 0 goes to position 31, position 1 goes to position 30, etc.

**Why is it important?**
- Endianness conversion
- Cryptographic operations
- Signal processing
- Hardware interfacing

**Your Task:** 
Reverse the bits of a 32-bit unsigned integer.

---

## Examples

### Example 1:
**Input:** `n = 00000010100101000001111010011100` (43261596)
**Output:** `00111001011110000010100101000000` (964176192)
**Explanation:** Bits reversed.

### Example 2:
**Input:** `n = 11111111111111111111111111111101` (4294967293)
**Output:** `10111111111111111111111111111111` (3221225471)
**Explanation:** Bits reversed.

### Example 3:
**Input:** `n = 1` (0b00...001)
**Output:** `2147483648` (0b10...000)
**Explanation:** Single 1 moves to MSB.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Type | 32-bit unsigned integer |
| Data Type | Binary representation |
| Special Conditions | Consider all 32 bits |
| Time Complexity | O(1) - 32 fixed bits |
| Space Complexity | O(1) |
| Output Format | 32-bit unsigned integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Apple | 🟡 Bloomberg | 🟢 Qualcomm |
| 🔵 Amazon | 🟡 Nvidia | 🟢 Intel |
| 🔵 Microsoft | 🟡 Adobe | 🟢 ARM |

---

## Follow-up Questions

1. How do you extract bit i and set bit (31-i)?
2. Can you use divide-and-conquer to swap halves recursively?
3. What are lookup table optimizations?
4. How would you reverse bits in a byte?
