# LRU Cache - Low-Level Design

## Problem Statement

Design and implement a Least Recently Used (LRU) Cache with O(1) time complexity for both `get` and `put` operations.

## Requirements

### Functional Requirements

1. `get(key)`: Get value of the key if it exists, return -1 otherwise
2. `put(key, value)`: Set or insert the value if key doesn't exist. When cache reaches capacity, invalidate least recently used item
3. Fixed capacity defined at initialization
4. Both operations should be O(1)

### Non-Functional Requirements

1. Thread-safe implementation
2. Generic key-value support
3. Configurable eviction policy
4. Memory efficient

## Data Structure Choice

### Why HashMap + Doubly Linked List?

- **HashMap**: O(1) lookup
- **Doubly Linked List**: O(1) insertion/deletion at both ends
- **Combination**: O(1) for both get and put operations

### Structure

```
HashMap: key -> Node
Doubly Linked List: Head <-> Node1 <-> Node2 <-> ... <-> Tail

Most Recently Used (MRU) -----> Head
Least Recently Used (LRU) -----> Tail
```

## Class Diagram


<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; border: 1px solid #334155; margin: 2rem 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #1e40af;">
      <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #1e40af;">Main Class</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem;">+ properties</div>
        <div style="margin-bottom: 0.5rem;">+ attributes</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ methods()</div>
        <div style="margin-bottom: 0.5rem;">+ operations()</div>
      </div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #059669;">
      <div style="color: #34d399; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #059669;">Helper Class</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem;">+ fields</div>
        <div style="margin-bottom: 0.5rem;">+ data</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ helpers()</div>
        <div style="margin-bottom: 0.5rem;">+ utilities()</div>
      </div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #7c3aed;">
      <div style="color: #a78bfa; font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #7c3aed;">Interface</div>
      <div style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem;">
        <div style="margin-bottom: 0.5rem; font-style: italic;">«interface»</div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 0.75rem; margin-top: 0.75rem; color: #94a3b8; font-size: 0.875rem;">
        <div style="margin-bottom: 0.5rem;">+ abstract methods()</div>
      </div>
    </div>
  </div>
  <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #334155; color: #64748b; font-size: 0.875rem; text-align: center;">
    Arrows indicate inheritance, composition, and dependency relationships
  </div>
</div>

## Implementation

### Node Class

```java
class Node<K, V> {
    K key;
    V value;
    Node<K, V> prev;
    Node<K, V> next;

    public Node(K key, V value) {
        this.key = key;
        this.value = value;
    }
}
```

### LRU Cache Implementation

```java
import java.util.HashMap;
import java.util.Map;

public class LRUCache<K, V> {
    private final int capacity;
    private final Map<K, Node<K, V>> cache;
    private final Node<K, V> head; // Most recently used
    private final Node<K, V> tail; // Least recently used

    public LRUCache(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be positive");
        }

        this.capacity = capacity;
        this.cache = new HashMap<>();

        // Initialize dummy head and tail
        this.head = new Node<>(null, null);
        this.tail = new Node<>(null, null);
        head.next = tail;
        tail.prev = head;
    }

    /**
     * Get value for given key.
     * Move accessed node to head (most recently used)
     * Time Complexity: O(1)
     */
    public V get(K key) {
        Node<K, V> node = cache.get(key);

        if (node == null) {
            return null;
        }

        // Move to head (most recently used)
        moveToHead(node);

        return node.value;
    }

    /**
     * Put key-value pair in cache.
     * If key exists, update value and move to head.
     * If key doesn't exist, add new node to head.
     * If capacity exceeded, remove tail (least recently used).
     * Time Complexity: O(1)
     */
    public void put(K key, V value) {
        Node<K, V> node = cache.get(key);

        if (node != null) {
            // Update existing node
            node.value = value;
            moveToHead(node);
        } else {
            // Create new node
            Node<K, V> newNode = new Node<>(key, value);
            cache.put(key, newNode);
            addToHead(newNode);

            // Check capacity
            if (cache.size() > capacity) {
                // Remove least recently used (tail)
                Node<K, V> lru = removeTail();
                cache.remove(lru.key);
            }
        }
    }

    /**
     * Remove node from current position and add to head
     */
    private void moveToHead(Node<K, V> node) {
        removeNode(node);
        addToHead(node);
    }

    /**
     * Add node right after dummy head
     */
    private void addToHead(Node<K, V> node) {
        node.prev = head;
        node.next = head.next;

        head.next.prev = node;
        head.next = node;
    }

    /**
     * Remove node from linked list
     */
    private void removeNode(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * Remove and return tail node (LRU)
     */
    private Node<K, V> removeTail() {
        Node<K, V> lru = tail.prev;
        removeNode(lru);
        return lru;
    }

    /**
     * Get current size of cache
     */
    public int size() {
        return cache.size();
    }

    /**
     * Clear all entries
     */
    public void clear() {
        cache.clear();
        head.next = tail;
        tail.prev = head;
    }

    /**
     * Check if key exists
     */
    public boolean containsKey(K key) {
        return cache.containsKey(key);
    }
}
```

