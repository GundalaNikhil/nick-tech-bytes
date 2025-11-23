# Tutorial 27: DevTools 🔧

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

- **What is Spring Boot DevTools?** - Development-time features for faster development and better debugging experience
- **Why does it exist?** - Eliminates slow restart cycles and provides live reload, configuration file watching, and enhanced debugging
- **When to use it?** - During development only, automatically excluded from production builds
- **How does it work?** - Uses two classloaders to enable fast restart without full JVM restart
- **What are best practices?** - Configure properly, understand restart vs reload, use IDE integration

### The Problem It Solves

**Before DevTools:**

```
Traditional Development Cycle:
───────────────────────────────
1. Code change
   │
2. Stop running application
   │ (5-10 seconds)
   │
3. Recompile code
   │ (3-5 seconds)
   │
4. Start application
   │ (10-30 seconds depending on dependencies)
   │
5. Navigate to same page/endpoint
   │ (2-5 seconds)
   │
6. Test change

Total time per iteration: 25-60 seconds 😞
```

**With DevTools:**

```
DevTools Development Cycle:
─────────────────────────
1. Code change (IDE auto-saves)
   │
2. DevTools triggers application restart
   │ (1-3 seconds - only restarts application context)
   │
3. Browser auto-reloads (if LiveReload enabled)
   │ (< 1 second)
   │
4. Test change

Total time per iteration: 1-4 seconds! 🚀
```

### Real-World Context

Professional developers rely on DevTools for efficient local development. Spring framework itself recommends DevTools for all development scenarios.

---

## 2. Solution Approach 🎯

### Definition

**Spring Boot DevTools** is a set of development tools that provides fast application restarts, live reloads, and configurations for enhanced development experience. It uses a clever dual classloader system to restart only the application context, not the entire JVM.

### Core Features

1. **Fast Restart**: Only application classloader restarts, not JVM
2. **Live Reload**: Browsers auto-refresh when resources change
3. **Configurations for Development**: Disables caches, enables debug logging
4. **Global Settings**: ~/.spring-boot-devtools.properties
5. **Remote Debugging**: Enhanced remote development capabilities

### Plan of Action

```
Step 1: Add Spring Boot DevTools dependency
Step 2: Configure IDE to auto-compile on save
Step 3: Enable LiveReload in browser
Step 4: Customize DevTools properties
Step 5: Test fast restart functionality
Step 6: Configure global settings
Step 7: Set up for remote development (if needed)
```

---

## 3. Prerequisites & Requirements 📦

### Software Requirements

| Component   | Purpose                   |
| ----------- | ------------------------- |
| Spring Boot | 3.x with DevTools starter |
| IDE         | IntelliJ, VS Code, STS    |
| Browser     | With LiveReload extension |
| Java 17+    | JDK development tools     |

### Knowledge Requirements

- ✅ **Required**: Spring Boot basics
- ⚠️ **Helpful**: Understanding of classloaders

### Project Setup

```bash
# Add to pom.xml:
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>

# IntelliJ Settings:
# Settings > Build, Execution, Deployment > Compiler
# ✓ Build project automatically
# ✓ Compile independent modules in parallel
```

---

## 4. Complete Implementation 💻

### Example 1: Basic DevTools Setup and Configuration

**pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>devtools-demo</artifactId>
    <version>1.0.0</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot DevTools - enables fast restart and live reload -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>  <!-- Don't include in final JAR -->
        </dependency>

        <!-- Optional: LiveReload server for browser auto-refresh -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
        </dependency>
    </dependencies>
</project>
```

**application.properties**

```properties
# DevTools Configuration

# Enable restart functionality (enabled by default)
spring.devtools.restart.enabled=true

# Directories to watch for changes
spring.devtools.restart.additional-paths=src/main/webapp

