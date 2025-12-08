# Climbing Stairs

## Problem Description

**Real-World Scenario:**
You're at the bottom of a staircase and want to reach the top. Each step you can climb either 1 or 2 stairs. How many different ways can you reach the top?

**Example Setup:** 
Little Riya is learning to climb stairs. She can take 1 step at a time (safe) or 2 steps at a time (fun!). She's curious: how many different ways can she climb to her bedroom on the 10th step?

**What is the Climbing Stairs Problem?**
This is the classic introduction to dynamic programming. The number of ways to reach step n equals the sum of ways to reach step n-1 (then take 1 step) and step n-2 (then take 2 steps). It's essentially the Fibonacci sequence!

**Why is it important?**
- Foundation for understanding DP
- Teaches overlapping subproblems
- Fibonacci relationship
- Memoization vs tabulation

**Your Task:** 
Given n steps, return the number of distinct ways to climb to the top.

---

## Examples

### Example 1:
**Input:** `n = 2`
**Output:** `2`
**Explanation:** 
- Way 1: 1 step + 1 step
- Way 2: 2 steps

### Example 2:
**Input:** `n = 3`
**Output:** `3`
**Explanation:** 
- Way 1: 1 + 1 + 1
- Way 2: 1 + 2
- Way 3: 2 + 1

### Example 3:
**Input:** `n = 1`
**Output:** `1`
**Explanation:** Only one way - take 1 step.

### Example 4:
**Input:** `n = 5`
**Output:** `8`
**Explanation:** 1+1+1+1+1, 1+1+1+2, 1+1+2+1, 1+2+1+1, 2+1+1+1, 1+2+2, 2+1+2, 2+2+1

---

## Constraints

| Constraint | Value |
|------------|-------|
| Input Range | 1 ≤ n ≤ 45 |
| Data Type | Integer |
| Special Conditions | Result fits in 32-bit integer |
| Time Complexity | O(n) |
| Space Complexity | O(1) optimized, O(n) basic |
| Output Format | Integer (number of ways) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Adobe | 🟢 Expedia |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Twilio |
| 🔵 Apple | 🟡 Uber | 🟢 Robinhood |

---

## Follow-up Questions

1. What if you can climb 1, 2, or 3 stairs at a time?
2. What if some stairs are broken and can't be stepped on?
3. How would you handle very large n with modulo?
4. Can you solve it with O(1) space?
