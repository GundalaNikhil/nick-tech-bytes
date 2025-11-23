# Tutorial 25: Spring Data REST 🔗

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

- **What is Spring Data REST?** - Auto-exposes Spring Data repositories as REST endpoints following HATEOAS principles
- **Why does it exist?** - Eliminates writing REST controller boilerplate for CRUD operations
- **When to use it?** - Simple to moderate CRUD APIs where repositories directly expose resources
- **How does it work?** - Scans repositories and generates REST endpoints with proper HTTP methods and links
- **What are best practices?** - Use projections, customize paths, implement custom search endpoints

### The Problem It Solves

**Before Spring Data REST:**

```java
// Manual REST controller - lots of boilerplate
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User saved = userRepository.save(user);
        return ResponseEntity.created(URI.create("/api/users/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updated) {
        return userRepository.findById(id)
            .map(user -> {
                user.setName(updated.getName());
                user.setEmail(updated.getEmail());
                return ResponseEntity.ok(userRepository.save(user));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
```

**After Spring Data REST:**

```java
// Just one interface! All endpoints auto-generated
@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, Long> {
    // Automatically generates: GET /users, POST /users, PUT /users/{id}, DELETE /users/{id}
    // Plus HATEOAS links in every response

    // Custom search endpoints are also exposed automatically
    List<User> findByEmail(String email);
}

// All CRUD endpoints available automatically!
// GET /users - List all
// POST /users - Create new
// GET /users/{id} - Get one
// PUT /users/{id} - Update
// DELETE /users/{id} - Delete
// GET /users/search/findByEmail?email=... - Custom search
```

### Real-World Context

Netflix and Uber use Spring Data REST for rapid API development. It's commonly used in microservices where you need quick RESTful access to data without custom controller logic.

---

## 2. Solution Approach 🎯

### Definition

**Spring Data REST** is a Spring Data sub-project that automatically exports Spring Data repositories as REST resources following HATEOAS (Hypermedia As The Engine Of Application State) principles, making it effortless to create discoverable, hypermedia-driven RESTful APIs.

It analyzes repository interfaces and creates REST endpoints with proper HTTP semantics, content negotiation, and HAL JSON responses.

### Core Philosophy

```
┌────────────────────────────────────────────────┐
│   Spring Data REST Philosophy                  │
├────────────────────────────────────────────────┤
│                                                │
│  1. Convention over Configuration              │
│     → Generate endpoints from repositories     │
│       without writing controllers              │
│                                                │
│  2. HATEOAS Driven                             │
│     → Responses include links to related       │
│       resources for discoverability            │
│                                                │
│  3. Standard HTTP Semantics                    │
│     → Proper use of GET, POST, PUT, DELETE     │
│       with correct status codes                │
│                                                │
│  4. Content Negotiation                        │
│     → Support multiple formats (JSON, XML)     │
│                                                │
└────────────────────────────────────────────────┘
```

### Key Components

1. **@RepositoryRestResource**: Customizes REST exposure of repository
2. **@RestResource**: Configures individual methods and relationships
3. **Projections**: Return custom field subsets of entities
4. **Excerpts**: Compact representations for list views
5. **Event Handlers**: Pre/post operation lifecycle hooks

---

## 3. Prerequisites & Requirements 📦

### Software Requirements

| Component       | Version | Purpose          |
| --------------- | ------- | ---------------- |
| JDK             | 17+     | Java Development |
| Spring Boot     | 3.x     | Framework        |
| Maven           | 3.8+    | Build Tool       |
| Postman/curl    | Latest  | API Testing      |
| Spring Data JPA | 3.x     | Data access      |

### Knowledge Requirements

- ✅ **Required**: Spring Data basics (Tutorial 24)
- ✅ **Required**: REST API concepts (HTTP methods, status codes)
- ⚠️ **Helpful**: HATEOAS principles
- ⚠️ **Helpful**: JSON and content negotiation

### Project Setup

```bash
# Add Spring Data REST to pom.xml dependencies:
# <dependency>
#     <groupId>org.springframework.boot</groupId>
#     <artifactId>spring-boot-starter-data-rest</artifactId>
# </dependency>
```