# Exclude certain paths from triggering restart
spring.devtools.restart.exclude=static/**,public/**

# Exclude patterns (use regex)
spring.devtools.restart.poll-interval=1s        # Check interval for file changes
spring.devtools.restart.quiet-period=400ms      # Wait time before restart

# LiveReload configuration
spring.devtools.livereload.enabled=true
spring.devtools.livereload.port=35729            # Standard LiveReload port

# Development profile settings
spring.h2.console.enabled=true                   # Enable H2 console for testing
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true
spring.jpa.show-sql=true

# Thymeleaf caching disabled for development
spring.thymeleaf.cache=false

# Freemarker cache disabled
spring.freemarker.cache=false
```

**application-dev.properties** (For development profile)

```properties
# Development-specific settings

# Database (use local H2)
spring.datasource.url=jdbc:h2:mem:devdb
spring.datasource.driverClassName=org.h2.Driver
spring.h2.console.enabled=true

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create-drop  # Recreate on startup
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logging - verbose for development
logging.level.root=INFO
logging.level.com.example=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# Security - relaxed for development
spring.security.user.name=dev
spring.security.user.password=dev
```

**Global DevTools Configuration (~/.spring-boot-devtools.properties)**

```properties
# Applied to all Spring Boot projects on this machine
# Create at: ~/.spring-boot-devtools.properties

spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true

# Restart config - exclude common non-critical paths
spring.devtools.restart.exclude=static/**,public/**,META-INF/maven/**
```

**Controller with Fast Restart Benefits**

```java
package com.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

/**
 * Example controller demonstrating DevTools benefits
 * Make changes to method logic and see them instantly!
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/hello")
    public String hello() {
        log.info("Hello endpoint called");
        // Change this message, save, and see it instantly without full restart!
        return "Hello from DevTools! Current time: " + System.currentTimeMillis();
    }

    @GetMapping("/data")
    public Data getData() {
        // Modify the Data class and DevTools will restart automatically
        return new Data("DevTools enabled", 42, true);
    }

    record Data(String message, int count, boolean enabled) {}
}
```

**IDE Configuration - IntelliJ IDEA**

```
Setup for instant auto-restart:

1. Enable Auto-Build:
   Settings > Build, Execution, Deployment > Compiler
   ✓ Build project automatically
   ✓ Compile independent modules in parallel

2. Enable Update in Running App:
   Settings > Advanced Settings
   ✓ Allow auto-make for changed files even if they were saved automatically

3. Run Configuration:
   Edit Configurations > Application
   ✓ On Update action: Update classes and resources
   ✓ On Frame Deactivation: Update classes and resources

Result: Code changes trigger restart within 1-2 seconds!
```

---

### Example 2: Custom Restart Configuration

```java
package com.example.config;

import org.springframework.boot.devtools.filewatch.FileSystemWatcher;
import org.springframework.boot.devtools.restart.RestartScope;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import lombok.extern.slf4j.Slf4j;

/**
 * Custom DevTools configuration for advanced restart control
 */
@Slf4j
@Configuration
@Profile("dev")  // Only in development
public class DevToolsConfig {

    /**
     * Using @RestartScope annotation for beans that should persist across restarts
     * Useful for connections, caches, etc. that shouldn't be reset
     */
}

// Example of @RestartScope bean
@RestartScope
@Component
public class DevelopmentCache {

    private Map<String, Object> cache = new ConcurrentHashMap<>();

    /**
     * This bean persists across DevTools restarts
     * Useful for expensive resources that shouldn't be recreated
     */
    public void put(String key, Object value) {
        cache.put(key, value);
        log.info("Cache persists across restarts: {}", key);
    }
}
```

---

### Example 3: LiveReload Browser Setup

```html
<!-- For manual LiveReload in HTML -->
<!-- Add this script to your HTML templates -->

<script>
  document.write(
    '<script src="http://' +
      (location.host || "localhost").split(":")[0] +
      ':35729/livereload.js?snip=1"></' +
      "script>"
  );
</script>

<!-- Or use LiveReload extension from browser store:
     - Chrome: LiveReload extension
     - Firefox: Simple LiveReload extension
     - Safari: LiveReload extension
     
     Then click the extension button to enable for current tab
-->
```

**Thymeleaf Template with LiveReload Benefits**

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
  <head>
    <title>DevTools Demo</title>
    <!-- Change CSS/HTML and see instant update in browser! -->
    <style>
      body {
        font-family: Arial;
        margin: 20px;
      }
      .message {
        color: blue;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div class="message" th:text="${message}">
      Change this message in controller and reload updates automatically!
    </div>

    <!-- With LiveReload, no manual refresh needed! -->
  </body>
</html>
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Never Include DevTools in Production

```xml
✅ DO: Mark DevTools as optional
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>  <!-- Won't be transitively included -->
</dependency>

❌ DON'T: Use scope=compile or omit optional
<!-- This might include it in production builds! -->

📝 WHY: DevTools adds overhead and changes behavior (disables caches, etc.)
```

#### 2. Configure IDE Auto-Compile

```
✅ DO: Enable auto-compile in IDE for DevTools to work
IntelliJ: Settings > Compiler > Build project automatically

❌ DON'T: Rely on manual compilation
DevTools needs file changes to detect, manual compile defeats purpose

