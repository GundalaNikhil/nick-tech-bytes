# Tutorial 02: Key Features of Spring Boot 🌟

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

Master the key features that make Spring Boot powerful:

- **Identify all major features** - What makes Spring Boot special
- **Understand each feature deeply** - How they work and why they matter
- **See practical examples** - Real implementations
- **Learn when to use each** - Best practices and use cases

### Why These Features Matter

Spring Boot's features transform Java development from complex to simple:

```
Traditional Spring Development:
❌ 3-4 days to set up a project
❌ 500+ lines of XML configuration
❌ Manual dependency version management
❌ Complex deployment process
❌ No production monitoring

Spring Boot Development:
✅ 5 minutes to set up a project
✅ Zero XML configuration
✅ Automatic dependency management
✅ One-click deployment (java -jar)
✅ Built-in production monitoring
```

---

## 2. Solution Approach 🎯

### Core Features Overview

Spring Boot provides **8 major feature categories**:

```
1. Auto-Configuration
2. Starter Dependencies
3. Embedded Servers
4. Production-Ready Features (Actuator)
5. Externalized Configuration
6. Spring Boot CLI
7. Development Tools
8. Opinionated Defaults
```

### Feature Philosophy

```
┌────────────────────────────────────────────────┐
│   Spring Boot Feature Philosophy               │
├────────────────────────────────────────────────┤
│                                                │
│  1. Convention over Configuration              │
│     → Sensible defaults reduce setup           │
│                                                │
│  2. Rapid Application Development              │
│     → From idea to production in minutes       │
│                                                │
│  3. Production-Ready                           │
│     → Built-in monitoring and management       │
│                                                │
│  4. Flexible but Opinionated                   │
│     → Good defaults, easy to customize         │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 3. Prerequisites & Requirements 📦

### Software Requirements

- JDK 17+
- Spring Boot 3.x
- Maven/Gradle
- IDE (IntelliJ IDEA recommended)

### Knowledge Requirements

- ✅ Basic Java
- ✅ Tutorial 01 completed (What is Spring Boot)
- ⚠️ Spring Framework basics (helpful)

---

## 4. Key Topics & Plan of Action 📚

### Features We'll Cover

```
Feature 1: Auto-Configuration
├── What it does
├── How it works
├── Example implementation
└── Customization

Feature 2: Starter Dependencies
├── What are starters
├── Common starters
├── Creating custom starters
└── Best practices

Feature 3: Embedded Servers
├── Tomcat, Jetty, Undertow
├── Configuration
├── Switching servers
└── Advantages

Feature 4: Actuator (Production Features)
├── Health checks
├── Metrics
├── Monitoring
└── Management endpoints

Feature 5: Externalized Configuration
├── application.properties
├── application.yml
├── Profiles
└── Environment-specific config

Feature 6: Development Tools
├── DevTools
├── Live Reload
├── Fast Restart
└── Developer experience

Feature 7: Spring Boot CLI
├── Command-line interface
├── Groovy scripts
├── Quick prototyping
└── When to use

Feature 8: Opinionated Defaults
├── What they are
├── Why they exist
├── How to override
└── Best practices
```

---

## 5. Complete Implementation 💻

### Feature 1: Auto-Configuration ⚡

**What It Does:**
Automatically configures your application based on dependencies in classpath.

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Auto-Configuration Example
 *
 * When you add spring-boot-starter-web, Spring Boot automatically:
 * - Configures Tomcat as embedded server
 * - Sets up Spring MVC
 * - Configures Jackson for JSON conversion
 * - Sets up error handling
 * - Configures static resources
 * - And 50+ more configurations!
 */
@SpringBootApplication
public class AutoConfigDemo {
    public static void main(String[] args) {
        SpringApplication.run(AutoConfigDemo.class, args);
    }
}
```

**See Auto-Configuration in Action:**

```properties
# application.properties

# Enable debug mode to see auto-configuration report
debug=true
```

**Console Output Shows:**

```
============================
CONDITIONS EVALUATION REPORT
============================

Positive matches:
-----------------

   WebMvcAutoConfiguration matched:
      - @ConditionalOnClass found classes 'DispatcherServlet'
      - @ConditionalOnWebApplication (required) type: SERVLET

   DataSourceAutoConfiguration matched:
      - @ConditionalOnClass found classes 'DataSource'

Negative matches:
-----------------

   SecurityAutoConfiguration:
      Did not match:
         - @ConditionalOnClass did not find class 'SpringSecurityConfiguration'
```

