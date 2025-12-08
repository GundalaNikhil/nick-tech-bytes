# Longest Duplicate Substring

## Problem Description

**Real-World Scenario:**
A plagiarism detection system finds the longest block of text that appears more than once in a large document.

**Example Setup:** 
A DNA sequence analyzer finds the longest repeated gene sequence in a genome.

**What is Longest Duplicate Substring?**
Given a string `s`, consider all duplicated substrings: (contiguous) substrings of s that occur 2 or more times. The occurrences may overlap. Return any duplicated substring that has the longest possible length.

**Why is it important?**
- Binary Search on Length
- Rolling Hash (Rabin-Karp)
- Suffix Array / Suffix Tree
- Hard string problem

**Your Task:** 
Return the longest duplicate substring.

---

## Examples

### Example 1:
**Input:** `s = "banana"`
**Output:** `"ana"`

### Example 2:
**Input:** `s = "abcd"`
**Output:** `""`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 2 ≤ s.length ≤ 3 × 10⁴ |
| Characters | Lowercase English letters |
| Data Type | String |
| Time Complexity | O(n log n) with Rolling Hash |
| Space Complexity | O(n) |
| Output Format | String |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Turnitin |
| 🔵 Amazon | 🟡 Apple | 🟢 Copyleaks |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Grammarly |

---

## Follow-up Questions

1. Why binary search on the length of the substring?
2. How does Rolling Hash check for duplicates in O(n)?
3. How to handle hash collisions?
4. What is the Suffix Array approach (O(n log n) or O(n))?
