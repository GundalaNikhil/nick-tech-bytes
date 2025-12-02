# Tutorial 11: Configuration Management Deep Dive 🎛️

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Configuration Sources](#configuration-sources)
3. [Environment-Specific Configuration](#environment-specific-configuration)
4. [ConfigurationProperties Pattern](#configurationproperties-pattern)
5. [External Configuration](#external-configuration)
6. [Best Practices](#best-practices)
7. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

Configuration is about **separating what changes** (from dev to production) from **what doesn't change** (your code). The goal:

- Same code runs in development, testing, and production
- Change behavior without recompiling
- Keep secrets out of the codebase
- Support multiple deployment environments
- Make infrastructure changes without developer involvement

### The Problem Without Proper Configuration

```java
❌ HARDCODED CONFIGURATION:

public class DatabaseConfig {
    public static final String DB_URL = "jdbc:mysql://prod-db.example.com:3306/prod";
    public static final String DB_USER = "admin";
    public static final String DB_PASSWORD = "super_secret_password_123"; // 😱 In source code!
}

❌ Problems:
- Secrets in source code (security risk!)
- Can't change config without rebuilding
- Different code for dev vs prod
- Developers see production passwords
```

```
✅ EXTERNAL CONFIGURATION:

application.yml:
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/dev  # Development

application-prod.yml:
spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/prod    # Production

✅ Benefits:
- Secrets never in source code
- Same binary for all environments
- Easy configuration changes
- Developers don't see production secrets
```

---

## Configuration Sources

Spring Boot reads configuration in this order (later sources override earlier ones):

```
1. Application Defaults (code)
2. application.properties / application.yml
3. Environment-specific: application-{profile}.yml
4. Environment Variables
5. Command Line Arguments
6. ConfigServer / Consul / Vault
7. System Properties

Example: If you set both in application.yml and environment variable:
    Environment variable WINS (it's more specific to deployment)
```

### Configuration Source Examples

```java
// 1. Application Defaults (in code)
@Configuration
public class DefaultConfig {
    @Bean
    public ConnectionPool connectionPool() {
        return new ConnectionPool(
            maxSize = 10,  // Default
            timeout = 30000  // Default
        );
    }
}

// 2. application.yml (checked in first)
server:
  port: 8080
spring:
  datasource:
    url: jdbc:mysql://localhost/mydb
    username: root
    password: password

// 3. application-prod.yml (overrides for production)
server:
  port: 8443
spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/mydb
    username: prod_user
    password: ${DB_PASSWORD}  # From environment variable!

// 4. Environment Variables (override everything)
export SERVER_PORT=9000
export SPRING_DATASOURCE_PASSWORD=secure_password

// 5. Command Line Arguments (highest priority)
java -jar app.jar --server.port=9001 --spring.datasource.password=cli_password

// Final result:
server.port = 9001  // From command line (wins!)
```

### Reading Configuration in Code

```java
@Configuration
@EnableConfigurationProperties({
    DatabaseProperties.class,
    ServerProperties.class
})
public class AppConfig {

    // Method 1: @Value for single properties
    @Component
    public class SinglePropertyExample {
        @Value("${server.port:8080}")  // Default value 8080
        private int port;

        @Value("${spring.datasource.url}")
        private String dbUrl;

        @Value("${custom.feature.enabled:false}")
        private boolean featureEnabled;
    }

    // Method 2: @ConfigurationProperties for grouped properties
    @Configuration
    @ConfigurationProperties(prefix = "app.database")
    public class DatabaseProperties {
        // Matches: app.database.host, app.database.port, etc.
        private String host;
        private int port;
        private String username;
        private String password;

        // Getters and setters (or use @Data)
    }

    // Method 3: Environment interface (low-level)
    @Component
    public class EnvironmentExample {
        @Autowired
        private Environment env;

        public void example() {
            String port = env.getProperty("server.port", "8080");
            String dbUrl = env.getProperty("spring.datasource.url");

            // Check if property exists
            if (env.containsProperty("custom.feature.enabled")) {
                boolean enabled = env.getProperty("custom.feature.enabled", Boolean.class);
            }
        }
    }
}
```

---

## Environment-Specific Configuration

### Profile-Based Configuration

```
In production, you run your app with different profiles:

java -jar app.jar --spring.profiles.active=production

Spring automatically loads:
1. application.yml (shared)
2. application-production.yml (production-specific)
```

### File Structure

```
src/main/resources/
├── application.yml              # Shared config (all environments)
├── application-dev.yml          # Development only
├── application-test.yml         # Test environment
├── application-prod.yml         # Production only
└── application-staging.yml      # Staging environment

src/test/resources/
└── application-test.yml         # Test overrides
```

### Example: Multi-Environment Configuration

```yaml
# application.yml (SHARED - all environments)
spring:
  application:
    name: user-service
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate

server:
  servlet:
    context-path: /api/v1

# Shared logging for all environments
logging:
  level:
    root: WARN
    com.example: INFO

---
# application-dev.yml (DEVELOPMENT)
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/dev_db
    username: dev_user
    password: dev_password
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: create-drop # Recreate schema on startup
  h2:
    console:
      enabled: true # Enable H2 console

server:
  port: 8080
  error:
    include-message: always # Show detailed error messages
    include-stacktrace: always

logging:
  level:
    com.example: DEBUG # Verbose logging for debugging

---
# application-test.yml (INTEGRATION TESTS)
spring:
  datasource:
    url: jdbc:h2:mem:testdb # In-memory database
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: create-drop

server:
  port: 0 # Random port (avoids conflicts)

---
# application-prod.yml (PRODUCTION)
spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/mydb
    username: ${DB_USER} # From environment variable
    password: ${DB_PASSWORD} # From environment variable
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000

  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate # NEVER auto-migrate in production!
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: false # Don't waste CPU formatting
        use_sql_comments: false

  cache:
    type: redis # Redis for distributed caching
    redis:
      host: ${REDIS_HOST}
      port: 6379

server:
  port: 8443
  ssl:
    enabled: true
    key-store: /etc/secrets/keystore.jks
    key-store-password: ${KEYSTORE_PASSWORD}
  error:
    include-message: never # Don't expose details
    include-stacktrace: never

logging:
  level:
    root: WARN
    com.example: INFO
  file:
    name: /var/log/application.log
    max-size: 10MB
    max-history: 30
```

### Activating Profiles

```bash
# Method 1: Command line
java -jar app.jar --spring.profiles.active=prod

# Method 2: Environment variable
export SPRING_PROFILES_ACTIVE=prod
java -jar app.jar

# Method 3: application.yml
spring:
  profiles:
    active: dev

# Multiple profiles (order matters!)
java -jar app.jar --spring.profiles.active=prod,cache,metrics

# Running tests with specific profile
@SpringBootTest
@ActiveProfiles("test")
class UserServiceTest { }
```

---

## ConfigurationProperties Pattern

### Best Practice: Type-Safe Configuration

```java
/**
 * Database Configuration Properties
 * Matches: app.database.host, app.database.port, etc. in application.yml
 */
@Configuration
@ConfigurationProperties(prefix = "app.database")
@Data                    // Generate getters/setters automatically
@Validated               // Enable validation
public class DatabaseProperties {

    @NotBlank(message = "Database host is required")
    private String host = "localhost";

    @Min(1) @Max(65535)
    private int port = 3306;

    @NotBlank
    private String name;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @Min(1) @Max(100)
    private int maxConnections = 10;

    @DurationUnit(ChronoUnit.MILLIS)
    private Duration connectionTimeout = Duration.ofSeconds(30);

    // Nested configuration
    @NestedConfigurationProperty
    private final Ssl ssl = new Ssl();

    @Data
    public static class Ssl {
        private boolean enabled;
        private String certificatePath;
        private String keyPath;
    }

    // Custom validation
    @PostConstruct
    public void validate() {
        if (port <= 0 || port > 65535) {
            throw new IllegalArgumentException("Invalid database port: " + port);
        }
    }
}

// application.yml
app:
  database:
    host: prod-db.example.com
    port: 3306
    name: mydb
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    maxConnections: 20
    connectionTimeout: 30s
    ssl:
      enabled: true
      certificatePath: /etc/ssl/cert.pem
      keyPath: /etc/ssl/key.pem

// Usage in code
@Service
public class UserService {

    private final DatabaseProperties dbProps;

    public UserService(DatabaseProperties dbProps) {
        this.dbProps = dbProps;
    }

    public void connectToDatabase() {
        String url = String.format("jdbc:mysql://%s:%d/%s",
            dbProps.getHost(),
            dbProps.getPort(),
            dbProps.getName()
        );

        // Type-safe! IDE autocomplete works
        // Validation happens automatically at startup
    }
}
```

### Complex Configuration Examples

```java
/**
 * Microservices Configuration with Multiple Services
 */
@Configuration
@ConfigurationProperties(prefix = "app.services")
@Data
public class ServiceRegistryProperties {

    private List<ServiceConfig> registry = new ArrayList<>();
    private long discoveryInterval = 30000;  // ms

    @Data
    public static class ServiceConfig {
        @NotBlank
        private String name;
        @NotBlank
        private String url;
        @Min(1000)
        private int timeout;
        private List<String> tags = new ArrayList<>();
        private Map<String, String> headers = new HashMap<>();
    }
}

// application.yml
app:
  services:
    discoveryInterval: 60000
    registry:
      - name: auth-service
        url: https://auth.internal
        timeout: 5000
        tags:
          - internal
          - critical
        headers:
          X-API-Version: "v2"
          X-Service-Name: "user-service"

      - name: payment-service
        url: https://payment.internal
        timeout: 10000
        tags:
          - internal
        headers:
          X-API-Version: "v1"

/**
 * Feature Toggles Configuration
 */
@Configuration
@ConfigurationProperties(prefix = "features")
@Data
public class FeatureToggleProperties {
    private Map<String, Boolean> enabled = new HashMap<>();
    private Map<String, Integer> rolloutPercentage = new HashMap<>();
}

// application.yml
features:
  enabled:
    new-user-workflow: true
    advanced-analytics: false
    beta-payment-gateway: true
  rolloutPercentage:
    new-dashboard: 25  # Only 25% of users see it
    recommended-items: 100  # Everyone gets this

// Usage
@Service
public class FeatureService {

    private final FeatureToggleProperties features;

    public boolean isFeatureEnabled(String featureName) {
        return features.getEnabled().getOrDefault(featureName, false);
    }

    public boolean shouldUserSeeFeature(String featureName, String userId) {
        Integer rolloutPercent = features.getRolloutPercentage()
            .getOrDefault(featureName, 0);

        int userHash = Math.abs(userId.hashCode()) % 100;
        return userHash < rolloutPercent;
    }
}
```

---

## External Configuration

### Spring Cloud Config Server

```java
// pom.xml - Add dependency
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-client</artifactId>
</dependency>

// application.yml
spring:
  cloud:
    config:
      uri: http://config-server.example.com:8888
      username: ${CONFIG_USER}
      password: ${CONFIG_PASSWORD}
      label: main  # Git branch

  profiles:
    active: production

// Configuration in Git repository:
// git@github.com:company/config-repo.git
//
// application.yml
// application-prod.yml
// application-dev.yml
//
// Config server serves these files based on profile
```

### Secrets Management

```java
// Method 1: Environment Variables (Simple)
export DB_PASSWORD=secure_password_123
export API_KEY=sk_live_abc123xyz

// Method 2: .env File (Development Only)
// .env (NEVER commit this!)
DB_PASSWORD=dev_password
API_KEY=dev_key

// application.yml
spring:
  datasource:
    password: ${DB_PASSWORD}
app:
  api-key: ${API_KEY}

// Method 3: Secrets Management Service (Production)
// Use: HashiCorp Vault, AWS Secrets Manager, Azure Key Vault

// Method 4: Spring Cloud Vault
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-vault-config</artifactId>
</dependency>

// application.yml
spring:
  cloud:
    vault:
      host: vault.example.com
      port: 8200
      scheme: https
      authentication: TOKEN
      token: ${VAULT_TOKEN}
      kv-version: 2
      application-name: my-service

/**
 * Now Spring will fetch secrets from Vault:
 * vault kv put secret/data/my-service username=admin password=secure
 */
```

---

## Best Practices

### ✅ DO: Use Type-Safe Configuration Properties

```java
// ✅ Good - Type-safe, validated, IDE support
@Configuration
@ConfigurationProperties(prefix = "app")
@Data
@Validated
public class AppProperties {
    @NotBlank
    private String name;
    @Min(1)
    private int maxRetries = 3;
}

// Usage
@Service
public class MyService {
    private final AppProperties props;

    public MyService(AppProperties props) {
        this.props = props;  // Type-safe!
    }
}

// ❌ Bad - Scattered @Value annotations
@Service
public class MyService {
    @Value("${app.name}")
    private String name;

    @Value("${app.maxRetries}")
    private int maxRetries;
}
```

### ✅ DO: Never Hardcode Secrets

```java
// ❌ NEVER
public class DatabaseConfig {
    private static final String PASSWORD = "super_secret_123";
}

// ✅ Good - From environment variable
private String password = System.getenv("DB_PASSWORD");

// ✅ Better - From configuration
spring:
  datasource:
    password: ${DB_PASSWORD}
```

### ✅ DO: Different Configs for Different Environments

```yaml
# application.yml - shared defaults
logging:
  level:
    root: WARN

# application-dev.yml - development overrides
logging:
  level:
    root: DEBUG

# application-prod.yml - production overrides
logging:
  level:
    root: WARN
  file:
    name: /var/log/app.log
```

### ❌ DON'T: Commit Secrets to Git

```bash
# Good .gitignore
*.env
application-local.yml
secrets/
private/

# Even better: Use git-crypt or sealed-secrets
```

### ✅ DO: Document Configuration

```java
/**
 * Application Configuration Properties
 *
 * Prefix: app
 *
 * Common properties:
 * app.name - Application name (required)
 * app.version - Application version (default: 1.0.0)
 * app.debug - Enable debug mode (default: false)
 *
 * Database properties:
 * app.database.host - Database host (required in production)
 * app.database.port - Database port (default: 5432)
 * app.database.max-connections - Connection pool size (default: 10)
 *
 * Example:
 * app:
 *   name: user-service
 *   version: 2.1.0
 *   database:
 *     host: db.example.com
 *     port: 5432
 *     max-connections: 20
 */
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    // ...
}
```

---

## Practice Questions

### Question 1: What Happens When You Define the Same Property in Multiple Places?

**Q**: If you set `server.port` in both `application.yml` and as an environment variable, which wins?

**A**: Environment variable wins (it's more specific to the deployment). Spring reads in this order:

1. application.yml
2. Environment variables (higher priority)
3. Command line arguments (highest priority)

```bash
# application.yml has: server.port: 8080
export SERVER_PORT=9000  # This wins!
java -jar app.jar --server.port=9001  # This wins!

# Final: 9001 (command line has highest priority)
```

### Question 2: How Do You Prevent Secrets From Leaking?

**Q**: How should you handle API keys and passwords?

**A**: Use environment variables or a secrets management service, **never hardcode**:

```java
// ❌ Never
private static final String API_KEY = "sk_live_abc123";

// ✅ Good
private String apiKey = System.getenv("API_KEY");

// ✅ Better - Type-safe
@Configuration
@ConfigurationProperties(prefix = "app.external")
public class ExternalServiceConfig {
    private String apiKey;  // Comes from ${APP_EXTERNAL_API_KEY}
}
```

### Question 3: Why Use Profiles Instead of Multiple Branches?

**Q**: Why have `application-prod.yml` instead of a separate git branch for production?

**A**: One code base, multiple configurations:

- Same binary deployed everywhere
- Easy to promote code without rebuilding
- Developers can test different configs locally
- Configuration changes don't require recompile

```bash
# Same jar runs in all environments
java -jar app.jar --spring.profiles.active=dev
java -jar app.jar --spring.profiles.active=prod
```

---

## Key Takeaways

1. **Externalize configuration**: Keep secrets and environment-specific settings out of code
2. **Use profiles**: Different configs for dev, test, prod
3. **Type-safe properties**: Use @ConfigurationProperties, not scattered @Value annotations
4. **Validate configuration**: Use @Validated to catch config errors at startup
5. **Never commit secrets**: Use environment variables or secrets management service
6. **Document your configuration**: Make it clear what properties are available
7. **Set sensible defaults**: application.yml has defaults, profiles override them
8. **Use environment variables for secrets**: Industry standard practice
9. **Different behaviors by environment**: Caching, logging, DDL strategies
10. **Support multiple configuration sources**: Files, env vars, command line arguments
