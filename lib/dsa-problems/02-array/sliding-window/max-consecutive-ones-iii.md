# Max Consecutive Ones III

## Problem Description

**Real-World Scenario:**
A network signal stabilizer can flip at most K corrupted bits (0s) to 1s to achieve the longest continuous stream of valid signal (1s).

**Example Setup:** 
A work schedule optimizer allows taking K leave days to bridge gaps between working days to maximize the consecutive work streak.

**What is Max Consecutive Ones III?**
Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`'s in the array if you can flip at most `k` `0`'s.

**Why is it important?**
- Sliding Window
- Zero counting
- Longest subarray problem
- Optimization

**Your Task:** 
Return max length.

---

## Examples

### Example 1:
**Input:** `nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2`
**Output:** `6`
**Explanation:** Flip 0s at index 5 and 10. [1,1,1,0,0,**1**,1,1,1,1,**1**]. Longest 1s is 6.

### Example 2:
**Input:** `nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3`
**Output:** `10`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Element Value | 0 or 1 |
| K Value | 0 ≤ k ≤ n |
| Data Type | Binary array |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Google | 🟡 Microsoft | 🟢 Zillow |
| 🔵 Amazon | 🟡 Apple | 🟢 Uber |

---

## Follow-up Questions

1. Why shrink window when `zeros > k`?
2. How is this related to "Longest Subarray with at most K zeros"?
3. What if the stream is infinite?
4. Can you do it with a Queue of zero indices?