---

## 4. Key Topics & Plan of Action 📚

### Key Topics Covered

#### A. REST Endpoint Mapping

```
Repository Method              Generated Endpoint
────────────────────────────────────────────────
JpaRepository<User, Long>      GET    /users
                               POST   /users
                               GET    /users/{id}
                               PUT    /users/{id}
                               DELETE /users/{id}

findByEmail(String)            GET    /users/search/findByEmail?email=...
findByNameAndActive()          GET    /users/search/findByNameAndActive?...

Custom @RestResource name      GET    /custom-path/...
@RestResource(exported=false)  NOT EXPOSED as endpoint
```

#### B. HATEOAS Response Format

```json
{
  "_embedded": {
    "users": [
      {
        "id": 1,
        "name": "John",
        "email": "john@example.com",
        "_links": {
          "self": { "href": "http://localhost:8080/users/1" },
          "user": { "href": "http://localhost:8080/users/1" }
        }
      }
    ]
  },
  "_links": {
    "self": { "href": "http://localhost:8080/users?page=0" },
    "next": { "href": "http://localhost:8080/users?page=1" }
  },
  "page": {
    "size": 20,
    "totalElements": 100,
    "totalPages": 5,
    "number": 0
  }
}
```

#### C. Projection Types

| Type                | Purpose              | Use Case                    |
| ------------------- | -------------------- | --------------------------- |
| Inline Projections  | Define in interface  | Simple custom views         |
| Excerpt Projections | Default for lists    | Lightweight list responses  |
| Dynamic Projections | @Param in controller | Client-controlled responses |

### Plan of Action

```
Step 1: Add Spring Data REST dependency
Step 2: Create entities with proper annotations
Step 3: Create repositories extending JpaRepository
Step 4: Enable @RepositoryRestResource on repositories
Step 5: Test auto-generated endpoints
Step 6: Create projections for custom responses
Step 7: Implement custom event handlers
Step 8: Configure path mappings and exposed resources
```

---

## 5. Complete Implementation 💻

### Example 1: Basic Auto-Exposed REST API

**Entity Classes**

```java
package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column
    private String phone;

    @Column(nullable = false)
    private Boolean active = true;
}

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String status = "PENDING";
}
```

**Repositories with REST Exposure**

```java
package com.example.repository;

import com.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;

/**
 * UserRepository with Spring Data REST
 *
 * @RepositoryRestResource:
 * - path: URL path for this resource (default is pluralized entity name)
 * - collectionResourceRel: Name in HAL response
 * - itemResourceRel: Name for individual items
 *
 * Auto-generates:
 * GET    /users           - List all with pagination
 * POST   /users           - Create new user
 * GET    /users/{id}      - Get user by ID
 * PUT    /users/{id}      - Update user
 * DELETE /users/{id}      - Delete user
 * GET    /users/search    - List available search methods
 * GET    /users/search/findByEmail?email=... - Search endpoint
 */
@RepositoryRestResource(
    path = "users",
    collectionResourceRel = "users",
    itemResourceRel = "user"
)
public interface UserRepository extends JpaRepository<User, Long> {

    // Search methods automatically exposed as REST endpoints
    List<User> findByEmail(String email);

    List<User> findByNameContainingIgnoreCase(String name);

    List<User> findByActiveTrue();
}

@RepositoryRestResource(path = "orders")
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserIdAndStatus(Long userId, String status);

    List<Order> findByStatusOrderByAmountDesc(String status);
}
```

**Configuration (application.properties)**

```properties
# Spring Data REST Configuration

# Base path for all REST endpoints
spring.data.rest.basePath=/api

# Default page size for paginated endpoints
spring.data.rest.defaultPageSize=20

# Enable pagination headers
spring.data.rest.returnBodyOnPageCreation=true
spring.data.rest.returnBodyOnItemCreation=true

# Enable HATEOAS
spring.data.rest.detection-strategy=annotated

# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/springdata_rest_db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

**Testing the Endpoints:**

```bash
# List all users with HAL JSON format
curl http://localhost:8080/api/users

