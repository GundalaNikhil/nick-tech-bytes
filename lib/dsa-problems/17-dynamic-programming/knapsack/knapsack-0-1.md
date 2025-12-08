# 0/1 Knapsack Problem

## Problem Description

**Real-World Scenario:**
You're going on a trekking trip with a backpack that can hold only 15 kg. You have several items, each with a weight and value. You want to maximize the total value without exceeding the weight limit. Each item can only be taken once (no duplicates).

**Example Setup:** 
Aditi is going camping and has a 20 kg capacity bag. She has:
- Tent (5 kg, value 60)
- Sleeping bag (3 kg, value 50)
- Food supplies (8 kg, value 100)
- Camera (2 kg, value 40)

She can't take everything. What combination gives maximum value?

**What is the 0/1 Knapsack Problem?**
Given n items with weights and values, and a capacity W, select items to maximize value without exceeding capacity. Each item is either taken (1) or not (0) - hence "0/1".

**Why is it important?**
- Classic optimization problem
- Foundation for subset sum problems
- Resource allocation decisions
- Budget optimization

**Your Task:** 
Find the maximum value that can be put in a knapsack of given capacity.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Knapsack, Classic Optimization, Foundation For Subset Sum Problems, Resource Allocation Decisions, Budget Optimization, O(n × W), Interview

---

## Examples

### Example 1:
**Input:** 
```
values = [60, 100, 120]
weights = [10, 20, 30]
capacity = 50
```
**Output:** `220`
**Explanation:** Take items with weights 20 and 30 → values 100 + 120 = 220

### Example 2:
**Input:** 
```
values = [10, 40, 30, 50]
weights = [5, 4, 6, 3]
capacity = 10
```
**Output:** `90`
**Explanation:** Take items with weights 4 and 3 → values 40 + 50 = 90

### Example 3:
**Input:** 
```
values = [1, 2, 3]
weights = [4, 5, 1]
capacity = 4
```
**Output:** `3`
**Explanation:** Only item 3 (weight 1, value 3) fits best.

### Example 4:
**Input:** 
```
values = [5, 4, 3, 2]
weights = [4, 3, 2, 1]
capacity = 5
```
**Output:** `7`
**Explanation:** Take weights 3 + 2 = 5 → values 4 + 3 = 7

---

## Constraints

| Constraint | Value |
|------------|-------|
| Items | 1 ≤ n ≤ 1000 |
| Capacity | 1 ≤ W ≤ 1000 |
| Weight/Value | 1 ≤ weight[i], value[i] ≤ 1000 |
| Special Conditions | Each item used at most once |
| Time Complexity | O(n × W) |
| Space Complexity | O(W) optimized |
| Output Format | Maximum possible value |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Flipkart |
| 🔵 Amazon | 🟡 Morgan Stanley | 🟢 Intuit |
| 🔵 Microsoft | 🟡 Uber | 🟢 Arcesium |

---

## Follow-up Questions

1. How would you reconstruct which items were selected?
2. What if items have fractional parts (Fractional Knapsack)?
3. What if you can take unlimited copies (Unbounded Knapsack)?
4. How does this relate to Subset Sum problem?
