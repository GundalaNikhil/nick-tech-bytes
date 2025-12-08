# LFU Cache

## Problem Description

**Real-World Scenario:**
A web browser cache or database buffer pool that evicts the least frequently used items when full, to keep popular content readily available.

**Example Setup:** 
Managing a CDN edge server cache.

**What is LFU Cache?**
Design and implement a data structure for a Least Frequently Used (LFU) cache.
Implement the `LFUCache` class:
- `LFUCache(int capacity)` Initializes the object with the capacity of the data structure.
- `int get(int key)` Gets the value of the key if the key exists in the cache. Otherwise, returns `-1`.
- `void put(int key, int value)` Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys have the same frequency), the least recently used key would be invalidated.
To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.
The functions `get` and `put` must each run in `O(1)` average time complexity.

**Why is it important?**
- Doubly Linked List + Hash Map
- Advanced Data Structure Design
- Cache Eviction Policies

**Your Task:** 
Implement the class.

**Difficulty:** Medium
**Tags:** Design, Cache, Doubly Linked List + Hash Map, Advanced Data Structure Design, Cache Eviction Policies, O(1), Interview

---

## Examples

### Example 1:
**Input:** 
`LFUCache(2)`
`put(1, 1)`
`put(2, 2)`
`get(1)` -> 1 (freq 1->2)
`put(3, 3)` -> evicts 2 (freq 1)
`get(2)` -> -1
`get(3)` -> 3 (freq 1->2)
`put(4, 4)` -> evicts 1 (freq 2, LRU among freq 2? No, 3 has freq 2. 1 has freq 2. 1 was accessed earlier? Wait. 1 accessed at step 3. 3 accessed at step 6. 1 is LRU among freq 2. Evict 1).

---

## Constraints

| Constraint | Value |
|------------|-------|
| Capacity | 0 ≤ capacity ≤ 10^4 |
| Calls | At most 10^5 calls |
| Time Complexity | O(1) |
| Space Complexity | O(Capacity) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 VMware |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Akamai |
| 🔵 Facebook | 🟡 Apple | 🟢 Cloudflare |

---

## Follow-up Questions

1. Why two Hash Maps? (Key->Node, Freq->List of Nodes).
2. Why Doubly Linked List for each frequency? (To handle LRU within the same frequency in O(1)).
3. How to track min frequency? (Update when adding new item or when the list of current min freq becomes empty).
