# Tutorial 16: Metrics & Monitoring with Actuator 📊

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Actuator Basics](#actuator-basics)
3. [Built-in Endpoints](#built-in-endpoints)
4. [Custom Metrics](#custom-metrics)
5. [Health Indicators](#health-indicators)
6. [Monitoring in Production](#monitoring-in-production)
7. [Best Practices](#best-practices)
8. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

**Monitoring** answers: "How is my application behaving right now?"

- Is it responding to requests?
- How fast are requests?
- How much memory is it using?
- Are there errors?
- What about external dependencies (database, APIs)?

Without monitoring, you only find out about problems when users complain.

### The Monitoring Gap

```
WITHOUT MONITORING:
User: "Your app is slow!"
You: "How slow? When? Which endpoint?"
User: "... I don't know, it was just slow this morning"
You: "😞 Can't do anything with that information"

WITH MONITORING:
Dashboard shows:
├── Response times over last hour
├── Error rate per endpoint
├── Memory usage trending
├── Database query performance
├── Dependency health (external APIs)
└── Alert: "Error rate exceeded 1% at 3:45 PM"

You: Can pinpoint exact issue
```

---

## Actuator Basics

### Adding Actuator to Your Project

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

That's it! No other configuration needed.

### Enabling Endpoints

```yaml
# application.yml
management:
  # Expose all endpoints (careful in production!)
  endpoints:
    web:
      exposure:
        include: "*"  # Exposes all endpoints

  # For production, be selective:
  # include: health,metrics,info,prometheus

  # Exclude sensitive endpoints
  endpoints:
    web:
      exposure:
        exclude: env,configprops  # Hide environment details
```

### What Actuator Provides (Automatically)

```
Before adding one line of code, you get:

/actuator/health           - Is the application running?
/actuator/metrics          - List available metrics
/actuator/metrics/{metric} - Get specific metric data
/actuator/info            - Application version and info
/actuator/env             - Environment variables (careful!)
/actuator/configprops     - Configuration properties
/actuator/loggers         - Logging configuration
/actuator/shutdown        - Gracefully shutdown (disabled by default)

That's 7 endpoints with zero lines of code!
```

---

## Built-in Endpoints

### Health Endpoint

The most important endpoint - **is the application working?**

```bash
# Simple health check
GET /actuator/health

Response:
{
  "status": "UP"
}

# Detailed health check (with groups)
GET /actuator/health/readiness

{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "PostgreSQL",
        "validationQuery": "isValid()"
      }
    },
    "livenessState": {
      "status": "UP"
    }
  }
}
```

### Kubernetes Probes Use Health Endpoints

```yaml
# kubernetes-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      containers:
        - name: app
          image: my-app:1.0.0

          # Kubernetes asks: Is the container alive?
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10

          # Kubernetes asks: Is the container ready for traffic?
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8080
            initialDelaySeconds: 20
            periodSeconds: 5
```

### Metrics Endpoint

Access detailed application metrics:

```bash
# List all available metrics
GET /actuator/metrics

Response:
{
  "names": [
    "jvm.memory.used",
    "jvm.threads.live",
    "http.server.requests",
    "process.cpu.usage",
    "system.load.average.1m",
    ...
  ]
}

# Get specific metric
GET /actuator/metrics/jvm.memory.used

Response:
{
  "name": "jvm.memory.used",
  "description": "The amount of used memory",
  "baseUnit": "bytes",
  "measurements": [
    {
      "statistic": "VALUE",
      "value": 350000000
    }
  ],
  "availableTags": [
    {
      "tag": "area",
      "values": ["heap", "nonheap"]
    },
    {
      "tag": "id",
      "values": ["PS Eden Space", "PS Survivor Space", ...]
    }
  ]
}

# Get metrics filtered by tag
GET /actuator/metrics/jvm.memory.used?tag=area:heap

Response:
{
  "measurements": [
    { "statistic": "VALUE", "value": 250000000 }
  ]
}
```

### Common Metrics Explained

```
JVM Metrics (Java Virtual Machine):
├── jvm.memory.used         - Memory currently in use
├── jvm.memory.max          - Maximum available memory
├── jvm.threads.live        - Number of live threads
├── jvm.gc.memory.allocated - Memory allocated by GC
└── jvm.gc.pause            - How long garbage collection took

Process Metrics (Your Application):
├── process.cpu.usage       - CPU percentage
├── process.uptime          - How long app has been running
└── process.files.open      - Open file descriptors

HTTP Metrics (Request/Response):
├── http.server.requests    - Total requests
├── http.requests.count     - By status (2xx, 4xx, 5xx)
└── http.requests.duration  - Response time percentiles

Custom Business Metrics:
├── users.created           - Users created today
├── orders.processed        - Orders processed
└── errors.authentication   - Authentication failures
```

### Info Endpoint

Display application information:

```yaml
# application.yml
info:
  app:
    name: User Service
    description: Manages user accounts
    version: @project.version@  # From pom.xml
  company:
    name: MyCompany
    email: info@mycompany.com
  java:
    version: @java.version@

# Response from GET /actuator/info
{
  "app": {
    "name": "User Service",
    "description": "Manages user accounts",
    "version": "1.2.3"
  },
  "company": {
    "name": "MyCompany",
    "email": "info@mycompany.com"
  },
  "java": {
    "version": "17.0.1"
  },
  "build": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.2.3"
  }
}
```

### Environment Endpoint (Use Carefully!)

```bash
GET /actuator/env

Response:
{
  "propertySources": [
    {
      "name": "systemProperties",
      "properties": {
        "java.version": "17.0.1",
        ...
      }
    },
    {
      "name": "systemEnvironment",
      "properties": {
        "PATH": "/usr/local/bin:/usr/bin",
        "DB_PASSWORD": "****"  # Masked!
        ...
      }
    }
  ]
}

# Specific property
GET /actuator/env/java.version
```

⚠️ **Security Warning**: This exposes sensitive information. Disable in production:

```yaml
management:
  endpoints:
    web:
      exposure:
        exclude: env,configprops # Hide from public
```

---

## Custom Metrics

### Creating Business Metrics

```java
/**
 * Track custom business events
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final MeterRegistry meterRegistry;  // Spring provides this!

    // Counter: Count how many users created
    private final AtomicInteger usersCreated;

    // Timer: Track how long operations take
    private final Timer userCreationTimer;

    public UserService(UserRepository userRepository,
                      MeterRegistry meterRegistry) {
        this.userRepository = userRepository;
        this.meterRegistry = meterRegistry;

        // Register counter
        this.usersCreated = meterRegistry.counter("users.created").getId();

        // Register timer
        this.userCreationTimer = Timer.builder("users.creation.time")
            .description("Time taken to create a user")
            .publishPercentiles(0.5, 0.95, 0.99)  // Report p50, p95, p99
            .register(meterRegistry);
    }

    public User createUser(CreateUserRequest request) {
        // Measure how long this takes
        return userCreationTimer.recordCallable(() -> {
            User user = new User();
            user.setEmail(request.getEmail());

            User saved = userRepository.save(user);

            // Increment counter
            usersCreated.incrementAndGet();

            return saved;
        });
    }
}

// Metrics now available:
// GET /actuator/metrics/users.created
// → {"value": 42}
//
// GET /actuator/metrics/users.creation.time
// → {"p50": 100, "p95": 250, "p99": 500} (milliseconds)
```

### Common Metric Types

```java
@Service
public class MetricsExamples {

    private final MeterRegistry meterRegistry;

    // COUNTER - Count occurrences (only goes up)
    private AtomicInteger loginAttempts;

    // GAUGE - Current value (can go up or down)
    private AtomicInteger activeUsers;

    // TIMER - Measure duration
    private Timer requestTimer;

    // DISTRIBUTION SUMMARY - Measure values (like response size)
    private DistributionSummary responseSize;

    public MetricsExamples(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;

        // Register counter - for events
        this.loginAttempts = meterRegistry.counter("login.attempts").getId();

        // Register gauge - current state
        this.activeUsers = new AtomicInteger();
        meterRegistry.gauge("users.active", activeUsers);

        // Register timer - time operations
        this.requestTimer = meterRegistry.timer("http.requests.time");

        // Register distribution - measure values
        this.responseSize = meterRegistry.summary("http.response.size");
    }

    public void login() {
        loginAttempts.increment();  // Counter goes up
    }

    public void userConnected() {
        activeUsers.incrementAndGet();  // Gauge goes up
    }

    public void userDisconnected() {
        activeUsers.decrementAndGet();  // Gauge goes down
    }

    public void recordRequest(long durationMs, long responseSizeBytes) {
        requestTimer.record(Duration.ofMillis(durationMs));
        responseSize.record(responseSizeBytes);
    }
}
```

### Monitoring with @Aspect

```java
/**
 * Automatically measure all @Monitored methods
 */
@Aspect
@Component
public class MonitoringAspect {

    private final MeterRegistry meterRegistry;

    @Around("@annotation(monitored)")
    public Object monitor(ProceedingJoinPoint joinPoint,
                         Monitored monitored) throws Throwable {

        String methodName = joinPoint.getSignature().getName();
        Timer timer = meterRegistry.timer("method.execution." + methodName);

        try {
            return timer.recordCallable(() -> {
                try {
                    return joinPoint.proceed();
                } catch (Throwable e) {
                    meterRegistry.counter("method.errors." + methodName).increment();
                    throw e;
                }
            });
        } catch (Exception e) {
            throw e;
        }
    }
}

// Usage: Just add @Monitored annotation
@Service
public class UserService {

    @Monitored
    public User createUser(CreateUserRequest request) {
        // Automatically tracked!
    }
}

// Metrics generated:
// method.execution.createUser
// method.errors.createUser
```

---

## Health Indicators

### Custom Health Checks

```java
/**
 * Create custom health indicator for your dependencies
 */
@Component
public class PaymentServiceHealthIndicator extends AbstractHealthIndicator {

    private final PaymentServiceClient paymentClient;

    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        try {
            // Try to call payment service
            boolean isHealthy = paymentClient.ping();

            if (isHealthy) {
                builder.up()
                    .withDetail("service", "Payment Service")
                    .withDetail("status", "operational")
                    .withDetail("latency_ms", 50);
            } else {
                builder.down()
                    .withDetail("reason", "Payment service not responding");
            }
        } catch (Exception e) {
            builder.down()
                .withException(e)
                .withDetail("error", e.getMessage());
        }
    }
}

// GET /actuator/health returns:
{
  "status": "UP",
  "components": {
    "paymentServiceHealthIndicator": {
      "status": "UP",
      "details": {
        "service": "Payment Service",
        "status": "operational",
        "latency_ms": 50
      }
    },
    "db": {
      "status": "UP"
    }
  }
}
```

### Health Groups (For Kubernetes)

```yaml
# application.yml
management:
  health:
    # Liveness: Is the app alive? (if false, restart container)
    livenessState:
      enabled: true

    # Readiness: Can the app handle traffic? (if false, route traffic elsewhere)
    readinessState:
      enabled: true

    group:
      # Only check essential systems for liveness
      liveness:
        include: livenessState

      # Check all systems for readiness
      readiness:
        include: readinessState,db,paymentServiceHealthIndicator
```

```bash
# Kubernetes uses these:
# Liveness: GET /actuator/health/liveness
# Response: {"status": "UP"} or {"status": "DOWN"}
# Action: If DOWN → restart pod
#
# Readiness: GET /actuator/health/readiness
# Response: {"status": "UP"} or {"status": "DOWN"}
# Action: If DOWN → remove from service load balancer
```

---

## Monitoring in Production

### Export to Prometheus

```xml
<!-- Add Prometheus support -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>

<!-- Automatically exposes /actuator/prometheus endpoint -->
```

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  metrics:
    export:
      prometheus:
        enabled: true
```

```
GET /actuator/prometheus

Response: Prometheus format (readable by Prometheus scraper)

# HELP jvm_memory_used_bytes The amount of used memory
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{area="heap"} 350000000
jvm_memory_used_bytes{area="nonheap"} 50000000

# Prometheus periodically pulls this (every 30 seconds)
# Stores in time-series database
# You can query and alert on it
```

### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "spring-boot-app"
    static_configs:
      - targets: ["localhost:8080"]
    metrics_path: "/actuator/prometheus"
```

### Grafana Dashboards

```
Prometheus → Grafana (dashboards and alerts)

Grafana queries Prometheus:
- "Give me avg response time over last hour"
- "Give me error rate per endpoint"
- "Alert if memory > 80%"

Grafana displays:
- Beautiful graphs
- Real-time dashboards
- Alert notifications
```

### Spring Boot Metrics Stack

```
Your Application
        ↓
Spring Boot Actuator (MeterRegistry)
        ↓
Micrometer (vendor-agnostic metrics)
        ↓
Prometheus (time-series database)
        ↓
Grafana (visualization & alerting)
        ↓
PagerDuty (alert notifications)
```

---

## Best Practices

### ✅ DO: Expose Only Necessary Endpoints

```yaml
# ✅ Good - Production config
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus,info
      exclude: env,configprops,shutdown
```

### ❌ DON'T: Expose Everything

```yaml
# ❌ Bad - Dangerous in production
management:
  endpoints:
    web:
      exposure:
        include: "*" # Exposes everything!
```

### ✅ DO: Use Meaningful Metric Names

```java
// ✅ Good
meterRegistry.counter("orders.created").increment();
meterRegistry.counter("orders.failed").increment();

// ❌ Bad - Vague
meterRegistry.counter("count1").increment();
meterRegistry.counter("error").increment();
```

### ✅ DO: Monitor Dependencies

```java
/**
 * Track health of external services
 */
@Component
public class DatabaseHealthIndicator extends AbstractHealthIndicator {
    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        // Spring Boot already provides database health!
        // But custom ones are useful for external services
    }
}

// Monitor:
// - Database connections
// - External APIs
// - Message queues
// - Cache servers
```

### ✅ DO: Correlate Metrics with Logs

```java
// Use MDC to link metrics with logs
MDC.put("requestId", UUID.randomUUID().toString());
meterRegistry.counter("request.processed").increment();
logger.info("Processed request");  // Log includes requestId

// Now you can find all logs for a request:
// 1. See high latency in metrics
// 2. Search logs by requestId
// 3. Find root cause
```

---

## Practice Questions

### Question 1: What's the Difference Between Health and Metrics?

**Q**: When should I check /health vs /metrics?

**A**:

- **/health** - Binary: UP/DOWN - "Is the app working?"
- **/metrics** - Detailed: trends, latency, errors - "How is the app performing?"

```
Health: Quick status check (used by Kubernetes)
Metrics: Deep analysis (used by Grafana for optimization)
```

### Question 2: How Do You Alert on Metrics?

**Q**: How do I get notified when something goes wrong?

**A**: Use Prometheus + Grafana + alerting system:

```
Prometheus scrapes metrics
        ↓
Stores in database
        ↓
Grafana queries Prometheus
        ↓
Evaluates alerting rules (e.g., "error_rate > 1%")
        ↓
Sends alert to PagerDuty/Slack/Email
```

### Question 3: Can You Update Metrics in Real-Time?

**Q**: Can I see metric changes immediately, or do they update on a schedule?

**A**: Metrics update immediately in memory, but Prometheus scrapes on a schedule (default 15 seconds). Grafana shows what Prometheus has collected.

```
Your app: Metric changes immediately ✓
Prometheus: Scrapes every 15 seconds
Grafana: Shows data from Prometheus (15-90 second delay)
```

---

## Key Takeaways

1. **Actuator provides free monitoring**: Just add the dependency, get 7+ endpoints
2. **Health endpoint for availability**: Binary UP/DOWN status
3. **Metrics for performance analysis**: Track latency, errors, throughput
4. **Custom metrics for business events**: Track orders, users, etc.
5. **Kubernetes integration**: Health endpoints used for pod management
6. **Expose selectively**: Don't expose env/configprops in production
7. **Prometheus + Grafana**: Standard monitoring stack for Spring Boot
8. **Monitor dependencies**: Database, APIs, caches health indicators
9. **Correlate metrics with logs**: Use trace IDs to drill down
10. **Alert proactively**: Set up alerts before problems affect users
