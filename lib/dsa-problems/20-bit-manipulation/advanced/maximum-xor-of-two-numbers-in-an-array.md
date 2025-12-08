# Maximum XOR of Two Numbers in an Array

## Problem Description

**Real-World Scenario:**
A cryptography system wants to select two keys from a pool such that their combined XOR value is maximized (to maximize entropy/difference).

**Example Setup:** 
Finding the pair of numbers with the most differing bits.

**What is Maximum XOR of Two Numbers in an Array?**
Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`.

**Why is it important?**
- Bit Manipulation
- Trie (Bitwise Trie)
- Greedy Strategy (Bit by Bit)

**Your Task:** 
Return max XOR value.

**Difficulty:** Hard
**Tags:** Bit Manipulation, Advanced, Trie, Greedy Strategy, O(N), Interview

---

## Examples

### Example 1:
**Input:** `nums = [3,10,5,25,2,8]`
**Output:** `28`
**Explanation:** The maximum result is 5 XOR 25 = 28.
5:  00101
25: 11001
XOR:11100 (28)

### Example 2:
**Input:** `nums = [14,70,53,83,49,91,36,80,92,51,66,70]`
**Output:** `127`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 2 * 10^5 |
| Values | 0 ≤ nums[i] ≤ 2^31 - 1 |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 ByteDance |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Alibaba |
| 🔵 Facebook | 🟡 Apple | 🟢 Tencent |

---

## Follow-up Questions

1. Why Trie? (Store binary representation of numbers).
2. How to query max XOR for a number `x`? (Traverse Trie, try to go opposite bit direction to maximize 1s).
3. Time complexity? (O(N * 32) = O(N)).
