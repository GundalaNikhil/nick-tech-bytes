# Count Unique Characters of All Substrings of a Given String

## Problem Description

**Real-World Scenario:**
A cryptography analyzer calculates the "uniqueness score" of a string based on unique character occurrences in all possible substrings.

**Example Setup:** 
A text complexity metric sums the number of unique characters in every possible word fragment.

**What is Count Unique Characters?**
Let the function `countUniqueChars(s)` be the number of unique characters in s. For example, calling `countUniqueChars(s)` if `s = "LEETCODE"` then "L", "T", "C", "O", "D" are the unique characters since they appear only once in s, therefore `countUniqueChars(s) = 5`. Given a string s, return the sum of `countUniqueChars(t)` where t is a substring of s.

**Why is it important?**
- Contribution technique (math/combinatorics)
- Array of indices
- O(N) solution for O(N^2) problem
- Hard string problem

**Your Task:** 
Return the sum of unique characters for all substrings.

---

## Examples

### Example 1:
**Input:** `s = "ABC"`
**Output:** `10`
**Explanation:** Substrings: "A", "B", "C", "AB", "BC", "ABC". Unique chars: 1+1+1+2+2+3 = 10.

### Example 2:
**Input:** `s = "ABA"`
**Output:** `8`
**Explanation:** "A", "B", "A", "AB", "BA", "ABA". Unique: 1+1+1+2+2+1 = 8.

### Example 3:
**Input:** `s = "LEETCODE"`
**Output:** `92`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| Characters | Uppercase English letters |
| Data Type | String |
| Time Complexity | O(N) |
| Space Complexity | O(N) or O(1) |
| Output Format | Integer sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Oracle |
| 🔵 Microsoft | 🟡 Apple | 🟢 Adobe |
| 🔵 Google | 🟡 Uber | 🟢 Salesforce |

---

## Follow-up Questions

1. Why calculate contribution of each character instead of generating substrings?
2. How do `(i - last[c]) * (next[c] - i)` calculate contribution?
3. How to handle duplicate characters?
4. What if we wanted sum of distinct characters (not unique)?
