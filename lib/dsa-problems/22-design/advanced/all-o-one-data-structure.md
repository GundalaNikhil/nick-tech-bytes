# All O`one Data Structure

## Problem Description

**Real-World Scenario:**
A real-time leaderboard or trending topic tracker that needs to instantly return the item with the maximum and minimum score/frequency.

**Example Setup:** 
Tracking word counts in a stream and querying max/min frequent words.

**What is All O`one Data Structure?**
Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.
Implement the `AllOne` class:
- `AllOne()` Initializes the object of the data structure.
- `inc(String key)` Increments the count of the string `key` by `1`. If `key` does not exist in the data structure, insert it with count `1`.
- `dec(String key)` Decrements the count of the string `key` by `1`. If the count of `key` is `0` after the decrement, remove it from the data structure. It is guaranteed that `key` exists in the data structure before the decrement.
- `getMaxKey()` Returns one of the keys with the maximal count. If no element exists, return an empty string `""`.
- `getMinKey()` Returns one of the keys with the minimum count. If no element exists, return an empty string `""`.
Note that each function must run in `O(1)` average time complexity.

**Why is it important?**
- Doubly Linked List + Hash Map (Bucket Sort concept)
- Advanced Design
- Optimization

**Your Task:** 
Implement the class.

**Difficulty:** Hard
**Tags:** Design, Advanced, Doubly Linked List + Hash Map, Advanced Design, Optimization, O(1), Interview

---

## Examples

### Example 1:
**Input:** 
`inc("hello")`
`inc("hello")`
`getMaxKey()` -> "hello"
`getMinKey()` -> "hello"
`inc("leet")`
`getMaxKey()` -> "hello"
`getMinKey()` -> "leet"

---

## Constraints

| Constraint | Value |
|------------|-------|
| Calls | At most 5 * 10^4 calls |
| Time Complexity | O(1) |
| Space Complexity | O(N) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 LinkedIn |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Uber |
| 🔵 Facebook | 🟡 Apple | 🟢 Twitter |

---

## Follow-up Questions

1. Why buckets? (Group keys by count).
2. Why Doubly Linked List of buckets? (To move keys between adjacent counts O(1)).
3. How to handle `inc`? (Move key from current bucket to `next` bucket. Create `next` if needed).
4. How to handle `dec`? (Move key to `prev` bucket. Remove if count 0).
