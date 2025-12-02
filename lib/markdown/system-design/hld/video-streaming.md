# Video Streaming System Design (Netflix/YouTube)

## Overview

Design a scalable video streaming platform capable of serving millions of concurrent users with high-quality video content, adaptive bitrate streaming, and personalized recommendations.

## Requirements

### Functional Requirements

- Upload and store videos in multiple formats and qualities
- Stream videos with adaptive bitrate (ABR) support
- Search and browse video catalog
- User profiles and watch history
- Video recommendations
- Playback controls (play, pause, seek, quality selection)
- Subtitle support
- Like, comment, and share functionality

### Non-Functional Requirements

- Low latency video streaming (<2s startup time)
- High availability (99.99% uptime)
- Support 100M+ concurrent users
- Global content delivery
- Minimal buffering
- Cost-effective storage and bandwidth

## Capacity Estimation

### Storage

- Average video size: 1GB (compressed)
- 1 million videos uploaded daily
- Daily storage: 1TB/day
- 5 years: 1TB × 365 × 5 = 1.8PB
- Multiple qualities: 1.8PB × 5 = 9PB

### Bandwidth

- 100M concurrent viewers
- Average bitrate: 5 Mbps
- Total bandwidth: 500 Tbps peak
- With CDN caching: ~50 Tbps from origin

### Traffic

- Daily video views: 5 billion
- Average video length: 10 minutes
- Total watch time: 50 billion minutes/day

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

1. **Video Upload Service**

   - Handle video file uploads
   - Validate and quarantine content
   - Queue for processing

2. **Video Processing Pipeline**

   - Transcoding to multiple formats (MP4, WebM, HLS)
   - Generate multiple quality levels (360p, 480p, 720p, 1080p, 4K)
   - Thumbnail generation
   - Subtitle extraction/encoding
   - Video metadata extraction

3. **Content Delivery Network (CDN)**

   - Global edge servers
   - Cache popular content
   - Geo-distributed storage
   - Origin shield

4. **Video Storage**

   - Object storage (S3, GCS)
   - Multiple redundancy zones
   - Hot/warm/cold storage tiers

5. **Streaming Service**

   - Adaptive bitrate streaming (HLS/DASH)
   - DRM and encryption
   - Analytics tracking

6. **Recommendation Engine**

   - Machine learning models
   - Collaborative filtering
   - User behavior analysis

7. **API Gateway**

   - Authentication/authorization
   - Rate limiting
   - Request routing

8. **Metadata Service**

   - Video information
   - User profiles
   - Watch history
   - Recommendations

9. **Search Service**
   - Elasticsearch/Solr
   - Auto-complete
   - Fuzzy matching

## Database Schema

### Videos Table

```sql
{
  "videoId": "v123",
  "title": "Sample Video",
  "description": "Video description",
  "uploaderId": "user456",
  "uploadDate": "2024-01-01T00:00:00Z",
  "duration": 600,
  "views": 1000000,
  "likes": 50000,
  "categories": ["education", "technology"],
  "thumbnailUrl": "https://cdn.example.com/thumb.jpg",
  "status": "published"
}
```

### Video Files Table

```sql
{
  "videoId": "v123",
  "quality": "1080p",
  "format": "mp4",
  "url": "https://cdn.example.com/v123/1080p.mp4",
  "size": 1073741824,
  "bitrate": 5000000,
  "codec": "H.264"
}
```

### Watch History Table

```sql
{
  "userId": "user456",
  "videoId": "v123",
  "watchedAt": "2024-01-01T12:00:00Z",
  "duration": 300,
  "completed": false,
  "lastPosition": 300
}
```

## Video Processing Workflow

1. **Upload**

   - User uploads video
   - Store in temporary storage
   - Generate upload ID
   - Return success

2. **Validation**

   - Scan for malware
   - Check copyright (Content ID)
   - Validate format and codec
   - Check file integrity

3. **Transcoding**

   - Parallel processing for multiple qualities
   - Use GPU-accelerated encoders
   - Generate adaptive bitrate manifests
   - Extract audio tracks

4. **Storage**

   - Upload to CDN origin
   - Replicate across regions
   - Update metadata service

5. **Publish**
   - Update video status
   - Trigger indexing
   - Send notifications

## Streaming Protocol

### Adaptive Bitrate Streaming (HLS/DASH)

```
GET /video/v123/manifest.m3u8

#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
1080p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
720p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1000000,RESOLUTION=854x480
480p.m3u8
```

## CDN Architecture

### Edge Locations

- 200+ PoPs worldwide
- Cache popular content at edge
- Origin shield to reduce load
- Regional clusters

### Caching Strategy

- **Hot content**: Cache at all edges (trending videos)
- **Warm content**: Cache at regional level (recent uploads)
- **Cold content**: Serve from origin (old/unpopular videos)
- TTL-based eviction
- Predictive caching based on trends

## Scaling Considerations

### Horizontal Scaling

- Microservices architecture
- Containerization (Docker/Kubernetes)
- Auto-scaling based on load
- Load balancers at each tier

### Database Sharding

- Shard by videoId (hash-based)
- Separate read replicas for analytics
- Write-heavy: Cassandra/DynamoDB
- Read-heavy: Redis/Memcached

### Video Processing