**Custom Auto-Configuration:**

```java
package com.example.demo.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Custom auto-configuration for RestTemplate
 */
@Configuration
@ConditionalOnClass(RestTemplate.class)
public class RestTemplateAutoConfig {

    @Bean
    @ConditionalOnMissingBean
    public RestTemplate restTemplate() {
        System.out.println("✅ Auto-configuring RestTemplate");
        return new RestTemplate();
    }
}
```

---

### Feature 2: Starter Dependencies 📦

**What They Are:**
Pre-packaged dependency descriptors that bring in commonly used libraries.

**Common Starters:**

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Web Applications -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- Includes: Spring MVC, Tomcat, Jackson, Validation -->
    </dependency>

    <!-- Data Access -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
        <!-- Includes: Spring Data JPA, Hibernate, JDBC -->
    </dependency>

    <!-- Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
        <!-- Includes: Spring Security, Authentication, Authorization -->
    </dependency>

    <!-- Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <!-- Includes: JUnit, Mockito, AssertJ, Spring Test -->
        <scope>test</scope>
    </dependency>
</dependencies>
```

**Comparison: With vs Without Starters**

```xml
<!-- WITHOUT Starters (Traditional Way) -->
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>6.0.0</version>  <!-- Manual version -->
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>6.0.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.15.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.tomcat.embed</groupId>
        <artifactId>tomcat-embed-core</artifactId>
        <version>10.1.0</version>
    </dependency>
    <!-- ... 15+ more dependencies with versions ... -->
</dependencies>

<!-- WITH Starters (Spring Boot Way) -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- NO VERSION - managed by parent -->
        <!-- Brings in ALL necessary dependencies -->
    </dependency>
</dependencies>
```

**Demo: See What a Starter Includes**

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class StarterDemo {
    public static void main(String[] args) {
        ConfigurableApplicationContext context =
            SpringApplication.run(StarterDemo.class, args);

        System.out.println("\n=== Dependencies from spring-boot-starter-web ===");
        System.out.println("✅ Spring MVC - for web layer");
        System.out.println("✅ Tomcat - embedded server");
        System.out.println("✅ Jackson - JSON processing");
        System.out.println("✅ Hibernate Validator - validation");
        System.out.println("✅ Spring Core - DI container");
    }
}
```

---

### Feature 3: Embedded Servers 🖥️

**What It Does:**
Includes web server inside your application JAR.

**Supported Servers:**

```xml
<!-- Default: Tomcat (included in spring-boot-starter-web) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Switch to Jetty -->
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

<!-- Switch to Undertow -->
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
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```

**Configure Embedded Server:**

```properties
# application.properties

# Server port
server.port=8080

# Context path
server.servlet.context-path=/api

# Tomcat-specific configuration
server.tomcat.threads.max=200
server.tomcat.threads.min-spare=10

# Connection timeout
server.tomcat.connection-timeout=20000

# Compression
server.compression.enabled=true
server.compression.mime-types=text/html,text/xml,text/plain,application/json
```

**Programmatic Configuration:**

```java
package com.example.demo.config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Custom embedded server configuration
 */
@Configuration
public class ServerConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
            webServerFactoryCustomizer() {
        return factory -> {
            factory.setPort(9090);
            factory.setContextPath("/myapp");
            System.out.println("✅ Custom server configuration applied");
        };
    }
}
```

**Advantages:**

```
✅ No external server installation required
✅ Same environment in dev and prod
✅ Easy deployment (java -jar app.jar)
✅ Self-contained application
✅ Quick startup and testing
✅ Cloud-ready (containerization friendly)
```

---

### Feature 4: Spring Boot Actuator (Production Features) 📊

**What It Does:**
Provides production-ready features for monitoring and management.

**Add Actuator:**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**Configuration:**

```properties
# application.properties

# Enable all actuator endpoints
management.endpoints.web.exposure.include=*

# Or specific endpoints
# management.endpoints.web.exposure.include=health,info,metrics

# Customize base path
management.endpoints.web.base-path=/actuator

# Show detailed health information
management.endpoint.health.show-details=always
```

**Available Endpoints:**

