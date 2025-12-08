# Longest Substring with At Most K Distinct Characters

## Problem Description

**Real-World Scenario:**
A data compressor wants to find the longest segment of data that uses a limited palette of symbols (e.g., for run-length encoding or dictionary compression).

**Example Setup:** 
Finding a period in history dominated by at most K ruling parties.

**What is Longest Substring with At Most K Distinct Characters?**
Given a string `s` and an integer `k`, return the length of the longest substring of `s` that contains at most `k` distinct characters.

**Why is it important?**
- Sliding Window (Variable Size)
- Hash Map
- Generalization of "Fruit Into Baskets"

**Your Task:** 
Return max length.

---

## Examples

### Example 1:
**Input:** `s = "eceba", k = 2`
**Output:** `3`
**Explanation:** The substring is "ece" with length 3.

### Example 2:
**Input:** `s = "aa", k = 1`
**Output:** `2`
**Explanation:** The substring is "aa" with length 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ len ≤ 5 * 10^4 |
| k | 0 ≤ k ≤ 50 |
| Time Complexity | O(N) |
| Space Complexity | O(K) |
| Output Format | Integer length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Snapchat |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Lyft |

---

## Follow-up Questions

1. What if k=0?
2. Why use a Map? (To track counts and know when a character is completely removed from window).
3. Can we use an array? (Yes, if char set is small, e.g., ASCII 128).
