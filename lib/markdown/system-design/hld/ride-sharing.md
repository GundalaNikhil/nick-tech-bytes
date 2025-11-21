# Ride Sharing System Design (Uber/Ola)

## Overview

Design a scalable ride-sharing platform that connects riders with nearby drivers, handles real-time location tracking, dynamic pricing, and processes millions of rides daily.

## Requirements

### Functional Requirements

- User registration (riders and drivers)
- Request and book rides
- Real-time driver location tracking
- ETA calculation and route optimization
- Fare calculation with surge pricing
- Payment processing
- Ratings and reviews
- Ride history
- In-app chat and calling
- Ride sharing and pooling

### Non-Functional Requirements

- Low latency (<2s for ride matching)
- High availability (99.99% uptime)
- Handle 10M+ concurrent users
- Accurate location tracking (GPS precision)
- Real-time updates
- Data consistency for payments
- Scalable to multiple cities/countries

## Capacity Estimation

### Traffic

- Daily active users: 50 million
- Average rides per day: 10 million
- Peak hours: 3x normal load
- Concurrent active rides: 1 million

### Storage

- User profiles: 100M × 1KB = 100GB
- Driver profiles: 10M × 2KB = 20GB
- Ride records: 10M/day × 2KB × 365 × 5 years = 36TB
- Location updates: 10M drivers × 10 updates/min × 100 bytes = 1GB/min

### Bandwidth

- Location updates: 1GB/min = 16 MB/s
- Map data: 100MB/user/month
- Real-time notifications

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

1. **User Service**

   - Registration and authentication
   - Profile management
   - Preferences and settings

2. **Driver Service**

   - Driver onboarding and verification
   - Vehicle information
   - Availability status
   - Earnings tracking

3. **Location Service**

   - Real-time GPS tracking
   - Location updates
   - Geospatial indexing
   - Driver proximity search

4. **Matching Service**

   - Find nearby drivers
   - Match rider with driver
   - Optimization algorithms
   - Queue management

5. **Trip Service**

   - Trip creation and management
   - Status tracking
   - Route optimization
   - ETA calculation

6. **Pricing Service**

   - Base fare calculation
   - Surge pricing
   - Discounts and promotions
   - Fare estimation

7. **Payment Service**

   - Payment processing
   - Wallet management
   - Refunds and adjustments
   - Invoice generation

8. **Notification Service**

   - Push notifications
   - SMS alerts
   - Email notifications
   - In-app messages

9. **Routing Service**

   - Route calculation
   - ETA estimation
   - Traffic data integration
   - Alternative routes

10. **Analytics Service**
    - Real-time dashboards
    - Heat maps
    - Demand prediction
    - Driver performance

## Database Schema

### Users Table

```sql
{
  "userId": "u123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "rating": 4.8,
  "totalRides": 150,
  "status": "active",
  "paymentMethods": ["card_456", "wallet_789"]
}
```

### Drivers Table

```sql
{
  "driverId": "d456",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "vehicleId": "v789",
  "rating": 4.9,
  "totalTrips": 500,
  "status": "available",
  "location": {
    "lat": 37.7749,
    "lng": -122.4194,
    "timestamp": "2024-01-01T12:00:00Z"
  },
  "documentsVerified": true
}
```

### Trips Table

```sql
{
  "tripId": "t789",
  "riderId": "u123",
  "driverId": "d456",
  "pickupLocation": {
    "lat": 37.7749,
    "lng": -122.4194,
    "address": "123 Main St"
  },
  "dropLocation": {
    "lat": 37.7849,
    "lng": -122.4294,
    "address": "456 Oak Ave"
  },
  "status": "completed",
  "fare": 25.50,
  "distance": 10.5,
  "duration": 1200,
  "requestedAt": "2024-01-01T12:00:00Z",
  "startedAt": "2024-01-01T12:05:00Z",
  "completedAt": "2024-01-01T12:25:00Z",
  "paymentMethod": "card",
  "rating": 5
}
```

### Location Updates (Time-series DB)