# Response includes HATEOAS links:
# {
#   "_embedded": {
#     "users": [...]
#   },
#   "_links": {
#     "self": { "href": "http://localhost:8080/api/users" },
#     "next": { "href": "http://localhost:8080/api/users?page=1" }
#   },
#   "page": { "size": 20, "totalElements": 50, ... }
# }

# Get specific user
curl http://localhost:8080/api/users/1

# Create new user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","active":true}'

# Update user
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice@example.com"}'

# Delete user
curl -X DELETE http://localhost:8080/api/users/1

# Search by email
curl "http://localhost:8080/api/users/search/findByEmail?email=alice@example.com"

# Search by name
curl "http://localhost:8080/api/users/search/findByNameContainingIgnoreCase?name=Alice"

# Get available search methods
curl http://localhost:8080/api/users/search
```

---

### Example 2: Projections for Custom Responses

```java
package com.example.projection;

import com.example.entity.User;
import org.springframework.data.rest.core.config.Projection;

/**
 * Projection: Return only specific fields instead of full entity
 *
 * This projection returns only id, name, and email (no phone, active fields)
 * Use with ?projection=userSummary in GET requests
 */
@Projection(name = "userSummary", types = { User.class })
public interface UserSummaryProjection {
    Long getId();
    String getName();
    String getEmail();
}

/**
 * Excerpt projection: Used as default in list endpoints
 * Returns lightweight version for better list performance
 */
@Projection(name = "userExcerpt", types = { User.class })
public interface UserExcerptProjection {
    Long getId();
    String getName();
    String getEmail();
}

// Usage in controller/repository:
// Automatically applies excerpt to list responses
// GET /api/users - Returns UserExcerptProjection objects
// GET /api/users?projection=userSummary - Returns UserSummaryProjection
```

**Testing Projections:**

```bash
# Get all users with excerpt (smaller response)
curl http://localhost:8080/api/users

# Get all users with custom projection
curl http://localhost:8080/api/users?projection=userSummary

# Get specific user with projection
curl http://localhost:8080/api/users/1?projection=userSummary

# Results will only include: id, name, email (no phone, active fields)
```

---

### Example 3: Custom Event Handlers

```java
package com.example.event;

import com.example.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

/**
 * Event handlers for repository lifecycle events
 *
 * Methods annotated with @Handle* are called at specific points:
 * - @HandleBefore*: Called before operation (validation, modification)
 * - @HandleAfter*: Called after operation (logging, notifications)
 */
@Slf4j
@Component
@RepositoryEventHandler(User.class)  // Register for User entity events
public class UserEventHandler {

    /**
     * Called before creating a new user
     * Use for validation and default values
     */
    @HandleBeforeCreate
    public void beforeCreate(User user) {
        log.info("Creating user: {}", user.getEmail());

        // Validation
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        // Set defaults
        if (user.getActive() == null) {
            user.setActive(true);
        }

        // Sanitize data
        user.setEmail(user.getEmail().toLowerCase().trim());
        user.setName(user.getName().trim());
    }

    /**
     * Called after user is created and saved to database
     * Use for logging, notifications, async operations
     */
    @HandleAfterCreate
    public void afterCreate(User user) {
        log.info("User created with ID: {}", user.getId());
        // Send welcome email, update analytics, etc.
    }

    /**
     * Called before saving (create or update)
     */
    @HandleBeforeSave
    public void beforeSave(User user) {
        log.info("Saving user: {}", user.getEmail());
        // Audit trail, validation, modification tracking
    }

    /**
     * Called before deleting
     */
    @HandleBeforeSave
    public void beforeDelete(User user) {
        log.info("Deleting user: {}", user.getId());
        // Archive data, cleanup related records
    }
}
```

---

### Example 4: Custom REST Endpoints with @RestResource

```java
package com.example.repository;

import com.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;

