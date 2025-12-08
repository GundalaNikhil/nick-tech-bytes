# Add Two Numbers (Linked List)

## Problem Description

**Real-World Scenario:**
Scientific calculators store very large numbers digit by digit (arbitrary precision). To add two such numbers, process digit by digit with carry - just like manual addition!

**Example Setup:** 
A banking system handles transaction amounts larger than standard integers allow. Numbers are stored as linked lists of digits for unlimited precision arithmetic.

**What is Add Two Numbers?**
Given two numbers represented as reversed linked lists (ones digit first), add them and return the sum as a linked list.

**Why is it important?**
- Arbitrary precision arithmetic
- Linked list manipulation
- Carry handling
- Real banking/scientific applications

**Your Task:** 
Add two numbers represented as linked lists.

**Difficulty:** Medium
**Tags:** Linked List, Manipulation, Arbitrary Precision Arithmetic, Linked List Manipulation, Carry Handling, Real Banking/Scientific Applications, O(max(n, m), Interview

---

## Examples

### Example 1:
**Input:** `l1 = [2,4,3], l2 = [5,6,4]`
**Output:** `[7,0,8]`
**Explanation:** 342 + 465 = 807 (reversed).

### Example 2:
**Input:** `l1 = [0], l2 = [0]`
**Output:** `[0]`
**Explanation:** 0 + 0 = 0.

### Example 3:
**Input:** `l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]`
**Output:** `[8,9,9,9,0,0,0,1]`
**Explanation:** 9999999 + 9999 = 10009998.

---

## Constraints

| Constraint | Value |
|------------|-------|
| List Length | 1 ≤ n, m ≤ 100 |
| Digit Value | 0 ≤ digit ≤ 9 |
| Data Type | Singly linked list |
| Special Conditions | Numbers don't have leading zeros (except 0) |
| Time Complexity | O(max(n, m)) |
| Space Complexity | O(max(n, m)) for result |
| Output Format | Linked list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Stripe |
| 🔵 Facebook | 🟡 Adobe | 🟢 Square |
| 🔵 Microsoft | 🟡 Uber | 🟢 PayPal |

---

## Follow-up Questions

1. What if numbers are stored in forward order (Most Significant First)?
2. How do you handle different length lists?
3. What if there's a carry after the last digit?
4. Can you solve without creating a new list (modify in place)?
