# Candy

## Problem Description

**Real-World Scenario:**
A manager distributes bonuses to employees based on performance ratings. Employees with higher ratings than their neighbors get more bonuses. Minimize total cost.

**Example Setup:** 
A teacher gives candies to students in a line. Higher grades get more candies than adjacent lower grades.

**What is Candy?**
There are n children standing in a line. Each child is assigned a rating value. You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

**Why is it important?**
- Greedy approach (two-pass)
- Array traversal
- Optimization
- Classic interview problem

**Your Task:** 
Return minimum total candies.

---

## Examples

### Example 1:
**Input:** `ratings = [1,0,2]`
**Output:** `5`
**Explanation:** You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

### Example 2:
**Input:** `ratings = [1,2,2]`
**Output:** `4`
**Explanation:** You can allocate to the first, second and third child with 1, 2, 1 candies respectively. The third child gets 1 candy because it satisfies the above two conditions.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Children | 1 ≤ n ≤ 2 × 10⁴ |
| Ratings | 0 ≤ ratings[i] ≤ 2 × 10⁴ |
| Data Type | Integer array |
| Special Conditions | Minimum 1 candy each |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | Integer total |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Roblox |
| 🔵 Amazon | 🟡 Apple | 🟢 Wish |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Coupang |

---

## Follow-up Questions

1. Why do you need two passes (left-to-right, right-to-left)?
2. Can you do it in one pass with O(1) space?
3. What if ratings are equal?
4. How to handle circular arrangement?
