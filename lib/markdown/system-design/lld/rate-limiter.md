# Rate Limiter Low-Level Design

## Overview

Design a rate limiter system that restricts the number of requests a client can make to an API within a specified time window. This is crucial for preventing abuse, ensuring fair resource allocation, and protecting backend services from overload.

## Requirements

### Functional Requirements

- Limit requests per user/IP/API key
- Support multiple time windows (second, minute, hour, day)
- Different rate limits for different API endpoints
- Allow burst traffic within limits
- Provide clear error responses when limit exceeded
- Support distributed systems

### Non-Functional Requirements

- Low latency (<10ms overhead)
- High throughput (handle 100K+ requests/sec)
- Accurate counting
- Fault tolerant
- Scalable horizontally

## Use Cases

- API rate limiting (1000 requests/hour per user)
- Login attempt limiting (5 attempts per minute)
- Message sending limits (100 SMS per day)
- File upload limits (10 uploads per hour)

## Rate Limiting Algorithms

### 1. Token Bucket

**Concept:**

- Bucket holds tokens (capacity = max requests)
- Tokens added at fixed rate
- Each request consumes one token
- Request rejected if no tokens available

**Implementation:**

```java
public class TokenBucket {
    private final long capacity;
    private final long refillRate; // tokens per second
    private long availableTokens;
    private long lastRefillTime;

    public TokenBucket(long capacity, long refillRate) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.availableTokens = capacity;
        this.lastRefillTime = System.currentTimeMillis();
    }

    public synchronized boolean allowRequest() {
        refill();

        if (availableTokens > 0) {
            availableTokens--;
            return true;
        }
        return false;
    }

    private void refill() {
        long now = System.currentTimeMillis();
        long elapsedTime = now - lastRefillTime;
        long tokensToAdd = (elapsedTime * refillRate) / 1000;

        availableTokens = Math.min(capacity, availableTokens + tokensToAdd);
        lastRefillTime = now;
    }

    public long getWaitTime() {
        if (availableTokens > 0) return 0;
        return (1000 / refillRate); // milliseconds
    }
}
```

**Pros:**

- Allows burst traffic
- Smooth rate limiting
- Memory efficient

**Cons:**

- Complex to implement
- Requires timestamp tracking

### 2. Leaky Bucket

**Concept:**

- Requests enter bucket at any rate
- Processed at fixed rate (leak rate)
- Bucket has maximum capacity
- Overflow requests rejected

**Implementation:**

```java
public class LeakyBucket {
    private final long capacity;
    private final long leakRate; // requests per second
    private Queue<Long> requestQueue;

    public LeakyBucket(long capacity, long leakRate) {
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.requestQueue = new LinkedList<>();
    }

    public synchronized boolean allowRequest() {
        leak();

        if (requestQueue.size() < capacity) {
            requestQueue.offer(System.currentTimeMillis());
            return true;
        }
        return false;
    }

    private void leak() {
        long now = System.currentTimeMillis();
        long leakInterval = 1000 / leakRate; // ms per request

        while (!requestQueue.isEmpty()) {
            long oldestRequest = requestQueue.peek();
            if (now - oldestRequest >= leakInterval) {
                requestQueue.poll();
            } else {
                break;
            }
        }
    }
}
```

**Pros:**

- Smooth output rate
- Protects downstream services

**Cons:**

- Burst traffic rejected
- Higher memory usage

### 3. Fixed Window Counter

**Concept:**

- Divide time into fixed windows (e.g., 1-minute windows)
- Count requests in current window
- Reset counter at window boundary
- Reject if count exceeds limit

**Implementation:**

```java
public class FixedWindowCounter {
    private final long windowSize; // milliseconds
    private final long maxRequests;
    private long windowStart;
    private long requestCount;

    public FixedWindowCounter(long windowSize, long maxRequests) {
        this.windowSize = windowSize;
        this.maxRequests = maxRequests;
        this.windowStart = System.currentTimeMillis();
        this.requestCount = 0;
    }

    public synchronized boolean allowRequest() {
        long now = System.currentTimeMillis();

        // Check if window expired
        if (now - windowStart >= windowSize) {
            windowStart = now;
            requestCount = 0;
        }

        if (requestCount < maxRequests) {
            requestCount++;
            return true;
        }
        return false;
    }

    public long getRemainingRequests() {
        return Math.max(0, maxRequests - requestCount);
    }
}
```

**Pros:**

- Simple to implement
- Memory efficient
- Easy to understand

**Cons:**

- Boundary spike issue (2x traffic at window edge)
- Not accurate for short periods

### 4. Sliding Window Log

**Concept:**

- Store timestamp of each request
- Remove timestamps outside window
- Count remaining timestamps
- Reject if count exceeds limit

