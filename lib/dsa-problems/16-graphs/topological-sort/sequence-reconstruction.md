# Sequence Reconstruction

## Problem Description

**Real-World Scenario:**
A DNA assembler determines if a set of short DNA reads can uniquely reconstruct the original genome sequence.

**Example Setup:** 
A log analyzer checks if a set of partial event logs (subsequences) is sufficient to uniquely determine the exact order of all system events.

**What is Sequence Reconstruction?**
You are given an integer array `nums` of length `n` where `nums` is a permutation of the integers in the range `[1, n]`. You are also given a 2D integer array `sequences` where `sequences[i]` is a subsequence of `nums`. Check if `nums` is the shortest possible and the only supersequence. The shortest supersequence is the sequence with the shortest length and has all `sequences[i]` as subsequences. There could be multiple valid supersequences for the given `sequences`. Return `true` if `nums` is the only shortest supersequence of `sequences[i]`.

**Why is it important?**
- Topological Sort uniqueness
- Graph construction
- Constraint satisfaction
- Array processing

**Your Task:** 
Return true if unique reconstruction.

**Difficulty:** Medium
**Tags:** Graphs, Topological Sort, Topological Sort Uniqueness, Graph Construction, Constraint Satisfaction, Array Processing, O(V + E), Interview

---

## Examples

### Example 1:
**Input:** `nums = [1,2,3], sequences = [[1,2],[1,3]]`
**Output:** `false`
**Explanation:** [1,2,3] and [1,3,2] are both valid. Not unique.

### Example 2:
**Input:** `nums = [1,2,3], sequences = [[1,2]]`
**Output:** `false`
**Explanation:** Shortest is [1,2]. [1,2,3] is not shortest.

### Example 3:
**Input:** `nums = [1,2,3], sequences = [[1,2],[1,3],[2,3]]`
**Output:** `true`
**Explanation:** 1->2, 1->3, 2->3. Order must be 1->2->3.

---

## Constraints

| Constraint | Value |
|------------|-------|
| N Value | 1 ≤ n ≤ 10⁴ |
| Sequences | 1 ≤ len ≤ 10⁴ |
| Data Type | Directed Graph |
| Special Conditions | Unique Topological Sort |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
| Output Format | Boolean |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 23andMe |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Ancestry |
| 🔵 Facebook | 🟡 Apple | 🟢 Illumina |

---

## Follow-up Questions

1. When is a topological sort unique? (Queue size always 1 in BFS)
2. Why check if every adjacent pair in `nums` has an edge in the graph?
3. How to handle cases where `nums` is not a valid topological sort?
4. Can you do it without building the full graph (just checking pairs)?
