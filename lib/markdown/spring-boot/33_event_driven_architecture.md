# Tutorial 33: Event-Driven Architecture in Spring Boot

## Understanding the Question

**Why do services need to communicate through events instead of direct calls?**

Direct service calls (coupling):

```
UserService → EmailService → SMSService → NotificationService
If any service is down → entire chain fails
Hard to scale: each service waits for response
Hard to test: mock all dependencies
```

Event-driven architecture:

```
UserService → publishes "UserCreatedEvent"
                    ↓
            Event is broadcast
                    ↓
        ┌─────────────────────────────────────┐
        ↓             ↓            ↓           ↓
    EmailService  SMSService  LoggingService  AnalyticsService

Each service listens independently, processes asynchronously.
If EmailService is down → others still process.
Services don't wait for each other.
Loosely coupled, highly scalable.
```

**Event-driven architecture decouples services** through asynchronous message exchange. When something important happens (user created, order placed, payment processed), the system publishes an event. Other services listen and react without direct coupling.

## Core Concepts

### Event-Driven vs Request-Response

```
Request-Response (Synchronous):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service A calls Service B
    ↓
Service B processes, returns response
    ↓
Service A continues

Problems:
- Service B down → Service A fails
- Service B slow → Service A waits
- Tight coupling (must know Service B's API)

Event-Driven (Asynchronous):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service A publishes event
    ↓
Returns immediately (doesn't wait)
    ↓
Services B, C, D listen independently
    ↓
Each processes at its own pace

Benefits:
- Service B down → doesn't affect Service A
- Service A never waits (always responsive)
- Loose coupling (no API knowledge needed)
- Easy to scale (add listeners without changing publisher)
```

### Event Types & Patterns

```java
// 1. Domain Event (something meaningful happened)
public class UserCreatedEvent extends ApplicationEvent {
  private Long userId;
  private String email;
  private LocalDateTime createdAt;

  // This event means: A new user just joined the system
}

// 2. Integration Event (cross-service communication)
public class OrderPlacedEvent {
  private Long orderId;
  private Long customerId;
  private BigDecimal totalAmount;

  // This event bridges Order Service and Inventory Service
}

// 3. Process Event (workflow coordination)
public class PaymentProcessedEvent {
  private Long paymentId;
  private PaymentStatus status;
  private String reference;

  // Triggers next step: send confirmation email
}

// Event Pattern Hierarchy:
ApplicationEvent (Spring's base)
    ├─ UserEvent
    │   ├─ UserCreatedEvent
    │   ├─ UserDeletedEvent
    │   └─ UserUpdatedEvent
    ├─ OrderEvent
    │   ├─ OrderCreatedEvent
    │   ├─ OrderShippedEvent
    │   └─ OrderDeliveredEvent
    └─ PaymentEvent
        ├─ PaymentInitiatedEvent
        ├─ PaymentSucceededEvent
        └─ PaymentFailedEvent
```

### Pub-Sub Mechanism (Publisher-Subscriber)

```
Spring's ApplicationEventPublisher:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Publisher (Producer):
┌─────────────────────────────────┐
│ Service creates business event  │
│ Publishes via ApplicationEvent- │
│ Publisher.publishEvent()        │
└─────────────────────────────────┘
          ↓
    Event dispatched
          ↓
┌─────────────────────────────────┐
│ Event Listener 1 (Email)        │ @EventListener
├─────────────────────────────────┤
│ Receives event, processes it    │
│ Independently, async            │
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│ Event Listener 2 (Analytics)    │ @EventListener
├─────────────────────────────────┤
│ Receives event, processes it    │
│ Independently, async            │
└─────────────────────────────────┘

Key: All listeners activated from single publishEvent() call
     Each processes independently (order not guaranteed)
     Publisher doesn't wait for listeners to complete
```

### Spring Events: ApplicationEvent & @EventListener

