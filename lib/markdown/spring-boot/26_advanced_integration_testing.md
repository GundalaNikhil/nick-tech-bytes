# Tutorial 26: Advanced Integration Testing in Spring Boot

## Understanding the Question

**Why isn't Unit Testing enough for Spring Boot applications?**

Unit tests verify business logic in isolation with mocked dependencies. But Spring Boot applications involve:

- Database transactions and persistence
- Spring container configuration and bean wiring
- HTTP request/response handling
- Transaction boundaries and rollback behavior
- Integration between multiple services

A component might work perfectly in isolation but fail when integrated with the database, Spring context, or other services. Advanced integration testing ensures everything works together. It's the bridge between unit tests (fast, isolated) and end-to-end tests (slow, full stack).

## Core Concepts

### Testing Pyramid Redux

```
Testing Cost & Speed:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fast          │  Unit Tests (70%)        │ Cost: Low
              │  Integration Tests (20%) │ Cost: Medium
Slow          │  E2E Tests (10%)         │ Cost: High
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Advanced Integration Testing Layer:
These tests verify:
- Database persistence
- Transaction management
- Spring bean wiring
- Service-to-service communication
- Repository behavior with actual schema
```

### Slicing Tests: Testing Specific Layers

```java
// Instead of loading entire application context, load only what's needed

// 1. Repository Layer Only (@DataJpaTest)
@DataJpaTest
public class UserRepositoryTest {
  // Only loads JPA + H2 database
  // Fast, focused on data access
}

// 2. Service Layer with Mocked Repositories
@SpringBootTest
public class UserServiceTest {
  // Load business logic
  // Mock external dependencies
}

// 3. Controller Layer with Mocked Services (@WebMvcTest)
@WebMvcTest(UserController.class)
public class UserControllerTest {
  // Only loads Spring MVC components
  // Mock service layer
}

// 4. Complete Application Context (@SpringBootTest)
@SpringBootTest
public class IntegrationTest {
  // Load entire application
  // Use for true integration scenarios
}
```

### Test Database Configuration

```java
// Default: Spring Boot uses in-memory H2 for @DataJpaTest
@DataJpaTest
public class UserRepositoryTest {
  // Automatically uses H2 in-memory database
  // Schema created from JPA entities
  // Transactions rolled back after each test
}

// Custom Test Container for Production-Like Database
@SpringBootTest
@Testcontainers
public class IntegrationTestWithPostgres {

  @Container
  static PostgreSQLContainer<?> postgres =
    new PostgreSQLContainer<>("postgres:15")
      .withDatabaseName("testdb")
      .withUsername("test")
      .withPassword("test");

  @DynamicPropertySource
  static void properties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  // Tests run against actual PostgreSQL
  // More accurate than H2, closer to production
}
```

### Transaction Management in Tests

```java
@SpringBootTest
public class UserServiceTest {

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  // Default: Each test runs in a transaction that's rolled back
  @Test
  @Transactional
  public void shouldSaveAndRetrieveUser() {
    // Insert
    User user = new User("john@example.com", "John");
    User saved = userService.saveUser(user);

    // Verify in same transaction
    User retrieved = userRepository.findById(saved.getId()).orElseThrow();
    assertThat(retrieved.getName()).isEqualTo("John");

    // Transaction rolls back after test - database clean
  }

  // BUT: What if you need to test rollback behavior?
  @Test
  public void shouldRollbackOnException() {
    assertThatThrownBy(() -> {
      userService.createDuplicateUser("duplicate@example.com");
    }).isInstanceOf(DataIntegrityViolationException.class);

    // Verify user wasn't persisted
    assertThat(userRepository.count()).isZero();
  }

  // Disable rollback to verify persistence
  @Test
  @Transactional(propagation = Propagation.NOT_SUPPORTED)
  public void shouldPersistUserAcrossTransactions() {
    User user = userService.saveUser(new User("john@example.com", "John"));

    // Manually clear session to force database read
    entityManager.flush();
    entityManager.clear();

    // This reads from database, not cache
    User retrieved = userRepository.findById(user.getId()).orElseThrow();
    assertThat(retrieved.getName()).isEqualTo("John");
  }
}
```

