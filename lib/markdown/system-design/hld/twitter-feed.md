# Twitter Feed System Design

## Overview

Design a scalable social media feed system similar to Twitter that handles millions of users posting tweets, following others, and viewing personalized timelines in real-time.

## Requirements

### Functional Requirements

- Post tweets (text, images, videos up to 280 characters)
- Follow/unfollow users
- View home timeline (tweets from followed users)
- View user timeline (tweets from specific user)
- Like, retweet, and reply to tweets
- Search tweets and users
- Trending topics
- Notifications
- Direct messages

### Non-Functional Requirements

- Low latency (<200ms for timeline load)
- High availability (99.99% uptime)
- Eventually consistent feed
- Handle 500M daily active users
- Support viral content (1M+ likes/retweets)
- Real-time tweet delivery

## Capacity Estimation

### Traffic

- Daily active users: 500 million
- Average tweets per day: 500 million
- Average follows per user: 200
- Timeline requests: 5 billion/day
- Read:Write ratio = 10:1

### Storage

- Tweet storage: 500M × 300 bytes × 365 × 5 = 274TB
- Media files: 100M tweets/day × 2MB = 200TB/day
- User profiles: 500M × 1KB = 500GB
- Relationships: 500M × 200 × 8 bytes = 800GB

### Bandwidth

- Write: 500M tweets/day = 6K tweets/sec
- Read: 5B requests/day = 60K requests/sec
- Peak load: 3x = 180K requests/sec

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

1. **Tweet Service**

   - Create, read, update, delete tweets
   - Media upload handling
   - Tweet validation

2. **Timeline Service**

   - Generate home timeline
   - Generate user timeline
   - Cache management
   - Feed aggregation

3. **Social Graph Service**

   - Follow/unfollow operations
   - Followers/following lists
   - Graph traversal

4. **Notification Service**

   - Like/retweet/reply notifications
   - Push notifications
   - Email digests

5. **Search Service**

   - Full-text search
   - Trending topics
   - Hashtag indexing

6. **Media Service**

   - Image/video upload
   - Compression and optimization
   - CDN distribution

7. **User Service**
   - Authentication
   - Profile management
   - Privacy settings

## Database Schema

### Tweets Table

```sql
{
  "tweetId": "t123",
  "userId": "u456",
  "content": "Hello World!",
  "mediaUrls": ["https://cdn.example.com/img1.jpg"],
  "hashtags": ["#hello", "#world"],
  "mentions": ["@user789"],
  "likeCount": 100,
  "retweetCount": 50,
  "replyCount": 25,
  "createdAt": "2024-01-01T12:00:00Z",
  "isRetweet": false,
  "originalTweetId": null
}
```

### Follows Table (Graph)

```sql
{
  "followerId": "u456",
  "followeeId": "u789",
  "followedAt": "2024-01-01T12:00:00Z"
}
```

### Timeline Cache (Redis)

```sql
Key: "timeline:u456"
Value: [
  {"tweetId": "t789", "score": 1704110400},
  {"tweetId": "t788", "score": 1704110300}
]
```

## Timeline Generation

### Fan-out on Write (Push Model)

**Process:**

1. User posts a tweet
2. System immediately pushes tweet to all followers' timelines
3. Write to timeline cache for each follower
4. Followers see tweet instantly

**Pros:**

- Fast reads (pre-computed)
- Real-time delivery

**Cons:**

- Slow writes for users with many followers
- Lots of duplicate writes

**Best for:** Regular users with <10K followers

### Fan-out on Read (Pull Model)

**Process:**

1. User posts a tweet
2. Store tweet in database
3. On timeline request, fetch tweets from all followed users
4. Merge and sort tweets

**Pros:**

- Fast writes
- No duplicate storage

**Cons:**

- Slow reads (computed on-demand)
- Complex aggregation

**Best for:** Celebrities with millions of followers

### Hybrid Approach (Recommended)

```
IF user.followers < 10000:
    Use fan-out on write
ELSE:
    Use fan-out on read

For timeline generation:
    1. Get tweets from cache (fan-out on write users)
    2. Fetch tweets from celebrities (fan-out on read)
    3. Merge, sort, and return
```

## Timeline Generation Algorithm

