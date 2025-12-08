# Longest Arithmetic Subsequence

## Problem Description

**Real-World Scenario:**
A signal analyzer detects the longest sequence of pulses with a constant frequency (constant time difference) in a noisy stream.

**Example Setup:** 
A financial trend detector finds the longest sequence of prices that follow a linear trend (constant growth/decline).

**What is Longest Arithmetic Subsequence?**
Given an array `nums` of integers, return the length of the longest arithmetic subsequence in `nums`.

**Why is it important?**
- DP with HashMap
- 2D DP state (index, difference)
- Sequence analysis
- Hard DP problem

**Your Task:** 
Return the max length.

---

## Examples

### Example 1:
**Input:** `nums = [3,6,9,12]`
**Output:** `4`
**Explanation:** Diff 3. [3,6,9,12].

### Example 2:
**Input:** `nums = [9,4,7,2,10]`
**Output:** `3`
**Explanation:** Diff 3. [4,7,10].

### Example 3:
**Input:** `nums = [20,1,15,3,10,5,8]`
**Output:** `4`
**Explanation:** Diff -5. [20,15,10,5].

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 2 ≤ n ≤ 1000 |
| Element Value | 0 ≤ nums[i] ≤ 500 |
| Data Type | Integer array |
| Time Complexity | O(n²) |
| Space Complexity | O(n²) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Two Sigma |
| 🔵 Facebook | 🟡 Apple | 🟢 HRT |

---

## Follow-up Questions

1. What is the DP state `dp[i][diff]`?
2. Why use an array of Maps (or 2D array with offset)?
3. How to handle negative differences?
4. Can you optimize space if range of values is small?
