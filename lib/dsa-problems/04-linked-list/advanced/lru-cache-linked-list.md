# LRU Cache (Linked List Implementation)

## Problem Description

**Real-World Scenario:**
Redis, the popular caching system, uses an LRU eviction policy. When memory is full, the least recently accessed key is removed. Implement this with O(1) operations.

**Example Setup:** 
A browser cache stores recently visited pages. When full, it evicts the page you haven't visited in the longest time. Implement using doubly linked list + hash map.

**What is LRU Cache (Linked List)?**
A cache that evicts the Least Recently Used item when at capacity. Uses doubly linked list for O(1) operations and hash map for O(1) lookup.

**Why is it important?**
- Real caching systems
- Doubly linked list operations
- Hash map + linked list combo
- System design interviews

**Your Task:** 
Implement get and put with O(1) time complexity.

**Difficulty:** Hard
**Tags:** Linked List, Advanced, Real Caching Systems, Doubly Linked List Operations, Hash Map + Linked List Combo, System Design Interviews, O(1), Interview

---

## Examples

### Example 1:
**Operations:**
```
LRUCache(2)
put(1, 1)  // cache: {1=1}
put(2, 2)  // cache: {1=1, 2=2}
get(1)     // returns 1, cache: {2=2, 1=1}
put(3, 3)  // evicts 2, cache: {1=1, 3=3}
get(2)     // returns -1 (evicted)
```

### Example 2:
**Operations:**
```
LRUCache(1)
put(1, 1)
put(2, 2)  // evicts 1
get(1)     // returns -1
get(2)     // returns 2
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Capacity | 1 ≤ capacity ≤ 3000 |
| Key/Value | 0 ≤ key, value ≤ 10⁴ |
| Operations | Up to 2 × 10⁵ |
| Special Conditions | O(1) for both operations |
| Time Complexity | O(1) |
| Space Complexity | O(capacity) |
| Output Format | Value or -1 for get |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Redis Labs |
| 🔵 Facebook | 🟡 Uber | 🟢 Twilio |
| 🔵 Microsoft | 🟡 Salesforce | 🟢 Dropbox |

---

## Follow-up Questions

1. Why use doubly linked list and not singly linked?
2. How do you move a node to the front?
3. What's the role of dummy head and tail nodes?
4. How would you implement LFU (Least Frequently Used)?
