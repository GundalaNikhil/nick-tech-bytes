# Tutorial 24: Spring Data Overview 📊

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

- **What is Spring Data?** - Abstraction layer for data access with support for multiple database technologies
- **Why does it exist?** - Eliminates boilerplate code for database operations and provides consistent API across different data sources
- **When to use it?** - When working with databases in Spring Boot applications, from simple CRUD to complex queries
- **How does it work?** - Provides repositories, query methods, and automatic query generation from method names
- **What are best practices?** - Use projections, specifications, and custom repositories for advanced use cases

### The Problem It Solves

**Before Spring Data:**

```java
// Manual JDBC operations - repetitive, error-prone
public class UserRepository {
    private final DataSource dataSource;

    public User findById(Long id) throws SQLException {
        try (Connection conn = dataSource.getConnection()) {
            // Write SQL, parse ResultSet, handle exceptions
            String sql = "SELECT * FROM users WHERE id = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // Map ResultSet to User object manually
                return new User(
                    rs.getLong("id"),
                    rs.getString("name"),
                    rs.getString("email")
                );
            }
        }
        return null;
    }

    public void save(User user) throws SQLException {
        // Write INSERT/UPDATE logic manually
    }
}
```

**After Spring Data:**

```java
// Spring Data Repository - Clean, declarative
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // That's it! CRUD operations automatically available
    // Just declare methods for custom queries
    List<User> findByEmail(String email);
    List<User> findByNameContainingIgnoreCase(String name);
}

// Usage
User user = userRepository.findById(1L).orElse(null);
userRepository.save(new User("John", "john@example.com"));
List<User> users = userRepository.findByEmail("john@example.com");
```

### Real-World Context

Spring Data is used in virtually every Spring Boot application dealing with databases. Netflix uses it for scalability, Uber for data access abstraction, and Amazon for microservices data layer.

---

## 2. Solution Approach 🎯

### Definition

**Spring Data** is an umbrella project that provides a consistent and easy-to-use abstraction layer for data access across different storage mechanisms, from relational databases to NoSQL stores.

Spring Data is built on the concept of repositories—interfaces that define data access methods without requiring you to write implementation code. It supports multiple backends including JPA (relational databases), MongoDB, Redis, Elasticsearch, and more.

### Core Philosophy

```
┌─────────────────────────────────────────────────┐
│   Spring Data Philosophy                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. Convention over Configuration               │
│     → Use method naming conventions to auto-    │
│       generate queries instead of writing SQL   │
│                                                 │
│  2. Reduce Boilerplate Code                     │
│     → Repositories provide CRUD and common      │
│       queries automatically                     │
│                                                 │
│  3. Database Agnostic                           │
│     → Same interface works with different       │
│       database technologies                     │
│                                                 │
│  4. Type Safety                                 │
│     → Compile-time checking of queries          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Key Components

1. **Repository Interface**: Base interface for data access (CrudRepository, JpaRepository)
2. **Entity Classes**: POJO classes with JPA annotations representing database tables
3. **Query Methods**: Methods that generate queries based on naming conventions or @Query
4. **Projections**: Return only specific fields instead of entire entities
5. **Specifications**: Complex, reusable query logic using predicates

---

## 3. Prerequisites & Requirements 📦

### Software Requirements

| Component        | Version | Purpose          | Installation                                 |
| ---------------- | ------- | ---------------- | -------------------------------------------- |
| JDK              | 17+     | Java Development | [oracle.com/java](https://oracle.com/java)   |
| Spring Boot      | 3.x     | Framework        | Auto via Maven                               |
| Maven            | 3.8+    | Build Tool       | [maven.apache.org](https://maven.apache.org) |
| MySQL/PostgreSQL | Latest  | Database         | brew install mysql                           |
| H2 Database      | Latest  | In-Memory DB     | Auto (testing)                               |

### Knowledge Requirements

- ✅ **Required**: Java basics and OOP
- ✅ **Required**: SQL fundamentals
- ⚠️ **Helpful**: Spring Boot basics (see Tutorial 14)
- ⚠️ **Helpful**: Hibernate/JPA concepts

### Project Setup

```bash
# Step 1: Create Spring Boot project
mvn archetype:generate -DgroupId=com.example -DartifactId=spring-data-demo \
  -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

