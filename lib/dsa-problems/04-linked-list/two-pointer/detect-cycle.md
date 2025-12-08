# Detect Cycle in Linked List

## Problem Description

**Real-World Scenario:**
In a web crawler, pages link to each other. If page A links to B, B links to C, and C links back to A, you have a cycle that could cause infinite crawling. Detecting this cycle prevents the crawler from spinning forever.

**Example Setup:** 
A GPS navigation system stores route segments as a linked list. If there's an error and a segment points back to an earlier segment, the car would drive in circles forever! Detect if such a loop exists.

**What is Cycle Detection?**
Determine if a linked list has a cycle - where some node's next pointer points back to a previous node in the list, creating a loop.

**Why is it important?**
- Prevents infinite loops
- Memory leak detection
- Floyd's cycle detection algorithm
- Used in graph cycle detection too

**Your Task:** 
Return true if the linked list has a cycle, false otherwise.

**Difficulty:** Medium
**Tags:** Linked List, Two Pointer, Prevents Infinite Loops, Memory Leak Detection, Floyd'S Cycle Detection, Used In Graph Cycle Detection Too, O(n), Interview

---

## Examples

### Example 1:
**Input:** `3 → 2 → 0 → -4 → (back to 2)`
**Output:** `true`
**Explanation:** Node -4 points back to node 2, creating a cycle.

### Example 2:
**Input:** `1 → 2 → (back to 1)`
**Output:** `true`
**Explanation:** Node 2 points back to node 1.

### Example 3:
**Input:** `1` (no cycle)
**Output:** `false`
**Explanation:** Single node with no next pointer.

### Example 4:
**Input:** `1 → 2 → 3 → 4 → null`
**Output:** `false`
**Explanation:** List ends properly with null.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Nodes | 0 ≤ n ≤ 10⁴ |
| Node Value | -10⁵ ≤ val ≤ 10⁵ |
| Data Type | Singly linked list |
| Special Conditions | Can't modify the list |
| Time Complexity | O(n) |
| Space Complexity | O(1) with Floyd's, O(n) with hash set |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Citrix |
| 🔵 Google | 🟡 Oracle | 🟢 ServiceNow |
| 🔵 Apple | 🟡 Uber | 🟢 Atlassian |

---

## Follow-up Questions

1. How does Floyd's "tortoise and hare" algorithm work?
2. Can you find WHERE the cycle starts (Linked List Cycle II)?
3. What's the math behind why fast and slow pointers meet?
4. Can you remove the cycle once detected?
