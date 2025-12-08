# Longest Palindromic Substring

## Problem Description

**Real-World Scenario:**
A gene sequencer finds the longest palindromic region in DNA, which often indicates mirror sites or hairpin structures.

**Example Setup:** 
A text editor highlights the longest palindrome in user input for stylistic analysis.

**What is Longest Palindromic Substring?**
Find the longest substring that reads the same forwards and backwards.

**Why is it important?**
- Classic DP/expand around center
- DNA/RNA analysis
- String algorithms
- Interview must-know

**Your Task:** 
Return the longest palindromic substring.

**Difficulty:** Medium
**Tags:** String, Palindrome, Classic Dp/Expand Around Center, Dna/Rna Analysis, String Algorithms, Interview Must-Know, O(n²), Interview

---

## Examples

### Example 1:
**Input:** `s = "babad"`
**Output:** `"bab"` or `"aba"`
**Explanation:** Both are valid answers.

### Example 2:
**Input:** `s = "cbbd"`
**Output:** `"bb"`
**Explanation:** Longest palindrome.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s.length ≤ 1000 |
| Data Type | Letters and digits |
| Special Conditions | Multiple valid answers possible |
| Time Complexity | O(n²) |
| Space Complexity | O(1) with expand around center |
| Output Format | Substring |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Illumina |
| 🔵 Microsoft | 🟡 Apple | 🟢 Invitae |
| 🔵 Google | 🟡 Adobe | 🟢 Myriad |

---

## Follow-up Questions

1. What's expand around center approach?
2. How does DP approach work?
3. What's Manacher's O(n) algorithm?
4. What about all longest palindromes?