**Implementation:**

```java
public class SlidingWindowLog {
    private final long windowSize; // milliseconds
    private final long maxRequests;
    private TreeMap<Long, Integer> requestLog; // timestamp -> count

    public SlidingWindowLog(long windowSize, long maxRequests) {
        this.windowSize = windowSize;
        this.maxRequests = maxRequests;
        this.requestLog = new TreeMap<>();
    }

    public synchronized boolean allowRequest() {
        long now = System.currentTimeMillis();
        long windowStart = now - windowSize;

        // Remove old entries
        requestLog.headMap(windowStart).clear();

        // Count requests in window
        long totalRequests = requestLog.values().stream()
            .mapToLong(Long::longValue)
            .sum();

        if (totalRequests < maxRequests) {
            requestLog.put(now, requestLog.getOrDefault(now, 0L) + 1);
            return true;
        }
        return false;
    }
}
```

**Pros:**

- Very accurate
- No boundary issues

**Cons:**

- High memory usage
- Expensive cleanup operations

### 5. Sliding Window Counter

**Concept:**

- Hybrid of fixed window and sliding window
- Use previous and current window
- Weight based on overlap

**Implementation:**

```java
public class SlidingWindowCounter {
    private final long windowSize;
    private final long maxRequests;
    private long prevWindowCount;
    private long currWindowCount;
    private long currWindowStart;

    public SlidingWindowCounter(long windowSize, long maxRequests) {
        this.windowSize = windowSize;
        this.maxRequests = maxRequests;
        this.prevWindowCount = 0;
        this.currWindowCount = 0;
        this.currWindowStart = System.currentTimeMillis();
    }

    public synchronized boolean allowRequest() {
        long now = System.currentTimeMillis();

        // Check if new window started
        if (now - currWindowStart >= windowSize) {
            prevWindowCount = currWindowCount;
            currWindowCount = 0;
            currWindowStart = now;
        }

        // Calculate weighted count
        long timeIntoWindow = now - currWindowStart;
        double prevWeight = 1.0 - ((double) timeIntoWindow / windowSize);
        long estimatedCount = (long) (prevWindowCount * prevWeight) + currWindowCount;

        if (estimatedCount < maxRequests) {
            currWindowCount++;
            return true;
        }
        return false;
    }
}
```

**Pros:**

- Smooth rate limiting
- Memory efficient
- Good approximation

**Cons:**

- Not 100% accurate
- Slightly complex

## Distributed Rate Limiter

### Redis-based Implementation

```java
public class RedisRateLimiter {
    private final Jedis redis;
    private final String keyPrefix = "rate_limit:";

    public boolean allowRequest(String userId, int maxRequests, int windowSeconds) {
        String key = keyPrefix + userId;
        long now = System.currentTimeMillis();
        long windowStart = now - (windowSeconds * 1000);

        Transaction multi = redis.multi();

        // Remove old entries
        multi.zremrangeByScore(key, 0, windowStart);

        // Count current requests
        multi.zcard(key);

        // Add current request
        multi.zadd(key, now, String.valueOf(now));

        // Set expiry
        multi.expire(key, windowSeconds);

        List<Object> results = multi.exec();

        long count = (Long) results.get(1);
        return count < maxRequests;
    }
}
```

### Token Bucket with Redis

```lua
-- Redis Lua script for token bucket
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local requested = tonumber(ARGV[3])
local now = tonumber(ARGV[4])

local bucket = redis.call('HMGET', key, 'tokens', 'last_refill')
local tokens = tonumber(bucket[1]) or capacity
local last_refill = tonumber(bucket[2]) or now

-- Refill tokens
local elapsed = now - last_refill
local tokens_to_add = elapsed * refill_rate / 1000
tokens = math.min(capacity, tokens + tokens_to_add)

-- Try to consume tokens
if tokens >= requested then
    tokens = tokens - requested
    redis.call('HMSET', key, 'tokens', tokens, 'last_refill', now)
    redis.call('EXPIRE', key, 3600)
    return 1
else
    return 0
end
```

## Class Design

