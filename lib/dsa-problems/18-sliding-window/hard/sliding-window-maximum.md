# Sliding Window Maximum

## Problem Description

**Real-World Scenario:**
A stock market analyzer calculates the maximum stock price for every 30-day period over the last 10 years.

**Example Setup:** 
A network traffic monitor finding the peak bandwidth usage in every 5-minute window.

**What is Sliding Window Maximum?**
You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.

**Why is it important?**
- Monotonic Queue (Deque)
- Sliding Window
- Optimization (O(N) vs O(N*K))

**Your Task:** 
Return array of max values.

**Difficulty:** Hard
**Tags:** Sliding Window, Hard, Monotonic Queue, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,3,-1,-3,5,3,6,7], k = 3`
**Output:** `[3,3,5,5,6,7]`
**Explanation:** 
[1 3 -1] -3 5 3 6 7       Max: 3
1 [3 -1 -3] 5 3 6 7       Max: 3
1 3 [-1 -3 5] 3 6 7       Max: 5
1 3 -1 [-3 5 3] 6 7       Max: 5
1 3 -1 -3 [5 3 6] 7       Max: 6
1 3 -1 -3 5 [3 6 7]       Max: 7

### Example 2:
**Input:** `nums = [1], k = 1`
**Output:** `[1]`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10^5 |
| Window Size (k) | 1 ≤ k ≤ n |
| Time Complexity | O(N) |
| Space Complexity | O(K) |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Citrix |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Akuna Capital |
| 🔵 Facebook | 🟡 Apple | 🟢 DE Shaw |

---

## Follow-up Questions

1. Why use a Deque? (To store indices of potential max candidates in decreasing order).
2. Why remove elements from the back? (If current element is larger, previous smaller elements can never be max).
3. Why remove elements from the front? (If index is out of window range).
4. Can you do it with a Max Heap? (O(N log K)).