```sql
{
  "driverId": "d456",
  "lat": 37.7749,
  "lng": -122.4194,
  "bearing": 45,
  "speed": 30,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Ride Matching Algorithm

### Step 1: Find Nearby Drivers

```
1. Get rider's location (lat, lng)
2. Query geospatial index (QuadTree/Geohash)
3. Find available drivers within 5km radius
4. Filter by vehicle type preference
5. Sort by distance and rating
```

### Step 2: Match & Notify

```
1. Select top 3-5 drivers
2. Send ride request notifications
3. First driver to accept gets the ride
4. Timeout: 30 seconds (then try next driver)
5. Update driver status to "busy"
```

### Step 3: Optimize

- Consider driver's direction of travel
- Predict acceptance probability
- Balance driver earnings
- Minimize rider wait time

## Geospatial Indexing

### QuadTree Implementation

```
- Divide map into grid cells
- Store drivers in cells based on location
- O(log n) search complexity
- Update cell when driver moves
- Adjust granularity by zoom level
```

### Geohash

```
- Encode lat/lng into short string
- Nearby locations have similar prefixes
- Easy to query with prefix matching
- Example: 9q8yy (San Francisco)
```

## Surge Pricing Algorithm

### Dynamic Pricing Factors

```javascript
surgeFactor =
  baseMultiplier *
  (demand / supply) *
  timeOfDay *
  weatherCondition *
  eventMultiplier;

