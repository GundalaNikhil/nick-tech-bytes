# WhatsApp Backend System Design

## Overview

Design a scalable real-time messaging system similar to WhatsApp that supports billions of messages daily, end-to-end encryption, multimedia sharing, and group chats with high reliability and low latency.

## Requirements

### Functional Requirements

- One-to-one messaging
- Group messaging (up to 256 members)
- Media sharing (images, videos, documents, voice notes)
- Message delivery status (sent, delivered, read)
- End-to-end encryption
- Voice and video calls
- Status/Stories (24-hour expiration)
- Last seen and online status
- Message search
- Backup and restore

### Non-Functional Requirements

- Real-time message delivery (<100ms latency)
- High availability (99.999% uptime)
- End-to-end encrypted
- Support 2 billion users
- Handle 100 billion messages/day
- Offline message queuing
- Cross-platform support

## Capacity Estimation

### Traffic

- Daily active users: 2 billion
- Messages per day: 100 billion
- Messages per second: 1.15 million avg, 3.5 million peak
- Group messages: 20% of total

### Storage

- Text message: ~1KB (including metadata)
- Daily text storage: 100B × 1KB = 100TB/day
- Media storage: 20B messages/day × 500KB = 10PB/day
- 5 years: 100TB × 365 × 5 = 182PB (text + media)

### Bandwidth

- Text: 100TB/day = 1.2GB/s
- Media: 10PB/day = 116GB/s
- Total: ~120GB/s

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

1. **Gateway Service**

   - WebSocket/long-polling connections
   - Load balancing
   - Authentication
   - Connection management

2. **Message Service**

   - Message processing
   - Encryption handling
   - Delivery coordination
   - Message persistence

3. **Session Service**

   - Track online/offline status
   - Manage active connections
   - User presence

4. **Media Service**

   - Upload/download handling
   - Compression and optimization
   - CDN integration

5. **Group Service**

   - Group management
   - Member operations
   - Message fan-out

6. **Notification Service**

   - Push notifications
   - Offline message alerts

7. **Call Service**

   - WebRTC signaling
   - TURN/STUN servers
   - Call quality management

8. **Storage Service**
   - Message persistence
   - Media storage
   - Backup management

## Database Schema

### Messages Table

```sql
{
  "messageId": "m123",
  "senderId": "u456",
  "recipientId": "u789", // null for group messages
  "groupId": null,
  "content": "encrypted_content",
  "type": "text", // text, image, video, audio, document
  "mediaUrl": null,
  "timestamp": "2024-01-01T12:00:00Z",
  "status": "delivered", // sent, delivered, read
  "encryptionKey": "encrypted_key",
  "isDeleted": false,
  "expiresAt": null
}
```

### Users Table

```sql
{
  "userId": "u456",
  "phoneNumber": "+1234567890",
  "name": "John Doe",
  "profilePicture": "https://cdn.example.com/profile.jpg",
  "status": "Hey there! I am using WhatsApp",
  "lastSeen": "2024-01-01T12:00:00Z",
  "publicKey": "base64_encoded_key",
  "deviceIds": ["d123", "d456"]
}
```

### Groups Table

```sql
{
  "groupId": "g789",
  "name": "Family Group",
  "createdBy": "u456",
  "createdAt": "2024-01-01T12:00:00Z",
  "members": [
    {"userId": "u456", "role": "admin", "joinedAt": "2024-01-01T12:00:00Z"},
    {"userId": "u789", "role": "member", "joinedAt": "2024-01-01T12:05:00Z"}
  ],
  "groupIcon": "https://cdn.example.com/group.jpg",
  "description": "Family chat"
}
```

### Connection State (Redis)

```sql
Key: "user:u456:connection"
Value: {
  "socketId": "ws123",
  "deviceId": "d456",
  "serverId": "srv1",
  "connectedAt": "2024-01-01T12:00:00Z",
  "lastActivity": "2024-01-01T12:30:00Z"
}
```

## Message Flow

### One-to-One Message

```
1. Sender → Gateway (WebSocket)
2. Gateway → Message Service
3. Encrypt message (already encrypted on client)
4. Store in database
5. Check recipient online status
6. If online: Push to recipient's gateway
7. If offline: Queue for push notification
8. Send delivery receipt to sender
9. Recipient reads → Send read receipt
```

### Group Message

```
1. Sender → Gateway
2. Message Service validates sender is group member
3. Store message once in database
4. Fan-out to all group members:
   - Query active connections
   - Send to online members
   - Queue push notifications for offline
5. Collect delivery receipts
6. Send aggregated status to sender
```

## End-to-End Encryption

### Signal Protocol Implementation

**Key Exchange:**

