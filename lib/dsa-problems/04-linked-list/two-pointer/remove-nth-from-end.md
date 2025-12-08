# Remove Nth Node From End

## Problem Description

**Real-World Scenario:**
A playlist manager needs to remove the Nth song from the end. Without knowing the total length beforehand, you need a clever approach.

**Example Setup:** 
A browser's "recently closed tabs" list is a linked list. The user wants to restore the 3rd most recently closed tab - you need to find and remove the Nth from end.

**What is Remove Nth Node From End?**
Given a linked list, remove the Nth node from the end and return the head. Do this in one pass!

**Why is it important?**
- Two-pointer technique
- Fast/slow pointer spacing
- One-pass solution
- Common interview question

**Your Task:** 
Remove the Nth node from the end in one pass.

**Difficulty:** Medium
**Tags:** Linked List, Two Pointer, Two-Pointer, Fast/Slow Pointer Spacing, One-Pass Solution, Common Interview Question, O(n), Interview

---

## Examples

### Example 1:
**Input:** `head = [1, 2, 3, 4, 5], n = 2`
**Output:** `[1, 2, 3, 5]`
**Explanation:** Remove 4th node (2nd from end).

### Example 2:
**Input:** `head = [1], n = 1`
**Output:** `[]`
**Explanation:** Remove only node.

### Example 3:
**Input:** `head = [1, 2], n = 1`
**Output:** `[1]`
**Explanation:** Remove last node.

### Example 4:
**Input:** `head = [1, 2], n = 2`
**Output:** `[2]`
**Explanation:** Remove head.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ size ≤ 30 |
| N Value | 1 ≤ n ≤ size |
| Node Value | 0 ≤ val ≤ 100 |
| Data Type | Singly linked list |
| Time Complexity | O(n) one pass |
| Space Complexity | O(1) |
| Output Format | Head of modified list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Facebook | 🟡 Adobe | 🟢 Snap |
| 🔵 Microsoft | 🟡 Uber | 🟢 Yelp |

---

## Follow-up Questions

1. How does the two-pointer with gap technique work?
2. Why use a dummy head node?
3. What if n equals the list length (remove head)?
4. Can you do this with a single pointer and index calculation?
