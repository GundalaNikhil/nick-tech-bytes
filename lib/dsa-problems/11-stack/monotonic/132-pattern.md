# 132 Pattern

## Problem Description

**Real-World Scenario:**
A stock trading algorithm detects a specific "dip and recovery" pattern (low, high, medium) that signals a potential market correction.

**Example Setup:** 
A seismic activity monitor looks for a specific sequence of tremors: a small one, followed by a large one, followed by a medium one.

**What is 132 Pattern?**
Given an array of `n` integers `nums`, a 132 pattern is a subsequence of three integers `nums[i], nums[j]` and `nums[k]` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`. Return true if there is a 132 pattern in `nums`, otherwise return false.

**Why is it important?**
- Monotonic Stack
- Finding patterns in sequence
- Optimization from O(n³) to O(n)
- Hard interview problem

**Your Task:** 
Return true if pattern exists.

**Difficulty:** Medium
**Tags:** Stack, Monotonic, Monotonic Stack, Finding Patterns In Sequence, Optimization From O, Hard Interview, O(n), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,2,3,4]`
**Output:** `false`
**Explanation:** Strictly increasing.

### Example 2:
**Input:** `nums = [3,1,4,2]`
**Output:** `true`
**Explanation:** [1, 4, 2] is a 132 pattern.

### Example 3:
**Input:** `nums = [-1,3,2,0]`
**Output:** `true`
**Explanation:** [-1, 3, 2], [-1, 3, 0], [-1, 2, 0].

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 2 × 10⁵ |
| Element Value | -10⁹ ≤ nums[i] ≤ 10⁹ |
| Data Type | Integer array |
| Time Complexity | O(n) |
| Space Complexity | O(n) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zoom |
| 🔵 Google | 🟡 Apple | 🟢 Slack |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Atlassian |

---

## Follow-up Questions

1. Why iterate backwards?
2. What does the stack store (potential '3's)?
3. How do we track the '2' (second largest)?
4. Why do we need to keep track of the minimum prefix for '1'?