```
1. Each user generates:
   - Identity Key Pair (long-term)
   - Signed Pre-Key
   - One-Time Pre-Keys (batch of 100)

2. Server stores public keys

3. Sender retrieves recipient's public keys

4. Establish session using Double Ratchet Algorithm

5. Derive message keys for encryption
```

**Message Encryption:**

```
plaintext → AES-256 encryption → ciphertext
Key derivation from shared secret
Forward secrecy (new key for each message)
```

**Server Role:**

- Store and forward encrypted messages
- Never has access to decryption keys
- Cannot read message content

## WebSocket Connection Management

### Connection Lifecycle

```
1. Client connects to Gateway
2. Authenticate using JWT token
3. Upgrade to WebSocket
4. Register in Session Service (Redis)
5. Send queued messages
6. Heartbeat every 30 seconds
7. On disconnect: Mark offline, keep session for 30s
8. On reconnect: Resume from last ack'd message
```

### Load Balancing

```
- Consistent hashing by userId
- Sticky sessions for WebSocket
- Health checks every 10 seconds
- Graceful shutdown (30s drain)
```

### Handling Disconnections

```javascript
// Client-side reconnection logic
let reconnectAttempts = 0;
const maxAttempts = 5;

function reconnect() {
  if (reconnectAttempts >= maxAttempts) {
    return fallbackToPolling();
  }

  const backoffTime = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);

  setTimeout(() => {
    reconnectAttempts++;
    establishConnection();
  }, backoffTime);
}
```

## Offline Message Handling

### Message Queue

```
1. When recipient offline:
   - Store message in database
   - Add to user's message queue (Redis)
   - Send push notification

2. When user comes online:
   - Fetch pending messages from queue
   - Deliver in order
   - Mark as delivered
   - Clear from queue

3. Message retention:
   - 30 days for undelivered messages
   - Delete after delivery confirmation
```

### Push Notifications

```
- Priority: High for messages, Low for read receipts
- Batching: Group multiple messages
- Sound/vibration: Configurable
- Preview: Sender name only (encrypted content)
```

## Media Handling

### Upload Flow

```
1. Client compresses media
2. Upload to Media Service
3. Generate thumbnail (for images/videos)
4. Store in object storage (S3/GCS)
5. CDN distribution
6. Send media URL in message
7. Recipient downloads from CDN
```

### Optimization

```
- Images: JPEG compression, WebP format
- Videos: H.264 encoding, multiple resolutions
- Audio: Opus codec, variable bitrate
- Documents: As-is, size limit 100MB
```

### Storage Tiers

```
- Hot: Recent 7 days (SSD, CDN cached)
- Warm: 8-30 days (HDD)
- Cold: 30+ days (Glacier)
- Auto-delete after 1 year (optional)
```

## Voice and Video Calls

### WebRTC Architecture

```
1. Caller initiates call
2. Signaling through WhatsApp servers:
   - Exchange SDP offers/answers
   - ICE candidate gathering
3. Establish P2P connection (STUN)
4. If P2P fails, relay through TURN servers
5. End-to-end encrypted audio/video streams
6. Call quality monitoring
```

### Call Routing

```
- Direct P2P: Best quality, lowest latency
- TURN relay: If firewall blocks P2P
- Media servers: For group calls (>4 people)
- Selective Forwarding Unit (SFU) architecture
```

## Status/Stories

### Temporary Content

```
1. Upload status (image/video/text)
2. Store in object storage
3. Set TTL: 24 hours
4. Distribute to followers
5. Track views
6. Auto-delete after expiration
```

### Privacy Controls

```
- My contacts only
- My contacts except...
- Only share with...
- Custom privacy settings
```

## Scaling Strategies

### Horizontal Scaling

- Microservices per function
- Stateless services (except Gateway)
- Auto-scaling based on load
- Multi-region deployment

### Database Sharding

**Message Sharding:**

```
- Shard by senderId (hash-based)
- Co-locate user's messages
- Reduce cross-shard queries
```

**User Sharding:**

```
- Shard by userId
- Store profile, contacts, settings together
```

### Caching Strategy

```
L1: Client-side (recent chats)
L2: Redis (active users, online status)
L3: CDN (media files, profile pictures)
```

### Message Storage Optimization

```
- Compress old messages
- Archive to cold storage after 90 days
- Implement retention policies
- Client-side backups (encrypted)
```

## API Design

### Send Message

```
POST /api/v1/messages/send
Request: {
  "recipientId": "u789",
  "content": "encrypted_content",
  "type": "text",
  "encryptionKey": "encrypted_key"
}
Response: {
  "messageId": "m123",
  "timestamp": "2024-01-01T12:00:00Z",
  "status": "sent"
}
```

### Get Messages

