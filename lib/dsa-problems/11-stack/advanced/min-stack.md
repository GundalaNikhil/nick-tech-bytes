# Min Stack

## Problem Description

**Real-World Scenario:**
A stock broker needs to track stock prices as they come in (like a stack) but also instantly know the lowest price seen so far. Regular push/pop is O(1), but how do you make getMin() also O(1)?

**Example Setup:** 
Priya runs a tutoring center. When students join a waitlist (stack), she wants to instantly know who has the highest priority (lowest wait number) without searching through everyone.

**What is Min Stack?**
Design a stack that supports push, pop, top, and getMin operations, all in O(1) time complexity.

**Why is it important?**
- Data structure design skills
- O(1) constraint forces clever thinking
- Real-world monitoring systems
- Teaches auxiliary data structures

**Your Task:** 
Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.

---

## Examples

### Example 1:
**Input:** 
```
MinStack()
push(-2)
push(0)
push(-3)
getMin() → returns -3
pop()
top()    → returns 0
getMin() → returns -2
```
**Explanation:** Track minimum at each state.

### Example 2:
**Input:** 
```
MinStack()
push(1)
push(2)
push(3)
getMin() → returns 1
pop()
pop()
getMin() → returns 1
```
**Explanation:** Even after pops, min is still 1.

### Example 3:
**Input:** 
```
MinStack()
push(5)
push(3)
push(3)
pop()
getMin() → returns 3
pop()
getMin() → returns 5
```
**Explanation:** Duplicate mins handled correctly.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Operations | Up to 3 × 10⁴ calls |
| Value Range | -2³¹ ≤ val ≤ 2³¹ - 1 |
| Data Type | Integers |
| Special Conditions | pop, top, getMin always called on non-empty |
| Time Complexity | O(1) for all operations |
| Space Complexity | O(n) |
| Output Format | Depends on operation |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Snap |
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Cruise |
| 🔵 Microsoft | 🟡 Uber | 🟢 Robinhood |
| 🔵 Apple | 🟡 Adobe | 🟢 Wish |

---

## Follow-up Questions

1. Can you implement with O(1) space in addition to the main stack?
2. How would you implement a Max Stack?
3. What if getMin needs to return the index too?
4. How would you handle concurrent access to this stack?
