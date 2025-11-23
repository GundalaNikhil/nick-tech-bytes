# Tutorial 20: Non-Web Applications 🖥️

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Solution Approach](#solution-approach)
3. [Complete Implementation](#complete-implementation)
4. [Important Considerations](#important-considerations)
5. [Practice Questions](#practice-questions)

---

## 1. Understanding the Question ❓

### What are we trying to achieve?

- **What are Non-Web Applications?** - Spring Boot apps without HTTP servers (CLI, batch, background services)
- **Why?** - Background jobs, data processing, CLI tools benefit from Spring's DI and autoconfiguration
- **When?** - Batch processing, ETL, scheduled jobs, CLI utilities
- **How?** - Use ApplicationRunner or CommandLineRunner instead of web starters
- **Best practices** - Use proper exit codes, handle signals, log appropriately

### The Problem It Solves

**Without Spring Boot (CLI tool):**

```java
// Manual setup, no dependency injection, hard to test
public class DataProcessingTool {

    public static void main(String[] args) {
        // Manual initialization
        DatabaseConnection db = new DatabaseConnection();
        EmailService email = new EmailService(db);
        DataProcessor processor = new DataProcessor(db, email);

        try {
            processor.processData(args[0]);
        } catch (Exception e) {
            System.err.println("Error: " + e);
            System.exit(1);
        } finally {
            db.close();
        }
    }
}
```

**With Spring Boot (Same tool, much cleaner):**

```java
@SpringBootApplication
public class DataProcessingTool {

    public static void main(String[] args) {
        SpringApplication.run(DataProcessingTool.class, args);
    }
}

@Component
@RequiredArgsConstructor
public class DataProcessor implements CommandLineRunner {

    private final DatabaseService db;
    private final EmailService email;

    @Override
    public void run(String... args) throws Exception {
        // DI, configuration, error handling automatic
        processData(args[0]);
    }
}
```

---

## 2. Solution Approach 🎯

### Definition

**Non-Web Applications** in Spring Boot are standalone applications that don't expose HTTP endpoints, instead executing business logic on startup and then exiting.

### Application Types

```
Web Application     Non-Web Application
────────────────   ──────────────────
Runs indefinitely  Runs to completion
Listens for HTTP   Processes and exits
REST endpoints     One-time tasks
Server running     CLI tools
```

---

## 3. Complete Implementation 💻

### Example 1: CommandLineRunner for CLI Application

**pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>data-processor</artifactId>
    <version>1.0.0</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>

    <dependencies>
        <!-- Spring Core only - NO web starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <!-- Database access -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!-- Utilities -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>
</project>
```

**Main Application Class**

```java
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class DataProcessorApplication {

    public static void main(String[] args) {
        // Run as non-web application
        SpringApplication app = new SpringApplication(DataProcessorApplication.class);

        // Disable web server for non-web apps
        app.setWebApplicationType(WebApplicationType.NONE);

        // Run and get context for graceful shutdown
        ConfigurableApplicationContext context = app.run(args);

        // Application runs CommandLineRunner, then exits
        // Context closes automatically
    }
}
```

**CommandLineRunner Implementation**

```java
package com.example.runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * CommandLineRunner: Run when application starts
 * Useful for one-time initialization or startup jobs
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataMigrationRunner implements CommandLineRunner {

    private final DataService dataService;
    private final DatabaseService dbService;

    @Override
    public void run(String... args) throws Exception {
        log.info("Starting data migration with args: {}", Arrays.toString(args));

        try {
            // Process command line arguments
            String sourceFile = args.length > 0 ? args[0] : "data.csv";
            String targetTable = args.length > 1 ? args[1] : "users";

            log.info("Migrating from {} to {}", sourceFile, targetTable);

            // Execute business logic
            long migratedCount = dataService.migrateData(sourceFile, targetTable);

            log.info("Successfully migrated {} records", migratedCount);
            System.out.println("Migration completed: " + migratedCount + " records");

        } catch (Exception e) {
            log.error("Data migration failed", e);
            System.err.println("Error: " + e.getMessage());
            throw e;  // Will exit with code 1
        }
    }
}
```

**CLI Services**

```java
package com.example.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.BufferedReader;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class DataService {

    private final UserRepository userRepository;

    @Transactional
    public long migrateData(String csvFile, String targetTable) throws IOException {
        long count = 0;

        try (BufferedReader reader = Files.newBufferedReader(Paths.get(csvFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) continue;

                User user = parseUserFromCsv(line);
                userRepository.save(user);
                count++;

                if (count % 100 == 0) {
                    System.out.print(".");
                }
            }
        }

        return count;
    }

    private User parseUserFromCsv(String line) {
        String[] fields = line.split(",");
        return new User(fields[0], fields[1], fields[2]);
    }
}
```

---

### Example 2: ApplicationRunner with Exit Code Control

**ApplicationRunner Implementation**

```java
package com.example.runner;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.boot.ExitCodeGenerator;
import lombok.extern.slf4j.Slf4j;

/**
 * ApplicationRunner: Similar to CommandLineRunner but with AccessDirect args
 * More flexible argument handling
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class BackupRunner implements ApplicationRunner {

    private final BackupService backupService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Starting backup process");

        // Access command line arguments
        List<String> files = args.getOptionValues("file");
        String destination = args.getOptionValue("dest");

        try {
            int backupCount = backupService.backupFiles(files, destination);
            log.info("Backup completed: {} files backed up", backupCount);

        } catch (BackupException e) {
            log.error("Backup failed", e);
            // Return error exit code
            System.exit(1);
        }
    }
}

// Custom exit code
@Component
public class CustomExitCodeGenerator implements ExitCodeGenerator {

    @Override
    public int getExitCode() {
        // Return non-zero for errors
        return 0;  // Success
    }
}
```

---

### Example 3: Batch Processing Application

**Batch Job Runner**

```java
package com.example.runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Large-scale batch processing with progress tracking
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ReportGeneratorRunner implements CommandLineRunner {

    private final ReportService reportService;

    @Override
    public void run(String... args) throws Exception {
        String reportType = args.length > 0 ? args[0] : "daily";
        int startDate = args.length > 1 ? Integer.parseInt(args[1]) : 0;

        log.info("Generating {} report from date {}", reportType, startDate);

        long startTime = System.currentTimeMillis();

        try {
            ReportMetrics metrics = reportService.generateReport(reportType, startDate);

            long duration = System.currentTimeMillis() - startTime;
            log.info("Report generation completed in {} ms", duration);
            log.info("Processed: {} records, Generated: {} pages",
                     metrics.getRecordsProcessed(), metrics.getPagesGenerated());

            // Print summary to stdout
            System.out.println("Report: " + metrics.getFileName());
            System.out.println("Records: " + metrics.getRecordsProcessed());
            System.out.println("Duration: " + duration + "ms");

        } catch (Exception e) {
            log.error("Report generation failed", e);
            System.err.println("FAILED: " + e.getMessage());
            throw e;  // Exit with error code
        }
    }
}

// Metrics class for tracking progress
@Data
@NoArgsConstructor
public class ReportMetrics {
    private String fileName;
    private long recordsProcessed;
    private int pagesGenerated;
    private LocalDateTime generatedAt;
}
```

---

### Example 4: Signal Handling and Graceful Shutdown

**Graceful Shutdown Handler**

```java
package com.example.config;

import org.springframework.context.annotation.Configuration;
import lombok.extern.slf4j.Slf4j;

/**
 * Handle SIGTERM and SIGINT for graceful shutdown
 */
@Slf4j
@Configuration
public class ShutdownConfig {

    @Bean
    public GracefulShutdownHandler gracefulShutdownHandler() {
        return new GracefulShutdownHandler();
    }
}

@Slf4j
class GracefulShutdownHandler {

    public GracefulShutdownHandler() {
        // Handle SIGTERM (kill -TERM)
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            log.info("Shutdown signal received, cleaning up...");
            cleanupResources();
        }));
    }

    private void cleanupResources() {
        log.info("Closing database connections...");
        log.info("Saving state...");
        log.info("Application shutting down gracefully");
    }
}
```

**Using try-with-resources**

```java
@Component
public class ResourceCleanupRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Automatic resource cleanup
        try (Connection db = openDatabase();
             Reader dataFile = new FileReader("data.txt")) {

            processData(db, dataFile);

        } catch (Exception e) {
            log.error("Processing failed", e);
            throw e;
        }
        // Resources automatically closed here
    }
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Disable Web Server for Non-Web Apps

