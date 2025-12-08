# Implement Stack using Queues

## Problem Description

**Real-World Scenario:**
A system only supports FIFO queues but your application needs LIFO behavior. Implement a stack adapter using only queue operations.

**Example Setup:** 
An embedded system has only queue hardware but the application needs stack-like processing for undo operations.

**What is Stack using Queues?**
Implement a LIFO stack using only FIFO queue operations: enqueue and dequeue. Support push, pop, top, and empty.

**Why is it important?**
- Data structure adaptation
- Understanding LIFO vs FIFO
- System constraints
- Interview classic

**Your Task:** 
Implement all stack operations using only queue methods.

---

## Examples

### Example 1:
**Operations:**
```
MyStack stack = new MyStack()
stack.push(1)
stack.push(2)
stack.top()    // returns 2
stack.pop()    // returns 2
stack.empty()  // returns false
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Operations | 1 ≤ calls ≤ 100 |
| Value | 1 ≤ x ≤ 9 |
| Data Type | Queue operations only |
| Special Conditions | Valid operations only |
| Time Complexity | O(n) push or O(n) pop |
| Space Complexity | O(n) |
| Output Format | Per method |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Oracle | 🟢 Cisco |
| 🔵 Apple | 🟡 Adobe | 🟢 Qualcomm |

---

## Follow-up Questions

1. Should push or pop be O(1)?
2. Can you use one queue only?
3. How about Queue using Stacks?
4. What's the trade-off between approaches?
