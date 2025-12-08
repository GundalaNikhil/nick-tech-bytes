# Combination Sum III

## Problem Description

**Real-World Scenario:**
A lottery system finds all combinations of k distinct numbers (1-9) that sum to a target. Used for generating valid ticket patterns.

**Example Setup:** 
A puzzle game challenges: "Find all ways to select k numbers from 1-9 that add up to n."

**What is Combination Sum III?**
Find all combinations of k numbers from 1-9 that sum to target n. Each number used at most once, and all combinations must be unique.

**Why is it important?**
- Backtracking with constraints
- Fixed-size combinations
- Number selection problems
- Clean problem structure

**Your Task:** 
Return all valid combinations.

**Difficulty:** Medium
**Tags:** Backtracking, Combination, Backtracking With Constraints, Fixed-Size Combinations, Number Selection Problems, Clean Problem Structure, O(9!/(k!(9-k), Interview

---

## Examples

### Example 1:
**Input:** `k = 3, n = 7`
**Output:** `[[1,2,4]]`
**Explanation:** 1 + 2 + 4 = 7 is the only combination.

### Example 2:
**Input:** `k = 3, n = 9`
**Output:** `[[1,2,6], [1,3,5], [2,3,4]]`
**Explanation:** Three ways to get 9 with 3 numbers.

### Example 3:
**Input:** `k = 4, n = 1`
**Output:** `[]`
**Explanation:** Minimum sum with 4 numbers is 1+2+3+4=10 > 1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| K Value | 2 ≤ k ≤ 9 |
| N Value | 1 ≤ n ≤ 60 |
| Numbers | 1 to 9, used at most once |
| Data Type | Integers |
| Time Complexity | O(9!/(k!(9-k)!)) |
| Space Complexity | O(k) |
| Output Format | List of lists |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 FanDuel |
| 🔵 Microsoft | 🟡 Adobe | 🟢 DraftKings |
| 🔵 Google | 🟡 Apple | 🟢 Lottery.com |

---

## Follow-up Questions

1. How do you prune early (sum exceeds target)?
2. What's the difference from Combination Sum I and II?
3. Why start from index+1 (no reuse)?
4. What about larger digit range?
