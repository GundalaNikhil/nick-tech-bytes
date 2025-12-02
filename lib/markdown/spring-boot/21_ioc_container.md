# Tutorial 21: IOC Container 🏗️

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Solution Approach](#solution-approach)
3. [Complete Implementation](#complete-implementation)
4. [Important Considerations](#important-considerations)
5. [Practice Questions](#practice-questions)

---

## 1. Understanding the Question ❓

### What are we trying to achieve?

- **What is IOC Container?** - Framework component that manages object creation, configuration, and dependency injection
- **Why?** - Decouple classes, easier testing, centralized object management, flexible configuration
- **When to use?** - Always in Spring applications for managing beans
- **How does it work?** - Container creates objects, injects dependencies, manages lifecycle
- **Best practices** - Use constructor injection, avoid circular dependencies, understand bean scopes

### The Problem It Solves

**Without IOC Container (Manual Dependencies):**

```java
// Tightly coupled, hard to test, manually managing objects
public class OrderService {

    private final UserRepository userRepository;
    private final PaymentProcessor paymentProcessor;
    private final EmailNotifier emailNotifier;

    public OrderService() {
        // Manual creation - what if these need dependencies?
        this.userRepository = new UserRepository(new DatabaseConnection());
        this.paymentProcessor = new PaymentProcessor("stripe-key");
        this.emailNotifier = new EmailNotifier(new MailServer());
    }

    public void placeOrder(Order order) {
        // Uses dependencies
    }
}
```

**With Spring IOC Container:**

```java
// Loosely coupled, Spring creates and injects dependencies
@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;     // Spring injects
    private final PaymentProcessor paymentProcessor;  // Spring injects
    private final EmailNotifier emailNotifier;        // Spring injects

    // Constructor automatically called by Spring with dependencies
    // No manual creation needed!

    public void placeOrder(Order order) {
        // Uses dependencies
    }
}
```

---

## 2. Solution Approach 🎯

### Definition

**IOC (Inversion of Control) Container** is the Spring Framework component that manages the lifecycle of objects (beans), their configuration, and dependency injection, following the Inversion of Control principle.

### Bean Lifecycle

```
1. Instantiation    - Create object
   ↓
2. Populate Props   - Set properties from config
   ↓
3. BeanNameAware   - Set bean name if implements interface
   ↓
4. Initialization  - Call @PostConstruct or init method
   ↓
5. Ready to Use    - Bean available for injection
   ↓
(Use in application)
   ↓
6. Destruction     - Call @PreDestroy or destroy method
   ↓
7. Destroyed       - Bean removed from container
```

---

## 3. Complete Implementation 💻

### Example 1: Basic Bean Creation and Injection

**Service Classes**

```java
package com.example.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Repository layer - manages data access
 */
@Slf4j
@Service
public class UserRepository {

    public User findById(Long id) {
        log.info("Querying user with ID: {}", id);
        // Database query
        return new User(id, "John Doe");
    }
}

/**
 * Service layer - business logic with injected dependencies
 */
@Slf4j
@Service
@RequiredArgsConstructor  // Lombok creates constructor for final fields
public class UserService {

    // Spring IOC injects the UserRepository bean
    private final UserRepository userRepository;

    public User getUser(Long id) {
        log.info("Getting user: {}", id);
        return userRepository.findById(id);
    }
}

/**
 * Controller layer - with injected service
 */
@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    // Spring IOC injects the UserService bean
    private final UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
}
```

**Spring Boot Application**

```java
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class
 * @SpringBootApplication enables:
 * - Component scanning (finds @Service, @Controller, etc.)
 * - Auto-configuration
 * - Embedded Tomcat
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        // Spring IOC container starts here
        SpringApplication.run(Application.class, args);

        // Container has scanned package and created all beans
        // Dependencies injected automatically
    }
}
```

---

### Example 2: Bean Configuration and Scopes

**Configuration Class with @Bean**

```java
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;

/**
 * Configuration class - defines beans programmatically
 * Alternative to annotation-based configuration
 */
@Configuration
public class AppConfig {

    /**
     * Singleton scope (default): One bean instance for entire application
     * Shared across all components
     */
    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
    public DatabaseConnection databaseConnection() {
        return new DatabaseConnection("localhost:3306");
    }

    /**
     * Prototype scope: New instance created for each injection
     * Each component gets its own copy
     */
    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public RequestContext requestContext() {
        return new RequestContext();
    }

    /**
     * Using other beans in configuration
     * Spring automatically injects dependencies
     */
    @Bean
    public UserService userService(UserRepository userRepository,
                                   DatabaseConnection connection) {
        // Spring creates repo and connection beans first,
        // then passes them to this method
        UserService service = new UserService(userRepository);
        service.setDatabase(connection);
        return service;
    }
}
```

**Bean Scopes Explained**

```
Singleton (Default):
  - One instance per application context
  - Shared by all components
  - Use for: Services, repositories, configuration

Prototype:
  - New instance created each time requested
  - Not shared
  - Use for: Request-specific objects

Request:
  - New instance per HTTP request
  - Web applications only
  - Use for: Request data, temporary state

Session:
  - One instance per user session
  - Web applications only
  - Use for: User-specific data
```

---

### Example 3: Lifecycle Callbacks and Initialization

**Bean Lifecycle Methods**

```java
package com.example.service;

import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;

/**
 * Bean with initialization and cleanup
 */
@Slf4j
@Service
public class DataService {

    private DatabaseConnection connection;
    private boolean initialized = false;

    /**
     * Called AFTER bean is created and dependencies injected
     * Good for initialization that requires dependencies
     */
    @PostConstruct
    public void init() {
        log.info("DataService initializing...");
        this.connection = new DatabaseConnection();
        connection.connect();
        this.initialized = true;
        log.info("DataService initialized successfully");
    }

    public void getData() {
        if (!initialized) {
            throw new IllegalStateException("Service not initialized");
        }
        // Use connection
    }

    /**
     * Called BEFORE bean is destroyed (on shutdown)
     * Good for cleanup: close connections, release resources
     */
    @PreDestroy
    public void cleanup() {
        log.info("DataService shutting down...");
        if (connection != null) {
            connection.close();
        }
        log.info("DataService cleaned up");
    }
}
```

**InitializingBean and DisposableBean (Alternative)**

```java
package com.example.service;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.stereotype.Service;

/**
 * Alternative to @PostConstruct/@PreDestroy
 * Less clean but also works
 */
@Service
public class LegacyDataService implements InitializingBean, DisposableBean {

    /**
     * Called after properties set
     */
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("Initializing...");
    }

    /**
     * Called on shutdown
     */
    @Override
    public void destroy() throws Exception {
        System.out.println("Destroying...");
    }
}
```

---

### Example 4: Advanced Dependency Injection

**Constructor Injection (Best Practice)**

```java
@Service
public class PaymentService {

    private final PaymentGateway gateway;
    private final NotificationService notifier;

    /**
     * Constructor injection (best practice)
     * - Immutability: fields are final
     * - Testability: easy to mock in tests
     * - Clarity: dependencies explicit in constructor
     */
    public PaymentService(PaymentGateway gateway,
                         NotificationService notifier) {
        this.gateway = gateway;
        this.notifier = notifier;
    }

    // Or use @RequiredArgsConstructor from Lombok:
    // private final PaymentGateway gateway;
    // private final NotificationService notifier;
}
```

**Setter Injection (When Constructor is Too Verbose)**

```java
@Service
public class EmailService {

    private SmtpServer smtpServer;  // Not final

    /**
     * Setter injection
     * - Used when many optional dependencies
     * - Spring finds method and injects
     */
    @Autowired
    public void setSmtpServer(SmtpServer server) {
        this.smtpServer = server;
    }
}
```

**Qualifier for Multiple Implementations**

```java
// Multiple implementations of PaymentGateway
@Component("stripe")
public class StripeGateway implements PaymentGateway { }

@Component("paypal")
public class PayPalGateway implements PaymentGateway { }

// Inject specific one
@Service
public class CheckoutService {

    private final PaymentGateway gateway;

    /**
     * @Qualifier specifies which implementation to inject
     */
    public CheckoutService(@Qualifier("stripe") PaymentGateway gateway) {
        this.gateway = gateway;  // Gets StripeGateway
    }
}
```

**Optional Dependencies**

```java
@Service
public class ReportService {

    private final Optional<AnalyticsService> analytics;

    /**
     * Optional bean - may or may not exist
     * Won't fail if bean not found
     */
    public ReportService(Optional<AnalyticsService> analytics) {
        this.analytics = analytics;
    }

    public void generateReport() {
        analytics.ifPresent(a -> a.trackReport());
    }
}
```

---

### Example 5: Circular Dependency Handling

**Problem: Circular Dependencies**

```java
// ServiceA depends on ServiceB
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;
}

// ServiceB depends on ServiceA
@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;  // Circular!
}

// Error: BeanCurrentlyInCreationException
```

**Solution 1: Use Setter Injection**

```java
@Service
public class ServiceA {
    private ServiceB serviceB;

    @Autowired
    public void setServiceB(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}

// Spring can resolve setter injection circular deps
```

**Solution 2: Lazy Initialization**

```java
@Service
public class ServiceA {

    private final ObjectProvider<ServiceB> serviceBProvider;

    public ServiceA(ObjectProvider<ServiceB> serviceBProvider) {
        this.serviceBProvider = serviceBProvider;
    }

    public void doSomething() {
        // Get ServiceB when needed, not at construction
        ServiceB serviceB = serviceBProvider.getIfAvailable();
    }
}
```

**Solution 3: Refactor to Remove Circular Dependency**

```java
// Best solution: Restructure code to avoid circular dependency
@Service
public class ServiceC {
    // Both ServiceA and ServiceB depend on this
    public void commonLogic() { }
}

@Service
public class ServiceA {
    @Autowired
    private ServiceC serviceC;  // Depends on C
}

@Service
public class ServiceB {
    @Autowired
    private ServiceC serviceC;  // Also depends on C
}
// No circular dependency!
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Prefer Constructor Injection

```java
✅ DO: Constructor injection (immutable, testable)
@Service
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;  // Immutable
    }
}

❌ DON'T: Field injection
@Service
public class OrderService {
    @Autowired
    private OrderRepository repository;  // Mutable, hard to test
}

📝 WHY: Constructor injection = immutability + clarity + easy testing
```

#### 2. Use Appropriate Scopes

```java
✅ DO: Choose correct scope
@Service  // Singleton - shared across app
public class UserRepository { }

@Component
@Scope(PROTOTYPE)  // New instance each time
public class RequestContext { }

❌ DON'T: Use singleton for request-specific data
// Shared state = bugs!

📝 WHY: Prevents memory leaks and shared state bugs
```

#### 3. Avoid Circular Dependencies

```java
✅ DO: Refactor to eliminate circular deps
// ServiceC as common dependency
ServiceA → ServiceC ← ServiceB

❌ DON'T: Create circular dependencies
ServiceA ↔ ServiceB  // Will cause errors

📝 WHY: Circular deps indicate design issues
```

---

### Common Pitfalls

#### Pitfall 1: Dependency Not Found

**Problem:**

```
Error: No qualifying bean of type 'PaymentService'
MyService requires a bean of type 'PaymentService' that could not be found
```

**Solution:**

```java
// Make sure bean is created
@Service  // This annotation registers bean
public class PaymentService { }

// Or in config:
@Bean
public PaymentService paymentService() {
    return new PaymentService();
}

// Or make sure component scanning finds it
@ComponentScan("com.example")  // Includes PaymentService package
```

**Explanation:**
Bean must be registered with @Service, @Bean, @Component, etc. and in package scanned by Spring.

---

#### Pitfall 2: Prototype Bean Has Singleton Dependency

**Problem:**

```java
@Bean
@Scope(PROTOTYPE)
public RequestContext requestContext(UserService userService) {
    // UserService is singleton
    // All RequestContext instances share same UserService!
}
```

**Solution:**

```java
@Bean
@Scope(PROTOTYPE)
public RequestContext requestContext(ObjectProvider<UserService> userService) {
    // Get UserService when needed
    return new RequestContext(userService.getIfAvailable());
}
```

**Explanation:**
When prototype injects singleton, singleton is shared. Use ObjectProvider for lazy access.

---

## 8. Practice Questions 📝

**Question 1: What is IOC Container?**

```
Q: Explain the Spring IOC Container

A: The Spring IOC Container:
   1. Creates beans (objects) automatically
   2. Manages their lifecycle (creation → use → destruction)
   3. Injects dependencies (objects needed by other objects)
   4. Handles configuration from various sources

Benefits:
- Loose coupling (components don't create each other)
- Easy testing (can inject mocks)
- Centralized management (all beans in one place)
```

**Question 2: Bean scopes**

```
Q: What are bean scopes and when to use each?

A: Singleton (default):
   - One instance for entire app
   - Use for: Services, repositories

Prototype:
   - New instance each time
   - Use for: Request objects, temporary data

Request:
   - One per HTTP request
   - Use for: Request context, temporary state

Session:
   - One per user session
   - Use for: User shopping cart, preferences
```

**Question 3: Constructor vs Setter injection**

```
Q: Which type of injection is better?

A: Constructor injection (better):
   - Makes immutable objects (final fields)
   - Explicit dependencies in constructor
   - Easier to test (inject in constructor)
   - Clear what object needs

Setter injection:
   - Use when many optional dependencies
   - Can create invalid partial objects
   - Harder to test

Use constructor by default!
```

---

## 🎯 Key Takeaways

1. ✅ **IOC Container manages beans** - Creation, injection, lifecycle
2. ✅ **Constructor injection is best** - Immutable, testable, clear
3. ✅ **Understand bean scopes** - Singleton, Prototype, Request, Session
4. ✅ **Use @PostConstruct and @PreDestroy** - For initialization and cleanup
5. ✅ **Avoid circular dependencies** - Refactor code instead
6. ✅ **Lazy load when needed** - Use ObjectProvider for circular cases

---

## Changelog

- **2025-11-23**: Initial creation with scopes and lifecycle examples
- **Added**: Constructor injection best practices and circular dependency solutions

**Congratulations! You now master the Spring IOC Container! 🎉**

_Design loosely coupled, testable applications with proper dependency injection!_
