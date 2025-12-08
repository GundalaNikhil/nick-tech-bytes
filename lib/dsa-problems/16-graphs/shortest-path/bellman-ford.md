# Bellman-Ford Algorithm

## Problem Description

**Real-World Scenario:**
Sometimes in currency exchange, there are arbitrage opportunities - you can exchange USD→EUR→GBP→USD and end up with more money than you started! This creates a "negative cycle" in the exchange graph. Bellman-Ford can detect such opportunities that Dijkstra's cannot.

**Example Setup:** 
Amit works at a forex trading firm. He models currencies as nodes and exchange rates as edges. Some exchange costs are like negative weights (you gain money). He needs an algorithm that works with these negative edges and can detect arbitrage loops.

**What is Bellman-Ford Algorithm?**
Bellman-Ford computes shortest paths from a single source in a weighted graph, even with negative edge weights. It also detects negative cycles (where you can keep reducing the total cost infinitely).

**Why is it important?**
- Works with negative edge weights
- Detects negative cycles (arbitrage detection)
- Used in routing protocols (RIP)
- Currency exchange rate optimization

**Your Task:** 
Given a weighted graph (possibly with negative edges), find shortest distances from source and detect if a negative cycle exists.

---

## Examples

### Example 1:
**Input:** 
```
n = 5
edges = [[0,1,-1], [0,2,4], [1,2,3], [1,3,2], [1,4,2], [3,2,5], [3,1,1], [4,3,-3]]
source = 0
```
**Output:** 
```
distances = [0, -1, 2, -2, 1]
```
**Explanation:** Bellman-Ford relaxes all edges V-1 times to find shortest paths.

### Example 2 (Negative Cycle):
**Input:** 
```
n = 3
edges = [[0,1,1], [1,2,-1], [2,0,-1]]
source = 0
```
**Output:** `Negative cycle detected!`
**Explanation:** Cycle 0→1→2→0 has total weight -1, so we can keep going around.

### Example 3:
**Input:** 
```
n = 4
edges = [[0,1,2], [1,2,3], [2,3,1]]
source = 0
```
**Output:** 
```
distances = [0, 2, 5, 6]
```
**Explanation:** No negative edges, works like Dijkstra but slower.

### Example 4:
**Input:** 
```
n = 3
edges = [[0,1,5], [0,2,10], [1,2,-7]]
source = 0
```
**Output:** 
```
distances = [0, 5, -2]
```
**Explanation:** Path 0→1→2 costs 5+(-7)=-2, better than 0→2 (10).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Vertices | 1 ≤ V ≤ 10⁴ |
| Edges | 0 ≤ E ≤ 10⁵ |
| Edge Weight | -10⁴ ≤ weight ≤ 10⁴ |
| Special Conditions | May contain negative edges |
| Time Complexity | O(V × E) |
| Space Complexity | O(V) |
| Output Format | Distances array or negative cycle indicator |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Citadel |
| 🔵 Amazon | 🟡 Uber | 🟢 Two Sigma |
| 🔵 Goldman Sachs | 🟡 DE Shaw | 🟢 Jane Street |

---

## Follow-up Questions

1. Why does Bellman-Ford need V-1 iterations?
2. How do you detect a negative cycle using Bellman-Ford?
3. When would you use Bellman-Ford over Dijkstra's?
4. What's the intuition behind edge relaxation?