@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * @RestResource customizes this method's REST exposure:
     * - path: Custom URL path for the search method
     * - rel: Relationship name in HATEOAS links
     * - description: Optional description for discovery
     */
    @RestResource(
        path = "by-email",
        rel = "find-by-email",
        description = "Find user by exact email match"
    )
    List<User> findByEmail(@Param("email") String email);

    /**
     * Custom query with explicit path
     */
    @RestResource(path = "active")
    List<User> findByActiveTrue();

    /**
     * exported = false: Don't expose this method as REST endpoint
     * Only called internally
     */
    @RestResource(exported = false)
    List<User> findByNameContainingIgnoreCase(String name);

    /**
     * Custom JPQL query with @Query
     * Automatically exposed as search endpoint
     */
    @Query("SELECT u FROM User u WHERE u.active = true " +
           "AND LOWER(u.name) LIKE LOWER(CONCAT('%', :pattern, '%'))")
    @RestResource(path = "search-active")
    List<User> searchActiveUsersByName(@Param("pattern") String pattern);
}

// Generated endpoints:
// GET /api/users/search/by-email?email=john@example.com
// GET /api/users/search/active
// GET /api/users/search/search-active?pattern=john
// (findByNameContainingIgnoreCase is NOT exposed)
```

---

### Example 5: Relationship Handling

```java
package com.example.config;

import com.example.entity.Order;
import com.example.entity.User;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 * Configuration for Spring Data REST
 * Customize global behavior
 */
