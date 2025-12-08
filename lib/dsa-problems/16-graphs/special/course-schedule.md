# Course Schedule (Cycle Detection)

## Problem Description

**Real-World Scenario:**
You're registering for college courses. Some courses require prerequisites - you can't take "Machine Learning" without first completing "Linear Algebra". But what if the prerequisites form a loop? That's impossible to complete!

**Example Setup:** 
Priya is an academic advisor. She needs to verify that a student's course plan is valid. If Course A requires B, B requires C, and C requires A, the student can never graduate!

**What is Course Schedule?**
Given the total number of courses and a list of prerequisite pairs, determine if it's possible to finish all courses. This is essentially checking if a directed graph (courses) has a cycle.

**Why is it important?**
- Academic course planning
- Task scheduling systems
- Dependency resolution
- Build system validation

**Your Task:** 
Determine if it's possible to complete all courses given the prerequisite constraints.

**Difficulty:** Medium
**Tags:** Graphs, Special, Academic Course Planning, Task Scheduling Systems, Dependency Resolution, Build System Validation, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
numCourses = 2
prerequisites = [[1,0]]
(To take course 1, you must first take course 0)
```
**Output:** `true`
**Explanation:** Take course 0, then course 1. No cycle.

### Example 2:
**Input:** 
```
numCourses = 2
prerequisites = [[1,0], [0,1]]
```
**Output:** `false`
**Explanation:** Course 1 needs 0, and course 0 needs 1 - impossible!

### Example 3:
**Input:** 
```
numCourses = 4
prerequisites = [[1,0], [2,1], [3,2]]
```
**Output:** `true`
**Explanation:** Take in order: 0 → 1 → 2 → 3. Linear dependencies work.

### Example 4:
**Input:** 
```
numCourses = 3
prerequisites = []
```
**Output:** `true`
**Explanation:** No prerequisites means any order works.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Courses | 1 ≤ numCourses ≤ 2000 |
| Prerequisites | 0 ≤ prerequisites.length ≤ 5000 |
| Data Type | Integer course indices |
| Special Conditions | Each pair [a, b] means b is required for a |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
| Output Format | Boolean (true if all courses can be finished) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Coursera |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 edX |
| 🔵 Facebook | 🟡 Airbnb | 🟢 Udemy |
| 🔵 Microsoft | 🟡 Snapchat | 🟢 Udacity |

---

## Follow-up Questions

1. How would you use Kahn's algorithm (BFS) to solve this?
2. How would you return the actual order of courses (Course Schedule II)?
3. What's the relationship to topological sort?
4. How would you find which courses are causing the cycle?