### Thread-Safe Implementation

```java
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ThreadSafeLRUCache<K, V> {
    private final LRUCache<K, V> cache;
    private final ReadWriteLock lock;

    public ThreadSafeLRUCache(int capacity) {
        this.cache = new LRUCache<>(capacity);
        this.lock = new ReentrantReadWriteLock();
    }

    public V get(K key) {
        lock.readLock().lock();
        try {
            return cache.get(key);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try {
            cache.put(key, value);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public int size() {
        lock.readLock().lock();
        try {
            return cache.size();
        } finally {
            lock.readLock().unlock();
        }
    }
}
```

## Alternative: Using LinkedHashMap

Java's `LinkedHashMap` provides built-in LRU functionality:

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCacheLinkedHashMap<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCacheLinkedHashMap(int capacity) {
        // true = access-order (LRU), false = insertion-order
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }

    public V get(K key) {
        return super.getOrDefault(key, null);
    }

    public void put(K key, V value) {
        super.put(key, value);
    }
}
```

## Usage Example

```java
public class LRUCacheDemo {
    public static void main(String[] args) {
        LRUCache<Integer, String> cache = new LRUCache<>(3);

        // Add entries
        cache.put(1, "One");
        cache.put(2, "Two");
        cache.put(3, "Three");

        System.out.println(cache.get(1)); // "One" (moves to head)

        // Cache is full: [1, 2, 3]
        // Adding 4 will evict 2 (LRU)
        cache.put(4, "Four");

        System.out.println(cache.get(2)); // null (evicted)
        System.out.println(cache.get(3)); // "Three"
        System.out.println(cache.get(4)); // "Four"

        // Current order: [3, 4, 1]
        cache.put(5, "Five"); // Evicts 1

        System.out.println(cache.get(1)); // null (evicted)
        System.out.println(cache.size());  // 3
    }
}
```

## Complexity Analysis

| Operation       | Time Complexity | Space Complexity |
| --------------- | --------------- | ---------------- |
| get(key)        | O(1)            | O(1)             |
| put(key, value) | O(1)            | O(1)             |
| Space           | -               | O(capacity)      |

### Why O(1)?

- **HashMap lookup**: O(1)
- **Add/Remove from Doubly Linked List**: O(1)
- **Combined**: O(1)

## Design Patterns Used

1. **Data Structure Pattern**: HashMap + Doubly Linked List
2. **Encapsulation**: Private helper methods
3. **Generics**: Type-safe implementation
4. **Decorator Pattern**: ThreadSafeLRUCache wraps LRUCache

## Variations

### 1. LFU Cache (Least Frequently Used)

```java
// Track access frequency instead of recency
// Evict item with lowest frequency
```

### 2. TTL Cache (Time To Live)

```java
class TTLNode<K, V> extends Node<K, V> {
    long expiryTime;

    public TTLNode(K key, V value, long ttlMillis) {
        super(key, value);
        this.expiryTime = System.currentTimeMillis() + ttlMillis;
    }

    public boolean isExpired() {
        return System.currentTimeMillis() > expiryTime;
    }
}
```

### 3. Size-based Eviction

```java
// Evict based on memory size rather than count
// Track cumulative size of entries
```

## Testing

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class LRUCacheTest {

    @Test
    public void testBasicOperations() {
        LRUCache<Integer, String> cache = new LRUCache<>(2);

        cache.put(1, "One");
        cache.put(2, "Two");

        assertEquals("One", cache.get(1));
        assertEquals("Two", cache.get(2));
        assertNull(cache.get(3));
    }

    @Test
    public void testEviction() {
        LRUCache<Integer, String> cache = new LRUCache<>(2);

        cache.put(1, "One");
        cache.put(2, "Two");
        cache.put(3, "Three"); // Evicts 1

        assertNull(cache.get(1));
        assertEquals("Two", cache.get(2));
        assertEquals("Three", cache.get(3));
    }

    @Test
    public void testUpdate() {
        LRUCache<Integer, String> cache = new LRUCache<>(2);

        cache.put(1, "One");
        cache.put(1, "ONE"); // Update

        assertEquals("ONE", cache.get(1));
        assertEquals(1, cache.size());
    }

    @Test
    public void testAccessOrder() {
        LRUCache<Integer, String> cache = new LRUCache<>(2);

        cache.put(1, "One");
        cache.put(2, "Two");
        cache.get(1); // Access 1 (moves to head)
        cache.put(3, "Three"); // Evicts 2 (not 1)

        assertEquals("One", cache.get(1));
        assertNull(cache.get(2));
        assertEquals("Three", cache.get(3));
    }
}
```

