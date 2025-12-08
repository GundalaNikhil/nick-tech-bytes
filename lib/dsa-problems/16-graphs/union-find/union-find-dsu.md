# Union-Find (Disjoint Set Union)

## Problem Description

**Real-World Scenario:**
Imagine you're managing friend groups on Facebook. When two people become friends, their friend circles merge. You need to quickly answer: "Are A and B in the same friend circle?" and "How many distinct friend circles exist?"

**Example Setup:** 
Rohan is building a social network feature. When user A follows user B, they're in the same "network cluster". He needs to efficiently:
1. Merge two clusters when users connect
2. Check if two users are in the same cluster
3. Count total clusters

**What is Union-Find?**
Union-Find (Disjoint Set Union/DSU) is a data structure that tracks a set of elements partitioned into disjoint (non-overlapping) subsets. It supports two operations: Union (merge two sets) and Find (determine which set an element belongs to).

**Why is it important?**
- Kruskal's MST algorithm
- Detecting cycles in undirected graphs
- Network connectivity
- Image processing (connected pixels)

**Your Task:** 
Implement the Union-Find data structure with path compression and union by rank optimizations.

**Difficulty:** Medium
**Tags:** Graphs, Union Find, Kruskal'S Mst, Detecting Cycles In Undirected Graphs, Network Connectivity, Image Processing, O(α(n), Interview

---

## Examples

### Example 1:
**Input:** 
```
Operations:
union(0, 1)
union(1, 2)
find(0) == find(2)?
union(3, 4)
connected(0, 4)?
```
**Output:** 
```
true  (0 and 2 are in same set)
false (0 and 4 are in different sets)
```
**Explanation:** {0,1,2} and {3,4} are two separate sets.

### Example 2:
**Input:** 
```
n = 5
unions = [[0,1], [2,3], [1,4], [3,4]]
query: connected(0, 3)?
```
**Output:** `true`
**Explanation:** After unions: 0-1-4-3-2, all 5 nodes are in one set.

### Example 3:
**Input:** 
```
n = 4, no unions
count components?
```
**Output:** `4`
**Explanation:** Each node is its own component initially.

### Example 4:
**Input:** 
```
n = 6
unions = [[0,1], [2,3], [4,5]]
count components?
```
**Output:** `3`
**Explanation:** Three pairs, three components.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Elements | 1 ≤ n ≤ 10⁵ |
| Operations | Up to 10⁵ unions/finds |
| Data Type | Integer element indices |
| Special Conditions | Use path compression + union by rank |
| Time Complexity | O(α(n)) per operation (near-constant) |
| Space Complexity | O(n) |
| Output Format | Depends on query type |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 LinkedIn | 🟢 Yelp |
| 🔵 Facebook | 🟡 Uber | 🟢 Pinterest |
| 🔵 Amazon | 🟡 Twitter | 🟢 Snap |
| 🔵 Microsoft | 🟡 Bloomberg | 🟢 Dropbox |

---

## Follow-up Questions

1. What is path compression and why does it improve performance?
2. What is union by rank/size?
3. What is the inverse Ackermann function α(n)?
4. How would you find the size of each component?