### Testing Database Constraints

```java
@DataJpaTest
public class UserRepositoryConstraintTest {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private EntityManager entityManager;

  @Test
  public void shouldEnforceUniqueEmailConstraint() {
    User user1 = new User();
    user1.setEmail("duplicate@example.com");
    user1.setName("User One");
    userRepository.save(user1);

    User user2 = new User();
    user2.setEmail("duplicate@example.com");
    user2.setName("User Two");

    // Flush forces constraint check
    assertThatThrownBy(() -> {
      userRepository.save(user2);
      entityManager.flush();
    }).isInstanceOf(DataIntegrityViolationException.class);
  }

  @Test
  public void shouldEnforceNotNullConstraint() {
    User user = new User();
    user.setName("John");
    // Email is NOT NULL but not set

    assertThatThrownBy(() -> {
      userRepository.save(user);
      entityManager.flush();
    }).isInstanceOf(ConstraintViolationException.class);
  }
}
```

### Testing Repository Query Methods

```java
@DataJpaTest
public class UserRepositoryQueryTest {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private TestEntityManager entityManager;

  @BeforeEach
  public void setUp() {
    // Create test data
    entityManager.persistAndFlush(
      new User("john@example.com", "John", "ACTIVE"));
    entityManager.persistAndFlush(
      new User("jane@example.com", "Jane", "ACTIVE"));
    entityManager.persistAndFlush(
      new User("bob@example.com", "Bob", "INACTIVE"));
  }

  @Test
  public void shouldFindActiveUsers() {
    List<User> active = userRepository.findByStatus("ACTIVE");

    assertThat(active)
      .hasSize(2)
      .extracting(User::getEmail)
      .containsExactly("john@example.com", "jane@example.com");
  }

  @Test
  public void shouldFindUserByEmail() {
    Optional<User> found = userRepository.findByEmail("john@example.com");

    assertThat(found)
      .isPresent()
      .hasValueSatisfying(user ->
        assertThat(user.getName()).isEqualTo("John")
      );
  }

  @Test
  public void shouldReturnEmptyForNonExistentUser() {
    Optional<User> found = userRepository.findByEmail("nonexistent@example.com");

    assertThat(found).isEmpty();
  }
}
```

### Service Layer Integration Testing

```java
@SpringBootTest
public class UserServiceIntegrationTest {

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private EmailService emailService;

  @MockBean  // Mock external email service
  private NotificationClient notificationClient;

  @BeforeEach
  public void setUp() {
    userRepository.deleteAll();
  }

  @Test
  public void shouldCreateUserAndSendNotification() {
    // Arrange
    CreateUserRequest request = new CreateUserRequest(
      "john@example.com",
      "John Doe"
    );

    // Act
    User created = userService.createUser(request);

    // Assert: User persisted
    assertThat(created.getId()).isNotNull();
    assertThat(userRepository.findById(created.getId()))
      .isPresent()
      .hasValueSatisfying(user ->
        assertThat(user.getEmail()).isEqualTo("john@example.com")
      );

    // Assert: External service called
    verify(notificationClient).sendWelcomeEmail("john@example.com");
  }

  @Test
  public void shouldNotifyOnUserUpdate() {
    // Arrange
    User user = userRepository.save(
      new User("john@example.com", "John"));

    // Act
    userService.updateUser(user.getId(), new UpdateUserRequest("Jane"));

    // Assert: Notification sent
    verify(notificationClient).sendNotification(
      "john@example.com",
      "Your profile was updated");
  }

  @Test
  @Transactional
  public void shouldTransactionRollbackOnValidationError() {
    long initialCount = userRepository.count();

    assertThatThrownBy(() ->
      userService.createUser(new CreateUserRequest("invalid-email", "John"))
    ).isInstanceOf(ValidationException.class);

    assertThat(userRepository.count()).isEqualTo(initialCount);
  }
}
```