# Step 2: Add Spring Data and database dependencies to pom.xml
# (See pom.xml section below)

# Step 3: Configure database properties
echo "spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=create-drop" > src/main/resources/application.properties

# Step 4: Run the application
mvn spring-boot:run
```

---

## 4. Key Topics & Plan of Action 📚

### Key Topics Covered

#### A. Repository Types and Hierarchy

```
┌──────────────────────────────────────┐
│      Repository (interface)          │
├──────────────────────────────────────┤
│ Marker interface for Spring Data     │
└─────────────┬────────────────────────┘
              │
              ├─→ CrudRepository
              │   ├─ save(), findById()
              │   ├─ findAll(), delete()
              │   └─ count()
              │
              └─→ JpaRepository
                  ├─ Extends CrudRepository
                  ├─ batch operations
                  ├─ flush(), saveAndFlush()
                  └─ pagination/sorting
```

- **Repository**: Marker interface, no methods
- **CrudRepository**: Basic CRUD operations
- **JpaRepository**: JPA-specific features like batch operations and flush()
- **PagingAndSortingRepository**: Pagination and sorting support
- **Custom Repositories**: Extend above for business logic

#### B. Query Methods

| Pattern                 | Example                             | Generated SQL                |
| ----------------------- | ----------------------------------- | ---------------------------- |
| findBy[Property]        | `findByEmail(String email)`         | WHERE email = ?              |
| findBy[Prop1]And[Prop2] | `findByNameAndEmail()`              | WHERE name = ? AND email = ? |
| findBy[Prop]GreaterThan | `findByAgeLessThan(int age)`        | WHERE age < ?                |
| findBy[Prop]Contains    | `findByNameContains(String name)`   | WHERE name LIKE ?            |
| findBy[Prop]IgnoreCase  | `findByNameIgnoreCase(String name)` | LOWER(name) = LOWER(?)       |

#### C. Query Customization

```
Method Naming      @Query          @Query + JPQL      Specifications
─────────────      ──────          ─────────────      ──────────────
Simple             Standard SQL    Complex logic      Dynamic queries
findBy[Field]      Native queries  Type-safe          Reusable criteria
```

### Plan of Action

```
Step 1: Create Entity Classes - Define domain objects with JPA annotations
   ├─ @Entity marks classes for persistence
   └─ @Id identifies primary key

Step 2: Create Repository Interfaces - Define data access methods
   ├─ Extend JpaRepository
   └─ Add query methods

Step 3: Configure Database - Set up connection and properties
   ├─ application.properties
   └─ datasource configuration

Step 4: Implement Business Logic - Use repositories in services
   ├─ @Service classes
   └─ Dependency injection

Step 5: Test Data Access - Verify CRUD and query operations
   ├─ Unit tests
   └─ Integration tests

Step 6: Optimize Queries - Use projections, specifications
   ├─ Performance tuning
   └─ Complex query patterns
