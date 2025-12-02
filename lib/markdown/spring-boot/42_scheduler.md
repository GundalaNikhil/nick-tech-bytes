# Tutorial 42: Scheduler ⏰

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Solution Approach](#solution-approach)
3. [Complete Implementation](#complete-implementation)
4. [Important Considerations](#important-considerations)
5. [Practice Questions](#practice-questions)

---

## 1. Understanding the Question ❓

### What are we trying to achieve?

- **What is Scheduling?** - Executing tasks at specific times or intervals
- **Why?** - Background jobs like data cleanup, report generation, notifications
- **When?** - Tasks that don't need immediate user interaction
- **How?** - @Scheduled annotation with cron or fixed intervals
- **Best practices** - Use appropriate thread pools, avoid blocking operations, monitor execution

### The Problem It Solves

**Without Scheduling:**

```java
// User-triggered cleanup on every request
@GetMapping("/users")
public List<User> getUsers() {
    deleteExpiredSessions();  // Blocks API response!
    generateDailyReports();   // More delays!
    return userRepository.findAll();
}

// API endpoint becomes slow due to background work
```

**With Scheduling:**

```java
// Background task runs automatically at midnight
@Scheduled(cron = "0 0 0 * * ?")
public void dailyCleanup() {
    deleteExpiredSessions();
    generateDailyReports();
}

// API endpoint remains fast!
@GetMapping("/users")
public List<User> getUsers() {
    return userRepository.findAll();  // Fast response
}
```

---

## 2. Solution Approach 🎯

### Definition

**Scheduling** in Spring Boot allows you to execute code at specific times or intervals using @Scheduled annotation and cron expressions.

### Scheduling Types

```
Fixed Rate      - Run every N milliseconds
Fixed Delay     - Wait N ms after previous execution completes
Cron Expression - Run at specific times (0 0 0 * * ? = daily at midnight)
```

---

## 3. Complete Implementation 💻

### Example 1: Basic Scheduling

**Configuration**

```java
package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling  // Enable @Scheduled annotations
public class SchedulingConfig {
    // Enables all @Scheduled methods
}
```

**Scheduled Tasks**

```java
package com.example.task;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ScheduledTasks {

    /**
     * Run every 5 seconds (5000 milliseconds)
     * Waits 5 seconds BETWEEN task completions
     */
    @Scheduled(fixedRate = 5000)
    public void taskWithFixedRate() {
        log.info("Task running every 5 seconds");
    }

    /**
     * Wait 5 seconds AFTER task completes before running again
     * Good for operations where you want spacing
     */
    @Scheduled(fixedDelay = 5000)
    public void taskWithFixedDelay() {
        log.info("Task waiting 5 seconds after completion");
    }

    /**
     * Run at specific time using cron expression
     * "0 0 0 * * ?" = Every day at midnight
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void dailyMidnightTask() {
        log.info("Running daily maintenance");
        cleanupExpiredData();
        generateDailyReports();
    }

    /**
     * Cron: "0 0 * * * ?" = Every hour
     * Cron: "0 */15 * * * ?" = Every 15 minutes
     * Cron: "0 0 9-17 * * MON-FRI" = 9AM-5PM weekdays
     */
    @Scheduled(cron = "0 */15 * * * ?")
    public void quarterhourlyTask() {
        log.info("Running every 15 minutes");
    }

    /**
     * Configure in application.properties instead
     * Allows changing schedule without code changes
     */
    @Scheduled(cron = "${app.schedule.cleanup-cron:0 0 * * * ?}")
    public void configurableTask() {
        log.info("Schedule from properties");
    }

    /**
     * Can have initial delay before first execution
     */
    @Scheduled(initialDelay = 5000, fixedRate = 10000)
    public void taskWithInitialDelay() {
        log.info("Runs 5 seconds after startup, then every 10 seconds");
    }
}
```

---

### Example 2: Service Layer Scheduled Tasks

```java
package com.example.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final AuditLogRepository auditRepository;

    /**
     * Run every day at 2 AM to clean up expired sessions
     * Cron: min hour day month dayOfWeek
     * 0 2 * * * = 02:00 every day
     */
    @Scheduled(cron = "0 2 * * * *")
    public void cleanupExpiredSessions() {
        int deleted = userRepository.deleteExpiredSessions();
        System.out.println("Deleted " + deleted + " expired sessions");
    }

    /**
     * Send email reminders every evening at 6 PM
     */
    @Scheduled(cron = "0 18 * * * *")
    public void sendDailyReminders() {
        List<User> inactiveUsers = userRepository.findInactive(30);
        inactiveUsers.forEach(user ->
            emailService.sendReminder(user.getEmail(), "We miss you!")
        );
    }

    /**
     * Run weekly on Monday at midnight to generate reports
     * 0 = seconds, 0 = minutes, 0 = hours, * = day, * = month, 1 = Monday
     */
    @Scheduled(cron = "0 0 0 * * 1")
    public void generateWeeklyReports() {
        List<ReportData> data = collectMetrics();
        generateReport(data);
        emailService.sendWeeklyReport(data);
    }

    /**
     * Archive old audit logs every Sunday at 3 AM
     */
    @Scheduled(cron = "0 3 0 * * 0")
    public void archiveOldLogs() {
        int archived = auditRepository.archiveLogsOlderThan(90);
        System.out.println("Archived " + archived + " log entries");
    }

    /**
     * Monitor system health every 5 minutes
     */
    @Scheduled(fixedRate = 300000)  // 300,000 ms = 5 minutes
    public void monitorSystemHealth() {
        // Check database connection
        // Check memory usage
        // Check disk space
        // Alert if issues found
    }
}
```

---

### Example 3: Thread Pool Configuration

**Configuration**

```java
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
@EnableScheduling
public class SchedulingConfig {

    /**
     * Configure custom thread pool for scheduled tasks
     * Default uses single thread (can cause delays!)
     */
    @Bean
    public ThreadPoolTaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(10);  // 10 concurrent tasks
        scheduler.setThreadNamePrefix("scheduled-task-");
        scheduler.setWaitForTasksToCompleteOnShutdown(true);
        scheduler.setAwaitTerminationSeconds(60);
        scheduler.initialize();
        return scheduler;
    }
}
```

**application.properties**

```properties
# Configure scheduled task thread pool
spring.task.scheduling.pool.size=10
spring.task.scheduling.thread-name-prefix=task-
spring.task.execution.pool.core-size=10
spring.task.execution.pool.max-size=20
spring.task.execution.pool.queue-capacity=100
```

---

### Example 4: Scheduled Task with Error Handling

```java
package com.example.task;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

@Slf4j
@Component
@RequiredArgsConstructor
public class RobustScheduledTask {

    private final NotificationService notificationService;
    private final AuditService auditService;

    /**
     * Scheduled task with comprehensive error handling
     */
    @Scheduled(fixedRate = 60000)
    public void processWithErrorHandling() {
        try {
            log.info("Starting scheduled task");

            // Main task logic
            doHeavyWork();

            log.info("Scheduled task completed successfully");
            auditService.log("Task success");

        } catch (Exception e) {
            log.error("Error in scheduled task", e);
            auditService.log("Task failed: " + e.getMessage());
            notificationService.alertOps("Scheduled task failed: " + e);
        }
    }

    /**
     * Long-running task with timeout
     */
    @Scheduled(fixedRate = 300000)
    public void longRunningTask() {
        long startTime = System.currentTimeMillis();
        long timeout = 240000;  // 4 minute timeout

        try {
            while (!isCompleted()) {
                if (System.currentTimeMillis() - startTime > timeout) {
                    log.warn("Task timeout after 4 minutes");
                    break;
                }
                processNextBatch();
            }
        } catch (Exception e) {
            log.error("Long running task failed", e);
        }
    }
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Avoid Blocking Operations

```java
✅ DO: Use async tasks for long operations
@Scheduled(fixedRate = 60000)
public void quickTask() {
    asyncService.processDataAsync();  // Returns immediately
}

❌ DON'T: Block scheduled thread
@Scheduled(fixedRate = 60000)
public void slowTask() {
    heavyDatabaseQuery();  // Blocks scheduler!
    saveAllToFile();       // More blocking!
}

📝 WHY: Blocking ties up scheduler thread, delays other tasks
```

#### 2. Use Appropriate Cron Expressions

```properties
✅ DO: Use correct cron syntax
0 0 0 * * ?          # Midnight daily
0 0 */6 * * ?        # Every 6 hours
0 9-17 * * MON-FRI   # 9AM-5PM weekdays

❌ DON'T: Use incorrect expressions
0 0 0 * *            # Missing day-of-week field
*/5 * * * * *        # Six fields (Spring uses 6)

📝 WHY: Bad cron prevents task from running
```

#### 3. Monitor Scheduled Tasks

```java
✅ DO: Log task execution and metrics
@Scheduled(fixedRate = 60000)
public void monitoredTask() {
    long start = System.nanoTime();
    try {
        doWork();
    } finally {
        long duration = (System.nanoTime() - start) / 1_000_000;
        logger.info("Task completed in {} ms", duration);
        metrics.recordTaskDuration(duration);
    }
}

❌ DON'T: Run unmonitored background tasks
// No visibility into task health

📝 WHY: Monitoring helps detect performance issues
```

---

### Common Pitfalls

#### Pitfall 1: Single Threaded Scheduler Causing Delays

**Problem:**

```java
// Two long tasks scheduled
@Scheduled(fixedRate = 60000)
public void longTask1() {
    Thread.sleep(50000);  // Takes 50 seconds
}

@Scheduled(fixedRate = 60000)
public void longTask2() {
    Thread.sleep(50000);  // Waits for longTask1!
}

// longTask2 runs after longTask1 completes (single thread)
```

**Solution:**

```java
// Configure multiple scheduler threads
@Bean
public ThreadPoolTaskScheduler taskScheduler() {
    ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
    scheduler.setPoolSize(5);  // 5 concurrent threads
    scheduler.initialize();
    return scheduler;
}

// Now both tasks run concurrently
```

**Explanation:**
Default Spring scheduler uses single thread. Configure thread pool to run tasks concurrently.

---

#### Pitfall 2: Missing Error Handling

**Problem:**

```java
@Scheduled(fixedRate = 60000)
public void taskThatMayFail() {
    // If exception occurs, task stops silently
    int x = 1 / 0;  // ArithmeticException
    // No notification that task failed!
}
```

**Solution:**

```java
@Scheduled(fixedRate = 60000)
public void safeTask() {
    try {
        int x = 1 / 0;
    } catch (Exception e) {
        logger.error("Task failed", e);
        alertService.notifyOps("Scheduled task error: " + e);
    }
}
```

**Explanation:**
Always wrap scheduled tasks in try-catch and log failures.

---

## 8. Practice Questions 📝

**Question 1: Fixed Rate vs Fixed Delay**

```
Q: What's the difference?

A: Fixed Rate (fixedRate = 5000):
   - Runs every 5 seconds regardless of execution time
   - If task takes 2s: next starts at 5s
   - Good for frequent checks (every 5 mins)

Fixed Delay (fixedDelay = 5000):
   - Waits 5 seconds AFTER completion
   - If task takes 2s: waits 5s, next starts at 7s
   - Good for rate limiting
```

**Question 2: Cron expression for business hours**

```
Q: Schedule task 9 AM - 5 PM weekdays

A: "0 * 9-17 * * MON-FRI"
   min hr hour-range day month day-of-week
   0   *  9-17      *    *     MON-FRI

Every hour from 9AM to 5PM on weekdays
```

**Question 3: Configure thread pool for 3 concurrent tasks**

```
Q: How do you ensure tasks run in parallel?

A:
@Bean
public ThreadPoolTaskScheduler taskScheduler() {
    ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
    scheduler.setPoolSize(3);  // 3 concurrent threads
    scheduler.initialize();
    return scheduler;
}

Or in properties:
spring.task.scheduling.pool.size=3
```

---

## 🎯 Key Takeaways

1. ✅ **Use @Scheduled for background tasks** - Runs independently of requests
2. ✅ **Configure thread pool** - Default single thread can cause delays
3. ✅ **Add error handling** - Always catch exceptions in scheduled tasks
4. ✅ **Use cron for time-based scheduling** - More flexible than fixed intervals
5. ✅ **Monitor task execution** - Log duration and failures
6. ✅ **Avoid blocking operations** - Don't hold up scheduler threads

---

## Changelog

- **2025-11-23**: Initial creation with cron and thread pool examples
- **Added**: Error handling and monitoring patterns

**Congratulations! You now master Scheduling! 🎉**
