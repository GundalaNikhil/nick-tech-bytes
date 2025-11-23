# Tutorial 23: @RestController & REST Fundamentals in Spring Boot

## Understanding the Question

**Why does @RestController exist, and why is it different from @Controller?**

In traditional Spring MVC, controllers returned view names (like JSP pages), and you needed to manually convert domain objects to JSON using Jackson or another library. This created boilerplate: every handler method needed `@ResponseBody` annotations, and response type handling was manual.

Spring Boot introduced `@RestController` to **eliminate this boilerplate**. It's a **specialized controller for building REST APIs** where every method automatically returns JSON/XML instead of view names. This shift fundamentally changed how developers build web services in Spring.

## Core Concepts

### Understanding the Difference

```
Traditional Spring MVC:
@Controller
├── Returns view names (strings)
├── Requires @ResponseBody for JSON
├── View resolver converts names to JSP/Thymeleaf
└── Used for server-side rendering (SSR)

Spring REST:
@RestController
├── Returns domain objects directly
├── Automatically serializes to JSON
├── No view resolver needed
└── Used for API services
```

### @RestController Annotation Breakdown

```java
// @RestController is a convenience annotation that combines:
@Controller                    // Marks as component for DI
@ResponseBody                  // All methods return serialized response body
public class UserController {
  // This is equivalent to:

  // @Controller + @ResponseBody on each method
  @GetMapping("/users")
  public List<User> getUsers() {
    return userService.findAll();  // Automatically converted to JSON
  }
}
```

### HTTP Methods & RESTful Design

```
REST Principle: Use HTTP verbs for intentions

GET /api/users                 → Retrieve all users
GET /api/users/123             → Retrieve user by ID
POST /api/users                → Create new user
PUT /api/users/123             → Update entire user (replace)
PATCH /api/users/123           → Update partial user (modify)
DELETE /api/users/123          → Delete user

Key: The RESOURCE (users) stays the same; the HTTP VERB changes intent
```

### Response Status Codes & Semantics

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

  @GetMapping
  @ResponseStatus(HttpStatus.OK)        // 200 - Default for GET
  public List<User> getAllUsers() {
    return userService.findAll();
  }

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)        // 200
  public User getUser(@PathVariable Long id) {
    return userService.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(id));
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)   // 201 - New resource created
  public UserDTO createUser(@RequestBody CreateUserRequest request) {
    User created = userService.create(request);
    return userMapper.toDTO(created);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)        // 200 - Resource updated
  public UserDTO updateUser(
    @PathVariable Long id,
    @RequestBody UpdateUserRequest request) {
    User updated = userService.update(id, request);
    return userMapper.toDTO(updated);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT) // 204 - No response body
  public void deleteUser(@PathVariable Long id) {
    userService.delete(id);
    // Intentionally void - 204 shouldn't have body
  }
}
```

### Request Body Binding & Validation

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

  // Spring automatically:
  // 1. Reads request body JSON
  // 2. Maps to request class
  // 3. Validates constraints
  @PostMapping
  public UserDTO createUser(
    @RequestBody @Valid CreateUserRequest request,
    BindingResult bindingResult) {

    if (bindingResult.hasErrors()) {
      // Handle validation errors
    }

    return userService.create(request);
  }
}

@Data
@NoArgsConstructor
public class CreateUserRequest {

  @NotBlank(message = "Name cannot be blank")
  @Length(min = 2, max = 100)
  private String name;

  @Email(message = "Invalid email format")
  private String email;

  @Min(18)
  @Max(100)
  private Integer age;

  @Pattern(regexp = "^[+]?[0-9]{10,13}$")
  private String phone;
}
```

### Path Variables vs Query Parameters

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

  // Path variable: Part of resource identifier
  // /api/users/123 - getting specific user
  @GetMapping("/{id}")
  public UserDTO getUser(@PathVariable Long id) {
    return userService.findById(id)
      .map(userMapper::toDTO)
      .orElseThrow();
  }

  // Query parameters: Filtering/pagination options
  // /api/users?status=ACTIVE&page=0&size=10
  @GetMapping
  public Page<UserDTO> listUsers(
    @RequestParam(defaultValue = "") String status,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size) {

    return userService.findAll(status, PageRequest.of(page, size))
      .map(userMapper::toDTO);
  }

  // Mixed: /api/departments/5/users?role=ADMIN
  @GetMapping("/departments/{deptId}/users")
  public List<UserDTO> getDepartmentUsers(
    @PathVariable Long deptId,
    @RequestParam(required = false) String role) {

    return userService.findByDepartmentAndRole(deptId, role)
      .stream()
      .map(userMapper::toDTO)
      .toList();
  }
}
```

### Content Negotiation (JSON vs XML)

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

  // Spring automatically chooses format based on:
  // 1. Accept header in request
  // 2. Extension in URL (.json, .xml)
  // 3. Default (usually JSON)

  @GetMapping(
    value = "/{id}",
    produces = {"application/json", "application/xml"}
  )
  public User getUser(@PathVariable Long id) {
    return userService.findById(id).orElseThrow();
  }

  // This single method handles:
  // GET /api/users/123 (Accept: application/json)
  // GET /api/users/123 (Accept: application/xml)
  // GET /api/users/123.json
  // GET /api/users/123.xml
}

// Spring Boot configuration for XML support
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void configureContentNegotiation(
    ContentNegotiationConfigurer configurer) {

    configurer
      .defaultContentType(MediaType.APPLICATION_JSON)
      .mediaType("json", MediaType.APPLICATION_JSON)
      .mediaType("xml", MediaType.APPLICATION_XML);
  }
}
```