- Distributed transcoding cluster
- Queue-based processing (Kafka/RabbitMQ)
- Spot instances for cost optimization
- Priority queues for paid users

## Cost Optimization

### Storage Tiers

- Hot tier: Frequently accessed (SSD)
- Warm tier: Occasionally accessed (HDD)
- Cold tier: Rarely accessed (Glacier)
- Automatic lifecycle policies

### Bandwidth Optimization

- Aggressive CDN caching
- P2P streaming for live events
- Video compression (H.265, AV1)
- Smart quality selection based on network

### Computing

- Serverless for API gateway
- Spot instances for transcoding
- Reserved instances for core services

## Security & DRM

1. **Content Protection**

   - Widevine, FairPlay, PlayReady
   - Token-based authentication
   - Encrypted streaming (HTTPS)

2. **Copyright Protection**

   - Content ID system
   - Fingerprinting
   - Automated takedowns

3. **User Security**
   - OAuth 2.0 authentication
   - JWT tokens
   - CSRF protection

## Monitoring & Analytics

### Real-time Metrics

- Video buffering ratio
- Startup time (Time to First Byte)
- Concurrent viewers
- CDN hit ratio
- Error rates by region

### Business Metrics

- Watch time
- Engagement rate
- Conversion rate
- Revenue per user

### Player Analytics

- Quality switches
- Rebuffering events
- Drop-off points
- Device/browser distribution

## API Design

### Upload Video

```
POST /api/v1/videos/upload
Headers: Authorization: Bearer <token>
Request: multipart/form-data
Response: {
  "videoId": "v123",
  "uploadUrl": "https://upload.example.com/v123",
  "status": "processing"
}
```

### Get Video Stream

```
GET /api/v1/videos/{videoId}/stream
Response: {
  "manifestUrl": "https://cdn.example.com/v123/manifest.m3u8",
  "thumbnails": [...],
  "subtitles": [...]
}
```

### Search Videos

```
GET /api/v1/search?q=tutorial&limit=20
Response: {
  "results": [...],
  "total": 1000,
  "page": 1
}
```

## Trade-offs

| Aspect      | Choice             | Trade-off                    |
| ----------- | ------------------ | ---------------------------- |
| Video Codec | H.264 vs AV1       | Compatibility vs compression |
| Storage     | Multi-region       | Cost vs availability         |
| CDN         | Push vs Pull       | Control vs simplicity        |
| Processing  | Real-time vs Batch | Speed vs cost                |
| Database    | NoSQL              | Scalability vs consistency   |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls to Avoid

- **Don't ignore the upload pipeline**: Many candidates focus only on playback, but upload optimization (chunked uploads, resumable uploads) is equally critical
- **Underestimating storage costs**: Storing multiple quality versions of billions of videos requires petabytes of storage - discuss cost optimization strategies
- **Forgetting about copyright**: Content ID and DRM are crucial for production systems but often overlooked

### Advanced Considerations

- **Global latency**: Discuss edge caching strategies and how to serve users <100ms away from content
- **Adaptive bitrate streaming**: Explain HLS/DASH and how they dynamically adjust quality based on network conditions
- **Live streaming complexity**: Live has different requirements (low latency, real-time transcoding, chat sync)
- **Monetization**: Ad insertion (VAST/VPAID), premium subscriptions, pay-per-view

### Creative Solutions

- **Predictive pre-caching**: Use ML to predict what users will watch next and pre-position content in CDN edge nodes
- **Peer-to-peer assistance**: For viral videos, use WebRTC to offload some CDN traffic via peer-assisted delivery
- **Smart thumbnail generation**: Use AI to detect engaging moments in videos for thumbnails (faces, action scenes)
- **Regional content popularity**: Don't replicate rarely-watched content globally - use demand-driven replication

### Trade-off Discussions

- **Consistency vs Availability**: Video metadata (views, likes) can be eventually consistent, but payment transactions must be strongly consistent
- **Push vs Pull CDN**: Push gives you control but requires managing cache invalidation; Pull is simpler but slower for first viewer
- **Real-time vs Batch**: Live transcoding costs 10x more but batch processing can take hours - discuss hybrid approaches

### Edge Cases to Mention

- **Simultaneous viral traffic**: What if 100M users request same video at once? (Answer: CDN distribution, origin shield, rate limiting)
- **Copyright strikes during upload**: How to prevent pirated content? (Answer: Content fingerprinting, automated scanning)
- **Network switches during playback**: User moves from WiFi to cellular - how to maintain smooth playback? (Answer: Adaptive bitrate + buffer strategy)
- **Storage failures**: What if a datacenter storing original videos goes down? (Answer: Multi-region replication, erasure coding)

## Advanced Features

### Live Streaming

- Low latency protocols (WebRTC, RTMP)
- Real-time transcoding
- Chat integration
- DVR functionality

### Offline Viewing

- Download management
- Encryption for downloads
- Expiration policies
- Storage quota management

### Smart Recommendations

- Collaborative filtering
- Content-based filtering
- Deep learning models
- A/B testing

## Follow-up Questions

1. How would you handle live streaming with <3s latency?
2. How to reduce storage costs for rarely watched videos?
3. How to implement a fair Content ID system?
4. How to handle sudden viral video traffic spikes?
5. How would you implement seek-ahead buffering?
