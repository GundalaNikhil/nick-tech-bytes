# Map Sum Pairs

## Problem Description

**Real-World Scenario:**
A prefix-based analytics system aggregates values (e.g., scores, sales) for all keys starting with a specific prefix.

**Example Setup:** 
A filesystem usage analyzer sums the file sizes of all files in a directory (prefix path).

**What is Map Sum Pairs?**
Design a map that allows you to:
1. `insert(key, val)`: Insert or overwrite the value for a key.
2. `sum(prefix)`: Return the sum of all the values of keys that have the string `prefix` as a prefix.

**Why is it important?**
- Trie with value aggregation
- Prefix search
- Data structure design
- Real-time analytics

**Your Task:** 
Implement `MapSum` class.

**Difficulty:** Medium
**Tags:** Trie, Basic, Trie With Value Aggregation, Prefix Search, Data Structure Design, Real-Time Analytics, O(K), Interview

---

## Examples

### Example 1:
**Operations:**
```
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);
mapSum.sum("ap");       // return 3
mapSum.insert("app", 2);
mapSum.sum("ap");       // return 3 + 2 = 5
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Operations | At most 50 calls |
| Key Length | 1 ≤ key.length ≤ 50 |
| Value | 1 ≤ val ≤ 1000 |
| Data Type | Lowercase letters |
| Time Complexity | O(K) insert, O(K) sum (with optimization) |
| Space Complexity | O(N * K) |
| Output Format | Integer sum |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Akamai |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Cloudflare |
| 🔵 Facebook | 🟡 Apple | 🟢 Datadog |

---

## Follow-up Questions

1. How to optimize `sum` to O(prefix_length)? (Store sum at each node)
2. How to handle updates (overwrite)? (Track delta or use map to get old value)
3. What is the trade-off between fast insert and fast sum?
4. Can you use a HashMap for keys and linear scan for sum (brute force)?
