# Design Circular Deque

## Problem Description

**Real-World Scenario:**
A fixed-size buffer for a network router that processes packets from both ends (e.g., high priority at front, low priority at back, or dropping from front/back when full).

**Example Setup:** 
Implementing a sliding window history buffer.

**What is Design Circular Deque?**
Design your implementation of the circular double-ended queue (deque).
Implement the `MyCircularDeque` class:
- `MyCircularDeque(int k)` Initializes the deque with a maximum size of `k`.
- `boolean insertFront()` Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
- `boolean insertLast()` Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
- `boolean deleteFront()` Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
- `boolean deleteLast()` Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
- `int getFront()` Returns the front item from the Deque. Returns -1 if the deque is empty.
- `int getRear()` Returns the last item from Deque. Returns -1 if the deque is empty.
- `boolean isEmpty()` Returns true if the deque is empty, or false otherwise.
- `boolean isFull()` Returns true if the deque is full, or false otherwise.

**Why is it important?**
- Array Implementation of Deque
- Modulo Arithmetic
- Circular Buffer

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** 
`MyCircularDeque(3)`
`insertLast(1)` -> true
`insertLast(2)` -> true
`insertFront(3)` -> true
`insertFront(4)` -> false (full)
`getRear()` -> 2
`isFull()` -> true
`deleteLast()` -> true
`insertFront(4)` -> true
`getFront()` -> 4

---

## Constraints

| Constraint | Value |
|------------|-------|
| Capacity (k) | 1 ≤ k ≤ 1000 |
| Calls | At most 2000 calls |
| Time Complexity | O(1) |
| Space Complexity | O(K) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Apple |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Oracle |
| 🔵 Facebook | 🟡 Apple | 🟢 IBM |

---

## Follow-up Questions

1. Why use an array? (Fixed size, cache locality).
2. How to handle wrap-around? `(index + 1) % capacity` or `(index - 1 + capacity) % capacity`.
3. Difference from Circular Queue? (Supports operations at both ends).