## Real-world Applications

1. **Database Query Cache**: Cache frequently accessed queries
2. **Web Browser Cache**: Store recently visited pages
3. **CDN**: Cache popular content closer to users
4. **Operating Systems**: Page replacement algorithms
5. **API Rate Limiting**: Track recent API calls per user

## Trade-offs

| Aspect      | HashMap + DLL                    | LinkedHashMap          |
| ----------- | -------------------------------- | ---------------------- |
| Control     | Full control over implementation | Built-in, less control |
| Performance | Slightly faster                  | Slightly slower        |
| Code        | More code                        | Concise                |
| Learning    | Better for interviews            | Production-ready       |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls

- **Forgetting to remove from HashMap**: When evicting tail, must also remove from HashMap (memory leak)
- **Not updating on get()**: LRU requires moving accessed node to head, not just on put()
- **Thread safety**: Plain HashMap + LinkedList not thread-safe - need synchronization
- **Dummy nodes complexity**: Forgetting dummy head/tail leads to null checks everywhere

### Why This Data Structure?

- **HashMap**: O(1) key lookup - can't use just doubly linked list (O(n) search)
- **Doubly Linked List**: O(1) add/remove - can't use HashMap alone (no eviction order)
- **Combination**: Best of both worlds - O(1) get, O(1) put, O(1) eviction

### Advanced Considerations

- **TTL support**: Add timestamp to nodes, background thread for expiry
- **Size-based eviction**: Track memory size, not just count (for variable-size objects)
- **Write-through vs Write-back**: Update DB immediately vs Batch updates for performance
- **Cache stampede**: Multiple threads miss cache, all hit DB - use locks or probabilistic early expiration

### Creative Solutions

- **2Q Algorithm**: Two queues (recent + frequent) to avoid one-time access pollution
- **Adaptive Replacement Cache (ARC)**: Balance between recency and frequency dynamically
- **Segmented LRU**: Hot/warm/cold segments to reduce lock contention
- **Probabilistic eviction**: Randomly sample K items, evict LRU among them (simpler than global LRU)

### Trade-off Discussions

- **LRU vs LFU**: Recency (temporal locality) vs Frequency (popular items) - LRU simpler, LFU better for skewed access
- **Eviction on put() vs background**: Immediate (blocking) vs Async (complexity + memory overhead)
- **Synchronization granularity**: Entire cache (simple, contention) vs Per-bucket locks (complex, higher throughput)

### Edge Cases to Mention

- **Capacity = 0**: Should throw exception or handle gracefully?
- **Negative capacity**: Input validation needed
- **put() same key twice**: Update value and move to head (don't create duplicate)
- **get() non-existent key**: Return null (documented behavior)
- **Concurrent put() of same key**: Last write wins with proper locking
- **Eviction during iteration**: ConcurrentModificationException if not using thread-safe iterator

## Follow-up Questions

1. **How would you implement LFU (Least Frequently Used) cache?**

   - Add frequency counter to each node
   - Use min-heap to track lowest frequency
   - O(log n) for eviction

2. **How to handle concurrent access?**

   - Use `ConcurrentHashMap` + synchronization
   - ReadWriteLock for better throughput
   - Lock-free data structures

3. **How to make it distributed?**

   - Use Redis with TTL
   - Consistent hashing for partitioning
   - Handle cache invalidation

4. **What if values are large objects?**
   - Store references, not full objects
   - Implement size-based eviction
   - Use weak references for memory management

## Common Interview Follow-ups

1. Implement LRU cache with expiration time
2. Design a cache that supports multiple eviction policies
3. Make the cache persistent (survive restarts)
4. Implement a distributed cache system
5. Add metrics (hit rate, eviction count)
