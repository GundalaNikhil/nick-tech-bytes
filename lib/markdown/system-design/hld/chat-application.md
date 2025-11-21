# Chat Application System Design

## Overview

Design a real-time chat application similar to WhatsApp, Slack, or Discord that supports one-on-one messaging, group chats, and multimedia sharing.

## Requirements

### Functional Requirements

1. **User Management**

   - User registration and authentication
   - User profiles with status (online/offline/away)
   - Contact management

2. **Messaging**

   - One-on-one chat
   - Group chat (up to 256 members)
   - Text, emoji, and multimedia messages (images, videos, files)
   - Message delivery status (sent, delivered, read)
   - Typing indicators

3. **Real-time Features**

   - Instant message delivery
   - Online presence
   - Push notifications

4. **Additional Features**
   - Message history and search
   - File sharing
   - Voice/video calls (optional)
   - End-to-end encryption

### Non-Functional Requirements

1. **Low Latency**: Message delivery < 100ms
2. **High Availability**: 99.99% uptime
3. **Scalability**: Support millions of concurrent users
4. **Consistency**: Messages delivered in order
5. **Security**: End-to-end encryption, secure authentication

## Capacity Estimation

### Scale

- 500 million daily active users (DAU)
- Each user sends 50 messages/day
- Total: 25 billion messages/day
- Peak: 300K messages/second

### Storage

- Average message size: 100 bytes
- Daily storage: 25B × 100 bytes = 2.5 TB/day
- For 5 years: 2.5 TB × 365 × 5 = 4.5 PB
- With media: ~10 PB

### Bandwidth

- Ingress: 300K msg/s × 100 bytes = 30 MB/s
- Egress: 30 MB/s × 2 (delivery to recipient) = 60 MB/s
- With media: 10x higher

## High-Level Architecture


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

```
┌─────────────┐
│   Client    │
│  (Mobile/   │
│   Web App)  │
└──────┬──────┘
       │
       ├─ HTTP/HTTPS (REST API)
       ├─ WebSocket/WSS (Real-time)
       │
┌──────▼──────────────────────┐
│   API Gateway / LB          │
│   - Rate Limiting           │
│   - Authentication          │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│   WebSocket Servers         │
│   - Connection Management   │
│   - Presence Service        │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│   Application Servers       │
│   - Message Service         │
│   - User Service            │
│   - Group Service           │
└──────┬──────────────────────┘
       │
       ├─────────────┬─────────────┬──────────────┐
       │             │             │              │
┌──────▼──────┐ ┌───▼────┐ ┌─────▼─────┐ ┌──────▼──────┐
│  Message DB │ │ User DB│ │  Cache    │ │  File Store │
│ (Cassandra) │ │(Postgres│ │  (Redis)  │ │    (S3)     │
└─────────────┘ └────────┘ └───────────┘ └─────────────┘
       │
┌──────▼──────────────────────┐
│   Message Queue (Kafka)     │
│   - Message delivery        │
│   - Async processing        │
└─────────────────────────────┘
```

## Database Design

### User Service (PostgreSQL)

```sql
Users {
  user_id: UUID PK
  username: string UNIQUE
  email: string UNIQUE
  phone: string UNIQUE
  password_hash: string
  profile_picture: string
  status: enum (online, offline, away)
  last_seen: timestamp
  created_at: timestamp
}

Contacts {
  contact_id: UUID PK
  user_id: UUID FK
  contact_user_id: UUID FK
  nickname: string
  blocked: boolean
  created_at: timestamp
}
```

### Message Service (Cassandra)

