# Task Scheduler

## Problem Description

**Real-World Scenario:**
A CPU schedules tasks where identical tasks need a cooldown between executions. Minimize total time to complete all tasks with the cooling constraint.

**Example Setup:** 
A factory assembly line has specialized robots. Each robot needs n minutes rest between handling the same product type. Schedule all tasks optimally.

**What is Task Scheduler?**
Given tasks (letters) and cooldown n, find minimum intervals to complete all tasks. Idle intervals can be added when no valid task is available.

**Why is it important?**
- Greedy scheduling
- Priority queue usage
- CPU scheduling
- Resource optimization

**Your Task:** 
Return minimum intervals to complete all tasks.

---

## Examples

### Example 1:
**Input:** `tasks = ["A","A","A","B","B","B"], n = 2`
**Output:** `8`
**Explanation:** A→B→idle→A→B→idle→A→B. Minimum = 8.

### Example 2:
**Input:** `tasks = ["A","A","A","B","B","B"], n = 0`
**Output:** `6`
**Explanation:** No cooldown needed. Just do all 6 tasks.

### Example 3:
**Input:** `tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2`
**Output:** `16`
**Explanation:** A dominates, schedule around it.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Tasks | 1 ≤ tasks.length ≤ 10⁴ |
| Task Type | Uppercase letters |
| Cooldown | 0 ≤ n ≤ 100 |
| Data Type | Character array |
| Time Complexity | O(n × m) where m = unique tasks |
| Space Complexity | O(1) - 26 letters max |
| Output Format | Minimum intervals |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Cruise |
| 🔵 Amazon | 🟡 Uber | 🟢 Waymo |
| 🔵 Microsoft | 🟡 Apple | 🟢 Rivian |

---

## Follow-up Questions

1. What's the formula for minimum intervals?
2. Why does the most frequent task determine lower bound?
3. How to calculate idle slots?
4. Can you use a priority queue approach?
