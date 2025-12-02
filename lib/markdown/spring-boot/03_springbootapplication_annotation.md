# Tutorial 03: @SpringBootApplication Annotation Deep Dive 🔍

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

We need to master:

- **What @SpringBootApplication does** - Its core functionality
- **How it works under the hood** - The magic behind the annotation
- **Why it's important** - The problems it solves
- **When and how to customize** it - Advanced usage patterns
- **Best practices** - How professionals use it

### The Problem It Solves

**Before @SpringBootApplication:**

```java
@Configuration              // Manual configuration needed
@EnableAutoConfiguration    // Auto-config manually enabled
@ComponentScan              // Scanning manually configured
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

**After @SpringBootApplication:**

```java
@SpringBootApplication      // Everything in one annotation!
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

---

## 2. Solution Approach 🎯

### Definition

**@SpringBootApplication** is a meta-annotation (an annotation that contains other annotations) that combines three essential Spring annotations:

```java
@SpringBootApplication = @Configuration
                       + @EnableAutoConfiguration
                       + @ComponentScan
```

### Core Components

#### 1. @Configuration

- Marks the class as a source of bean definitions
- Equivalent to XML configuration files
- Allows defining beans using @Bean methods

#### 2. @EnableAutoConfiguration

- Enables Spring Boot's auto-configuration mechanism
- Attempts to automatically configure your application
- Based on jar dependencies you have added

#### 3. @ComponentScan

- Scans for Spring components (@Component, @Service, @Repository, @Controller)
- Scans the package of the annotated class and all sub-packages
- Registers found components as beans

---

## 3. Prerequisites & Requirements 📦

### Software Requirements

- JDK 17+
- Spring Boot 3.x
- Maven/Gradle
- IDE (IntelliJ IDEA recommended)

### Knowledge Requirements

- ✅ Java annotations basics
- ✅ Spring IoC container concepts
- ✅ Component scanning concepts
- ⚠️ Advanced Spring (will be explained)

---

## 4. Key Topics & Plan of Action 📚

### Key Topics

```
@SpringBootApplication
├── @SpringBootConfiguration
│   └── @Configuration
│       └── Defines @Bean methods
├── @EnableAutoConfiguration
│   ├── Auto-configures based on classpath
│   ├── Conditional on classes/beans/properties
│   └── Can be excluded/overridden
└── @ComponentScan
    ├── Scans current package + sub-packages
    ├── Finds @Component, @Service, @Repository, @Controller
    └── Can be customized with basePackages
```

### Plan of Action

```
Step 1: Understand each sub-annotation individually
Step 2: See how they work together
Step 3: Learn customization options
Step 4: Explore advanced configurations
Step 5: Master best practices and patterns
```

---

## 5. Complete Implementation 💻

### Example 1: Basic @SpringBootApplication

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class demonstrating @SpringBootApplication
 *
 * This single annotation replaces three separate annotations:
 * - @Configuration: Marks this as a configuration class
 * - @EnableAutoConfiguration: Enables Spring Boot's auto-configuration
 * - @ComponentScan: Scans this package and sub-packages for components
 */
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        // SpringApplication.run() bootstraps the application
        // It creates the ApplicationContext and starts the embedded server
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### Example 2: Equivalent Expanded Form

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * This is exactly equivalent to using @SpringBootApplication
 *
 * Showing the expanded form to understand what happens behind the scenes
 */
@Configuration                  // 1. Configuration class
@EnableAutoConfiguration        // 2. Enable auto-configuration
@ComponentScan                  // 3. Component scanning
public class DemoApplicationExpanded {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplicationExpanded.class, args);
    }
}
```

### Example 3: Understanding @Configuration Component

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;

/**
 * @Configuration (part of @SpringBootApplication) allows defining beans
 *
 * You can add @Bean methods directly in the main application class
 * or in separate @Configuration classes
 */
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    /**
     * Define a bean using @Bean annotation
     * This bean can be injected anywhere in the application
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    /**
     * Another bean definition example
     */
    @Bean
    public DateTimeFormatter dateTimeFormatter() {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    }
}
```

### Example 4: Understanding @ComponentScan

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @ComponentScan automatically scans:
 *
 * ✅ com.example.demo (current package)
 * ✅ com.example.demo.controller
 * ✅ com.example.demo.service
 * ✅ com.example.demo.repository
 * ✅ com.example.demo.config
 * ✅ All other sub-packages
 *
 * ❌ com.example.other (sibling package - NOT scanned)
 * ❌ com.external (different package - NOT scanned)
 */
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

**Project Structure showing scan scope:**