```java
✅ DO: Explicitly disable web server
SpringApplication app = new SpringApplication(MyApp.class);
app.setWebApplicationType(WebApplicationType.NONE);

❌ DON'T: Include spring-boot-starter-web
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
// Starts Tomcat unnecessarily!

📝 WHY: Saves startup time, memory, avoids port conflicts
```

#### 2. Use Exit Codes for Scripting

```java
✅ DO: Exit with proper codes
try {
    doWork();
    System.exit(0);  // Success
} catch (Exception e) {
    logger.error("Failed", e);
    System.exit(1);  // Error
}

❌ DON'T: Throw exception from main
// Hard to script and detect failures

📝 WHY: Scripts can check exit codes: if [ $? -eq 0 ]
```

#### 3. Log Appropriately for Batch Jobs

```java
✅ DO: Log start, progress, completion
log.info("Job started at {} with args {}", now, args);
log.info("Processed {} records", count);
log.info("Job completed successfully in {} ms", duration);

❌ DON'T: Silent execution
// No visibility into job progress

📝 WHY: Monitoring scripts need status information
```

---

### Common Pitfalls

#### Pitfall 1: Forgetting to Handle Exceptions

**Problem:**

```java
@Override
public void run(String... args) throws Exception {
    // Unhandled exception kills application silently
    database.connect();  // May fail
    processData();
}
```