@Component
public class RestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(
            RepositoryRestConfiguration config,
            CorsRegistry cors) {

        // Expose ID in response bodies (useful for clients)
        config.exposeIdsFor(User.class, Order.class);

        // Set base path for all REST endpoints
        config.setBasePath("/api");

        // Configure CORS
        cors.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000", "http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Use Projections for List Endpoints

```java
✅ DO: Define excerpt projections for better list performance
@Projection(name = "excerpt", types = { User.class })
public interface UserExcerpt {
    Long getId();
    String getName();
    String getEmail();
}
// Lightweight list responses, full details on individual GET

❌ DON'T: Expose entire entity with all relationships in lists
// Returns too much data, slow network transfers, N+1 queries

📝 WHY: Projections reduce payload size by 70-90%, improve list endpoint performance
```

#### 2. Use @RestResource(exported=false) for Internal Methods

```java
✅ DO: Hide complex internal queries from REST API
@RestResource(exported = false)
List<User> findByComplexBusinessLogic();

❌ DON'T: Expose all repository methods
// Users can call unintended methods, creates API surface area

📝 WHY: Explicit API surface, prevents misuse of internal queries
```

#### 3. Implement Event Handlers for Validation

```java
✅ DO: Use @HandleBefore* for validation and data sanitization
@HandleBeforeCreate
public void validateUser(User user) {
    if (!isValidEmail(user.getEmail())) {
        throw new IllegalArgumentException("Invalid email");
    }
}

❌ DON'T: Rely only on entity validations
// REST layer bypasses custom business logic

📝 WHY: Ensures data integrity at REST layer, prevents invalid data
```

---

### Common Pitfalls

#### Pitfall 1: Exposing Passwords or Sensitive Data

**Problem:**

```java
@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {
    // Exposes entire User with password!
}

// Response includes: id, name, email, password (EXPOSED!)
```

**Solution:**

```java
@Projection(name = "publicUser", types = { User.class })
public interface PublicUserProjection {
    Long getId();
    String getName();
    String getEmail();
    // Password NOT included
}

// Use @RepositoryRestResource with @Projection to control exposure
```

**Explanation:**
Projections allow you to control exactly which fields are returned, preventing accidental exposure of sensitive data.

---

#### Pitfall 2: N+1 Queries with Relationships

**Problem:**

```java
@Entity
public class Order {
    @ManyToOne  // Lazy by default
    private User user;
}

// Each order fetch triggers: SELECT user FROM users WHERE id = ?
List<Order> orders = orderRepository.findAll();  // N+1 queries
for (Order order : orders) {
    System.out.println(order.getUser().getName());  // Extra query per order
}
```

**Solution:**

```java
@RestResource(path = "with-users")
@Query("SELECT o FROM Order o LEFT JOIN FETCH o.user")
List<Order> findAllWithUsers();

// Use in REST endpoint
@GetMapping("/orders/search/with-users")
List<Order> getOrdersWithUsers() {
    return orderRepository.findAllWithUsers();  // 1 query
}
```

**Explanation:**
JOIN FETCH loads relationships eagerly in a single query, preventing N+1 problems.

---

#### Pitfall 3: Missing HATEOAS Links

**Problem:**

```java
// Default response - no HATEOAS
GET /api/users/1
{ "id": 1, "name": "John", "email": "john@example.com" }
```

**Solution:**

```java
// Add Accept header for HAL JSON
curl http://localhost:8080/api/users/1 \
  -H "Accept: application/hal+json"

// Response includes links:
{
  "id": 1,
  "name": "John",
  "email": "john@example.com",
  "_links": {
    "self": { "href": "http://localhost:8080/api/users/1" },
    "user": { "href": "http://localhost:8080/api/users/1" }
  }
}
```

**Explanation:**
HAL JSON format includes metadata about related resources, making APIs discoverable.

---

### Security Considerations

```java
// Security Best Practice 1: Implement data-level security
@HandleBeforeSave
public void checkPermissions(User user) {
    if (!currentUser.canEdit(user)) {
        throw new AccessDeniedException("Cannot edit this user");
    }
}

// Security Best Practice 2: Audit sensitive operations
@HandleAfterCreate
public void auditCreation(User user) {
    auditLog.log("User created: " + user.getId());
}

// Security Best Practice 3: Use projections to hide sensitive fields
@Projection(types = { User.class })
public interface SafeUserProjection {
    Long getId();
    String getName();
    // No password, no internal IDs, no sensitive fields
}
```

**Security Checklist:**

- [ ] Use projections to hide sensitive fields
- [ ] Implement @HandleBefore\* authorization checks
- [ ] Audit create/update/delete operations
- [ ] Validate all input in event handlers
- [ ] Use proper HTTP status codes (403 for forbidden)
- [ ] Enable CORS only for trusted origins

---

## 7. Visual Representations 📊

### Diagram 1: Spring Data REST Request/Response Flow

```
HTTP Request
    │
    ▼
┌──────────────────────────────────────┐
│ Spring Data REST Dispatcher          │
│ (RepositoryRestHandlerMapping)       │
└────────────────┬─────────────────────┘
                 │
    ┌────────────┴────────────┬──────────────┐
    ▼                         ▼              ▼
GET /users              POST /users    PUT /users/{id}
(Search)                (Create)      (Update)
    │                         │             │
    ▼                         ▼             ▼
┌──────────────────┐  ┌──────────────┐  ┌───────────┐
│ @HandleBefore*   │  │Validation    │  │Existing   │
│ Projections      │  │@HandleBefore*│  │@HandleBefore
│ Query Methods    │  │Save entity   │  │Merge data │
└────────┬─────────┘  └──────┬───────┘  └─────┬─────┘
         │                   │               │
         ▼                   ▼               ▼
    Repository        Repository         Repository
    findAll()         save()              save()
         │                   │               │
         ▼                   ▼               ▼
      Database          Database         Database
         │                   │               │
         ▼                   ▼               ▼
┌──────────────────┐  ┌──────────────┐  ┌───────────┐
│ @HandleAfter*    │  │@HandleAfter* │  │@HandleAfter
│ Format Response  │  │Generate URI  │  │Update response
│ Add HATEOAS links│  │201 Created   │  │200 OK
└────────┬─────────┘  └──────┬───────┘  └─────┬─────┘
         │                   │               │
         ▼                   ▼               ▼
    HAL JSON          HAL JSON with    Updated HAL JSON
    with links        Location header  with new data
         │                   │               │
         └───────────┬───────┴───────────────┘
                     │
                     ▼
              HTTP Response
           (200, 201, 204, etc.)
```

### Diagram 2: HATEOAS Response Structure

```
┌─────────────────────────────────────────────────────┐
│ HAL JSON Response (GET /api/users?page=0)          │
├─────────────────────────────────────────────────────┤
│                                                     │
│ "_embedded": {                                      │
│   "users": [                                        │
│     {                                               │
│       "id": 1,                                      │
│       "name": "John",                               │
│       "email": "john@example.com",                  │
│       "_links": {                     ◄─── Entity Links
│         "self": {                                   │
│           "href": "/users/1"                        │
│         }                                           │
│       }                                             │
│     },                                              │
│     { ... },                                        │
│     { ... }                                         │
│   ]                                                 │
│ },                                                  │
│                                                     │
│ "_links": {                        ◄─── Collection Links
│   "self": {                                         │
│     "href": "/users?page=0&size=20"                │
│   },                                                │
│   "next": {                                         │
│     "href": "/users?page=1&size=20"                │
│   },                                                │
│   "last": {                                         │
│     "href": "/users?page=4&size=20"                │
│   }                                                 │
│ },                                                  │
│                                                     │
│ "page": {                          ◄─── Metadata
│   "size": 20,                                       │
│   "totalElements": 100,                             │
│   "totalPages": 5,                                  │
│   "number": 0                                       │
│ }                                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Diagram 3: Projection Concept

```
Original Entity (User)
┌────────────────────────────┐
│ - id                        │
│ - name                      │
│ - email                     │
│ - phone                     │
│ - address                   │
│ - password                  │
│ - internalNotes             │
│ - subscriptionLevel (ENUM)  │
└────────────────────────────┘
         │
         │ Apply Projection
         ▼
┌────────────────────────┐
│ Excerpt Projection     │
│ - id                   │ ◄─ List responses
│ - name                 │
│ - email                │
│ - subscriptionLevel    │
└────────────────────────┘
         │
         │ Different Projection
         ▼
┌────────────────────┐
│ Details Projection │
│ - id               │ ◄─ Single item
│ - name             │
│ - email            │
│ - phone            │
│ - address          │
│ - subscriptionLevel│
└────────────────────┘
```

---

## 8. Practice Questions 📝

### Beginner Level

**Question 1: What endpoints does Spring Data REST auto-generate?**

```
Q: For a UserRepository extending JpaRepository<User, Long>,
   what REST endpoints are automatically created?

A: Spring Data REST auto-generates:
   - GET /users                    → List all users (paginated)
   - POST /users                   → Create new user
   - GET /users/{id}               → Get user by ID
   - PUT /users/{id}               → Update user
   - DELETE /users/{id}            → Delete user
   - GET /users/search             → List available search methods
   - GET /users/search/findByEmail → Search by email

   Plus HATEOAS _links in every response!
```

**Question 2: What's the difference between @Projection and @Excerpt?**

```
Q: When would you use each annotation?

A: @Projection: Define custom field subsets
   - Used explicitly: ?projection=nameOfProjection
   - Can have multiple for same entity
   - Full control over returned fields

@Projection with name="excerpt": Default for list endpoints
   - Auto-applied to findAll() responses
   - Lightweight version for lists
   - Full details available on GET /{id}
```

**Question 3: How do you prevent a repository method from being exposed?**

```
Q: I have an internal query method that shouldn't be accessible via REST

A: Use @RestResource(exported = false):

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @RestResource(exported = false)
    List<User> findComplexInternalQuery();  // NOT exposed

    List<User> findByEmail(String email);  // IS exposed
}
```

---

### Intermediate Level

**Question 4: Implement a custom search endpoint**

```
Q: Create a search endpoint that finds users by name pattern and status