### Controller Integration Testing with TestRestTemplate

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerIntegrationTest {

  @Autowired
  private TestRestTemplate restTemplate;

  @Autowired
  private UserRepository userRepository;

  @BeforeEach
  public void setUp() {
    userRepository.deleteAll();
  }

  @Test
  public void shouldGetUserById() {
    // Arrange
    User user = userRepository.save(
      new User("john@example.com", "John"));

    // Act
    ResponseEntity<UserDTO> response = restTemplate.getForEntity(
      "/api/v1/users/{id}",
      UserDTO.class,
      user.getId()
    );

    // Assert
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(response.getBody())
      .satisfies(dto -> {
        assertThat(dto.getEmail()).isEqualTo("john@example.com");
        assertThat(dto.getName()).isEqualTo("John");
      });
  }

  @Test
  public void shouldCreateUserAndReturnCreatedStatus() {
    // Act
    ResponseEntity<UserDTO> response = restTemplate.postForEntity(
      "/api/v1/users",
      new CreateUserRequest("jane@example.com", "Jane"),
      UserDTO.class
    );

    // Assert
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat(response.getHeaders().getLocation())
      .isNotNull();

    // Verify persisted
    assertThat(userRepository.findByEmail("jane@example.com"))
      .isPresent();
  }

  @Test
  public void shouldReturn404ForNonExistentUser() {
    ResponseEntity<UserDTO> response = restTemplate.getForEntity(
      "/api/v1/users/99999",
      UserDTO.class
    );

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
  }

  @Test
  public void shouldDeleteUserAndReturn204() {
    // Arrange
    User user = userRepository.save(
      new User("john@example.com", "John"));

    // Act
    ResponseEntity<Void> response = restTemplate.exchange(
      "/api/v1/users/{id}",
      HttpMethod.DELETE,
      null,
      Void.class,
      user.getId()
    );

    // Assert
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(userRepository.findById(user.getId())).isEmpty();
  }
}
```

## Complete Implementation Examples

### Example 1: Testing Repository with Custom Queries

```java
public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByStatusAndCreatedDateAfter(OrderStatus status, LocalDate date);
  Page<Order> findByCustomerId(Long customerId, Pageable pageable);
  @Query("SELECT o FROM Order o WHERE o.status = :status AND o.total > :minAmount")
  List<Order> findHighValueOrders(@Param("status") OrderStatus status,
                                  @Param("minAmount") BigDecimal minAmount);
}

@DataJpaTest
public class OrderRepositoryIntegrationTest {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private TestEntityManager entityManager;

  @BeforeEach
  public void setUp() {
    entityManager.persistAndFlush(
      new Order(1L, OrderStatus.PENDING, BigDecimal.valueOf(100)));
    entityManager.persistAndFlush(
      new Order(1L, OrderStatus.SHIPPED, BigDecimal.valueOf(500)));
    entityManager.persistAndFlush(
      new Order(2L, OrderStatus.PENDING, BigDecimal.valueOf(50)));
    entityManager.persistAndFlush(
      new Order(2L, OrderStatus.DELIVERED, BigDecimal.valueOf(1000)));
  }

  @Test
  public void shouldFindOrdersByStatusAfterDate() {
    List<Order> orders = orderRepository
      .findByStatusAndCreatedDateAfter(
        OrderStatus.PENDING,
        LocalDate.now().minusDays(1));

    assertThat(orders).hasSize(2);
  }

  @Test
  public void shouldFindCustomerOrdersWithPagination() {
    Page<Order> page = orderRepository
      .findByCustomerId(1L, PageRequest.of(0, 10));

    assertThat(page.getContent()).hasSize(2);
    assertThat(page.getTotalElements()).isEqualTo(2);
  }