```java
// Step 1: Create event class
public class UserCreatedEvent extends ApplicationEvent {

  private final Long userId;
  private final String email;
  private final String name;

  public UserCreatedEvent(Object source, Long userId, String email, String name) {
    super(source);
    this.userId = userId;
    this.email = email;
    this.name = name;
  }

  // Getters
  public Long getUserId() { return userId; }
  public String getEmail() { return email; }
  public String getName() { return name; }
}

// Step 2: Publish event
@Service
public class UserService {

  @Autowired
  private ApplicationEventPublisher eventPublisher;

  @Transactional
  public User createUser(CreateUserRequest request) {
    User user = new User(request.getEmail(), request.getName());
    User saved = repository.save(user);

    // Publish event - listeners will be notified
    eventPublisher.publishEvent(
      new UserCreatedEvent(this, saved.getId(), saved.getEmail(), saved.getName())
    );

    return saved;
  }
}

// Step 3: Listen to event
@Component
public class EmailNotificationListener {

  @EventListener
  public void onUserCreated(UserCreatedEvent event) {
    // Automatically called when UserCreatedEvent is published
    System.out.println("User created: " + event.getEmail());

    // Send welcome email
    emailService.sendWelcomeEmail(event.getEmail(), event.getName());
  }
}

@Component
public class AnalyticsListener {

  @EventListener
  public void onUserCreated(UserCreatedEvent event) {
    // Another listener - receives same event
    System.out.println("User signup tracked: " + event.getUserId());

    // Track analytics
    analyticsService.trackUserSignup(event.getUserId());
  }
}

// Result: Both listeners called independently when user created
```

### Asynchronous Event Listeners

```java
// By default: listeners execute synchronously (same thread)
// Makes event publishing blocking - waits for all listeners

@Component
public class SlowEmailListener {

  @EventListener
  public void onUserCreated(UserCreatedEvent event) {
    // This runs synchronously - user creation waits for email!
    emailService.sendEmail(event.getEmail());  // 5 seconds
  }
}

// Solution: Make listener async
@Component
public class AsyncEmailListener {

  @Async  // Executes in thread pool, doesn't block
  @EventListener
  public void onUserCreated(UserCreatedEvent event) {
    // Runs in separate thread
    // User creation returns immediately
    emailService.sendEmail(event.getEmail());
  }
}

// Enable async processing
@Configuration
@EnableAsync
public class AsyncConfiguration {

  @Bean
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(2);
    executor.setMaxPoolSize(5);
    executor.setQueueCapacity(100);
    executor.setThreadNamePrefix("event-listener-");
    executor.initialize();
    return executor;
  }
}

// Order of operations:
// 1. User saved to database
// 2. Event published
// 3. Async listeners triggered (email, analytics)
// 4. User creation returns (doesn't wait for email)
```

### Event Ordering & Conditional Listeners

```java
@Component
public class ConditionalEventListeners {

  @EventListener(condition = "#event.email.endsWith('@company.com')")
  public void onCompanyUserCreated(UserCreatedEvent event) {
    // Only called if email is from company domain
    internalNotificationService.notifyAdmin(event);
  }

  @EventListener(condition = "#event.premium == true")
  public void onPremiumUserCreated(UserCreatedEvent event) {
    // Only if user is premium
    premiumService.activateFeatures(event.getUserId());
  }

  @Order(1)  // Executes first
  @EventListener
  public void firstListener(UserCreatedEvent event) {
    System.out.println("1. Processing user");
  }

  @Order(2)  // Executes second
  @EventListener
  public void secondListener(UserCreatedEvent event) {
    System.out.println("2. Notifying teams");
  }

  @Order(3)  // Executes last
  @EventListener
  public void thirdListener(UserCreatedEvent event) {
    System.out.println("3. Updating analytics");
  }
}
```

## Complete Implementation Examples

### Example 1: Complete E-Commerce Event-Driven Flow

