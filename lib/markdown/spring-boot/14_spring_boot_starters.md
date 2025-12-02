# Tutorial 14: Spring Boot Starters Deep Dive 📦

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [How Starters Work](#how-starters-work)
3. [Creating Custom Starters](#creating-custom-starters)
4. [Common Starters Explained](#common-starters-explained)
5. [Starter Best Practices](#starter-best-practices)
6. [Troubleshooting](#troubleshooting)
7. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

A **Starter** is Spring Boot's answer to the question: **"How do I include a technology without managing all its dependencies?"**

### The Problem Starters Solve

```
WITHOUT STARTERS (Manual Management):
To use Spring Data JPA, you need:
├── spring-data-jpa
├── spring-orm
├── spring-tx
├── hibernate-core
├── hibernate-entitymanager
├── jdbc driver
└── validation-api

Problems:
❌ Which versions are compatible?
❌ What if you forget one?
❌ Version conflicts between projects
❌ Takes hours to set up correctly

WITH STARTERS (One Line):
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

Benefits:
✅ All dependencies included automatically
✅ Versions guaranteed compatible
✅ Auto-configuration included
✅ Ready to use immediately
```

---

## How Starters Work

### The Starter Structure

```
A Spring Boot Starter is NOT magic. It's just:

1. A pom.xml that imports other dependencies
   (transitive dependency management)

2. Auto-configuration classes
   (conditionally create beans)

3. Spring.factories file
   (register auto-configuration with Spring)
```

### Example: Looking Inside spring-boot-starter-web

```
spring-boot-starter-web/
├── pom.xml
│   ├── Depends on spring-boot-starter (parent)
│   ├── Depends on spring-boot-starter-tomcat
│   ├── Depends on spring-webmvc
│   ├── Depends on spring-web
│   ├── Depends on jackson (JSON)
│   └── Depends on validation
│
└── META-INF/spring.factories
    ├── DispatcherServletAutoConfiguration
    ├── WebMvcAutoConfiguration
    ├── WebMvcSecurityConfiguration
    └── HttpEncodingAutoConfiguration

When you add spring-boot-starter-web:
1. Maven downloads all dependencies (transitive)
2. Spring Boot finds spring.factories file
3. Loads all auto-configuration classes
4. Creates beans conditionally (if dependencies present)
5. Everything works! No @Bean methods needed.
```

### Dependency Tree

```bash
# See exactly what a starter pulls in
mvn dependency:tree

output:
my-app
└── spring-boot-starter-web
    ├── spring-boot-starter
    │   ├── spring-boot
    │   ├── spring-core
    │   ├── spring-jcl
    │   ├── spring-context
    │   └── spring-aop
    ├── spring-boot-starter-tomcat
    │   ├── tomcat-embed-core
    │   ├── tomcat-embed-el
    │   └── tomcat-embed-websocket
    ├── spring-webmvc
    ├── spring-web
    ├── jackson-databind
    ├── jackson-datatype-jdk8
    ├── jackson-datatype-jsr310
    ├── jackson-module-parameter-names
    └── validation-api
```

---

## Creating Custom Starters

### Use Case: Company-Wide Utilities

```
Your company has:
- Custom logging configuration
- Standard exception handlers
- Authentication patterns
- Configuration properties

Problem: Copying these across projects is error-prone

Solution: Create a custom starter!
```

### Step 1: Create Starter Project Structure

```
custom-starter/
├── pom.xml
├── src/main/
│   ├── java/
│   │   └── com/company/
│   │       ├── config/
│   │       │   ├── CompanyAutoConfiguration.java
│   │       │   └── CompanyProperties.java
│   │       ├── exception/
│   │       │   └── GlobalExceptionHandler.java
│   │       ├── security/
│   │       │   └── AuthenticationConfig.java
│   │       └── util/
│   │           └── CompanyUtils.java
│   └── resources/
│       └── META-INF/
│           └── spring.factories
└── target/
    └── my-company-starter-1.0.0.jar
```

### Step 2: Write pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>

    <!-- Your starter identity -->
    <groupId>com.company</groupId>
    <artifactId>my-company-starter</artifactId>
    <version>1.0.0</version>
    <name>My Company Spring Boot Starter</name>

    <!-- Use Spring Boot parent for defaults -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.1</version>
    </parent>

    <!-- Dependencies this starter needs -->
    <dependencies>
        <!-- Spring Boot starter (don't specify version - inherited from parent) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <!-- Web support (optional) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <optional>true</optional>  <!-- Not required, but works with it -->
        </dependency>

        <!-- Security (optional) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Logging -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

### Step 3: Create Auto-Configuration Class

```java
package com.company.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Auto-configuration for company standards
 * Automatically loaded by Spring Boot
 */
@Configuration
@EnableConfigurationProperties(CompanyProperties.class)
public class CompanyAutoConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(CompanyAutoConfiguration.class);

    /**
     * Register exception handler automatically
     * Only if user hasn't already defined their own
     */
    @Bean
    @ConditionalOnMissingBean(name = "companyExceptionHandler")
    public CompanyGlobalExceptionHandler companyExceptionHandler() {
        logger.info("Registering CompanyGlobalExceptionHandler");
        return new CompanyGlobalExceptionHandler();
    }

    /**
     * Register company utilities
     */
    @Bean
    public CompanyUtils companyUtils(CompanyProperties props) {
        return new CompanyUtils(props);
    }

    /**
     * Only autoconfigure security if Spring Security is on classpath
     */
    @Configuration
    @ConditionalOnClass(name = "org.springframework.security.config.annotation.web.builders.HttpSecurity")
    public static class SecurityAutoConfiguration {

        @Bean
        public CompanySecurityConfig companySecurityConfig() {
            return new CompanySecurityConfig();
        }
    }
}
```

### Step 4: Create Configuration Properties

```java
package com.company.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Configuration properties for company standards
 * Prefix: company
 *
 * Example application.yml:
 * company:
 *   name: My Company
 *   environment: production
 *   security:
 *     enabled: true
 *     timeout: 3600
 */
@ConfigurationProperties(prefix = "company")
@Component
public class CompanyProperties {

    private String name = "Company";
    private String environment = "development";
    private boolean loggingEnabled = true;
    private Security security = new Security();

    public static class Security {
        private boolean enabled = true;
        private int timeoutSeconds = 1800;

        // Getters and setters
        public boolean isEnabled() { return enabled; }
        public void setEnabled(boolean enabled) { this.enabled = enabled; }

        public int getTimeoutSeconds() { return timeoutSeconds; }
        public void setTimeoutSeconds(int timeoutSeconds) {
            this.timeoutSeconds = timeoutSeconds;
        }
    }

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEnvironment() { return environment; }
    public void setEnvironment(String environment) { this.environment = environment; }

    public boolean isLoggingEnabled() { return loggingEnabled; }
    public void setLoggingEnabled(boolean loggingEnabled) {
        this.loggingEnabled = loggingEnabled;
    }

    public Security getSecurity() { return security; }
    public void setSecurity(Security security) { this.security = security; }
}
```

### Step 5: Register Auto-Configuration (spring.factories)

```properties
# src/main/resources/META-INF/spring.factories

# This tells Spring Boot to load our auto-configuration class
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.company.config.CompanyAutoConfiguration
```

### Step 6: Build and Use Your Starter

```bash
# Build the starter
cd my-company-starter
mvn clean package

# Install to local Maven repository
mvn install

# Now in any project, use your starter:
<dependency>
    <groupId>com.company</groupId>
    <artifactId>my-company-starter</artifactId>
    <version>1.0.0</version>
</dependency>

# In application.yml:
company:
  name: "My Company"
  environment: production
  security:
    enabled: true
    timeout-seconds: 3600

# That's it! All company standards automatically configured!
```

---

## Common Starters Explained

### Web & REST API Starters

```java
/**
 * spring-boot-starter-web
 * For building REST APIs and traditional web applications
 * Includes: Spring MVC, Tomcat, Jackson JSON
 */
@RestController
public class ApiController {
    @GetMapping("/api/data")
    public Data getData() {
        return new Data();
    }
}

/**
 * spring-boot-starter-webflux
 * For non-blocking, reactive REST APIs
 * Includes: Reactor, Netty, Jackson
 * Use when: High throughput, async operations
 */
@RestController
public class ReactiveApiController {
    @GetMapping("/api/data")
    public Mono<Data> getData() {
        return Mono.just(new Data());
    }
}

/**
 * spring-boot-starter-thymeleaf
 * For server-side HTML template rendering
 * Use when: Building traditional web applications (not REST APIs)
 */
@Controller
public class WebController {
    @GetMapping("/users")
    public String listUsers(Model model) {
        model.addAttribute("users", userService.findAll());
        return "users";  // Returns users.html rendered by Thymeleaf
    }
}
```

### Data Access Starters

```java
/**
 * spring-boot-starter-data-jpa
 * For relational databases with ORM
 * Includes: Hibernate, Spring Data JPA
 */
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> { }

/**
 * spring-boot-starter-data-mongodb
 * For MongoDB NoSQL database
 */
@Document(collection = "users")
public class UserDocument {
    @Id
    private String id;
    private String name;
}

@Repository
public interface UserRepository extends MongoRepository<UserDocument, String> { }

/**
 * spring-boot-starter-data-redis
 * For Redis caching and data structures
 */
@Configuration
@EnableCaching
public class CacheConfig {
    @Cacheable("users")
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

### Message & Event Starters

```java
/**
 * spring-boot-starter-amqp
 * For RabbitMQ message queues
 */
@Configuration
public class RabbitConfig {
    @Bean
    public Queue userQueue() {
        return new Queue("user.events");
    }
}

@Service
public class UserEventPublisher {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void publishUserCreated(User user) {
        rabbitTemplate.convertAndSend("user.events", user);
    }
}

/**
 * spring-boot-starter-kafka
 * For Apache Kafka event streaming
 */
@Service
public class KafkaProducer {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void send(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }
}

@Service
public class KafkaConsumer {
    @KafkaListener(topics = "user-events")
    public void listen(String message) {
        System.out.println("Received: " + message);
    }
}
```

### Security & Authentication Starters

```java
/**
 * spring-boot-starter-security
 * For authentication and authorization
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin();

        return http.build();
    }
}

/**
 * spring-boot-starter-oauth2-resource-server
 * For protecting resources with OAuth2 tokens
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig {
    // Validates JWT tokens from auth server
}
```

### Monitoring & Metrics Starters

```java
/**
 * spring-boot-starter-actuator
 * For health checks, metrics, endpoints
 */
@Configuration
public class ActuatorConfig {
    // Automatically provides:
    // GET /actuator/health - Application health
    // GET /actuator/metrics - Application metrics
    // GET /actuator/loggers - Logging configuration
    // And many more...
}

/**
 * spring-boot-starter-micrometer-prometheus
 * Export metrics to Prometheus
 */
// Metrics automatically scraped by Prometheus
// /actuator/prometheus endpoint
```

---

## Starter Best Practices

### ✅ DO: Use Starters Instead of Direct Dependencies

```java
// ✅ Good - Use starter
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

// ❌ Bad - Adding individual dependencies
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.6.0</version>
</dependency>
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-jpa</artifactId>
    <version>2.7.0</version>
</dependency>
// Higher chance of version conflicts
```

### ✅ DO: Check What a Starter Includes

```bash
# Use mvn dependency:tree to see what's included
mvn dependency:tree | grep -A 10 starter-web

# Avoid surprises and version conflicts
```

### ✅ DO: Mark Optional Dependencies Correctly

```xml
<!-- In a custom starter you're creating -->

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
    <optional>true</optional>  <!-- Not everyone needs this -->
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <optional>true</optional>  <!-- Useful with web, but not required -->
</dependency>
```

### ❌ DON'T: Mix Incompatible Starters Accidentally

```xml
<!-- ❌ These two together cause issues -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>  <!-- Conflicts with Tomcat! -->
</dependency>

<!-- ✅ Instead, exclude one from web starter -->
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
```

### ✅ DO: Override Starter Versions Carefully

```xml
<!-- If you need a different version than the starter provides -->
<properties>
    <postgresql.version>42.6.0</postgresql.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <version>${postgresql.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- Be careful - might introduce incompatibilities -->
```

---

## Troubleshooting

### Common Starter Issues

```java
// Issue 1: NoSuchBeanDefinitionException
// Error: No bean of type 'SomeService' found

// Cause: Dependency missing or auto-configuration not enabled
// Solution: Check you have the correct starter

// Issue 2: CircularDependencyException
// Error: Circular dependency between beans

// Cause: Two beans depend on each other
// Solution: Review your @Autowired injection pattern

// Issue 3: ApplicationContextException
// Error: Unable to start embedded Tomcat

// Cause: Port already in use
// Solution: java -jar app.jar --server.port=8081

// Issue 4: ClassNotFoundException
// Error: Class not found when using starter

// Cause: Starter not included for that feature
// Solution: Add the appropriate starter to pom.xml

// Issue 5: DataSourceException
// Error: Cannot create database connection

// Cause: Wrong database driver or configuration
// Solution: Check spring.datasource.url in application.yml
```

---

## Practice Questions

### Question 1: What's the Difference Between a Starter and a Library?

**Q**: Is a starter just a library with all dependencies included?

**A**: More than that! A starter includes:

1. **Dependencies** - Transitive dependencies managed
2. **Auto-configuration** - Beans created automatically
3. **Sensible defaults** - application.yml templates
4. **Integration** - Works out of the box with Spring Boot

A library is just code. A starter is code + auto-configuration + best practices.

### Question 2: Can You Create a Starter for Internal Company Use?

**Q**: Is it worth creating a custom starter for company-wide utilities?

**A**: **Yes!** Benefits:

- Share common patterns across projects
- Keep secrets out of code (use environment variables)
- Consistent configuration
- Version management centralized
- Easy to update all projects

### Question 3: What Happens if Two Starters Provide the Same Bean?

**Q**: If two starters both try to create a `DataSource` bean, what happens?

**A**: Spring sees the conflict and raises an error. Starters use `@ConditionalOnMissingBean` to avoid this:

```java
@Bean
@ConditionalOnMissingBean(DataSource.class)
public DataSource dataSource() {
    // Only create if no DataSource already exists
}
```

---

## Key Takeaways

1. **Starters are dependency + auto-configuration**: Not just a list of dependencies
2. **Always use starters**: They handle compatibility and configuration
3. **Check what's inside**: Use `mvn dependency:tree` to understand what you're including
4. **Create custom starters**: For company-wide patterns and standards
5. **Optional dependencies**: Mark them as optional if not always needed
6. **Spring.factories**: Register auto-configuration so Spring Boot finds it
7. **ConditionalOnClass**: Only configure if dependencies present
8. **ConditionalOnMissingBean**: Avoid conflicts with user configuration
9. **Override carefully**: Changing starter versions can break things
10. **One starter per feature**: Don't try to do everything in one starter
