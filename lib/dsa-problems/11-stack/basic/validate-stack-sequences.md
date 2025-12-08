# Validate Stack Sequences

## Problem Description

**Real-World Scenario:**
A browser history manager checks if a sequence of page visits (push) and back button clicks (pop) is valid given the observed history state.

**Example Setup:** 
A robotic arm simulator verifies if a sequence of pick (push) and place (pop) operations is physically possible given a single storage stack.

**What is Validate Stack Sequences?**
Given two integer arrays `pushed` and `popped` each with distinct values, return `true` if this could have been the result of a sequence of push and pop operations on an initially empty stack, or `false` otherwise.

**Why is it important?**
- Stack Simulation
- Greedy Strategy
- Array processing
- Interview classic

**Your Task:** 
Return true if valid.

---

## Examples

### Example 1:
**Input:** `pushed = [1,2,3,4,5], popped = [4,5,3,2,1]`
**Output:** `true`
**Explanation:** 
Push 1, 2, 3, 4.
Pop 4.
Push 5.
Pop 5, 3, 2, 1.

### Example 2:
**Input:** `pushed = [1,2,3,4,5], popped = [4,3,5,1,2]`
**Output:** `false`
**Explanation:** Pop 1 cannot happen before 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 1000 |
| Values | Distinct |
| Data Type | Integer arrays |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Oracle |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Salesforce |
| 🔵 Facebook | 🟡 Apple | 🟢 SAP |

---

## Follow-up Questions

1. Why simulate the process greedily?
2. Why check `stack.peek() == popped[j]` in a loop?
3. Can you use the `pushed` array as the stack to save space?
4. What if values were not distinct?