  @Test
  public void shouldFindHighValueOrders() {
    List<Order> orders = orderRepository
      .findHighValueOrders(OrderStatus.PENDING, BigDecimal.valueOf(100));

    assertThat(orders).isEmpty();  // No PENDING orders > 100

    List<Order> all = orderRepository
      .findHighValueOrders(OrderStatus.DELIVERED, BigDecimal.valueOf(500));
    assertThat(all).hasSize(1);
  }
}
```

### Example 2: Testing Service with Transaction Boundaries

```java
public class UserService {

  @Transactional
  public void createMultipleUsers(List<CreateUserRequest> requests) {
    for (CreateUserRequest request : requests) {
      if (request.getEmail().contains("invalid")) {
        throw new ValidationException("Invalid email");
      }
      userRepository.save(new User(request.getEmail(), request.getName()));
    }
  }

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void auditUserCreation(User user) {
    auditRepository.save(new Audit("Created user: " + user.getId()));
  }
}

@SpringBootTest
public class UserServiceTransactionTest {

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AuditRepository auditRepository;

  @BeforeEach
  public void setUp() {
    userRepository.deleteAll();
    auditRepository.deleteAll();
  }

  @Test
  public void shouldRollbackAllUsersOnValidationFailure() {
    List<CreateUserRequest> requests = List.of(
      new CreateUserRequest("john@example.com", "John"),
      new CreateUserRequest("invalid-email", "Invalid"),
      new CreateUserRequest("jane@example.com", "Jane")
    );

    assertThatThrownBy(() -> userService.createMultipleUsers(requests))
      .isInstanceOf(ValidationException.class);

    // All three users rolled back (transaction atomicity)
    assertThat(userRepository.count()).isZero();
  }

  @Test
  public void shouldCreateAuditEvenIfMainTransactionRollsBack() {
    User user = new User("john@example.com", "John");

    assertThatThrownBy(() -> {
      userService.createUserAndAudit(user);  // Throws exception
    });

    // User creation rolled back
    assertThat(userRepository.count()).isZero();

    // Audit created (separate transaction with REQUIRES_NEW)
    assertThat(auditRepository.count()).isEqualTo(1);
  }
}
```

### Example 3: Testing with TestContainers (Production Database)

```java
@SpringBootTest
@Testcontainers
public class PaymentServiceIntegrationTest {

  @Container
  static PostgreSQLContainer<?> postgres =
    new PostgreSQLContainer<>("postgres:15")
      .withDatabaseName("payment_test")
      .withInitScript("init-payment-db.sql");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Autowired
  private PaymentService paymentService;

  @Autowired
  private PaymentRepository paymentRepository;

  @Test
  public void shouldProcessPaymentAndUpdateInventory() {
    // This test runs against actual PostgreSQL
    Payment payment = paymentService.processPayment(
      new ProcessPaymentRequest(1000L, BigDecimal.valueOf(99.99)));

    assertThat(payment.getStatus()).isEqualTo(PaymentStatus.COMPLETED);
    assertThat(paymentRepository.findById(payment.getId()))
      .isPresent();
  }

  @Test
  public void shouldRespectDatabaseConstraints() {
    Payment payment = new Payment();
    payment.setAmount(BigDecimal.valueOf(-10));  // Negative amount

    assertThatThrownBy(() -> {
      paymentRepository.save(payment);
    }).isInstanceOf(DataIntegrityViolationException.class);
  }
}
```

## Best Practices

### ✅ DO

```java
// 1. Use appropriate test slices
@DataJpaTest  // Only for repository tests
public class UserRepositoryTest { }

@WebMvcTest(UserController.class)  // Only for controller tests
public class UserControllerTest { }

@SpringBootTest  // For full integration tests
public class IntegrationTest { }

// 2. Clean up test data
@BeforeEach
public void setUp() {
  userRepository.deleteAll();
}

// 3. Use TestRestTemplate for HTTP testing
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class ApiTest {
  @Autowired
  TestRestTemplate restTemplate;
}

// 4. Test both happy path and error cases
@Test
public void shouldSucceed() { }

