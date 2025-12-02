# Tutorial 08: Exception Handling & Error Management 🚨

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Exception Handling Strategies](#exception-handling-strategies)
3. [Global Exception Handling](#global-exception-handling)
4. [Custom Exception Design](#custom-exception-design)
5. [Error Response Patterns](#error-response-patterns)
6. [Advanced Patterns](#advanced-patterns)
7. [Best Practices](#best-practices)
8. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

In any application, things go wrong. The question isn't **if** exceptions occur, but **how** do we:

- Handle them consistently across the application
- Return meaningful error information to clients
- Log them for debugging
- Prevent unhandled exceptions from crashing the app
- Distinguish between expected vs unexpected errors

### The Problem Without Proper Exception Handling

```java
❌ UNCONTROLLED EXCEPTIONS

@RestController
public class UserController {

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        // What happens if id is invalid?
        User user = userRepository.findById(id).get(); // throws NoSuchElementException!

        // What if userRepository.findById throws an exception?
        // What if database is down?
        // What if network times out?

        return user;
    }
}

// Client receives: 500 Internal Server Error with stack trace
// Not helpful! User doesn't know what went wrong.
```

### What Proper Exception Handling Delivers

```
✅ Consistent error responses across all endpoints
✅ Meaningful error messages that help clients understand what went wrong
✅ Proper HTTP status codes (400 for client error, 500 for server error)
✅ Detailed logging for debugging without exposing internals
✅ Type-safe exception handling with custom exceptions
✅ Graceful degradation instead of crashes
```

---

## Exception Handling Strategies

### Strategy 1: Method-Level Exception Handling (Limited)

This is handling exceptions directly in methods - limited scope, repetitive code.

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        try {
            User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));

            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("USER_NOT_FOUND", e.getMessage()));
        } catch (DatabaseException e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new ErrorResponse("DATABASE_ERROR", "Service temporarily unavailable"));
        }
    }
}