```
com/
├── example/
│   ├── demo/                          ← Base package
│   │   ├── DemoApplication.java       ← @SpringBootApplication here
│   │   ├── controller/                ← ✅ SCANNED
│   │   │   └── UserController.java
│   │   ├── service/                   ← ✅ SCANNED
│   │   │   └── UserService.java
│   │   ├── repository/                ← ✅ SCANNED
│   │   │   └── UserRepository.java
│   │   └── config/                    ← ✅ SCANNED
│   │       └── AppConfig.java
│   └── other/                         ← ❌ NOT SCANNED (sibling)
│       └── OtherService.java
└── external/                          ← ❌ NOT SCANNED (different root)
    └── ExternalService.java
```

### Example 5: Customizing Component Scan

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Customizing component scan to include packages outside base package
 */
@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.demo",           // Main package
    "com.example.external",       // External package
    "com.thirdparty.library"      // Third-party package
})
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### Example 6: Excluding Components from Scan

```java
package com.example.demo;

import com.example.demo.legacy.OldService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

/**
 * Excluding specific components or packages from scanning
 */
@SpringBootApplication
@ComponentScan(
    basePackages = "com.example.demo",
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = {OldService.class}    // Exclude specific class
    )
)
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### Example 7: Understanding @EnableAutoConfiguration

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * @EnableAutoConfiguration magic:
 *
 * Checks classpath and automatically configures:
 * ✅ Web server (if spring-boot-starter-web)
 * ✅ Database (if JDBC driver + spring-boot-starter-data-jpa)
 * ✅ Security (if spring-boot-starter-security)
 * ✅ And 100+ other configurations!
 *
 * Example: Excluding auto-configurations you don't want
 */
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class    // Don't auto-configure DataSource
})
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### Example 8: Multiple Exclusions

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

/**
 * Excluding multiple auto-configurations
 * Useful when you want complete control over configuration
 */
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class,
    SecurityAutoConfiguration.class
})
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### Example 9: Exclude Using Properties File

```properties
# application.properties

# Alternative way to exclude auto-configurations
spring.autoconfigure.exclude=\
  org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
  org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
```

### Example 10: Complete Example with All Features

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;

/**
 * Complete example demonstrating all aspects of @SpringBootApplication
 *
 * Features:
 * 1. Main application annotation
 * 2. Excluding unnecessary auto-configurations
 * 3. Custom component scanning
 * 4. Bean definitions
 */
@SpringBootApplication(
    // Exclude auto-configurations we don't need
    exclude = DataSourceAutoConfiguration.class,

    // Customize scan base packages (if needed)
    scanBasePackages = {"com.example.demo", "com.external"}
)
public class DemoApplication {

    public static void main(String[] args) {
        // Additional configuration before starting
        SpringApplication app = new SpringApplication(DemoApplication.class);

        // Customize startup properties (optional)
        app.setAdditionalProfiles("dev");
        app.setBannerMode(Banner.Mode.OFF);

        // Start the application
        app.run(args);
    }

    /**
     * Bean definitions
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

### Example 11: Using @SpringBootConfiguration

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * @SpringBootConfiguration is a specialized form of @Configuration
 * Used by @SpringBootApplication internally
 *
 * You rarely use this directly, but it's good to know it exists
 */
@SpringBootConfiguration    // Instead of @Configuration
@EnableAutoConfiguration
@ComponentScan
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### Example 12: Practical Project Structure

```java
// Main Application
package com.example.demo;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// Controller (automatically scanned)
package com.example.demo.controller;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}

// Service (automatically scanned)
package com.example.demo.service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}

// Repository (automatically scanned)
package com.example.demo.repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA provides implementation automatically
}

// Configuration (automatically scanned)
package com.example.demo.config;

@Configuration
public class AppConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
```

### Example 13: Testing the Annotation

```java
package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

/**
 * Test to verify @SpringBootApplication is working correctly
 */
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private ApplicationContext context;

    @Test
    void contextLoads() {
        // Verify application context loads successfully
        assertNotNull(context);
    }

    @Test
    void verifyBeansAreLoaded() {
        // Verify that component-scanned beans are loaded
        assertTrue(context.containsBean("userController"));
        assertTrue(context.containsBean("userService"));
        assertTrue(context.containsBean("userRepository"));
    }

    @Test
    void verifyAutoConfigurationWorks() {
        // Verify auto-configured beans exist
        assertTrue(context.containsBean("restTemplate"));
        assertTrue(context.containsBean("dataSource"));
    }
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Package Structure

```java
✅ DO: Place @SpringBootApplication at the root package
com.example.demo/
└── DemoApplication.java      // @SpringBootApplication here

❌ DON'T: Place it deep in sub-packages
com.example.demo/
└── config/
    └── app/
        └── DemoApplication.java    // Too deep!
```

