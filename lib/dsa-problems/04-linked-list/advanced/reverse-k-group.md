# Reverse Nodes in K-Group

## Problem Description

**Real-World Scenario:**
A print spooler batches documents in groups of K and reverses each batch for collated printing. Handle incomplete final batch.

**Example Setup:** 
A card dealer deals hands in groups of K cards, reversing each dealt group while keeping remaining cards in order.

**What is Reverse Nodes in K-Group?**
Given a linked list, reverse every k consecutive nodes. If remaining nodes < k, leave them as-is.

**Why is it important?**
- Advanced linked list manipulation
- K-size batching
- Recursive and iterative approaches
- Hard interview problem

**Your Task:** 
Reverse nodes in groups of K.

**Difficulty:** Hard
**Tags:** Linked List, Advanced, Advanced Linked List Manipulation, K-Size Batching, Recursive And Iterative Approaches, Hard Interview, O(n), Interview

---

## Examples

### Example 1:
**Input:** `1 → 2 → 3 → 4 → 5, k = 2`
**Output:** `2 → 1 → 4 → 3 → 5`
**Explanation:** Pairs reversed, 5 left alone.

### Example 2:
**Input:** `1 → 2 → 3 → 4 → 5, k = 3`
**Output:** `3 → 2 → 1 → 4 → 5`
**Explanation:** First 3 reversed, last 2 unchanged.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 1 ≤ n ≤ 5000 |
| K Value | 1 ≤ k ≤ n |
| Node Value | 0 ≤ val ≤ 1000 |
| Data Type | Singly linked list |
| Time Complexity | O(n) |
| Space Complexity | O(1) |
| Output Format | Head of modified list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Snap |
| 🔵 Google | 🟡 Apple | 🟢 Dropbox |

---

## Follow-up Questions

1. How do you count k nodes ahead?
2. What's the connection technique between groups?
3. Can you solve recursively?
4. What if you should reverse incomplete groups too?