finalFare = baseFare * surgeFactor;
```

### Implementation

1. Monitor supply-demand ratio per region
2. Apply surge when demand > supply × 1.2
3. Cap maximum surge (3x-5x)
4. Notify users of surge before booking
5. Re-calculate every 5 minutes

## Real-time Location Tracking

### Location Update Strategy

**Drivers:**

- Every 4 seconds when moving
- Every 30 seconds when idle
- Use GPS + WiFi + Cell tower triangulation
- Batch updates to reduce server load

**Riders:**

- During active trip: every 10 seconds
- Show estimated route
- Update ETA dynamically

### WebSocket Implementation

```
Client → Server: Location update
Server → Broadcast: To rider's device
Server → Store: In time-series database
Server → Update: Geospatial index
```

## Payment Processing

### Payment Flow

1. **Pre-authorization**

   - Verify payment method
   - Hold estimated amount
   - Prevent insufficient funds

2. **Trip Completion**

   - Calculate final fare
   - Charge actual amount
   - Release hold

3. **Settlement**
   - Transfer to driver (minus commission)
   - Handle disputes
   - Generate invoices

### Payment Methods

- Credit/Debit cards (Stripe/Razorpay)
- Digital wallets
- Cash (COD)
- Corporate accounts
- Buy Now Pay Later (BNPL)

## Scaling Strategies

### Horizontal Scaling

- Microservices architecture
- Region-based sharding
- Load balancers at each tier
- Auto-scaling groups

### Database Optimization

**Write-heavy (Location updates):**

- Use Cassandra/ScyllaDB
- Time-series optimization
- Partition by driverId + timestamp

**Read-heavy (User profiles):**

- Redis caching
- Read replicas
- CDN for static assets

**Transactional (Payments):**

- PostgreSQL with ACID
- Master-slave replication
- Distributed transactions

### Caching Strategy

```
- Active drivers: Redis (TTL: 5 minutes)
- User profiles: Cache aside
- Fare estimates: Cache by route
- Surge pricing: Redis pub/sub
```

## Notification System

### Push Notifications

**Use Cases:**

- Ride accepted
- Driver arriving
- Trip started
- Payment received
- Promotions

**Implementation:**

- FCM (Firebase Cloud Messaging)
- APNs (Apple Push Notification)
- Fallback to SMS
- Delivery guarantees

### In-app Messaging

- WebSocket connections
- Message queuing (Kafka)
- Read receipts
- Typing indicators

## API Design

### Request Ride

```
POST /api/v1/rides/request
Request: {
  "pickupLocation": {"lat": 37.7749, "lng": -122.4194},
  "dropLocation": {"lat": 37.7849, "lng": -122.4294},
  "vehicleType": "sedan",
  "paymentMethod": "card_456"
}
Response: {
  "rideId": "r123",
  "estimatedFare": 25.50,
  "estimatedTime": 5,
  "status": "searching"
}
```

### Update Driver Location

```
POST /api/v1/drivers/location
Request: {
  "driverId": "d456",
  "lat": 37.7749,
  "lng": -122.4194,
  "bearing": 45,
  "speed": 30
}
Response: {
  "success": true,
  "nearbyRides": []
}
```

### Get Ride Status

```
GET /api/v1/rides/{rideId}/status
Response: {
  "status": "in_progress",
  "driver": {...},
  "currentLocation": {...},
  "eta": 10,
  "distance": 5.2
}
```

## Security & Safety

### User Safety

- Real-time trip tracking
- SOS button with emergency services
- Share trip details with contacts
- Driver background checks
- In-app voice calling (masked numbers)

### Fraud Prevention

- Fake GPS detection
- Anomaly detection (unusual routes)
- Payment verification
- Driver identity verification
- Machine learning for fraud patterns

### Data Privacy

- Encrypt sensitive data
- GDPR compliance
- Anonymize location history
- Secure payment processing (PCI DSS)

## Monitoring & Alerts

### Real-time Metrics

- Active rides count
- Driver availability by region
- Average wait time
- Surge pricing status
- Payment success rate

### Critical Alerts

- Service downtime
- Payment failures
- GPS tracking issues
- Abnormal cancellation rates

## Trade-offs

| Aspect           | Choice          | Trade-off                     |
| ---------------- | --------------- | ----------------------------- |
| Location Updates | Frequent        | Accuracy vs battery/bandwidth |
| Matching         | Fast vs Optimal | Speed vs best match           |
| Database         | NoSQL           | Scalability vs consistency    |
| Pricing          | Dynamic         | Revenue vs user experience    |
| Caching          | Aggressive      | Freshness vs performance      |

## 💡 Interview Tips & Out-of-the-Box Thinking

### Common Pitfalls to Avoid

- **Ignoring real-time constraints**: Location updates need sub-second latency - don't suggest batch processing
- **Oversimplifying matching**: Matching isn't just "closest driver" - consider traffic, ratings, acceptance rate, destination direction
- **Forgetting driver supply**: System must incentivize drivers (surge pricing) when demand exceeds supply
- **Underestimating WebSocket load**: Millions of persistent connections require specialized infrastructure

### Advanced Considerations

- **Geospatial indexing**: Redis GEO commands or PostGIS for efficient radius queries (GEORADIUS)
- **Consistent hashing for location sharding**: Partition map by geohash to distribute load
- **ETA accuracy**: Use historical traffic data + real-time conditions + ML models for better predictions
- **Fraud detection**: Detect fake GPS spoofing, ghost rides, payment fraud patterns
- **Driver routing optimization**: Pre-position drivers in high-demand areas using predictive models

### Creative Solutions

- **Destination-aware matching**: Match drivers already heading in the rider's direction (reduces deadheading)
- **Batch matching**: For high-volume areas, match multiple riders to drivers every few seconds instead of one-by-one
- **Predictive pre-positioning**: Send drivers to areas with predicted demand (concerts, airports at specific times)
- **Peer-to-peer carpooling**: Allow riders going same direction to share rides (like UberPool)
- **Blockchain for transparency**: Immutable trip records and fare calculations for dispute resolution

### Trade-off Discussions

- **Matching speed vs quality**: Fast matching (<2s) might not find best driver; slower matching (5s) finds better match but worse UX
- **Location update frequency**: Every 5s saves battery/bandwidth but less accurate; every 1s drains battery but smooth tracking
- **Surge pricing transparency**: Show multiplier upfront (honest but scary) vs hide it (better conversion but trust issues)
- **Database choice**: SQL for ACID transactions vs NoSQL for horizontal scaling

### Edge Cases to Mention

- **Network partition during trip**: Driver and rider lose connection - how to reconcile state? (Answer: Event sourcing with timestamps)
- **Simultaneous accepts**: Two drivers accept same ride due to race condition (Answer: Distributed locks with TTL)
- **GPS drift**: Driver appears in water/building (Answer: Map-matching algorithms to snap to roads)
- **Surge pricing spikes**: 10x surge during emergency evacuation (Answer: Cap maximum surge, prioritize fairness)
- **Driver cancellation abuse**: Driver cancels to force surge pricing (Answer: Track cancellation patterns, penalize serial offenders)

## Advanced Features

### Ride Pooling

- Match riders with similar routes
- Split fare calculation
- Pickup/drop sequencing
- Maximum detour limits

### Route Optimization

- Traffic-aware routing
- Alternative route suggestions
- Multi-stop support
- Avoid tolls/highways option

### AI/ML Features

- Demand prediction
- Surge pricing optimization
- Fraud detection
- ETA accuracy improvement
- Driver churn prediction

## Follow-up Questions

1. How to handle network partitions during active rides?
2. How to ensure fair distribution of rides among drivers?
3. How to handle concurrent ride requests for the same driver?
4. How to optimize for cross-region trips?
5. How to implement features for accessibility (wheelchair, pets)?
