# Task Scheduler

## Problem Description

**Real-World Scenario:**
A CPU scheduler executing tasks where identical tasks must be separated by a cooling interval `n` to prevent overheating or resource contention.

**Example Setup:** 
Scheduling recurring maintenance jobs.

**What is Task Scheduler?**
Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done without original order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.
However, there is a non-negative integer `n` that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least `n` units of time between any two same tasks.
Return the least number of units of times that the CPU will take to finish all the given tasks.

**Why is it important?**
- Greedy
- Priority Queue / Sorting
- Math (Formula based)

**Your Task:** 
Return min time.

**Difficulty:** Medium
**Tags:** Greedy, Medium, Priority Queue / Sorting, Math, O(N), Interview

---

## Examples

### Example 1:
**Input:** `tasks = ["A","A","A","B","B","B"], n = 2`
**Output:** `8`
**Explanation:** 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.

### Example 2:
**Input:** `tasks = ["A","A","A","B","B","B"], n = 0`
**Output:** `6`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Tasks (n) | 1 ≤ n ≤ 10^4 |
| Cooldown (n) | 0 ≤ n ≤ 100 |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer time |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Nutanix |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Pinterest |
| 🔵 Facebook | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Formula approach? `(max_freq - 1) * (n + 1) + count_of_max_freq`.
2. Why? (Arrange the most frequent tasks with `n` gaps. Fill gaps with other tasks. If gaps filled, result is length of tasks).
3. Priority Queue approach? (Simulate the process).
