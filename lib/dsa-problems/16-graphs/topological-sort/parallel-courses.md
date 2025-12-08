# Parallel Courses

## Problem Description

**Real-World Scenario:**
A university course scheduler calculates the minimum number of semesters required to complete all courses given prerequisite dependencies, assuming unlimited courses can be taken per semester.

**Example Setup:** 
A project manager calculates the "critical path" duration for a project where tasks can be done in parallel if dependencies are met.

**What is Parallel Courses?**
You are given an integer `n`, which indicates that there are `n` courses labeled from `1` to `n`. You are also given an array `relations` where `relations[i] = [prevCourse, nextCourse]`, representing a prerequisite relationship between course `prevCourse` and course `nextCourse`: course `prevCourse` has to be taken before course `nextCourse`. In one semester, you can take any number of courses as long as you have taken all the prerequisites in the previous semester for the courses you are taking. Return the minimum number of semesters needed to take all courses. If there is no way to take all the courses, return `-1`.

**Why is it important?**
- Topological Sort (BFS/Kahn's)
- Longest Path in DAG
- Cycle Detection
- Level-order traversal

**Your Task:** 
Return minimum semesters.

**Difficulty:** Medium
**Tags:** Graphs, Topological Sort, Longest Path In Dag, Cycle Detection, Level-Order Traversal, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** `n = 3, relations = [[1,3],[2,3]]`
**Output:** `2`
**Explanation:** Semester 1: take 1 and 2. Semester 2: take 3.

### Example 2:
**Input:** `n = 3, relations = [[1,2],[2,3],[3,1]]`
**Output:** `-1`
**Explanation:** Cycle 1-2-3-1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Courses | 1 ≤ n ≤ 5000 |
| Relations | 1 ≤ relations.length ≤ 5000 |
| Data Type | Directed Graph |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
| Output Format | Integer semesters |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Coursera |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Udacity |
| 🔵 Facebook | 🟡 Apple | 🟢 Khan Academy |

---

## Follow-up Questions

1. Why is this finding the longest path in a DAG?
2. How does BFS (Kahn's Algorithm) naturally count levels/semesters?
3. How to detect cycles during BFS (count visited nodes)?
4. What if there is a limit k on courses per semester (Parallel Courses II - NP-Hard)?
