/* Source: java_spring_boot_guide.pdf */
/* file citation: :contentReference[oaicite:1]{index=1} */

import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

/**
 * Large single-file dataset for Spring Boot interview Q&A + examples.
 * - Each question may include: text, points[], examples[] (code strings), note
 * - Keep examples as raw strings so frontend can render code blocks
 */

export const springBootQuestions: InterviewQuestionsMap["SpringBoot"] = {
  icon: "🚀",
  sections: [
    {
      title: "Spring Boot Fundamentals & Auto-configuration",
      questions: [
        {
          question: "What is Spring Boot and why use it?",
          answer: {
            text: "Spring Boot is an opinionated framework that simplifies creating production-ready, stand-alone Spring applications by providing starters, auto-configuration, and an embedded server to remove boilerplate setup.",
            points: [
              "Starters: `spring-boot-starter-*` bundles dependencies for features.",
              "Auto-configuration: automatically configures beans when conditions match.",
              "Embedded servers: package as executable JAR with embedded Tomcat/Jetty/Undertow.",
            ],
            examples: [
              `// Typical entry point
@SpringBootApplication
public class App {
  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }
}`,
            ],
          },
        },
        {
          question: "How does auto-configuration work?",
          answer: {
            text: "Auto-configuration scans META-INF (auto-config classes) and applies @Conditional annotations (e.g., @ConditionalOnClass, @ConditionalOnMissingBean). If conditions match, Spring registers the auto-configured beans.",
            points: [
              "spring.factories / auto-configuration classes provide candidates.",
              "Conditions evaluate classpath, beans, properties to decide bean creation.",
              "Override by defining your own bean or disabling auto-config class.",
            ],
            examples: [
              `// Example: Disable DataSource auto-config
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class App { ... }`,
            ],
          },
        },
        {
          question: "What are Starters?",
          answer: {
            text: "Starters are curated dependency groups (e.g., `spring-boot-starter-web`) that bring required libraries and matching versions for a feature.",
            points: [
              "Simplifies build configuration",
              "Examples: `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `spring-boot-starter-security`",
            ],
          },
        },
      ],
    },

    {
      title: "Application Startup & Environment",
      questions: [
        {
          question: "Describe the Spring Boot startup sequence",
          answer: {
            points: [
              "SpringApplication.run() triggers startup listeners (SpringApplicationRunListeners).",
              "Environment is prepared (properties, profiles).",
              "ApplicationContext (typically AnnotationConfigServletWebServerApplicationContext) is created.",
              "Configuration classes loaded; auto-configuration evaluated; beans instantiated.",
              "Embedded server started; ApplicationReadyEvent published.",
            ],
          },
        },
        {
          question: "Property / Environment loading order (precedence)",
          answer: {
            text: "Properties are loaded from multiple sources; later sources override earlier ones. Typical order: default properties, @PropertySource, application.properties/application.yml, OS env variables, command-line args (highest).",

            examples: [
              `# application.properties
spring.profiles.active=dev
server.port=8080
`,
            ],
          },
        },
        {
          question: "Profiles usage and @Profile",
          answer: {
            points: [
              'Use `@Profile("dev")` to activate beans only for certain environments.',
              "Activate via `spring.profiles.active` property or command line.",
            ],
            examples: [
              `@Configuration
@Profile("dev")
public class DevConfig { /* dev-only beans */ }`,
            ],
          },
        },
      ],
    },

    {
      title: "IoC Container & Bean Lifecycle",
      questions: [
        {
          question: "Explain the Spring bean lifecycle (major hooks)",
          answer: {
            points: [
              "Instantiation -> Dependency injection -> Aware callbacks (BeanNameAware, BeanFactoryAware) -> BeanPostProcessor.beforeInitialization -> @PostConstruct / InitializingBean.afterPropertiesSet -> BeanPostProcessor.afterInitialization -> Ready -> @PreDestroy / DisposableBean.destroy on shutdown",
            ],
            examples: [
              `@Component
public class Example implements InitializingBean, DisposableBean {
  @PostConstruct
  public void init() { }

  @Override
  public void afterPropertiesSet() throws Exception { }

  @PreDestroy
  public void cleanup() { }

  @Override
  public void destroy() throws Exception { }
}`,
            ],
          },
        },
        {
          question: "Constructor vs Setter vs Field injection (pros/cons)",
          answer: {
            points: [
              "Constructor: preferred for immutability and required dependencies; enables final fields.",
              "Setter: allows optional dependencies; makes bean mutable.",
              "Field: concise but harder to unit-test and cannot use final; requires reflection for testing.",
              "Resolution: @Primary, @Qualifier, then name-matching if ambiguity.",
            ],
            examples: [
              `// Constructor injection (preferred)
@Component
public class ServiceA { 
  private final Repo repo;
  public ServiceA(Repo repo) { this.repo = repo; }
}`,
            ],
          },
        },
        {
          question: "How does Spring handle circular dependencies?",
          answer: {
            text: "Constructor-based circular dependencies fail (BeanCurrentlyInCreationException). Setter/field injection may be resolved using early references (three-level cache). Recommended fixes: refactor to remove circularity, introduce a third mediator, or use @Lazy.",
            examples: [
              `// Avoid: A -> B constructor, B -> A constructor => fail
// Use: refactor or @Lazy on one dependency
@Component
public class A {
  private final B b;
  public A(@Lazy B b) { this.b = b; }
}`,
            ],
          },
        },
      ],
    },

    {
      title: "Actuator, Metrics & Monitoring",
      questions: [
        {
          question: "What is Spring Boot Actuator?",
          answer: {
            points: [
              "Actuator exposes operational endpoints like /health, /info, /metrics.",
              "Integrates with Micrometer for metrics export (Prometheus, Graphite).",
              "Useful for health checks, runtime introspection, and monitoring.",
            ],
            examples: [
              `# enable endpoints in application.properties
management.endpoints.web.exposure.include=health,info,metrics
`,
            ],
          },
        },
        {
          question: "Key metrics to monitor in production",
          answer: {
            points: [
              "JVM: heap usage, GC pauses, thread counts",
              "HTTP: request rate, latencies, error rates",
              "DB: connection pool (HikariCP) active/idle/total, wait times",
            ],
            examples: [
              `# Example Micrometer config (expose Prometheus endpoint)
management.endpoints.web.exposure.include=prometheus,health,metrics
management.metrics.export.prometheus.enabled=true
`,
            ],
          },
        },
      ],
    },

    {
      title: "Data Layer - Spring Data JPA & Transactions",
      questions: [
        {
          question: "Spring Data JPA building blocks & entity lifecycle",
          answer: {
            points: [
              "Repository: interfaces like JpaRepository provide CRUD & query derivation.",
              "EntityManager: persistence context managing entity states.",
              "Entity states: transient, managed (persistent), detached, removed.",
            ],
            examples: [
              `@Entity
public class User {
  @Id @GeneratedValue Long id;
  String name;
}

public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByName(String name);
}`,
            ],
          },
        },
        {
          question:
            "Lazy vs Eager loading and how to avoid LazyInitializationException",
          answer: {
            text: "EAGER fetch retrieves associations immediately (risk of overfetch). LAZY fetch loads associations on access and can cause LazyInitializationException if accessed outside a transactional persistence context.",
            points: [
              "Fixes: use @Transactional, JOIN FETCH in queries, DTO projections, or EntityGraphs.",
            ],
            examples: [
              `// JPQL join fetch
@Query("select u from User u join fetch u.address where u.id = :id")
Optional<User> findWithAddress(@Param("id") Long id);`,
            ],
          },
        },
        {
          question: "Transaction propagation behaviors (with examples)",
          answer: {
            points: [
              "REQUIRED: join existing or create new (default).",
              "REQUIRES_NEW: always create new independent transaction.",
              "SUPPORTS: run within existing transaction or non-transactionally if none.",
              "NOT_SUPPORTED: run non-transactionally, suspends existing transaction.",
            ],
            examples: [
              `@Service
public class AccountService {
  @Transactional(propagation = Propagation.REQUIRED)
  public void transfer(...) { ... }

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void audit(...) { ... }
}`,
            ],
          },
        },
        {
          question: "Common JPA pitfalls (N+1, LIE) and solutions",
          answer: {
            points: [
              "N+1: caused by lazy loading in loops — use JOIN FETCH, @BatchSize, or projections.",
              "LazyInitializationException: ensure transactional scope or fetch eagerly where appropriate.",
            ],
            examples: [
              `// N+1 fix with JOIN FETCH
@Query("select p from Parent p join fetch p.children where p.id in :ids")
List<Parent> findParentsWithChildren(@Param("ids") List<Long> ids);`,
            ],
          },
        },
      ],
    },

    {
      title: "Connection Pooling (HikariCP)",
      questions: [
        {
          question: "Why tune HikariCP and which metrics matter?",
          answer: {
            points: [
              "Tune max pool size and connection timeout according to DB capacity and app load.",
              "Monitor: active, idle, total, wait time, and usage time.",
            ],
            examples: [
              `# application.properties
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.connection-timeout=30000`,
            ],
          },
        },
      ],
    },

    {
      title: "Spring Security & JWT",
      questions: [
        {
          question:
            "How does Spring Security tie into the request filter chain?",
          answer: {
            points: [
              "Spring Security registers a SecurityFilterChain in the servlet filter chain. Filters perform authentication/authorization and populate SecurityContext with Authentication principal.",
            ],
            examples: [
              `// Modern SecurityFilterChain bean (no WebSecurityConfigurerAdapter)
@Configuration
public class SecurityConfig {
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .authorizeRequests().antMatchers("/api/public").permitAll()
        .anyRequest().authenticated();
    return http.build();
  }
}`,
            ],
          },
        },
        {
          question: "JWT authentication flow (step-by-step)",
          answer: {
            points: [
              "Client posts credentials to /login; server validates and issues signed JWT containing user id, roles, expiry.",
              "Client sends Authorization: Bearer <token> on subsequent requests.",
              "A JWT filter validates token, loads user details, and sets Authentication in SecurityContext.",
            ],
            examples: [
              `// Simple OncePerRequestFilter skeleton for JWT
public class JwtFilter extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
    String header = req.getHeader("Authorization");
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      // validate token, create Authentication, set SecurityContext
    }
    chain.doFilter(req, res);
  }
}`,
            ],
          },
        },
        {
          question: "CSRF, CORS and password storage best practices",
          answer: {
            points: [
              "CSRF: enabled by default for stateful apps. For stateless JWT APIs normally disable (`csrf().disable()`), but consider alternatives like SameSite cookies for web clients.",
              "CORS: configure via WebMvcConfigurer or `@CrossOrigin`—avoid wide open policies in production.",
              "Passwords: always store hashed (BCrypt recommended; Argon2/Scrypt strong alternatives).",
            ],
            examples: [
              `// BCrypt usage
@Bean
public PasswordEncoder passwordEncoder() {
  return new BCryptPasswordEncoder();
}`,
            ],
          },
        },
      ],
    },

    {
      title: "Global Exception Handling & Validation",
      questions: [
        {
          question: "How to implement centralized exception handling?",
          answer: {
            text: "Use `@ControllerAdvice` / `@RestControllerAdvice` with `@ExceptionHandler` methods to handle exceptions globally and return standardized ErrorResponse DTOs.",
            examples: [
              `@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException ex) {
    ErrorResponse err = new ErrorResponse(Instant.now(), 404, "Not Found", ex.getMessage(), "/path");
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
  }
}`,
              `public record ErrorResponse(Instant timestamp, int status, String error, String message, String path) {}`,
            ],
          },
        },
        {
          question: "How to validate request payloads",
          answer: {
            points: [
              "Use Bean Validation (JSR-380) annotations: @NotNull, @Size, @Min, @Max, etc.",
              "Use `@Valid` or `@Validated` on controller method arguments and optionally inspect `BindingResult`.",
            ],
            examples: [
              `@PostMapping("/users")
public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserDto dto, BindingResult br) {
  if (br.hasErrors()) { /* collect and return errors */ }
  ...
}`,
            ],
          },
        },
      ],
    },

    {
      title: "Concurrency & Threading (Spring context)",
      questions: [
        {
          question: "How to run async tasks in Spring?",
          answer: {
            points: [
              "Use `@EnableAsync` + `@Async` to run methods asynchronously with an Executor.",
              "For scheduled tasks use `@EnableScheduling` + `@Scheduled` or use a ScheduledExecutorService.",
              "Use `CompletableFuture` to compose async flows and handle exceptions.",
            ],
            examples: [
              `@Configuration
@EnableAsync
public class AsyncConfig {
  @Bean
  public Executor taskExecutor() { return Executors.newFixedThreadPool(10); }
}

@Service
public class EmailService {
  @Async
  public CompletableFuture<Void> sendEmail(...) { ... }
}`,
            ],
          },
        },
        {
          question: "Common concurrency bugs and mitigation",
          answer: {
            points: [
              "Deadlocks: avoid inconsistent lock ordering, use tryLock with timeout.",
              "Race conditions: protect shared mutable state with synchronized/Locks/Atomics.",
              "Visibility issues: volatile or synchronization ensure visibility between threads.",
            ],
            examples: [
              `// Use AtomicInteger for counters
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();`,
            ],
          },
        },
      ],
    },

    {
      title: "Collections, Streams & Java 8+ features",
      questions: [
        {
          question: "Streams: pipeline stages and common patterns",
          answer: {
            points: [
              "Streams: Source -> Intermediate (lazy) -> Terminal (eager).",
              "Avoid parallel streams for I/O or shared mutable state; prefer when CPU-bound and stateless ops.",
            ],
            examples: [
              `// example one-liner
List<String> names = users.stream()
  .filter(u -> u.isActive())
  .map(User::getName)
  .collect(Collectors.toList());`,
            ],
          },
        },
        {
          question: "Functional interfaces examples",
          answer: {
            points: [
              "Predicate<T>, Function<T,R>, Consumer<T>, Supplier<T>, UnaryOperator<T>, BinaryOperator<T>",
            ],
            examples: [
              `Predicate<String> p = s -> s.length() > 3;
Function<String, Integer> f = String::length;`,
            ],
          },
        },
      ],
    },

    {
      title: "Microservices, Spring Cloud & Integration",
      questions: [
        {
          question: "Common Spring Cloud components and roles",
          answer: {
            points: [
              "Feign: Declarative REST client.",
              "Eureka: Service discovery registry.",
              "Config Server: Centralized configuration for environments.",
              "Gateway: API entry point for routing, security, rate-limiting.",
            ],
            examples: [
              `@FeignClient(name = "users-service")
public interface UserClient { @GetMapping("/users/{id}") UserDto getUser(@PathVariable("id") Long id); }`,
            ],
          },
        },
        {
          question: "API Gateway responsibilities",
          answer: {
            points: [
              "Routing, authentication/authorization, rate-limiting, monitoring and acting as a single edge for clients.",
            ],
          },
        },
      ],
    },

    {
      title: "Production Readiness & Best Practices",
      questions: [
        {
          question: "What steps make Spring Boot apps production ready?",
          answer: {
            points: [
              "Externalize configuration and use profiles.",
              "Expose health checks & metrics via Actuator and integrate with Prometheus/Grafana.",
              "Structured centralized logs (JSON) and log aggregation (ELK/EFK).",
              "Containerize apps (Docker), fine-tune HikariCP, use proper JVM/Garbage Collector flags.",
              "Keep dependencies up-to-date and secure actuator endpoints.",
            ],
            examples: [
              `# Example Dockerfile
FROM eclipse-temurin:17-jdk-jammy
ARG JAR_FILE=target/app.jar
COPY JAR_FILE app.jar
ENTRYPOINT ["java","-jar","/app.jar"]`,
            ],
          },
        },
        {
          question: "Logging & HTTP status best practices",
          answer: {
            points: [
              "Log exceptions at handling point (ControllerAdvice) at WARN/ERROR levels; avoid duplicate logging.",
              "Return correct HTTP statuses: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error).",
            ],
            examples: [
              `// In ControllerAdvice: return ResponseEntity with appropriate HttpStatus`,
            ],
          },
        },
      ],
    },

    {
      title: "Design, Architecture & Patterns",
      questions: [
        {
          question: "Typical layered architecture for Spring Boot",
          answer: {
            text: "Controller -> Service -> Repository -> Entity is the common layered pattern. Controller handles requests, Service contains business logic and transactions, Repository interacts with DB, Entity models domain.",
            points: [
              "Services orchestrate transactions and call repositories.",
              "Entities are plain POJOs annotated with @Entity.",
            ],
            examples: [
              `@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService service;
  public UserController(UserService service) { this.service = service; }

  @GetMapping("/{id}")
  public UserDto get(@PathVariable Long id) { return service.get(id); }
}`,
            ],
          },
        },
        {
          question: "Common anti-patterns (and fixes)",
          answer: {
            points: [
              "Fat controllers: move logic to services.",
              "Entity leakage: avoid returning JPA entities directly to clients — use DTOs.",
              "Transaction mismanagement: keep transactions at service layer and short-lived.",
            ],
          },
        },
      ],
    },

    {
      title: "Practical Interview One-liners & 1-minute explanation",
      questions: [
        {
          question:
            "Give a 1-minute explanation of Spring Boot (for interviews)",
          answer: {
            text: "Spring Boot is an opinionated Spring framework that reduces configuration overhead by providing starters, auto-configuration, and an embedded server. It lets developers bootstrap production-ready apps quickly while still allowing fine-grained control when needed.",
          },
        },
      ],
    },
  ],
};

