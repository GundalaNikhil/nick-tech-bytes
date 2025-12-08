# Range Sum Query - Segment Tree

## Problem Description

**Real-World Scenario:**
A real-time analytics dashboard shows sum of website visits for any date range. With millions of updates daily, naive O(n) per query isn't acceptable. Segment tree gives O(log n) for both updates and queries.

**Example Setup:** 
A stock trading platform needs to quickly compute sum of trading volumes for any time range while volumes are being updated continuously.

**What is Range Sum Query (Segment Tree)?**
Build a segment tree to efficiently:
1. Update a value at index i
2. Query sum in range [l, r]
Both operations in O(log n).

**Why is it important?**
- Real-time analytics
- Competitive programming
- Database range queries
- Time series processing

**Your Task:** 
Implement update(i, val) and sumRange(l, r) efficiently.

---

## Examples

### Example 1:
**Operations:**
```
NumArray([1, 3, 5])
sumRange(0, 2) → 9 (1+3+5)
update(1, 2)   // arr = [1, 2, 5]
sumRange(0, 2) → 8 (1+2+5)
```

### Example 2:
**Operations:**
```
NumArray([1, 2, 3, 4, 5])
sumRange(1, 3) → 9 (2+3+4)
update(2, 10)  // arr = [1, 2, 10, 4, 5]
sumRange(1, 3) → 16 (2+10+4)
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ n ≤ 3 × 10⁴ |
| Value Range | -100 ≤ val ≤ 100 |
| Operations | Up to 3 × 10⁴ update/query |
| Data Type | Integer array |
| Time Complexity | O(log n) per operation |
| Space Complexity | O(n) for tree |
| Output Format | Integer sum or void |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Yelp |
| 🔵 Amazon | 🟡 Uber | 🟢 Splunk |
| 🔵 Facebook | 🟡 Adobe | 🟢 Datadog |

---

## Follow-up Questions

1. How does segment tree structure work?
2. What's lazy propagation for range updates?
3. What's the difference between segment tree and Fenwick tree?
4. How would you find range minimum instead of sum?
