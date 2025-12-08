# Longest Common Subsequence (LCS)

## Problem Description

**Real-World Scenario:**
Git uses LCS to compare two versions of a file. When you see "diff" output showing what changed between two files, it's finding the longest common parts (LCS) and highlighting the differences.

**Example Setup:** 
Netflix recommends movies by comparing your watch history with similar users. If your history and another user's history have a long common subsequence of movies (in similar order), you might like what they watched next!

**What is the Longest Common Subsequence?**
Given two strings, find the length of their longest subsequence that is common to both. A subsequence maintains relative order but doesn't need to be contiguous.

**Why is it important?**
- Version control (diff/patch)
- DNA sequence alignment
- Spell checking
- Plagiarism detection
- File comparison

**Your Task:** 
Find the length of the longest common subsequence of two strings.

---

## Examples

### Example 1:
**Input:** `text1 = "abcde", text2 = "ace"`
**Output:** `3`
**LCS:** "ace"
**Explanation:** Common subsequence "ace" appears in both.

### Example 2:
**Input:** `text1 = "abc", text2 = "abc"`
**Output:** `3`
**LCS:** "abc"
**Explanation:** Identical strings - LCS is the entire string.

### Example 3:
**Input:** `text1 = "abc", text2 = "def"`
**Output:** `0`
**Explanation:** No common characters.

### Example 4:
**Input:** `text1 = "AGGTAB", text2 = "GXTXAYB"`
**Output:** `4`
**LCS:** "GTAB"
**Explanation:** Common DNA-like sequence.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ len ≤ 1000 |
| Data Type | Lowercase English letters (or uppercase for DNA) |
| Special Conditions | Subsequence, not substring |
| Time Complexity | O(m × n) |
| Space Complexity | O(min(m, n)) optimized |
| Output Format | Length of LCS |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 GitHub |
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Atlassian |
| 🔵 Microsoft | 🟡 VMware | 🟢 Illumina |
| 🔵 Apple | 🟡 Uber | 🟢 23andMe |

---

## Follow-up Questions

1. How would you reconstruct the actual LCS string?
2. What's the difference between LCS and LCSubstring?
3. How would you find the shortest common supersequence using LCS?
4. Can you optimize space to O(min(m,n))?
