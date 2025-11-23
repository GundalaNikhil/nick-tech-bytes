# Tutorial 41: Caching 💾

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Solution Approach](#solution-approach)
3. [Complete Implementation](#complete-implementation)
4. [Important Considerations](#important-considerations)
5. [Practice Questions](#practice-questions)

---

## 1. Understanding the Question ❓

### What are we trying to achieve?

- **What is Caching?** - Storing frequently accessed data in fast memory to reduce database queries
- **Why?** - Improve performance by avoiding expensive operations like database queries
- **When to use?** - Data that is read often but updated infrequently
- **How?** - Spring caches method results based on arguments; clear when data changes
- **Best practices** - Cache invalidation is hard; choose appropriate cache providers; monitor cache hit rates

### The Problem It Solves

**Before Caching:**

```java
// Every call queries database - SLOW
@GetMapping("/users/{id}")
public User getUser(@PathVariable Long id) {
    Thread.sleep(100);  // Simulates DB query (100ms)
    return userRepository.findById(id).orElseThrow();
}

// 100 requests = 10 seconds! 😞
```

**With Caching:**

```java
// First call: queries database (100ms)
// Subsequent calls: from cache (1ms)
@GetMapping("/users/{id}")
@Cacheable(value = "users", key = "#id")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id).orElseThrow();
}

// 100 requests = ~101ms! 🚀
```

---

## 2. Solution Approach 🎯

### Definition

**Caching** is a technique to store the results of expensive operations (database queries, API calls, computations) so they can be quickly retrieved without repeating the operation.

### Core Annotations

```
@Cacheable - Get from cache, or load and cache
@CachePut - Always execute, update cache
@CacheEvict - Remove from cache
@CacheConfig - Class-level cache config
```

---

## 3. Complete Implementation 💻

### Example 1: Basic @Cacheable

**Configuration**

```java
package com.example.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;

@Configuration
@EnableCaching  // Enable caching
public class CacheConfig {

    /**
     * Default in-memory cache manager
     * Good for development, use Redis for production
     */
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "products", "orders");
    }
}
```

**Service with Caching**

```java
package com.example.service;

import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

@Service
@CacheConfig(cacheNames = "users")  // Class-level cache config
public class UserService {

    /**
     * @Cacheable: Check cache first
     * - If found: return cached value
     * - If not found: execute method, cache result
     *
     * key = "#id" means use method argument 'id' as cache key
     */
    @Cacheable(key = "#id")
    public User getUserById(Long id) {
        System.out.println("Database query for user " + id);
        return userRepository.findById(id).orElseThrow();
    }

    /**
     * Caching with condition
     * Only cache users with active=true
     */
    @Cacheable(key = "#id", condition = "#result.active == true")
    public User getActiveUser(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    /**
     * @CachePut: Always execute, update cache
     * Use when you're sure data changed
     */
    @CachePut(key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    /**
     * @CacheEvict: Remove from cache
     * Use when deleting or when data becomes invalid
     */
    @CacheEvict(key = "#id")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Evict entire cache
     */
    @CacheEvict(allEntries = true)
    public void clearAllUserCache() {
        // All users cache cleared
    }

    /**
     * Multiple cache operations
     * Preload cache with user list
     */
    @Caching(put = {
        @CachePut(key = "#user.id"),
        @CachePut(key = "#user.email")
    })
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
```

---

### Example 2: Redis Caching for Production

**pom.xml**

```xml
<!-- Add Redis starter -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**Configuration**

```java
package com.example.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.cache.CacheManager;

@Configuration
@EnableCaching
public class RedisCacheConfig {

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        return RedisCacheManager.create(factory);
    }
}
```

**application.properties**

```properties
# Redis configuration
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.timeout=2000ms
spring.redis.password=

# Cache configuration
spring.cache.type=redis
spring.cache.redis.time-to-live=600000  # 10 minutes
spring.cache.redis.cache-null-values=true
```

**Service**

```java
@Service
public class ProductService {

    /**
     * With Redis:
     * - Distributed caching across multiple instances
     * - Persistent across restarts
     * - Shared among multiple applications
     */
    @Cacheable(value = "products", key = "#id")
    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    @CachePut(value = "products", key = "#product.id")
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = "products", key = "#id")
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
```

---

### Example 3: Cache Warming and Statistics

```java
package com.example.service;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.cache.CacheManager;
import lombok.RequiredArgsConstructor;

/**
 * Cache warming: Load frequently used data at startup
 */
@Component
@RequiredArgsConstructor
public class CacheWarmer {

    private final UserService userService;
    private final CacheManager cacheManager;

    @EventListener(ApplicationReadyEvent.class)
    public void warmCache() {
        // Load top users into cache at startup
        List<User> topUsers = userRepository.findTopUsers();
        topUsers.forEach(user -> userService.getUserById(user.getId()));

        log.info("Cache warmed with {} users", topUsers.size());
    }

    /**
     * Monitor cache performance
     */
    public void printCacheStats() {
        cacheManager.getCacheNames().forEach(cacheName -> {
            var cache = cacheManager.getCache(cacheName);
            log.info("Cache: {}, Stats: {}", cacheName, cache.getNativeCache());
        });
    }
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Choose Cache Provider

```
✅ In-Memory (ConcurrentMapCache):
   - Development and testing
   - Single instance applications
   - No persistence needed

✅ Redis:
   - Production (high traffic)
   - Multiple instances (distributed)
   - Persistence needed
   - Cross-application sharing

❌ Don't cache in production with in-memory cache
   - Each instance has separate cache
   - Data inconsistency across instances
```

#### 2. Smart Cache Invalidation

```java
✅ DO: Invalidate related caches together
@Caching(evict = {
    @CacheEvict(value = "users", key = "#user.id"),
    @CacheEvict(value = "userIndex"),  // Clear user list too
    @CacheEvict(value = "stats", allEntries = true)
})
public void updateUser(User user) { }

❌ DON'T: Forget to evict dependent caches
// Updates user but leaves outdated user list in cache!
```

#### 3. Monitor Cache Performance

```java
✅ DO: Track cache effectiveness
Cache.ValueWrapper result = cache.get(key);
if (result == null) {
    cacheHits++;
    return result.get();
} else {
    cacheMisses++;
    // Load from DB...
}

❌ DON'T: Blindly cache everything
// Caching infrequently accessed data wastes memory
```

---

### Common Pitfalls

#### Pitfall 1: Stale Cache Data

**Problem:**

```java
@Cacheable(key = "#userId")
public UserSettings getSettings(Long userId) {
    return settingsRepository.findByUserId(userId);
}

// User updates settings, but cache still has old data!
```

**Solution:**

```java
@Cacheable(key = "#userId")
public UserSettings getSettings(Long userId) {
    return settingsRepository.findByUserId(userId);
}

@CacheEvict(key = "#userId", value = "userSettings")
public UserSettings updateSettings(Long userId, UserSettings settings) {
    return settingsRepository.save(userId, settings);
}
```

**Explanation:**
Always evict cache when underlying data changes to prevent returning stale data.

---

#### Pitfall 2: Cache Thundering Herd

**Problem:**

```java
// If cache expires, 1000 requests hit database simultaneously
@Cacheable(key = "#id")
public ExpensiveData getData(Long id) {
    return slowDatabaseQuery();  // All 1000 requests wait here!
}
```

**Solution:**

```java
// Implement cache-aside pattern with TTL and background refresh
@Cacheable(key = "#id", cacheManager = "customManager")
@Transactional(timeout = 5)
public ExpensiveData getData(Long id) {
    return slowDatabaseQuery();
}

// Background job refreshes cache before expiration
@Scheduled(fixedRate = 300000)  // Every 5 minutes
public void refreshCache() {
    popularIds.forEach(id -> getData(id));
}
```

**Explanation:**
Proactively refresh cache before expiration to avoid thundering herd.

---

## 8. Practice Questions 📝

**Question 1: When to use @Cacheable?**

```
Q: When should you cache method results?

A: Cache when:
   - Method is called frequently
   - Operation is expensive (DB query, API call)
   - Data doesn't change often
   - Result depends only on method arguments

Don't cache when:
   - Operation is fast
   - Data changes frequently
   - Security-sensitive (passwords, tokens)
```

**Question 2: Cache key strategies**

```
Q: How do you create good cache keys?

A: Good cache keys:
   - Use method parameters: key = "#id"
   - Combine multiple params: key = "#userId.concat('-').concat(#type)"
   - Consistent format: "user-123", "order-456"

Bad cache keys:
   - Forgetting key: key = "" (single entry per cache!)
   - Non-unique: Same key for different data
```

**Question 3: Invalidate cache on update**

```
Q: How do you keep cache fresh?

A:
@Service
public class UserService {
    @Cacheable(key = "#id", value = "users")
    public User getUser(Long id) { }

    @CacheEvict(key = "#user.id", value = "users")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @CacheEvict(value = "users", allEntries = true)
    public void refreshAllCache() { }
}
```

---

## 🎯 Key Takeaways

1. ✅ **Cache expensive operations** - Database queries, API calls
2. ✅ **Always invalidate on updates** - Prevent stale data
3. ✅ **Use Redis in production** - Distributed, persistent
4. ✅ **Monitor cache effectiveness** - Track hits/misses
5. ✅ **Don't cache everything** - Be selective, wastes memory
6. ✅ **Set appropriate TTLs** - Balance freshness vs performance

---

## Changelog

- **2025-11-23**: Initial creation with Redis and warming examples
- **Added**: Cache invalidation strategies and best practices

**Congratulations! You now master Caching! 🎉**
