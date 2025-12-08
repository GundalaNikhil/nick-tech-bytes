# Find Median from Data Stream

## Problem Description

**Real-World Scenario:**
A financial trading system tracks the running median of stock prices for real-time volatility analysis.

**Example Setup:** 
A network monitor calculates the median packet latency as packets arrive in a stream.

**What is Find Median from Data Stream?**
Design a data structure supporting addNum(int num) and findMedian() returning the median of all numbers added so far.

**Why is it important?**
- Two-heap technique
- Online median
- Balanced data structure
- Streaming algorithms

**Your Task:** 
Implement MedianFinder with addNum() and findMedian().

**Difficulty:** Medium
**Tags:** Heaps, Applications, Two-Heap, Online Median, Balanced Data Structure, Streaming Algorithms, O(log n), Interview

---

## Examples

### Example 1:
**Operations:**
```
MedianFinder mf = new MedianFinder()
mf.addNum(1)
mf.addNum(2)
mf.findMedian()  // 1.5
mf.addNum(3)
mf.findMedian()  // 2.0
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Numbers | -10⁵ ≤ num ≤ 10⁵ |
| Operations | Up to 5 × 10⁴ calls |
| Data Type | Integers |
| Special Conditions | Find median of all numbers |
| Time Complexity | O(log n) add, O(1) find |
| Space Complexity | O(n) |
| Output Format | Double median |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Jane Street |
| 🔵 Facebook | 🟡 Uber | 🟢 Two Sigma |

---

## Follow-up Questions

1. How do two heaps (max-heap + min-heap) work?
2. How to keep heaps balanced (size diff ≤ 1)?
3. When does median come from one vs two heaps?
4. What about k-th percentile instead?