A:
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @RestResource(path = "search-by-name")
    List<User> findByNameContainingIgnoreCaseAndActive(
        @Param("name") String name,
        @Param("active") Boolean active
    );
}

// Usage:
GET /api/users/search/search-by-name?name=John&active=true
```

**Question 5: Protect sensitive data with projections**

```
Q: Users repository exposes passwords. How do you fix this?

A:
@Projection(name = "publicUser", types = { User.class })
public interface PublicUserProjection {
    Long getId();
    String getName();
    String getEmail();
    // Password NOT included!
}

// Configure default projection
@RepositoryRestResource(
    path = "users",
    excerptProjection = PublicUserProjection.class
)
public interface UserRepository extends JpaRepository<User, Long> {}
```

**Question 6: Validate input in REST endpoints**

```
Q: How do you validate user input when creating users via REST?

A:
@Component
@RepositoryEventHandler(User.class)
public class UserValidator {

    @HandleBeforeCreate
    public void validateBeforeCreate(User user) {
        // Email validation
        if (user.getEmail() == null || !user.getEmail().contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }

        // Name validation
        if (user.getName() == null || user.getName().length() < 2) {
            throw new IllegalArgumentException("Name too short");
        }

        // Sanitize
        user.setEmail(user.getEmail().toLowerCase().trim());
        user.setName(user.getName().trim());
    }
}
```

---

### Advanced Level

**Question 7: Design a multi-projection response system**

```
Q: Design a system where clients can request different field subsets

