# Maximum Length of Repeated Subarray

## Problem Description

**Real-World Scenario:**
A plagiarism detection system finds the longest matching passage between two documents. This is essentially the longest common substring.

**Example Setup:** 
Music recognition apps like Shazam find the longest matching audio segment between a sample and songs in their database.

**What is Maximum Length of Repeated Subarray?**
Given two integer arrays, find the maximum length of a subarray that appears in both arrays. This is the longest common substring (contiguous version of LCS).

**Why is it important?**
- LCS variant (contiguous)
- Plagiarism detection
- Audio/video matching
- 2D DP pattern

**Your Task:** 
Return the maximum length of repeated subarray.

---

## Examples

### Example 1:
**Input:** `nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]`
**Output:** `3`
**Explanation:** [3,2,1] appears in both.

### Example 2:
**Input:** `nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]`
**Output:** `5`
**Explanation:** Entire arrays match.

### Example 3:
**Input:** `nums1 = [1,2,3], nums2 = [4,5,6]`
**Output:** `0`
**Explanation:** No common elements.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n, m ≤ 1000 |
| Element Value | 0 ≤ nums[i] ≤ 100 |
| Data Type | Integer arrays |
| Special Conditions | Contiguous subarray |
| Time Complexity | O(n × m) |
| Space Complexity | O(n × m), O(min(n,m)) optimized |
| Output Format | Maximum length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Uber | 🟢 Shazam |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Turnitin |
| 🔵 Microsoft | 🟡 Apple | 🟢 Copyscape |

---

## Follow-up Questions

1. How is this different from LCS (subsequence)?
2. Why does dp[i][j] = 0 when elements don't match?
3. Can you use binary search + rolling hash?
4. What about finding the actual subarray?
