# Candy

## Problem Description

**Real-World Scenario:**
A manager wants to distribute bonuses to employees based on performance ratings. Employees with higher ratings than their neighbors must get more bonus, but everyone gets at least one unit. Minimize total bonus.

**Example Setup:** 
Assigning priority levels to tasks based on dependency urgency.

**What is Candy?**
There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`.
You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

**Why is it important?**
- Greedy (Two Pass)
- Array Traversal
- Optimization

**Your Task:** 
Return total candies.

**Difficulty:** Easy
**Tags:** Greedy, Basics, Array Traversal, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `ratings = [1,0,2]`
**Output:** `5`
**Explanation:** You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

### Example 2:
**Input:** `ratings = [1,2,2]`
**Output:** `4`
**Explanation:** You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Children (n) | 1 ≤ n ≤ 2 * 10^4 |
| Ratings | 0 ≤ ratings[i] ≤ 2 * 10^4 |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 ByteDance |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Tencent |
| 🔵 Facebook | 🟡 Apple | 🟢 Alibaba |

---

## Follow-up Questions

1. Why two passes? (Left-to-right ensures right neighbor condition. Right-to-left ensures left neighbor condition).
2. Why `max(candies[i], candies[i+1] + 1)` in second pass? (To satisfy both left and right constraints).
3. Can you do it in one pass? (Yes, with peak/valley counting, but harder).
