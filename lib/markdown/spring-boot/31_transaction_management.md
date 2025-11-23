# Tutorial 31: Transaction Management & @Transactional in Spring Boot

## Understanding the Question

**Why do we need @Transactional beyond simple "save the data"?**

Without transaction management:

- Multiple database operations could partially succeed/fail (data corruption)
- One service reads stale data while another writes (dirty reads)
- Concurrent updates overwrite each other (lost updates)
- Connections leak and resources exhaust

Spring's `@Transactional` annotation **wraps methods in database transactions** - guaranteeing consistency, isolation, and atomicity. But understanding the **ACID properties, isolation levels, propagation behavior, and rollback strategies** is crucial for building reliable systems.

## Core Concepts

### ACID Properties in Transactions

```
ACID: The foundation of reliable data systems

Atomicity (A):
└─ "All or Nothing" - transaction completes fully or rolls back entirely
   Either: All updates succeed
   Or: All updates rollback (no partial success)

   @Transactional
   public void transferMoney(Account from, Account to, BigDecimal amount) {
     from.debit(amount);    // Update 1
     to.credit(amount);     // Update 2
     // If error after Update 1, entire transaction rolls back
     // Both updates succeed or both fail - never partial
   }

Consistency (C):
└─ Database moves from valid state to valid state
   Invariants maintained: balances never negative, foreign keys always valid

   Database constraints enforce consistency:
   - NOT NULL constraints
   - UNIQUE constraints
   - FOREIGN KEY constraints
   - CHECK constraints

Isolation (I):
└─ Concurrent transactions don't interfere
   One transaction's changes invisible until commit

   Isolation Levels (from least to most strict):
   READ_UNCOMMITTED - Allows dirty reads (reading uncommitted data)
   READ_COMMITTED   - Only reads committed data (default for most DBs)
   REPEATABLE_READ  - Phantom read protection
   SERIALIZABLE     - Highest isolation, acts like sequential

Durability (D):
└─ Once committed, data persists despite failures
   Committed data survives crashes, power loss, etc.
   Enforced by database (write-ahead logs)
```

### @Transactional Annotation Basics

```java
// Minimal usage
@Transactional
public void updateUser(User user) {
  repository.save(user);
}

// Equivalent to:
// BEGIN TRANSACTION
//   save(user)
// COMMIT TRANSACTION
// If exception occurs: ROLLBACK TRANSACTION

// Full configuration
@Transactional(
  value = "transactionManager",           // Which TM to use
  transactionManager = "primaryTM",       // Alternative name

  propagation = Propagation.REQUIRED,     // Behavior in nested calls
  isolation = Isolation.READ_COMMITTED,   // Concurrency level
  timeout = 30,                           // Seconds before timeout
  readOnly = false,                       // Is this a read-only transaction?
  rollbackFor = Exception.class,          // Rollback for checked exceptions
  noRollbackFor = IgnorableException.class // Don't rollback for these
)
public void complexOperation() { }
```

### Understanding Propagation Behavior

```
Transaction propagation: What happens when a @Transactional method
calls another @Transactional method?

REQUIRED (default):
┌─────────────────────────────────┐
│ @Transactional Method A          │
│ ┌─────────────────────────────┐  │
│ │ DB Operation 1              │  │ One transaction
│ │ Call B() → uses same TX      │  │ Both operations in same TX
│ │ DB Operation 2              │  │
│ └─────────────────────────────┘  │
└─────────────────────────────────┘

REQUIRES_NEW:
┌──────────────────────────────┐
│ @Transactional Method A       │
│ ┌───────────────────────────┐ │ TX1
│ │ DB Operation 1            │ │
│ │ Call B() → NEW TRANSACTION│ │
│ │ (suspends TX1)            │ │
│ │ DB Operation 2            │ │
│ │ Resume TX1                │ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │ TX2 (separate)
│ │ B's operations            │ │
│ └───────────────────────────┘ │
└──────────────────────────────┘

NESTED:
├─ Transaction A (outer)
│  ├─ DB Operation 1
│  ├─ Transaction B (savepoint) ─── Rollback B doesn't affect A
│  │  ├─ DB Operation 2
│  │  └─ If error: rollback to savepoint
│  └─ DB Operation 3 (still in A)

SUPPORTS:
├─ If no transaction exists: execute without transaction
├─ If transaction exists: use it

NOT_SUPPORTED:
├─ Execute without transaction (suspend current)

MANDATORY:
├─ Must have existing transaction, error if none

NEVER:
├─ Must NOT have transaction, error if exists
```

### Practical Propagation Examples

