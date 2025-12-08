# Couples Holding Hands

## Problem Description

**Real-World Scenario:**
A seating arrangement optimizer needs to swap people so that every couple sits together.

**Example Setup:** 
Sorting books on a shelf where volume 1 and 2 must be together, 3 and 4 together, etc., with minimum swaps.

**What is Couples Holding Hands?**
There are `n` couples sitting in `2n` seats arranged in a row and want to hold hands.
The people and seats are represented by an integer array `row` where `row[i]` is the ID of the person sitting in the `i-th` seat. The couples are numbered in order of their IDs. The first couple is `(0, 1)`, the second couple is `(2, 3)`, and so on with the last couple being `(2n - 2, 2n - 1)`.
Return the minimum number of swaps so that every couple is sitting side by side. A swap consists of choosing any two people, then they stand up and switch seats.

**Why is it important?**
- Cyclic Permutations
- Union-Find / Greedy
- Graph Decomposition
- Hard Problem (conceptually)

**Your Task:** 
Return minimum swaps.

---

## Examples

### Example 1:
**Input:** `row = [0, 2, 1, 3]`
**Output:** `1`
**Explanation:** Swap 1 and 2. Row becomes [0, 1, 2, 3]. Couples (0,1) and (2,3) are together.

### Example 2:
**Input:** `row = [3, 2, 0, 1]`
**Output:** `0`
**Explanation:** (3,2) is a couple. (0,1) is a couple. Already together.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Couples (n) | 1 ≤ n ≤ 30 |
| Row Length | 2n |
| Data Type | Integer array |
| Time Complexity | O(N) |
| Space Complexity | O(N) |
| Output Format | Integer swaps |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 VMware |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Qualtrics |
| 🔵 Facebook | 🟡 Apple | 🟢 SAP |

---

## Follow-up Questions

1. Why is the answer N - (number of cycles)?
2. How to model this as a graph? (Nodes are couples, edges connect couples currently sitting together).
3. Can you use Union-Find? (Union couples that are connected).
4. Why does Greedy work? (Fixing one couple at a time).
