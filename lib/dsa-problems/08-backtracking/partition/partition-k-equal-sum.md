# Partition to K Equal Sum Subsets

## Problem Description

**Real-World Scenario:**
A load balancer distributes tasks with different execution times to k identical processors such that all processors finish at the same time.

**Example Setup:** 
A team lead splits a project with multiple tasks into k sprints of equal effort.

**What is Partition to K Equal Sum Subsets?**
Given an integer array `nums` and an integer `k`, return true if it is possible to divide this array into `k` non-empty subsets whose sums are all equal.

**Why is it important?**
- Backtracking with pruning
- NP-Complete problem (Subset Sum variant)
- Bitmask DP optimization
- State space search

**Your Task:** 
Return true if partition is possible.

---

## Examples

### Example 1:
**Input:** `nums = [4,3,2,3,5,2,1], k = 4`
**Output:** `true`
**Explanation:** 
Subset 1: [5]
Subset 2: [1,4]
Subset 3: [2,3]
Subset 4: [2,3]
Each sum is 5.

### Example 2:
**Input:** `nums = [1,2,3,4], k = 3`
**Output:** `false`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 16 |
| Element Value | 1 ≤ nums[i] ≤ 10⁴ |
| K Value | 1 ≤ k ≤ n |
| Data Type | Integer array |
| Time Complexity | O(k * 2^n) |
| Space Complexity | O(n) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Asana |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Trello |
| 🔵 Facebook | 🟡 Apple | 🟢 Jira |

---

## Follow-up Questions

1. Why sort the array in descending order?
2. What is the target sum for each subset?
3. How does `used` boolean array help in backtracking?
4. Can you solve this with Bitmask DP?