```java
public class UserService {

  @Transactional(propagation = Propagation.REQUIRED)
  public void createUserWithAudit(CreateUserRequest request) {
    // TX: Create User
    User user = repository.save(new User(request));

    // Call audit - uses SAME transaction
    auditService.logUserCreation(user);

    // If auditService throws exception → entire transaction rolls back
    // User creation is rolled back!
  }

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void logUserCreation(User user) {
    // NEW independent transaction
    // If this throws exception, user creation still persists
    // Audit failure doesn't affect user creation
    auditRepository.save(new Audit("Created: " + user.getId()));
  }
}

// Usage:
userService.createUserWithAudit(request);
// Result: User created (even if audit fails)
// Both succeed or user succeeds alone
```

### Isolation Levels Explained

```java
@Service
public class AccountService {

  @Transactional(isolation = Isolation.READ_UNCOMMITTED)
  public void highPerformance() {
    // Allows dirty reads - DANGEROUS!
    // Might read data that gets rolled back
    // Only use for non-critical reads
  }

  @Transactional(isolation = Isolation.READ_COMMITTED)
  public void normalOperation() {
    // Only reads committed data - DEFAULT
    // No dirty reads, but phantom reads possible
    // Good balance of performance and safety

    // T1: SELECT balance WHERE account = 1 → returns 100
    // T2: Updates balance to 150, commits
    // T1: SELECT balance WHERE account = 1 again → returns 150 (nonrepeatable read)
  }

  @Transactional(isolation = Isolation.REPEATABLE_READ)
  public void consistentReads() {
    // Same row always returns same value in same transaction
    // Phantom reads possible (new rows inserted by other TX)

    // T1: SELECT COUNT(*) FROM orders → 10
    // T2: Inserts 2 new orders, commits
    // T1: SELECT COUNT(*) FROM orders → 12 (phantom read)
  }

  @Transactional(isolation = Isolation.SERIALIZABLE)
  public void highestIsolation() {
    // Acts like transactions run sequentially
    // No dirty reads, no phantom reads, no nonrepeatable reads
    // Slowest, highest contention
    // Use only for critical operations
  }
}

// Practical decision matrix:
/*
READ_UNCOMMITTED - Never use (invalid data)
READ_COMMITTED   - Use for most operations (default)
REPEATABLE_READ  - Need consistent reads within transaction
SERIALIZABLE     - Critical financial operations
*/
```

### Rollback Strategy & Exception Handling

```java
@Service
public class OrderService {

  @Transactional
  public void processOrder(Order order) {
    // Runtime exceptions automatically rollback
    repository.save(order);
    if (order.getItems().isEmpty()) {
      throw new RuntimeException("Order must have items");  // ROLLBACKS
    }
  }

  @Transactional(rollbackFor = PaymentException.class)
  public void processPayment(Payment payment) {
    // By default: checked exceptions DON'T rollback
    // Must explicitly specify rollbackFor
    paymentGateway.process(payment);  // Might throw PaymentException
  }

  @Transactional(noRollbackFor = IgnorableWarning.class)
  public void warningOperation() throws IgnorableWarning {
    // Even if this exception is thrown, don't rollback
    if (someCondition) {
      throw new IgnorableWarning("Non-critical issue");  // NO ROLLBACK
    }
  }

  // Manual rollback
  @Transactional
  public void manualRollback(TransactionStatus status) {
    repository.save(data);
    if (shouldNotProceed) {
      // Explicitly mark for rollback
      status.setRollbackOnly();
      // No exception thrown, but still rolls back
    }
  }
}

// Exception hierarchy matters:
public class OrderException extends RuntimeException { }       // Auto-rollback
public class DataException extends Exception { }               // No rollback
public class PaymentException extends Exception { }            // No rollback

@Transactional(rollbackFor = {PaymentException.class, DataException.class})
public void complexOperation() throws PaymentException { }
```

### Read-Only Transactions for Performance

```java
@Service
public class ReportService {

  // Read-only: Optimizes database (no locks on write)
  @Transactional(readOnly = true)
  public List<ReportData> generateReport(LocalDate date) {
    // Database can optimize: no undo logs, no write locks
    return repository.findByDate(date);
  }

  // Default: Read-write
  @Transactional(readOnly = false)
  public void updateReport(ReportData data) {
    repository.save(data);
  }

  // Mismatch: read-write where read-only claimed
  @Transactional(readOnly = true)
  public void badPractice() {
    repository.save(new Data());  // EXCEPTION! Marked read-only but writing
  }
}
```

## Complete Implementation Examples

### Example 1: Account Transfer with Proper Transaction Handling