```

---

## 5. Complete Implementation 💻

### Example 1: Basic CRUD Operations with JpaRepository

Complete example demonstrating basic repository operations.

**Project Structure**

```
spring-data-demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/
│   │   │       ├── entity/
│   │   │       │   └── User.java
│   │   │       ├── repository/
│   │   │       │   └── UserRepository.java
│   │   │       ├── service/
│   │   │       │   └── UserService.java
│   │   │       └── Application.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/example/
│               └── UserRepositoryTest.java
└── pom.xml
```

**Dependencies (pom.xml)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>spring-data-demo</artifactId>
    <version>1.0.0</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>

    <dependencies>
        <!-- Spring Data JPA - provides repository abstraction -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Spring Web - for REST endpoints -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- MySQL Driver - database connection -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>

        <!-- Lombok - reduces boilerplate with annotations -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

**Entity Class (User.java)**

```java
package com.example.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * User entity representing a user in the system
 *
 * @Entity marks this class as a JPA entity (database table)
 * @Table specifies the table name
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    // Unique identifier for each user
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User's full name - cannot be null
    @Column(nullable = false, length = 100)
    private String name;

    // User's email - unique and required
    @Column(unique = true, nullable = false, length = 100)
    private String email;

    // User's phone number - optional
    @Column(length = 15)
    private String phone;

    // Whether user is active
    @Column(nullable = false)
    private Boolean active = true;

    // Timestamp of account creation
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Last update timestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}
```

**Repository Interface (UserRepository.java)**

```java
package com.example.repository;

import com.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repository for User entity
 *
 * JpaRepository<Entity, IdType> provides:
 * - save(), saveAll() - Insert/Update
 * - findById() - Query by primary key
 * - findAll() - Get all records
 * - delete(), deleteById() - Remove records
 * - count() - Get total count
 *
 * Method names are parsed to generate SQL automatically
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Query method: Spring Data generates SQL based on method name
    // SELECT * FROM users WHERE email = ?
    Optional<User> findByEmail(String email);

    // AND operator in method name
    // SELECT * FROM users WHERE name = ? AND active = true
    List<User> findByNameAndActive(String name, Boolean active);

    // Contains generates LIKE query
    // SELECT * FROM users WHERE name LIKE ?
    List<User> findByNameContainingIgnoreCase(String name);

    // Using @Query for custom JPQL queries
    // Explicit query when method naming isn't convenient
    @Query("SELECT u FROM User u WHERE u.active = true ORDER BY u.createdAt DESC")
    List<User> findAllActiveUsers();

    // Query with parameters using @Param
    @Query("SELECT u FROM User u WHERE u.email LIKE %:searchTerm%")
    List<User> searchByEmail(@Param("searchTerm") String searchTerm);

    // Native SQL query for complex operations
    @Query(value = "SELECT * FROM users WHERE active = true AND created_at > NOW() - INTERVAL 7 DAY",
           nativeQuery = true)
    List<User> findRecentActiveUsers();
}
```

**Service Class (UserService.java)**

```java
package com.example.service;

import com.example.entity.User;
import com.example.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Business logic layer for User operations
 *
 * @Service marks this as a service component
 * @Transactional ensures database consistency
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Create a new user
     *
     * @param user User object to save
     * @return Saved user with generated ID
     */
    @Transactional
    public User createUser(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Save and return the user with generated ID
        return userRepository.save(user);
    }

    /**
     * Find user by ID
     *
     * @param id User ID
     * @return Optional containing user if found
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Get all active users
     *
     * @return List of active users
     */
    public List<User> getAllActiveUsers() {
        return userRepository.findAllActiveUsers();
    }

    /**
     * Search users by email pattern
     *
     * @param searchTerm Search string
     * @return List of matching users
     */
    public List<User> searchUsers(String searchTerm) {
        return userRepository.searchByEmail(searchTerm);
    }

    /**
     * Update existing user
     *
     * @param id User ID
     * @param updatedUser Updated user data
     * @return Updated user
     */
    @Transactional
    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());
        user.setActive(updatedUser.getActive());

        // save() updates if entity already has ID
        return userRepository.save(user);
    }

    /**
     * Delete user by ID
     *
     * @param id User ID
     */
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
```

**Configuration (application.properties)**

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/spring_data_db
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=create-drop              # Auto create/drop tables
spring.jpa.show-sql=true                              # Log SQL statements
spring.jpa.properties.hibernate.format_sql=true       # Format SQL nicely
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Logging
logging.level.root=INFO
logging.level.com.example=DEBUG
```

