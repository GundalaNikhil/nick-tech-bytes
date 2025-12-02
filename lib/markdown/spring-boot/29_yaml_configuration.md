# Tutorial 29: YAML Configuration ⚙️

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Solution Approach](#solution-approach)
3. [Prerequisites & Requirements](#prerequisites--requirements)
4. [Key Topics & Plan of Action](#key-topics--plan-of-action)
5. [Complete Implementation](#complete-implementation)
6. [Important Considerations](#important-considerations)
7. [Visual Representations](#visual-representations)
8. [Practice Questions](#practice-questions)

---

## 1. Understanding the Question ❓

### What are we trying to achieve?

- **What is YAML Configuration?** - Human-readable hierarchical format for configuring Spring Boot using .yml/.yaml files
- **Why use it?** - More readable than properties files, better for nested configurations, supports lists and maps natively
- **When to use?** - Complex configurations with nested properties, multi-environment setups, microservices
- **How does it work?** - Spring Boot automatically reads application.yml and creates ConfigurableEnvironment with typed properties
- **What are best practices?** - Use profiles, validate configurations, externalize sensitive data

### The Problem It Solves

**Before YAML (application.properties):**

```properties
# Flat, hard to visualize hierarchy
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
app.security.jwt.secret=super-secret-key
app.security.jwt.expiration=3600
app.email.host=smtp.gmail.com
app.email.port=587
app.email.username=noreply@example.com
app.email.password=email-password
app.logging.level.root=INFO
app.logging.level.com.example=DEBUG
```

**With YAML (application.yml):**

```yaml
# Clear hierarchy, much more readable!
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQL8Dialect

app:
  security:
    jwt:
      secret: super-secret-key
      expiration: 3600
  email:
    host: smtp.gmail.com
    port: 587
    username: noreply@example.com
    password: email-password
  logging:
    level:
      root: INFO
      com.example: DEBUG
```

---

## 2. Solution Approach 🎯

### Definition

**YAML Configuration** in Spring Boot provides a structured, hierarchical way to define application properties using YAML syntax, offering better readability and native support for complex data structures like lists and nested objects.

### YAML Format Basics

```yaml
# Key-value pairs with colons
key: value

# Nested properties (indentation matters - use 2 spaces)
parent:
  child: value
  another-child: value

# Lists (arrays)
items:
  - item1
  - item2
  - item3

# Nested lists
servers:
  - name: server1
    port: 8080
  - name: server2
    port: 8081

# Inline lists
ports: [8080, 8081, 8082]

# Multiline strings
description: |
  This is a
  multiline string
  preserving newlines
```

---

## 3. Complete Implementation 💻

### Example 1: Structured YAML Configuration

**application.yml** (Main configuration)

```yaml
# Application name and version
spring:
  application:
    name: springboot-yaml-demo
    version: 1.0.0

  # Server configuration
  server:
    servlet:
      context-path: /api
    port: 8080
    error:
      include-message: always
      include-binding-errors: always

  # Database configuration with hierarchy
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 20000
      idle-timeout: 300000
      max-lifetime: 1200000

  # JPA/Hibernate configuration
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQL8Dialect
        jdbc:
          batch_size: 20
        order_inserts: true
        order_updates: true

  # Cache configuration
  cache:
    type: redis
    redis:
      time-to-live: 600000

  # Jackson JSON configuration
  jackson:
    serialization:
      write-dates-as-timestamps: false
      indent-output: true
    default-property-inclusion: non_null

  # Security configuration
  security:
    user:
      name: admin
      password: admin123
      roles: ADMIN

# Application-specific configuration
app:
  # Security settings
  security:
    jwt:
      secret: ${JWT_SECRET:default-secret-key-change-in-production}
      expiration: 3600 # seconds
      refresh-expiration: 604800 # 7 days
    cors:
      allowed-origins:
        - http://localhost:3000
        - http://localhost:4200
      allowed-methods: GET,POST,PUT,DELETE,OPTIONS
      allowed-headers: "*"
      allow-credentials: true
      max-age: 3600

  # Email configuration
  email:
    enabled: true
    smtp:
      host: smtp.gmail.com
      port: 587
      username: ${EMAIL_USERNAME}
      password: ${EMAIL_PASSWORD}
      auth: true
      starttls:
        enabled: true
        required: true
    from: noreply@example.com
    templates:
      welcome-subject: Welcome to Our Application
      reset-password-subject: Reset Your Password

  # Logging configuration
  logging:
    level:
      root: INFO
      com.example: DEBUG
      org.springframework.web: DEBUG
      org.hibernate.SQL: DEBUG
    pattern:
      console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
      file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
    file:
      name: logs/application.log
      max-size: 10MB
      max-history: 10
    history: 10

  # Feature flags
  features:
    email-notifications: true
    two-factor-auth: false
    advanced-analytics: true

  # API rate limiting
  rate-limiting:
    enabled: true
    requests-per-minute: 60
    requests-per-hour: 1000

  # Pagination defaults
  pagination:
    default-page-size: 20
    max-page-size: 100

  # File upload configuration
  file-upload:
    enabled: true
    max-file-size: 10MB
    allowed-extensions:
      - pdf
      - doc
      - docx
      - jpg
      - png
    upload-dir: /uploads

# Actuator endpoints for monitoring
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized
```

**application-dev.yml** (Development profile)

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:devdb
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
      path: /h2-console
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true

app:
  security:
    jwt:
      secret: dev-secret-key-change-me
  logging:
    level:
      root: INFO
      com.example: DEBUG
      org.springframework.web: DEBUG
```

**application-prod.yml** (Production profile)

```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate # Never auto-create in production
  cache:
    type: redis
    redis:
      host: ${REDIS_HOST}
      port: ${REDIS_PORT}

app:
  security:
    jwt:
      secret: ${JWT_SECRET}
  logging:
    level:
      root: WARN
      com.example: INFO
```

---

### Example 2: Binding YAML to Java Objects with @ConfigurationProperties

**Configuration Classes**

```java
package com.example.config;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Bind app.security properties from YAML to Java object
 * Provides type-safe access to configuration
 */
@Data
@Component
@ConfigurationProperties(prefix = "app.security")
public class SecurityProperties {

    private JwtProperties jwt;
    private CorsProperties cors;

    @Data
    public static class JwtProperties {
        private String secret;
        private long expiration;  // Automatically converted to long
        private long refreshExpiration;
    }

    @Data
    public static class CorsProperties {
        private List<String> allowedOrigins = new ArrayList<>();
        private List<String> allowedMethods = new ArrayList<>();
        private String allowedHeaders;
        private boolean allowCredentials;
        private int maxAge;
    }
}

/**
 * Bind app.email properties
 */
@Data
@Component
@ConfigurationProperties(prefix = "app.email")
public class EmailProperties {

    private boolean enabled;
    private SmtpProperties smtp;
    private String from;
    private Map<String, String> templates;  // Maps to templates section

    @Data
    public static class SmtpProperties {
        private String host;
        private int port;
        private String username;
        private String password;
        private boolean auth;
        private StartTlsProperties starttls;

        @Data
        public static class StartTlsProperties {
            private boolean enabled;
            private boolean required;
        }
    }
}

/**
 * Bind app.logging properties
 */
@Data
@Component
@ConfigurationProperties(prefix = "app.logging")
public class LoggingProperties {

    private Map<String, String> level;  // Maps to level section
    private PatternProperties pattern;
    private FileProperties file;
    private int history;

    @Data
    public static class PatternProperties {
        private String console;
        private String file;
    }

    @Data
    public static class FileProperties {
        private String name;
        private String maxSize;
        private int maxHistory;
    }
}
```

**Using Configuration Properties in Services**

```java
package com.example.service;

import com.example.config.EmailProperties;
import com.example.config.SecurityProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final EmailProperties emailConfig;

    public void sendEmail(String to, String subject, String body) {
        // Access configuration with type safety
        if (!emailConfig.isEnabled()) {
            log.warn("Email service disabled");
            return;
        }

        String from = emailConfig.getFrom();
        String smtpHost = emailConfig.getSmtp().getHost();
        int smtpPort = emailConfig.getSmtp().getPort();
        String username = emailConfig.getSmtp().getUsername();
        String password = emailConfig.getSmtp().getPassword();

        // Send email using these properties...
        log.info("Sending email from {} to {}", from, to);
    }
}

@Service
@RequiredArgsConstructor
public class JwtService {

    private final SecurityProperties securityConfig;

    public String generateToken(String subject) {
        String secret = securityConfig.getJwt().getSecret();
        long expiration = securityConfig.getJwt().getExpiration();

        // Generate JWT token using secret and expiration...
        log.info("Token will expire in {} seconds", expiration);
        return "token";
    }
}
```

---

### Example 3: List and Map Configurations

**YAML with Collections**

```yaml
app:
  # List of servers
  servers:
    - name: production-db
      host: prod-db.example.com
      port: 3306
    - name: staging-db
      host: staging-db.example.com
      port: 3306
    - name: development-db
      host: localhost
      port: 3306

  # Map of feature flags
  features:
    email-notifications: true
    sms-notifications: false
    two-factor-auth: true
    social-login: false

  # List of allowed file types with properties
  file-types:
    - extension: pdf
      mime-type: application/pdf
      max-size: 10MB
    - extension: jpg
      mime-type: image/jpeg
      max-size: 5MB
    - extension: png
      mime-type: image/png
      max-size: 5MB
```

**Configuration Classes for Collections**

```java
package com.example.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;

@Data
@Component
@ConfigurationProperties(prefix = "app")
public class AppCollectionProperties {

    // List of server configurations
    private List<Server> servers;

    // Map of boolean feature flags
    private Map<String, Boolean> features;

    // List of objects with nested properties
    private List<FileType> fileTypes;

    @Data
    public static class Server {
        private String name;
        private String host;
        private int port;
    }

    @Data
    public static class FileType {
        private String extension;
        private String mimeType;
        private String maxSize;
    }
}
```

**Using Collections in Code**

```java
@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final AppCollectionProperties appConfig;

    public boolean isFileTypeAllowed(String extension) {
        return appConfig.getFileTypes().stream()
            .anyMatch(ft -> ft.getExtension().equals(extension));
    }

    public String getMaxFileSize(String extension) {
        return appConfig.getFileTypes().stream()
            .filter(ft -> ft.getExtension().equals(extension))
            .map(FileType::getMaxSize)
            .findFirst()
            .orElse("5MB");
    }

    public boolean isFeatureEnabled(String feature) {
        return appConfig.getFeatures().getOrDefault(feature, false);
    }
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Externalize Sensitive Data

```yaml
✅ DO: Use environment variables for secrets
jwt:
  secret: ${JWT_SECRET}  # Read from environment
  expiration: 3600

❌ DON'T: Hardcode passwords in YAML
jwt:
  secret: hardcoded-secret-exposed  # SECURITY RISK!

📝 WHY: Prevents secrets from being committed to git
```

#### 2. Use Configuration Profiles

```yaml
✅ DO: Create separate files for each environment
- application.yml           (defaults)
- application-dev.yml       (development)
- application-prod.yml      (production)
- application-test.yml      (testing)

Run with: java -jar app.jar --spring.profiles.active=prod

❌ DON'T: Use if/else logic in code to handle configs

📝 WHY: Clear separation, easy deployment, environment-specific tuning
```

#### 3. Validate Configuration with @Validated

```java
✅ DO: Validate configuration values
@Data
@Component
@Validated
@ConfigurationProperties(prefix = "app.email")
public class EmailProperties {
    @NotBlank  // Must not be blank
    private String from;

    @Min(1)    // Must be >= 1
    @Max(65535)  // Must be <= 65535
    private int port;
}

❌ DON'T: Trust configuration values without validation

📝 WHY: Catch configuration errors early at startup
```

---

### Common Pitfalls

#### Pitfall 1: Indentation Issues (YAML is Whitespace-Sensitive)

**Problem:**

```yaml
spring:
datasource: # WRONG INDENTATION! Should be under spring
  url: jdbc:mysql://...
```

**Solution:**

```yaml
spring:
  datasource: # Correct: properly indented under spring
    url: jdbc:mysql://...
```

**Explanation:**
YAML uses spaces (not tabs) for indentation. Incorrect indentation causes parsing errors.

---

#### Pitfall 2: Property Name Conversion Issues

**Problem:**

```yaml
spring.jpa.properties.hibernate.jdbc_batch_size: 20 # Wrong!
```

**Solution:**

```yaml
spring:
  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 20

# Or with dashes (Spring converts dashes to underscores)
spring.jpa.properties.hibernate.jdbc-batch-size: 20
```

**Explanation:**
Spring converts kebab-case to camelCase and underscores. Use consistent naming.

---

#### Pitfall 3: Environment Variable Not Loaded

**Problem:**

```yaml
jwt:
  secret: ${JWT_SECRET} # Environment variable not set
```

Application fails to start with "Could not resolve placeholder".

**Solution:**

```yaml
# Provide default value
jwt:
  secret: ${JWT_SECRET:default-secret-change-me}

# Or set environment variable before running
export JWT_SECRET="your-secret-key"
java -jar app.jar
```

**Explanation:**
If environment variable is missing, use default value with colon syntax.

---

## 7. Visual Representations 📊

### Diagram 1: YAML Property Resolution

```
┌─────────────────────────────────────┐
│  application.yml (loaded first)     │
│  Default values                     │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  application-{profile}.yml          │
│  Profile-specific overrides         │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Environment Variables              │
│  Run-time overrides                 │
│  export SPRING_DATASOURCE_URL=...   │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Command-line Arguments             │
│  Highest priority                   │
│  --spring.profiles.active=prod      │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Final Configuration                │
│  Used by application                │
└─────────────────────────────────────┘

Priority (highest to lowest):
1. Command-line arguments
2. Environment variables
3. Profile-specific YAML
4. Default application.yml
```

### Diagram 2: YAML Hierarchy Visualization

```
application:
├── spring
│   ├── datasource
│   │   ├── url
│   │   ├── username
│   │   └── password
│   ├── jpa
│   │   ├── show-sql
│   │   └── properties
│   │       └── hibernate
│   │           ├── format_sql
│   │           └── dialect
│   └── cache
│       ├── type
│       └── redis
│           └── time-to-live
│
└── app
    ├── security
    │   ├── jwt
    │   │   ├── secret
    │   │   └── expiration
    │   └── cors
    │       ├── allowed-origins: [...]
    │       └── allowed-methods: [...]
    ├── email
    │   ├── enabled
    │   └── smtp
    │       ├── host
    │       ├── port
    │       └── username
    └── logging
        ├── level
        │   ├── root
        │   └── com.example
        └── pattern
            ├── console
            └── file
```

---

## 8. Practice Questions 📝

### Beginner Level

**Question 1: YAML vs Properties Files**

```
Q: Why use YAML instead of .properties files?

A: YAML advantages:
   1. Hierarchy: Nested properties are visible
   2. Readability: Less repetition (no prefix)
   3. Collections: Native list and map support
   4. Comments: More readable with explanations

   Properties: flat, verbose, harder to visualize structure
   YAML: hierarchical, concise, clear structure
```

**Question 2: What triggers a profile-specific YAML file?**

```
Q: How do you activate application-prod.yml?

A: Multiple ways:
   1. JVM argument:
      java -jar app.jar --spring.profiles.active=prod

   2. Environment variable:
      export SPRING_PROFILES_ACTIVE=prod

   3. In application.yml:
      spring:
        profiles:
          active: prod
```

**Question 3: How do you use environment variables in YAML?**

```
Q: Load sensitive data from environment variables

A: Use ${VARIABLE_NAME} syntax:

   jwt:
     secret: ${JWT_SECRET}

   database:
     password: ${DB_PASSWORD:default-pass}

   Format: ${ENV_VAR_NAME:default_value}
```

---

### Intermediate Level

**Question 4: Create a @ConfigurationProperties class**

```
Q: Bind app.security.jwt section to Java object

A:
@Data
@Component
@ConfigurationProperties(prefix = "app.security.jwt")
public class JwtProperties {
    private String secret;
    private long expiration;
    private long refreshExpiration;
}

Usage in service:
@Service
public class TokenService {
    @Autowired
    private JwtProperties jwtConfig;
}
```

**Question 5: Bind a list of objects from YAML**

```
Q: Configure list of allowed file types

A: YAML:
   app:
     file-types:
       - extension: pdf
         mime-type: application/pdf
       - extension: jpg
         mime-type: image/jpeg

Java:
@Data
@Component
@ConfigurationProperties(prefix = "app")
public class FileConfig {
    private List<FileType> fileTypes;

    @Data
    static class FileType {
        private String extension;
        private String mimeType;
    }
}
```

**Question 6: Validate configuration values**

```
Q: Ensure JWT secret is not empty

A:
@Data
@Validated
@Component
@ConfigurationProperties(prefix = "app.security.jwt")
public class JwtProperties {
    @NotBlank(message = "JWT secret must not be blank")
    private String secret;

    @Min(60)
    @Max(86400)
    private long expiration;
}

Spring validates on startup!
```

---

## 🎯 Key Takeaways

1. ✅ **YAML is more readable** - Hierarchy is clear, less repetition
2. ✅ **Use profiles for environments** - dev, test, prod with separate files
3. ✅ **Externalize secrets** - Use ${ENV_VAR} for sensitive data
4. ✅ **Type-safe binding** - @ConfigurationProperties for compile-time safety
5. ✅ **Validate configuration** - Use @Validated to catch errors early
6. ✅ **Property resolution order** - CLI args > env vars > profiles > defaults

---

## Changelog

- **2025-11-23**: Initial creation with complete YAML examples
- **Added**: Configuration profiles and property binding patterns
- **Added**: Collections and list handling with type safety

**Congratulations! You now master YAML Configuration! 🎉**

_Use YAML for cleaner, more maintainable configurations!_
