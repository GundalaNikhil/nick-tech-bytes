# House Robber

## Problem Description

**Real-World Scenario:**
A thief plans to rob houses along a street. Each house has a certain amount of cash. However, adjacent houses have connected security systems - if two adjacent houses are robbed, the alarm triggers. What's the maximum amount the thief can rob?

**Example Setup:** 
Chor Bazaar street has 5 shops, each with hidden treasure. But there's a catch: if you take from two adjacent shops, the neighborhood watch catches you. How can you maximize your "collection" without getting caught?

**What is the House Robber Problem?**
Given an array where each element represents the money in that house, find the maximum sum you can get without picking two adjacent elements. This teaches the concept of "skip or take" decisions in DP.

**Why is it important?**
- Classic "include/exclude" pattern
- Builds on climbing stairs logic
- Foundation for many DP problems
- Teaches state transitions

**Your Task:** 
Find the maximum amount of money you can rob without alerting the police.

**Difficulty:** Medium
**Tags:** Dynamic Programming, 1D Dp, Classic "Include/Exclude" Pattern, Builds On Climbing Stairs Logic, Foundation For Many Dp Problems, Teaches State Transitions, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1, 2, 3, 1]`
**Output:** `4`
**Explanation:** Rob house 1 ($1) and house 3 ($3) = $4

### Example 2:
**Input:** `nums = [2, 7, 9, 3, 1]`
**Output:** `12`
**Explanation:** Rob house 1 ($2) + house 3 ($9) + house 5 ($1) = $12

### Example 3:
**Input:** `nums = [2, 1, 1, 2]`
**Output:** `4`
**Explanation:** Rob house 1 ($2) + house 4 ($2) = $4

### Example 4:
**Input:** `nums = [5]`
**Output:** `5`
**Explanation:** Only one house, rob it!

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 100 |
| Money Range | 0 ≤ nums[i] ≤ 400 |
| Data Type | Non-negative integers |
| Special Conditions | Cannot rob adjacent houses |
| Time Complexity | O(n) |
| Space Complexity | O(1) optimized |
| Output Format | Maximum robbed amount |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Cisco |
| 🔵 Amazon | 🟡 Airbnb | 🟢 Quora |
| 🔵 Microsoft | 🟡 Uber | 🟢 Yelp |

---

## Follow-up Questions

1. What if the houses are arranged in a circle (House Robber II)?
2. What if it's a binary tree of houses (House Robber III)?
3. How would you track which houses to rob, not just the max amount?
4. What if you can skip at most K houses between robberies?
