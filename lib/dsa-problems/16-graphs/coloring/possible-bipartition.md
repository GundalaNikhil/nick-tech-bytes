# Possible Bipartition

## Problem Description

**Real-World Scenario:**
A party planner seats guests at two tables. Some guests dislike each other and can't be at the same table. Check if seating is possible.

**Example Setup:** 
A team manager splits employees into two project groups based on conflict reports. Check if conflict-free grouping is possible.

**What is Possible Bipartition?**
Given n people and dislikes list, check if they can be split into two groups such that no two people who dislike each other are in the same group.

**Why is it important?**
- Graph bipartiteness
- Conflict resolution
- Team allocation
- BFS/DFS coloring

**Your Task:** 
Return true if bipartition is possible.

---

## Examples

### Example 1:
**Input:** `n = 4, dislikes = [[1,2],[1,3],[2,4]]`
**Output:** `true`
**Explanation:** Groups [1,4] and [2,3].

### Example 2:
**Input:** `n = 3, dislikes = [[1,2],[1,3],[2,3]]`
**Output:** `false`
**Explanation:** Triangle of dislikes can't be split.

### Example 3:
**Input:** `n = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]`
**Output:** `false`
**Explanation:** Odd cycle.

---

## Constraints

| Constraint | Value |
|------------|-------|
| People | 1 ≤ n ≤ 2000 |
| Dislikes | 0 ≤ dislikes.length ≤ 10⁴ |
| Data Type | Edge pairs |
| Special Conditions | No duplicates |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Eventbrite |
| 🔵 Amazon | 🟡 Uber | 🟢 Meetup |
| 🔵 Facebook | 🟡 Apple | 🟢 Slack |

---

## Follow-up Questions

1. How is this equivalent to bipartite checking?
2. Why use BFS with 2-coloring?
3. How do you handle multiple components?
4. What if you had more than 2 groups (k-coloring)?
