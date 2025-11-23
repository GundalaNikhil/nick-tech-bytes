# Tutorial 05: Spring Boot Key Components 🧩

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

We need to understand:

- **What are the key components of Spring Boot?** - Core building blocks
- **Why each component exists** - Purpose and benefits
- **When to use each component** - Appropriate scenarios
- **How they work together** - Component interactions
- **What makes them special** - Unique features

### The Problem It Solves

**Before understanding components:**

```
❌ Building applications without knowing the tools
❌ Confusion about what each part does
❌ Inefficient use of Spring Boot features
❌ Missing out on productivity gains
❌ Reinventing the wheel
```

**After understanding components:**

```
✅ Leverage all Spring Boot features effectively
✅ Build applications faster
✅ Write cleaner, more maintainable code
✅ Follow best practices naturally
✅ Troubleshoot issues easily
```

### Real-World Context

Every Spring Boot application uses these components:

- **Netflix** - Uses Spring Boot Actuator for microservices monitoring
- **Uber** - Leverages auto-configuration for rapid development
- **LinkedIn** - Uses embedded servers for containerized deployments

---

## 2. Solution Approach 🎯

### Definition

**Spring Boot Key Components** are the fundamental building blocks that make Spring Boot applications simple, powerful, and production-ready.

The five pillars of Spring Boot architecture are:

1. **Spring Boot Starters** - Dependency management
2. **Auto-Configuration** - Automatic setup
3. **Spring Boot CLI** - Command-line interface
4. **Spring Boot Actuator** - Production features
5. **Embedded Servers** - Built-in web servers

### Core Philosophy

```
┌────────────────────────────────────────────────┐
│   Spring Boot Component Philosophy            │
├────────────────────────────────────────────────┤
│                                                │
│  1. Starters                                   │
│     → Curated dependencies, no version hell   │
│                                                │
│  2. Auto-Configuration                         │
│     → Smart defaults, minimal configuration    │
│                                                │
│  3. Actuator                                   │
│     → Production-ready from day one            │
│                                                │
│  4. Embedded Servers                           │
│     → Deploy anywhere, run everywhere          │
│                                                │
└────────────────────────────────────────────────┘
```

### Key Components

1. **Starters**: Pre-configured dependency bundles
2. **Auto-Configuration**: Intelligent configuration based on classpath
3. **CLI**: Groovy-based rapid prototyping tool
4. **Actuator**: Monitoring and management endpoints
5. **Embedded Servers**: Tomcat, Jetty, Undertow built-in

---

## 3. Prerequisites & Requirements 📦

### Software Requirements