```java
// Events
public class OrderPlacedEvent extends ApplicationEvent {
  private final Long orderId;
  private final Long customerId;
  private final List<OrderItem> items;
  private final BigDecimal totalAmount;

  public OrderPlacedEvent(Object source, Long orderId, Long customerId,
    List<OrderItem> items, BigDecimal totalAmount) {
    super(source);
    this.orderId = orderId;
    this.customerId = customerId;
    this.items = items;
    this.totalAmount = totalAmount;
  }

  // Getters...
}

public class PaymentProcessedEvent extends ApplicationEvent {
  private final Long orderId;
  private final PaymentStatus status;
  private final String transactionId;

  public PaymentProcessedEvent(Object source, Long orderId,
    PaymentStatus status, String transactionId) {
    super(source);
    this.orderId = orderId;
    this.status = status;
    this.transactionId = transactionId;
  }

  // Getters...
}

// Services
@Service
@RequiredArgsConstructor
public class OrderService {

  private final OrderRepository orderRepository;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public Order placeOrder(PlaceOrderRequest request) {
    // Create order
    Order order = new Order(
      request.getCustomerId(),
      request.getItems(),
      request.getTotalAmount()
    );

    Order saved = orderRepository.save(order);

    // Publish event - notifies inventory, payment, notification services
    eventPublisher.publishEvent(
      new OrderPlacedEvent(
        this,
        saved.getId(),
        saved.getCustomerId(),
        saved.getItems(),
        saved.getTotalAmount()
      )
    );

    return saved;
  }
}

// Event Listeners
@Component
@RequiredArgsConstructor
public class InventoryService {

  private final InventoryRepository inventoryRepository;

  @Async
  @EventListener
  public void onOrderPlaced(OrderPlacedEvent event) {
    // Decrease inventory for each item
    event.getItems().forEach(item -> {
      Inventory inv = inventoryRepository.findById(item.getProductId())
        .orElseThrow();
      inv.decreaseStock(item.getQuantity());
      inventoryRepository.save(inv);
    });

    System.out.println("Inventory updated for order: " + event.getOrderId());
  }
}

@Component
@RequiredArgsConstructor
public class PaymentService {

  private final PaymentGateway paymentGateway;
  private final ApplicationEventPublisher eventPublisher;

  @Async
  @EventListener
  public void onOrderPlaced(OrderPlacedEvent event) {
    try {
      // Process payment
      String transactionId = paymentGateway.charge(
        event.getTotalAmount(),
        event.getCustomerId()
      );

      // Publish payment success event
      eventPublisher.publishEvent(
        new PaymentProcessedEvent(
          this,
          event.getOrderId(),
          PaymentStatus.SUCCEEDED,
          transactionId
        )
      );

    } catch (PaymentException e) {
      // Publish payment failure event
      eventPublisher.publishEvent(
        new PaymentProcessedEvent(
          this,
          event.getOrderId(),
          PaymentStatus.FAILED,
          null
        )
      );
    }
  }
}

@Component
@RequiredArgsConstructor
public class NotificationService {

  private final EmailService emailService;

  @Async
  @EventListener
  public void onOrderPlaced(OrderPlacedEvent event) {
    // Send order confirmation email
    emailService.sendOrderConfirmation(
      event.getCustomerId(),
      event.getOrderId(),
      event.getTotalAmount()
    );
  }

  @Async
  @EventListener
  public void onPaymentProcessed(PaymentProcessedEvent event) {
    if (event.getStatus() == PaymentStatus.SUCCEEDED) {
      // Send payment receipt
      emailService.sendPaymentReceipt(event.getOrderId(), event.getTransactionId());
    } else {
      // Send payment failed notification
      emailService.sendPaymentFailedNotification(event.getOrderId());
    }
  }
}

@Component
@RequiredArgsConstructor
public class AnalyticsService {

  private final AnalyticsRepository analyticsRepository;

  @EventListener
  public void onOrderPlaced(OrderPlacedEvent event) {
    // Track order event
    analyticsRepository.save(new AnalyticsEvent(
      "order_placed",
      event.getOrderId(),
      LocalDateTime.now()
    ));
  }

  @EventListener
  public void onPaymentProcessed(PaymentProcessedEvent event) {
    // Track payment event
    analyticsRepository.save(new AnalyticsEvent(
      "payment_" + event.getStatus().toString().toLowerCase(),
      event.getOrderId(),
      LocalDateTime.now()
    ));
  }
}
```

### Example 2: Event Sourcing Pattern

```java
// Event store: Append-only log of all events
public class EventStore {

  private final EventRepository eventRepository;

  // Persist event
  public void append(DomainEvent event) {
    StoredEvent stored = new StoredEvent(
      event.getClass().getName(),
      event.getAggregateId(),
      event,
      LocalDateTime.now()
    );
    eventRepository.save(stored);
  }

  // Replay events to reconstruct state
  public List<DomainEvent> getEvents(Long aggregateId) {
    return eventRepository.findByAggregateId(aggregateId)
      .stream()
      .map(StoredEvent::getEvent)
      .toList();
  }
}

// Domain event
public class UserCreatedEvent implements DomainEvent {
  private final Long userId;
  private final String email;
  private final LocalDateTime createdAt;

  @Override
  public Long getAggregateId() { return userId; }
}

// Reconstruct user from events
@Service
public class UserAggregateService {

  private final EventStore eventStore;

  public User reconstructUser(Long userId) {
    List<DomainEvent> events = eventStore.getEvents(userId);
    User user = new User();

    for (DomainEvent event : events) {
      if (event instanceof UserCreatedEvent uce) {
        user.setId(uce.getUserId());
        user.setEmail(uce.getEmail());
      } else if (event instanceof UserEmailChangedEvent uece) {
        user.setEmail(uece.getNewEmail());
      } else if (event instanceof UserDeletedEvent ude) {
        user.setDeleted(true);
      }
    }

    return user;
  }
}
```

## Best Practices

### ✅ DO

