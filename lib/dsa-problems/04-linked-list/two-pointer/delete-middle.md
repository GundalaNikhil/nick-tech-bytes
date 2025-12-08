# Delete Middle of Linked List

## Problem Description

**Real-World Scenario:**
A playlist editor removes the middle song for better flow. Given a playlist (linked list), remove the exact middle element.

**Example Setup:** 
A message queue removes the middle message to rebalance the queue.

**What is Delete Middle of Linked List?**
Delete the middle node of a linked list. For even lengths, delete the second middle node.

**Why is it important?**
- Fast/slow pointer technique
- Single-pass solution
- Linked list manipulation
- Edge case handling

**Your Task:** 
Return the head after deleting the middle node.

**Difficulty:** Medium
**Tags:** Linked List, Two Pointer, Fast/Slow Pointer, Single-Pass Solution, Linked List Manipulation, Edge Case Handling, O(n), Interview

---

## Examples

### Example 1:
**Input:** `1 → 3 → 4 → 7 → 1 → 2 → 6`
**Output:** `1 → 3 → 4 → 1 → 2 → 6`
**Explanation:** 7 (index 3) is middle, removed.

### Example 2:
**Input:** `1 → 2 → 3 → 4`
**Output:** `1 → 2 → 4`
**Explanation:** For even length, 3 (second middle) is removed.

### Example 3:
**Input:** `2`
**Output:** Empty list
**Explanation:** Single element is the middle.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 10⁵ |
| Node Value | 1 ≤ val ≤ 10⁵ |
| Data Type | Singly linked list |
| Special Conditions | Return empty for single node |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Head of modified list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Apple | 🟢 Pandora |
| 🔵 Facebook | 🟡 Adobe | 🟢 SoundCloud |

---

## Follow-up Questions

1. How do you stop slow at the node BEFORE middle?
2. Why use a dummy head?
3. What's the fast/slow pointer formula for this?
4. What about deleting the Nth node from middle?
