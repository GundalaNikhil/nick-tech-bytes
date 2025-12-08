# Max Consecutive Ones III

## Problem Description

**Real-World Scenario:**
A network buffer can tolerate up to `k` dropped packets (0s) in a stream of packets (1s) to maintain a continuous connection. Find the longest duration of continuous connection.

**Example Setup:** 
A worker can take up to `k` leave days to bridge gaps between working days to claim a "continuous service" bonus.

**What is Max Consecutive Ones III?**
Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`'s in the array if you can flip at most `k` `0`'s.

**Why is it important?**
- Sliding Window
- Two Pointers
- Zero Counting

**Your Task:** 
Return max length.

---

## Examples

### Example 1:
**Input:** `nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2`
**Output:** `6`
**Explanation:** [1,1,1,0,0,**1**,1,1,1,1,**1**]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

### Example 2:
**Input:** `nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3`
**Output:** `10`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Length | 1 ≤ n ≤ 10^5 |
| k | 0 ≤ k ≤ n |
| Time Complexity | O(N) |
| Space Complexity | O(1) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yandex |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Zillow |
| 🔵 Facebook | 🟡 Apple | 🟢 Booking.com |

---

## Follow-up Questions

1. Relationship to "Longest Repeating Character Replacement"? (Special case where target char is '1').
2. How to handle `k=0`?
3. What if the stream is infinite? (Queue of zero indices).