**Testing (UserRepositoryTest.java)**

```java
package com.example;

import com.example.entity.User;
import com.example.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.Optional;
import static org.assertj.core.api.Assertions.*;

@DataJpaTest  // Test only JPA components
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSaveAndFindUser() {
        // Create and save a user
        User user = new User(null, "John Doe", "john@example.com", "1234567890", true, null, null);
        User savedUser = userRepository.save(user);

        // Verify the user was saved with an ID
        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getName()).isEqualTo("John Doe");
    }

    @Test
    void testFindByEmail() {
        // Save a user
        User user = new User(null, "Jane Smith", "jane@example.com", "9876543210", true, null, null);
        userRepository.save(user);

        // Find by email
        Optional<User> found = userRepository.findByEmail("jane@example.com");
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Jane Smith");
    }

    @Test
    void testFindAllActiveUsers() {
        // Save active and inactive users
        userRepository.save(new User(null, "Active User", "active@example.com", null, true, null, null));
        userRepository.save(new User(null, "Inactive User", "inactive@example.com", null, false, null, null));

        // Find only active users
        var activeUsers = userRepository.findAllActiveUsers();
        assertThat(activeUsers).hasSize(1);
        assertThat(activeUsers.get(0).getActive()).isTrue();
    }
}
```

**How to run:**

```bash
# Start MySQL
mysql -u root -p

# Create database
CREATE DATABASE spring_data_db;

# Run the application
mvn spring-boot:run

# Run tests
mvn test

# Test with curl
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","active":true}'

# Expected response:
# {"id":1,"name":"John","email":"john@example.com",...}
```

---

### Example 2: Pagination and Sorting

```java
package com.example.repository;

import com.example.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Pageable parameter automatically handles pagination
    // Returns Page object with total count, pages, etc.
    Page<User> findByActive(Boolean active, Pageable pageable);

    // Sort by multiple fields
    List<User> findByActive(Boolean active, Sort sort);
}

// Usage in service
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Get page 0, 10 items per page, sorted by createdAt descending
    public Page<User> getActiveUsersPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        return userRepository.findByActive(true, pageable);
    }
}
```

---

### Example 3: Custom Repository Implementation

```java
// Custom repository interface with business methods
public interface UserRepositoryCustom {
    List<User> findActiveUsersCreatedAfter(LocalDateTime date);
    void deactivateAllUsers();
}

// Implementation class
@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> findActiveUsersCreatedAfter(LocalDateTime date) {
        return entityManager.createQuery(
            "SELECT u FROM User u WHERE u.active = true AND u.createdAt > :date",
            User.class
        )
        .setParameter("date", date)
        .getResultList();
    }

    @Override
    @Transactional
    public void deactivateAllUsers() {
        entityManager.createQuery("UPDATE User u SET u.active = false")
            .executeUpdate();
    }
}

// Extended repository combining both
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    // All methods from both interfaces available
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Use DTOs for API Responses

```java
✅ DO: Return DTOs instead of entities in REST endpoints
// Prevents lazy loading issues and data exposure
@RestController
public class UserController {
    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return UserDTO.from(user);  // Convert to DTO
    }
}

❌ DON'T: Return entities directly
@GetMapping("/{id}")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id).orElseThrow();  // Exposes all fields
}

📝 WHY: DTOs provide API contracts, prevent N+1 queries, hide internal implementation
```

#### 2. Use Lazy Loading with Caution

```java
✅ DO: Use @Query with JOIN FETCH for eager loading when needed
@Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.roles WHERE u.id = :id")
Optional<User> findByIdWithRoles(@Param("id") Long id);

❌ DON'T: Access lazy-loaded associations outside transaction
@Transactional
public UserDTO getUser(Long id) {
    User user = userRepository.findById(id).orElseThrow();
    return new UserDTO(user.getId(), user.getRoles());  // LazyInitializationException
}

