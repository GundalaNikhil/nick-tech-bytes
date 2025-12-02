# Tutorial 209: Build a Complete TODO List REST API with Spring Boot 📝

## 📋 Table of Contents
1. [Understanding the Project](#understanding-the-project)
2. [Solution Architecture](#solution-architecture)
3. [Prerequisites & Tech Stack](#prerequisites--tech-stack)
4. [Project Planning](#project-planning)
5. [Complete Implementation](#complete-implementation)
6. [Testing & Validation](#testing--validation)
7. [Deployment & Production](#deployment--production)
8. [Extensions & Improvements](#extensions--improvements)

---

## 1. Understanding the Project ❓

### What We're Building

A production-ready RESTful API for managing TODO items with full CRUD operations:
- ✅ Create new TODO items
- ✅ Read/List all TODO items
- ✅ Read a single TODO item by ID
- ✅ Update existing TODO items
- ✅ Delete TODO items
- ✅ Mark TODO as complete/incomplete
- ✅ Filter and search functionality
- ✅ Pagination and sorting
- ✅ Input validation
- ✅ Error handling
- ✅ API documentation

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all TODOs (with pagination) |
| GET | /api/todos/{id} | Get TODO by ID |
| POST | /api/todos | Create new TODO |
| PUT | /api/todos/{id} | Update TODO |
| DELETE | /api/todos/{id} | Delete TODO |
| PATCH | /api/todos/{id}/complete | Mark as complete |
| GET | /api/todos/search | Search TODOs |
| GET | /api/todos/stats | Get statistics |

### Features

```
📋 TODO Management
├── Basic CRUD Operations
├── Status Management (pending/complete)
├── Priority Levels (low/medium/high)
├── Due Dates
├── Categories/Tags
└── Search and Filter

🔧 Technical Features
├── RESTful API Design
├── Input Validation
├── Exception Handling
├── Pagination & Sorting
├── Swagger Documentation
├── Unit & Integration Tests
└── H2/MySQL Support
```

---

## 2. Solution Architecture 🎯

### Layered Architecture

```
┌─────────────────────────────────────────────┐
│         Presentation Layer                  │
│         (REST Controllers)                  │
│  - TodoController                           │
│  - Global Exception Handler                 │
│  - DTOs (Data Transfer Objects)             │
└───────────────┬─────────────────────────────┘
                │
┌───────────────▼─────────────────────────────┐
│           Service Layer                     │
│          (Business Logic)                   │
│  - TodoService (Interface)                  │
│  - TodoServiceImpl                          │
│  - Validation Logic                         │
│  - Business Rules                           │
└───────────────┬─────────────────────────────┘
                │
┌───────────────▼─────────────────────────────┐
│        Repository Layer                     │
│         (Data Access)                       │
│  - TodoRepository (JPA)                     │
│  - Custom Queries                           │
└───────────────┬─────────────────────────────┘
                │
┌───────────────▼─────────────────────────────┐
│           Database                          │
│      (H2 / MySQL / PostgreSQL)              │
└─────────────────────────────────────────────┘
```

### Technology Stack

```
Backend Framework:  Spring Boot 3.2.0
Database:          H2 (dev) / MySQL (prod)
ORM:               Spring Data JPA / Hibernate
Validation:        Bean Validation (JSR-380)
Documentation:     SpringDoc OpenAPI (Swagger)
Testing:           JUnit 5, MockMvc, Testcontainers
Build Tool:        Maven
```

---

## 3. Prerequisites & Tech Stack 📦

### Required Software

```bash
# Java Development Kit
java -version  # Should be 17+

# Maven
mvn -version  # Should be 3.6+

# IDE (choose one)
# - IntelliJ IDEA (Recommended)
# - Eclipse
# - VS Code with Java extensions

# Optional: MySQL
mysql --version
```

### Project Creation

```bash
# Method 1: Spring Initializr (start.spring.io)
# Select dependencies:
# - Spring Web
# - Spring Data JPA
# - H2 Database
# - Validation
# - Lombok (optional)
# - SpringDoc OpenAPI

# Method 2: Using Spring CLI
spring init --dependencies=web,data-jpa,h2,validation,lombok todo-api

# Method 3: Maven Archetype
mvn archetype:generate -DgroupId=com.example -DartifactId=todo-api
```

---

## 4. Project Planning 📚

### Database Schema

```sql
CREATE TABLE todos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    due_date DATE,
    category VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL
);

CREATE INDEX idx_status ON todos(status);
CREATE INDEX idx_priority ON todos(priority);
CREATE INDEX idx_due_date ON todos(due_date);
CREATE INDEX idx_category ON todos(category);
```

### Project Structure

```
todo-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── todoapi/
│   │   │               ├── TodoApiApplication.java
│   │   │               ├── config/
│   │   │               │   ├── OpenApiConfig.java
│   │   │               │   └── WebConfig.java
│   │   │               ├── controller/
│   │   │               │   └── TodoController.java
│   │   │               ├── dto/
│   │   │               │   ├── TodoCreateRequest.java
│   │   │               │   ├── TodoUpdateRequest.java
│   │   │               │   ├── TodoResponse.java
│   │   │               │   └── ErrorResponse.java
│   │   │               ├── entity/
│   │   │               │   └── Todo.java
│   │   │               ├── enums/
│   │   │               │   ├── TodoStatus.java
│   │   │               │   └── TodoPriority.java
│   │   │               ├── exception/
│   │   │               │   ├── TodoNotFoundException.java
│   │   │               │   └── GlobalExceptionHandler.java
│   │   │               ├── repository/
│   │   │               │   └── TodoRepository.java
│   │   │               ├── service/
│   │   │               │   ├── TodoService.java
│   │   │               │   └── TodoServiceImpl.java
│   │   │               └── util/
│   │   │                   └── TodoMapper.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       └── data.sql
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── todoapi/
│                       ├── TodoApiApplicationTests.java
│                       ├── controller/
│                       │   └── TodoControllerTest.java
│                       ├── service/
│                       │   └── TodoServiceTest.java
│                       └── repository/
│                           └── TodoRepositoryTest.java
└── pom.xml
```

---

## 5. Complete Implementation 💻

### Step 1: Maven Dependencies (pom.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>todo-api</artifactId>
    <version>1.0.0</version>
    <name>TODO List API</name>
    <description>RESTful API for TODO management</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Web Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Boot Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- Spring Boot Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- H2 Database (for development) -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- MySQL Driver (for production) -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Lombok (reduces boilerplate) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- SpringDoc OpenAPI (Swagger UI) -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.2.0</version>
        </dependency>
        
        <!-- Spring Boot Test -->
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

### Step 2: Application Configuration

**application.properties (Development)**
```properties
# Application Name
spring.application.name=todo-api

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration (H2)
spring.datasource.url=jdbc:h2:mem:tododb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (for debugging)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.org.springframework.web=DEBUG
logging.level.com.example.todoapi=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# API Documentation
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true

# JSON formatting
spring.jackson.serialization.indent-output=true
spring.jackson.serialization.write-dates-as-timestamps=false
```

**application-prod.properties (Production)**
```properties
# Server Configuration
server.port=8080

# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/tododb?useSSL=false&serverTimezone=UTC
spring.datasource.username=todouser
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Logging
logging.level.com.example.todoapi=INFO

# Swagger (disabled in production)
springdoc.swagger-ui.enabled=false
```

### Step 3: Enums

```java
package com.example.todoapi.enums;

/**
 * TODO item status
 */
public enum TodoStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}
```

```java
package com.example.todoapi.enums;

/**
 * TODO item priority
 */
public enum TodoPriority {
    LOW,
    MEDIUM,
    HIGH,
    URGENT
}
```

### Step 4: Entity

```java
package com.example.todoapi.entity;

import com.example.todoapi.enums.TodoPriority;
import com.example.todoapi.enums.TodoStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * TODO entity representing a task/item
 * 
 * Features:
 * - Auto-generated ID
 * - Automatic timestamps
 * - Status and priority tracking
 * - Due date support
 * - Category/tagging
 */
@Entity
@Table(name = "todos", indexes = {
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_priority", columnList = "priority"),
    @Index(name = "idx_due_date", columnList = "dueDate"),
    @Index(name = "idx_category", columnList = "category")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TodoStatus status = TodoStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TodoPriority priority = TodoPriority.MEDIUM;

    @Column(name = "due_date")
    private LocalDate dueDate;

    private String category;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    /**
     * Mark TODO as completed
     */
    public void markAsCompleted() {
        this.status = TodoStatus.COMPLETED;
        this.completedAt = LocalDateTime.now();
    }

    /**
     * Check if TODO is overdue
     */
    public boolean isOverdue() {
        return dueDate != null && 
               LocalDate.now().isAfter(dueDate) && 
               status != TodoStatus.COMPLETED;
    }
}
```

### Step 5: DTOs (Data Transfer Objects)

```java
package com.example.todoapi.dto;

import com.example.todoapi.enums.TodoPriority;
import com.example.todoapi.enums.TodoStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for creating a new TODO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoCreateRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 255, message = "Title must be between 3 and 255 characters")
    private String title;

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @NotNull(message = "Status is required")
    private TodoStatus status;

    @NotNull(message = "Priority is required")
    private TodoPriority priority;

    @Future(message = "Due date must be in the future")
    private LocalDate dueDate;

    @Size(max = 100, message = "Category cannot exceed 100 characters")
    private String category;
}
```

```java
package com.example.todoapi.dto;

import com.example.todoapi.enums.TodoPriority;
import com.example.todoapi.enums.TodoStatus;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for updating an existing TODO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoUpdateRequest {

    @Size(min = 3, max = 255, message = "Title must be between 3 and 255 characters")
    private String title;

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    private TodoStatus status;

    private TodoPriority priority;

    private LocalDate dueDate;

    @Size(max = 100, message = "Category cannot exceed 100 characters")
    private String category;
}
```

```java
package com.example.todoapi.dto;

import com.example.todoapi.enums.TodoPriority;
import com.example.todoapi.enums.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO for TODO response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoResponse {
    
    private Long id;
    private String title;
    private String description;
    private TodoStatus status;
    private TodoPriority priority;
    private LocalDate dueDate;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime completedAt;
    private boolean overdue;
}
```

```java
package com.example.todoapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Standard error response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {
    
    private int status;
    private String error;
    private String message;
    private LocalDateTime timestamp;
    private String path;
}
```

### Step 6: Repository

```java
package com.example.todoapi.repository;

import com.example.todoapi.entity.Todo;
import com.example.todoapi.enums.TodoPriority;
import com.example.todoapi.enums.TodoStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository for TODO entity
 * Spring Data JPA provides implementation automatically
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // Find by status
    Page<Todo> findByStatus(TodoStatus status, Pageable pageable);

    // Find by priority
    Page<Todo> findByPriority(TodoPriority priority, Pageable pageable);

    // Find by category
    Page<Todo> findByCategory(String category, Pageable pageable);

    // Find by status and priority
    Page<Todo> findByStatusAndPriority(
        TodoStatus status, 
        TodoPriority priority, 
        Pageable pageable
    );

    // Search by title or description
    @Query("SELECT t FROM Todo t WHERE " +
           "LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Todo> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    // Find overdue TODOs
    @Query("SELECT t FROM Todo t WHERE " +
           "t.dueDate < :today AND " +
           "t.status != 'COMPLETED'")
    List<Todo> findOverdueTodos(@Param("today") LocalDate today);

    // Find TODOs due today
    @Query("SELECT t FROM Todo t WHERE " +
           "t.dueDate = :today AND " +
           "t.status != 'COMPLETED'")
    List<Todo> findTodosDueToday(@Param("today") LocalDate today);

    // Count by status
    long countByStatus(TodoStatus status);

    // Find all categories
    @Query("SELECT DISTINCT t.category FROM Todo t WHERE t.category IS NOT NULL")
    List<String> findAllCategories();
}
```

[**Part 1 of 2 - Continue in next message...**]