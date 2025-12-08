# Maximum Swap

## Problem Description

**Real-World Scenario:**
A bank account optimizer allows a single digit swap in a balance amount to maximize the displayed value (e.g., correcting a typo).

**Example Setup:** 
A lottery ticket checker allows swapping two digits to form the highest possible winning number.

**What is Maximum Swap?**
You are given an integer `num`. You can swap two digits at most once to get the maximum valued number. Return the maximum valued number you can get.

**Why is it important?**
- Greedy Strategy
- Math / String manipulation
- Last occurrence tracking
- Optimization

**Your Task:** 
Return the max number.

**Difficulty:** Medium
**Tags:** Greedy, Math, Greedy Strategy, Math / String Manipulation, Last Occurrence Tracking, Optimization, O(N), Interview

---

## Examples

### Example 1:
**Input:** `num = 2736`
**Output:** `7236`
**Explanation:** Swap 2 and 7.

### Example 2:
**Input:** `num = 9973`
**Output:** `9973`
**Explanation:** No swap needed.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Number | 0 ≤ num ≤ 10⁸ |
| Data Type | Integer |
| Time Complexity | O(N) (N is digits, so O(1)) |
| Space Complexity | O(N) |
| Output Format | Integer |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Uber |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Lyft |
| 🔵 Google | 🟡 Apple | 🟢 Snap |

---

## Follow-up Questions

1. Why track the last occurrence of each digit (0-9)?
2. Why iterate from left to right and look for larger digits (9 down to current+1)?
3. Why swap the *last* occurrence of the larger digit?
4. Can you do it in one pass?