#### 2. Single @SpringBootApplication

```java
✅ DO: Have only ONE @SpringBootApplication per application

❌ DON'T: Have multiple @SpringBootApplication classes
// MainApp.java
@SpringBootApplication
public class MainApp { }

// AnotherApp.java
@SpringBootApplication    // ❌ Conflict!
public class AnotherApp { }
```

#### 3. Selective Auto-Configuration

```java
✅ DO: Exclude unused auto-configurations for faster startup
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    RedisAutoConfiguration.class
})

❌ DON'T: Include everything if you don't use it
@SpringBootApplication    // Includes everything, even unused configs
```

### Common Pitfalls

#### 1. Component Not Found

```java
// Problem: Package structure
com.example.other/           // ❌ Outside base package
└── MyService.java

com.example.demo/
└── DemoApplication.java     // Won't find MyService

// Solution 1: Move to correct package
com.example.demo/
├── DemoApplication.java
└── service/
    └── MyService.java       // ✅ Will be found

// Solution 2: Add explicit scanning
@SpringBootApplication
@ComponentScan(basePackages = {"com.example.demo", "com.example.other"})
```

#### 2. Circular Dependencies

```java
// Problem
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA;
}

// Solution: Use constructor injection + @Lazy
@Service
public class ServiceA {
    private final ServiceB serviceB;

    public ServiceA(@Lazy ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}
```

#### 3. Auto-Configuration Conflicts

```java
// Problem: Custom DataSource conflicts with auto-configuration
@Bean
public DataSource dataSource() {
    return new CustomDataSource();
}
// Spring Boot also tries to auto-configure DataSource!

// Solution: Exclude auto-configuration
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
```

### Performance Optimization

```java
/**
 * Optimization strategies for @SpringBootApplication
 */

// 1. Exclude unused auto-configurations
@SpringBootApplication(exclude = {
    JmxAutoConfiguration.class,
    MultipartAutoConfiguration.class
})

// 2. Use lazy initialization (Spring Boot 2.2+)
// application.properties
spring.main.lazy-initialization=true

// 3. Narrow component scan scope
@SpringBootApplication
@ComponentScan(basePackages = "com.example.demo.core") // Only scan core

// 4. Use indexed components (faster scanning)
// Add to pom.xml:
// <dependency>
//     <groupId>org.springframework</groupId>
//     <artifactId>spring-context-indexer</artifactId>
//     <optional>true</optional>
// </dependency>
```

---

## 7. Visual Representations 📊

### Diagram 1: @SpringBootApplication Components

```
┌──────────────────────────────────────────────────────────┐
│           @SpringBootApplication                         │
├──────────────────────────────────────────────────────────┤
│  Meta-annotation combining three annotations:            │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  @SpringBootConfiguration                       │   │
│  │  (extends @Configuration)                       │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  • Marks class as configuration source          │   │
│  │  • Enables @Bean method definitions             │   │
│  │  • Provides configuration testing support       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  @EnableAutoConfiguration                       │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  • Analyzes classpath                           │   │
│  │  • Configures beans automatically               │   │
│  │  • Uses @Conditional annotations                │   │
│  │  • Can be customized with exclusions            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  @ComponentScan                                 │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  • Scans base package and sub-packages          │   │
│  │  • Finds @Component, @Service, @Repository      │   │
│  │  • Finds @Controller, @Configuration            │   │
│  │  • Registers beans in ApplicationContext        │   │
│  └─────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

### Diagram 2: Component Scanning Scope

```
Project Structure               Scanning Result
═════════════════              ═══════════════

com/
└── example/
    └── demo/                   ← @SpringBootApplication here
        ├── DemoApplication.java     ✅ Base Package
        │
        ├── controller/              ✅ SCANNED
        │   ├── UserController       ✅ Registered
        │   └── ProductController    ✅ Registered
        │
        ├── service/                 ✅ SCANNED
        │   ├── UserService          ✅ Registered
        │   └── ProductService       ✅ Registered
        │
        ├── repository/              ✅ SCANNED
        │   ├── UserRepository       ✅ Registered
        │   └── ProductRepository    ✅ Registered
        │
        ├── model/                   ✅ SCANNED
        │   ├── User                 ⚠️ Not registered (no stereotype)
        │   └── Product              ⚠️ Not registered (no stereotype)
        │
        └── config/                  ✅ SCANNED
            └── AppConfig            ✅ Registered (@Configuration)

    └── other/                       ❌ NOT SCANNED (sibling package)
        └── OtherService             ❌ Not registered