```javascript
function generateTimeline(userId, page = 1, limit = 20) {
  // 1. Get list of followed users
  const following = getFollowing(userId);

  // 2. Separate celebrities from regular users
  const [celebrities, regular] = partition(
    following,
    user => user.followers > 10000
  );

  // 3. Get cached tweets from regular users
  const cachedTweets = redis.zrevrange(
    `timeline:${userId}`,
    0,
    limit * 2
  );

  // 4. Fetch recent tweets from celebrities
  const celebrityTweets = db.tweets.find({
    userId: { $in: celebrities },
    createdAt: { $gte: Date.now() - 24h }
  }).sort({ createdAt: -1 }).limit(limit);

  // 5. Merge and sort
  const allTweets = mergeSorted(
    cachedTweets,
    celebrityTweets
  );

  // 6. Paginate and return
  return paginate(allTweets, page, limit);
}
```

## Trending Topics

### Real-time Trend Detection

**Sliding Window Approach:**

```
1. Track hashtag mentions in last 1 hour
2. Compare with previous hour
3. Calculate growth rate
4. Rank by engagement velocity

trendScore = (currentMentions - previousMentions) / previousMentions
```

**Implementation:**

- Stream processing (Kafka + Spark Streaming)
- Time-series data (InfluxDB/TimescaleDB)
- Update every 5 minutes
- Geographic trending (city/country level)

## Search Implementation

### Full-text Search (Elasticsearch)

**Index Structure:**

```json
{
  "tweetId": "t123",
  "content": "Hello World from San Francisco!",
  "userId": "u456",
  "username": "john_doe",
  "hashtags": ["hello", "world"],
  "mentions": ["@jane_doe"],
  "location": "San Francisco",
  "createdAt": "2024-01-01T12:00:00Z",
  "engagementScore": 150
}
```

**Search Queries:**

```
// By keyword
GET /tweets/_search
{
  "query": {
    "match": { "content": "machine learning" }
  }
}

// By hashtag
GET /tweets/_search
{
  "query": {
    "term": { "hashtags": "ai" }
  }
}

// Advanced filters
GET /tweets/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "content": "AI" }},
        { "range": { "createdAt": { "gte": "2024-01-01" }}}
      ],
      "filter": [
        { "term": { "location": "San Francisco" }}
      ]
    }
  },
  "sort": [
    { "engagementScore": "desc" }
  ]
}
```

## Retweet & Like Handling

### Eventual Consistency

**Problem:** Counters can be inconsistent with high load

**Solution:**

1. Increment counter in cache immediately (Redis INCR)
2. Queue update for persistent storage (Kafka)
3. Batch process to update database
4. Reconcile periodically

```javascript
// Like a tweet
async function likeTweet(userId, tweetId) {
  // 1. Update cache immediately
  await redis.incr(`likes:${tweetId}`);
  await redis.sadd(`tweet:${tweetId}:likers`, userId);

  // 2. Queue for persistent storage
  await kafka.produce("likes-topic", {
    userId,
    tweetId,
    action: "like",
    timestamp: Date.now(),
  });

  return { success: true };
}

// Background worker processes queue
async function processLikes() {
  const batch = await kafka.consume("likes-topic", 1000);

  await db.tweets.bulkUpdate(
    batch.map((msg) => ({
      updateOne: {
        filter: { tweetId: msg.tweetId },
        update: { $inc: { likeCount: 1 } },
      },
    }))
  );
}
```

## Notification System

### Types of Notifications

1. **Engagement:** Like, retweet, reply
2. **Social:** New follower
3. **Mentions:** @username
4. **Direct:** DMs

### Implementation

```
1. Event triggers (tweet liked, user followed)
2. Publish to notification queue (Kafka)
3. Fan-out to notification service
4. Filter by user preferences
5. Deliver via push/email/SMS
6. Store in notification history
```

**Deduplication:**

```
"Your tweet was liked by John and 99 others"
instead of
100 separate notifications
```

## Scaling Strategies

### Database Sharding

**Tweet Sharding:**

- Shard by tweetId (hash-based)
- Distribute writes evenly
- Use consistent hashing

**User Sharding:**

- Shard by userId
- Co-locate user data with their tweets
- Reduce cross-shard queries

**Timeline Cache Sharding:**

- Shard by userId
- Each shard handles subset of users
- Redis cluster with master-slave

### Load Balancing

- Round-robin for stateless services
- Consistent hashing for caches
- Geo-based routing for CDN
- Rate limiting per user/IP

### Caching Strategy

```
L1 (CDN): Static assets (images, videos)
L2 (Redis): Timeline cache, user profiles
L3 (Application): In-memory LRU cache
```

## API Design

### Post Tweet

```
POST /api/v1/tweets
Request: {
  "content": "Hello World!",
  "mediaIds": ["m123", "m456"],
  "replyToTweetId": null
}
Response: {
  "tweetId": "t789",
  "createdAt": "2024-01-01T12:00:00Z",
  "url": "https://twitter.com/user/status/t789"
}
```