A:
// Multiple projections for different use cases
@Projection(name = "summary", types = { User.class })
public interface UserSummary {
    Long getId();
    String getName();
}

@Projection(name = "details", types = { User.class })
public interface UserDetails {
    Long getId();
    String getName();
    String getEmail();
    String getPhone();
    LocalDateTime getCreatedAt();
}

@Projection(name = "full", types = { User.class })
public interface UserFull {
    Long getId();
    String getName();
    String getEmail();
    String getPhone();
    Boolean getActive();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();
}

// Usage:
GET /api/users?projection=summary     // Lightweight
GET /api/users?projection=details     // Standard
GET /api/users?projection=full        // Complete
```

**Question 8: Handle relationships in REST responses**

```
Q: User has many Orders. How do you expose this in REST?

A:
@Entity
public class User {
    @OneToMany(mappedBy = "user")
    private List<Order> orders;
}

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Expose relationship as sub-resource
    // GET /api/users/1/orders - Get user's orders
}

// If manual control needed:
@Component
@RequestMapping("/api/users/{userId}/orders")
public class UserOrdersController {

    @GetMapping
    public Page<Order> getUserOrders(
        @PathVariable Long userId,
        @PageableDefault(size = 20) Pageable pageable) {
        return orderRepository.findByUserId(userId, pageable);
    }
}
```

---

## 🎯 Key Takeaways

1. ✅ **Spring Data REST eliminates REST controller boilerplate** - Just extend JpaRepository and get full CRUD endpoints
2. ✅ **HATEOAS enables API discoverability** - Responses include links to related resources
3. ✅ **Projections control data exposure** - Return only specific fields for lists vs detail views
4. ✅ **Event handlers add business logic** - Use @HandleBefore*/After* for validation and side effects
5. ✅ **@RestResource customizes exposure** - Control paths, hide internal methods, add descriptions
6. ✅ **Security through projections** - Never expose sensitive fields in API responses

### Quick Reference

```bash
# List with pagination
GET /api/users?page=0&size=20

# Get one
GET /api/users/1

# Create
POST /api/users
Content-Type: application/json
{ "name": "John", "email": "john@example.com" }

# Update
PUT /api/users/1
{ "name": "Updated Name" }

# Delete
DELETE /api/users/1

# Search
GET /api/users/search/findByEmail?email=john@example.com

# With projection
GET /api/users?projection=userSummary
```

---

## 📚 What's Next?

From this tutorial, proceed to:

- **Tutorial 30: Security Implementation** - Secure your REST endpoints
- **Tutorial 28: Profiles Management** - Different configs for different environments
- **Tutorial 41: Caching** - Cache REST responses for performance

---

## 🔗 References

- [Spring Data REST Official Docs](https://spring.io/projects/spring-data-rest)
- [HATEOAS Specification](https://en.wikipedia.org/wiki/HATEOAS)
- [HAL JSON Format](https://tools.ietf.org/html/draft-kelly-json-hal)

---

## Changelog

- **2025-11-23**: Initial creation with 5 complete examples
- **Added**: HATEOAS response formats, projection patterns
- **Added**: Event handlers and security considerations

**Congratulations! You now master Spring Data REST! 🎉**

_Practice the code examples and exercises before moving to the next tutorial._
