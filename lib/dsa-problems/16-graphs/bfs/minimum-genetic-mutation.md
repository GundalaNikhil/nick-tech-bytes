# Minimum Genetic Mutation

## Problem Description

**Real-World Scenario:**
A genetics lab studies mutation paths between gene sequences. Find the minimum mutations to transform one gene into another, where each step must produce a valid gene.

**Example Setup:** 
A virology lab tracks how a virus evolved from one strain to another through minimal nucleotide changes.

**What is Minimum Genetic Mutation?**
A gene string is represented by 8 characters (A, C, G, T). Given a start gene, end gene, and gene bank, find the minimum mutations to transform start to end. Each mutation must produce a gene in the bank.

**Why is it important?**
- BFS on string graph
- Similar to Word Ladder
- Bioinformatics
- Mutation analysis

**Your Task:** 
Return the minimum number of mutations, or -1 if impossible.

**Difficulty:** Medium
**Tags:** Graphs, Bfs, Bfs On String Graph, Similar To Word Ladder, Bioinformatics, Mutation Analysis, O(bank × 8 × 4), Interview

---

## Examples

### Example 1:
**Input:** `startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]`
**Output:** `1`
**Explanation:** Single mutation at last position.

### Example 2:
**Input:** `startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]`
**Output:** `2`
**Explanation:** Two mutations via bank.

### Example 3:
**Input:** `startGene = "AAAAACCC", endGene = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]`
**Output:** `3`
**Explanation:** Three mutations.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Gene Length | 8 characters |
| Characters | A, C, G, T only |
| Bank Size | 0 ≤ bank.length ≤ 10 |
| Data Type | String array |
| Time Complexity | O(bank × 8 × 4) |
| Space Complexity | O(bank) |
| Output Format | Mutation count or -1 |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Illumina |
| 🔵 Amazon | 🟡 Apple | 🟢 23andMe |
| 🔵 Microsoft | 🟡 Adobe | 🟢 Genentech |

---

## Follow-up Questions

1. How is this similar to Word Ladder?
2. Why use BFS for shortest path?
3. How do you generate valid mutations?
4. What about finding all paths?
