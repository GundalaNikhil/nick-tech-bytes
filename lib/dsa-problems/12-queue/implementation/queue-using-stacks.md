# Implement Queue using Stacks

## Problem Description

**Real-World Scenario:**
A legacy system only has stack data structures, but you need FIFO queue behavior. Implement a queue using only stack operations - this is what some embedded systems face!

**Example Setup:** 
A printer has a stack-based buffer (LIFO), but print jobs need to be processed in order received (FIFO). Build a queue using only the stack primitives available.

**What is Queue using Stacks?**
Implement a first-in-first-out (FIFO) queue using only two stacks. The queue should support push, pop, peek, and empty operations.

**Why is it important?**
- Data structure design
- Amortized analysis
- Stack vs Queue understanding
- Common interview question

**Your Task:** 
Implement a queue using two stacks.

---

## Examples

### Example 1:
**Operations:**
```
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek();  → 1
queue.pop();   → 1
queue.empty(); → false
```

### Example 2:
**Operations:**
```
queue.push(1);
queue.push(2);
queue.push(3);
queue.pop();   → 1
queue.pop();   → 2
queue.peek();  → 3
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Value Range | 1 ≤ value ≤ 9 |
| Operations | Up to 100 calls |
| Special Conditions | All ops are valid (no pop on empty) |
| Time Complexity | O(1) amortized for all operations |
| Space Complexity | O(n) |
| Output Format | Depends on operation |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Nvidia |
| 🔵 Microsoft | 🟡 Adobe | 🟢 VMware |
| 🔵 Apple | 🟡 Oracle | 🟢 Qualcomm |

---

## Follow-up Questions

1. What's the amortized O(1) approach?
2. Can you do with one stack (using recursion)?
3. What's the reverse operation: Stack using Queues?
4. Which approach is better for push-heavy vs pop-heavy?
