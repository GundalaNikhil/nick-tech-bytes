# Ones and Zeroes

## Problem Description

**Real-World Scenario:**
A resource allocator schedules tasks that consume specific amounts of CPU (0s) and Memory (1s) without exceeding total capacity.

**Example Setup:** 
A binary packer fits strings into a storage block with limited capacity for '0' bits and '1' bits.

**What is Ones and Zeroes?**
Given an array of binary strings `strs` and two integers `m` and `n`. Return the size of the largest subset of `strs` such that there are at most `m` 0's and `n` 1's in the subset.

**Why is it important?**
- 2D Knapsack (two constraints)
- Subset selection
- DP optimization
- Resource allocation

**Your Task:** 
Return the size of the largest subset.

**Difficulty:** Medium
**Tags:** Dynamic Programming, Knapsack, 2D Knapsack, Subset Selection, Dp Optimization, Resource Allocation, O(L * m * n), Interview

---

## Examples

### Example 1:
**Input:** `strs = ["10","0001","111001","1","0"], m = 5, n = 3`
**Output:** `4`
**Explanation:** Subset {"10", "0001", "1", "0"} has 5 zeros and 3 ones.

### Example 2:
**Input:** `strs = ["10","0","1"], m = 1, n = 1`
**Output:** `2`
**Explanation:** Subset {"0", "1"} has 1 zero and 1 one.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ strs.length ≤ 600 |
| String Length | 1 ≤ strs[i].length ≤ 100 |
| M, N | 1 ≤ m, n ≤ 100 |
| Data Type | Binary strings |
| Time Complexity | O(L * m * n) where L is array length |
| Space Complexity | O(m * n) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Nutanix |
| 🔵 Amazon | 🟡 Apple | 🟢 Pure Storage |
| 🔵 Facebook | 🟡 Microsoft | 🟢 NetApp |

---

## Follow-up Questions

1. Why is this a 0/1 Knapsack problem?
2. What are the two costs (zeros and ones)?
3. Why iterate backwards in the 2D DP array?
4. Can you optimize space further?
