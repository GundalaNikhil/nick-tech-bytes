# Fruit Into Baskets

## Problem Description

**Real-World Scenario:**
A harvester wants to pick fruits from a row of trees but can only carry two types of fruits. They want to maximize the total number of fruits picked in a continuous segment.

**Example Setup:** 
Selecting a playlist of songs from a stream where you can only listen to 2 distinct genres consecutively.

**What is Fruit Into Baskets?**
You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array `fruits` where `fruits[i]` is the type of fruit the `i-th` tree produces.
You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
- You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
- Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
- Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array `fruits`, return the maximum number of fruits you can pick.

**Why is it important?**
- Sliding Window (Variable Size)
- Longest Substring with At Most K Distinct Characters (K=2)
- Hash Map

**Your Task:** 
Return max fruits.

**Difficulty:** Medium
**Tags:** Sliding Window, Medium, Longest Substring With At Most K Distinct Characters, Hash Map, O(N), Interview

---

## Examples

### Example 1:
**Input:** `fruits = [1,2,1]`
**Output:** `3`
**Explanation:** We can pick from all 3 trees.

### Example 2:
**Input:** `fruits = [0,1,2,2]`
**Output:** `3`
**Explanation:** We can pick from trees [1,2,2]. If we started at the first tree, we would only pick [0,1].

### Example 3:
**Input:** `fruits = [1,2,3,2,2]`
**Output:** `4`
**Explanation:** We can pick from trees [2,3,2,2]. If we started at the first tree, we would only pick [1,2].

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10^5 |
| Fruit Types | 0 ≤ type < n |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 FarmVille (Joke) |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Zynga |
| 🔵 Facebook | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. Is this exactly "Longest Substring with At Most 2 Distinct Characters"? (Yes).
2. How to generalize to K baskets?
3. Why Hash Map? (To track count of each fruit type in current window).
4. When to shrink? (When map size > 2).
