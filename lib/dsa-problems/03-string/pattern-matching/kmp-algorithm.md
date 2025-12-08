# KMP Pattern Matching Algorithm

## Problem Description

**Real-World Scenario:**
A text editor's "Find" feature searches for a pattern in a document. Naive search is slow for large docs. KMP achieves O(n+m) by precomputing pattern's failure function.

**Example Setup:** 
A DNA database searches for specific gene sequences (patterns) in chromosomes (text). With billions of base pairs, efficient matching is critical.

**What is KMP Algorithm?**
Knuth-Morris-Pratt algorithm finds all occurrences of a pattern in a text in O(n+m) time by using a "failure function" to avoid redundant comparisons.

**Why is it important?**
- Optimal string matching
- Failure function concept
- Text search engines
- Bioinformatics

**Your Task:** 
Find all starting indices where pattern occurs in text.

---

## Examples

### Example 1:
**Input:** `text = "ABABDABACDABABCABAB", pattern = "ABABCABAB"`
**Output:** `[10]`
**Explanation:** Pattern found starting at index 10.

### Example 2:
**Input:** `text = "AAAAAB", pattern = "AAAB"`
**Output:** `[2]`
**Explanation:** Pattern starts at index 2.

### Example 3:
**Input:** `text = "AAAA", pattern = "AA"`
**Output:** `[0, 1, 2]`
**Explanation:** Overlapping matches at 0, 1, 2.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Text Length | 1 ≤ n ≤ 10⁵ |
| Pattern Length | 1 ≤ m ≤ n |
| Data Type | String |
| Special Conditions | Case-sensitive |
| Time Complexity | O(n + m) |
| Space Complexity | O(m) for failure table |
| Output Format | List of starting indices |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Illumina |
| 🔵 Amazon | 🟡 Adobe | 🟢 23andMe |
| 🔵 Microsoft | 🟡 Apple | 🟢 DNAnexus |

---

## Follow-up Questions

1. How is the failure/LPS table computed?
2. What does the failure function represent?
3. How does Rabin-Karp compare?
4. What about Z-algorithm?