// Problems:
// ❌ Repetitive across all endpoints
// ❌ Difficult to maintain consistent error formats
// ❌ Logic mixed with business logic
// ❌ Hard to test error scenarios
```

### Strategy 2: Global Exception Handling (Recommended) ✅

Using `@ControllerAdvice` to handle exceptions globally across all endpoints.

```java
@RestControllerAdvice  // Spring scans this class for @ExceptionHandler methods
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Handle ResourceNotFoundException (User-friendly error)
     * This is an EXPECTED error - client asked for something that doesn't exist
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException e,
            HttpServletRequest request) {

        logger.warn("Resource not found: {}", e.getMessage());

        ErrorResponse response = ErrorResponse.builder()
            .errorCode("RESOURCE_NOT_FOUND")
            .message(e.getMessage())
            .status(HttpStatus.NOT_FOUND.value())
            .path(request.getRequestURI())
            .timestamp(LocalDateTime.now())
            .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /**
     * Handle validation errors (Client sent bad data)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException e,
            HttpServletRequest request) {

        // Collect all validation errors
        Map<String, List<String>> fieldErrors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error ->
            fieldErrors.computeIfAbsent(error.getField(), k -> new ArrayList<>())
                .add(error.getDefaultMessage())
        );

        logger.warn("Validation error: {}", fieldErrors);

        ErrorResponse response = ErrorResponse.builder()
            .errorCode("VALIDATION_ERROR")
            .message("Validation failed")
            .status(HttpStatus.BAD_REQUEST.value())
            .path(request.getRequestURI())
            .fieldErrors(fieldErrors)
            .timestamp(LocalDateTime.now())
            .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * Handle database connection errors (UNEXPECTED - system error)
     */
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponse> handleDatabaseError(
            DataAccessException e,
            HttpServletRequest request) {

        // Log full exception for debugging (but don't expose to client)
        logger.error("Database error occurred", e);

        ErrorResponse response = ErrorResponse.builder()
            .errorCode("DATABASE_ERROR")
            .message("An unexpected error occurred. Please try again later.")
            // ⚠️ DON'T expose database-specific details to client
            .status(HttpStatus.SERVICE_UNAVAILABLE.value())
            .path(request.getRequestURI())
            .timestamp(LocalDateTime.now())
            .build();

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    /**
     * Catch-all for unexpected exceptions
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(
            Exception e,
            HttpServletRequest request) {

        logger.error("Unexpected error occurred", e);

        ErrorResponse response = ErrorResponse.builder()
            .errorCode("INTERNAL_SERVER_ERROR")
            .message("An unexpected error occurred. Please try again later.")
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .path(request.getRequestURI())
            .timestamp(LocalDateTime.now())
            .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

// Benefits:
// ✅ All exception handling in one place
// ✅ Controllers focused on business logic
// ✅ Consistent error response format
// ✅ Easy to add new exception handlers
// ✅ Easy to test
```

---

## Global Exception Handling

### Understanding @ControllerAdvice

`@ControllerAdvice` is Spring's way of implementing the **Interceptor Pattern** for exceptions:

```
Normal Request Flow:
Request → Controller → Response

With @ControllerAdvice:
Request → Controller → ❌ Exception → @ExceptionHandler → Error Response
         ↓
      @ControllerAdvice intercepts exception before it bubbles up
```

### Configuration Options

```java
// Option 1: Global - handles exceptions from ALL controllers
@RestControllerAdvice  // Use @RestControllerAdvice for JSON responses
public class GlobalExceptionHandler {
    // Handles exceptions from entire application
}

// Option 2: Scoped - handles exceptions from specific controllers
@ControllerAdvice(basePackages = "com.example.api")
public class ApiExceptionHandler {
    // Only handles exceptions in com.example.api package
}

// Option 3: Annotation-based - handles controllers with specific annotation
@ControllerAdvice(annotations = RestController.class)
public class RestExceptionHandler {
    // Only handles @RestController classes
}

// Option 4: Assignable types
@ControllerAdvice(assignableTypes = UserController.class)
public class UserExceptionHandler {
    // Only handles UserController
}
```

### Handler Method Order (Priority)

```java
@RestControllerAdvice
public class PrioritizedExceptionHandler {

    // Priority 1: Most specific exception first
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException e) {
        // This matches ONLY ResourceNotFoundException
    }

    // Priority 2: Parent exception
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        // Catches ALL RuntimeException subtypes not handled above
    }

    // Priority 3: Least specific - catch-all
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneralException(Exception e) {
        // Catches ANY exception not handled above
    }
}

// Spring matches exceptions in order:
// 1. Most specific match wins
// 2. If multiple handlers exist, Spring uses the most specific
// 3. If exception is not handled, it bubbles up
```

### Async Exception Handling Considerations

```java
@RestControllerAdvice
public class AsyncExceptionHandler {

    /**
     * ⚠️ Important: @ExceptionHandler does NOT catch exceptions
     * from @Async methods or CompletableFuture chains by default!
     */

    @GetMapping("/async-user/{id}")
    public CompletableFuture<User> getAsyncUser(@PathVariable Long id) {
        // If userService.findUserAsync throws exception,
        // it won't be caught by @ExceptionHandler!
        return userService.findUserAsync(id);
    }

    // ✅ Solution: Handle async exceptions explicitly
    @GetMapping("/safe-async-user/{id}")
    public CompletableFuture<ResponseEntity<?>> getSafeAsyncUser(@PathVariable Long id) {
        return userService.findUserAsync(id)
            .thenApply(user -> ResponseEntity.ok(user))
            .exceptionally(e -> {
                logger.error("Async error", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("ERROR", e.getMessage()));
            });
    }
}
```

---

## Custom Exception Design

### Principle: Exceptions Should Be Semantic

Exceptions should clearly communicate **what went wrong** and **at what level**.

### Exception Hierarchy Design

```java
/**
 * Base exception for application-specific errors
 * Use this to distinguish app errors from library/framework errors
 */
public abstract class ApplicationException extends RuntimeException {
    private final String errorCode;
    private final Map<String, Object> details;

    public ApplicationException(String errorCode, String message) {
        this(errorCode, message, null, null);
    }

    public ApplicationException(String errorCode, String message,
                               Throwable cause, Map<String, Object> details) {
        super(message, cause);
        this.errorCode = errorCode;
        this.details = details != null ? details : new HashMap<>();
    }

    public String getErrorCode() {
        return errorCode;
    }

    public Map<String, Object> getDetails() {
        return details;
    }
}

// Level 1: Client Error (User did something wrong)
/**
 * Client error: User requested resource that doesn't exist
 * HTTP Status: 404 Not Found
 */
public class ResourceNotFoundException extends ApplicationException {
    public ResourceNotFoundException(String message) {
        super("RESOURCE_NOT_FOUND", message);
    }
}

/**
 * Client error: Invalid input provided
 * HTTP Status: 400 Bad Request
 */
public class InvalidInputException extends ApplicationException {
    public InvalidInputException(String field, String message) {
        super("INVALID_INPUT",
              String.format("Invalid %s: %s", field, message),
              null,
              Map.of("field", field));
    }
}

/**
 * Client error: Duplicate resource
 * HTTP Status: 409 Conflict
 */
public class DuplicateResourceException extends ApplicationException {
    public DuplicateResourceException(String resource, String value) {
        super("DUPLICATE_RESOURCE",
              String.format("%s already exists: %s", resource, value),
              null,
              Map.of("resource", resource, "value", value));
    }
}

// Level 2: Server Error (Our system has a problem)
/**
 * Server error: Database is unavailable
 * HTTP Status: 503 Service Unavailable
 */
public class DatabaseException extends ApplicationException {
    public DatabaseException(String message, Throwable cause) {
        super("DATABASE_ERROR", message, cause, null);
    }
}

/**
 * Server error: External service unavailable
 * HTTP Status: 503 Service Unavailable
 */
public class ExternalServiceException extends ApplicationException {
    public ExternalServiceException(String serviceName, Throwable cause) {
        super("EXTERNAL_SERVICE_ERROR",
              String.format("External service '%s' unavailable", serviceName),
              cause,
              Map.of("service", serviceName));
    }
}

/**
 * Server error: Internal logic error
 * HTTP Status: 500 Internal Server Error
 */
public class InternalServerException extends ApplicationException {
    public InternalServerException(String message, Throwable cause) {
        super("INTERNAL_ERROR", message, cause, null);
    }
}

// Level 3: Authorization Error
public class UnauthorizedException extends ApplicationException {
    public UnauthorizedException(String message) {
        super("UNAUTHORIZED", message);
    }
}

public class ForbiddenException extends ApplicationException {
    public ForbiddenException(String resource, String action) {
        super("FORBIDDEN",
              String.format("You don't have permission to %s %s", action, resource));
    }
}
```

### Using Custom Exceptions Effectively

```java
@Service
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(Long id) {
        // ✅ DO: Throw semantic exceptions that explain what went wrong
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(
                "User not found with ID: " + id
            ));
    }

    public User createUser(UserRequest request) {
        // ✅ DO: Validate and throw specific exceptions early
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new InvalidInputException("email", "Email is required");
        }

        // ✅ DO: Check for conflicts before creating
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User", request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());

        return userRepository.save(user);
    }

    public void deleteUser(Long userId, Long requestingUserId) {
        // ✅ DO: Use specific authorization exceptions
        User user = getUserById(userId);
        User requester = getUserById(requestingUserId);

        if (!user.getId().equals(requester.getId()) && !requester.isAdmin()) {
            throw new ForbiddenException("User", "delete");
        }

        userRepository.delete(user);
    }
}

