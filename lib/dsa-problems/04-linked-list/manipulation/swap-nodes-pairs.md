# Swap Nodes in Pairs

## Problem Description

**Real-World Scenario:**
A processor pipeline swaps adjacent instructions for optimization. Swap every two adjacent elements in the pipeline without modifying values.

**Example Setup:** 
A dance choreographer rearranges pairs of dancers - partners swap positions with each other while maintaining pair groupings.

**What is Swap Nodes in Pairs?**
Given a linked list, swap every two adjacent nodes and return the modified list. Must actually swap nodes, not just values.

**Why is it important?**
- Pointer manipulation
- Recursion or iteration
- In-place modification
- Foundation for k-group reversal

**Your Task:** 
Swap adjacent pairs and return the head.

**Difficulty:** Medium
**Tags:** Linked List, Manipulation, Pointer Manipulation, Recursion Or Iteration, In-Place Modification, Foundation For K-Group Reversal, O(n), Interview

---

## Examples

### Example 1:
**Input:** `1 → 2 → 3 → 4`
**Output:** `2 → 1 → 4 → 3`
**Explanation:** Pairs (1,2) and (3,4) swapped.

### Example 2:
**Input:** `[]`
**Output:** `[]`
**Explanation:** Empty list.

### Example 3:
**Input:** `[1]`
**Output:** `[1]`
**Explanation:** Odd node left as-is.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 100 |
| Node Value | 0 ≤ val ≤ 100 |
| Data Type | Singly linked list |
| Special Conditions | Swap nodes, not values |
| Time Complexity | O(n) |
| Space Complexity | O(1) iterative |
| Output Format | Head of modified list |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Apple | 🟢 Qualcomm |
| 🔵 Facebook | 🟡 Adobe | 🟢 ARM |

---

## Follow-up Questions

1. Can you solve recursively?
2. How do you handle the dummy head?
3. What about reverse nodes in k-group?
4. Why not just swap values?
