# Tutorial 17: Spring Boot Actuators - Custom Endpoints 🎯

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Creating Custom Endpoints](#creating-custom-endpoints)
3. [Custom Metrics](#custom-metrics)
4. [Endpoint Security](#endpoint-security)
5. [Advanced Customization](#advanced-customization)
6. [Best Practices](#best-practices)
7. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

Spring Boot Actuator provides **pre-built endpoints** (/health, /metrics, /info). But what if you need:

- Application-specific status checks?
- Business metrics (users created, orders processed)?
- Custom operational data?
- Integration with your monitoring system?

Custom endpoints let you **expose your own data** in the standard actuator format.

### The Gap Without Custom Endpoints

```
WITHOUT CUSTOM ENDPOINTS:
Monitoring system asks:
- "How many users created today?" → No standard way
- "What's the API gateway status?" → No endpoint
- "Are we over quota?" → No built-in metric

Result: Custom monitoring code scattered everywhere
        Different formats for different data
        Hard to integrate with standard tools

WITH CUSTOM ENDPOINTS:
GET /actuator/business-metrics
→ {"users_created": 1250, "orders_today": 890}

GET /actuator/external-services
→ {"api_gateway": "UP", "payment_service": "UP"}

Standard format, integrated with monitoring
```

---

## Creating Custom Endpoints

### Endpoint 1: Simple Custom Endpoint

```java
/**
 * Create a custom actuator endpoint
 * Exposed at: /actuator/business-status
 */
@Component
@Endpoint(id = "business-status")  // Endpoint ID
public class BusinessStatusEndpoint {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public BusinessStatusEndpoint(UserRepository userRepository,
                                  OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    /**
     * GET /actuator/business-status
     * Return current business metrics
     */
    @ReadOperation  // HTTP GET
    public Map<String, Object> getBusinessStatus() {
        return Map.of(
            "active_users", userRepository.countActive(),
            "orders_today", orderRepository.countByToday(),
            "revenue_today", orderRepository.revenueTodayInCents() / 100.0,
            "timestamp", LocalDateTime.now()
        );
    }
}

// Response:
{
  "active_users": 1250,
  "orders_today": 890,
  "revenue_today": 45000.50,
  "timestamp": "2024-01-15T10:30:00"
}
```

### Endpoint 2: Endpoint with Parameters

```java
/**
 * Custom endpoint that accepts parameters
 */
@Component
@Endpoint(id = "user-stats")
public class UserStatsEndpoint {

    private final UserRepository userRepository;

    /**
     * GET /actuator/user-stats?days=30
     * Get user statistics for last N days
     */
    @ReadOperation
    public Map<String, Object> getUserStats(
            @Selector int days  // ?days=30 parameter
    ) {
        LocalDateTime since = LocalDateTime.now().minusDays(days);

        return Map.of(
            "period_days", days,
            "new_users", userRepository.countNewSince(since),
            "active_users", userRepository.countActiveSince(since),
            "churn_rate", calculateChurnRate(since),
            "average_engagement_score", calculateEngagementScore(since)
        );
    }

    private double calculateChurnRate(LocalDateTime since) {
        // Business logic
        return 0.05;
    }

    private double calculateEngagementScore(LocalDateTime since) {
        // Business logic
        return 85.5;
    }
}

// Usage:
// GET /actuator/user-stats/30
// GET /actuator/user-stats/7
// GET /actuator/user-stats/365
```

### Endpoint 3: Write Operations (POST)

```java
/**
 * Custom endpoint with write operations
 */
@Component
@Endpoint(id = "cache-ops")
public class CacheOperationsEndpoint {

    private final CacheManager cacheManager;

    /**
     * GET /actuator/cache-ops
     * Show cache status
     */
    @ReadOperation
    public Map<String, Object> getCacheStatus() {
        return Map.of(
            "caches", cacheManager.getCacheNames(),
            "enabled", true
        );
    }

    /**
     * POST /actuator/cache-ops/clear
     * Clear specific cache
     */
    @WriteOperation
    public Map<String, String> clearCache(
            @Selector String cacheName
    ) {
        Cache cache = cacheManager.getCache(cacheName);

        if (cache == null) {
            return Map.of("status", "error", "message", "Cache not found");
        }

        cache.clear();

        return Map.of(
            "status", "success",
            "message", "Cache cleared: " + cacheName
        );
    }

    /**
     * DELETE /actuator/cache-ops/all
     * Clear all caches
     */
    @DeleteOperation
    public Map<String, String> clearAllCaches() {
        cacheManager.getCacheNames()
            .forEach(name -> cacheManager.getCache(name).clear());

        return Map.of(
            "status", "success",
            "message", "All caches cleared"
        );
    }
}

// Usage:
// curl http://localhost:8080/actuator/cache-ops
// curl -X POST http://localhost:8080/actuator/cache-ops/users
// curl -X DELETE http://localhost:8080/actuator/cache-ops/all
```

---

## Custom Metrics

### Building Business Metrics

```java
/**
 * Track application-specific metrics
 */
@Service
public class ApplicationMetrics {

    private final MeterRegistry meterRegistry;
    private final AtomicInteger activeConnections;
    private final Timer requestProcessingTime;

    public ApplicationMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;

        // Register gauge - current value
        this.activeConnections = new AtomicInteger(0);
        meterRegistry.gauge("app.connections.active", activeConnections);

        // Register timer - measure durations
        this.requestProcessingTime = Timer.builder("app.request.processing")
            .description("Time to process requests")
            .publishPercentiles(0.5, 0.95, 0.99)
            .register(meterRegistry);
    }

    public void incrementConnections() {
        activeConnections.incrementAndGet();
    }

    public void decrementConnections() {
        activeConnections.decrementAndGet();
    }

    public void recordRequestTime(Duration duration) {
        requestProcessingTime.record(duration);
    }

    // Expose metrics via custom endpoint
    @Component
    @Endpoint(id = "app-metrics")
    public class AppMetricsEndpoint {

        @ReadOperation
        public Map<String, Object> getMetrics() {
            return Map.of(
                "active_connections", activeConnections.get(),
                "request_p50_ms", getPercentile(0.5),
                "request_p95_ms", getPercentile(0.95),
                "request_p99_ms", getPercentile(0.99)
            );
        }

        private double getPercentile(double percentile) {
            // Retrieve from MeterRegistry
            return 0;  // Simplified
        }
    }
}
```

### Tracking Business Events

```java
/**
 * Track important business events
 */
@Service
public class BusinessEventTracker {

    private final MeterRegistry meterRegistry;

    public BusinessEventTracker(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    public void recordUserSignup(User user) {
        meterRegistry.counter("business.user.signup",
            "tier", user.getTier()).increment();
    }

    public void recordOrderPlaced(Order order) {
        meterRegistry.counter("business.order.placed").increment();
        meterRegistry.timer("business.order.processing").record(
            order.getProcessingTime()
        );
    }

    public void recordPaymentFailed(Payment payment) {
        meterRegistry.counter("business.payment.failed",
            "reason", payment.getFailureReason()).increment();
    }

    public void recordFeatureUsage(String feature, String userId) {
        meterRegistry.counter("business.feature.used",
            "feature", feature,
            "user", userId).increment();
    }
}

// Custom endpoint to view business events
@Component
@Endpoint(id = "business-events")
public class BusinessEventsEndpoint {

    private final MeterRegistry meterRegistry;

    @ReadOperation
    public Map<String, Object> getBusinessEvents() {
        return Map.of(
            "signups_today", getMeterValue("business.user.signup"),
            "orders_today", getMeterValue("business.order.placed"),
            "payment_failures", getMeterValue("business.payment.failed"),
            "feature_usage", getFeatureUsage()
        );
    }

    private long getMeterValue(String meterName) {
        // Retrieve from MeterRegistry
        return 0;  // Simplified
    }

    private Map<String, Long> getFeatureUsage() {
        // Retrieve feature usage metrics
        return Map.of();
    }
}
```

---

## Endpoint Security

### Protecting Custom Endpoints

```java
/**
 * Secure custom endpoints with Spring Security
 */
@Configuration
@EnableWebSecurity
public class ActuatorSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/info").permitAll()

                // Readonly metrics (requires ACTUATOR role)
                .requestMatchers(HttpMethod.GET, "/actuator/metrics/**")
                    .hasRole("ACTUATOR")
                .requestMatchers(HttpMethod.GET, "/actuator/business-status")
                    .hasRole("ACTUATOR")

                // Write operations (requires ADMIN role)
                .requestMatchers(HttpMethod.POST, "/actuator/**")
                    .hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/actuator/**")
                    .hasRole("ADMIN")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )
            .httpBasic();  // Or use JWT, OAuth2, etc.

        return http.build();
    }
}

// Configuration
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,business-status,cache-ops
      base-path: /actuator
```

### Custom Authorization Annotation

```java
/**
 * Create custom annotation for endpoint authorization
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequireActuatorRole {
    String role() default "ACTUATOR";
}

/**
 * Aspect to enforce authorization
 */
@Aspect
@Component
public class ActuatorAuthorizationAspect {

    @Around("@annotation(requireActuatorRole)")
    public Object authorize(ProceedingJoinPoint joinPoint,
                           RequireActuatorRole requireActuatorRole)
            throws Throwable {

        Authentication auth = SecurityContextHolder.getContext()
            .getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new AccessDeniedException("Not authenticated");
        }

        boolean hasRole = auth.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority()
                .equals("ROLE_" + requireActuatorRole.role()));

        if (!hasRole) {
            throw new AccessDeniedException(
                "Missing required role: " + requireActuatorRole.role()
            );
        }

        return joinPoint.proceed();
    }
}

// Usage
@Component
@Endpoint(id = "admin-operations")
public class AdminOperationsEndpoint {

    @WriteOperation
    @RequireActuatorRole(role = "ADMIN")
    public Map<String, String> sensitiveOperation() {
        return Map.of("status", "success");
    }
}
```

---

## Advanced Customization

### Conditional Endpoint Registration

```java
/**
 * Only expose certain endpoints based on environment
 */
@Configuration
public class ConditionalEndpointConfig {

    /**
     * Only register debug endpoint in development
     */
    @Bean
    @ConditionalOnProperty(
        name = "app.debug.enabled",
        havingValue = "true"
    )
    public DebugEndpoint debugEndpoint() {
        return new DebugEndpoint();
    }

    /**
     * Register performance endpoint in production
     */
    @Bean
    @ConditionalOnProperty(
        name = "app.environment",
        havingValue = "production"
    )
    public PerformanceEndpoint performanceEndpoint() {
        return new PerformanceEndpoint();
    }
}

// application.yml
app:
  debug:
    enabled: false  # true only in dev
  environment: production  # or development
```

### Filtering Endpoint Responses

```java
/**
 * Sanitize sensitive data from endpoint responses
 */
@Component
@Endpoint(id = "system-info")
public class SystemInfoEndpoint {

    @ReadOperation
    public Map<String, Object> getSystemInfo() {
        Map<String, Object> info = new HashMap<>();

        // Collect system information
        info.put("java_version", System.getProperty("java.version"));
        info.put("os_name", System.getProperty("os.name"));
        info.put("cpu_count", Runtime.getRuntime().availableProcessors());
        info.put("memory_max", Runtime.getRuntime().maxMemory());
        info.put("environment_variables",
            sanitizeEnvironment(System.getenv()));

        return info;
    }

    private Map<String, String> sanitizeEnvironment(
            Map<String, String> env) {

        return env.entrySet().stream()
            // Filter out sensitive variables
            .filter(e -> !isSensitive(e.getKey()))
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                e -> maskSensitiveValue(e.getKey(), e.getValue())
            ));
    }

    private boolean isSensitive(String key) {
        return key.toUpperCase()
            .contains("PASSWORD") ||
            key.toUpperCase()
            .contains("SECRET") ||
            key.toUpperCase()
            .contains("TOKEN") ||
            key.toUpperCase()
            .contains("API_KEY");
    }

    private String maskSensitiveValue(String key, String value) {
        if (isSensitive(key)) {
            return "****";
        }
        return value;
    }
}
```

---

## Best Practices

### ✅ DO: Clear Endpoint Documentation

```java
/**
 * Endpoint: /actuator/payments
 *
 * GET /actuator/payments/stats
 * Returns: Payment processing statistics
 * Response: {
 *   "total_processed": 1000,
 *   "total_amount": 50000.00,
 *   "failure_rate": 0.02,
 *   "average_processing_time_ms": 250
 * }
 *
 * POST /actuator/payments/retry-failed
 * Retries all failed payments from last 24 hours
 * Response: {"retried": 15, "status": "success"}
 *
 * Required Roles: ACTUATOR for GET, ADMIN for POST
 */
@Component
@Endpoint(id = "payments")
public class PaymentsEndpoint { }
```

### ✅ DO: Version Your Custom Endpoints

```java
// v1 endpoint
@Component
@Endpoint(id = "api-stats")
public class ApiStatsEndpointV1 { }

// v2 endpoint (evolved version)
@Component
@Endpoint(id = "api-stats-v2")
public class ApiStatsEndpointV2 { }

// Gradually deprecate v1 while supporting both
```

### ❌ DON'T: Expose Secrets via Endpoints

```java
// ❌ NEVER
@ReadOperation
public Map<String, String> getSecrets() {
    return Map.of(
        "db_password", System.getenv("DB_PASSWORD"),
        "api_key", System.getenv("API_KEY")
    );
}

// ✅ Good - Only expose non-sensitive data
@ReadOperation
public Map<String, String> getConfiguration() {
    return Map.of(
        "db_host", System.getenv("DB_HOST"),
        "cache_type", System.getenv("CACHE_TYPE")
    );
}
```

### ✅ DO: Performance Monitor Endpoints

```java
/**
 * Custom endpoint might be expensive
 * Add caching to prevent overload
 */
@Component
@Endpoint(id = "analytics")
public class AnalyticsEndpoint {

    private Map<String, Object> cachedData;
    private LocalDateTime lastUpdate;
    private static final long CACHE_DURATION_MS = 60000;  // 1 minute

    @ReadOperation
    public Map<String, Object> getAnalytics() {
        // Return cached if recent
        if (isCacheValid()) {
            return cachedData;
        }

        // Calculate fresh data (expensive operation)
        cachedData = calculateAnalytics();
        lastUpdate = LocalDateTime.now();

        return cachedData;
    }

    private boolean isCacheValid() {
        if (cachedData == null || lastUpdate == null) {
            return false;
        }

        long ageMs = Duration.between(
            lastUpdate,
            LocalDateTime.now()
        ).toMillis();

        return ageMs < CACHE_DURATION_MS;
    }

    private Map<String, Object> calculateAnalytics() {
        // Expensive calculation
        return Map.of();
    }
}
```

---

## Practice Questions

### Question 1: When Should You Create Custom Endpoints?

**Q**: Should every new feature have a custom endpoint?

**A**: No. Create custom endpoints when you need:

1. Business metrics (users, orders, revenue)
2. Operational data (dependency health, quotas)
3. Admin operations (clear cache, trigger tasks)
4. Integration with monitoring systems

**Don't create endpoints for:**

- Regular application data (use REST API instead)
- Internal debugging (use logging instead)
- Real-time operations (use WebSockets instead)

### Question 2: How Do You Secure Custom Endpoints?

**Q**: Should all endpoints require authentication?

**A**: No - match security to data sensitivity:

- `/health` - Public (system monitoring)
- `/metrics` - Authenticated (operational data)
- Write operations - Admin role only
- Sensitive data - Encrypted responses

### Question 3: What's the Difference Between Custom Endpoints and Metrics?

**Q**: Should I use a custom endpoint or add a metric?

**A**:

- **Metrics** - Continuous tracking, time-series data, used for graphing
- **Endpoints** - Query current state, operations, used for status checks

Use metrics for: performance, trends, historical data
Use endpoints for: status, operations, current diagnostics

---

## Key Takeaways

1. **Custom endpoints expose application-specific data** in standard actuator format
2. **@Endpoint annotation** creates a new actuator endpoint
3. **@ReadOperation, @WriteOperation, @DeleteOperation** map HTTP methods
4. **Security is crucial** - only expose what's necessary
5. **Performance matters** - cache expensive calculations
6. **Sanitize responses** - never expose secrets
7. **Document thoroughly** - others need to understand the endpoint
8. **Version endpoints** - gracefully deprecate old versions
9. **Monitor endpoint usage** - they're part of your application
10. **Integrate with monitoring** - endpoints feed monitoring systems