```

### Diagram 3: Auto-Configuration Decision Flow

```
Application Starts
      │
      ▼
┌─────────────────────────┐
│ Check Classpath         │
│ - JAR files             │
│ - Dependencies          │
│ - Classes available     │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐         NO
│ Is spring-web present?  ├──────────► Skip Web Configuration
└──────────┬──────────────┘
           │ YES
           ▼
┌─────────────────────────┐
│ Configure Web MVC       │
│ - Dispatcher Servlet    │
│ - Message Converters    │
│ - View Resolvers        │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐         NO
│ Is JDBC driver present? ├──────────► Skip DataSource
└──────────┬──────────────┘
           │ YES
           ▼
┌─────────────────────────┐
│ Configure DataSource    │
│ - Connection Pool       │
│ - Transaction Manager   │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ More auto-configs...    │
│ - Security              │
│ - JPA                   │
│ - Actuator              │
│ - 100+ more configs     │
└──────────┬──────────────┘
           │
           ▼
    Application Ready
```

### Diagram 4: Bean Registration Process

```
@SpringBootApplication
         │
         ▼
┌────────────────────────┐
│  1. Component Scan     │
│     Starts             │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│  2. Find Stereotypes   │
│     - @Component       │
│     - @Service         │
│     - @Repository      │
│     - @Controller      │
│     - @Configuration   │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│  3. Register Beans     │
│     in Context         │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│  4. Process            │
│     @Bean methods      │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│  5. Wire Dependencies  │
│     (@Autowired)       │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│  6. Post-process       │
│     Beans              │
└──────────┬─────────────┘
           │
           ▼
    Application Context
        Ready
```

---

## 8. Practice Questions 📝

### Beginner Level

1. **Q:** What three annotations does @SpringBootApplication combine?
   **A:** @SpringBootConfiguration, @EnableAutoConfiguration, @ComponentScan

2. **Q:** Write a minimal Spring Boot application

   ```java
   @SpringBootApplication
   public class MinimalApp {
       public static void main(String[] args) {
           SpringApplication.run(MinimalApp.class, args);
       }
   }
   ```

3. **Q:** How do you exclude an auto-configuration class?
   **A:** Using exclude attribute: `@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)`

### Intermediate Level

4. **Q:** Create a Spring Boot app that scans two different package roots

   ```java
   @SpringBootApplication
   @ComponentScan(basePackages = {"com.example.demo", "com.external.lib"})
   public class DemoApp {
       public static void main(String[] args) {
           SpringApplication.run(DemoApp.class, args);
       }
   }
   ```

5. **Q:** Why might a component not be picked up by @ComponentScan?
   **A:**
   - Outside base package
   - Missing stereotype annotation (@Component, @Service, etc.)
   - Filtered out by custom scan filters
   - Class is in test source folder

### Advanced Level

6. **Q:** Design a multi-module application with shared components

   ```java
   // Module 1: Common
   package com.example.common;

   @Component
   public class CommonService { }

   // Module 2: App
   package com.example.app;

   @SpringBootApplication
   @ComponentScan(basePackages = {"com.example.app", "com.example.common"})
   public class AppApplication {
       public static void main(String[] args) {
           SpringApplication.run(AppApplication.class, args);
       }
   }
   ```

7. **Q:** Explain the difference between @Configuration and @SpringBootConfiguration
   **A:** @SpringBootConfiguration is a specialized @Configuration used by Spring Boot for:
   - Testing configuration discovery
   - Configuration slicing in tests
   - Ensuring only one @SpringBootConfiguration per application

---

## 🎯 Key Takeaways

1. ✅ **@SpringBootApplication** = Three annotations in one
2. ✅ **Component Scan** starts from the package of the annotated class
3. ✅ **Auto-Configuration** is conditional and can be customized
4. ✅ **Package structure matters** - place main class at root package
5. ✅ **Exclusions** help optimize startup time and avoid conflicts
6. ✅ **One application class** per Spring Boot application

---

## 📚 What's Next?

- **[Tutorial 04: Advantages of Spring Boot](04_advantages.md)**
- **[Tutorial 10: @Conditional Annotations](10_conditional_annotations.md)**
- **[Tutorial 12: Auto-Configuration Deep Dive](12_auto_configuration.md)**
- **[Tutorial 22: @ComponentScan Deep Dive](22_component_scan.md)**

---

## 🔗 References

- [Spring Boot @SpringBootApplication Docs](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/SpringBootApplication.html)
- [Auto-Configuration Guide](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.auto-configuration)
- [Component Scanning](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-scanning-autodetection)

---

**You now have mastery over @SpringBootApplication! 🎉**

_Continue practicing and explore the next tutorials!_
