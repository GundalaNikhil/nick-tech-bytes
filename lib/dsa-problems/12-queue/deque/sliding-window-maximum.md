# Sliding Window Maximum

## Problem Description

**Real-World Scenario:**
A stock trading platform shows the maximum price in the last K minutes as a rolling indicator. As time moves, the window slides and the max must update efficiently.

**Example Setup:** 
A temperature monitoring system shows the peak temperature in each sliding 24-hour window. With thousands of readings, finding max in each window must be fast.

**What is Sliding Window Maximum?**
Given an array and window size K, return the maximum value in each sliding window as it moves from left to right.

**Why is it important?**
- Monotonic deque technique
- Real-time analytics
- Signal processing
- Time series analysis

**Your Task:** 
Return the max in each sliding window of size K.

---

## Examples

### Example 1:
**Input:** `nums = [1,3,-1,-3,5,3,6,7], k = 3`
**Output:** `[3, 3, 5, 5, 6, 7]`
**Explanation:** 
```
Window [1,3,-1] → max = 3
Window [3,-1,-3] → max = 3
Window [-1,-3,5] → max = 5
Window [-3,5,3] → max = 5
Window [5,3,6] → max = 6
Window [3,6,7] → max = 7
```

### Example 2:
**Input:** `nums = [1], k = 1`
**Output:** `[1]`
**Explanation:** Single element window.

### Example 3:
**Input:** `nums = [1, -1], k = 1`
**Output:** `[1, -1]`
**Explanation:** Window size 1 returns each element.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10⁵ |
| K Value | 1 ≤ k ≤ n |
| Element Range | -10⁴ ≤ nums[i] ≤ 10⁴ |
| Special Conditions | Window slides left to right |
| Time Complexity | O(n) with deque |
| Space Complexity | O(k) for deque |
| Output Format | Array of max values |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Google | 🟡 Uber | 🟢 Two Sigma |
| 🔵 Facebook | 🟡 Salesforce | 🟢 DE Shaw |

---

## Follow-up Questions

1. Why use a monotonic decreasing deque?
2. What's the O(n) approach?
3. Can you use a heap? What's the complexity?
4. How would you find sliding window minimum?