```
GET /api/v1/messages?chatId=u789&limit=50&before=m123
Response: {
  "messages": [...],
  "hasMore": true,
  "nextCursor": "m100"
}
```

### Create Group

```
POST /api/v1/groups/create
Request: {
  "name": "Family Group",
  "members": ["u789", "u456"]
}
Response: {
  "groupId": "g123",
  "createdAt": "2024-01-01T12:00:00Z"
}
```

## Security & Privacy

1. **End-to-End Encryption:** Signal Protocol
2. **Authentication:** JWT tokens, device verification
3. **Transport Security:** TLS 1.3
4. **Data at Rest:** AES-256 encryption
5. **Privacy:** Minimal metadata, no message content stored
6. **Two-Factor Authentication:** OTP via SMS

## Monitoring & Metrics

### Key Metrics

- Message delivery time (p50, p95, p99)
- WebSocket connection count
- Message throughput (messages/sec)
- Delivery success rate
- Online users count
- Failed delivery rate

### Alerts

- High message latency (>500ms)
- WebSocket disconnections spike
- Database replication lag
- Storage capacity threshold
- API error rate increase

## Trade-offs

| Aspect     | Choice       | Trade-off                        |
| ---------- | ------------ | -------------------------------- |
| Encryption | E2E (Signal) | Security vs server-side features |
| Connection | WebSocket    | Real-time vs resource usage      |
| Storage    | Distributed  | Availability vs consistency      |
| Media      | CDN          | Cost vs performance              |
| Calls      | P2P WebRTC   | Quality vs infrastructure cost   |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls to Avoid

- **Forgetting offline delivery**: Messages must be queued when recipient is offline and delivered on reconnection
- **Ignoring double-tick/blue-tick logic**: Need separate ACKs for sent, delivered, read - each requiring different tracking
- **Underestimating group chat complexity**: Sending to 256 members isn't just 256 1:1 messages - need fan-out optimization
- **Not considering multi-device sync**: Users have phone + web + desktop all needing same messages in real-time

### Advanced Considerations

- **Connection management at scale**: 2B+ persistent WebSocket connections requires specialized load balancers and sticky sessions
- **Message ordering guarantees**: Use vector clocks or timestamp + sequence number to maintain order across distributed systems
- **Efficient storage**: Cassandra with TTL for old messages, Redis for recent hot messages
- **Backpressure handling**: When receiver is slow, need to buffer messages without OOM - disk-backed queues
- **Presence scalability**: "Last seen" updates from 2B users create massive write load - batch and throttle

### Creative Solutions

- **Hybrid push model**: Use FCM/APNS for offline users, WebSocket for online users (saves battery)
- **Smart media compression**: Compress images/videos client-side before upload (WhatsApp uses custom codecs)
- **Predictive pre-loading**: Pre-fetch media from frequent contacts when user opens app
- **Delivery receipt batching**: Batch read receipts per conversation instead of per-message (reduces network calls)
- **Regional message routing**: Route messages through regional data centers to reduce latency

### Trade-off Discussions

- **E2E Encryption**: Maximum privacy but cannot do server-side search, cloud backup is tricky, multi-device sync complex
- **WebSocket vs Long Polling**: WebSocket is efficient but complex (firewall issues, reconnection logic) vs Long Polling simpler but higher latency
- **Store messages forever vs TTL**: Storage cost vs user expectation (WhatsApp doesn't store messages long-term)
- **Group size limits**: Larger groups (>256) increase fanout cost and coordination complexity

### Edge Cases to Mention

- **Message delivered but sender offline**: Sender won't see double-tick until they reconnect (Answer: Store delivery status in DB)
- **Clock skew between devices**: Different device times cause message ordering issues (Answer: Use server timestamp as source of truth)
- **User blocks mid-delivery**: Message queued but user blocks sender before receiving (Answer: Drop message, don't deliver)
- **Simultaneous edits in groups**: Two admins remove same member simultaneously (Answer: Last-write-wins with timestamp)
- **Network partition**: User appears online in one region but offline in another (Answer: Eventually consistent presence with gossip protocol)
- **Message replay attacks**: E2E encrypted but attacker resends old message (Answer: Use message sequence numbers and session keys)

## Advanced Features

### Disappearing Messages

- Self-destruct timer (5s to 7 days)
- Delete from both devices
- Screenshots disabled (attempt)

### Broadcast Lists

- Send to multiple recipients
- Appears as individual chats
- No group metadata

### Business API

- Automated messages
- Chatbots integration
- Customer support
- Payment integration

## Follow-up Questions

1. How to handle message ordering in group chats?
2. How to implement message search across devices?
3. How to ensure message delivery when changing phones?
4. How to prevent spam and abuse?
5. How to implement voice message transcription?
