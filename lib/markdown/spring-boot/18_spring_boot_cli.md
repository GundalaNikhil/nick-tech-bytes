# Tutorial 18: Spring Boot CLI (Command Line Interface) 💻

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Installation & Setup](#installation--setup)
3. [Basic Commands](#basic-commands)
4. [Creating Projects from CLI](#creating-projects-from-cli)
5. [Running Groovy Scripts](#running-groovy-scripts)
6. [Advanced Features](#advanced-features)
7. [Best Practices](#best-practices)
8. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

The Spring Boot CLI (Command Line Interface) is a **tool for fast development** without leaving the terminal:

- Create projects quickly
- Run Spring Boot apps without building jars
- Write quick scripts with Groovy
- Manage dependencies easily
- Perfect for experimentation and prototyping

### The CLI vs Maven/Gradle

```
Traditional Approach:
maven pom.xml → mvn clean package → java -jar app.jar
(Takes 30+ seconds)

Spring Boot CLI:
spring run app.groovy
(Takes 2-3 seconds!)

Use Cases:
CLI: Quick prototyping, experimenting, single-file apps
Maven/Gradle: Production apps, complex builds, CI/CD
```

---

## Installation & Setup

### macOS (Using Homebrew)

```bash
# Install Spring Boot CLI
brew tap pivotal/tap
brew install springboot

# Verify installation
spring --version
# Output: Spring Boot v3.2.1

# Upgrade to latest version
brew upgrade springboot
```

### Linux (Using SDKMAN!)

```bash
# Install SDKMAN first
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Spring Boot CLI
sdk install springboot

# List available versions
sdk list springboot

# Install specific version
sdk install springboot 3.2.1

# Use specific version
sdk use springboot 3.2.1

# Verify
spring --version
```

### Windows (Manual Installation)

```bash
# Download from: https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/

# Extract to: C:\Program Files\spring-boot-cli

# Add to PATH:
# C:\Program Files\spring-boot-cli\bin

# Verify in PowerShell
spring --version
```

### Docker

```bash
# Run Spring Boot CLI in Docker
docker run -it --rm \
  -v $(pwd):/workspace \
  -w /workspace \
  openjdk:17 \
  /bin/bash -c "
    curl -s https://raw.githubusercontent.com/spring-projects/spring-boot/main/spring-boot-cli/install.sh | bash
    spring --version
  "
```

---

## Basic Commands

### Help and Version

```bash
# Show help
spring --help
spring help

# Show version
spring --version

# Help for specific command
spring help create
spring help run
spring help test
```

### Project Creation

```bash
# Create project interactively
spring project create --name my-app

# Create with options
spring create --build maven \
              --java-version 17 \
              --language java \
              --packaging jar \
              my-web-app

# List available project types
spring project list
```

### Running Applications

```bash
# Run a JAR file
spring run app.jar

# Run a Groovy script
spring run app.groovy

# Run with arguments
spring run app.groovy -- --server.port=9000

# Run with JVM options
spring run app.groovy -Xmx512m -Xms256m

# Watch for changes and restart (like DevTools)
spring run app.groovy --watch
```

---

## Creating Projects from CLI

### Quick Start: Single File App

```bash
# Create a simple Groovy app
mkdir my-app && cd my-app
touch app.groovy
```

```groovy
// app.groovy - Complete Spring Boot app in one file!

@RestController
class HelloController {

    @GetMapping("/")
    String hello() {
        "Hello from Spring Boot CLI!"
    }

    @GetMapping("/api/time")
    LocalDateTime currentTime() {
        LocalDateTime.now()
    }
}

@SpringBootApplication
class Application {}
```

```bash
# Run it!
spring run app.groovy

# App is now running on http://localhost:8080
# curl http://localhost:8080
# Output: Hello from Spring Boot CLI!

# With auto-reload
spring run app.groovy --watch

# Modify app.groovy, save, and app reloads automatically!
```

### Multi-File Project

```groovy
// src/main/groovy/Application.groovy
@SpringBootApplication
class Application {}

// src/main/groovy/UserController.groovy
@RestController
@RequestMapping("/api/users")
class UserController {

    @GetMapping
    List<String> list() {
        ["user1", "user2", "user3"]
    }

    @PostMapping
    void create(@RequestBody String username) {
        println "Creating user: $username"
    }
}

// src/main/groovy/AppConfig.groovy
@Configuration
class AppConfig {

    @Bean
    fun messageService() {
        // Return service
    }
}
```

```bash
# Run the whole project
spring run src/main/groovy/**/*.groovy

# Or simpler
spring run src/main/groovy/Application.groovy
```

### Project Creation Wizard

```bash
# Interactive project creation
spring project create --name demo-project

# This guides you through:
# 1. Project name
# 2. Build tool (Maven/Gradle)
# 3. Language (Java/Kotlin/Groovy)
# 4. Spring Boot version
# 5. Dependencies to include

# Result: Complete Maven/Gradle project
cd demo-project
mvn spring-boot:run
```

---

## Running Groovy Scripts

### Groovy Advantages in Spring Boot CLI

Groovy is perfect for quick scripts because:

- **No main() method needed** - CLI provides it
- **No compilation** - Interpreted on the fly
- **Automatic imports** - Common Spring classes imported
- **Concise syntax** - Less boilerplate than Java

### Web Application Script

```groovy
// Complete web app in one file!

@RestController
class BookController {

    private List<String> books = [
        "Spring in Action",
        "Effective Java",
        "Clean Code"
    ]

    @GetMapping("/books")
    List<String> list() {
        books
    }

    @PostMapping("/books")
    void addBook(@RequestBody String title) {
        books << title
    }

    @DeleteMapping("/books/{id}")
    void deleteBook(@PathVariable int id) {
        if (id >= 0 && id < books.size()) {
            books.remove(id)
        }
    }
}

// Automatically started as Spring Boot app!
```

### CLI Auto-Configuration

When you run a Groovy script, Spring Boot CLI automatically:

```groovy
// These imports happen automatically:
// import org.springframework.boot.autoconfigure.EnableAutoConfiguration
// import org.springframework.context.annotation.Configuration
// import org.springframework.web.bind.annotation.*
// import org.springframework.beans.factory.annotation.*
// import groovy.transform.*

// This class is auto-generated:
@EnableAutoConfiguration
@Configuration
class GroovyApplication {

    // Your controllers and beans are added here
    // Application is auto-started
}
```

### Database Script

```groovy
// Spring Data repositories work automatically!

@Entity
class User {
    @Id
    @GeneratedValue
    Long id
    String name
    String email
}

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email)
    List<User> findByNameLike(String pattern)
}

@RestController
@RequestMapping("/api/users")
class UserApi {

    @Autowired
    UserRepository repo

    @GetMapping
    List<User> list() {
        repo.findAll()
    }

    @PostMapping
    User create(@RequestBody User user) {
        repo.save(user)
    }
}

// Run with:
// spring run app.groovy -- --spring.h2.console.enabled=true
// Access H2 console: http://localhost:8080/h2-console
```

### Scheduled Tasks Script

```groovy
@EnableScheduling
class ScheduledTasks {

    private AtomicInteger counter = new AtomicInteger(0)

    @Scheduled(fixedRate = 5000)
    void printHello() {
        println "Hello ${LocalTime.now()} - Count: ${counter.incrementAndGet()}"
    }

    @Scheduled(cron = "0 0 * * * *")  // Every hour
    void hourlyTask() {
        println "Running hourly task at ${LocalDateTime.now()}"
    }

    @GetMapping("/count")
    int getCount() {
        counter.get()
    }
}
```

---

## Advanced Features

### External Configuration

```bash
# application.yml
spring:
  application:
    name: my-app
  jpa:
    hibernate:
      ddl-auto: create-drop

# Run with profile
spring run app.groovy --spring.profiles.active=dev

# Or environment variable
export SPRING_PROFILES_ACTIVE=dev
spring run app.groovy

# Pass properties
spring run app.groovy -- --server.port=9000 --logging.level.root=DEBUG
```

### Dependency Management

```groovy
// @Grab automatically downloads dependencies!

@Grab('org.springframework.boot:spring-boot-starter-web')
@Grab('org.springframework.boot:spring-boot-starter-data-jpa')
@Grab('com.h2database:h2')

@RestController
class HelloController {

    @GetMapping
    String hello() {
        "Dependencies auto-downloaded and available!"
    }
}

// Common dependencies automatically included:
// spring-boot-starter-web
// spring-boot-starter-logging
// junit, mockito, assertj (for testing)
```

### Properties File Integration

```properties
# app.properties
app.name=My Spring App
app.version=1.0.0
app.feature.enabled=true
server.port=8080
logging.level.com.example=DEBUG
```

```groovy
// app.groovy

@Configuration
@ConfigurationProperties(prefix = "app")
class AppProperties {
    String name
    String version
    Feature feature = new Feature()

    static class Feature {
        boolean enabled
    }
}

@RestController
class AppController {

    @Autowired
    AppProperties props

    @GetMapping("/info")
    Map getInfo() {
        [
            name: props.name,
            version: props.version,
            feature: props.feature.enabled
        ]
    }
}

// Run with config file
spring run app.groovy --spring.config.location=app.properties
```

### Testing from CLI

```bash
# Test a Groovy script
spring test app_test.groovy

# Or using JUnit with Spring Test
```

```groovy
// app_test.groovy

@SpringBootTest
class ApplicationTests {

    @Autowired
    TestRestTemplate restTemplate

    @Test
    void testHelloEndpoint() {
        String body = restTemplate.getForObject("/", String)
        assert body == "Hello!"
    }
}
```

---

## Best Practices

### ✅ DO: Use CLI for Quick Prototyping

```bash
# Perfect for:
spring run prototype.groovy --watch

# Experiment with Spring features
# Test ideas quickly
# Demonstrate concepts
# Get feedback fast
```

### ❌ DON'T: Use CLI for Production Apps

```bash
# ❌ Not suitable for:
# - Large applications
# - Team development
# - Complex builds
# - Proper testing framework
# - CI/CD integration

# ✅ Use Maven/Gradle instead
```

### ✅ DO: Version Your CLI Scripts

```bash
# v1
spring run app.groovy

# v1.1 - small changes
spring run app.groovy

# v2 - major changes
spring run app_v2.groovy

# Keep old scripts for reference
```

### ✅ DO: Organize Multi-File Projects

```
my-project/
├── application.groovy          # Main entry point
├── controllers/
│   ├── UserController.groovy
│   └── BookController.groovy
├── services/
│   ├── UserService.groovy
│   └── BookService.groovy
├── entities/
│   ├── User.groovy
│   └── Book.groovy
├── application.properties      # Configuration
└── README.md
```

### ✅ DO: Document Your Scripts

```groovy
/**
 * Book Management API
 *
 * Endpoints:
 * GET /api/books - List all books
 * POST /api/books - Create book
 * GET /api/books/{id} - Get book by ID
 * DELETE /api/books/{id} - Delete book
 *
 * Run: spring run app.groovy --watch
 *
 * Dependencies:
 * - H2 Database (in-memory)
 * - Spring Data JPA
 */

@RestController
@RequestMapping("/api/books")
class BookController {
    // ...
}
```

---

## Practice Questions

### Question 1: When Should You Use Spring Boot CLI?

**Q**: When is CLI better than Maven/Gradle?

**A**: Use CLI when:

- Prototyping features quickly
- Teaching/demonstrating concepts
- Writing quick scripts
- Single-file applications
- Fast feedback loops

Use Maven/Gradle when:

- Production applications
- Complex builds
- Team development
- Enterprise requirements

### Question 2: Do You Need to Install Anything for Groovy Scripts?

**Q**: If I have Spring Boot CLI installed, do I need to install Groovy?

**A**: No - Spring Boot CLI includes Groovy. Just run `spring run script.groovy` and it works automatically.

### Question 3: Can You Deploy CLI-Generated Apps to Production?

**Q**: Is a CLI app suitable for production deployment?

**A**: Not directly, but you can:

1. Use CLI to prototype
2. Convert to proper Maven/Gradle project
3. Build and deploy as jar

```bash
# Prototype
spring run app.groovy --watch

# Once stable:
spring project create --build maven --name production-app
# Copy logic from CLI version
# Deploy with Maven

# Not recommended: deploying CLI-generated app directly
```

---

## Key Takeaways

1. **Spring Boot CLI is for fast prototyping** - not production
2. **No main() method needed** - CLI provides it
3. **Groovy syntax is concise** - less boilerplate than Java
4. **Auto-configuration of dependencies** - @Grab downloads them
5. **File watching for development** - Auto-reload on changes
6. **Perfect for learning** - Experiment with Spring quickly
7. **Easy migration to Maven** - Convert prototype to project
8. **Single-file applications** - Entire app in one Groovy file
9. **Properties configuration** - application.properties support
10. **Great for demonstrations** - Show Spring concepts without IDE setup
