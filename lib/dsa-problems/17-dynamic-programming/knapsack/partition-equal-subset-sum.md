# Partition Equal Subset Sum

## Problem Description

**Real-World Scenario:**
A divorce settlement needs to divide assets (with different values) into two equal halves. Determine if a fair 50-50 split is even possible.

**Example Setup:** 
Two teams are being formed from available players. Each player has a skill rating. Can the players be divided so both teams have equal total skill?

**What is Partition Equal Subset Sum?**
Given an array, determine if it can be partitioned into two subsets with equal sum. This is equivalent to finding a subset with sum = totalSum/2.

**Why is it important?**
- Subset sum variant
- 0/1 knapsack application
- Bitset optimization
- Fair division problems

**Your Task:** 
Return true if the array can be partitioned into two equal-sum subsets.

---

## Examples

### Example 1:
**Input:** `nums = [1, 5, 11, 5]`
**Output:** `true`
**Explanation:** [1, 5, 5] and [11] both sum to 11.

### Example 2:
**Input:** `nums = [1, 2, 3, 5]`
**Output:** `false`
**Explanation:** Total = 11 (odd), can't split evenly.

### Example 3:
**Input:** `nums = [2, 2, 1, 1]`
**Output:** `true`
**Explanation:** [2, 1] and [2, 1] both sum to 3.

### Example 4:
**Input:** `nums = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 100]`
**Output:** `false`
**Explanation:** 100 dominates, can't balance.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 200 |
| Element Range | 1 ≤ nums[i] ≤ 100 |
| Data Type | Positive integers |
| Special Conditions | Total must be even for true |
| Time Complexity | O(n × sum/2) |
| Space Complexity | O(sum/2) with optimization |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Facebook | 🟡 Uber | 🟢 Two Sigma |
| 🔵 Google | 🟡 Apple | 🟢 DE Shaw |

---

## Follow-up Questions

1. Why check if total is odd first?
2. How is this related to subset sum and knapsack?
3. Can you optimize space to O(sum/2)?
4. What if you need to minimize the difference between two partitions?
