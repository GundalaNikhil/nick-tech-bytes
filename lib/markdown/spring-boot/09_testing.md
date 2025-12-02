# Tutorial 09: Testing in Spring Boot 🧪

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Testing Pyramid](#testing-pyramid)
3. [Unit Testing](#unit-testing)
4. [Integration Testing](#integration-testing)
5. [End-to-End Testing](#end-to-end-testing)
6. [Test Data Management](#test-data-management)
7. [Best Practices](#best-practices)
8. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

Testing is not about proving your code works—it's about **detecting when it breaks**. The real questions are:

- How do you ensure code changes don't introduce bugs?
- How do you verify different components work together?
- How do you catch edge cases before production?
- What balance of tests gives you confidence without taking forever to run?

### The Cost of Not Testing

```
WITHOUT TESTS:
Requirements → Code → Manual Testing → Deploy → 🚨 Bug in Production

              Time to detect: Days/Weeks
              Time to fix: Hours
              Cost: Business impact, reputation, revenue loss
```

```
WITH PROPER TESTS:
Requirements → Code → Automated Tests → Deploy → ✅ Bugs caught before production

              Time to detect: Seconds
              Time to fix: Minutes
              Cost: Minimal - bug never reaches users
```

---

## Testing Pyramid

The **Testing Pyramid** shows the ideal distribution of tests by type:

```
             🔺
            / \
           /   \ ← Few (slow, expensive)
          /E2E  \
         /______\
        /        \
       /Integration\ ← Medium (moderate speed/cost)
      /____________\
     /              \
    / Unit Tests   \ ← Many (fast, cheap)
   /________________\

Ideal Ratio: 70% Unit : 20% Integration : 10% E2E
```

### Why This Pyramid?

| Type            | Speed     | Cost         | Coverage            | Maintenance |
| --------------- | --------- | ------------ | ------------------- | ----------- |
| **Unit**        | 🏃 Fast   | 💰 Cheap     | Single component    | ✅ Easy     |
| **Integration** | 🚶 Medium | 💵 Moderate  | Multiple components | ⚠️ Medium   |
| **E2E**         | 🐌 Slow   | 💸 Expensive | Full workflow       | ❌ Hard     |

---

## Unit Testing

### Principle: Test in Isolation

Unit tests verify a **single class** or **method** in isolation by mocking all dependencies.

```java
// UserService - the class we want to test
@Service
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public User createUser(CreateUserRequest request) {
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new InvalidInputException("email", "Email is required");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User", request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        // Send welcome email
        emailService.sendWelcomeEmail(savedUser.getEmail());

        return savedUser;
    }
}

// ✅ Unit Test - Fast, Isolated, No Database/Email
@ExtendWith(MockitoExtension.class)
class UserServiceUnitTest {

    // Mocks - Fake implementations of dependencies
    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private PasswordEncoder passwordEncoder;

    // System Under Test (SUT)
    @InjectMocks
    private UserService userService;

    /**
     * Test Case 1: Happy path - user created successfully
     */
    @Test
    void testCreateUser_Success() {
        // Given (Setup)
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("john@example.com");
        request.setPassword("password123");

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setEmail("john@example.com");
        savedUser.setPassword("hashed_password");

        // Mock the dependencies
        when(userRepository.existsByEmail("john@example.com"))
            .thenReturn(false);
        when(passwordEncoder.encode("password123"))
            .thenReturn("hashed_password");
        when(userRepository.save(any(User.class)))
            .thenReturn(savedUser);

        // When (Execute)
        User result = userService.createUser(request);

        // Then (Verify)
        assertThat(result.getEmail()).isEqualTo("john@example.com");

        // Verify dependencies were called correctly
        verify(userRepository).save(any(User.class));
        verify(emailService).sendWelcomeEmail("john@example.com");
        verify(passwordEncoder).encode("password123");
    }

    /**
     * Test Case 2: Invalid input - email required
     */
    @Test
    void testCreateUser_EmptyEmail_ThrowsException() {
        // Given
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail(""); // Invalid!
        request.setPassword("password123");

        // When & Then - Expect exception
        assertThatThrownBy(() -> userService.createUser(request))
            .isInstanceOf(InvalidInputException.class)
            .hasMessage("Invalid email: Email is required");

        // Verify repository was never called
        verify(userRepository, never()).save(any());
        verify(emailService, never()).sendWelcomeEmail(any());
    }

    /**
     * Test Case 3: Duplicate user - email already exists
     */
    @Test
    void testCreateUser_DuplicateEmail_ThrowsException() {
        // Given
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("existing@example.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail("existing@example.com"))
            .thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> userService.createUser(request))
            .isInstanceOf(DuplicateResourceException.class);

        // Email service should not be called for failed creation
        verify(emailService, never()).sendWelcomeEmail(any());
    }

    /**
     * Test Case 4: Edge case - password encoding failure
     */
    @Test
    void testCreateUser_PasswordEncodingFailure() {
        // Given
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("john@example.com");
        request.setPassword("password");

        when(userRepository.existsByEmail(any()))
            .thenReturn(false);
        when(passwordEncoder.encode(any()))
            .thenThrow(new RuntimeException("Encoding failed"));

        // When & Then
        assertThatThrownBy(() -> userService.createUser(request))
            .isInstanceOf(RuntimeException.class);

        verify(userRepository, never()).save(any());
    }
}
```

### Mocking vs. Stubbing

```java
@Test
void understandingMocks() {
    // STUBBING: Configure return values
    when(userRepository.findById(1L))
        .thenReturn(Optional.of(new User()));

    User user = userService.getUser(1L);

    // MOCKING: Verify interactions
    verify(userRepository).findById(1L); // Was this called?
    verify(userRepository, times(1)).findById(any()); // How many times?
    verify(userRepository, never()).save(any()); // Should NOT be called
}
```

### Argument Captors (Verify What Was Passed)

```java
@Test
void testArgumentCaptor() {
    CreateUserRequest request = new CreateUserRequest();
    request.setEmail("john@example.com");
    request.setPassword("password123");

    userService.createUser(request);

    // Capture what was passed to repository.save()
    ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
    verify(userRepository).save(userCaptor.capture());

    User capturedUser = userCaptor.getValue();
    assertThat(capturedUser.getEmail()).isEqualTo("john@example.com");
    assertThat(capturedUser.getPassword()).isNotEqualTo("password123"); // Should be encoded!
}
```

---

## Integration Testing

### Principle: Test Real Components Together

Integration tests use **real databases, real HTTP calls**, etc., but usually in a test environment.

```java
/**
 * Integration test - Uses real Spring context, real database
 * SLOWER than unit tests but MORE realistic
 */
@SpringBootTest  // Loads entire Spring context
@ActiveProfiles("test")  // Use test-specific configuration
class UserServiceIntegrationTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Uses a test database (H2, TestContainers, etc.)
    @Autowired
    private DataSource dataSource;

    /**
     * Before each test, clean up the database
     */
    @BeforeEach
    void setUp() {
        userRepository.deleteAll(); // Fresh start for each test
    }

    /**
     * Test with real database - data persists
     */
    @Test
    void testCreateUserAndRetrieve() {
        // Given
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("john@example.com");
        request.setPassword("password123");

        // When - Create user with real service
        User createdUser = userService.createUser(request);

        // Then - Verify it was really saved to database
        User retrievedUser = userRepository.findById(createdUser.getId()).orElse(null);
        assertThat(retrievedUser).isNotNull();
        assertThat(retrievedUser.getEmail()).isEqualTo("john@example.com");
    }

    /**
     * Test transaction rollback on error
     */
    @Test
    void testDuplicateUserRollback() {
        // Given - First user created successfully
        CreateUserRequest request1 = new CreateUserRequest();
        request1.setEmail("john@example.com");
        request1.setPassword("password123");
        userService.createUser(request1);

        // When - Try to create duplicate
        CreateUserRequest request2 = new CreateUserRequest();
        request2.setEmail("john@example.com");
        request2.setPassword("password456");

        assertThatThrownBy(() -> userService.createUser(request2))
            .isInstanceOf(DuplicateResourceException.class);

        // Then - Only one user in database (transaction rolled back)
        assertThat(userRepository.count()).isEqualTo(1);
    }

    /**
     * Test with database constraints
     */
    @Test
    void testPasswordEncoding_WithRealEncoder() {
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("john@example.com");
        request.setPassword("securePassword123!");

        User createdUser = userService.createUser(request);

        // Verify password was actually encoded
        assertThat(createdUser.getPassword())
            .isNotEqualTo("securePassword123!"); // Should be hashed

        // Verify encoded password can be validated
        assertThat(passwordEncoder.matches("securePassword123!", createdUser.getPassword()))
            .isTrue();
    }
}
```

### REST Controller Integration Testing

```java
/**
 * Test REST API endpoints with real HTTP
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    /**
     * Test creating user via HTTP POST
     */
    @Test
    void testCreateUserViaApi() {
        // Given
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail("john@example.com");
        request.setPassword("password123");

        // When - Make HTTP POST request
        ResponseEntity<User> response = restTemplate.postForEntity(
            "/api/users",
            request,
            User.class
        );

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getEmail()).isEqualTo("john@example.com");
    }

    /**
     * Test validation error response
     */
    @Test
    void testCreateUserWithInvalidData() {
        // Given - Invalid request (missing email)
        CreateUserRequest request = new CreateUserRequest();
        request.setPassword("password123");

        // When
        ResponseEntity<ErrorResponse> response = restTemplate.postForEntity(
            "/api/users",
            request,
            ErrorResponse.class
        );

        // Then - Should get 400 Bad Request
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().getErrorCode()).isEqualTo("VALIDATION_ERROR");
    }

    /**
     * Test GET endpoint with path variable
     */
    @Test
    void testGetUserById() {
        // Given - Create user first
        User user = new User();
        user.setEmail("john@example.com");
        User savedUser = userRepository.save(user);

        // When
        ResponseEntity<User> response = restTemplate.getForEntity(
            "/api/users/" + savedUser.getId(),
            User.class
        );

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getId()).isEqualTo(savedUser.getId());
    }

    /**
     * Test 404 error
     */
    @Test
    void testGetNonexistentUser() {
        ResponseEntity<ErrorResponse> response = restTemplate.getForEntity(
            "/api/users/999",
            ErrorResponse.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody().getErrorCode()).isEqualTo("RESOURCE_NOT_FOUND");
    }
}
```

### Using Testcontainers for Real Dependencies

```java
/**
 * Use real PostgreSQL container for testing
 * More realistic than H2, but slower
 */
@SpringBootTest
@Testcontainers
class UserServiceWithPostgresTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>()
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    void testWithRealPostgres() {
        User user = new User();
        user.setEmail("john@example.com");

        User saved = userRepository.save(user);

        User retrieved = userRepository.findById(saved.getId()).orElse(null);
        assertThat(retrieved).isNotNull();
    }
}
```

---

## End-to-End Testing

### Principle: Test Full User Workflows

E2E tests simulate **real user interactions** from start to finish.

```java
/**
 * E2E Test - Full workflow, real time (SLOW but REALISTIC)
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserRegistrationE2ETest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    /**
     * E2E Scenario: User signs up and logs in
     */
    @Test
    void testUserSignupAndLogin() {
        // Step 1: User signs up
        CreateUserRequest signupRequest = new CreateUserRequest();
        signupRequest.setEmail("newuser@example.com");
        signupRequest.setPassword("securePassword123!");
        signupRequest.setName("New User");

        ResponseEntity<User> signupResponse = restTemplate.postForEntity(
            "/api/auth/signup",
            signupRequest,
            User.class
        );

        assertThat(signupResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        User registeredUser = signupResponse.getBody();

        // Step 2: User attempts to log in
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("newuser@example.com");
        loginRequest.setPassword("securePassword123!");

        ResponseEntity<LoginResponse> loginResponse = restTemplate.postForEntity(
            "/api/auth/login",
            loginRequest,
            LoginResponse.class
        );

        assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        String token = loginResponse.getBody().getToken();

        // Step 3: User uses token to access protected resource
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<User> profileResponse = restTemplate.exchange(
            "/api/users/" + registeredUser.getId(),
            HttpMethod.GET,
            request,
            User.class
        );

        assertThat(profileResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(profileResponse.getBody().getEmail()).isEqualTo("newuser@example.com");
    }

    /**
     * E2E Scenario: Invalid login attempt
     */
    @Test
    void testLoginWithWrongPassword() {
        // Given - User already registered
        User user = new User();
        user.setEmail("existing@example.com");
        user.setPassword(new BCryptPasswordEncoder().encode("correctPassword"));
        userRepository.save(user);

        // When - Try to login with wrong password
        LoginRequest request = new LoginRequest();
        request.setEmail("existing@example.com");
        request.setPassword("wrongPassword");

        ResponseEntity<ErrorResponse> response = restTemplate.postForEntity(
            "/api/auth/login",
            request,
            ErrorResponse.class
        );

        // Then - Should fail
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(response.getBody().getErrorCode()).isEqualTo("INVALID_CREDENTIALS");
    }
}
```

---

## Test Data Management

### Approach 1: Builders and Factories

```java
/**
 * Factory for creating test users
 */
public class UserTestFactory {

    public static User createValidUser() {
        return createValidUser(UUID.randomUUID().toString() + "@example.com");
    }

    public static User createValidUser(String email) {
        User user = new User();
        user.setEmail(email);
        user.setPassword("hashedPassword123");
        user.setName("Test User");
        return user;
    }

    public static User createAdmin() {
        User user = createValidUser();
        user.setRole(Role.ADMIN);
        return user;
    }

    public static CreateUserRequest createValidCreateRequest() {
        CreateUserRequest request = new CreateUserRequest();
        request.setEmail(UUID.randomUUID().toString() + "@example.com");
        request.setPassword("securePassword123!");
        request.setName("Test User");
        return request;
    }
}

// Usage
@Test
void testWithFactory() {
    User user = UserTestFactory.createValidUser("john@example.com");
    User admin = UserTestFactory.createAdmin();
    CreateUserRequest request = UserTestFactory.createValidCreateRequest();
}
```

### Approach 2: Test Data Builders

```java
public class UserBuilder {

    private String email = UUID.randomUUID().toString() + "@example.com";
    private String password = "password";
    private String name = "Test User";
    private Role role = Role.USER;
    private boolean active = true;

    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public UserBuilder withAdmin() {
        this.role = Role.ADMIN;
        return this;
    }

    public User build() {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setRole(role);
        user.setActive(active);
        return user;
    }
}

// Usage - Very flexible
@Test
void testWithBuilder() {
    User standardUser = new UserBuilder().build();
    User johnDoe = new UserBuilder()
        .withEmail("john@example.com")
        .withAdmin()
        .build();
    User inactiveUser = new UserBuilder()
        .withEmail("inactive@example.com")
        .build(); // Add inactive property as needed
}
```

### Approach 3: Database Seeding with @Sql

```java
@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    /**
     * Load SQL file before this test
     */
    @Test
    @Sql("/test-data/users.sql")
    void testWithPredefinedData() {
        // Database now contains data from users.sql
        User user = userRepository.findByEmail("testuser@example.com").orElse(null);
        assertThat(user).isNotNull();
    }
}

// test-data/users.sql
INSERT INTO users (email, password, name, role) VALUES
('testuser@example.com', 'hashed_password', 'Test User', 'USER'),
('admin@example.com', 'hashed_password', 'Admin User', 'ADMIN');
```

---

## Best Practices

### ✅ DO: Follow AAA Pattern (Arrange-Act-Assert)

```java
@Test
void testUserCreation() {
    // ARRANGE - Set up test data
    CreateUserRequest request = new CreateUserRequest();
    request.setEmail("john@example.com");

    // ACT - Execute the code
    User result = userService.createUser(request);

    // ASSERT - Verify results
    assertThat(result.getEmail()).isEqualTo("john@example.com");
}
```

### ✅ DO: One Assert Per Test (Preferred)

```java
// ✅ Good - Tests one thing, easy to name
@Test
void testUserEmailSavedCorrectly() {
    User user = userService.createUser(request);
    assertThat(user.getEmail()).isEqualTo("john@example.com");
}

// ⚠️ Acceptable - Related assertions
@Test
void testUserCreatedWithAllFields() {
    User user = userService.createUser(request);
    assertThat(user.getEmail()).isEqualTo("john@example.com");
    assertThat(user.getName()).isEqualTo("John Doe");
    // Stops at first failure, so if email fails, we don't know about name
}
```

### ✅ DO: Use Descriptive Test Names

```java
// ✅ Good - Describes what's being tested and expected outcome
@Test
void testCreateUser_WithValidData_ReturnsUser() { }

@Test
void testCreateUser_WithDuplicateEmail_ThrowsException() { }

@Test
void testCreateUser_WithEmptyEmail_ThrowsValidationError() { }

// ❌ Bad - Too vague
@Test
void test1() { }

@Test
void testCreate() { }
```

### ❌ DON'T: Test Implementation Details

```java
// ❌ Bad - Tests how, not what
@Test
void testUserServiceCallsRepository() {
    userService.createUser(request);
    verify(userRepository).save(any()); // Testing implementation!
}

// ✅ Good - Tests behavior/outcome
@Test
void testUserCreatedSuccessfully() {
    User user = userService.createUser(request);
    assertThat(user).isNotNull();
    assertThat(user.getEmail()).isEqualTo("john@example.com");
}
```

### ✅ DO: Mock External Dependencies

```java
// ✅ Good - Email service is mocked (external, slow)
@Test
void testCreateUser() {
    when(emailService.sendWelcomeEmail(any())).thenReturn(true);

    userService.createUser(request); // Fast!

    verify(emailService).sendWelcomeEmail("john@example.com");
}

// ❌ Bad - Actually sends email during test!
@Test
void testCreateUser() {
    userService.createUser(request); // Slow, unreliable
}
```

### ✅ DO: Test Edge Cases and Error Paths

```java
@Test
void testCreateUser_NullEmail_ThrowsException() { }

@Test
void testCreateUser_BlankEmail_ThrowsException() { }

@Test
void testCreateUser_DuplicateEmail_ThrowsException() { }

@Test
void testCreateUser_VeryLongEmail_Handled() { }

@Test
void testCreateUser_SpecialCharactersInEmail_Handled() { }

@Test
void testCreateUser_RepositoryThrowsException_Propagated() { }
```

### Configuration for Tests

```java
/**
 * Test configuration - Overrides application.yml for tests
 */
@Configuration
public class TestConfig {

    // Use H2 database for tests instead of PostgreSQL
    @Bean
    @Primary
    public DataSource testDataSource() {
        return DataSourceBuilder.create()
            .driverClassName("org.h2.Driver")
            .url("jdbc:h2:mem:test")
            .build();
    }

    // Mock email service for tests
    @Bean
    @Primary
    public EmailService mockEmailService() {
        return mock(EmailService.class);
    }
}

// application-test.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
  jpa:
    hibernate:
      ddl-auto: create-drop
```

---

## Practice Questions

### Question 1: When Should You Write Unit vs Integration Tests?

**Q**: When is a unit test sufficient vs. when do you need integration tests?

**A**:

- **Unit test**: Test business logic, validation, calculations
- **Integration test**: Test database queries, transaction boundaries, real bean interactions

```java
// Unit test sufficient - pure logic
@Test
void testCalculateDiscount() {
    double discount = discountService.calculateDiscount(100, 0.1);
    assertThat(discount).isEqualTo(10);
}

// Integration test needed - involves database
@Test
void testSaveUserAndRetrieve() {
    userService.createUser(request);
    User retrieved = userRepository.findByEmail("john@example.com");
    // Needs real database and transaction boundaries
}
```

### Question 2: How Do You Test Async/Concurrent Code?

**Q**: How do you test code that uses threads or `CompletableFuture`?

**A**: Use `CompletableFuture.join()` or `CountDownLatch` to wait for completion:

```java
@Test
void testAsyncOperation() throws Exception {
    CompletableFuture<User> future = userService.createUserAsync(request);

    User user = future.join(); // Wait for completion (blocking)

    assertThat(user.getEmail()).isEqualTo("john@example.com");
}

// Or with CountDownLatch for more control
@Test
void testAsyncWithCountDownLatch() throws InterruptedException {
    CountDownLatch latch = new CountDownLatch(1);
    AtomicReference<User> userRef = new AtomicReference<>();

    userService.createUserAsync(request)
        .thenAccept(user -> {
            userRef.set(user);
            latch.countDown();
        });

    latch.await(5, TimeUnit.SECONDS);
    assertThat(userRef.get()).isNotNull();
}
```

### Question 3: How Do You Test Exception Handling?

**Q**: How do you verify that exceptions are thrown correctly?

**A**: Use `assertThatThrownBy` or `@Test(expected = ...)`:

```java
// Preferred - More flexible
@Test
void testExceptionThrown() {
    assertThatThrownBy(() -> userService.createUser(invalidRequest))
        .isInstanceOf(InvalidInputException.class)
        .hasMessage("Invalid email: Email is required");
}

// Alternative - Older style
@Test(expected = InvalidInputException.class)
void testExceptionThrown() {
    userService.createUser(invalidRequest);
}
```

### Question 4: What Tests Are Missing From Your Suite?

**Q**: How do you identify gaps in test coverage?

**A**: Use code coverage tools and check:

```
1. Happy path - Does it work when everything is normal?
2. Validation errors - What happens with bad input?
3. Database errors - What if DB is down?
4. External service failures - What if API times out?
5. Authorization - Can unauthorized users access resources?
6. Concurrency - Does it work with multiple threads?
7. Edge cases - Empty strings, null values, very large values?
```

---

## Key Takeaways

1. **Follow the Testing Pyramid**: 70% unit, 20% integration, 10% E2E
2. **Use mocks for unit tests**, real dependencies for integration tests
3. **Write descriptive test names** that describe what's tested and expected result
4. **Follow AAA pattern**: Arrange (setup), Act (execute), Assert (verify)
5. **Test behavior, not implementation** - Test what the code does, not how it does it
6. **Test edge cases and error paths** - Happy path alone isn't enough
7. **Mock external dependencies** (APIs, email, file system) to keep tests fast
8. **Use @SpringBootTest sparingly** - Only for real integration tests
9. **Keep tests simple and maintainable** - Tests should be easier to read than production code
10. **Run tests frequently** - Before every commit, in CI/CD pipeline
