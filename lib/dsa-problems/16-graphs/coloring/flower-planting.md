# Flower Planting With No Adjacent

## Problem Description

**Real-World Scenario:**
A landscape architect plants flowers in N gardens such that no two connected gardens have the same flower type, using only 4 available types.

**Example Setup:** 
A frequency allocator assigns one of 4 channels to radio towers such that adjacent towers do not interfere (Graph Coloring).

**What is Flower Planting...?**
You have `n` gardens, labeled from `1` to `n`. On the `(x, y)` path between garden `x` and garden `y`, there is a bidirectional path. You want to plant flowers in all gardens. There are 4 types of flowers. You want to plant flowers such that no two adjacent gardens have the same type of flower. Return any such choice as an array `answer`, where `answer[i]` is the type of flower planted in the `(i+1)th` garden. The flower types are denoted 1, 2, 3, or 4. It is guaranteed an answer exists.

**Why is it important?**
- Greedy Graph Coloring
- Adjacency List
- Constraint Satisfaction
- Easy/Medium Graph problem

**Your Task:** 
Return flower type array.

---

## Examples

### Example 1:
**Input:** `n = 3, paths = [[1,2],[2,3],[3,1]]`
**Output:** `[1,2,3]`
**Explanation:** Triangle. 1-2-3 works.

### Example 2:
**Input:** `n = 4, paths = [[1,2],[3,4]]`
**Output:** `[1,2,1,2]`
**Explanation:** 1-2 and 3-4 are disjoint.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Gardens | 1 ≤ n ≤ 10⁴ |
| Paths | 0 ≤ len ≤ 1.5 * 10⁴ |
| Degree | Max 3 (Guarantees solution) |
| Data Type | Undirected Graph |
| Time Complexity | O(V + E) |
| Space Complexity | O(V + E) |
| Output Format | Integer array |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Zillow |
| 🔵 Google | 🟡 Microsoft | 🟢 Redfin |
| 🔵 Facebook | 🟡 Apple | 🟢 Trulia |

---

## Follow-up Questions

1. Why is a solution guaranteed if max degree is 3 and we have 4 colors?
2. Why is a greedy approach sufficient (pick first available color)?
3. Why check neighbors' colors before assigning?
4. Is this related to the Four Color Theorem?
