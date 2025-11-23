# Tutorial 15: Embedded Servers & Servlet Containers 🖥️

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Traditional vs Embedded Approach](#traditional-vs-embedded-approach)
3. [Available Embedded Servers](#available-embedded-servers)
4. [Configuration & Customization](#configuration--customization)
5. [Advanced Topics](#advanced-topics)
6. [Best Practices](#best-practices)
7. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

The embedded server concept revolutionized Java deployments. Instead of asking:

**Traditional:** "Where do I deploy my .war file?" → "I need to install Tomcat, configure it, manage multiple versions"

**Spring Boot:** "How do I run my application?" → `java -jar app.jar` → Done!

### The Evolution

```
TRADITIONAL SPRING (Pre-Boot):
Developer → Build .war file → Deploy to separate Tomcat installation
                                ├── Tomcat versions mismatches
                                ├── Configuration drift between servers
                                ├── Slow startup times
                                ├── DevOps burden

SPRING BOOT (Modern):
Developer → Build .jar file → java -jar app.jar
                                ├── Self-contained
                                ├── Identical behavior everywhere
                                ├── Fast startup
                                ├── No deployment complexity
```

---

## Traditional vs Embedded Approach

### Traditional Deployment (Before Spring Boot)

```
Project Structure:
myapp/
└── src/main/webapp/  ← Web content goes here
    ├── WEB-INF/
    │   └── web.xml   ← Servlet configuration
    └── index.jsp

Build:
Maven → .war file (Web Archive)

Deployment:
1. Install Tomcat on server
2. Copy .war to tomcat/webapps/
3. Restart Tomcat
4. Tomcat extracts .war and serves it
5. Hope the Tomcat version matches your development environment!

Problems:
❌ Separate server installation
❌ Version mismatches
❌ Manual deployment steps
❌ Multiple projects fight for resources
❌ Configuration drift
```

### Embedded Server Approach (Spring Boot)

```
Project Structure:
myapp/
└── src/main/resources/
    ├── application.yml
    └── static/
        └── index.html

Build:
Maven → Executable .jar file (contains Tomcat!)

Deployment:
1. Copy .jar to server
2. java -jar myapp.jar
3. Tomcat starts automatically
4. Application ready immediately

Benefits:
✅ Self-contained executable
✅ Same version everywhere
✅ No external configuration needed
✅ Multiple instances can coexist
✅ Identical behavior in dev/test/prod
✅ Container-friendly (Docker)
```

### Architecture Comparison

```
Traditional Deployment:
Tomcat (External Process)
├── webapp1.war
├── webapp2.war
└── webapp3.war

Problems:
- One Tomcat controls all apps
- App crash doesn't isolate
- Resource contention
- Shared configuration issues

Spring Boot Embedded:
Process 1: java -jar webapp1.jar (includes Tomcat)
Process 2: java -jar webapp2.jar (includes Tomcat)
Process 3: java -jar webapp3.jar (includes Tomcat)

Benefits:
- Each app runs independently
- One app crash doesn't affect others
- Each has its own resources
- Easy to scale horizontally
```

---

## Available Embedded Servers

### Default: Tomcat

```
Tomcat: Apache's classic servlet container
- Most popular
- Well-tested
- Excellent performance
- Default for spring-boot-starter-web
```

```xml
<!-- Automatically included with spring-boot-starter-web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!-- Brings in: spring-boot-starter-tomcat -->
</dependency>

<!-- Configuration -->
server:
  port: 8080
  tomcat:
    threads:
      max: 200
      min-spare: 10
    max-connections: 10000
    connection-timeout: 20000
    accept-count: 100
```

### Alternative: Jetty

```
Jetty: Lightweight, embeddable servlet container
- Smaller memory footprint
- Faster startup
- Good for microservices
- Good for constrained environments
```

```xml
<!-- Exclude Tomcat, add Jetty -->
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

<!-- Configuration -->
server:
  port: 8080
  jetty:
    threads:
      max: 200
      min: 10
```

### Alternative: Undertow

```
Undertow: High-performance servlet container
- Built by Red Hat
- Excellent performance
- Low memory usage
- Recommended for high-throughput scenarios
```

```xml
<!-- Exclude Tomcat, add Undertow -->
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

<!-- Configuration -->
server:
  port: 8080
  undertow:
    threads:
      io: 4
      worker: 32
    buffer-size: 1024
    direct-buffers: true
```

### Comparison: Which to Choose?

```
TOMCAT:
- Default (no changes needed)
- Best community support
- Great documentation
- Use when: Most projects
- Performance: Good
- Memory: Medium
- Startup: Medium

JETTY:
- Lightweight
- Good for microservices
- Low memory footprint
- Use when: Memory-constrained, lightweight containers
- Performance: Good
- Memory: Low
- Startup: Fast

UNDERTOW:
- Highest performance
- Built by enterprise vendor (Red Hat)
- Modern architecture
- Use when: High-throughput systems
- Performance: Excellent
- Memory: Low
- Startup: Very Fast
```

### Non-Servlet Containers (Reactive)

```java
/**
 * spring-boot-starter-webflux
 * Doesn't use traditional servlet containers!
 * Uses Reactor Netty or Undertow in reactive mode
 */
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

// No servlet = different execution model
// Non-blocking I/O by default
// Better resource utilization
// Better for I/O-bound operations
```

---

## Configuration & Customization

### Basic Server Configuration

```yaml
server:
  # Port and context
  port: 8080
  servlet:
    context-path: /api/v1

  # SSL/HTTPS
  ssl:
    enabled: true
    key-store: classpath:keystore.jks
    key-store-password: ${KEYSTORE_PASSWORD}
    key-store-type: JKS

  # Timeout
  tomcat:
    connection-timeout: 20000
    accept-count: 100

  # Error handling
  error:
    include-message: always
    include-stacktrace: always
```

### Advanced Tomcat Configuration

```java
/**
 * Customize embedded Tomcat programmatically
 */
@Configuration
public class TomcatConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
            containerCustomizer() {

        return factory -> {
            // Thread pool configuration
            factory.getTomcatProtocolHandler()
                .setMaxThreads(200);
            factory.getTomcatProtocolHandler()
                .setMinSpareThreads(10);

            // Connection pool
            factory.getTomcatProtocolHandler()
                .setMaxConnections(10000);
            factory.getTomcatProtocolHandler()
                .setConnectionTimeout(20000);

            // Custom error pages
            factory.addErrorPages(
                new ErrorPage(HttpStatus.NOT_FOUND, "/error/404"),
                new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/error/500")
            );

            // Additional properties
            factory.getTomcatProtocolHandler()
                .setAttribute("acceptCount", 100);

            // Custom connectors
            Connector httpConnector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
            httpConnector.setPort(8080);
            httpConnector.setRedirectPort(8443);
            factory.addAdditionalTomcatConnectors(httpConnector);
        };
    }
}
```

### Multiple Ports

```java
/**
 * Run application on multiple ports
 * (useful for management port separate from app port)
 */
@Configuration
public class MultiPortConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
            multiPortCustomizer() {

        return factory -> {
            // Main connector (8080)
            Connector httpConnector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
            httpConnector.setPort(8080);
            factory.addAdditionalTomcatConnectors(httpConnector);

            // Management connector (9000) - separate from main app
            Connector managementConnector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
            managementConnector.setPort(9000);
            factory.addAdditionalTomcatConnectors(managementConnector);
        };
    }
}

// Usage:
// App traffic: localhost:8080
// Management/health: localhost:9000
```

### HTTPS/SSL Configuration

```yaml
server:
  port: 8443
  ssl:
    enabled: true

    # Self-signed certificate (development)
    key-store: classpath:dev-keystore.jks
    key-store-password: devpassword
    key-store-type: JKS
    key-alias: tomcat

    # Production certificate (let's encrypt, DigiCert, etc.)
    # key-store: /etc/ssl/keystore.p12
    # key-store-password: ${SSL_KEYSTORE_PASSWORD}
    # key-store-type: PKCS12

    key-password: ${KEY_PASSWORD}
```

### Session Configuration

```yaml
server:
  servlet:
    session:
      timeout: 30m # 30 minutes
      persistent: true
      store-dir: /tmp/sessions

  tomcat:
    basedir: /tmp/tomcat
```

---

## Advanced Topics

### Graceful Shutdown

```java
/**
 * Stop accepting requests but finish processing existing ones
 */
@Configuration
public class GracefulShutdownConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
            gracefulShutdown() {

        return factory -> {
            factory.getTomcatProtocolHandler()
                .setProcessorCache(100);

            // Wait up to 30 seconds for existing requests to complete
            factory.shutdownGracefully(Duration.ofSeconds(30));
        };
    }
}

// Spring Boot 2.3+ configuration:
server:
  shutdown: graceful
  shutdown-timeout: 30s
```

### Health Check Endpoints

```java
/**
 * Separate health check port (common in Kubernetes)
 */
@Configuration
public class ManagementConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
            healthcheckCustomizer() {

        return factory -> {
            // Health checks on separate port (internal only)
            Connector healthConnector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
            healthConnector.setPort(9090);  // Kubernetes probes here

            Context context = new StandardContext();
            context.setPath("/healthz");

            factory.addAdditionalTomcatConnectors(healthConnector);
        };
    }
}
```

### Performance Tuning

```java
/**
 * Optimize for high throughput
 */
@Configuration
public class PerformanceConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
            performanceTuning() {

        return factory -> {
            factory.getTomcatProtocolHandler().setMaxThreads(500);
            factory.getTomcatProtocolHandler().setMinSpareThreads(50);
            factory.getTomcatProtocolHandler().setMaxConnections(50000);
            factory.getTomcatProtocolHandler().setConnectionTimeout(60000);
            factory.getTomcatProtocolHandler().setKeepAliveTimeout(60000);

            // Buffer settings
            factory.getTomcatProtocolHandler()
                .setAttribute("maxHttpHeaderSize", 8192);

            // Disable unnecessary features
            factory.getTomcatProtocolHandler()
                .setAttribute("sendfileSize", 0);
        };
    }
}
```

---

## Best Practices

### ✅ DO: Use Default Tomcat Unless You Have Reasons Not To

```java
// ✅ Good - Tomcat is battle-tested
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

// Use alternatives only if:
// - Memory is extremely constrained → Jetty
// - Very high throughput required → Undertow
// - Specific requirements dictate → Ask security team first
```

### ✅ DO: Configure for Production Environment

```yaml
# Development (application-dev.yml)
server:
  port: 8080
  error:
    include-stacktrace: always

# Production (application-prod.yml)
server:
  port: 8443
  ssl:
    enabled: true
    key-store: /etc/ssl/keystore.p12
  error:
    include-stacktrace: never
  tomcat:
    threads:
      max: 200
    max-connections: 10000
```

### ❌ DON'T: Hardcode Ports

```java
// ❌ Bad - Hardcoded port
server.port=8080

// ✅ Good - Configurable
server:
  port: ${SERVER_PORT:8080}  # Default 8080 if not set

// ✅ Good - Random port for testing
server:
  port: 0  # Finds random available port
```

### ✅ DO: Use Actuator for Health

```java
// Add Actuator for production monitoring
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

// Provides:
// GET /actuator/health - liveness probe
// GET /actuator/health/readiness - readiness probe
// GET /actuator/health/liveness - is app alive
```

### ✅ DO: Enable Graceful Shutdown

```yaml
# Spring Boot 2.3+
server:
  shutdown: graceful
  shutdown-timeout: 60s
# Allows time for in-flight requests to complete
# Before terminating
```

---

## Practice Questions

### Question 1: Why Doesn't Spring Boot Need External Tomcat?

**Q**: How can a .jar file include a web server?

**A**: Spring Boot includes the server libraries (Tomcat, Jetty, etc.) as regular Java dependencies in the jar file:

```
my-app.jar:
├── com/example/MyController.class
├── org/apache/catalina/Tomcat.class        ← Tomcat classes!
├── org/apache/coyote/http11/...            ← HTTP protocol handler!
├── META-INF/MANIFEST.MF
│   └── Main-Class: org.springframework.boot.loader.JarLauncher
└── lib/
    ├── spring-core-6.0.0.jar
    ├── tomcat-embed-core-10.0.0.jar
    └── ... other jars
```

When you run `java -jar my-app.jar`, it starts Tomcat just like any other Java class.

### Question 2: What's the Difference Between .jar and .war?

**Q**: Which should I use - .jar or .war?

**A**:

- **.jar** (Spring Boot default) - Self-contained, includes server, deployable with `java -jar`
- **.war** (traditional) - Web archive, requires external Tomcat, deployable to app servers

```bash
# .jar deployment
java -jar myapp.jar

# .war deployment (old way)
cp myapp.war $TOMCAT_HOME/webapps/
$TOMCAT_HOME/bin/catalina.sh start
```

**Use .jar for modern deployments!**

### Question 3: Can You Switch Servers After Startup?

**Q**: Can you change from Tomcat to Jetty without rebuilding?

**A**: No - the server is compiled into the .jar file. You must:

1. Remove Tomcat dependency
2. Add Jetty dependency
3. Rebuild the jar
4. Deploy new jar

```xml
<!-- Step 1: Exclude Tomcat -->
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

<!-- Step 2: Add Jetty -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>

<!-- Step 3: mvn clean package -->
<!-- Step 4: java -jar myapp.jar (now using Jetty) -->
```

---

## Key Takeaways

1. **Embedded servers are Spring Boot's killer feature**: Eliminates deployment complexity
2. **Tomcat is the safe default**: Use it unless you have specific reasons not to
3. **No external installation needed**: Everything is in the jar
4. **Same version everywhere**: Dev/test/prod use identical server
5. **Lightweight alternatives available**: Jetty for memory, Undertow for performance
6. **Easy configuration**: application.yml controls server behavior
7. **SSL/HTTPS out of the box**: Configure with key-store properties
8. **Graceful shutdown**: Allow existing requests to complete
9. **Separate ports for management**: Health checks on different port (Kubernetes)
10. **Containers love this**: Docker/Kubernetes work seamlessly with jar deployments
