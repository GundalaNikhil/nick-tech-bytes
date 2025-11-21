# E-Commerce Platform System Design

## Overview

Design a scalable e-commerce platform like Amazon, Flipkart, or Shopify that handles product catalog, inventory, orders, payments, and recommendations.

## Requirements

### Functional Requirements

- User registration and authentication
- Product browsing and search
- Shopping cart management
- Order placement and tracking
- Payment processing
- Inventory management
- Product recommendations
- Reviews and ratings
- Seller dashboard

### Non-Functional Requirements

- High availability (99.99% uptime)
- Handle millions of concurrent users
- Low latency for search (<200ms)
- Strong consistency for inventory and payments
- Eventual consistency for reviews/recommendations
- PCI-DSS compliance for payments

## Capacity Estimation

### Scale

- 100 million active users
- 10 million products
- 1 million orders per day
- Peak traffic during sales: 10x normal load

### Storage

- User data: 100M × 1KB = 100GB
- Product catalog: 10M × 10KB = 100GB
- Orders (5 years): 1M × 365 × 5 × 2KB = 3.65TB
- Images/videos: ~10TB

### Traffic

- 100M DAU, 10 requests/user/day = 1B requests/day
- Peak: 50K requests/second during flash sales

## High-Level Architecture

### Microservices

1. **User Service**

   - Authentication & Authorization
   - Profile management
   - Address book

2. **Product Catalog Service**

   - Product information
   - Categories & attributes
   - Search indexing

3. **Inventory Service**

   - Stock management
   - Warehouse allocation
   - Real-time availability

4. **Cart Service**

   - Add/remove items
   - Cart persistence
   - Price calculations

5. **Order Service**

   - Order placement
   - Order tracking
   - Order history

6. **Payment Service**

   - Payment gateway integration
   - Transaction processing
   - Refunds

7. **Recommendation Service**

   - Personalized recommendations
   - Collaborative filtering
   - Content-based filtering

8. **Search Service**

   - Elasticsearch/Solr
   - Faceted search
   - Auto-complete

9. **Notification Service**

   - Email/SMS/Push notifications
   - Order updates
   - Marketing campaigns

10. **Review & Rating Service**
    - Product reviews
    - Seller ratings
    - Spam detection

## Database Design

### User Database (PostgreSQL)

```sql
Users {
  user_id: UUID PK
  email: string
  phone: string
  name: string
  created_at: timestamp
}

Addresses {
  address_id: UUID PK
  user_id: UUID FK
  street: string
  city: string
  state: string
  zipcode: string
  is_default: boolean
}
```

### Product Database (PostgreSQL + Elasticsearch)

```sql
Products {
  product_id: UUID PK
  seller_id: UUID FK
  name: string
  description: text
  category_id: UUID FK
  price: decimal
  created_at: timestamp
}

ProductInventory {
  product_id: UUID PK
  warehouse_id: UUID FK
  quantity: int
  reserved: int
  updated_at: timestamp
}
```

### Order Database (PostgreSQL)

```sql
Orders {
  order_id: UUID PK
  user_id: UUID FK
  total_amount: decimal
  status: enum
  created_at: timestamp
}

OrderItems {
  order_item_id: UUID PK
  order_id: UUID FK
  product_id: UUID FK
  quantity: int
  price: decimal
  status: enum
}
```

### Cart Database (Redis)

```json
{
  "user_123": {
    "items": [
      { "product_id": "p1", "quantity": 2, "price": 29.99 },
      { "product_id": "p2", "quantity": 1, "price": 49.99 }
    ],
    "updated_at": "2024-01-01T12:00:00Z"
  }
}
```

## Key Workflows

### Order Placement Flow

1. **Validation Phase**

   ```
   - Validate cart items
   - Check product availability
   - Calculate final price (discounts, taxes)
   ```

2. **Reservation Phase**

   ```
   - Reserve inventory (pessimistic locking)
   - Create pending order
   - Initiate payment
   ```

3. **Payment Phase**

   ```
   - Process payment via gateway
   - Handle success/failure
   - Update order status
   ```

4. **Confirmation Phase**
   ```
   - Deduct inventory
   - Send confirmation email
   - Trigger fulfillment
   - Clear cart
   ```

### Inventory Management

**Challenge**: Prevent overselling during concurrent orders

**Solution 1**: Pessimistic Locking