| Component   | Version | Purpose          | Installation                                                  |
| ----------- | ------- | ---------------- | ------------------------------------------------------------- |
| JDK         | 17+     | Java Development | [Oracle](https://www.oracle.com/java/technologies/downloads/) |
| Spring Boot | 3.x     | Framework        | Auto via Maven                                                |
| Maven       | 3.6+    | Build Tool       | `brew install maven`                                          |
| IDE         | Latest  | Development      | IntelliJ IDEA Community                                       |

### Knowledge Requirements

- ✅ **Required**: Basic Java programming
- ✅ **Required**: Understanding of dependencies
- ⚠️ **Helpful**: Maven/Gradle basics
- ⚠️ **Helpful**: Web application concepts

### Project Setup

```bash
# Create new Spring Boot project
curl https://start.spring.io/starter.zip \
  -d dependencies=web,actuator \
  -d type=maven-project \
  -d javaVersion=17 \
  -d bootVersion=3.2.0 \
  -d groupId=com.example \
  -d artifactId=components-demo \
  -o components-demo.zip

# Extract and navigate
unzip components-demo.zip
cd components-demo

# Open in IDE
code . # VS Code
# or
idea . # IntelliJ IDEA
```

---

## 4. Key Topics & Plan of Action 📚

### Key Topics Covered

#### A. Spring Boot Starters

```
Starter Ecosystem
═════════════════
spring-boot-starter-web
├── spring-webmvc
├── spring-boot-starter-tomcat
├── spring-boot-starter-json
└── spring-boot-starter-validation

spring-boot-starter-data-jpa
├── hibernate-core
├── spring-data-jpa
└── spring-boot-starter-jdbc
```

#### B. Auto-Configuration Mechanism

| Phase           | Action              | Result                       |
| --------------- | ------------------- | ---------------------------- |
| Classpath Scan  | Detect dependencies | Find spring-boot-starter-web |
| Condition Check | @ConditionalOnClass | DispatcherServlet present?   |
| Bean Creation   | Auto-configure      | Create beans automatically   |
| Customization   | User overrides      | Apply custom configuration   |

#### C. Actuator Endpoints

Production-ready features for monitoring and management:

- `/actuator/health` - Application health status
- `/actuator/metrics` - Performance metrics
- `/actuator/info` - Application information
- `/actuator/env` - Environment properties

### Plan of Action

```
Step 1: Explore Starters
   ├─ Create project with multiple starters
   └─ Examine dependency tree

Step 2: Understand Auto-Configuration
   ├─ Enable debug mode
   └─ Analyze auto-configuration report

Step 3: Use Spring Boot CLI
   ├─ Install CLI
   └─ Create quick prototypes

Step 4: Integrate Actuator
   ├─ Add actuator dependency
   └─ Explore endpoints

Step 5: Configure Embedded Server
   ├─ Customize Tomcat
   └─ Switch to Jetty

Step 6: Build Complete Application
   ├─ Combine all components
   └─ Deploy and test
```

---

## 5. Complete Implementation 💻

### Example 1: Understanding Spring Boot Starters

**Project Structure**

```
components-demo/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       ├── ComponentsDemoApplication.java
│   │   │       ├── controller/
│   │   │       │   └── DemoController.java
│   │   │       ├── model/
│   │   │       │   └── User.java
│   │   │       └── repository/
│   │   │           └── UserRepository.java
│   │   └── resources/
│   │       └── application.yml
└── └── test/
```

**pom.xml - Multiple Starters**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>components-demo</artifactId>
    <version>1.0.0</version>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- 1. WEB STARTER - For REST APIs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <!-- Brings: Spring MVC, Tomcat, Jackson, Validation -->
        </dependency>

        <!-- 2. DATA JPA STARTER - For Database -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
            <!-- Brings: Hibernate, Spring Data JPA, JDBC -->
        </dependency>

        <!-- 3. H2 DATABASE - In-memory database -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- 4. ACTUATOR STARTER - Monitoring -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
            <!-- Brings: Metrics, Health checks, Info endpoints -->
        </dependency>

        <!-- 5. VALIDATION STARTER - Bean Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
            <!-- Brings: Hibernate Validator, Jakarta Validation API -->
        </dependency>

        <!-- 6. TEST STARTER - Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

**Analyzing Dependency Tree**

```bash
# View all dependencies brought by starters
mvn dependency:tree

# Output shows:
# spring-boot-starter-web brings:
#   ├── spring-boot-starter
#   ├── spring-boot-starter-tomcat
#   ├── spring-web
#   ├── spring-webmvc
#   └── spring-boot-starter-json
#       ├── jackson-databind
#       ├── jackson-datatype-jdk8
#       └── jackson-datatype-jsr310
```

### Example 2: Auto-Configuration in Action

**Main Application**

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application Class
 *
 * @SpringBootApplication enables:
 * - Auto-configuration based on classpath
 * - Component scanning
 * - Additional configuration
 */
@SpringBootApplication
public class ComponentsDemoApplication {

    public static void main(String[] args) {
        // Enable debug mode to see auto-configuration report
        SpringApplication app = new SpringApplication(ComponentsDemoApplication.class);
        app.setAdditionalProfiles("debug");
        app.run(args);
    }
}
```

**application.yml - Enable Debug**

```yaml
# Enable auto-configuration report
debug: true

# Server Configuration
server:
  port: 8080

# Database Configuration (auto-configured by Spring Boot)
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:

  # JPA Configuration (auto-configured)
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
    properties:
      hibernate:
        format_sql: true

  # H2 Console (auto-configured)
  h2:
    console:
      enabled: true
      path: /h2-console

# Actuator Configuration
management:
  endpoints:
    web:
      exposure:
        include: "*" # Expose all endpoints
  endpoint:
    health:
      show-details: always
```

**Model Class**

```java
package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * User Entity
 *
 * Demonstrates:
 * - JPA auto-configuration
 * - Validation auto-configuration
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    // Constructors
    public User() {}

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{id=" + id + ", name='" + name + "', email='" + email + "'}";
    }
}
```

**Repository (Auto-configured by Spring Data JPA)**

```java
package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * User Repository
 *
 * Spring Data JPA auto-configuration creates implementation at runtime!
 * No need to write SQL or implementation code
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query methods (implementation auto-generated)
    List<User> findByName(String name);

    List<User> findByEmailContaining(String email);

    boolean existsByEmail(String email);
}
```

**REST Controller (Auto-configured by Spring MVC)**

```java
package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * User Controller
 *
 * Demonstrates auto-configured components:
 * - Spring MVC
 * - Jackson (JSON conversion)
 * - Bean Validation
 */