📝 WHY: Lazy loading causes N+1 query problem and LazyInitializationException
```

#### 3. Proper Index Usage

```java
✅ DO: Add @Column(unique=true) and @Index for frequently queried fields
@Column(unique = true, nullable = false)
private String email;

@Column
@Index(name = "idx_name")  // Add database index
private String name;

❌ DON'T: Query without indexes on large tables
List<User> users = userRepository.findByNameContaining("John");  // Slow on large dataset

📝 WHY: Indexes improve query performance significantly
```

---

### Common Pitfalls

#### Pitfall 1: LazyInitializationException

**Problem:**

```java
User user = userRepository.findById(1L).orElseThrow();
// Transaction ends here
System.out.println(user.getRoles());  // Error! Lazy collection not initialized
```

**Error Message:**

```
org.hibernate.LazyInitializationException: failed to lazily initialize a collection
of role "com.example.entity.User.roles"
```

**Solution:**

```java
@Query("SELECT u FROM User u LEFT JOIN FETCH u.roles WHERE u.id = :id")
Optional<User> findByIdWithRoles(@Param("id") Long id);

User user = userRepository.findByIdWithRoles(1L).orElseThrow();
System.out.println(user.getRoles());  // Works!
```

**Explanation:**
Using JOIN FETCH loads the roles eagerly within the transaction, preventing lazy loading issues.

---

#### Pitfall 2: N+1 Query Problem

**Problem:**

```java
// 1 query: SELECT * FROM users
List<User> users = userRepository.findAll();

// N queries: SELECT * FROM orders WHERE user_id = ? (executed for each user)
for (User user : users) {
    System.out.println(user.getOrders());
}
```

**Solution:**

```java
@Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.orders")
List<User> findAllWithOrders();

List<User> users = userRepository.findAllWithOrders();
for (User user : users) {
    System.out.println(user.getOrders());  // No additional queries
}
```

**Explanation:**
JOIN FETCH loads related objects in a single query using a database join.

---

#### Pitfall 3: Transactional Issues

**Problem:**

```java
public void updateUser(Long id) {
    User user = userRepository.findById(id).orElseThrow();
    user.setName("Updated");
    // Forgot to call save() - changes not persisted!
}
```

**Solution:**

```java
@Transactional
public void updateUser(Long id) {
    User user = userRepository.findById(id).orElseThrow();
    user.setName("Updated");
    // Changes auto-saved when transaction commits
}
```

**Explanation:**
Dirty checking within a @Transactional context auto-persists modified entities.

---

### Performance Considerations

```java
/**
 * PERFORMANCE OPTIMIZATION STRATEGIES
 */

// Strategy 1: Use projections for read-only queries
// Returns only needed fields instead of full entity
@Query("SELECT new com.example.dto.UserProjection(u.id, u.name, u.email) FROM User u")
List<UserProjection> findAllProjection();

// Impact: Reduces memory usage and database load by 60-80% for large datasets

// Strategy 2: Use batch operations for bulk inserts/updates
List<User> users = createUsers(1000);
userRepository.saveAll(users);  // Batch insert instead of individual saves

// Impact: 100x faster than individual save() calls for large volumes

// Strategy 3: Use pagination for large result sets
Page<User> page = userRepository.findAll(PageRequest.of(0, 50));

// Impact: Reduces memory usage and response time dramatically
```

**Performance Metrics:**

| Approach             | Startup Time | Query Time   | Memory |
| -------------------- | ------------ | ------------ | ------ |
| Full entity load     | 100ms        | 500ms        | 50MB   |
| Lazy loading         | 100ms        | 2000ms (N+1) | 10MB   |
| Eager loading (JOIN) | 100ms        | 500ms        | 50MB   |
| Projections          | 100ms        | 50ms         | 1MB    |

---

### Security Considerations

```java
// Security Best Practice 1: Validate input in repository queries
// Never concatenate user input into queries
@Query("SELECT u FROM User u WHERE u.email = ?1")  // Parameterized - safe
List<User> findByEmail(String email);  // Prevents SQL injection

