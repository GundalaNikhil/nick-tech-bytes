# Maximum Points You Can Obtain from Cards

## Problem Description

**Real-World Scenario:**
A resource gathering game allows picking items from either end of a queue to maximize total value, but you can only pick k items total.

**Example Setup:** 
A buffer management system clears k packets from either the head or tail of a circular buffer to free up maximum space? No, to save highest priority packets.

**What is Max Points from Cards?**
There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array `cardPoints`. In one step, you can take one card from the beginning or from the end of the row. You have to take exactly `k` cards. Your score is the sum of the points of the cards you have taken. Return the maximum score you can obtain.

**Why is it important?**
- Sliding Window (Fixed Size)
- Prefix/Suffix Sums
- Circular array concept
- Optimization

**Your Task:** 
Return max score.

**Difficulty:** Medium
**Tags:** Array, Sliding Window, Prefix/Suffix Sums, Circular Array Concept, Optimization, O(k), Interview

---

## Examples

### Example 1:
**Input:** `cardPoints = [1,2,3,4,5,6,1], k = 3`
**Output:** `12`
**Explanation:** Take rightmost 3: [5,6,1]. Sum 12.

### Example 2:
**Input:** `cardPoints = [2,2,2], k = 2`
**Output:** `4`

### Example 3:
**Input:** `cardPoints = [9,7,7,9,7,7,9], k = 7`
**Output:** `55`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| K Value | 1 ≤ k ≤ n |
| Points | 1 ≤ pts ≤ 10⁴ |
| Data Type | Integer array |
| Time Complexity | O(k) or O(n) |
| Space Complexity | O(1) |
| Output Format | Integer score |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Zynga |
| 🔵 Amazon | 🟡 Microsoft | 🟢 EA |
| 🔵 Facebook | 🟡 Apple | 🟢 Riot Games |

---

## Follow-up Questions

1. Why is this equivalent to finding minimum subarray sum of length `n-k`?
2. How to use a sliding window of size `n-k`?
3. Can you do it by checking all split points (i from left, k-i from right)?
4. What if k > n (not possible per constraints)?
