# Maximum Length of Pair Chain

## Problem Description

**Real-World Scenario:**
A scheduling system chains tasks where the end time of one task must be strictly less than the start time of the next.

**Example Setup:** 
A domino arrangement finds the longest chain of dominoes that can be placed end-to-end based on matching numbers (or strictly increasing in this case).

**What is Maximum Length of Pair Chain?**
You are given an array of `n` pairs `pairs` where `pairs[i] = [left, right]` and `left < right`. A pair `[c, d]` can follow another pair `[a, b]` if `b < c`. You can select pairs in any order. Return the length longest chain which can be formed.

**Why is it important?**
- Greedy Interval Scheduling
- DP (Longest Increasing Subsequence variant)
- Sorting by end time
- Optimization

**Your Task:** 
Return the max chain length.

---

## Examples

### Example 1:
**Input:** `pairs = [[1,2], [2,3], [3,4]]`
**Output:** `2`
**Explanation:** [1,2] -> [3,4]. Length 2. [2,3] cannot follow [1,2] because 2 is not < 2.

### Example 2:
**Input:** `pairs = [[1,2], [7,8], [4,5]]`
**Output:** `3`
**Explanation:** [1,2] -> [4,5] -> [7,8].

---

## Constraints

| Constraint | Value |
|------------|-------|
| Pairs | 1 ≤ n ≤ 1000 |
| Values | -1000 ≤ left < right ≤ 1000 |
| Data Type | Integer pairs |
| Special Conditions | b < c strict inequality |
| Time Complexity | O(n log n) Greedy |
| Space Complexity | O(1) or O(n) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Oracle |
| 🔵 Google | 🟡 Microsoft | 🟢 Salesforce |
| 🔵 Facebook | 🟡 Apple | 🟢 SAP |

---

## Follow-up Questions

1. Why sort by end time (Greedy)?
2. How is this different from LIS (can reorder)?
3. Why does Greedy work (earliest finish time leaves more room)?
4. What is the DP approach O(n²)?
