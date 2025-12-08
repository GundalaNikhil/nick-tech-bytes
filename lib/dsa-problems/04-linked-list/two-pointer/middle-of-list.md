# Middle of the Linked List

## Problem Description

**Real-World Scenario:**
A data splitter finds the midpoint of a data stream (linked list) for parallel processing.

**Example Setup:** 
A tournament bracket finder locates the middle team to determine seeding breaks.

**What is Middle of Linked List?**
Find the middle node of a linked list. If there are two middle nodes (even length), return the second middle node.

**Why is it important?**
- Fast/slow pointer classic
- Foundation for many problems
- Single-pass O(n)
- Interview must-know

**Your Task:** 
Return the middle node.

---

## Examples

### Example 1:
**Input:** `1 → 2 → 3 → 4 → 5`
**Output:** Node 3
**Explanation:** Middle of 5 nodes.

### Example 2:
**Input:** `1 → 2 → 3 → 4 → 5 → 6`
**Output:** Node 4
**Explanation:** For even length, return second middle.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 100 |
| Node Value | 1 ≤ val ≤ 100 |
| Data Type | Singly linked list |
| Special Conditions | Return second middle for even |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Middle node reference |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Qualcomm |
| 🔵 Facebook | 🟡 Apple | 🟢 Cisco |
| 🔵 Google | 🟡 Adobe | 🟢 Intel |

---

## Follow-up Questions

1. How do fast and slow pointers work?
2. When does fast reach the end (even vs odd)?
3. How is this used in merge sort for lists?
4. What about finding the first middle for even length?