// ❌ DON'T: Generic exceptions
public void badExample() {
    try {
        userRepository.findById(id);
    } catch (Exception e) {
        throw new RuntimeException("Error"); // Too generic!
    }
}

// ❌ DON'T: Swallowing exceptions
public User getUserSilently(Long id) {
    try {
        return userRepository.findById(id).orElse(null);
    } catch (Exception e) {
        return null; // Exception lost! Can't debug!
    }
}
```

---

## Error Response Patterns

### Unified Error Response Structure

```java
/**
 * Standard error response returned to all clients
 * Provides consistent structure for error information
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    // What went wrong (machine-readable)
    private String errorCode;

    // What went wrong (human-readable)
    private String message;

    // HTTP status code
    private int status;

    // When the error occurred
    private LocalDateTime timestamp;

    // Which endpoint threw the error
    private String path;

    // Detailed error information (for validation errors, etc.)
    private Map<String, List<String>> fieldErrors;

    // Additional context
    private Map<String, Object> details;

    // Request ID for tracking
    private String traceId;
}
```

### Response Examples

```java
// Example 1: Resource not found error
{
    "errorCode": "RESOURCE_NOT_FOUND",
    "message": "User not found with ID: 999",
    "status": 404,
    "timestamp": "2024-01-15T10:30:00",
    "path": "/api/users/999",
    "traceId": "abc123def456"
}

// Example 2: Validation error
{
    "errorCode": "VALIDATION_ERROR",
    "message": "Validation failed",
    "status": 400,
    "timestamp": "2024-01-15T10:30:00",
    "path": "/api/users",
    "fieldErrors": {
        "email": ["Email is required", "Email format is invalid"],
        "age": ["Age must be positive"]
    },
    "traceId": "abc123def456"
}

// Example 3: Duplicate resource
{
    "errorCode": "DUPLICATE_RESOURCE",
    "message": "User already exists: john@example.com",
    "status": 409,
    "timestamp": "2024-01-15T10:30:00",
    "path": "/api/users",
    "details": {
        "resource": "User",
        "value": "john@example.com"
    },
    "traceId": "abc123def456"
}

// Example 4: Database error (NEVER expose DB details!)
{
    "errorCode": "DATABASE_ERROR",
    "message": "An unexpected error occurred. Please try again later.",
    "status": 503,
    "timestamp": "2024-01-15T10:30:00",
    "path": "/api/users",
    "traceId": "abc123def456"
}
```

### Implementing Traceable Errors

```java
@RestControllerAdvice
public class TraceableExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(TraceableExceptionHandler.class);

    /**
     * Add request tracking for correlation between logs and responses
     */
    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ErrorResponse> handleApplicationException(
            ApplicationException e,
            HttpServletRequest request,
            HttpServletResponse response) {

        // Generate unique trace ID for this error
        String traceId = UUID.randomUUID().toString();

        // Log with trace ID so developers can find this error later
        logger.error("[TraceId: {}] {} - {}",
            traceId, e.getErrorCode(), e.getMessage(), e);

        // Return trace ID to client so they can report it
        ErrorResponse errorResponse = ErrorResponse.builder()
            .errorCode(e.getErrorCode())
            .message(e.getMessage())
            .status(getHttpStatus(e).value())
            .path(request.getRequestURI())
            .timestamp(LocalDateTime.now())
            .traceId(traceId)
            .details(e.getDetails())
            .build();

        // Store trace ID in response headers for additional tracking
        response.setHeader("X-Trace-Id", traceId);

        return ResponseEntity.status(getHttpStatus(e)).body(errorResponse);
    }

    private HttpStatus getHttpStatus(ApplicationException e) {
        if (e instanceof ResourceNotFoundException) {
            return HttpStatus.NOT_FOUND;
        } else if (e instanceof DuplicateResourceException) {
            return HttpStatus.CONFLICT;
        } else if (e instanceof InvalidInputException) {
            return HttpStatus.BAD_REQUEST;
        } else if (e instanceof UnauthorizedException) {
            return HttpStatus.UNAUTHORIZED;
        } else if (e instanceof ForbiddenException) {
            return HttpStatus.FORBIDDEN;
        } else if (e instanceof DatabaseException || e instanceof ExternalServiceException) {
            return HttpStatus.SERVICE_UNAVAILABLE;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
```

---

## Advanced Patterns

### Pattern 1: Retry Logic with Exponential Backoff

```java
public class RetryableException extends ApplicationException {
    private final int maxRetries;
    private final long initialDelayMillis;

    public RetryableException(String errorCode, String message,
                             int maxRetries, long initialDelayMillis) {
        super(errorCode, message);
        this.maxRetries = maxRetries;
        this.initialDelayMillis = initialDelayMillis;
    }

    public int getMaxRetries() { return maxRetries; }
    public long getInitialDelayMillis() { return initialDelayMillis; }
}

@Component
public class ExternalApiClient {

    private static final Logger logger = LoggerFactory.getLogger(ExternalApiClient.class);
    private static final int MAX_RETRIES = 3;
    private static final long INITIAL_DELAY_MS = 1000; // 1 second

    public String callExternalApi(String url) {
        return retryWithExponentialBackoff(url, 0);
    }

    private String retryWithExponentialBackoff(String url, int attempt) {
        try {
            logger.info("Calling external API, attempt {}/{}", attempt + 1, MAX_RETRIES);
            return executeRequest(url);
        } catch (IOException e) {
            // This error is retryable (network issue)
            if (attempt < MAX_RETRIES - 1) {
                long delayMs = INITIAL_DELAY_MS * (long) Math.pow(2, attempt);
                logger.warn("Attempt {} failed, retrying in {}ms", attempt + 1, delayMs);

                try {
                    Thread.sleep(delayMs);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new ExternalServiceException("External API", ie);
                }

                return retryWithExponentialBackoff(url, attempt + 1);
            } else {
                throw new ExternalServiceException("External API", e);
            }
        }
    }

    private String executeRequest(String url) throws IOException {
        // Actual HTTP call
        return "response";
    }
}

// Or using Spring Retry:
@Component
public class ResilientApiClient {

    @Retryable(
        value = IOException.class,
        maxAttempts = 3,
        backoff = @Backoff(delay = 1000, multiplier = 2.0)
    )
    public String callExternalApi(String url) {
        // Spring Retry automatically retries with exponential backoff
        return executeRequest(url);
    }

    @Recover
    public String recover(IOException e, String url) {
        // Called after all retries exhausted
        throw new ExternalServiceException("External API", e);
    }

    private String executeRequest(String url) throws IOException {
        return "response";
    }
}
```

### Pattern 2: Circuit Breaker Pattern

```java
/**
 * Prevents cascading failures when external service is unavailable
 */
@Service
public class CircuitBreakerExternalService {

    private static final Logger logger = LoggerFactory.getLogger(CircuitBreakerExternalService.class);

    // Simple circuit breaker implementation
    private enum CircuitState {
        CLOSED,      // Normal operation, requests pass through
        OPEN,        // Too many failures, reject requests
        HALF_OPEN    // Testing if service recovered
    }

    private CircuitState state = CircuitState.CLOSED;
    private int failureCount = 0;
    private static final int FAILURE_THRESHOLD = 5;
    private Instant lastFailureTime = null;
    private static final long TIMEOUT_MS = 30000; // 30 seconds

    public String callWithCircuitBreaker(String url) {
        synchronized (this) {
            // If open and timeout expired, try half-open
            if (state == CircuitState.OPEN) {
                if (System.currentTimeMillis() - lastFailureTime.toEpochMilli() > TIMEOUT_MS) {
                    state = CircuitState.HALF_OPEN;
                    logger.info("Circuit breaker transitioning to HALF_OPEN");
                } else {
                    // Circuit still open
                    throw new ExternalServiceException(
                        "Circuit breaker OPEN - service unavailable"
                    );
                }
            }
        }

        try {
            String response = executeRequest(url);

            synchronized (this) {
                // Success - reset
                if (state == CircuitState.HALF_OPEN) {
                    state = CircuitState.CLOSED;
                    failureCount = 0;
                    logger.info("Circuit breaker recovered - transitioning to CLOSED");
                }
            }

            return response;
        } catch (Exception e) {
            synchronized (this) {
                failureCount++;
                lastFailureTime = Instant.now();

                if (failureCount >= FAILURE_THRESHOLD) {
                    state = CircuitState.OPEN;
                    logger.error("Circuit breaker OPEN after {} failures", failureCount);
                }
            }
            throw e;
        }
    }

    private String executeRequest(String url) {
        return "response";
    }
}

// Using Resilience4j (recommended in production):
@Configuration
public class CircuitBreakerConfig {

    @Bean
    public CircuitBreaker circuitBreaker() {
        CircuitBreakerConfig config = CircuitBreakerConfig.custom()
            .failureRateThreshold(50.0f) // 50% failures trigger open
            .slowCallRateThreshold(100.0f)
            .waitDurationInOpenState(Duration.ofSeconds(30))
            .permittedNumberOfCallsInHalfOpenState(3)
            .slowCallDurationThreshold(Duration.ofSeconds(5))
            .recordExceptions(IOException.class, TimeoutException.class)
            .ignoreExceptions(ResourceNotFoundException.class) // Don't count these
            .build();

        CircuitBreakerRegistry registry = CircuitBreakerRegistry.of(config);
        return registry.circuitBreaker("external-api-breaker");
    }
}

@Service
public class ResilientService {

    private final CircuitBreaker circuitBreaker;

    public String callWithCircuitBreaker(String url) {
        return circuitBreaker.executeSupplier(() -> executeRequest(url));
    }

    private String executeRequest(String url) {
        return "response";
    }
}
```

### Pattern 3: Bulkhead Pattern (Isolation)

```java
/**
 * Isolates thread pools to prevent one failing service
 * from consuming all threads and starving other services
 */
@Service
public class BulkheadExternalService {

    // External API has dedicated thread pool
    private final ExecutorService externalApiExecutor =
        Executors.newFixedThreadPool(5, r -> {
            Thread t = new Thread(r);
            t.setName("external-api-thread");
            return t;
        });

    // Database queries have separate thread pool
    private final ExecutorService databaseExecutor =
        Executors.newFixedThreadPool(10, r -> {
            Thread t = new Thread(r);
            t.setName("db-thread");
            return t;
        });

    public CompletableFuture<String> callExternalApiWithBulkhead(String url) {
        // If external API is slow, it only uses its 5 threads
        // Database queries still have their 10 threads available
        return CompletableFuture.supplyAsync(
            () -> executeRequest(url),
            externalApiExecutor
        ).exceptionally(e -> {
            throw new ExternalServiceException("External API", e);
        });
    }

    private String executeRequest(String url) {
        return "response";
    }
}
```

---

## Best Practices

### ✅ DO: Proper Exception Logging

```java
// ✅ DO: Log with appropriate severity
logger.error("Critical error occurred", exception); // For errors
logger.warn("Something suspicious happened", exception); // For warnings
logger.info("Normal operations completed"); // For info

// ✅ DO: Include context in log message
logger.error("Failed to process order {} from customer {}",
    orderId, customerId, exception);

// ✅ DO: Use structured logging for production
logger.info("User login", Map.of(
    "userId", userId,
    "timestamp", LocalDateTime.now(),
    "success", true
));
```

### ❌ DON'T: Common Mistakes

```java
// ❌ DON'T: Log and throw (duplicate logging)
catch (Exception e) {
    logger.error("Error", e);
    throw new RuntimeException("Error", e);
}

// ❌ DON'T: Swallow exceptions silently
catch (Exception e) {
    // Nothing! Exception is lost
}

// ❌ DON'T: Throw broad exception types
throw new Exception("Something went wrong");

// ❌ DON'T: Expose internal details to clients
ErrorResponse.builder()
    .message(e.getCause().getMessage()) // Might expose database details!
```

### Security Considerations

```java
@RestControllerAdvice
public class SecureExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {

        // ✅ DO: Log full details internally
        logger.error("Unexpected error", e);

        // ✅ DO: Return generic message to client
        ErrorResponse response = ErrorResponse.builder()
            .errorCode("INTERNAL_ERROR")
            .message("An unexpected error occurred") // Generic!
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(response);
    }

    // ❌ DON'T: Expose stack trace to client
    // ❌ DON'T: Include database connection strings
    // ❌ DON'T: Include authentication tokens or secrets
    // ❌ DON'T: Show internal system paths
}
```

---

## Practice Questions

### Question 1: Why Use Custom Exceptions?

**Q**: When should you create custom exceptions vs. using standard Java exceptions?

**A**:

- **Custom exceptions** when you want to signal **semantic failures** (e.g., `ResourceNotFoundException`)
- **Standard exceptions** for language-level errors (e.g., `NullPointerException`)

```java
// ✅ Good: Custom exception is semantic
if (!user.exists()) {
    throw new ResourceNotFoundException("User not found");
}

// ❌ Bad: Standard exception doesn't tell the story
if (!user.exists()) {
    throw new IllegalArgumentException("Invalid user");
}
```

### Question 2: How Do You Handle Async Exceptions?

**Q**: How can you ensure async method exceptions are handled properly?

**A**: `@ExceptionHandler` doesn't catch async exceptions. You must handle them explicitly:

```java
// ❌ This exception won't be caught by @ExceptionHandler
@GetMapping("/async")
public CompletableFuture<User> getAsync(Long id) {
    return userService.findAsync(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
}

// ✅ This will be caught
@GetMapping("/async")
public CompletableFuture<ResponseEntity<User>> getAsync(Long id) {
    return userService.findAsync(id)
        .thenApply(ResponseEntity::ok)
        .exceptionally(e -> ResponseEntity.notFound().build());
}
```

### Question 3: What's the Difference Between Expected and Unexpected Errors?

**Q**: How should you handle expected vs. unexpected errors differently?

**A**:

- **Expected errors** (validation, not found): Client's fault → 4xx status
- **Unexpected errors** (database down, null pointer): Our fault → 5xx status

```java
// Expected: Client fault
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<?> handleNotFound(ResourceNotFoundException e) {
    return ResponseEntity.notFound().build(); // 404
}

// Unexpected: Server fault
@ExceptionHandler(DataAccessException.class)
public ResponseEntity<?> handleDatabaseError(DataAccessException e) {
    logger.error("Database error", e);
    return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
        .body("Service unavailable");
}
```

### Question 4: How Do You Prevent Cascading Failures?

**Q**: How can you stop one failing service from breaking your entire application?

**A**: Use the **Circuit Breaker pattern** to detect failures and stop sending requests:

```
Closed State: ✅ Requests pass through normally
             ❌ Too many failures detected
                    ↓
Open State: 🔴 Requests rejected immediately
             ⏱️ Wait timeout period
                    ↓
Half-Open State: 🟡 Try one request to test recovery
                ✅ If success → back to Closed
                ❌ If failure → back to Open
```

---

## Key Takeaways

1. **Use @RestControllerAdvice** for centralized, consistent error handling
2. **Create semantic custom exceptions** that clearly describe what went wrong
3. **Distinguish between expected (4xx) and unexpected (5xx) errors** in your responses
4. **Never expose internal details** to clients (database errors, stack traces)
5. **Log fully internally, respond generically** to clients
6. **Use circuit breakers** to prevent cascading failures from external services
7. **Handle async exceptions explicitly** - @ExceptionHandler won't catch them
8. **Include trace IDs** for error correlation and debugging
9. **Validate early and throw specific exceptions** as soon as something is wrong
10. **Test exception handling** as thoroughly as you test happy paths
