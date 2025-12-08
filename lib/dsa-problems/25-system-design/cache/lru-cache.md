# LRU Cache

## Problem Description

**Real-World Scenario:**
Your browser caches recently visited web pages. When the cache is full and you visit a new site, the Least Recently Used page is evicted. This "LRU Cache" gives O(1) access while managing limited space.

**Example Setup:** 
A database caches frequently accessed rows. With limited memory (say, 1000 rows), when a new row is accessed, the least recently used row is removed. Both get and put must be super fast!

**What is LRU Cache?**
Design a data structure that:
- get(key): Returns value if exists, else -1
- put(key, value): Updates or inserts. If capacity exceeded, evict LRU item

Both operations must be O(1).

**Why is it important?**
- Database caching
- Web browser history
- Operating system page replacement
- CDN content caching

**Your Task:** 
Implement LRU Cache with O(1) get and put operations.

---

## Examples

### Example 1:
**Operations:**
```
LRUCache cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       → 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       → -1 (evicted)
cache.put(4, 4);    // evicts key 1
cache.get(1);       → -1 (evicted)
cache.get(3);       → 3
cache.get(4);       → 4
```

### Example 2:
**Operations:**
```
LRUCache cache = new LRUCache(1);
cache.put(1, 1);
cache.put(2, 2);  // evicts key 1
cache.get(1);     → -1
cache.get(2);     → 2
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Capacity | 1 ≤ capacity ≤ 3000 |
| Key/Value | 0 ≤ key, value ≤ 10⁴ |
| Operations | Up to 2 × 10⁵ |
| Special Conditions | Both get and put must be O(1) |
| Time Complexity | O(1) for both operations |
| Space Complexity | O(capacity) |
| Output Format | Integer for get, void for put |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 LinkedIn | 🟢 Redis |
| 🔵 Google | 🟡 Bloomberg | 🟢 Memcached |
| 🔵 Facebook | 🟡 Uber | 🟢 Cloudflare |
| 🔵 Microsoft | 🟡 Salesforce | 🟢 Twilio |

---

## Follow-up Questions

1. Why use doubly linked list + hash map?
2. What's the difference between LRU and LFU cache?
3. How would you implement this thread-safe?
4. How does Redis implement LRU?