```java
@Service
@Transactional
public class AccountTransferService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private TransactionHistoryRepository historyRepository;

  // Atomicity: Either both succeed or both fail
  public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
    Account fromAccount = accountRepository.findById(fromId)
      .orElseThrow(() -> new AccountNotFoundException(fromId));

    Account toAccount = accountRepository.findById(toId)
      .orElseThrow(() -> new AccountNotFoundException(toId));

    // Verify funds
    if (fromAccount.getBalance().compareTo(amount) < 0) {
      throw new InsufficientFundsException();
    }

    // Atomic: Both operations together
    fromAccount.debit(amount);
    toAccount.credit(amount);

    accountRepository.save(fromAccount);
    accountRepository.save(toAccount);

    // Record transaction
    TransactionRecord record = new TransactionRecord(
      fromId, toId, amount, LocalDateTime.now());
    historyRepository.save(record);

    // If error occurs here → entire transaction rolls back
    // No money transferred, no history recorded
  }
}

// Test the atomicity
@SpringBootTest
public class AccountTransferTest {

  @Autowired
  private AccountTransferService service;

  @Autowired
  private AccountRepository accountRepository;

  @Test
  public void shouldNotTransferIfInsufficientFunds() {
    Account from = new Account(100.0);
    Account to = new Account(0.0);
    accountRepository.save(from);
    accountRepository.save(to);

    assertThatThrownBy(() ->
      service.transferMoney(from.getId(), to.getId(), BigDecimal.valueOf(150))
    ).isInstanceOf(InsufficientFundsException.class);

    // Verify no transfer happened
    Account fromAfter = accountRepository.findById(from.getId()).orElseThrow();
    assertThat(fromAfter.getBalance()).isEqualTo(100.0);  // Unchanged
  }
}
```

### Example 2: Nested Transaction with Propagation

```java
@Service
public class UserRegistrationService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private EmailService emailService;

  @Autowired
  private AuditService auditService;

  @Transactional
  public User registerUser(RegistrationRequest request) {
    // Create user (in main transaction)
    User user = new User(request.getEmail(), request.getName());
    User created = userRepository.save(user);

    // Send welcome email (separate transaction)
    try {
      emailService.sendWelcomeEmail(created);
    } catch (EmailException e) {
      // Email failure shouldn't prevent user creation
      logger.error("Failed to send welcome email", e);
    }

    // Audit (separate transaction - always succeeds)
    auditService.logUserCreation(created);

    return created;
  }
}

@Service
public class EmailService {

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void sendWelcomeEmail(User user) {
    // Separate transaction from registration
    // If email sending fails, user creation still persists
    emailRepository.save(new EmailRecord(user.getEmail(), "Welcome"));

    // External call might fail - doesn't affect user registration
    externalEmailProvider.send(user.getEmail(), "Welcome");
  }
}

@Service
public class AuditService {

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void logUserCreation(User user) {
    // Always succeeds or fails independently
    // Non-critical audit logging
    auditRepository.save(new AuditLog("User created: " + user.getId()));
  }
}
```

### Example 3: Complex Isolation & Concurrency

```java
@Service
public class InventoryService {

  @Autowired
  private InventoryRepository repository;

  @Transactional(isolation = Isolation.REPEATABLE_READ)
  public void decreaseInventory(Long productId, Integer quantity) {
    // Read within transaction - same result if read again
    Product product = repository.findById(productId)
      .orElseThrow();

    if (product.getStock() < quantity) {
      throw new OutOfStockException();
    }

    // Decrease by quantity
    product.decreaseStock(quantity);
    repository.save(product);

    // If decreaseInventory is called concurrently:
    // T1 and T2 both read stock = 10
    // T1: decrease by 5 → stock = 5
    // T2: decrease by 5 → stock = 5 (should be 0!)
    // REPEATABLE_READ prevents this with locks
  }

  @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
  public Integer getAvailableStock(Long productId) {
    // Read-only: faster queries, no locks
    Product product = repository.findById(productId)
      .orElseThrow();
    return product.getStock();
  }
}
```

## Best Practices

### ✅ DO

```java
// 1. Use @Transactional on service methods
@Service
@Transactional
public class UserService {
  public void updateUser(User user) { }
}

// 2. Specify rollback behavior explicitly
@Transactional(rollbackFor = PaymentException.class)
public void processPayment() throws PaymentException { }

// 3. Use read-only for query methods
@Transactional(readOnly = true)
public User getUser(Long id) {
  return repository.findById(id).orElseThrow();
}

// 4. Use REQUIRES_NEW for independent operations
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void logAudit(String message) {
  // Doesn't affect parent transaction
}

// 5. Keep transactions short
@Transactional
public void quickOperation() {
  // Should complete in milliseconds
  repository.save(entity);
}

// 6. Specify timeout for long operations
@Transactional(timeout = 60)
public void longRunningOperation() { }

// 7. Mark repository methods as read-only when appropriate
@Repository
public interface UserRepository {

  @Transactional(readOnly = true)
  Optional<User> findById(Long id);

  @Transactional(readOnly = true)
  List<User> findAll();

  @Transactional
  User save(User user);
}
```

