# Single Number III

## Problem Description

**Real-World Scenario:**
A communication channel sends messages in pairs. Due to noise, two distinct messages lost their pairs. Identify the two unique messages.

**Example Setup:** 
Finding two missing items in a pair-matched inventory.

**What is Single Number III?**
Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.
You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

**Why is it important?**
- Bit Manipulation (XOR)
- Lowbit / Rightmost Set Bit
- Partitioning

**Your Task:** 
Return array of two numbers.

---

## Examples

### Example 1:
**Input:** `nums = [1,2,1,3,2,5]`
**Output:** `[3,5]`
**Explanation:** 3 and 5 appear once.

### Example 2:
**Input:** `nums = [-1,0]`
**Output:** `[-1,0]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 2 ≤ n ≤ 3 * 10^4 |
| Values | Integer range |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Adobe |
| 🔵 Amazon | 🟡 Microsoft | 🟢 SalesForce |
| 🔵 Facebook | 🟡 Apple | 🟢 Oracle |

---

## Follow-up Questions

1. What is the XOR of all numbers? (Result is `a ^ b`).
2. How to separate `a` and `b`? (Find a bit that differs between them, i.e., any set bit in `a ^ b`).
3. Why `x & -x`? (Isolates the rightmost set bit).
4. Partition array based on that bit? (One group has bit set, other doesn't. XOR each group to get `a` and `b`).