📝 WHY: Auto-compile + DevTools = true fast restart (1-2 seconds)
```

#### 3. Use Appropriate Restart Triggers

```properties
✅ DO: Exclude static files and templates from restart triggers
spring.devtools.restart.exclude=static/**,public/**

❌ DON'T: Let every file change trigger restart
# CSS changes shouldn't restart application, waste of time

📝 WHY: CSS, JS, HTML changes are LiveReload only, not full restart
```

---

### Common Pitfalls

#### Pitfall 1: DevTools Not Working - File Changes Ignored

**Problem:**

```
You change code, but nothing happens. DevTools not detecting changes.
```

**Solution:**

```
1. Ensure auto-compile is enabled:
   IntelliJ: Settings > Compiler > "Build project automatically"

2. Check application is running in development mode:
   maven: mvn spring-boot:run
   gradle: ./gradlew bootRun

3. Verify DevTools is in classpath:
   - Check pom.xml/build.gradle has dependency
   - IDE shows DevTools in project libraries

4. Check excluded paths aren't too broad:
   spring.devtools.restart.exclude=static/**,public/**
```

**Explanation:**
DevTools watches files for changes. If auto-compile is off, files aren't updated. If running from JAR or excluded paths, changes won't trigger restart.

---

#### Pitfall 2: Changes Restart Application But Don't Take Effect

**Problem:**

```
Application restarts but your code changes don't appear.
Still seeing old behavior.
```

**Solution:**

```
1. Check if change affected:
   - Class definitions? (needs restart)
   - Method logic? (needs restart)
   - Properties? (may need restart)

2. Wait for restart to complete:
   - Watch console for: "Spring Boot Application started"
   - Don't test until restart is done

3. Hard refresh browser (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
   - Browser cache might serve old resources

4. Check Spring DevTools is actually triggered:
   - Look for "Restarting Spring Application Context" message
   - If not present, file watch not working
```

**Explanation:**
Sometimes changes require a full context restart, or browser cache serves old content. Hard refresh ensures fresh resources.

---

### Performance Considerations

```properties
# DevTools can impact performance - tune if needed

# Reduce restart time by excluding unnecessary watchers
spring.devtools.restart.exclude=\
    static/**,\
    public/**,\
    templates/**,\
    META-INF/maven/**

# Increase file watch poll interval if too frequent
spring.devtools.restart.poll-interval=2s

# Increase quiet period to batch multiple changes
spring.devtools.restart.quiet-period=800ms

# These settings trade responsiveness for less frequent restarts
```

**Performance Comparison:**

| Configuration | Restart Time | Response |
| ------------- | ------------ | -------- |
| Default       | 2-3 seconds  | Frequent |
| Optimized     | 1-2 seconds  | Balanced |
| Aggressive    | 5-10 seconds | Rare     |

---

## 7. Visual Representations 📊

### Diagram 1: DevTools Dual Classloader Architecture

```
┌─────────────────────────────────────────────────────┐
│              JVM (Running)                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  Base Classloader (Restart Classloader)      │  │
│  │  - Spring Framework                          │  │
│  │  - Third-party libraries                     │  │
│  │  - Reused across restarts                    │  │
│  └────────────────┬─────────────────────────────┘  │
│                   │                                 │
│                   ▼                                 │
│  ┌──────────────────────────────────────────────┐  │
│  │  Application Classloader (App Classloader)   │  │
│  │  - YOUR code                                 │  │
│  │  - Application beans                         │  │
│  │  - Reloaded on change                        │  │
│  └────────────────┬─────────────────────────────┘  │
│                   │                                 │
│          File Change Detected                       │
│                   │                                 │
│                   ▼                                 │
│  Old App Classloader ─────→ Discarded              │
│                   │                                 │
│                   ▼                                 │
│  New App Classloader ────→ Loaded (1-2 seconds)   │
│                   │                                 │
│                   ▼                                 │
│  Base Classloader ────────→ REUSED (saves time!)   │
│                                                     │
└─────────────────────────────────────────────────────┘

Why it's fast: JVM and base libraries stay in memory.
              Only application code is reloaded.
              No JVM shutdown/startup overhead!
```

### Diagram 2: Development Workflow with DevTools

```
┌──────────────────────────────────────────────────────┐
│  IDE (Auto-save + Auto-compile enabled)             │
├──────────────────────────────────────────────────────┤
│                                                      │
│  1. Edit Java Code or Properties                    │
│     └─→ IDE auto-saves                              │
│         └─→ IDE auto-compiles                       │
│            └─→ .class files updated                 │
│               └─→ DevTools detects change           │
│                                                      │
│  2. DevTools File Watcher Triggered                │
│     └─→ Stops old app context                       │
│         └─→ Reloads app classloader                 │
│             └─→ Starts new app context              │
│                └─→ Application ready (< 3 seconds)  │
│                                                      │
│  3. Browser Auto-Refresh (if LiveReload)           │
│     └─→ Browser connects to LiveReload server      │
│         └─→ New resources detected                  │
│             └─→ Automatic page reload               │
│                └─→ See changes instantly!           │
│                                                      │
│  Total iteration time: 1-4 seconds 🚀              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 8. Practice Questions 📝

### Beginner Level

**Question 1: What is Spring Boot DevTools?**

```
Q: Explain DevTools and its main benefit

A: Spring Boot DevTools provides development-time features:
   1. Fast Restart - Restarts app context (not JVM) in 1-2 seconds
   2. Live Reload - Auto-refreshes browser when resources change
   3. Dev Configuration - Disables caches, enables debug logging

   Benefit: From 30-60 second restart cycle to 1-4 seconds per change!

   Use ONLY in development (scope=runtime, optional=true)
```

**Question 2: How do you enable DevTools in a Spring Boot project?**

```
Q: Add DevTools to your project

A: In pom.xml:
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-devtools</artifactId>
       <scope>runtime</scope>
       <optional>true</optional>
   </dependency>

   Then enable auto-compile in your IDE!
```

**Question 3: What triggers a DevTools restart?**

```
Q: Which file changes trigger automatic restart?

A: By default, restarts are triggered by changes to:
   - Java source files (.java)
   - Properties files (.properties, .yml)
   - Configuration files

   Excluded by default:
   - Static files (CSS, JS)
   - Templates (HTML)
   - Resources in /static, /public

   These use LiveReload instead (no restart needed)
```

---

### Intermediate Level

**Question 4: Configure DevTools to exclude custom paths**

```
Q: You want changes to API endpoints to restart,
   but not static CSS changes

A: In application.properties:
   spring.devtools.restart.enabled=true
   spring.devtools.restart.exclude=static/**,public/**

   This restarts for code/property changes,
   but CSS/JS changes trigger LiveReload only (faster)
```

**Question 5: Set up IDE for optimal DevTools performance**

```
Q: How do you configure IntelliJ for fastest restarts?

A: IntelliJ Settings:

   1. Build, Execution, Deployment > Compiler:
      ✓ Build project automatically
      ✓ Compile independent modules in parallel

   2. Advanced Settings:
      ✓ Allow auto-make for changed files even if saved automatically

   3. Run Configuration > Application:
      - On Update action: Update classes and resources
      - On Frame Deactivation: Update classes and resources

   Result: Changes auto-restart app within 1-2 seconds!
```

**Question 6: What is @RestartScope?**

```
Q: When would you use @RestartScope annotation?

A: @RestartScope keeps beans persistent across DevTools restarts:

@RestartScope
@Component
public class PersistentCache {
    private Map<String, Object> cache = new ConcurrentHashMap<>();
}

Use for:
- Expensive connections (don't recreate)
- Session caches (survive restart)
- Long-lived resources

Avoids re-initialization on every change!
```

---

### Advanced Level

**Question 7: Diagnose DevTools not detecting changes**

```
Q: Changes aren't triggering restarts. How do you debug?

A: Checklist:
   1. Verify dependency included:
      - pom.xml has spring-boot-devtools
      - IDE shows it in libraries

   2. Check auto-compile enabled:
      - IntelliJ: Compiler > Build project automatically
      - VS Code: Save triggers compile

   3. Verify running correctly:
      - Console shows "DevTools..." message
      - Not running from compiled JAR

   4. Check file watched:
      - Add logging: spring.devtools.restart.poll-interval=500ms
      - Check excluded paths aren't too broad

   5. Wait for build:
      - Some IDEs need explicit rebuild
      - File must fully compile before restart
```

---

## 🎯 Key Takeaways

1. ✅ **DevTools enables fast development** - Restart app context in 1-2 seconds
2. ✅ **Dual classloader system** - Reuses JVM, reloads only app code
3. ✅ **LiveReload for static assets** - CSS/JS changes without restart
4. ✅ **IDE auto-compile required** - File changes must compile for DevTools to detect
5. ✅ **Development only** - Exclude from production with optional=true
6. ✅ **Configurable exclusions** - Skip unnecessary restart triggers

### Quick Reference

```properties
# DevTools configuration

spring.devtools.restart.enabled=true
spring.devtools.restart.exclude=static/**,public/**
spring.devtools.restart.poll-interval=1s
spring.devtools.restart.quiet-period=400ms
spring.devtools.livereload.enabled=true
spring.devtools.livereload.port=35729
```

---

## Changelog

- **2025-11-23**: Initial creation with configuration and IDE setup examples
- **Added**: Dual classloader architecture explanation
- **Added**: IDE-specific configuration for IntelliJ

**Congratulations! You now master Spring Boot DevTools! 🎉**

_Configure DevTools now and enjoy fast development cycles!_