// Security Best Practice 2: Use DTOs to prevent data exposure
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    // Exclude sensitive fields like password hash
}

// Security Best Practice 3: Apply authorization at service layer
@Transactional
public User getUser(Long id) {
    User user = userRepository.findById(id).orElseThrow();
    // Check if current user has permission to view this user
    if (!currentUser.canView(user)) {
        throw new AccessDeniedException("Not allowed");
    }
    return user;
}
```

**Security Checklist:**

- [ ] Use parameterized queries only
- [ ] Validate all user inputs
- [ ] Return DTOs, not entities
- [ ] Apply authorization checks
- [ ] Audit sensitive operations
- [ ] Encrypt sensitive data at rest

---

## 7. Visual Representations 📊

### Diagram 1: Spring Data Architecture

```
┌─────────────────────────────────────────────────────┐
│              Spring Data Architecture               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Application Layer                                  │
│  ┌───────────────────────────────────────────┐    │
│  │ @Service Classes (Business Logic)         │    │
│  └────────────────┬────────────────────────┬─┘    │
│                   │                        │       │
│  Repository Layer │                        │       │
│  ┌───────────────────────┐  ┌──────────────▼──┐   │
│  │ JpaRepository         │  │ Custom          │   │
│  │ Interface             │  │ Repository      │   │
│  └────────────┬──────────┘  └────────┬────────┘   │
│               │                      │             │
│               └──────────┬───────────┘             │
│                          │                         │
│  Spring Data JPA Layer   │                         │
│  ┌──────────────────────────────────┐             │
│  │ SimpleJpaRepository (Generated)   │             │
│  │ - Implements CRUD                │             │
│  │ - Executes query methods          │             │
│  └──────────────┬───────────────────┘             │
│                 │                                 │
│  Hibernate ORM  │                                 │
│  ┌──────────────▼────────────────────┐           │
│  │ Converts entities to SQL           │           │
│  │ Manages persistence context        │           │
│  └──────────────┬─────────────────────┘           │
│                 │                                 │
│  JDBC Layer     │                                 │
│  ┌──────────────▼─────────────────────┐          │
│  │ Executes SQL statements on database│          │
│  └──────────────┬─────────────────────┘          │
│                 │                                 │
│  Database       ▼                                 │
│  ┌─────────────────────────────────────┐         │
│  │ MySQL / PostgreSQL / Oracle         │         │
│  └─────────────────────────────────────┘         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Diagram 2: Repository Method Name to SQL Conversion

```
Method Name                SQL Generated
──────────────────────────────────────────────────────

findByEmail(String email)
   │
   └──→ SELECT * FROM users WHERE email = ?


findByNameAndActive(String name, Boolean active)
   │
   └──→ SELECT * FROM users WHERE name = ? AND active = ?


findByNameContainingIgnoreCase(String name)
   │
   └──→ SELECT * FROM users WHERE LOWER(name) LIKE ?


findByAgeBetween(int min, int max)
   │
   └──→ SELECT * FROM users WHERE age BETWEEN ? AND ?


findByActive(Boolean active, Pageable pageable)
   │
   └──→ SELECT * FROM users WHERE active = ?
        LIMIT ? OFFSET ?
```

### Diagram 3: Query Method Keywords

```
             Keyword Combinations
┌──────────────────────────────────────────┐
│                                          │
│  findBy[Property]                        │
│  findBy[Prop1]And[Prop2]                │
│  findBy[Prop1]Or[Prop2]                 │
│                                          │
│  Comparisons:                            │
│  ├─ LessThan, LessThanEqual             │
│  ├─ GreaterThan, GreaterThanEqual       │
│  ├─ Between                              │
│  ├─ Contains, Containing                │
│  ├─ StartingWith, EndingWith            │
│  ├─ IsNull, IsNotNull                   │
│  └─ IgnoreCase                           │
│                                          │
│  Ordering:                               │
│  ├─ OrderByDescending                   │
│  └─ OrderByAscending                    │
│                                          │
│  Limiting:                               │
│  └─ First10, Top5                        │
│                                          │
└──────────────────────────────────────────┘
```

