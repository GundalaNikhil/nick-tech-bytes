# Online Stock Span

## Problem Description

**Real-World Scenario:**
A financial charting tool calculates the "span" of a stock's price, defined as the number of consecutive days (backwards from today) the price has been less than or equal to today's price.

**Example Setup:** 
A weather app calculates the number of consecutive days the temperature has been warming up (or staying same) leading up to today.

**What is Online Stock Span?**
Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day. The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

**Why is it important?**
- Monotonic Stack
- Online Algorithm (Streaming)
- Amortized Analysis
- Interview classic

**Your Task:** 
Implement `StockSpanner` class.

---

## Examples

### Example 1:
**Operations:**
```
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2 (60, 70)
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4 (60, 70, 60, 75)
stockSpanner.next(85);  // return 6
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Calls | At most 10⁴ calls |
| Price | 1 ≤ price ≤ 10⁵ |
| Data Type | Integer stream |
| Time Complexity | O(1) amortized |
| Space Complexity | O(N) |
| Output Format | Integer span |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Robinhood |
| 🔵 Google | 🟡 Microsoft | 🟢 TradeDesk |
| 🔵 Facebook | 🟡 Apple | 🟢 Square |

---

## Follow-up Questions

1. Why use a stack of `(price, span)` pairs?
2. Why pop elements smaller than current price?
3. How does `span += stack.pop().span` work?
4. What is the worst-case time for a single call (O(N))?
