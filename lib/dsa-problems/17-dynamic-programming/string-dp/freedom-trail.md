# Freedom Trail

## Problem Description

**Real-World Scenario:**
A safe cracker finds the minimum number of dial rotations and button presses to enter a password on a circular combination lock (ring).

**Example Setup:** 
A text entry system on a smartwatch wheel calculates the fastest way to type a message by rotating the bezel.

**What is Freedom Trail?**
In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring", and use the dial to spell a specific keyword in order to open the door. Given a string `ring`, which represents the code engraved on the outer ring and another string `key`, which represents the keyword needs to be spelled. You need to find the minimum number of steps in order to spell all the characters in the keyword. Initially, the first character of the ring is aligned at 12:00 direction. You need to spell all the characters in the keyword one by one by rotating the ring clockwise or anticlockwise to make each character of the string key aligned at 12:00 direction and then by pressing the center button.

**Why is it important?**
- DP on Strings
- Circular Distance
- State Space Search
- Optimization

**Your Task:** 
Return minimum steps.

---

## Examples

### Example 1:
**Input:** `ring = "godding", key = "gd"`
**Output:** `4`
**Explanation:** 
'g' is at 0. Button press (1).
Rotate to 'd' (dist 2). Button press (1).
Total 4.

### Example 2:
**Input:** `ring = "godding", key = "godding"`
**Output:** `13`

---

## Constraints

| Constraint | Value |
|------------|-------|
| Ring Length | 1 ≤ len ≤ 100 |
| Key Length | 1 ≤ len ≤ 100 |
| Data Type | String |
| Time Complexity | O(K * R) |
| Space Complexity | O(K * R) |
| Output Format | Integer steps |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Bethesda |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Ubisoft |
| 🔵 Facebook | 🟡 Apple | 🟢 EA |

---

## Follow-up Questions

1. Why precompute indices of each character in the ring?
2. What is the DP state `dp[key_idx][ring_idx]`?
3. How to calculate circular distance `min(abs(i-j), n - abs(i-j))`?
4. Can you optimize space to O(R)?