```cql
-- One-on-one messages
CREATE TABLE messages_by_conversation (
  conversation_id UUID,
  message_id TIMEUUID,
  sender_id UUID,
  receiver_id UUID,
  content TEXT,
  message_type TEXT, -- text, image, video, file
  media_url TEXT,
  status TEXT, -- sent, delivered, read
  created_at TIMESTAMP,
  PRIMARY KEY ((conversation_id), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);

-- Group messages
CREATE TABLE group_messages (
  group_id UUID,
  message_id TIMEUUID,
  sender_id UUID,
  content TEXT,
  message_type TEXT,
  media_url TEXT,
  created_at TIMESTAMP,
  PRIMARY KEY ((group_id), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);

-- Message status tracking
CREATE TABLE message_delivery (
  message_id TIMEUUID,
  user_id UUID,
  status TEXT,
  timestamp TIMESTAMP,
  PRIMARY KEY ((message_id), user_id)
);
```

### Group Service (PostgreSQL)

```sql
Groups {
  group_id: UUID PK
  name: string
  description: text
  avatar_url: string
  created_by: UUID FK
  created_at: timestamp
}

GroupMembers {
  group_id: UUID FK
  user_id: UUID FK
  role: enum (admin, member)
  joined_at: timestamp
  PRIMARY KEY (group_id, user_id)
}
```

## Real-time Communication

### WebSocket Protocol

**Connection Establishment:**

```javascript
// Client connects
ws = new WebSocket('wss://chat.example.com/ws');
ws.send({
  type: 'auth',
  token: 'JWT_TOKEN'
});

// Server response
{
  type: 'auth_success',
  user_id: 'user_123',
  session_id: 'session_456'
}
```

**Message Flow:**

```javascript
// Send message
{
  type: 'send_message',
  conversation_id: 'conv_123',
  receiver_id: 'user_456',
  content: 'Hello!',
  message_type: 'text'
}

// Receive message
{
  type: 'new_message',
  message_id: 'msg_789',
  sender_id: 'user_123',
  content: 'Hello!',
  timestamp: '2024-01-01T12:00:00Z'
}

// Acknowledgment
{
  type: 'ack',
  message_id: 'msg_789',
  status: 'delivered'
}
```

## Message Delivery Flow

### One-on-One Chat

1. **User A sends message:**

   ```
   Client A → API Gateway → Message Service
   ```

2. **Message Service:**

   - Generate message_id (TIMEUUID)
   - Store in Cassandra
   - Publish to Kafka topic

3. **Message Queue processes:**

   - Check if User B is online
   - If online: Push via WebSocket
   - If offline: Queue for later delivery
   - Send push notification

4. **Delivery confirmation:**
   - User B receives message
   - Send ACK back to server
   - Update delivery status
   - Notify User A

### Group Chat

1. **User A sends to group (10 members):**

   ```
   Client A → Message Service → Store in DB
   ```

2. **Fan-out delivery:**

   ```
   For each member in group:
     - Check online status
     - If online: Push via WebSocket
     - If offline: Queue for push notification
   ```

3. **Optimization:**
   - Use fan-out on write (eager)
   - Or fan-out on read (lazy) for large groups

## WebSocket Connection Management

### Connection Pool

```java
class WebSocketConnectionManager {
  // Map: user_id -> Set of WebSocket connections
  private Map<String, Set<WebSocketSession>> userConnections;

  // Map: session_id -> user_id
  private Map<String, String> sessionToUser;

  public void addConnection(String userId, WebSocketSession session) {
    userConnections
      .computeIfAbsent(userId, k -> new ConcurrentHashSet<>())
      .add(session);
    sessionToUser.put(session.getId(), userId);
  }

  public void removeConnection(WebSocketSession session) {
    String userId = sessionToUser.remove(session.getId());
    if (userId != null) {
      userConnections.get(userId).remove(session);
    }
  }

  public boolean isUserOnline(String userId) {
    Set<WebSocketSession> sessions = userConnections.get(userId);
    return sessions != null && !sessions.isEmpty();
  }

  public void sendToUser(String userId, Message message) {
    Set<WebSocketSession> sessions = userConnections.get(userId);
    if (sessions != null) {
      sessions.forEach(session ->
        session.sendMessage(new TextMessage(serialize(message)))
      );
    }
  }
}
```