```sql
BEGIN TRANSACTION;
SELECT quantity FROM inventory
WHERE product_id = ?
FOR UPDATE;

-- Check if quantity >= requested
UPDATE inventory
SET quantity = quantity - ?, reserved = reserved + ?
WHERE product_id = ?;

COMMIT;
```

**Solution 2**: Optimistic Locking (Version-based)

```sql
UPDATE inventory
SET quantity = quantity - ?, version = version + 1
WHERE product_id = ? AND version = ?;

-- Retry if affected rows = 0
```

**Solution 3**: Queue-based (Recommended for flash sales)

```
- Use message queue (Kafka/RabbitMQ)
- Sequential processing of orders
- Prevents race conditions
```

## Search Architecture

### Elasticsearch Index

```json
{
  "product_id": "p123",
  "name": "iPhone 15 Pro",
  "category": "Electronics > Phones",
  "brand": "Apple",
  "price": 999.99,
  "rating": 4.5,
  "tags": ["smartphone", "5G", "premium"],
  "in_stock": true
}
```

### Search Features

- Full-text search with relevance scoring
- Faceted filtering (price, brand, rating)
- Auto-complete with prefix matching
- Spell correction
- Personalized ranking

## Caching Strategy

### Multi-layer Caching

1. **CDN Layer**: Static assets, product images
2. **Application Cache (Redis)**

   - Product details (TTL: 1 hour)
   - Category listings (TTL: 6 hours)
   - User sessions
   - Shopping carts

3. **Database Query Cache**: Frequently accessed queries

### Cache Invalidation

- Write-through for critical data (inventory)
- Cache-aside for read-heavy data (products)
- Pub/sub for distributed cache invalidation

## Payment Processing

### Payment Flow

```
1. User submits payment
2. Create payment intent
3. Redirect to payment gateway (Stripe/PayPal)
4. Gateway processes payment
5. Webhook callback on success/failure
6. Update order status
7. Idempotency check (prevent double charging)
```

### Idempotency

```
POST /api/payments
Headers: {
  "Idempotency-Key": "unique_request_id"
}

// Server checks if request with same key already processed
if (processedRequests.has(idempotencyKey)) {
  return cachedResponse;
}
```

## Recommendation System

### Collaborative Filtering

- User-based: Find similar users, recommend their purchases
- Item-based: Find similar products, recommend those

### Content-Based Filtering

- Product attributes (category, brand, price range)
- User preferences and browsing history

### Hybrid Approach

```
1. Real-time: Recent views, cart items
2. Batch processing (Apache Spark):
   - Train ML models on purchase history
   - Generate recommendations daily
3. A/B testing for algorithm performance
```

## Scaling Strategies

### Database Sharding

- **User data**: Shard by user_id
- **Product data**: Shard by category or seller
- **Orders**: Shard by date range

### Read Replicas

- Master-slave replication for read-heavy operations
- Route reads to replicas, writes to master

### Microservices Scaling

- Horizontal scaling based on traffic
- Kubernetes for orchestration
- Service mesh (Istio) for communication

## Security

1. **Authentication**: OAuth 2.0, JWT tokens
2. **Authorization**: Role-based access control (RBAC)
3. **Data Encryption**: TLS for transit, AES-256 for rest
4. **PCI-DSS Compliance**: Never store CVV, tokenize cards
5. **Rate Limiting**: Prevent DDoS and scraping
6. **Input Validation**: Prevent SQL injection, XSS

## Monitoring & Observability

### Metrics

- Order success/failure rate
- Payment processing time
- Search latency
- Inventory accuracy
- Cart abandonment rate

### Logging

- Centralized logging (ELK stack)
- Distributed tracing (Jaeger)
- Error tracking (Sentry)

### Alerts

- High error rates
- Payment failures
- Low inventory
- System downtime

## Trade-offs

| Aspect      | Choice               | Trade-off                                  |
| ----------- | -------------------- | ------------------------------------------ |
| Consistency | Eventual for reviews | Better performance, slightly stale data    |
| Consistency | Strong for inventory | Slower writes, prevents overselling        |
| Database    | SQL for transactions | Complex sharding vs. NoSQL simplicity      |
| Search      | Elasticsearch        | Additional infrastructure cost             |
| Payment     | Third-party gateway  | Transaction fees vs. PCI compliance burden |

## Follow-up Questions

1. How to handle flash sales with 1M concurrent users?
2. How to implement dynamic pricing?
3. How to detect and prevent fraud?
4. How to handle returns and refunds?
5. How to implement multi-currency support?
