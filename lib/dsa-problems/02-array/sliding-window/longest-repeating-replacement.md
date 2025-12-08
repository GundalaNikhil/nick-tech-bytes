# Longest Repeating Character Replacement

## Problem Description

**Real-World Scenario:**
A DNA sequence editor fixes mutations. Given a gene sequence, find the longest segment where at most K mutations can make all bases identical.

**Example Setup:** 
A text formatter fixes typos. Find the longest substring that becomes uniform after at most K character changes.

**What is Longest Repeating Character Replacement?**
Given string s and integer k, find the longest substring where you can replace at most k characters to make all characters the same.

**Why is it important?**
- Sliding window + frequency
- Window validity condition
- DNA sequence analysis
- Text processing

**Your Task:** 
Return the length of the longest such substring.

**Difficulty:** Medium
**Tags:** Array, Sliding Window, Sliding Window + Frequency, Window Validity Condition, Dna Sequence Analysis, Text Processing, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s = "ABAB", k = 2`
**Output:** `4`
**Explanation:** Replace 2 'A's or 2 'B's to get "AAAA" or "BBBB".

### Example 2:
**Input:** `s = "AABABBA", k = 1`
**Output:** `4`
**Explanation:** Replace 'B' at index 3 to get "AAAAABA" (substring of 4 'A's).

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 10⁵ |
| K Value | 0 ≤ k ≤ s.length |
| Data Type | Uppercase English letters |
| Special Conditions | Multiple valid answers possible |
| Time Complexity | O(n) |
| Space Complexity | O(1) - 26 letters |
| Output Format | Maximum length |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Illumina |
| 🔵 Amazon | 🟡 Uber | 🟢 23andMe |
| 🔵 Microsoft | 🟡 Apple | 🟢 DNAnexus |

---

## Follow-up Questions

1. What's the window validity condition?
2. Why track max frequency in window?
3. When to shrink vs expand window?
4. How is this different from longest substring without repeating?
