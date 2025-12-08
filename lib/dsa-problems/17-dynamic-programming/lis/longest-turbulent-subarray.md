# Longest Turbulent Subarray

## Problem Description

**Real-World Scenario:**
A financial volatility detector finds the longest period where stock prices strictly alternate between rising and falling (up-down-up-down).

**Example Setup:** 
A sensor fault detector identifies the longest sequence of readings that oscillate around a baseline, indicating instability.

**What is Longest Turbulent Subarray?**
Given an integer array `arr`, return the length of a maximum size turbulent subarray of `arr`. A subarray is turbulent if the comparison sign flips between each adjacent pair of elements (e.g., `arr[k] > arr[k+1] < arr[k+2] > ...`).

**Why is it important?**
- Sliding Window / DP
- State tracking (up/down)
- Sequence analysis
- Optimization

**Your Task:** 
Return max length.

---

## Examples

### Example 1:
**Input:** `arr = [9,4,2,10,7,8,8,1,9]`
**Output:** `5`
**Explanation:** [4,2,10,7,8] ( < > < > ).

### Example 2:
**Input:** `arr = [4,8,12,16]`
**Output:** `2`

### Example 3:
**Input:** `arr = [100]`
**Output:** `1`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 4 × 10⁴ |
| Element Value | 0 ≤ arr[i] ≤ 10⁹ |
| Data Type | Integer array |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Amazon | 🟡 Apple | 🟢 Two Sigma |
| 🔵 Microsoft | 🟡 Adobe | 🟢 HRT |

---

## Follow-up Questions

1. Why compare `arr[k]` with `arr[k-1]` and `arr[k+1]`?
2. How to handle equality (`arr[k] == arr[k+1]`)?
3. What is the DP state `up[i]` and `down[i]`?
4. Can you do it in one pass with O(1) space?
