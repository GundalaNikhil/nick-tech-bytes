# Scramble String

## Problem Description

**Real-World Scenario:**
A password scrambler checks if two strings are scrambled versions of each other using a binary-tree-based scrambling algorithm.

**Example Setup:** 
A plagiarism detector checks if text segments are scrambled rearrangements of each other.

**What is Scramble String?**
A string can be represented as a binary tree and scrambled by swapping children at any node. Check if s2 is a scrambled version of s1.

**Why is it important?**
- Complex recursion + memo
- Tree-based string operations
- 3D DP
- Hard interview problem

**Your Task:** 
Return true if s2 is a scrambled s1.

**Difficulty:** Medium
**Tags:** Dynamic Programming, String Dp, Complex Recursion + Memo, Tree-Based String Operations, 3D Dp, Hard Interview, O(n⁴), Interview

---

## Examples

### Example 1:
**Input:** `s1 = "great", s2 = "rgeat"`
**Output:** `true`
**Explanation:** Can be scrambled via tree representation.

### Example 2:
**Input:** `s1 = "abcde", s2 = "caebd"`
**Output:** `false`

### Example 3:
**Input:** `s1 = "a", s2 = "a"`
**Output:** `true`

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | 1 ≤ s1.length ≤ 30 |
| Equal Length | s1.length = s2.length |
| Data Type | Lowercase letters |
| Special Conditions | Same character frequency required |
| Time Complexity | O(n⁴) with memo |
| Space Complexity | O(n³) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Turnitin |
| 🔵 Amazon | 🟡 Apple | 🟢 Copyleaks |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Grammarly |

---

## Follow-up Questions

1. How do you split and check both orderings?
2. Why check character frequency first?
3. What's the memoization key?
4. Can you visualize as binary tree?