```bash
# Health check
curl http://localhost:8080/actuator/health

# Application info
curl http://localhost:8080/actuator/info

# Metrics
curl http://localhost:8080/actuator/metrics

# Environment properties
curl http://localhost:8080/actuator/env

# Configuration properties
curl http://localhost:8080/actuator/configprops

# Beans in context
curl http://localhost:8080/actuator/beans

# Mappings (all endpoints)
curl http://localhost:8080/actuator/mappings

# Thread dump
curl http://localhost:8080/actuator/threaddump

# Heap dump
curl http://localhost:8080/actuator/heapdump
```

**Custom Health Indicator:**

```java
package com.example.demo.health;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

/**
 * Custom health check for external service
 */
@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Check external service health
        boolean isHealthy = checkExternalService();

        if (isHealthy) {
            return Health.up()
                    .withDetail("service", "running")
                    .withDetail("status", "available")
                    .build();
        } else {
            return Health.down()
                    .withDetail("service", "down")
                    .withDetail("error", "Connection refused")
                    .build();
        }
    }

    private boolean checkExternalService() {
        // Actual health check logic
        return true;
    }
}
```

**Custom Info Endpoint:**

```properties
# application.properties

# Add application info
info.app.name=My Spring Boot App
info.app.version=1.0.0
info.app.description=Demo application
info.team=Backend Team
```

```java
package com.example.demo.config;

import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Custom info contributor
 */
@Component
public class CustomInfoContributor implements InfoContributor {

    @Override
    public void contribute(Info.Builder builder) {
        Map<String, Object> customInfo = new HashMap<>();
        customInfo.put("runtime", "JVM " + System.getProperty("java.version"));
        customInfo.put("uptime", getUptime());
        customInfo.put("activeUsers", 150);

        builder.withDetail("custom", customInfo);
    }

    private String getUptime() {
        long uptimeMs = System.currentTimeMillis();
        return String.format("%d minutes", uptimeMs / 60000);
    }
}
```

---

### Feature 5: Externalized Configuration 📝

**Multiple Configuration Sources:**

```
Priority (Highest to Lowest):
1. Command line arguments
2. System properties
3. Environment variables
4. application-{profile}.properties
5. application.properties
6. @PropertySource annotations
7. Default values in code
```

**application.properties:**

```properties
# Server configuration
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost/mydb
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}

# Custom properties
app.name=My Application
app.version=1.0.0
app.features.email=true
app.features.sms=false
```

**application.yml:**

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost/mydb
    username: root
    password: ${DB_PASSWORD}

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

app:
  name: My Application
  version: 1.0.0
  features:
    email: true
    sms: false
```

**Profile-Specific Configuration:**

```properties
# application-dev.properties (Development)
server.port=8080
spring.datasource.url=jdbc:h2:mem:devdb
logging.level.root=DEBUG

# application-prod.properties (Production)
server.port=80
spring.datasource.url=jdbc:mysql://prod-server/proddb
logging.level.root=WARN
```

**Activate Profile:**

```bash
# Via command line
java -jar app.jar --spring.profiles.active=prod

# Via environment variable
export SPRING_PROFILES_ACTIVE=prod
java -jar app.jar

# Via application.properties
spring.profiles.active=dev
```

**Using @ConfigurationProperties:**

```java
package com.example.demo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Type-safe configuration properties
 */
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name;
    private String version;
    private Features features = new Features();

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public Features getFeatures() { return features; }
    public void setFeatures(Features features) { this.features = features; }

    public static class Features {
        private boolean email;
        private boolean sms;

        public boolean isEmail() { return email; }
        public void setEmail(boolean email) { this.email = email; }

        public boolean isSms() { return sms; }
        public void setSms(boolean sms) { this.sms = sms; }
    }
}
```

**Using Properties:**

```java
package com.example.demo.service;

import com.example.demo.config.AppProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppService {

    @Autowired
    private AppProperties appProperties;

    public void printConfig() {
        System.out.println("App: " + appProperties.getName());
        System.out.println("Version: " + appProperties.getVersion());
        System.out.println("Email enabled: " + appProperties.getFeatures().isEmail());
    }
}
```

---

### Feature 6: Spring Boot DevTools 🛠️

**What It Does:**
Enhances development experience with auto-restart and live reload.

**Add DevTools:**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

**Features:**

```
✅ Automatic Restart
   - Detects classpath changes
   - Restarts application automatically
   - Faster than manual restart

✅ Live Reload
   - Browser extension available
   - Automatic page refresh
   - CSS/JS changes reflected instantly

✅ Property Defaults
   - Disables caching for development
   - Enables template auto-reload
   - Better error pages

