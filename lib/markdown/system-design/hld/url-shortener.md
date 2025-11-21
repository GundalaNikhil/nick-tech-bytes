# URL Shortener System Design

## Overview

Design a URL shortening service like bit.ly or TinyURL that converts long URLs into short, shareable links.

## Requirements

### Functional Requirements

- Generate a unique short URL for a given long URL
- Redirect users to the original URL when they access the short URL
- Optional: Custom short URLs
- Optional: Analytics (click tracking, geolocation)
- Optional: Link expiration

### Non-Functional Requirements

- High availability (99.99% uptime)
- Low latency for redirects (<100ms)
- Scalable to handle billions of URLs
- Durability - URLs should not be lost

## Capacity Estimation

### Traffic

- 100 million URLs shortened per month
- Read:Write ratio = 100:1 (more redirects than creations)
- 10 billion redirects per month

### Storage

- Average URL length: 500 bytes
- 100M URLs/month × 500 bytes = 50GB/month
- For 10 years: 50GB × 12 × 10 = 6TB

### Bandwidth

- Write: 100M × 500 bytes / (30 × 24 × 3600) ≈ 20 KB/s
- Read: 10B × 500 bytes / (30 × 24 × 3600) ≈ 2 MB/s

## High-Level Design

### Components

1. **API Gateway**

   - Rate limiting
   - Authentication
   - Request routing

2. **Application Servers**

   - URL generation logic
   - Validation
   - Business logic

3. **Database**

   - Primary: NoSQL (Cassandra/DynamoDB) for high write throughput
   - Schema: `{shortURL: string, longURL: string, userID: string, createdAt: timestamp, expiresAt: timestamp}`

4. **Cache Layer (Redis/Memcached)**

   - Cache popular short URLs
   - LRU eviction policy
   - 80% of traffic handled by cache

5. **Load Balancer**
   - Distribute traffic across app servers
   - Health checks

### URL Generation Strategies

#### 1. Hash-based (MD5/SHA256)

```
hash = MD5(longURL + timestamp)
shortURL = base62Encode(first_43_bits_of_hash)
```

**Pros**: Fast, deterministic
**Cons**: Collision handling needed

#### 2. Counter-based

```
counter = atomicIncrement(globalCounter)
shortURL = base62Encode(counter)
```

**Pros**: No collisions, sequential
**Cons**: Single point of failure, predictable

#### 3. Random Generation with Collision Check

```
do {
  shortURL = generateRandom(7_chars)
} while (exists(shortURL))
```

**Pros**: Simple, distributed
**Cons**: Performance degrades over time

**Recommended**: Use a distributed unique ID generator (Snowflake) + Base62 encoding

## Database Schema

### URLs Table

```sql
{
  "shortURL": "abc123",
  "longURL": "https://example.com/very/long/url",
  "userID": "user_123",
  "createdAt": "2024-01-01T00:00:00Z",
  "expiresAt": "2025-01-01T00:00:00Z",
  "clicks": 1250
}
```

### Analytics Table (Optional)

```sql
{
  "shortURL": "abc123",
  "timestamp": "2024-01-01T12:00:00Z",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "referer": "https://google.com"
}
```

## API Design

### Create Short URL

```
POST /api/v1/shorten
Request: {
  "longURL": "https://example.com/very/long/url",
  "customAlias": "mylink" (optional),
  "expiresAt": "2025-01-01" (optional)
}
Response: {
  "shortURL": "https://short.ly/abc123",
  "longURL": "https://example.com/very/long/url",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Redirect

```
GET /{shortURL}
Response: 302 Redirect to longURL
```

### Get URL Info

```
GET /api/v1/url/{shortURL}
Response: {
  "shortURL": "abc123",
  "longURL": "https://example.com/very/long/url",
  "clicks": 1250,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Scaling Considerations

### Database Partitioning

- **Partition Key**: First 2 characters of short URL
- Range-based or hash-based partitioning
- Consistent hashing for even distribution

### Caching Strategy

- Cache-aside pattern
- TTL: 24 hours for popular URLs
- Cache invalidation on URL updates

### CDN Integration

- Serve static content
- Edge caching for global distribution
- Reduce latency

## Security

1. **Rate Limiting**: Prevent abuse (e.g., 10 URLs/hour per user)
2. **Validation**: Check for malicious URLs, prevent infinite redirects
3. **Authentication**: API keys for programmatic access
4. **HTTPS**: Encrypt all communications
5. **Blacklist**: Block spam/phishing URLs

## Monitoring & Metrics

- Request latency (p50, p95, p99)
- Error rates (4xx, 5xx)
- Cache hit ratio
- Database connection pool utilization
- URL creation rate
- Redirect success rate

## Trade-offs

| Aspect        | Choice       | Trade-off                                      |
| ------------- | ------------ | ---------------------------------------------- |
| ID Generation | Snowflake    | More complex but scalable                      |
| Database      | NoSQL        | Better write performance, eventual consistency |
| URL Length    | 7 characters | 62^7 = 3.5 trillion combinations               |
| Caching       | Redis        | Memory cost vs. performance gain               |

## Follow-up Questions

1. How would you handle URL expiration at scale?
2. How to prevent duplicate short URLs for the same long URL?
3. How to implement analytics without impacting redirect latency?
4. How to handle peak traffic during viral events?
