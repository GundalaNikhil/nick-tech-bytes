# Distinct Subsequences II

## Problem Description

**Real-World Scenario:**
A message decoder counts unique valid messages that can be formed by deleting characters from a corrupted stream.

**Example Setup:** 
A sequence analyzer counts distinct gene subsequences that can be derived from a DNA strand.

**What is Distinct Subsequences II?**
Given a string s, count the number of distinct, non-empty subsequences of s. Since the result may be large, return it modulo 10^9 + 7.

**Why is it important?**
- DP with duplicate handling
- Combinatorics
- Last occurrence tracking
- Hard counting problem

**Your Task:** 
Return count of distinct subsequences.

**Difficulty:** Medium
**Tags:** Dynamic Programming, String Dp, Dp With Duplicate Handling, Combinatorics, Last Occurrence Tracking, Hard Counting, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "abc"`
**Output:** `7`
**Explanation:** "a", "b", "c", "ab", "ac", "bc", "abc".

### Example 2:
**Input:** `s = "aba"`
**Output:** `6`
**Explanation:** "a", "b", "a" (dup), "ab", "aa", "ba", "aba". Distinct: "a", "b", "ab", "aa", "ba", "aba".

### Example 3:
**Input:** `s = "aaa"`
**Output:** `3`
**Explanation:** "a", "aa", "aaa".

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 2000 |
| Characters | Lowercase English letters |
| Data Type | String |
| Special Conditions | Modulo 10^9 + 7 |
| Time Complexity | O(n) |
| Space Complexity | O(26) or O(n) |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Databricks |
| 🔵 Amazon | 🟡 Apple | 🟢 Snowflake |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Oracle |

---

## Follow-up Questions

1. Why subtract the count of the previous occurrence of the character?
2. What is the recurrence `dp[i] = 2 * dp[i-1]` (minus duplicates)?
3. How to handle modulo arithmetic with subtraction?
4. Can you optimize space to O(1) (using array of size 26)?