### Headers & Custom HTTP Headers

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

  // Reading custom headers
  @GetMapping("/{id}")
  public UserDTO getUser(
    @PathVariable Long id,
    @RequestHeader("X-API-Version") String apiVersion,
    @RequestHeader(value = "X-Correlation-ID", required = false) String correlationId) {

    System.out.println("API Version: " + apiVersion);
    System.out.println("Correlation ID: " + correlationId);

    return userService.findById(id).map(userMapper::toDTO).orElseThrow();
  }

  // Writing custom headers in response
  @PostMapping
  public ResponseEntity<UserDTO> createUser(
    @RequestBody @Valid CreateUserRequest request) {

    User created = userService.create(request);
    UserDTO dto = userMapper.toDTO(created);

    return ResponseEntity
      .created(URI.create("/api/users/" + created.getId()))
      .header("X-Created-Resource-ID", created.getId().toString())
      .header("X-Timestamp", LocalDateTime.now().toString())
      .body(dto);
  }
}
```

### ResponseEntity for Fine-Grained Control

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

  // Simple response (status inferred)
  @GetMapping
  public List<UserDTO> getAll() {
    return userService.findAll()
      .stream()
      .map(userMapper::toDTO)
      .toList();
  }

  // Complete control with ResponseEntity
  @PostMapping
  public ResponseEntity<UserDTO> create(
    @RequestBody @Valid CreateUserRequest request) {

    User created = userService.create(request);
    UserDTO dto = userMapper.toDTO(created);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .header("Location", "/api/users/" + created.getId())
      .body(dto);
  }

  // Conditional response
  @GetMapping("/{id}")
  public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
    return userService.findById(id)
      .map(user -> ResponseEntity.ok(userMapper.toDTO(user)))
      .orElse(ResponseEntity.notFound().build());
  }

  // Empty response with status
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
```

## Complete Implementation Examples

### Example 1: Basic CRUD REST API

```java
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

  private final ProductService productService;

  // GET /api/v1/products
  @GetMapping
  public List<ProductDTO> getAllProducts() {
    return productService.findAll()
      .stream()
      .map(this::toDTO)
      .toList();
  }

  // GET /api/v1/products/123
  @GetMapping("/{id}")
  public ProductDTO getProduct(@PathVariable Long id) {
    return productService.findById(id)
      .map(this::toDTO)
      .orElseThrow(() -> new ProductNotFoundException(id));
  }

  // POST /api/v1/products
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ProductDTO createProduct(@RequestBody @Valid CreateProductRequest request) {
    Product product = productService.create(request);
    return toDTO(product);
  }

  // PUT /api/v1/products/123
  @PutMapping("/{id}")
  public ProductDTO updateProduct(
    @PathVariable Long id,
    @RequestBody @Valid UpdateProductRequest request) {

    Product updated = productService.update(id, request);
    return toDTO(updated);
  }

  // DELETE /api/v1/products/123
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteProduct(@PathVariable Long id) {
    productService.delete(id);
  }

  private ProductDTO toDTO(Product product) {
    return new ProductDTO(
      product.getId(),
      product.getName(),
      product.getPrice(),
      product.getStock()
    );
  }
}

// Request/Response DTOs
@Data
@NoArgsConstructor
public class CreateProductRequest {
  @NotBlank
  private String name;

  @Positive
  private BigDecimal price;

  @PositiveOrZero
  private Integer stock;
}

@Data
@NoArgsConstructor
public class ProductDTO {
  private Long id;
  private String name;
  private BigDecimal price;
  private Integer stock;
}
```

### Example 2: Pagination & Filtering