### ❌ DON'T

```java
// 1. Don't put @Transactional on controller methods
@RestController
@Transactional  // WRONG!
public class UserController {
  public void updateUser(User user) { }
}

// 2. Don't ignore checked exceptions
@Transactional
public void process() throws SQLException {
  // SQLException won't rollback by default!
  // Need: @Transactional(rollbackFor = SQLException.class)
}

// 3. Don't mark everything @Transactional
@Transactional
public User getUser(Long id) {
  // Unnecessary for read-only operations
  // Use: @Transactional(readOnly = true)
}

// 4. Don't create long-running transactions
@Transactional
public void processLargeDataset() {
  for (int i = 0; i < 1000000; i++) {
    repository.save(entity);  // Huge transaction, high memory!
  }
}

// 5. Don't make external calls inside transactions
@Transactional
public void createUserAndNotify() {
  User user = repository.save(new User());
  externalApi.notify(user);  // Long network call in transaction!
}

// 6. Don't catch and swallow exceptions
@Transactional
public void process() {
  try {
    doSomething();
  } catch (RuntimeException e) {
    logger.error("Error", e);  // Transaction still commits!
  }
}

// 7. Don't use synchronous I/O in transactions
@Transactional
public void downloadAndSave() {
  byte[] data = httpClient.get(url);  // Blocks transaction
  repository.save(data);
}
```

## Advanced Topics

### Pessimistic Locking (Database-Level)

```java
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("SELECT o FROM Order o WHERE o.id = :id")
  Optional<Order> findForUpdate(@Param("id") Long id);
}

@Service
public class OrderService {

  @Transactional
  public void updateOrder(Long orderId, OrderUpdate update) {
    // Lock acquired - no other transaction can modify until commit
    Order order = orderRepository.findForUpdate(orderId).orElseThrow();
    order.update(update);
    orderRepository.save(order);
  }
}
```

### Optimistic Locking (Version-Based)

```java
@Entity
public class Order {
  @Id
  private Long id;

  @Version  // Optimistic lock version
  private Long version;

  private String status;
}

@Service
public class OrderService {

  @Transactional
  public void updateOrder(Long id, OrderUpdate update) {
    Order order = repository.findById(id).orElseThrow();
    // version is 1

    order.setStatus("PROCESSING");
    // Concurrent update sets version to 2

    repository.save(order);
    // Fails with OptimisticLockingFailureException
    // Version mismatch detected
  }
}
```

## Practice Questions & Answers

**Q1: What happens if a @Transactional method calls another @Transactional method?**

A: By default (REQUIRED propagation), they share the same transaction. If the called method throws an exception, the entire transaction rolls back. Use REQUIRES_NEW if you want the called method in a separate transaction.

**Q2: When should you use @Transactional(readOnly = true)?**

A: For query methods. The database can optimize read-only transactions with no write locks or undo logs, improving performance.

**Q3: Why don't checked exceptions cause rollback?**

A: Spring assumes checked exceptions are recoverable. Use `@Transactional(rollbackFor = CheckedException.class)` to force rollback for checked exceptions.

**Q4: What's the difference between REPEATABLE_READ and SERIALIZABLE?**

A: REPEATABLE_READ prevents dirty and nonrepeatable reads but allows phantom reads (new rows inserted by other transactions). SERIALIZABLE prevents all concurrency anomalies but is slower.

## Key Takeaways

1. **ACID properties**: Atomicity (all or nothing), Consistency (valid states), Isolation (no interference), Durability (persists)
2. **@Transactional wraps methods**: Creates database transaction boundaries
3. **Propagation controls nesting**: REQUIRED shares transaction, REQUIRES_NEW creates new one
4. **Isolation levels**: READ_COMMITTED (default) to SERIALIZABLE (strict)
5. **Rollback strategy**: Runtime exceptions rollback, checked exceptions don't (need rollbackFor)
6. **Read-only optimization**: Mark queries with readOnly=true for performance
7. **Keep transactions short**: Lock resources for minimal time
8. **Avoid external calls**: Network I/O in transactions causes contention
9. **Test atomicity**: Verify rollback behavior with tests
10. **Choose isolation carefully**: Balance consistency vs performance
