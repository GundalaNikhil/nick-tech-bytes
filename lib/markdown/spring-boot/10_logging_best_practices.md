# Tutorial 10: Logging Best Practices 📝

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Logging Frameworks](#logging-frameworks)
3. [Log Levels](#log-levels)
4. [Structured Logging](#structured-logging)
5. [Performance Considerations](#performance-considerations)
6. [Best Practices](#best-practices)
7. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

Logging isn't about **printing information to a file**. It's about:

- Debugging production issues **after they happen** (you won't be there when bugs occur)
- Understanding **what your code is doing** at runtime
- Tracking **user actions** for auditing
- Detecting **anomalies and errors** early
- Answering: "What happened? When? Why?"

### The Logging Spectrum

```
Too Little Logging:
❌ Something fails in production
❌ You have no idea what happened
❌ Takes hours to debug
❌ Can't reproduce the issue

Too Much Logging:
❌ 100 GB log files per day
❌ Logs slow down application
❌ Costs thousands in storage
❌ Can't find signal in the noise

✅ RIGHT AMOUNT:
✅ Know what's happening
✅ Can trace user actions
✅ Minimal performance impact
✅ Actionable insights
```

---

## Logging Frameworks

### Spring Boot's Default: SLF4J + Logback

```
Architecture:

Your Code
    ↓
   SLF4J (Abstraction Layer)
    ↓
  Logback (Implementation)
    ↓
Console / Files / Network / etc.
```

**Why this design?** Your code uses SLF4J (vendor-agnostic), but Logback actually does the work. You can swap Logback for log4j2 without changing your code!

```java
// Your code - Uses SLF4J interface
private static final Logger logger = LoggerFactory.getLogger(UserService.class);

logger.info("User created: {}", userId);
```

### Configuration: application.yml

```yaml
# Spring Boot application.yml
logging:
  level:
    root: INFO # Default level for all loggers
    com.example: DEBUG # More verbose for your code
    org.springframework: WARN # Less verbose for frameworks
    org.springframework.web: DEBUG # Except Spring Web (more detail)
    org.hibernate.SQL: DEBUG # Show SQL queries

  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"

  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 30
    total-size-cap: 1GB
```

### Configuration: logback-spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- Define properties -->
    <property name="LOG_PATH" value="logs"/>
    <property name="LOG_FILE_NAME" value="application"/>

    <!-- Console Appender (for development) -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- File Appender with Rolling (for production) -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_PATH}/${LOG_FILE_NAME}.log</file>

        <!-- Roll over to new file when it reaches 10MB -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${LOG_PATH}/${LOG_FILE_NAME}-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>10MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>1GB</totalSizeCap>
        </rollingPolicy>

        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- Async Appender (for performance) -->
    <appender name="ASYNC_FILE" class="ch.qos.logback.classic.AsyncAppender">
        <queueSize>512</queueSize>
        <discardingThreshold>0</discardingThreshold>
        <appender-ref ref="FILE"/>
    </appender>

    <!-- Log Levels by Package -->
    <logger name="com.example" level="DEBUG"/>
    <logger name="org.springframework" level="WARN"/>
    <logger name="org.springframework.web" level="DEBUG"/>
    <logger name="org.hibernate.SQL" level="DEBUG"/>

    <!-- Root Logger -->
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="ASYNC_FILE"/>
    </root>

    <!-- Profile-specific configuration -->
    <springProfile name="production">
        <root level="WARN">
            <appender-ref ref="ASYNC_FILE"/>
        </root>
    </springProfile>

    <springProfile name="development">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>
</configuration>
```

---

## Log Levels

Understanding log levels is crucial for effective logging:

```
TRACE - Most verbose
DEBUG - Detailed diagnostic info (for developers)
INFO - Important state changes (application is running, user logged in)
WARN - Warning conditions (deprecated API used, unusual input)
ERROR - Error conditions (operation failed, exception occurred)
FATAL - Most severe (application might crash)

Production Typically Runs At: WARN or INFO
Development Typically Runs At: DEBUG
```

### When to Use Each Level

```java
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public User createUser(CreateUserRequest request) {
        // TRACE - Low-level debugging details (usually disabled in production)
        logger.trace("UserService.createUser() called with request: {}", request);

        // Validate
        if (request.getEmail() == null) {
            // WARN - Unexpected but recoverable (we return error to user)
            logger.warn("User creation attempt with null email from IP: {}", getClientIp());
            throw new InvalidInputException("email", "Email is required");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            // INFO - Expected business flow (duplicate email - user knows this)
            logger.info("User creation attempt with duplicate email: {}", request.getEmail());
            throw new DuplicateResourceException("User", request.getEmail());
        }

        // DEBUG - Intermediate steps (only relevant to developers debugging)
        logger.debug("Creating new user with email: {}", request.getEmail());

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encodePassword(request.getPassword()));

        User savedUser = userRepository.save(user);

        // INFO - Important state change (user was successfully created)
        logger.info("User created successfully - ID: {}, Email: {}",
            savedUser.getId(), savedUser.getEmail());

        return savedUser;
    }

    public User deleteUser(Long userId) {
        try {
            logger.debug("Deleting user: {}", userId);
            userRepository.deleteById(userId);
            logger.info("User deleted - ID: {}", userId);
        } catch (Exception e) {
            // ERROR - Operation failed, but system continues
            logger.error("Failed to delete user: {}", userId, e);
            throw new RuntimeException("Could not delete user", e);
        }
    }

    public void criticalOperation() {
        try {
            // Important business operation
        } catch (OutOfMemoryError e) {
            // FATAL - System might crash
            logger.error("FATAL: Out of memory! Application may become unstable.", e);
            System.exit(1);
        }
    }
}

// ❌ WRONG LEVELS:
public void wrongLevels() {
    logger.debug("User logged in"); // Should be INFO - important state change
    logger.info("Starting to validate email"); // Should be DEBUG - not important to operations
    logger.error("Email format invalid"); // Should be WARN - user can fix this
}
```

---

## Structured Logging

### Principle: Logs Should Be Machine-Readable Too

Traditional logs are for humans. But modern systems need to parse logs programmatically.

```
❌ Traditional Logging (Human-readable only):
2024-01-15 10:30:45 User john@example.com logged in from 192.168.1.1

❌ Problems:
- Hard to search (need regex)
- Hard to aggregate (parse inconsistent formats)
- Hard to analyze (extract individual fields)

✅ Structured Logging (Machine and human-readable):
{
  "timestamp": "2024-01-15T10:30:45Z",
  "level": "INFO",
  "message": "User login",
  "userId": "12345",
  "email": "john@example.com",
  "ip": "192.168.1.1",
  "duration_ms": 250
}

✅ Benefits:
- Easy to search (filter by any field)
- Easy to aggregate (parse JSON reliably)
- Easy to analyze (calculate metrics)
```

### Implementing Structured Logging

```java
// Approach 1: Using Mapped Diagnostic Context (MDC)
@Service
public class UserService {

    public User createUser(CreateUserRequest request) {
        // Set context for all logs in this thread
        MDC.put("operation", "create_user");
        MDC.put("email", request.getEmail());

        try {
            logger.info("Creating user"); // All logs include email!

            User user = new User();
            user.setEmail(request.getEmail());

            logger.info("Saving user to database");
            User saved = userRepository.save(user);

            MDC.put("userId", String.valueOf(saved.getId()));
            logger.info("User created successfully");

            return saved;
        } finally {
            MDC.clear(); // Clean up
        }
    }
}

// Logback configuration to include MDC:
<pattern>%d{yyyy-MM-dd HH:mm:ss} [%X{operation}] [%X{email}] %-5level - %msg%n</pattern>

// Output:
// 2024-01-15 10:30:45 [create_user] [john@example.com] INFO - Creating user
// 2024-01-15 10:30:46 [create_user] [john@example.com] INFO - Saving user to database
// 2024-01-15 10:30:46 [create_user] [john@example.com] INFO - User created successfully

// Approach 2: Using LogstashEncoder for JSON
// Add dependency: ch.qos.logback.logstash-logback-encoder:logstash-logback-encoder

<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>logs/application.log</file>

    <!-- Output logs as JSON -->
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <customFields>{"application": "user-service", "environment": "production"}</customFields>
    </encoder>

    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
        <fileNamePattern>logs/application-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
        <maxFileSize>10MB</maxFileSize>
    </rollingPolicy>
</appender>

// Output: {"timestamp":"2024-01-15T10:30:45Z","level":"INFO","message":"User created","userId":123,"application":"user-service"}

// Approach 3: Manual structured logging
public void structuredLogging(String userId, String email) {
    // Create structured log object
    Map<String, Object> logData = Map.of(
        "event", "user_login",
        "userId", userId,
        "email", email,
        "timestamp", LocalDateTime.now(),
        "duration_ms", 250
    );

    logger.info("User login: {}", new ObjectMapper().writeValueAsString(logData));
}
```

---

## Performance Considerations

### Lazy Evaluation (Don't Build Strings You Don't Log)

```java
// ❌ BAD - String is built even if DEBUG is disabled
logger.debug("User details: " + buildExpensiveString(user));

// ❌ BAD - Method is called even if DEBUG is disabled
logger.debug("User details: {}", expensiveMethod());

// ✅ GOOD - Parameter is only evaluated if DEBUG is enabled
logger.debug("User details: {}", user);

// ✅ GOOD - Use lambda for expensive operations
logger.debug("User details: {}", () -> buildExpensiveString(user));
```

### Async Logging for Performance

```xml
<!-- Async appender prevents logging from blocking -->
<appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
    <queueSize>512</queueSize>

    <!-- If queue is full, drop TRACE and DEBUG messages (keep ERROR) -->
    <discardingThreshold>0</discardingThreshold>

    <!-- Reference the actual appender -->
    <appender-ref ref="FILE"/>
</appender>

<root level="INFO">
    <appender-ref ref="ASYNC"/>
</root>
```

### Log Volume Control

```yaml
logging:
  level:
    root: INFO # Keep root at INFO
    org.springframework: WARN # Reduce framework noise
    org.hibernate: WARN # Reduce ORM noise
    com.example: DEBUG # Only your code at DEBUG
```

---

## Best Practices

### ✅ DO: Log Important State Changes

```java
// ✅ Good - User understands what happened
logger.info("User created - ID: {}, Email: {}", userId, email);
logger.info("Payment processed - Amount: ${}, OrderId: {}", amount, orderId);
logger.info("Database migration completed - Version: {}", version);
```

### ✅ DO: Use Placeholders (not String Concatenation)

```java
// ✅ Good - Efficient, consistent format
logger.info("User {} logged in from {}", userId, ipAddress);

// ❌ Bad - String concatenation, performance issue
logger.info("User " + userId + " logged in from " + ipAddress);
```

### ❌ DON'T: Log Sensitive Information

```java
// ❌ NEVER - Password in logs!
logger.info("User login - Email: {}, Password: {}", email, password);

// ❌ NEVER - API keys in logs!
logger.debug("Calling external API with key: {}", apiKey);

// ❌ NEVER - Credit card numbers!
logger.info("Processing payment: {}", creditCardNumber);

// ✅ GOOD - Log what you need, omit sensitive data
logger.info("User login - Email: {}", email);
logger.debug("Calling external API successfully");
logger.info("Payment processed for amount: ${}", amount);
```

### ✅ DO: Include Context for Debugging

```java
// ✅ Good - Provides context for debugging
logger.error("Failed to process order {}: {}", orderId, e.getMessage(), e);

// ❌ Bad - No context
logger.error("Error occurred", e);
```

### ✅ DO: Different Logs for Different Audiences

```java
public void auditAction(String userId, String action) {
    // AUDIT LOG - For compliance/legal (always capture)
    logger.info("[AUDIT] User {} performed action: {}", userId, action);
}

public void performanceLog(String operation, long durationMs) {
    // PERFORMANCE LOG - For optimization (separate appender)
    logger.info("[PERF] Operation {} took {}ms", operation, durationMs);
}

public void securityLog(String userId, String threat) {
    // SECURITY LOG - For alerts (critical) (separate appender)
    logger.warn("[SECURITY] User {} detected threat: {}", userId, threat);
}

// Logback: Configure separate appenders for each type
<logger name="*" level="INFO"/>

<logger name="*[AUDIT]*" level="INFO">
    <appender-ref ref="AUDIT_FILE"/>
</logger>

<logger name="*[SECURITY]*" level="WARN">
    <appender-ref ref="SECURITY_FILE"/>
</logger>
```

---

## Practice Questions

### Question 1: What's the Right Log Level for a Business Event?

**Q**: Should "user login" be DEBUG or INFO?

**A**: **INFO** - It's an important state change. Ops teams want to know about it. DEBUG should only be for information useful to developers investigating issues.

```java
// ✅ Correct
logger.info("User {} logged in successfully", userId);

// ❌ Wrong - Should be INFO, not DEBUG
logger.debug("User {} logged in successfully", userId);
```

### Question 2: How Do You Avoid Performance Overhead From Logging?

**Q**: What's the difference between these two approaches?

**A**: The second approach is more efficient because the expensive method is only called if DEBUG is enabled:

```java
// Less efficient - expensive method called regardless
logger.debug("Data: " + expensiveDataFormatting(data));

// More efficient - expensive method only called if DEBUG enabled
logger.debug("Data: {}", expensiveDataFormatting(data));

// Most efficient - Lambda provides lazy evaluation
logger.debug("Data: {}", () -> expensiveDataFormatting(data));
```

### Question 3: When Should Logs Go to Different Appenders?

**Q**: Why would you have separate log files for audit, security, and errors?

**A**: Different audiences need different logs:

- **Audit logs**: Compliance/legal - must be kept forever
- **Security logs**: Alerts, real-time monitoring
- **Application logs**: Debugging, operations
- **Error logs**: Critical issues requiring immediate action

Each can have different retention policies, archival strategies, and alerting rules.

---

## Key Takeaways

1. **Log levels matter**: TRACE/DEBUG for devs, INFO for operations, WARN/ERROR for alerts
2. **Use placeholders, not concatenation**: `logger.info("User {}", id)` not `"User " + id`
3. **Never log sensitive data**: No passwords, API keys, credit cards
4. **Include context**: Make logs useful for debugging without being overwhelming
5. **Use async appenders**: Prevent logging from blocking your application
6. **Structure logs for machines**: JSON logs enable easier analysis and aggregation
7. **Different logs for different purposes**: Audit, security, application, errors
8. **Configure by profile**: DEBUG in development, WARN in production
9. **Use MDC for request context**: Track user/request across multiple log lines
10. **Monitor log files**: Implement log aggregation (ELK, CloudWatch) in production
