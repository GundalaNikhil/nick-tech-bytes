# Evaluate Division

## Problem Description

**Real-World Scenario:**
A currency exchange system calculates conversion rates. Given some rates (USD/EUR, EUR/GBP), derive others (USD/GBP).

**Example Setup:** 
A physics calculator converts units: given km/hr and hr/min, calculate km/min.

**What is Evaluate Division?**
Given equations like a/b = 2, b/c = 3, and queries like a/c, find the values. Use graph where nodes are variables and edges have weights.

**Why is it important?**
- Weighted graph traversal
- Union-Find variant
- Unit conversion
- Scientific computing

**Your Task:** 
Return query answers, or -1 if unknown.

**Difficulty:** Medium
**Tags:** Graphs, Weighted, Weighted Graph Traversal, Union-Find Variant, Unit Conversion, Scientific Computing, O(q × (V + E), Interview

---

## Examples

### Example 1:
**Input:** 
```
equations = [["a","b"],["b","c"]]
values = [2.0, 3.0]
queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
```
**Output:** `[6.0, 0.5, -1.0, 1.0, -1.0]`
**Explanation:** a/c = 2*3 = 6, b/a = 1/2, etc.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Equations | 1 ≤ n ≤ 20 |
| Values | 0.0 < value ≤ 20.0 |
| Variables | Lowercase letters |
| Queries | 1 ≤ q ≤ 20 |
| Time Complexity | O(q × (V + E)) |
| Space Complexity | O(V + E) |
| Output Format | Array of doubles |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 PayPal |
| 🔵 Facebook | 🟡 Uber | 🟢 TransferWise |
| 🔵 Amazon | 🟡 Apple | 🟢 Xe.com |

---

## Follow-up Questions

1. How do you build the graph with reciprocals?
2. How does DFS/BFS traverse with weight multiplication?
3. Can you use Union-Find with weights?
4. What about handling cycles?
