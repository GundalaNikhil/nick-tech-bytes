# Fruit Into Baskets

## Problem Description

**Real-World Scenario:**
A harvester collects fruits from a row of trees but only has two baskets, and each basket can only hold one type of fruit. Maximize the total fruit collected in a contiguous run.

**Example Setup:** 
A cache eviction policy allows keeping only 2 distinct types of items in memory while processing a stream. Find the longest sequence of requests that can be served without eviction.

**What is Fruit Into Baskets?**
You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array `fruits` where `fruits[i]` is the type of fruit the `ith` tree produces. You want to collect as much fruit as possible. However, the owner has some strict rules:
1. You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
2. Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
3. Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array `fruits`, return the maximum number of fruits you can pick.

**Why is it important?**
- Sliding Window
- Longest Subarray with at most 2 distinct elements
- HashMap / Frequency Array
- Optimization

**Your Task:** 
Return max fruits.

---

## Examples

### Example 1:
**Input:** `fruits = [1,2,1]`
**Output:** `3`
**Explanation:** Pick all. Types {1, 2}.

### Example 2:
**Input:** `fruits = [0,1,2,2]`
**Output:** `3`
**Explanation:** Pick [1,2,2]. Types {1, 2}.

### Example 3:
**Input:** `fruits = [1,2,3,2,2]`
**Output:** `4`
**Explanation:** Pick [2,3,2,2]. Types {2, 3}.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Fruit Types | 0 ≤ fruits[i] < n |
| Data Type | Integer array |
| Time Complexity | O(N) |
| Space Complexity | O(1) (max 3 types in map) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Wayfair |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Coupang |
| 🔵 Facebook | 🟡 Apple | 🟢 Wish |

---

## Follow-up Questions

1. How is this "Longest Substring with At Most K Distinct Characters" (K=2)?
2. Why use a Map to track counts?
3. When do you shrink the window (map size > 2)?
4. What if you had K baskets?