@Test
public void shouldFailWithValidationError() { }

@Test
public void shouldHandleNullInput() { }

// 5. Use @MockBean for external services
@SpringBootTest
public class ServiceTest {
  @MockBean
  private ExternalService external;
}

// 6. Assert on database state, not just return values
@Test
public void shouldPersistUser() {
  userService.createUser(request);

  // Verify in database
  assertThat(userRepository.findById(id)).isPresent();
}

// 7. Test transaction behavior explicitly
@Test
@Transactional
public void testInTransaction() { }

@Test
@Transactional(propagation = Propagation.NOT_SUPPORTED)
public void testWithoutTransaction() { }
```

### ❌ DON'T

```java
// 1. Don't load full application when testing a slice
@SpringBootTest  // Wrong for repository tests!
public class UserRepositoryTest { }

// 2. Don't leave test data in database
@Test
public void test() {
  userRepository.save(new User(...));
  // No cleanup - pollutes next test
}

// 3. Don't test implementation details
@Test
public void testPrivateMethod() {  // Can't test private!
  userService.doSomethingPrivate();
}

// 4. Don't use real external services
@Test
public void test() {
  emailService.sendRealEmail();  // Sends real email in test!
}

// 5. Don't ignore assertion results
@Test
public void test() {
  Optional<User> user = repository.findById(1L);
  // No assertion - test passes even if empty!
}

// 6. Don't test Spring's behavior
@Test
public void testSpringLoadsBean() {
  // Don't test if Spring works - it does
}

// 7. Don't hardcode test data
@Test
public void test() {
  assertThat(result).isEqualTo("hardcoded value");  // Brittle!
}
```

## Advanced Topics

### Testing Async Methods

```java
@SpringBootTest
public class AsyncServiceTest {

  @Autowired
  private AsyncService asyncService;

  @Test
  public void shouldCompleteAsyncTask() throws Exception {
    CompletableFuture<String> future = asyncService.asyncMethod();

    String result = future.get(5, TimeUnit.SECONDS);
    assertThat(result).isEqualTo("expected");
  }
}
```

### Testing Scheduled Tasks

```java
@SpringBootTest
public class ScheduledTaskTest {

  @Autowired
  private ScheduledTaskService service;

  @Test
  public void shouldExecuteScheduledTask() throws InterruptedException {
    service.resetCounter();

    Thread.sleep(6000);  // Wait for scheduled task

    assertThat(service.getCounter()).isGreaterThan(0);
  }
}
```

## Practice Questions & Answers

**Q1: When should you use @DataJpaTest vs @SpringBootTest?**

A: Use `@DataJpaTest` for repository tests - it's faster and loads only JPA components. Use `@SpringBootTest` for service or full application tests where you need the entire Spring context.

**Q2: Why do test transactions rollback by default?**

A: Rollback ensures each test starts with a clean database, preventing test interdependencies and side effects. This makes tests more reliable and repeatable.

**Q3: How do you test database constraints?**

A: Ensure constraints are in the database schema (not just JPA annotations). Call `entityManager.flush()` to force constraint checks before assertions.

**Q4: When would you use TestContainers?**

A: When your code relies on database-specific features (PostgreSQL sequences, Oracle syntax) or you want tests running against production database versions, not H2.

## Key Takeaways

1. **Test slicing**: Use @DataJpaTest, @WebMvcTest, @SpringBootTest appropriately
2. **Test data management**: Always clean up data between tests
3. **Transaction testing**: Understand rollback behavior and when to disable it
4. **Repository testing**: Verify custom query methods with test data
5. **Service testing**: Mock external services, verify database persistence
6. **Controller testing**: Use TestRestTemplate for HTTP-level testing
7. **Constraint testing**: Flush to verify database constraints
8. **Async testing**: Use CompletableFuture.get() with timeout
9. **TestContainers**: Use production databases for integration tests
10. **Error cases**: Always test both success and failure scenarios
