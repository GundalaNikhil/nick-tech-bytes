# Min Stack

## Problem Description

**Real-World Scenario:**
A browser history manager tracks visited pages and supports going back, but also needs to instantly know the "minimum" load time page in the current history stack for performance analytics.

**Example Setup:** 
A stock price tracker stores prices in a stack and needs to retrieve the minimum price observed in the current session in O(1) time.

**What is Min Stack?**
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

**Why is it important?**
- Stack design
- Auxiliary data structure
- O(1) operations
- Interview classic

**Your Task:** 
Implement the MinStack class.

---

## Examples

### Example 1:
**Operations:**
```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Operations | push, pop, top, getMin |
| Value Range | -2³¹ ≤ val ≤ 2³¹-1 |
| Call Count | At most 3 * 10⁴ calls |
| Time Complexity | O(1) for all operations |
| Space Complexity | O(n) |
| Output Format | Per operation |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Lyft |
| 🔵 Microsoft | 🟡 Apple | 🟢 Splunk |
| 🔵 Google | 🟡 Adobe | 🟢 VMware |

---

## Follow-up Questions

1. How do you use an auxiliary stack to track minimums?
2. Can you optimize space by storing (value, min) pairs?
3. Can you optimize space by storing only new minimums?
4. How to implement without extra space (using encoded values)?