✅ Remote Development
   - Update remote applications
   - Debug remote apps
```

**Configuration:**

```properties
# application.properties

# Enable/disable DevTools
spring.devtools.restart.enabled=true

# Exclude specific paths from restart trigger
spring.devtools.restart.exclude=static/**,public/**

# Additional paths to watch
spring.devtools.restart.additional-paths=src/main/resources

# LiveReload
spring.devtools.livereload.enabled=true
```

**Using DevTools:**

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * DevTools Demo
 *
 * Try this:
 * 1. Run the application
 * 2. Access http://localhost:8080/hello
 * 3. Change the return message below
 * 4. Save the file
 * 5. Application auto-restarts!
 * 6. Refresh browser - see new message
 */
@SpringBootApplication
@RestController
public class DevToolsDemo {

    public static void main(String[] args) {
        SpringApplication.run(DevToolsDemo.class, args);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello with DevTools!"; // Change this and save
    }
}
```

---

### Feature 7: Spring Boot CLI 💻

**What It Does:**
Command-line tool for quickly developing Spring applications with Groovy.

**Installation:**

```bash
# Using SDKMAN
sdk install springboot

# Using Homebrew (macOS)
brew tap spring-io/tap
brew install spring-boot

# Verify installation
spring --version
```

**Quick App with CLI:**

```groovy
// hello.groovy
@RestController
class HelloController {
    @GetMapping("/")
    String hello() {
        "Hello from Spring Boot CLI!"
    }
}
```

```bash
# Run directly
spring run hello.groovy

# Access
curl http://localhost:8080/
```

**Create Project:**

```bash
# Create new project
spring init --dependencies=web,data-jpa my-app

# With specific options
spring init \
    --dependencies=web,data-jpa,security \
    --language=java \
    --java-version=17 \
    --packaging=jar \
    --group-id=com.example \
    --artifact-id=demo \
    my-project
```

---

### Feature 8: Opinionated Defaults 💡

**What They Are:**
Pre-configured sensible defaults that work for 80% of use cases.

**Examples of Defaults:**

```
Database:
├── HikariCP connection pool (fastest)
├── Hibernate as JPA implementation
└── H2 for embedded database

Web:
├── Tomcat as embedded server (port 8080)
├── Jackson for JSON
├── UTF-8 encoding
└── Spring MVC as web framework

Logging:
├── Logback as logging framework
├── INFO level by default
└── Console output

Testing:
├── JUnit 5 as test framework
├── Mockito for mocking
└── AssertJ for assertions
```

**Override Defaults:**

```properties
# application.properties

# Change default port (default: 8080)
server.port=9000

# Change logging level (default: INFO)
logging.level.root=DEBUG

# Change connection pool (default: HikariCP)
spring.datasource.type=com.zaxxer.hikari.HikariDataSource

# Change JSON date format
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
```

**Why Opinionated Defaults Matter:**

```
❌ Without Defaults:
   - 100+ decisions to make
   - Research each option
   - Configure everything
   - Risk of misconfigurations

✅ With Defaults:
   - Start coding immediately
   - Proven configurations
   - Override only when needed
   - Best practices built-in
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Use Starters Appropriately

```xml
✅ DO: Use starters for common scenarios
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

❌ DON'T: Add individual libraries
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
</dependency>
```

#### 2. Leverage Auto-Configuration

```java
✅ DO: Let Spring Boot configure beans
// No configuration needed for DataSource if properties are set

❌ DON'T: Manually configure everything
@Bean
public DataSource dataSource() {
    // Only if you need custom configuration
}
```

#### 3. Secure Actuator Endpoints

```properties
✅ DO: Limit exposed endpoints in production
management.endpoints.web.exposure.include=health,info

❌ DON'T: Expose all endpoints in production
management.endpoints.web.exposure.include=*
```

### Common Pitfalls

#### 1. Port Already in Use

```bash
# Error: Port 8080 already in use

# Solution
server.port=8081
```

#### 2. Auto-Configuration Conflicts

```java
// Problem: Custom bean conflicts with auto-config

// Solution: Exclude auto-configuration
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
```

#### 3. DevTools in Production

```xml
<!-- Problem: DevTools included in production -->

<!-- Solution: Mark as optional -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional> <!-- Excluded from final JAR -->
</dependency>
```

---

## 7. Visual Representations 📊

### Diagram 1: Spring Boot Feature Ecosystem