```java
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

  private final OrderService orderService;

  // GET /api/v1/orders?status=PENDING&page=0&size=20&sort=createdDate,desc
  @GetMapping
  public Page<OrderDTO> searchOrders(
    @RequestParam(required = false) OrderStatus status,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "createdDate,desc") String[] sort) {

    // Parse sorting
    Sort.Order[] orders = new Sort.Order[sort.length];
    for (int i = 0; i < sort.length; i++) {
      String[] parts = sort[i].split(",");
      orders[i] = new Sort.Order(
        parts.length > 1 && parts[1].equals("desc")
          ? Sort.Direction.DESC
          : Sort.Direction.ASC,
        parts[0]
      );
    }

    Pageable pageable = PageRequest.of(page, size, Sort.by(orders));
    return orderService.search(status, pageable)
      .map(this::toDTO);
  }

  private OrderDTO toDTO(Order order) {
    return new OrderDTO(
      order.getId(),
      order.getCustomerId(),
      order.getStatus(),
      order.getTotal(),
      order.getCreatedDate()
    );
  }
}

@Data
public class OrderDTO {
  private Long id;
  private Long customerId;
  private OrderStatus status;
  private BigDecimal total;
  private LocalDateTime createdDate;
}
```

### Example 3: Error Handling with REST

```java
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/{id}")
  public UserDTO getUser(@PathVariable Long id) {
    // Don't catch exceptions - let global handler deal with it
    return userService.findById(id)
      .map(this::toDTO)
      .orElseThrow(() -> new UserNotFoundException(id));
  }
}

// Global error handling
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UserNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleUserNotFound(UserNotFoundException e) {
    return new ErrorResponse(
      "USER_NOT_FOUND",
      "User with ID " + e.getId() + " not found",
      LocalDateTime.now()
    );
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleValidationError(MethodArgumentNotValidException e) {
    String errors = e.getBindingResult()
      .getFieldErrors()
      .stream()
      .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
      .collect(Collectors.joining("; "));

    return new ErrorResponse(
      "VALIDATION_ERROR",
      errors,
      LocalDateTime.now()
    );
  }
}

@Data
public class ErrorResponse {
  private String code;
  private String message;
  private LocalDateTime timestamp;
}
```

## Best Practices

### ✅ DO

```java
// 1. Use proper HTTP status codes
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public UserDTO create(@RequestBody @Valid CreateUserRequest req) {
  return userService.create(req);
}

// 2. Use DTOs instead of exposing entities
@GetMapping("/{id}")
public UserDTO getUser(@PathVariable Long id) {
  return userService.findById(id)
    .map(userMapper::toDTO)
    .orElseThrow();
}

// 3. Use @Valid for input validation
@PostMapping
public UserDTO create(@RequestBody @Valid CreateUserRequest req) {
  return userService.create(req);
}

// 4. Return appropriate empty responses
@DeleteMapping("/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void delete(@PathVariable Long id) {
  userService.delete(id);
}

// 5. Use path variables for resource IDs
@GetMapping("/users/{userId}/orders/{orderId}")
public OrderDTO getOrder(@PathVariable Long userId, @PathVariable Long orderId) {
  return orderService.getOrder(userId, orderId);
}

// 6. Use @RestControllerAdvice for global error handling
@RestControllerAdvice
public class GlobalExceptionHandler {
  // Handle all controller exceptions here
}

// 7. Version your API
@RestController
@RequestMapping("/api/v1/users")
public class UserController { }

// 8. Use query parameters for filtering/pagination
@GetMapping
public Page<UserDTO> list(
  @RequestParam(required = false) String status,
  Pageable pageable) {
  return userService.search(status, pageable);
}
```

### ❌ DON'T

```java
// 1. Don't return entities directly (exposes internal structure)
@GetMapping("/{id}")
public User getUser(@PathVariable Long id) {  // WRONG!
  return userService.findById(id).orElseThrow();
}

// 2. Don't ignore validation errors
@PostMapping
public void create(@RequestBody CreateUserRequest req) {  // No @Valid!
  userService.create(req);
}

// 3. Don't use wrong status codes
@DeleteMapping("/{id}")
public void delete(@PathVariable Long id) {  // 200 OK instead of 204 No Content
  userService.delete(id);
}

// 4. Don't mix filtering logic in path
@GetMapping("/users/active")    // WRONG!
@GetMapping("/users?status=ACTIVE")  // Correct
public List<UserDTO> getActive() {
  return userService.findActive();
}

// 5. Don't return null
@GetMapping("/{id}")
public UserDTO getUser(@PathVariable Long id) {
  UserDTO user = userService.findById(id).map(this::toDTO).orElse(null);
  return user;  // Returns null! Client gets null in JSON
}

// 6. Don't catch and swallow exceptions
@GetMapping("/{id}")
public UserDTO getUser(@PathVariable Long id) {
  try {
    return userService.findById(id).map(this::toDTO).orElseThrow();
  } catch (Exception e) {
    return null;  // Hides the error!
  }
}

// 7. Don't use generic error messages
throw new RuntimeException("Error");  // WRONG!
throw new UserNotFoundException(id);  // Better

// 8. Don't ignore CORS issues (cross-origin requests)
@RestController
public class UserController {
  // Missing @CrossOrigin or WebConfig
}
```