## Presence Service

### Online Status Tracking

**Heartbeat Mechanism:**

```javascript
// Client sends heartbeat every 30 seconds
setInterval(() => {
  ws.send({ type: 'heartbeat' });
}, 30000);

// Server updates last_seen
if (timeSinceLastHeartbeat > 60 seconds) {
  updateStatus(userId, 'offline');
}
```

**Redis for Presence:**

```redis
# Online users (sorted set with last_seen timestamp)
ZADD online_users <timestamp> <user_id>

# Check if user online (within last 60 seconds)
ZRANGEBYSCORE online_users <now-60> <now>

# Update presence
ZADD online_users <current_timestamp> <user_id>
```

## Scalability Strategies

### 1. Horizontal Scaling of WebSocket Servers

**Challenge**: User connections distributed across multiple servers

**Solution**: Use Redis Pub/Sub for inter-server communication

```
User A (Server 1) → Message Service → Redis Pub/Sub
                                          ↓
                    Server 2 → User B (connected to Server 2)
```

### 2. Database Sharding

**Message Database (Cassandra):**

- Partition by conversation_id
- Ensures all messages in a conversation on same node
- Natural ordering by TIMEUUID

**User Database:**

- Shard by user_id
- Consistent hashing for even distribution

### 3. Caching Strategy

**Redis Cache:**

```
1. User sessions and online status
2. Recent messages (last 100 per conversation)
3. User profiles and contacts
4. Group member lists
```

**Cache-aside pattern:**

```java
Message getMessage(String conversationId, String messageId) {
  // Try cache first
  Message msg = redis.get(conversationId + ":" + messageId);
  if (msg != null) return msg;

  // Cache miss: query database
  msg = cassandra.query(conversationId, messageId);

  // Update cache
  redis.setex(conversationId + ":" + messageId, 3600, msg);
  return msg;
}
```

## Media Handling

### File Upload Flow

1. **Client requests upload URL:**

   ```
   POST /api/upload/request
   {
     "file_type": "image/jpeg",
     "file_size": 2048000
   }
   ```

2. **Server responds with signed URL:**

   ```
   {
     "upload_url": "https://s3.amazonaws.com/...",
     "media_id": "media_123"
   }
   ```

3. **Client uploads directly to S3:**

   ```
   PUT https://s3.amazonaws.com/...
   [File Content]
   ```

4. **Client sends message with media_id:**
   ```
   {
     "type": "send_message",
     "content": "",
     "message_type": "image",
     "media_id": "media_123"
   }
   ```

## Security

### End-to-End Encryption

**Signal Protocol (Double Ratchet):**

```
1. Key Exchange: Use X3DH protocol
2. Each message encrypted with unique key
3. Forward secrecy: Old keys deleted after use
```

**Implementation:**

```javascript
// Generate key pair for user
const keyPair = await crypto.generateKeyPair("ECDH");

// Exchange public keys
const sharedSecret = await crypto.deriveSharedSecret(
  myPrivateKey,
  theirPublicKey
);

// Encrypt message
const encryptedMsg = await crypto.encrypt(message, derivedKey);

// Only encrypted content sent to server
```

### Authentication

- JWT tokens for API
- WebSocket authentication via token
- Refresh token rotation

## API Design

### REST APIs

```http
# User Management
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/:userId
PUT    /api/users/:userId
GET    /api/users/:userId/contacts

# Messaging
POST   /api/conversations
GET    /api/conversations/:conversationId/messages
POST   /api/messages
PUT    /api/messages/:messageId/status
DELETE /api/messages/:messageId

# Groups
POST   /api/groups
GET    /api/groups/:groupId
POST   /api/groups/:groupId/members
DELETE /api/groups/:groupId/members/:userId
GET    /api/groups/:groupId/messages

# Media
POST   /api/upload/request
GET    /api/media/:mediaId
```

