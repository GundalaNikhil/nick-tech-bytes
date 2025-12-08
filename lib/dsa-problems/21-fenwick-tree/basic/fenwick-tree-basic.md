# Fenwick Tree (Binary Indexed Tree)

## Problem Description

**Real-World Scenario:**
A leaderboard system needs to frequently update player scores and query the sum of scores in ranges. Fenwick tree (BIT) is simpler than segment tree and equally efficient for sum queries.

**Example Setup:** 
A financial app tracks cumulative transaction amounts. With frequent transactions (updates) and balance queries (prefix sums), Fenwick tree gives O(log n) for both.

**What is Fenwick Tree?**
Also called Binary Indexed Tree (BIT), it supports:
1. Point updates: add value at index
2. Prefix sum queries: sum of [0, i]
Both in O(log n) with simpler implementation than segment tree.

**Why is it important?**
- Simpler than segment tree
- Inversion count problems
- Competitive programming
- Range sum with point updates

**Your Task:** 
Implement update(i, delta) and prefixSum(i) efficiently.

**Difficulty:** Medium
**Tags:** Fenwick Tree, Basic, Simpler Than Segment Tree, Inversion Count Problems, Competitive Programming, Range Sum With Point Updates, O(log n), Interview

---

## Examples

### Example 1:
**Operations:**
```
FenwickTree([1, 2, 3, 4, 5])
prefixSum(3) → 10 (1+2+3+4)
update(2, 5)  // add 5 to index 2: arr = [1, 2, 8, 4, 5]
prefixSum(3) → 15 (1+2+8+4)
```

### Example 2:
**Operations:**
```
FenwickTree([3, 2, -1, 6, 5])
prefixSum(4) → 15 (3+2-1+6+5)
rangeSum(1, 3) → 7 (2-1+6) // uses prefixSum(3) - prefixSum(0)
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 10⁵ |
| Value Range | -10⁴ ≤ val ≤ 10⁴ |
| Operations | Up to 10⁵ |
| Data Type | Integer array |
| Time Complexity | O(log n) per operation |
| Space Complexity | O(n) |
| Output Format | Integer sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Quantcast |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Two Sigma |
| 🔵 Facebook | 🟡 DE Shaw | 🟢 Jump Trading |

---

## Follow-up Questions

1. How does the lowbit (i & -i) operation work?
2. Why is BIT easier than segment tree?
3. How do you compute range sum [l, r]?
4. What's the connection to binary representation?
