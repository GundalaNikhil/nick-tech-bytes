# Distinct Subsequences

## Problem Description

**Real-World Scenario:**
A text analysis tool counts how many ways a shorter string can be formed by deleting characters from a longer string (keeping order).

**Example Setup:** 
A word puzzle game: how many ways can you form "ACE" from "ABCDE" by removing characters? (Answer: 1 way)

**What is Distinct Subsequences?**
Given strings s and t, count the number of distinct subsequences of s that equal t. A subsequence maintains relative order but not contiguity.

**Why is it important?**
- DP count problem
- Subsequence variants
- Text analysis
- Pattern counting

**Your Task:** 
Return the number of distinct subsequences.

---

## Examples

### Example 1:
**Input:** `s = "rabbbit", t = "rabbit"`
**Output:** `3`
**Explanation:** Pick each of the 3 'b's to form "rabbit".

### Example 2:
**Input:** `s = "babgbag", t = "bag"`
**Output:** `5`
**Explanation:** 5 different ways to select "bag".

### Example 3:
**Input:** `s = "abc", t = "def"`
**Output:** `0`
**Explanation:** Can't form "def" from "abc".

---

## Constraints

| Constraint | Value |
|------------|-------|
| S Length | 1 ≤ s.length ≤ 1000 |
| T Length | 1 ≤ t.length ≤ 1000 |
| Data Type | English letters |
| Special Conditions | Answer fits in 32-bit integer |
| Time Complexity | O(s × t) |
| Space Complexity | O(t) optimized |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Palantir |
| 🔵 Amazon | 🟡 Adobe | 🟢 Snowflake |
| 🔵 Microsoft | 🟡 Uber | 🟢 Databricks |

---

## Follow-up Questions

1. What's the DP recurrence?
2. How is this different from LCS?
3. Can you optimize to O(t) space?
4. What if you need to return the actual subsequences?