### Get Timeline

```
GET /api/v1/timeline/home?page=1&limit=20
Response: {
  "tweets": [...],
  "nextPage": 2,
  "hasMore": true
}
```

### Search Tweets

```
GET /api/v1/search?q=machine learning&since=2024-01-01
Response: {
  "tweets": [...],
  "total": 1000,
  "page": 1
}
```

## Security & Privacy

1. **Authentication:** OAuth 2.0, JWT tokens
2. **Rate Limiting:** 300 tweets per 3 hours per user
3. **Content Moderation:** ML models for spam/abuse
4. **Privacy:** Public, protected, private tweets
5. **Data Encryption:** TLS for transit, AES for rest

## Monitoring & Metrics

### Key Metrics

- Tweet latency (p50, p95, p99)
- Timeline load time
- Cache hit ratio
- Database query performance
- Notification delivery rate
- Error rates by service

### Alerts

- High error rate
- Slow query detection
- Cache failures
- Service downtime

## Trade-offs

| Aspect      | Choice         | Trade-off                   |
| ----------- | -------------- | --------------------------- |
| Timeline    | Hybrid fan-out | Complexity vs performance   |
| Consistency | Eventual       | Availability vs consistency |
| Storage     | Denormalized   | Storage vs query speed      |
| Caching     | Aggressive     | Memory cost vs speed        |
| Search      | Elasticsearch  | Cost vs functionality       |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls to Avoid

- **Pure fan-out on write**: Don't fanout celebrity tweets to 100M followers synchronously - system will collapse
- **Underestimating hot spot users**: Celebrities create data skew - need special handling
- **Ignoring timeline ordering**: Timelines must be sorted by time - simple append-only lists won't work with deletions
- **Forgetting about retweets**: Retweets amplify load significantly - need to deduplicate in timelines

### Advanced Considerations

- **Hybrid fan-out strategy**: Fan-out on write for normal users (<1M followers), fan-out on read for celebrities
- **Timeline pagination cursor**: Use (timestamp, tweetId) composite cursor to handle concurrent updates
- **Bloom filters for likes**: Avoid DB hits to check if user liked a tweet - use probabilistic data structure
- **Rate limiting strategies**: Per-user (prevent spam), per-IP (prevent DDoS), per-API-key (fair quotas)
- **Trending topics algorithm**: Count hashtag mentions in sliding time window with exponential decay

### Creative Solutions

- **Pre-compute celebrity timelines**: Cache full timeline for top 1000 users since everyone reads them
- **Lazy timeline generation**: Don't generate timeline until user actually opens app (saves compute for inactive users)
- **Smart caching eviction**: Keep timelines of users who login daily in cache, evict inactive users
- **Notification batching**: Batch "1000 people liked your tweet" instead of 1000 individual notifications
- **Content-based sharding**: Shard by hashtag for trending topics analysis, by user for normal timelines

### Trade-off Discussions

- **Fan-out on write vs read**: Write complexity & storage vs Read latency & compute
- **Push vs Pull notifications**: Battery/bandwidth vs Latency
- **SQL vs NoSQL**: Complex queries & transactions vs Horizontal scaling & availability
- **Eventually consistent counts**: Show "999+ likes" immediately vs wait for accurate count (eventual consistency)

### Edge Cases to Mention

- **Deleted tweet propagation**: User deletes tweet but it's cached in millions of timelines (Answer: Lazy deletion + TTL)
- **Celebrity unfollows**: Elon Musk unfollows - need to remove his tweets from follower's timelines (Answer: Async background job)
- **Timeline inconsistency**: User follows someone but their tweets don't show immediately (Answer: Eventually consistent is OK)
- **Thundering herd**: Celebrity tweets and 100M followers request timeline simultaneously (Answer: Request coalescing + CDN)
- **Zombie accounts**: Millions of bot accounts inflating metrics (Answer: ML-based bot detection + rate limiting)

## Advanced Features

### Moments/Stories

- Curated collections of tweets
- Automatic story generation
- Expire after 24 hours

### Spaces (Audio Rooms)

- Real-time audio streaming
- WebRTC implementation
- Raise hand to speak

### Polls

- Multiple choice questions
- Real-time vote counting
- Expiration time

## Follow-up Questions

1. How to handle tweet edits while maintaining history?
2. How to detect and prevent spam/bot accounts?
3. How to implement threaded conversations?
4. How to scale for a viral tweet (100M+ engagements)?
5. How to implement bookmarks and lists efficiently?