/** Resources section — links & key topics */
export const springBootResources: InterviewResourcesMap["SpringBoot"] = {
  icon: "🚀",
  resources: [
    {
      title: "Official Spring Boot (project page & docs)",
      description:
        "Primary reference for Spring Boot, starters, auto-configuration, Actuator, and guides.",
      url: "https://spring.io/projects/spring-boot",
      type: "Free",
    },
    {
      title: "Spring Framework Reference Documentation",
      description: "In-depth Spring core docs (IoC, AOP, context, web).",
      url: "https://docs.spring.io/spring-framework/docs/current/reference/html/",
      type: "Free",
    },
    {
      title: "Baeldung - Spring Guides and Examples",
      description:
        "Hands-on articles and practical examples for Spring Boot, JPA, and Security.",
      url: "https://www.baeldung.com/",
      type: "Free/Paid",
    },
    {
      title: "Micrometer & Prometheus Integration",
      description:
        "Guide to expose metrics from Spring Boot via Micrometer for Prometheus scraping.",
      url: "https://micrometer.io/docs",
      type: "Free",
    },
  ],
  keyTopics: [
    "Auto-configuration & Starters",
    "Application startup & Environment",
    "IoC & Bean lifecycle",
    "Actuator & Metrics",
    "Spring Data JPA & Transactions",
    "Security (filter chain, JWT)",
    "Concurrency & Executors",
    "Microservices & Spring Cloud",
    "Production readiness (monitoring, logging, containerization)",
  ],
};