```
┌─────────────────────────────────────────────────────────┐
│           Spring Boot Application                       │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│     Auto     │  │   Starters   │  │  Embedded    │
│Configuration │  │              │  │   Servers    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       │        ┌────────┴────────┐        │
       │        │                 │        │
       ▼        ▼                 ▼        ▼
┌──────────────────────────────────────────────────────┐
│          Spring Framework Core                       │
│          (IoC, DI, AOP, Events)                      │
└──────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Actuator    │  │  DevTools    │  │    CLI       │
│(Monitoring)  │  │ (Dev Speed)  │  │ (Quick Dev)  │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Diagram 2: Auto-Configuration Flow

```
Application Starts
        │
        ▼
┌──────────────────────┐
│ Classpath Scan       │
│ - Check dependencies │
│ - Find classes       │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────┐
│ Conditional Check    │
│ - @ConditionalOnClass│
│ - @ConditionalOnBean │
│ - @ConditionalOn...  │
└─────────┬────────────┘
          │
    ┌─────┴─────┐
    │           │
 Match      No Match
    │           │
    ▼           ▼
┌─────────┐ ┌─────────┐
│Configure│ │  Skip   │
│  Beans  │ │         │
└─────────┘ └─────────┘
```

### Diagram 3: Starter Dependencies

```
spring-boot-starter-web
         │
         ├─► spring-boot-starter (core)
         │   ├─► spring-core
         │   ├─► spring-context
         │   └─► auto-configuration
         │
         ├─► spring-boot-starter-tomcat
         │   └─► tomcat-embed-core
         │
         ├─► spring-webmvc
         │   ├─► spring-web
         │   └─► spring-context
         │
         └─► spring-boot-starter-json
             └─► jackson-databind
```

---

## 8. Practice Questions 📝

### Beginner Level

1. **Q:** Name the 8 key features of Spring Boot
   **A:** Auto-Configuration, Starters, Embedded Servers, Actuator, Externalized Configuration, DevTools, CLI, Opinionated Defaults

2. **Q:** What is a Spring Boot Starter?
   **A:** A pre-packaged set of dependencies that brings in commonly used libraries together

3. **Q:** How do you enable all Actuator endpoints?
   ```properties
   management.endpoints.web.exposure.include=*
   ```

### Intermediate Level

4. **Q:** Create a custom health indicator

   ```java
   @Component
   public class CustomHealthIndicator implements HealthIndicator {
       @Override
       public Health health() {
           return Health.up()
               .withDetail("custom", "healthy")
               .build();
       }
   }
   ```

5. **Q:** How do you switch from Tomcat to Jetty?
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
   ```

### Advanced Level

6. **Q:** Explain how auto-configuration decides whether to configure a bean
   **A:** It uses @Conditional annotations to check:

   - If required classes are on classpath (@ConditionalOnClass)
   - If beans don't already exist (@ConditionalOnMissingBean)
   - If properties are set (@ConditionalOnProperty)
   - Other conditions, and only configures if all conditions match

7. **Q:** Create type-safe configuration properties for a custom feature
   ```java
   @ConfigurationProperties(prefix = "myapp.feature")
   public class FeatureProperties {
       private boolean enabled = true;
       private String apiKey;
       private int timeout = 5000;

       // Getters and setters
   }
   ```

---

## 🎯 Key Takeaways

1. ✅ **Auto-Configuration** - Intelligently configures your app based on dependencies
2. ✅ **Starters** - Curated dependency sets for common scenarios
3. ✅ **Embedded Servers** - No external server needed
4. ✅ **Actuator** - Production monitoring out of the box
5. ✅ **Externalized Config** - Flexible configuration management
6. ✅ **DevTools** - Enhanced developer productivity
7. ✅ **CLI** - Rapid prototyping with Groovy
8. ✅ **Opinionated Defaults** - Sensible configurations that work immediately

---

## 📚 What's Next?

- **[Tutorial 03: @SpringBootApplication Deep Dive](03_springbootapplication_annotation.md)**
- **[Tutorial 12: Auto-Configuration Explained](12_auto_configuration.md)**
- **[Tutorial 14: Spring Boot Starters](14_starters.md)**
- **[Tutorial 17: Spring Boot Actuators](17_actuators.md)**

---

## 🔗 References

- [Spring Boot Features Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html)
- [Spring Boot Starters](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)
- [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)

---

**You now understand all key features of Spring Boot! 🎉**
