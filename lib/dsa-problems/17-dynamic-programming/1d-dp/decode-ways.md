# Decode Ways

## Problem Description

**Real-World Scenario:**
Old telephone keypad messages encode letters as numbers: A=1, B=2, ..., Z=26. Given a numeric message like "12", it could decode to "AB" (1,2) or "L" (12). How many ways can you decode the entire message?

**Example Setup:** 
A spy receives coded messages using A=1 to Z=26 encoding. The message "226" could be "BBF" (2,2,6), "BZ" (2,26), or "VF" (22,6). Count all possible decodings.

**What is Decode Ways?**
Given a string of digits, count the number of ways to decode it into letters (A=1, B=2, ..., Z=26).

**Why is it important?**
- 1D DP with branching
- Edge case handling (zeros)
- Real encoding/decoding problems
- Similar to climbing stairs pattern

**Your Task:** 
Return the number of ways to decode the message.

**Difficulty:** Medium
**Tags:** Dynamic Programming, 1D Dp, 1D Dp With Branching, Edge Case Handling, Real Encoding/Decoding Problems, Similar To Climbing Stairs Pattern, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "12"`
**Output:** `2`
**Explanation:** "AB" (1,2) or "L" (12).

### Example 2:
**Input:** `s = "226"`
**Output:** `3`
**Explanation:** "BBF" (2,2,6), "BZ" (2,26), or "VF" (22,6).

### Example 3:
**Input:** `s = "06"`
**Output:** `0`
**Explanation:** "06" is invalid - leading zero not allowed.

### Example 4:
**Input:** `s = "10"`
**Output:** `1`
**Explanation:** Only "J" (10) - 0 alone is invalid.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ n ≤ 100 |
| Data Type | Digit characters '0' to '9' |
| Special Conditions | May contain zeros |
| Time Complexity | O(n) |
| Space Complexity | O(1) optimized |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Snap |
| 🔵 Amazon | 🟡 Uber | 🟢 Lyft |
| 🔵 Google | 🟡 Goldman Sachs | 🟢 Twilio |

---

## Follow-up Questions

1. How do you handle leading zeros ("01")?
2. What's the DP recurrence?
3. Can you optimize to O(1) space?
4. What if you need to return all decodings (Decode Ways II)?
