# Add Two Numbers II

## Problem Description

**Real-World Scenario:**
A calculator app adds two large numbers stored digit-by-digit in linked lists (most significant digit first).

**Example Setup:** 
A banking system adds account balances represented as linked lists for unlimited precision.

**What is Add Two Numbers II?**
Given two non-empty linked lists representing non-negative integers (most significant digit at head), add them and return as a linked list.

**Why is it important?**
- Linked list manipulation
- Stack usage for reverse access
- Arbitrary precision arithmetic
- Follow-up to Add Two Numbers I

**Your Task:** 
Return the sum as a linked list (most significant first).

---

## Examples

### Example 1:
**Input:** `l1 = [7,2,4,3], l2 = [5,6,4]`
**Output:** `[7,8,0,7]`
**Explanation:** 7243 + 564 = 7807.

### Example 2:
**Input:** `l1 = [2,4,3], l2 = [5,6,4]`
**Output:** `[8,0,7]`
**Explanation:** 243 + 564 = 807.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n, m ≤ 100 |
| Node Value | 0 ≤ val ≤ 9 |
| Data Type | Singly linked list |
| Special Conditions | No leading zeros (except 0) |
| Time Complexity | O(n + m) |
| Space Complexity | O(n + m) with stacks |
| Output Format | Sum as linked list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Capital One |
| 🔵 Amazon | 🟡 Apple | 🟢 Visa |
| 🔵 Google | 🟡 Adobe | 🟢 Mastercard |

---

## Follow-up Questions

1. Can you solve without reversing the lists?
2. How does using stacks help?
3. How to handle different length lists?
4. What about in-place without extra space?