### Diagram 4: Entity Lifecycle

```
Not Persistent       Persistent       Detached
═══════════════      ════════════     ════════════

     User                 User              User
      │                    │                 │
      ├─new()         Managed by      └─ Transaction
      │                EntityManager      ends
      │                    │
      └─ save()────→ Persisted     ◄────────┘
                   in database

Removed/Deleted:
     User ──delete()──→ Removed from EntityManager
      │                     │
      └──→ No longer in     └──→ Still in DB until
          persistence           transaction
          context              commits
```

---

## 8. Practice Questions 📝

### Beginner Level

**Question 1: What is Spring Data?**

```
Q: What problem does Spring Data solve in database access?

A: Spring Data provides a consistent abstraction layer for data access across
different database technologies. It eliminates boilerplate JDBC/ORM code by
providing:
1. Repository interfaces with automatic CRUD operations
2. Query method generation from method names (conventions)
3. Support for multiple databases (MySQL, PostgreSQL, MongoDB, etc.)
4. Pagination, sorting, and custom queries
5. Automatic transaction management

Example benefit: Instead of writing 50 lines of JDBC code, you just need:
  interface UserRepository extends JpaRepository<User, Long> {}
```

**Question 2: What's the difference between CrudRepository and JpaRepository?**

```
Q: CrudRepository vs JpaRepository - which should I use?

A: JpaRepository extends CrudRepository and adds:
   - Batch operations: saveAll(), deleteInBatch()
   - Flush operations: flush(), saveAndFlush()
   - Pagination: findAll(Pageable)

Use JpaRepository as default. Use CrudRepository only if you specifically
need a smaller interface (e.g., read-only repositories).
```

**Question 3: Write a repository method to find users by name containing "John"**

```
Q: Create a query method that searches for users by partial name match

A:
List<User> findByNameContainingIgnoreCase(String name);

// Usage:
List<User> results = userRepository.findByNameContainingIgnoreCase("John");
// Returns all users with names like John, Johnny, Johnson, etc.
```

---

### Intermediate Level

**Question 4: What is the N+1 query problem and how do you solve it?**

```
Q: Explain N+1 queries and provide a solution

A: Problem:
   1 query: SELECT * FROM users (gets 100 users)
   N queries: SELECT * FROM orders WHERE user_id = ? (executed 100 times)
   Total: 101 queries instead of 1

Solution: Use JOIN FETCH to load relationships eagerly:

@Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.orders")
List<User> findAllWithOrders();

Now: 1 query with a JOIN loads everything at once
```

**Question 5: Implement pagination for user retrieval**

```
Q: Create a method that retrieves users in pages of 10, sorted by creation date

A:
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findByActive(Boolean active, Pageable pageable);
}

@Service
public class UserService {
    public Page<User> getUsersPage(int pageNumber) {
        Pageable pageable = PageRequest.of(
            pageNumber,           // 0-indexed
            10,                   // items per page
            Sort.Direction.DESC,
            "createdAt"
        );
        return userRepository.findByActive(true, pageable);
    }
}
```

**Question 6: Write a custom @Query using JPQL**

```
Q: Find all users created in the last 7 days who are active

A:
@Query("SELECT u FROM User u WHERE u.active = true " +
       "AND u.createdAt > CURRENT_TIMESTAMP - 7")
List<User> findRecentActiveUsers();

// Native SQL alternative:
@Query(value = "SELECT * FROM users WHERE active = true " +
               "AND created_at > NOW() - INTERVAL 7 DAY",
       nativeQuery = true)
List<User> findRecentActiveUsersNative();
```

