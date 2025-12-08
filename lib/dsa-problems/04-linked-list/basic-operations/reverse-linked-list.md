# Reverse Linked List

## Problem Description

**Real-World Scenario:**
In a music player's "recently played" list, songs are added at the front (most recent first). To show "oldest first" order, you need to reverse the linked list representing the history.

**Example Setup:** 
A text editor stores undo operations in a linked list. Sometimes users want to see the history from oldest to newest instead of newest to oldest. Reverse the list to change the view order!

**What is Reverse Linked List?**
Given the head of a singly linked list, reverse the list and return the new head (which was the old tail).

**Why is it important?**
- Fundamental linked list operation
- Tests pointer manipulation skills
- Used in many other problems (palindrome check, etc.)
- Both iterative and recursive approaches exist

**Your Task:** 
Reverse a singly linked list.

**Difficulty:** Medium
**Tags:** Linked List, Basic Operations, Fundamental Linked List Operation, Tests Pointer Manipulation Skills, Used In Many Other Problems, Both Iterative And Recursive Approaches Exist, O(n), Interview

---

## Examples

### Example 1:
**Input:** `1 → 2 → 3 → 4 → 5`
**Output:** `5 → 4 → 3 → 2 → 1`
**Explanation:** All links reversed.

### Example 2:
**Input:** `1 → 2`
**Output:** `2 → 1`
**Explanation:** Simple swap of two nodes.

### Example 3:
**Input:** `1`
**Output:** `1`
**Explanation:** Single node, already reversed.

### Example 4:
**Input:** Empty list (null)
**Output:** Empty list (null)
**Explanation:** Nothing to reverse.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 5000 |
| Node Value | -5000 ≤ val ≤ 5000 |
| Data Type | Singly linked ListNode |
| Special Conditions | Can be empty |
| Time Complexity | O(n) |
| Space Complexity | O(1) iterative, O(n) recursive |
| Output Format | Head of reversed list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 Nvidia |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 VMware |
| 🔵 Facebook | 🟡 Uber | 🟢 Cisco |
| 🔵 Microsoft | 🟡 Oracle | 🟢 PayPal |
| 🔵 Apple | 🟡 LinkedIn | 🟢 Qualcomm |

---

## Follow-up Questions

1. Can you do it iteratively AND recursively?
2. How would you reverse only a portion of the list (positions m to n)?
3. How would you reverse in groups of K?
4. Can you reverse with O(1) space recursively? (tricky!)
