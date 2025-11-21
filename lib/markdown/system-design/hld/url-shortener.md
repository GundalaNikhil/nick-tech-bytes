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


<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; border: 1px solid #334155; margin: 2rem 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #1e40af; text-align: center;">
      <div style="color: #60a5fa; font-weight: bold; margin-bottom: 0.5rem;">Client Layer</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Web/Mobile Apps</div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #059669; text-align: center;">
      <div style="color: #34d399; font-weight: bold; margin-bottom: 0.5rem;">Load Balancer</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Traffic Distribution</div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #7c3aed; text-align: center;">
      <div style="color: #a78bfa; font-weight: bold; margin-bottom: 0.5rem;">API Gateway</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Request Routing</div>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #dc2626; text-align: center;">
      <div style="color: #f87171; font-weight: bold; margin-bottom: 0.5rem;">Microservices</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Business Logic</div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #d97706; text-align: center;">
      <div style="color: #fbbf24; font-weight: bold; margin-bottom: 0.5rem;">Cache Layer</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Redis/Memcached</div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #0891b2; text-align: center;">
      <div style="color: #22d3ee; font-weight: bold; margin-bottom: 0.5rem;">Message Queue</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Kafka/RabbitMQ</div>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #16a34a; text-align: center;">
      <div style="color: #4ade80; font-weight: bold; margin-bottom: 0.5rem;">Primary Database</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">PostgreSQL/MySQL</div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #8b5cf6; text-align: center;">
      <div style="color: #c084fc; font-weight: bold; margin-bottom: 0.5rem;">Replica Databases</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Read Replicas</div>
    </div>
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 8px; border: 1px solid #ec4899; text-align: center;">
      <div style="color: #f9a8d4; font-weight: bold; margin-bottom: 0.5rem;">Object Storage</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">S3/CDN</div>
    </div>
  </div>
</div>

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

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls to Avoid

- **Hash collisions**: MD5/SHA hashing can collide - need collision detection and retry logic
- **Sequential IDs leaking info**: Auto-increment exposes creation order and volume - use random-looking IDs
- **Not separating read/write paths**: 100:1 read ratio needs dedicated redirect servers
- **Ignoring hot URLs**: Viral links create hotspots - need aggressive caching

### Advanced Considerations

- **Base62 encoding**: Use [a-zA-Z0-9] for short, URL-safe IDs without special characters
- **Snowflake ID generation**: Distributed ID generation without coordination (timestamp + machine ID + sequence)
- **Bloom filters**: Check if URL exists before DB lookup (space-efficient probabilistic)
- **Geographical routing**: Redirect through nearest data center for <50ms latency
- **Custom short URLs**: Allow users to choose vanity URLs (e.g., bit.ly/mycompany) - need uniqueness check

### Creative Solutions

- **Pre-generate ID pools**: Each server gets batch of 10K IDs from counter service, no coordination needed per request
- **Tiered caching**: CDN edge cache (hot) → Redis (warm) → DB (cold)
- **Async analytics**: Don't block redirect for click tracking - use Kafka queue for analytics
- **Smart TTL**: Expire inactive URLs after 2 years to reclaim short codes
- **QR code generation**: Auto-generate QR codes for short URLs (common use case)

### Trade-off Discussions

- **Hash vs Counter**: Hash (stateless, parallel) vs Counter (sequential, needs coordination)
- **301 vs 302 redirect**: 301 (permanent, cached by browser) vs 302 (temporary, fresh stats)
- **SQL vs NoSQL**: SQL (ACID, joins for analytics) vs NoSQL (write throughput, horizontal scaling)
- **Centralized vs Distributed**: Central ID server (simple, single point of failure) vs Distributed (complex, highly available)

### Edge Cases to Mention

- **Malicious URLs**: Phishing/malware links - need URL scanning and blacklist
- **Rate limiting per user**: Prevent spam bots from exhausting URL space
- **Case sensitivity**: Is 'Abc123' same as 'abc123'? (Answer: Treat as case-sensitive for max combinations)
- **Reserved keywords**: Block offensive/reserved words (e.g., 'admin', 'api', profanity)
- **Delete and recreate**: User deletes then recreates - should get same short URL or new? (Answer: New to avoid confusion)

## Follow-up Questions

1. How would you handle URL expiration at scale?
2. How to prevent duplicate short URLs for the same long URL?
3. How to implement analytics without impacting redirect latency?
4. How to handle peak traffic during viral events?