---

### Advanced Level

**Question 7: Design a repository with custom implementation**

```
Q: Create a UserRepository with complex business logic that Spring Data can't handle

A:
// Custom repository interface
public interface UserRepositoryCustom {
    List<User> findActiveUsersBornAfter(LocalDate date);
    void deactivateUnusedAccounts();
}

// Implementation
@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> findActiveUsersBornAfter(LocalDate date) {
        return em.createQuery(
            "SELECT u FROM User u WHERE u.active = true AND u.birthDate > :date",
            User.class
        ).setParameter("date", date).getResultList();
    }

    @Override
    @Transactional
    public void deactivateUnusedAccounts() {
        em.createQuery("UPDATE User u SET u.active = false " +
                      "WHERE u.lastLogin < CURRENT_TIMESTAMP - 365")
          .executeUpdate();
    }
}

// Extend repository combining both
public interface UserRepository
    extends JpaRepository<User, Long>, UserRepositoryCustom {}
```

**Question 8: Optimize this query for performance**

```
Q: This endpoint is slow. How would you optimize it?

@GetMapping("/users")
public List<User> getAllUsers() {
    return userRepository.findAll();  // Slow!
}

A: Several optimizations:

1. Use Projections (load only needed fields):
   @Query("SELECT new com.example.UserDTO(u.id, u.name) FROM User u")
   List<UserDTO> getAllUsers();

2. Use Pagination:
   Page<User> users = userRepository.findAll(PageRequest.of(0, 50));

3. Add indexes:
   @Column
   @Index(name = "idx_status")
   private String status;

4. Use caching:
   @Cacheable("users")
   public List<User> getAllUsers() { ... }
```

---

## 🎯 Key Takeaways

1. ✅ **Spring Data eliminates boilerplate** - Use JpaRepository for automatic CRUD operations
2. ✅ **Method naming conventions** - Spring generates SQL from method names like `findByEmailAndActive()`
3. ✅ **Use @Query for complex queries** - When method names become too long or logic is complex
4. ✅ **Avoid N+1 queries** - Use JOIN FETCH or custom queries to load relationships
5. ✅ **Use DTOs in REST endpoints** - Prevent LazyInitializationException and data exposure
6. ✅ **Pagination matters** - Always paginate large result sets for performance

### Quick Reference

```java
// Basic CRUD
User user = userRepository.save(new User());          // Create/Update
Optional<User> user = userRepository.findById(1L);   // Read
userRepository.delete(user);                          // Delete
List<User> users = userRepository.findAll();         // Read All

// Method name queries
List<User> users = userRepository.findByEmail(email);
List<User> users = userRepository.findByNameAndActive(name, true);

// @Query
@Query("SELECT u FROM User u WHERE u.email = ?1")
List<User> findByEmail(String email);

// Pagination
Page<User> page = userRepository.findAll(PageRequest.of(0, 10));
```

---

## 📚 What's Next?

From this tutorial, you can proceed to:

- **Tutorial 25: Spring Data REST** - Auto-expose repositories as REST endpoints
- **Tutorial 30: Security Implementation** - Secure your data access layer
- **Tutorial 11: Configuration Management** - Configure multiple databases

---

## 🔗 References

- [Spring Data Official Documentation](https://spring.io/projects/spring-data)
- [Spring Data JPA API](https://docs.spring.io/spring-data/jpa/docs/current/api/)
- [Hibernate Documentation](https://hibernate.org/)
- [Query Methods Reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods-details)

---

## Changelog

- **2025-11-23**: Initial creation with 3 complete examples
- **Added**: Repository patterns, query methods, pagination examples
- **Added**: Common pitfalls and performance optimization strategies

**Congratulations! You now master Spring Data! 🎉**

_Practice the code examples and exercises before moving to the next tutorial._
