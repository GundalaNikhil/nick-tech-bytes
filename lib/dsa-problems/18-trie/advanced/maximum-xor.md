# Maximum XOR of Two Numbers in an Array

## Problem Description

**Real-World Scenario:**
A network engineer finds pair of IP addresses with maximum XOR for optimal load balancing distribution.

**Example Setup:** 
A cryptography system evaluates hash collision resistance by finding pairs with maximum XOR difference.

**What is Maximum XOR of Two Numbers?**
Given an array of integers, find the maximum XOR of any two numbers in the array.

**Why is it important?**
- Trie application
- Bit-by-bit optimization
- Network addressing
- Cryptographic analysis

**Your Task:** 
Return the maximum XOR of two numbers.

---

## Examples

### Example 1:
**Input:** `nums = [3, 10, 5, 25, 2, 8]`
**Output:** `28`
**Explanation:** Maximum XOR is 5 XOR 25 = 28.

### Example 2:
**Input:** `nums = [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]`
**Output:** `127`

### Example 3:
**Input:** `nums = [0]`
**Output:** `0`
**Explanation:** Single element XOR with itself.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 2 × 10⁵ |
| Element Value | 0 ≤ nums[i] ≤ 2³¹ - 1 |
| Data Type | Integer array |
| Special Conditions | Bit manipulation |
| Time Complexity | O(n × 32) with Trie |
| Space Complexity | O(n × 32) |
| Output Format | Maximum XOR value |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Cisco |
| 🔵 Amazon | 🟡 Adobe | 🟢 Palo Alto |
| 🔵 Microsoft | 🟡 Apple | 🟢 Juniper |

---

## Follow-up Questions

1. How does the bit Trie work?
2. Why try opposite bit at each level?
3. What's the brute force O(n²) vs Trie O(n)?
4. What about maximum XOR subarray sum?
