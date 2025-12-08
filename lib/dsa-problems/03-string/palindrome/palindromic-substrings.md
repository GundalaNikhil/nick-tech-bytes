# Palindromic Substrings

## Problem Description

**Real-World Scenario:**
A bioinformatics tool searches DNA sequences for palindromic patterns which often indicate regulatory regions.

**Example Setup:** 
A word game scores based on the number of palindromic substrings a player can form from their letters.

**What is Palindromic Substrings?**
Count how many palindromic substrings exist in a string. Substrings with different start/end are counted separately even if they're equal.

**Why is it important?**
- Expand around center technique
- DP approach
- DNA analysis
- String pattern counting

**Your Task:** 
Return the count of palindromic substrings.

---

## Examples

### Example 1:
**Input:** `s = "abc"`
**Output:** `3`
**Explanation:** "a", "b", "c" are palindromes.

### Example 2:
**Input:** `s = "aaa"`
**Output:** `6`
**Explanation:** "a" (×3), "aa" (×2), "aaa" (×1) = 6.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 1000 |
| Data Type | Lowercase letters |
| Special Conditions | Count different positions separately |
| Time Complexity | O(n²) |
| Space Complexity | O(1) with expand around center |
| Output Format | Integer count |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Illumina |
| 🔵 Amazon | 🟡 LinkedIn | 🟢 23andMe |
| 🔵 Google | 🟡 Apple | 🟢 Genentech |

---

## Follow-up Questions

1. How does expand around center work?
2. Why check both odd and even length centers?
3. What's the O(n) Manacher's algorithm?
4. What about returning the actual substrings?
