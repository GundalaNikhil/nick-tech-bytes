# Permutation in String

## Problem Description

**Real-World Scenario:**
A plagiarism detector checks if any rearrangement of a phrase exists within a document - detecting scrambled copying.

**Example Setup:** 
A biology lab searches for gene markers where the exact sequence might be scrambled but all nucleotides are present.

**What is Permutation in String?**
Given s1 and s2, check if s2 contains any permutation of s1. This means s1's characters exist in some substring of s2 with same frequencies.

**Why is it important?**
- Sliding window + frequency
- Anagram detection in stream
- DNA/protein matching
- Pattern detection

**Your Task:** 
Return true if s2 contains a permutation of s1.

**Difficulty:** Medium
**Tags:** Array, Sliding Window, Sliding Window + Frequency, Anagram Detection In Stream, Dna/Protein Matching, Pattern Detection, O(n), Interview

---

## Examples

### Example 1:
**Input:** `s1 = "ab", s2 = "eidbaooo"`
**Output:** `true`
**Explanation:** s2 contains "ba" which is a permutation of "ab".

### Example 2:
**Input:** `s1 = "ab", s2 = "eidboaoo"`
**Output:** `false`
**Explanation:** No window of size 2 in s2 has same character counts as s1.

---

## Constraints

| Constraint | Value |
|------------|-------|
| S1 Length | 1 ≤ s1.length ≤ 10⁴ |
| S2 Length | 1 ≤ s2.length ≤ 10⁴ |
| Data Type | Lowercase English letters |
| Special Conditions | Fixed window size |
| Time Complexity | O(n) |
| Space Complexity | O(1) - 26 letters |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Turnitin |
| 🔵 Amazon | 🟡 Uber | 🟢 Grammarly |
| 🔵 Facebook | 🟡 Oracle | 🟢 Illumina |

---

## Follow-up Questions

1. How does the sliding window maintain character counts?
2. Why is window size fixed to len(s1)?
3. How do you check if two frequency arrays match?
4. What about finding ALL permutation indices?