## Advanced Topics

### Content Negotiation Strategies

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void configureContentNegotiation(
    ContentNegotiationConfigurer configurer) {

    configurer
      // Enable parameter-based negotiation
      .parameterName("format")
      .ignoreAcceptHeader(false)
      .useRegisteredExtensionsOnly(false)
      .defaultContentType(MediaType.APPLICATION_JSON)
      .mediaType("json", MediaType.APPLICATION_JSON)
      .mediaType("xml", MediaType.APPLICATION_XML);
  }
}

// Now supports:
// GET /api/users?format=xml
// GET /api/users.xml
// GET /api/users with Accept: application/xml
```

### Custom HttpMessageConverter

```java
@Configuration
public class WebConfig {

  @Bean
  public RestTemplate restTemplate(HttpMessageConverter customConverter) {
    RestTemplate template = new RestTemplate();
    template.getMessageConverters().add(customConverter);
    return template;
  }
}

// Custom converter for proprietary formats
public class CsvHttpMessageConverter extends AbstractHttpMessageConverter<Object> {

  public CsvHttpMessageConverter() {
    super(MediaType.valueOf("text/csv"));
  }

  @Override
  protected boolean supports(Class<?> clazz) {
    return List.class.isAssignableFrom(clazz);
  }

  @Override
  protected void writeInternal(Object object, HttpOutputMessage outputMessage)
    throws IOException, HttpMessageNotWritableException {

    List<?> list = (List<?>) object;
    StringBuilder csv = new StringBuilder();

    for (Object item : list) {
      // Convert item to CSV line
      csv.append(item).append("\n");
    }

    outputMessage.getBody().write(csv.toString().getBytes());
  }
}
```

### Async REST Controllers

```java
@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
public class ReportController {

  private final ReportService reportService;

  // Long-running operation returns immediately
  @PostMapping
  @ResponseStatus(HttpStatus.ACCEPTED)
  public ResponseEntity<Void> generateReport(
    @RequestBody GenerateReportRequest request) {

    reportService.generateAsync(request);

    return ResponseEntity
      .status(HttpStatus.ACCEPTED)
      .header("Location", "/api/v1/reports/status/" + request.getId())
      .build();
  }

  // Client polls this endpoint to check status
  @GetMapping("/status/{requestId}")
  public ReportStatusDTO getStatus(@PathVariable String requestId) {
    ReportStatus status = reportService.getStatus(requestId);
    return new ReportStatusDTO(status.getState(), status.getProgress());
  }
}
```

## Practice Questions & Answers

**Q1: What's the difference between @Controller and @RestController?**

A: `@Controller` returns view names and requires `@ResponseBody` on methods to return JSON. `@RestController` automatically serializes return values to JSON without needing `@ResponseBody`. Use `@RestController` for APIs, `@Controller` for server-side rendering (rare in Spring Boot).

**Q2: When should you return ResponseEntity vs a plain object?**

A: Return plain objects for simple cases where the default 200 OK status is fine. Use `ResponseEntity` when you need to:

- Set custom status codes (201, 204, etc.)
- Add custom headers
- Return different types based on conditions
- Build fluent response objects

**Q3: Path variables or query parameters: how to choose?**

A: Path variables identify the resource (`/users/123`). Query parameters modify how to fetch it (`?sort=name&page=1`). Rule: if it changes the resource identity, use path variables. If it changes filtering/sorting/pagination, use query parameters.

**Q4: How do you handle validation errors in REST APIs?**

A: Use `@Valid` on request bodies and let Spring's global exception handler (via `@RestControllerAdvice`) format the response. This centralizes error handling and ensures consistent error responses across all endpoints.

## Key Takeaways

1. **@RestController = @Controller + @ResponseBody**: Automatically serializes return values to JSON
2. **HTTP methods matter**: GET/POST/PUT/PATCH/DELETE indicate intent, URLs represent resources
3. **Status codes communicate state**: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found
4. **Request validation with @Valid**: Let Spring handle validation, catch in global exception handler
5. **DTOs protect your entities**: Never expose database entities; use transfer objects
6. **Path variables for identity, query params for options**: /users/123 vs /users?role=admin
7. **ResponseEntity for control**: Use when you need to customize status, headers, or body
8. **Global exception handling**: @RestControllerAdvice centralizes error responses
9. **Content negotiation**: Spring can return JSON, XML, or custom formats based on Accept header
10. **Async endpoints**: Return 202 Accepted for long operations, provide status endpoint