**Solution:**

```java
@Override
public void run(String... args) throws Exception {
    try {
        database.connect();
        processData();
        log.info("Processing completed successfully");
    } catch (Exception e) {
        log.error("Processing failed", e);
        throw e;  // Exit with code 1
    }
}
```

**Explanation:**
Always catch and log exceptions in runners. Throw to exit with error code.

---

#### Pitfall 2: Memory Issues with Large Batches

**Problem:**

```java
// Loading 1 million records into memory!
List<User> allUsers = userRepository.findAll();
for (User user : allUsers) {
    processUser(user);  // Memory overflow!
}
```

**Solution:**

```java
// Process in batches
int pageSize = 1000;
int page = 0;
while (true) {
    Page<User> batch = userRepository.findAll(PageRequest.of(page, pageSize));
    if (batch.isEmpty()) break;

    batch.getContent().forEach(this::processUser);
    page++;
}
// Only pageSize records in memory at a time
```

**Explanation:**
Use pagination or iteration for large datasets to avoid OutOfMemoryError.

---

## 8. Practice Questions 📝

**Question 1: Difference between Web and Non-Web apps**

```
Q: When would you use non-web Spring Boot?

A: Non-Web when:
   - One-time batch processing
   - Data import/export
   - Report generation
   - CLI utilities
   - Background jobs

Don't use web starter, disable web server:
app.setWebApplicationType(WebApplicationType.NONE);
```

**Question 2: CommandLineRunner vs ApplicationRunner**

```
Q: Which should you use?

A: CommandLineRunner:
   - Simple: Receives args as String array
   - Use for: Most cases

ApplicationRunner:
   - Advanced: Typed argument access
   - Use for: Complex command parsing

Both run once at startup
```

**Question 3: Exit codes for scripting**

```
Q: How do scripts know if job succeeded?

A:
try {
    doWork();
    System.exit(0);  // Success - script can detect
} catch (Exception e) {
    log.error("Failed", e);
    System.exit(1);  // Failure - script gets non-zero
}

Bash: if [ $? -eq 0 ]; then ...
```

---

## 🎯 Key Takeaways

1. ✅ **Non-web apps for batch processing** - One-time execution jobs
2. ✅ **Disable web server** - Saves memory, faster startup
3. ✅ **Use CommandLineRunner** - Runs at startup
4. ✅ **Handle exceptions properly** - Exit with codes
5. ✅ **Log progress** - Visibility for monitoring
6. ✅ **Batch process large datasets** - Avoid OutOfMemoryError

---

## Changelog

- **2025-11-23**: Initial creation with batch and graceful shutdown examples
- **Added**: Exit code and signal handling patterns

**Congratulations! You now master Non-Web Applications! 🎉**