```java
// 1. Create clear, domain-specific events
public class UserSignupCompletedEvent extends ApplicationEvent {
  // Name describes what happened in the domain
  private final Long userId;
  private final String email;
}

// 2. Publish events from service tier
@Service
public class UserService {
  @Transactional
  public void createUser(CreateUserRequest req) {
    User user = repository.save(new User(req));
    eventPublisher.publishEvent(new UserCreatedEvent(this, user.getId()));
  }
}

// 3. Make listeners async for I/O operations
@Async
@EventListener
public void onUserCreated(UserCreatedEvent event) {
  emailService.send(event.getEmail());  // Doesn't block
}

// 4. Listen to specific event types
@EventListener
public void handle(UserCreatedEvent event) {
  // Only called for UserCreatedEvent, not other events
}

// 5. Use conditional listeners
@EventListener(condition = "#event.isPremium")
public void handlePremiumUser(UserCreatedEvent event) { }

// 6. Order listeners when sequence matters
@Order(1)
@EventListener
public void validateFirst(OrderEvent event) { }

@Order(2)
@EventListener
public void processSecond(OrderEvent event) { }

// 7. Handle exceptions in listeners
@EventListener
public void handle(UserCreatedEvent event) {
  try {
    externalService.notify(event);
  } catch (Exception e) {
    logger.error("Notification failed", e);
    // Don't let one listener failure affect others
  }
}
```

### ❌ DON'T

```java
// 1. Don't make synchronous calls from listeners
@EventListener
public void handle(UserCreatedEvent event) {
  externalApi.slowCall();  // Blocks event publishing!
  // Use @Async instead
}

// 2. Don't publish events from controller
@PostMapping
public void create(@RequestBody CreateUserRequest req) {
  userService.create(req);
  eventPublisher.publishEvent(...);  // WRONG!
  // Publish from service tier
}

// 3. Don't rely on event listener order (unless explicit @Order)
// Event listener execution order is not guaranteed

// 4. Don't catch all exceptions silently
@EventListener
public void handle(UserCreatedEvent event) {
  try {
    process(event);
  } catch (Exception e) {
    // Don't swallow - at least log
  }
}

// 5. Don't publish events with sensitive data
new UserCreatedEvent(this, userId, password, ssn);  // WRONG!
// Only include necessary information

// 6. Don't create tight coupling through events
// Events should be domain-driven, not implementation details

// 7. Don't forget transactions
@EventListener
public void handle(UserCreatedEvent event) {
  // If this modifies database, needs @Transactional!
  repository.save(entity);
}
```

## Advanced Topics

### Message Queue Integration (RabbitMQ/Kafka)

```java
// For distributed systems, use message queues
@Configuration
public class RabbitMqEventConfig {

  @Bean
  public Queue userCreatedQueue() {
    return new Queue("user.created");
  }

  @Bean
  public RabbitTemplate rabbitTemplate(ConnectionFactory cf) {
    return new RabbitTemplate(cf);
  }
}

@Service
public class EventPublisher {

  @Autowired
  private RabbitTemplate rabbitTemplate;

  public void publishEvent(DomainEvent event) {
    rabbitTemplate.convertAndSend("user.created", event);
  }
}

@Component
public class RemoteEventListener {

  @RabbitListener(queues = "user.created")
  public void onUserCreated(UserCreatedEvent event) {
    // Receives events from other services
    process(event);
  }
}
```

## Practice Questions & Answers

**Q1: What's the difference between request-response and event-driven?**

A: Request-response is synchronous (blocks, waits for response) and tightly coupled. Event-driven is asynchronous (publishes and continues) and loosely coupled. Events enable independent scaling and failure isolation.

**Q2: When should listeners be async?**

A: Always make I/O operations async (@Async): email, external API calls, database queries. Keep CPU-only operations synchronous (unless they're slow).

**Q3: How do you ensure event listener reliability?**

A: Use message queues (RabbitMQ, Kafka) for distributed systems. Add error handling and logging in listeners. Monitor listener execution.

**Q4: Can you rely on event listener order?**

A: Not unless you use `@Order` annotation. Even with @Order, consider making each listener independent of execution order.

## Key Takeaways

1. **Event-driven decouples services**: Publisher doesn't know about listeners
2. **Asynchronous processing**: Services process independently at their own pace
3. **ApplicationEventPublisher**: Spring's built-in pub-sub mechanism
4. **@EventListener & @Async**: Make listeners async for non-blocking behavior
5. **Loose coupling**: Add/remove listeners without changing publisher
6. **Domain events**: Name events after business concepts, not implementation
7. **Error handling**: Each listener should handle errors independently
8. **Message queues**: Use for distributed systems (RabbitMQ, Kafka)
9. **Event ordering**: Use @Order when sequence matters
10. **Performance**: Async listeners prevent blocking on external I/O