## Monitoring & Observability

### Key Metrics

- WebSocket connection count
- Message delivery latency (p50, p95, p99)
- Failed message delivery rate
- Online users count
- Database query latency
- Cache hit ratio

### Alerts

- WebSocket connection failures
- Database replication lag
- High message queue backlog
- Spike in failed deliveries

## Trade-offs

| Aspect     | Choice                 | Trade-off                                           |
| ---------- | ---------------------- | --------------------------------------------------- |
| Database   | Cassandra for messages | Eventual consistency vs. strong consistency         |
| Real-time  | WebSocket              | Persistent connections vs. HTTP polling             |
| Delivery   | Push notifications     | Battery drain vs. instant delivery                  |
| Encryption | End-to-end             | Server can't read messages vs. features like search |
| Group Chat | Fan-out on write       | Write amplification vs. read performance            |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls

- **Not handling reconnection properly**: Network drops are common - need exponential backoff and message queue
- **Forgetting group chat optimization**: Don't send N individual messages for N-member group - batch and fanout
- **Ignoring typing indicators**: Seems trivial but creates massive traffic at scale
- **Message ordering issues**: Network delays can deliver messages out-of-order - use sequence numbers

### Advanced Considerations

- **Connection pooling per server**: Limit to ~100K connections per server, horizontal scale for more
- **Message deduplication**: Network retries cause duplicates - use message IDs with idempotent processing
- **Backpressure handling**: Slow client shouldn't block server - use bounded buffers with circuit breakers
- **Multi-device sync**: Same account on phone + web + desktop needs consistent message state
- **Efficient storage with TTL**: Delete old messages to save space (Cassandra TTL)

### Creative Solutions

- **Adaptive push strategy**: Active users get WebSocket, inactive get push notifications (saves battery)
- **Message compression**: Compress message batches before sending (especially for media)
- **Lazy loading chat history**: Load recent 50 messages, paginate older on scroll
- **Smart presence throttling**: Update "last seen" every 30s instead of real-time (reduces writes 60x)
- **Regional routing**: Route messages through geographically closest data centers

### Trade-off Discussions

- **E2E encryption**: Privacy vs Searchability and server-side features
- **WebSocket vs SSE vs Long Polling**: Bidirectional + efficiency vs Simplicity vs Wide compatibility
- **Message retention**: Forever (user expectation) vs Time-based deletion (cost savings)
- **Typing indicators**: Real-time UX vs Network overhead and battery drain

### Edge Cases

- **Message sent but no ACK**: Sender doesn't know if delivered (Answer: Retry with idempotency key)
- **User deletes account**: What happens to their messages in group chats? (Answer: Keep messages, anonymize sender)
- **Clock skew**: Sender clock ahead of server (Answer: Use server timestamp as source of truth)
- **Simultaneous message in group**: Race condition in ordering (Answer: Lamport timestamps or vector clocks)
- **Connection hijacking**: Attacker steals session token (Answer: Periodic token rotation, device fingerprinting)

## Follow-up Questions

1. **How to handle offline message delivery?**

   - Queue messages in database
   - Send push notifications
   - Deliver on reconnection
   - Batch delivery for efficiency

2. **How to implement read receipts?**

   - Track last_read_message_id per user
   - Update on client acknowledgment
   - Display double check marks

3. **How to scale to 1 billion users?**

   - Geographic distribution (CDN, regional servers)
   - More sharding and partitioning
   - Microservices architecture
   - Caching at multiple layers

4. **How to implement voice/video calls?**

   - Use WebRTC for peer-to-peer
   - TURN/STUN servers for NAT traversal
   - Media servers for group calls
   - Fallback to server relay if P2P fails

5. **How to prevent spam and abuse?**
   - Rate limiting per user
   - ML-based spam detection
   - User reporting and blocking
   - Phone number verification