```java
// Main interface
public interface RateLimiter {
    boolean allowRequest(String identifier);
    long getWaitTimeMs(String identifier);
    void reset(String identifier);
}

// Configuration
public class RateLimitConfig {
    private long maxRequests;
    private long windowSize; // milliseconds
    private RateLimitAlgorithm algorithm;

    public RateLimitConfig(long maxRequests, long windowSize,
                          RateLimitAlgorithm algorithm) {
        this.maxRequests = maxRequests;
        this.windowSize = windowSize;
        this.algorithm = algorithm;
    }

    // Getters
}

// Algorithm enum
public enum RateLimitAlgorithm {
    TOKEN_BUCKET,
    LEAKY_BUCKET,
    FIXED_WINDOW,
    SLIDING_WINDOW_LOG,
    SLIDING_WINDOW_COUNTER
}

// Factory
public class RateLimiterFactory {
    public static RateLimiter create(RateLimitConfig config) {
        switch (config.getAlgorithm()) {
            case TOKEN_BUCKET:
                return new TokenBucketRateLimiter(config);
            case LEAKY_BUCKET:
                return new LeakyBucketRateLimiter(config);
            case FIXED_WINDOW:
                return new FixedWindowRateLimiter(config);
            case SLIDING_WINDOW_LOG:
                return new SlidingWindowLogRateLimiter(config);
            case SLIDING_WINDOW_COUNTER:
                return new SlidingWindowCounterRateLimiter(config);
            default:
                throw new IllegalArgumentException("Unknown algorithm");
        }
    }
}

// Distributed implementation
public class DistributedRateLimiter implements RateLimiter {
    private final RedisClient redis;
    private final RateLimitConfig config;

    public DistributedRateLimiter(RedisClient redis, RateLimitConfig config) {
        this.redis = redis;
        this.config = config;
    }

    @Override
    public boolean allowRequest(String identifier) {
        // Use Redis for distributed state
        return executeRedisScript(identifier);
    }

    private boolean executeRedisScript(String identifier) {
        // Lua script execution
        // ...
        return true;
    }
}
```

## Multi-tier Rate Limiting

```java
public class MultiTierRateLimiter implements RateLimiter {
    private Map<String, RateLimiter> tiers;

    public MultiTierRateLimiter() {
        this.tiers = new HashMap<>();

        // Per-second limit
        tiers.put("second", new TokenBucket(10, 10));

        // Per-minute limit
        tiers.put("minute", new TokenBucket(100, 100.0/60));

        // Per-hour limit
        tiers.put("hour", new TokenBucket(1000, 1000.0/3600));
    }

    @Override
    public boolean allowRequest(String identifier) {
        // All tiers must allow the request
        for (RateLimiter limiter : tiers.values()) {
            if (!limiter.allowRequest(identifier)) {
                return false;
            }
        }
        return true;
    }
}
```

## API Response

```java
public class RateLimitResponse {
    private boolean allowed;
    private long remainingRequests;
    private long resetTime;
    private long retryAfter; // seconds

    public Map<String, String> toHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("X-RateLimit-Limit", String.valueOf(maxRequests));
        headers.put("X-RateLimit-Remaining", String.valueOf(remainingRequests));
        headers.put("X-RateLimit-Reset", String.valueOf(resetTime));
        if (!allowed) {
            headers.put("Retry-After", String.valueOf(retryAfter));
        }
        return headers;
    }
}
```

## Testing Strategy

```java
@Test
public void testTokenBucket_allowsBurstTraffic() {
    TokenBucket bucket = new TokenBucket(10, 1);

    // Burst of 10 requests should succeed
    for (int i = 0; i < 10; i++) {
        assertTrue(bucket.allowRequest());
    }

    // 11th request should fail
    assertFalse(bucket.allowRequest());

    // Wait for refill
    Thread.sleep(1000);

    // Should allow one more request
    assertTrue(bucket.allowRequest());
}

@Test
public void testFixedWindow_handlesWindowBoundary() {
    FixedWindowCounter counter = new FixedWindowCounter(1000, 5);

    // Fill up window
    for (int i = 0; i < 5; i++) {
        assertTrue(counter.allowRequest());
    }

    assertFalse(counter.allowRequest());

    // Wait for new window
    Thread.sleep(1000);

    // Should allow requests in new window
    assertTrue(counter.allowRequest());
}
```

## Design Patterns Used

1. **Strategy Pattern:** Different rate limiting algorithms
2. **Factory Pattern:** Create rate limiter instances
3. **Decorator Pattern:** Add logging, metrics
4. **Singleton Pattern:** Shared rate limiter instances

## Trade-offs

| Algorithm              | Accuracy  | Memory   | Burst Support | Complexity |
| ---------------------- | --------- | -------- | ------------- | ---------- |
| Token Bucket           | Good      | Low      | Yes           | Medium     |
| Leaky Bucket           | Good      | Medium   | No            | Medium     |
| Fixed Window           | Low       | Very Low | No            | Low        |
| Sliding Window Log     | Excellent | High     | No            | High       |
| Sliding Window Counter | Good      | Low      | No            | Medium     |

## Follow-up Questions

1. How to handle clock skew in distributed systems?
2. How to implement rate limiting for anonymous users?
3. How to support dynamic rate limit updates?
4. How to implement fair queuing for rate-limited requests?
5. How to handle rate limiting for websocket connections?
