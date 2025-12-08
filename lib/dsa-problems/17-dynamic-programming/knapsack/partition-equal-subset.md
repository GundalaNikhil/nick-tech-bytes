# Partition Equal Subset Sum

## Problem Description

**Real-World Scenario:**
A divorce settlement divides assets equally. Given asset values, determine if they can be split into two equal-value groups.

**Example Setup:** 
A team manager splits players into two teams of equal total skill ratings for a fair match.

**What is Partition Equal Subset Sum?**
Given a non-empty array of positive integers, determine if it can be partitioned into two subsets with equal sums.

**Why is it important?**
- 0/1 knapsack variant
- Subset sum problem
- Fair division problems
- DP on sums

**Your Task:** 
Return true if equal partition is possible.

---

## Examples

### Example 1:
**Input:** `nums = [1, 5, 11, 5]`
**Output:** `true`
**Explanation:** [1, 5, 5] and [11] both sum to 11.

### Example 2:
**Input:** `nums = [1, 2, 3, 5]`
**Output:** `false`
**Explanation:** Total is 11 (odd), can't partition equally.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 200 |
| Element Value | 1 ≤ nums[i] ≤ 100 |
| Data Type | Positive integers |
| Special Conditions | If sum is odd, return false |
| Time Complexity | O(n × sum/2) |
| Space Complexity | O(sum/2) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Splitwise |
| 🔵 Facebook | 🟡 Apple | 🟢 Venmo |
| 🔵 Google | 🟡 Microsoft | 🟢 Zelle |

---

## Follow-up Questions

1. Why check if sum is even first?
2. What's the relationship to subset sum?
3. Can you optimize with bitset?
4. What about partitioning into K equal subsets?
