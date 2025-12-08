# Range Sum Query - Mutable

## Problem Description

**Real-World Scenario:**
A stock market dashboard needs to display the sum of trade volumes over arbitrary time ranges, while also supporting real-time updates to individual trade records.

**Example Setup:** 
A dynamic inventory system tracks item counts in various bins. It needs to query total items in a range of bins and update bin counts efficiently.

**What is Range Sum Query - Mutable?**
Given an integer array `nums`, handle multiple queries of the following types:
1. **Update**: Update the value of an element in the array.
2. **Sum Range**: Calculate the sum of the elements of `nums` between indices `left` and `right` inclusive where `left <= right`.

**Why is it important?**
- Segment Tree / Binary Indexed Tree (Fenwick Tree)
- O(log n) update and query
- Dynamic range queries
- Fundamental data structure problem

**Your Task:** 
Implement the `NumArray` class with `update` and `sumRange` methods.

**Difficulty:** Medium
**Tags:** Segment Tree, Basic, Segment Tree / Binary Indexed Tree, O Update And Query, Dynamic Range Queries, Fundamental Data Structure, O(log n), Interview

---

## Examples

### Example 1:
**Operations:**
```
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | 1 ≤ nums.length ≤ 3 × 10⁴ |
| Element Value | -100 ≤ nums[i] ≤ 100 |
| Operations | At most 3 × 10⁴ calls |
| Data Type | Integer array |
| Time Complexity | O(log n) per operation |
| Space Complexity | O(n) |
| Output Format | Integer sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Facebook | 🟡 Bloomberg | 🟢 Spotify |
| 🔵 Amazon | 🟡 Apple | 🟢 Square |
| 🔵 Google | 🟡 Microsoft | 🟢 Dropbox |

---

## Follow-up Questions

1. Why is Segment Tree better than prefix sums here?
2. How does a Fenwick Tree (BIT) compare in implementation complexity?
3. What is the space complexity of a Segment Tree (4n)?
4. How to handle range updates (Lazy Propagation)?
