# LFU Cache

## Problem Description

**Real-World Scenario:**
A CDN (Content Delivery Network) tracks which content is accessed most frequently. When space runs out, it evicts the Least Frequently Used content. If ties, evict the oldest among the least frequent.

**Example Setup:** 
A music streaming app caches songs. Songs played rarely and a long time ago are evicted first to make room for new content.

**What is LFU Cache?**
Design a Least Frequently Used (LFU) cache with O(1) get and put operations. Track access frequency and recency to decide eviction.

**Why is it important?**
- Advanced caching strategy
- Frequency tracking
- System design interview
- CDN/cache internals

**Your Task:** 
Implement get(key) and put(key, value) with O(1) complexity.

**Difficulty:** Hard
**Tags:** System Design, Advanced Caching Strategy, Frequency Tracking, System Design Interview, Cdn/Cache Internals, O(1), Interview

---

## Examples

### Example 1:
**Operations:**
```
LFUCache(2)
put(1, 1)     // freq(1) = 1
put(2, 2)     // freq(2) = 1
get(1)        // returns 1, freq(1) = 2
put(3, 3)     // evicts 2 (LFU), freq(3) = 1
get(2)        // returns -1 (evicted)
get(3)        // returns 3, freq(3) = 2
put(4, 4)     // evicts 1 (freq 2 but oldest), freq(4) = 1
get(1)        // returns -1 (evicted)
get(3)        // returns 3, freq(3) = 3
get(4)        // returns 4, freq(4) = 2
```

---

## Constraints

| Constraint | Value |
|------------|-------|
| Capacity | 0 ≤ capacity ≤ 10⁴ |
| Key/Value | 0 ≤ key, value ≤ 10⁵ |
| Operations | Up to 2 × 10⁵ |
| Special Conditions | O(1) for both operations |
| Time Complexity | O(1) |
| Space Complexity | O(capacity) |
| Output Format | Value or -1 for get |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Amazon | 🟡 Bloomberg | 🟢 Akamai |
| 🔵 Google | 🟡 Uber | 🟢 Cloudflare |
| 🔵 Microsoft | 🟡 LinkedIn | 🟢 Fastly |

---

## Follow-up Questions

1. Why maintain frequency buckets with linked lists?
2. How do you track minimum frequency efficiently?
3. Compare LFU vs LRU for different workloads?
4. What about LFU with time decay?
