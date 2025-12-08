# Design Circular Queue

## Problem Description

**Real-World Scenario:**
A print spooler manages print jobs in a circular buffer. When full, oldest jobs are overwritten by new ones.

**Example Setup:** 
A streaming buffer stores the last N audio frames. New frames overwrite the oldest in a circular fashion.

**What is Design Circular Queue?**
Implement a circular queue with fixed size supporting enqueue, dequeue, front, rear, isEmpty, and isFull operations.

**Why is it important?**
- Circular buffer implementation
- Ring buffer pattern
- Memory efficient queues
- Producer-consumer systems

**Your Task:** 
Implement MyCircularQueue class with all operations.

**Difficulty:** Medium
**Tags:** Queue, Implementation, Circular Buffer Implementation, Ring Buffer Pattern, Memory Efficient Queues, Producer-Consumer Systems, O(1), Interview

---

## Examples

### Example 1:
**Operations:**
```
MyCircularQueue queue = new MyCircularQueue(3)
queue.enQueue(1)   // true
queue.enQueue(2)   // true
queue.enQueue(3)   // true
queue.enQueue(4)   // false (full)
queue.Rear()       // 3
queue.isFull()     // true
queue.deQueue()    // true
queue.enQueue(4)   // true
queue.Rear()       // 4
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Size | 1 ≤ k ≤ 1000 |
| Value | 0 ≤ value ≤ 1000 |
| Operations | At most 3000 calls |
| Data Type | Fixed-size array or linked list |
| Time Complexity | O(1) all operations |
| Space Complexity | O(k) |
| Output Format | Per operation |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 HP |
| 🔵 Microsoft | 🟡 Apple | 🟢 Canon |
| 🔵 Google | 🟡 Oracle | 🟢 Epson |

---

## Follow-up Questions

1. How do you handle wraparound with modulo?
2. Array vs linked list implementation?
3. How to distinguish empty vs full (count or sentinel)?
4. What about thread-safe version?
