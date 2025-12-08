# Design HashMap

## Problem Description

**Real-World Scenario:**
Implementing a custom key-value store or dictionary when standard libraries are not available (e.g., embedded systems).

**Example Setup:** 
Building a symbol table for a compiler.

**What is Design HashMap?**
Design a HashMap without using any built-in hash table libraries.
Implement the `MyHashMap` class:
- `MyHashMap()` initializes the object with an empty map.
- `void put(int key, int value)` inserts a `(key, value)` pair into the HashMap. If the `key` already exists in the map, update the corresponding `value`.
- `int get(int key)` returns the `value` to which the specified `key` is mapped, or `-1` if this map contains no mapping for the `key`.
- `void remove(int key)` removes the `key` and its corresponding `value` if the map contains the mapping for the `key`.

**Why is it important?**
- Hash Table Implementation
- Collision Resolution (Chaining vs Open Addressing)
- Array + Linked List

**Your Task:** 
Implement the class.

---

## Examples

### Example 1:
**Input:** 
`MyHashMap()`
`put(1, 1)`
`put(2, 2)`
`get(1)` -> 1
`get(3)` -> -1
`put(2, 1)`
`get(2)` -> 1
`remove(2)`
`get(2)` -> -1

---

## Constraints

| Constraint | Value |
|------------|-------|
| Calls | At most 10^4 calls |
| Keys/Values | 0 ≤ key, value ≤ 10^6 |
| Time Complexity | O(1) average |
| Space Complexity | O(N) |

---

## Asked By Companies

| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| 🔵 Google | 🟡 Bloomberg | 🟢 Salesforce |
| 🔵 Amazon | 🟡 Microsoft | 🟢 Oracle |
| 🔵 Facebook | 🟡 Apple | 🟢 IBM |

---

## Follow-up Questions

1. Hash function choice? `key % capacity`.
2. Collision resolution? (Separate Chaining with Linked List is standard).
3. Resizing? (Rehash when load factor > threshold).
