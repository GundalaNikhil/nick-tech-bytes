# Combination Sum

## Problem Description

**Real-World Scenario:**
A vending machine accepts coins of certain denominations. Find all unique ways to make exact change for a given amount. Unlike coin change (minimum coins), we want ALL combinations.

**Example Setup:** 
A recipe app lets users select ingredient portions. Given available portion sizes and a target weight, find all combinations that exactly match the target.

**What is Combination Sum?**
Given an array of distinct candidates and a target, find all unique combinations where the chosen numbers sum to target. The same number can be used unlimited times.

**Why is it important?**
- Backtracking with reuse
- Combination enumeration
- All-solutions pattern
- Foundation for constrained variants

**Your Task:** 
Return all unique combinations that sum to target.

---

## Examples

### Example 1:
**Input:** `candidates = [2, 3, 6, 7], target = 7`
**Output:** `[[2, 2, 3], [7]]`
**Explanation:** Two ways to make 7: 2+2+3 or 7.

### Example 2:
**Input:** `candidates = [2, 3, 5], target = 8`
**Output:** `[[2, 2, 2, 2], [2, 3, 3], [3, 5]]`
**Explanation:** Three ways to make 8.

### Example 3:
**Input:** `candidates = [2], target = 1`
**Output:** `[]`
**Explanation:** Can't make 1 with 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Candidates | 1 ≤ candidates.length ≤ 30 |
| Candidate Value | 2 ≤ candidates[i] ≤ 40 |
| Target | 1 ≤ target ≤ 40 |
| Special Conditions | All distinct, same number reusable |
| Time Complexity | O(n^(T/M)) where T=target, M=min candidate |
| Space Complexity | O(T/M) recursion depth |
| Output Format | List of all combinations |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Snapchat |
| 🔵 Facebook | 🟡 Airbnb | 🟢 Lyft |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Splunk |

---

## Follow-up Questions

1. What if each number can only be used once (Combination Sum II)?
2. What if you need exactly K numbers (Combination Sum III)?
3. How do you avoid duplicate combinations?
4. What's the relationship to the coin change problem?
