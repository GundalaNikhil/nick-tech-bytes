# Median from Data Stream

## Problem Description

**Real-World Scenario:**
A real-time stock ticker needs to show the median price as trades happen. With millions of trades per day, recalculating the median from scratch each time isn't feasible. Maintain it efficiently as data streams in!

**Example Setup:** 
A hospital monitors patient heart rates in real-time. The median heart rate helps detect anomalies quickly. As new readings arrive continuously, the median must be updated instantly.

**What is Median from Data Stream?**
Design a data structure that supports adding integers and finding the median of all added elements in O(log n) time.

**Why is it important?**
- Real-time analytics
- Streaming data processing
- Anomaly detection
- Two-heap technique mastery

**Your Task:** 
Implement MedianFinder class with addNum() and findMedian() methods.

**Difficulty:** Hard
**Tags:** Heaps, Advanced, Real-Time Analytics, Streaming Data Processing, Anomaly Detection, Two-Heap Technique Mastery, O(log n), Interview

---

## Examples

### Example 1:
**Operations:**
```
MedianFinder()
addNum(1)    // arr = [1]
findMedian() → 1.0
addNum(2)    // arr = [1, 2]
findMedian() → 1.5
addNum(3)    // arr = [1, 2, 3]
findMedian() → 2.0
```

### Example 2:
**Operations:**
```
addNum(-1)   // [-1]
addNum(-2)   // [-2, -1]
findMedian() → -1.5
addNum(-3)   // [-3, -2, -1]
findMedian() → -2.0
```

### Example 3:
**Operations:**
```
addNum(6)
addNum(10)
addNum(2)
addNum(6)
findMedian() → 6.0  // [2, 6, 6, 10]
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Value Range | -10⁵ ≤ num ≤ 10⁵ |
| Operations | Up to 5 × 10⁴ calls |
| Special Conditions | findMedian only after at least one addNum |
| Time Complexity | O(log n) for add, O(1) for find |
| Space Complexity | O(n) |
| Output Format | Double for median |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Goldman Sachs | 🟢 Datadog |
| 🔵 Google | 🟡 Bloomberg | 🟢 Splunk |
| 🔵 Facebook | 🟡 Uber | 🟢 Confluent |
| 🔵 Microsoft | 🟡 Twitter | 🟢 Snowflake |

---

## Follow-up Questions

1. Why use two heaps (max-heap + min-heap)?
2. How do you balance the two heaps?
3. What if 99% of numbers are between 0-100?
4. How would you find other percentiles (e.g., 90th percentile)?