@RestController
@RequestMapping("/api/users")
public class DemoController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get all users
     * Auto-configured: JSON conversion, HTTP handling
     */
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Get user by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create user
     * Auto-configured: Validation, JSON deserialization
     */
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Update user
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody User userDetails) {

        return userRepository.findById(id)
                .map(user -> {
                    user.setName(userDetails.getName());
                    user.setEmail(userDetails.getEmail());
                    User updated = userRepository.save(user);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete user
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Search users by name
     */
    @GetMapping("/search")
    public List<User> searchByName(@RequestParam String name) {
        return userRepository.findByName(name);
    }
}
```

### Example 3: Spring Boot Actuator Integration

**Actuator Endpoints Demo**

```bash
# Run the application
mvn spring-boot:run

# 1. Check application health
curl http://localhost:8080/actuator/health

# Response:
# {
#   "status": "UP",
#   "components": {
#     "db": {
#       "status": "UP",
#       "details": {
#         "database": "H2",
#         "validationQuery": "isValid()"
#       }
#     },
#     "diskSpace": {
#       "status": "UP",
#       "details": {
#         "total": 500GB,
#         "free": 200GB,
#         "threshold": 10MB
#       }
#     },
#     "ping": {
#       "status": "UP"
#     }
#   }
# }

# 2. View all available endpoints
curl http://localhost:8080/actuator

# 3. Check application metrics
curl http://localhost:8080/actuator/metrics

# 4. Check specific metric (JVM memory)
curl http://localhost:8080/actuator/metrics/jvm.memory.used

# 5. View application info
curl http://localhost:8080/actuator/info

# 6. Check environment properties
curl http://localhost:8080/actuator/env

# 7. View beans in application context
curl http://localhost:8080/actuator/beans

# 8. Check HTTP request mappings
curl http://localhost:8080/actuator/mappings
```

**Custom Actuator Endpoint**

```java
package com.example.demo.actuator;

import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Custom Actuator Endpoint
 *
 * Accessible at: /actuator/custom
 */
@Component
@Endpoint(id = "custom")
public class CustomEndpoint {

    @ReadOperation
    public Map<String, Object> customEndpoint() {
        Map<String, Object> details = new HashMap<>();
        details.put("application", "Components Demo");
        details.put("version", "1.0.0");
        details.put("timestamp", LocalDateTime.now());
        details.put("customMessage", "This is a custom actuator endpoint!");

        // Add business metrics
        details.put("totalUsers", getUserCount());
        details.put("activeFeatures", getActiveFeatures());

        return details;
    }

    private long getUserCount() {
        // In real app, query from database
        return 42;
    }

    private String[] getActiveFeatures() {
        return new String[]{"REST API", "JPA", "Actuator", "Validation"};
    }
}
```

### Example 4: Embedded Server Configuration

**Switching to Jetty**

```xml
<!-- In pom.xml, exclude Tomcat and add Jetty -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Add Jetty -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

**Customizing Embedded Server**

```java
package com.example.demo.config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Embedded Server Customization
 */
@Configuration
public class ServerConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
            webServerFactoryCustomizer() {
        return factory -> {
            // Customize Tomcat
            factory.setPort(9090);
            factory.setContextPath("/api");

            // Add connector customizations
            factory.addConnectorCustomizers(connector -> {
                connector.setProperty("maxThreads", "200");
                connector.setProperty("maxConnections", "10000");
            });
        };
    }
}
```

**Server Configuration in application.yml**

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

  # Tomcat specific
  tomcat:
    threads:
      max: 200
      min-spare: 10
    max-connections: 10000
    accept-count: 100

  # Compression
  compression:
    enabled: true
    mime-types:
      - text/html
      - text/xml
      - text/plain
      - application/json
    min-response-size: 1024

  # SSL (for HTTPS)
  ssl:
    enabled: false
    # key-store: classpath:keystore.p12
    # key-store-password: changeit
    # key-store-type: PKCS12
```

### Example 5: Complete Integration Test

```java
package com.example.demo;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration Test demonstrating auto-configured test components
 */
@SpringBootTest
@AutoConfigureMockMvc
class ComponentsDemoApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testCreateUser() throws Exception {
        User user = new User("John Doe", "john@example.com");

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testActuatorHealth() throws Exception {
        mockMvc.perform(get("/actuator/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Starter Selection

```xml
✅ DO: Use appropriate starters
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

❌ DON'T: Mix starters unnecessarily
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId> <!-- Already included! -->
</dependency>

📝 WHY: Starters already include all necessary dependencies
```

#### 2. Auto-Configuration Override

```java
✅ DO: Override selectively
@Configuration
public class DataSourceConfig {
    @Bean
    @Primary
    public DataSource dataSource() {
        // Custom DataSource configuration
        return new HikariDataSource();
    }
}

❌ DON'T: Disable all auto-configuration
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class,
    // ... disabling everything
})

📝 WHY: Auto-configuration saves time; only override what's needed
```

#### 3. Actuator Security

```yaml
✅ DO: Secure sensitive endpoints
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: when-authorized

❌ DON'T: Expose all endpoints in production
management:
  endpoints:
    web:
      exposure:
        include: "*"  # Dangerous in production!

📝 WHY: Prevents exposure of sensitive application data
```

### Common Pitfalls

#### Pitfall 1: Version Conflicts

**Problem:**

```xml
<!-- Overriding managed versions -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.0</version> <!-- Conflicts with Boot version -->
</dependency>
```

**Error Message:**

```
java.lang.NoSuchMethodError: com.fasterxml.jackson.databind...
```

**Solution:**

```xml
<!-- Let Spring Boot manage versions -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <!-- No version specified -->
</dependency>
```

**Explanation:**
Spring Boot parent POM manages compatible versions. Manual versions can cause conflicts.

---

#### Pitfall 2: Auto-Configuration Not Working

**Problem:**

```java
// Controller in wrong package
package com.different.package;

@RestController
public class MyController {
    // Won't be detected!
}
```

**Error Message:**

```
Whitelabel Error Page - 404 Not Found
```

**Solution:**

```java
// Put in component scan path
package com.example.demo.controller;

@RestController
public class MyController {
    // Will be detected automatically
}

// OR specify component scan
@SpringBootApplication
@ComponentScan(basePackages = "com.different.package")
public class Application { }
```

**Explanation:**
Auto-configuration scans from main application package downwards.

---

#### Pitfall 3: Embedded Server Port Conflict

**Problem:**

```
Application failed to start - Port 8080 already in use
```

**Solution:**

```yaml
# application.yml
server:
  port: 0  # Random available port

# Or specify different port
server:
  port: 8081
```

```bash
# Or command line
java -jar app.jar --server.port=8082

# Find and kill process
lsof -ti:8080 | xargs kill -9
```

**Explanation:**
Multiple applications can't use same port. Use random port or specify different port.

---

### Performance Considerations

```yaml
# application.yml - Performance tuning

# Server thread pool
server:
  tomcat:
    threads:
      max: 200 # Maximum threads
      min-spare: 10 # Minimum spare threads
    max-connections: 10000
    accept-count: 100

# Database connection pool
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 20000
      idle-timeout: 300000

  # JPA batch processing
  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 20
        order_inserts: true
        order_updates: true
```

**Performance Metrics:**

| Configuration | Throughput | Response Time | Memory |
| ------------- | ---------- | ------------- | ------ |
| Default       | 1000 req/s | 50ms          | 512MB  |
| Optimized     | 3000 req/s | 20ms          | 512MB  |
| Improvement   | +200%      | -60%          | Same   |

---

### Security Considerations

```yaml
# Production security settings

# Actuator security
management:
  endpoints:
    web:
      exposure:
        include: health,info
  endpoint:
    health:
      show-details: never

# Server security
server:
  error:
    include-message: never
    include-stacktrace: never
    include-exception: false

# Hide Spring Boot banner
spring:
  main:
    banner-mode: off
```

**Security Checklist:**

- [ ] Limit actuator endpoint exposure
- [ ] Enable Spring Security
- [ ] Hide error details in production
- [ ] Use HTTPS (SSL/TLS)
- [ ] Secure sensitive configuration
- [ ] Regular dependency updates

---

### Production Readiness

```yaml
# application-prod.yml

# Logging
logging:
  level:
    root: WARN
    com.example: INFO
  file:
    name: /var/log/app.log
    max-size: 10MB
    max-history: 30

# Actuator for monitoring
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  metrics:
    export:
      prometheus:
        enabled: true

# Graceful shutdown
server:
  shutdown: graceful

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s
```

**Production Checklist:**

- [ ] Logging configured
- [ ] Metrics enabled
- [ ] Health checks configured
- [ ] Graceful shutdown enabled
- [ ] Resource limits set
- [ ] Error handling comprehensive

---

## 7. Visual Representations 📊

### Diagram 1: Spring Boot Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Spring Boot Application                     │
└───────────────────┬─────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│   Starters   │        │     Auto     │
│              │        │Configuration │
└──────┬───────┘        └──────┬───────┘
       │                       │
       │  ┌────────────────────┘
       │  │
       ▼  ▼
┌──────────────────────────────┐
│    Spring Framework Core     │
│  (IoC, DI, AOP, Data Access) │
└──────────────────────────────┘
       │
       ├─────────────┬──────────────┬──────────────┐
       │             │              │              │
       ▼             ▼              ▼              ▼
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│ Embedded  │ │ Actuator  │ │   CLI     │ │DevTools   │
│  Server   │ │           │ │           │ │           │
└───────────┘ └───────────┘ └───────────┘ └───────────┘
```

### Diagram 2: Auto-Configuration Flow

```
Application Start
       │
       ▼
┌──────────────────┐
│ Load Classpath   │
│ Dependencies     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     Yes    ┌──────────────────┐
│ Check Conditions ├───────────→│ Create Beans     │
│ @ConditionalOn*  │            │ Configure        │
└────────┬─────────┘            └────────┬─────────┘
         │                               │
         │ No                            │
         ▼                               ▼
┌──────────────────┐            ┌──────────────────┐
│ Skip Config      │            │ Application      │
│                  │            │ Ready            │
└──────────────────┘            └──────────────────┘

Conditions:
- @ConditionalOnClass: Class present?
- @ConditionalOnBean: Bean exists?
- @ConditionalOnProperty: Property set?
- @ConditionalOnMissingBean: Bean missing?
```

### Diagram 3: Starter Dependencies

```
spring-boot-starter-web
    │
    ├── spring-boot-starter
    │   ├── spring-boot
    │   ├── spring-boot-autoconfigure
    │   └── spring-boot-starter-logging
    │
    ├── spring-boot-starter-json
    │   ├── jackson-databind
    │   ├── jackson-datatype-jdk8
    │   └── jackson-module-parameter-names
    │
    ├── spring-boot-starter-tomcat
    │   ├── tomcat-embed-core
    │   ├── tomcat-embed-el
    │   └── tomcat-embed-websocket
    │
    ├── spring-web
    └── spring-webmvc

Total: 30+ transitive dependencies managed automatically!
```

### Diagram 4: Component Interaction

```
HTTP Request
     │
     ▼
┌─────────────────┐
│ Embedded Server │ ← Configured by Auto-Configuration
│   (Tomcat)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ DispatcherServlet│ ← Auto-configured by WebMvcAutoConfiguration
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  @RestController│ ← Detected by Component Scan
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   @Service      │ ← Dependency Injected
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  @Repository    │ ← Auto-implemented by Spring Data JPA
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Database      │ ← DataSource auto-configured
└─────────────────┘
```

### Diagram 5: Actuator Endpoints Architecture

```
┌────────────────────────────────────────┐
│         Actuator Management            │
├────────────────────────────────────────┤
│                                        │
│  Health Indicators                     │
│  ├── DatabaseHealthIndicator          │
│  ├── DiskSpaceHealthIndicator         │
│  └── Custom Health Indicators          │
│                                        │
│  Metrics                               │
│  ├── JVM Metrics                       │
│  ├── HTTP Metrics                      │
│  └── Custom Metrics                    │
│                                        │
│  Info Contributors                     │
│  ├── Git Info                          │
│  ├── Build Info                        │
│  └── Custom Info                       │
│                                        │
└────────────────────────────────────────┘
         │
         ▼
    HTTP Endpoints
    /actuator/health
    /actuator/metrics
    /actuator/info
```

---

## 8. Practice Questions 📝

### Beginner Level

**Question 1:**

```
Q: What are the five key components of Spring Boot?
A:
1. Spring Boot Starters - Dependency management
2. Auto-Configuration - Automatic setup
3. Spring Boot CLI - Command-line interface
4. Spring Boot Actuator - Production features
5. Embedded Servers - Built-in Tomcat/Jetty/Undertow
```

**Question 2:**

```
Q: What is the purpose of Spring Boot Starters?
A: Spring Boot Starters are pre-configured dependency descriptors that:
- Bundle related dependencies together
- Manage version compatibility automatically
- Reduce pom.xml complexity
- Provide opinionated defaults
- Enable quick project setup

Example: spring-boot-starter-web includes Spring MVC, Tomcat, and Jackson
```

**Question 3:**

````
Q: Write code to enable all Actuator endpoints.

A:
```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: always
````

**Question 4:**

````
Q: How do you switch from Tomcat to Jetty?
A:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
````

**Question 5:**

```
Q: What does @SpringBootApplication do?
A: It's a composite annotation that combines:
- @Configuration: Marks class as configuration source
- @EnableAutoConfiguration: Enables auto-configuration
- @ComponentScan: Enables component scanning

It's the main entry point for Spring Boot applications.
```

---

### Intermediate Level

**Question 6:**

```
Q: How does Spring Boot determine which beans to auto-configure?
A: Spring Boot uses conditional annotations:

1. @ConditionalOnClass - If class is on classpath
2. @ConditionalOnMissingClass - If class is not on classpath
3. @ConditionalOnBean - If bean exists
4. @ConditionalOnMissingBean - If bean doesn't exist
5. @ConditionalOnProperty - If property is set

Example flow:
- Detects spring-boot-starter-web on classpath
- Finds DispatcherServlet class
- Auto-configures Spring MVC
- Sets up embedded Tomcat
- Configures JSON conversion
```

**Question 7:**

````
Q: Create a custom health indicator for Actuator.

A:
```java
package com.example.demo.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Check custom health logic
        boolean isHealthy = checkExternalService();

        if (isHealthy) {
            return Health.up()
                    .withDetail("service", "Available")
                    .withDetail("responseTime", "50ms")
                    .build();
        } else {
            return Health.down()
                    .withDetail("service", "Unavailable")
                    .withDetail("error", "Connection timeout")
                    .build();
        }
    }

    private boolean checkExternalService() {
        // Implement health check logic
        return true;
    }
}
````

**Question 8:**

````
Q: What happens when Spring Boot detects multiple DataSource beans?
A: Spring Boot throws an error because it can't determine which one to use.

Solutions:
1. Mark one as @Primary
2. Qualify the injection with @Qualifier
3. Disable DataSource auto-configuration

Example:
```java
@Configuration
public class DataSourceConfig {

    @Bean
    @Primary
    public DataSource primaryDataSource() {
        return new HikariDataSource();
    }

    @Bean
    public DataSource secondaryDataSource() {
        return new HikariDataSource();
    }
}
````

**Question 9:**

````
Q: Configure embedded Tomcat to use custom port and context path.

A:
```yaml
server:
  port: 9090
  servlet:
    context-path: /myapp
  tomcat:
    threads:
      max: 200
      min-spare: 10
    max-connections: 10000
````

**Question 10:**

````
Q: How do you view the auto-configuration report?
A: Enable debug mode:

Method 1 - application.properties:
debug=true

Method 2 - Command line:
java -jar app.jar --debug

Method 3 - Programmatically:
```java
SpringApplication app = new SpringApplication(MyApp.class);
app.setLogStartupInfo(true);
app.run(args);
````

Report shows:

- Positive matches (auto-configured)
- Negative matches (not configured)
- Exclusions
- Unconditional classes

```

---

### Advanced Level

**Question 11:**
```

Q: Design a custom starter for email functionality.

A: Create multi-module project:

```

**Project Structure:**
```

email-spring-boot-starter/
├── pom.xml
└── src/main/
├── java/
│ └── com/example/email/
│ ├── EmailAutoConfiguration.java
│ ├── EmailService.java
│ └── EmailProperties.java
└── resources/
└── META-INF/
└── spring.factories

````

**pom.xml:**
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
    </dependency>
    <dependency>
        <groupId>javax.mail</groupId>
        <artifactId>javax.mail-api</artifactId>
    </dependency>
</dependencies>
````

**EmailProperties.java:**

```java
@ConfigurationProperties(prefix = "email")
public class EmailProperties {
    private String host;
    private int port = 587;
    private String username;
    private String password;
    // getters/setters
}
```

**EmailService.java:**

```java
public class EmailService {
    private final EmailProperties properties;

    public EmailService(EmailProperties properties) {
        this.properties = properties;
    }

    public void sendEmail(String to, String subject, String body) {
        // Implementation
    }
}
```

**EmailAutoConfiguration.java:**

```java
@Configuration
@ConditionalOnClass(EmailService.class)
@EnableConfigurationProperties(EmailProperties.class)
public class EmailAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public EmailService emailService(EmailProperties properties) {
        return new EmailService(properties);
    }
}
```

**META-INF/spring.factories:**

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.email.EmailAutoConfiguration
```

**Question 12:**

````
Q: How would you handle multiple embedded servers in one application?
A: Spring Boot doesn't support multiple embedded servers directly.

Solutions:
1. Run multiple Spring Boot apps (microservices)
2. Use different ports for different purposes
3. Use reactive WebFlux alongside Web MVC

Not Recommended Approach:
```java
// Don't do this!
@Configuration
public class MultiServerConfig {
    @Bean
    public ServletWebServerFactory tomcat() {
        return new TomcatServletWebServerFactory();
    }

    @Bean
    public ServletWebServerFactory jetty() {
        return new JettyServletWebServerFactory();
    }
}
// This will cause conflicts!
````

Recommended Approach - Microservices:

```
auth-service:8080  (Tomcat)
api-service:8081   (Jetty)
admin-service:8082 (Undertow)
```

**Question 13:**

````
Q: Debug this auto-configuration issue:

Code:
```java
@SpringBootApplication
@ComponentScan("com.other.package")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
````

Problem: Application fails to start with "No qualifying bean" errors.

A: The issue is that @ComponentScan overrides default scanning.

Problems:

1. Doesn't scan main package
2. Doesn't scan Spring Boot auto-configurations
3. Misses important beans

Solutions:

Solution 1 - Add base package:

```java
@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.demo",  // Main package
    "com.other.package"   // Additional package
})
public class Application { }
```

Solution 2 - Use basePackageClasses:

```java
@SpringBootApplication
@ComponentScan(basePackageClasses = {
    Application.class,     // Scans from main
    OtherPackageMarker.class  // Scans other
})
public class Application { }
```

Solution 3 - Move components to sub-packages:

```
com.example.demo/
├── Application.java
├── controller/
└── other/  ← Move other package here
```

**Question 14:**

````
Q: Implement custom metrics for Actuator.

A:
```java
@Component
public class CustomMetrics {

    private final MeterRegistry registry;
    private final Counter requestCounter;
    private final Timer requestTimer;

    public CustomMetrics(MeterRegistry registry) {
        this.registry = registry;

        // Counter metric
        this.requestCounter = Counter.builder("custom.requests")
                .description("Total requests")
                .tag("type", "api")
                .register(registry);

        // Timer metric
        this.requestTimer = Timer.builder("custom.request.duration")
                .description("Request duration")
                .register(registry);

        // Gauge metric
        Gauge.builder("custom.active.users", this, CustomMetrics::getActiveUsers)
                .register(registry);
    }

    public void recordRequest() {
        requestCounter.increment();
    }

    public void recordRequestTime(Runnable task) {
        requestTimer.record(task);
    }

    private double getActiveUsers() {
        // Return active user count
        return 42.0;
    }
}
````

Usage:

```java
@RestController
public class MetricsController {

    @Autowired
    private CustomMetrics metrics;

    @GetMapping("/api/data")
    public String getData() {
        metrics.recordRequest();
        return metrics.recordRequestTime(() -> {
            // Business logic
            return "data";
        });
    }
}
```

View metrics:

```bash
curl http://localhost:8080/actuator/metrics/custom.requests
curl http://localhost:8080/actuator/metrics/custom.request.duration
curl http://localhost:8080/actuator/metrics/custom.active.users
```

**Question 15:**

```
Q: Create a production-ready Spring Boot application with all components.

A: Complete implementation with best practices:
```

**application.yml:**

```yaml
spring:
  application:
    name: production-app

  # Database
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USER}
    password: ${DATABASE_PASSWORD}
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5

  # JPA
  jpa:
    hibernate:
      ddl-auto: validate
    open-in-view: false

# Server
server:
  port: 8080
  shutdown: graceful
  compression:
    enabled: true

# Actuator
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  endpoint:
    health:
      show-details: when-authorized
  metrics:
    export:
      prometheus:
        enabled: true

# Logging
logging:
  level:
    root: INFO
    com.example: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
```

**Production Application:**

```java
@SpringBootApplication
@EnableScheduling
@EnableAsync
public class ProductionApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(ProductionApplication.class);

        // Graceful shutdown
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutting down gracefully...");
        }));

        app.run(args);
    }
}
```

---

### Coding Challenges

**Challenge 1: Multi-Component Integration**

```
Difficulty: Medium
Time: 30 minutes

Description:
Create a Spring Boot application that:
1. Uses spring-boot-starter-web
2. Uses spring-boot-starter-data-jpa
3. Integrates Actuator with custom health indicator
4. Configures embedded Tomcat with custom settings
5. Implements custom metrics

Requirements:
- REST API for User CRUD
- H2 in-memory database
- Custom health check for database
- Custom metric for API calls
- Swagger documentation

Hints:
- Use @RestController for API
- Use JpaRepository for data access
- Implement HealthIndicator
- Use MeterRegistry for metrics
```

**Solution:**
See Examples 1-5 above combined into one application.

---

## 🎯 Key Takeaways

1. ✅ **Spring Boot Starters** - Simplify dependency management with curated sets
2. ✅ **Auto-Configuration** - Intelligent setup based on classpath detection
3. ✅ **Actuator** - Production-ready monitoring and management out-of-the-box
4. ✅ **Embedded Servers** - No external server needed, deploy anywhere
5. ✅ **Convention Over Configuration** - Sensible defaults reduce boilerplate
6. ✅ **Component Integration** - All components work seamlessly together

### Quick Reference

```java
// Common component patterns

// 1. Using Starters
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-[component]</artifactId>
</dependency>

// 2. Customizing Auto-Configuration
@Configuration
public class CustomConfig {
    @Bean
    @ConditionalOnMissingBean
    public MyService myService() {
        return new MyServiceImpl();
    }
}

// 3. Actuator Endpoint
@Endpoint(id = "custom")
public class CustomEndpoint {
    @ReadOperation
    public Map<String, Object> endpoint() {
        return Map.of("status", "OK");
    }
}

// 4. Server Configuration
server.port=8080
server.tomcat.threads.max=200

// 5. Custom Metrics
Counter.builder("my.counter")
    .register(registry);
```

---

## 📚 What's Next?

### Recommended Learning Path

**From this tutorial, you can proceed to:**

- **Tutorial 06: Spring Boot vs Spring Framework** - Understand the differences
- **Tutorial 14: Spring Boot Starters Deep Dive** - Master dependency management
- **Tutorial 17: Spring Boot Actuators** - Advanced monitoring techniques

### Additional Resources

**Official Documentation:**

- [Spring Boot Reference - Core Features](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html)
- [Spring Boot Starters](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)
- [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)

**Community Resources:**

- [Baeldung - Spring Boot](https://www.baeldung.com/spring-boot)
- [Spring Boot GitHub](https://github.com/spring-projects/spring-boot)

---

**Congratulations! You now understand Spring Boot's key components! 🎉**

_Practice implementing each component before moving to the next tutorial._
