# Tutorial 28: Profiles Management - Advanced Techniques

## Understanding the Question

**Why do we need profiles beyond simple dev/test/prod?**

Basic profile knowledge: application-dev.yml, application-test.yml, application-prod.yml. But real applications need:

- Multiple environments (dev, staging, production, canary)
- Feature flags that change behavior
- Conditional bean registration based on environment
- Complex multi-tenant scenarios
- Database vs in-memory switching
- External service mocking by environment

Advanced profiles go beyond simple configuration files into **conditional bean creation, complex environment scenarios, and production-ready multi-environment management**.

## Core Concepts

### Profile Hierarchy & Resolution

```
Spring Boot Profile Resolution Order:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. command line: spring.profiles.active=prod
2. System property: -Dspring.profiles.active=prod
3. Environment variable: SPRING_PROFILES_ACTIVE=prod
4. application.properties: spring.profiles.active=prod
5. application.yml: spring.profiles.active=prod

Default profile (if none specified): "default"

Active profiles stack:
spring.profiles.active=prod
spring.profiles.include=auth,metrics
Results in profiles: [prod, auth, metrics]
```

### Understanding Profile-Specific Files

```
Project structure:
src/main/resources/
├── application.yml                  # Base config (all profiles)
├── application-dev.yml              # Dev profile
├── application-test.yml             # Test profile
├── application-prod.yml             # Production profile
├── application-staging.yml          # Staging profile
├── application-local.yml            # Local development
├── application-auth.yml             # Auth feature profile
├── application-metrics.yml          # Metrics feature profile
└── config/
    ├── dev/
    │   ├── application.yml          # Alternative location
    │   └── logback-spring.xml
    └── prod/
        └── logback-spring.xml

Loading order (last wins):
1. application.yml (base)
2. application-{profile}.yml (merged on top)
3. application-{profile}-{sub}.yml (if specified)

Composition with include:
spring:
  profiles:
    include: auth,metrics,logging
# Loads: app.yml + app-prod.yml + app-auth.yml + app-metrics.yml + app-logging.yml
```

### Conditional Bean Registration with Profiles

```java
@Configuration
public class DatabaseConfiguration {

  // Only create this bean in 'prod' profile
  @Bean
  @Profile("prod")
  public DataSource productionDataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl(System.getenv("DB_URL"));
    config.setUsername(System.getenv("DB_USER"));
    config.setPassword(System.getenv("DB_PASSWORD"));
    config.setMaximumPoolSize(20);
    return new HikariDataSource(config);
  }

  // Only in 'dev' profile - simpler configuration
  @Bean
  @Profile("dev")
  public DataSource developmentDataSource() {
    EmbeddedDatabaseBuilder builder = new EmbeddedDatabaseBuilder();
    return builder
      .setType(EmbeddedDatabaseType.H2)
      .addScript("schema.sql")
      .addScript("data.sql")
      .build();
  }

  // Only in 'test' profile
  @Bean
  @Profile("test")
  public DataSource testDataSource() {
    return new EmbeddedDatabase() { /* H2 in-memory */ };
  }
}

// Activate with:
// --spring.profiles.active=prod
// -Dspring.profiles.active=dev
// or in application.yml: spring.profiles.active: dev
```

### Complex Profile Expressions

```java
@Configuration
public class FeatureConfiguration {

  // Only activate if BOTH prod AND auth profiles are active
  @Bean
  @Profile({"prod", "auth"})
  public OAuthSecurityProvider oauthProvider() {
    return new OAuthSecurityProvider();
  }

  // Activate if prod OR staging (not dev/test)
  @Bean
  @Profile({"prod", "staging"})
  public MetricsCollector metricsCollector() {
    return new MetricsCollector();
  }

  // Activate if profile is NOT 'dev'
  @Bean
  @Profile("!dev")
  public SecurityAuditor auditProvider() {
    return new SecurityAuditor();
  }

  // Complex: (prod OR staging) AND auth AND NOT local
  @Bean
  @Profile({"!local", "!dev"})
  public ExternalServiceClient externalClient() {
    return new ExternalServiceClient();
  }
}

// More flexible approach using @ConditionalOnProperty:
@Configuration
public class CachingConfiguration {

  // Enable only if feature flag is true
  @Bean
  @ConditionalOnProperty(
    name = "feature.caching.enabled",
    havingValue = "true",
    matchIfMissing = false
  )
  public CacheManager cacheManager() {
    return new RedisCacheManager();
  }
}
```

### Multi-Environment Configuration Strategy

```yaml
# application.yml (shared base configuration)
spring:
  application:
    name: my-app
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate

logging:
  level:
    root: INFO

app:
  version: 1.0.0
  name: My Application

---
# application-dev.yml
spring:
  profiles: dev
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: create-drop
  h2:
    console:
      enabled: true

logging:
  level:
    root: DEBUG
    com.mycompany: TRACE

  pattern:
    console: "%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"

app:
  environment: development
  debug: true

---
# application-prod.yml
spring:
  profiles: prod
  jpa:
    hibernate:
      ddl-auto: validate
  datasource:
    url: ${DB_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5

logging:
  level:
    root: WARN
    com.mycompany: INFO

  file:
    name: /var/log/myapp/app.log
    max-size: 100MB
    max-history: 30

app:
  environment: production
  debug: false

---
# application-staging.yml
spring:
  profiles: staging
  datasource:
    url: ${STAGING_DB_URL}

logging:
  level:
    root: INFO

app:
  environment: staging
```

### Multi-Tenant Profiles

```java
// application.yml
spring:
  profiles:
    active: tenant-a

---
# application-tenant-a.yml
spring:
  datasource:
    url: jdbc:mysql://tenant-a-db/schema_a
    username: ${TENANT_A_USER}
    password: ${TENANT_A_PASSWORD}

tenant:
  id: a
  name: "Tenant A"
  features:
    advanced-analytics: true
    custom-branding: true

---
# application-tenant-b.yml
spring:
  datasource:
    url: jdbc:mysql://tenant-b-db/schema_b
    username: ${TENANT_B_USER}
    password: ${TENANT_B_PASSWORD}

tenant:
  id: b
  name: "Tenant B"
  features:
    advanced-analytics: false
    custom-branding: false

@Configuration
@Profile({"tenant-a", "tenant-b"})
public class MultiTenantConfiguration {

  @Bean
  public TenantContext tenantContext(@Value("${tenant.id}") String tenantId) {
    return new TenantContext(tenantId);
  }
}
```

### Conditional Bean Registration Without @Profile

```java
@Configuration
public class DynamicConfiguration {

  // Enable cache only if redis is on classpath AND configured
  @Bean
  @ConditionalOnClass(RedisConnectionFactory.class)
  @ConditionalOnProperty(
    name = "redis.enabled",
    havingValue = "true"
  )
  public CacheManager cacheManager(RedisConnectionFactory factory) {
    return new RedisCacheManager(factory);
  }

  // Fall back to simple cache if redis not available
  @Bean
  @ConditionalOnMissingBean(CacheManager.class)
  public CacheManager simpleCache() {
    return new ConcurrentMapCacheManager("default");
  }

  // Enable metrics export only if spring-boot-actuator present
  @Bean
  @ConditionalOnClass(name = "io.micrometer.core.instrument.MeterRegistry")
  public MetricsExporter metricsExporter() {
    return new MetricsExporter();
  }
}
```

## Complete Implementation Examples

### Example 1: Complete Multi-Environment Setup

```java
// Configuration base class
@Configuration
public class DatabaseConfiguration {

  @Bean
  @Profile("prod")
  public DataSource productionDataSource(
    @Value("${spring.datasource.url}") String url,
    @Value("${spring.datasource.username}") String user,
    @Value("${spring.datasource.password}") String password,
    @Value("${spring.datasource.hikari.maximum-pool-size:20}") int maxPool) {

    HikariConfig config = new HikariConfig();
    config.setJdbcUrl(url);
    config.setUsername(user);
    config.setPassword(password);
    config.setMaximumPoolSize(maxPool);
    config.setMinimumIdle(5);
    config.setConnectionTimeout(30000);
    config.setIdleTimeout(600000);
    config.setMaxLifetime(1800000);
    config.setAutoCommit(true);
    config.setLeakDetectionThreshold(60000);

    return new HikariDataSource(config);
  }

  @Bean
  @Profile("staging")
  public DataSource stagingDataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl(System.getenv("STAGING_DB_URL"));
    config.setUsername(System.getenv("STAGING_DB_USER"));
    config.setPassword(System.getenv("STAGING_DB_PASSWORD"));
    config.setMaximumPoolSize(10);
    config.setLeakDetectionThreshold(60000);

    return new HikariDataSource(config);
  }

  @Bean
  @Profile({"dev", "test"})
  public DataSource testDataSource() {
    return new EmbeddedDatabaseBuilder()
      .setType(EmbeddedDatabaseType.H2)
      .addScript("classpath:schema.sql")
      .addScript("classpath:data-" + activeProfile() + ".sql")
      .build();
  }

  private String activeProfile() {
    return System.getProperty("spring.profiles.active", "dev");
  }
}

// Logging configuration
@Configuration
public class LoggingConfiguration {

  @Bean
  @Profile("prod")
  public JsonPatternLayoutFactory productionLogging() {
    return new JsonPatternLayoutFactory(
      "timestamp,level,thread,logger,message",
      "json"
    );
  }

  @Bean
  @Profile("dev")
  public SimplePatternLayoutFactory devLogging() {
    return new SimplePatternLayoutFactory(
      "%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
    );
  }
}

// Feature flags by profile
@Configuration
public class FeatureConfiguration {

  @Bean
  @Profile({"!prod"})
  public DebugModeService debugMode() {
    return new DebugModeService();
  }

  @Bean
  @Profile("prod")
  public SecurityAuditService auditService() {
    return new SecurityAuditService();
  }

  @Bean
  @ConditionalOnProperty(
    name = "feature.advanced-search.enabled",
    havingValue = "true"
  )
  public AdvancedSearchService advancedSearch() {
    return new AdvancedSearchService();
  }
}

// External service clients by environment
@Configuration
public class ExternalServiceConfiguration {

  @Bean
  @Profile("prod")
  public PaymentGateway livePaymentGateway(
    @Value("${payment.api-key}") String apiKey) {
    return new StripePaymentGateway(apiKey);
  }

  @Bean
  @Profile({"dev", "test"})
  public PaymentGateway mockPaymentGateway() {
    return new MockPaymentGateway();
  }
}
```

### Example 2: Testing Multiple Profiles

```java
// Test with specific profile
@SpringBootTest(properties = "spring.profiles.active=test")
public class TestProfileIntegrationTest {

  @Autowired
  private DataSource dataSource;

  @Test
  public void shouldUseH2InMemoryDatabase() {
    // Verify H2 database is used
    assertThat(dataSource).isInstanceOf(EmbeddedDatabase.class);
  }
}

// Test multiple profiles
@SpringBootTest
@ActiveProfiles({"prod", "auth"})
public class ProdAuthIntegrationTest {

  @Autowired
  private OAuthSecurityProvider oauthProvider;

  @Test
  public void shouldLoadOAuthProvider() {
    assertThat(oauthProvider).isNotNull();
  }
}

// Test profile switching
@SpringBootTest
public class ProfileSwitchingTest {

  @Autowired
  private ApplicationContext context;

  @Test
  @ActiveProfiles("dev")
  public void shouldLoadDevProfile() {
    String[] activeProfiles = context.getEnvironment().getActiveProfiles();
    assertThat(activeProfiles).contains("dev");
  }
}
```

### Example 3: Dynamic Profile Configuration

```java
@Configuration
public class DynamicProfileConfiguration implements EnvironmentPostProcessor {

  @Override
  public void postProcessEnvironment(
    ConfigurableEnvironment environment,
    SpringApplication application) {

    // Dynamically add profile based on environment variable
    String environment = System.getenv("ENVIRONMENT");
    if (environment != null) {
      environment.getPropertySources().addFirst(
        new SystemEnvironmentPropertySource(
          "env-dynamic-profile",
          Map.of("spring.profiles.active", environment)
        )
      );
    }

    // Or load from external config server
    String configServer = System.getenv("CONFIG_SERVER_URL");
    if (configServer != null) {
      // Add Spring Cloud Config source
    }
  }
}

// Programmatic profile activation
@SpringBootApplication
public class MyApplication {

  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(MyApplication.class);

    // Set profile based on environment variable
    String activeProfile = System.getenv("ACTIVE_PROFILE");
    if (activeProfile != null) {
      app.setAdditionalProfiles(activeProfile);
    } else {
      app.setAdditionalProfiles("dev");
    }

    app.run(args);
  }
}
```

## Best Practices

### ✅ DO

```java
// 1. Use @Profile for environment-specific beans
@Bean
@Profile("prod")
public ProductionService service() { }

// 2. Use @ConditionalOnProperty for feature flags
@Bean
@ConditionalOnProperty(name = "feature.x.enabled", havingValue = "true")
public FeatureX featureX() { }

// 3. Keep base configuration in application.yml
# application.yml - shared by all environments
spring.application.name: myapp

// 4. Use environment variables for secrets
# application-prod.yml
spring.datasource.password: ${DB_PASSWORD}

// 5. Document required profiles
# README.md
## Profiles
- **dev**: Local development with H2
- **test**: Automated testing
- **prod**: Production deployment

// 6. Use include to compose profiles
spring:
  profiles:
    active: prod
    include: auth,metrics,logging

// 7. Test with @ActiveProfiles
@SpringBootTest
@ActiveProfiles("test")
public class TestProfileTest { }
```

### ❌ DON'T

```java
// 1. Don't hardcode environment-specific values
@Bean
public DataSource dataSource() {
  return createDataSource("mysql://production-server");  // WRONG!
}

// 2. Don't create beans with same name in different profiles
@Bean
@Profile("dev")
public CacheManager cache() { }

@Bean
@Profile("prod")
public CacheManager cache() { }  // Duplicate names!

// 3. Don't use if statements in config
@Bean
public Service service() {
  if (System.getenv("ENV").equals("prod")) {  // WRONG!
    return new ProductionService();
  }
  return new DevService();
}

// 4. Don't forget profile in @SpringBootTest
@SpringBootTest  // What profile is active?
public class MyTest { }

// 5. Don't keep test data in prod configs
# application-prod.yml
app.test-user-id: 12345  // Should only be in -test.yml!

// 6. Don't create massive application.yml files
# application.yml (thousands of lines)
# Hard to maintain and understand

// 7. Don't ignore Spring Cloud Config
# All config in files - no centralized management
```

## Advanced Topics

### Spring Cloud Config Integration

```yaml
# application-prod.yml
spring:
  cloud:
    config:
      uri: https://config-server:8888
      name: myapp
      profile: prod
      label: main

      # Fail fast if config server unavailable
      fail-fast: true

      # Retry configuration
      retry:
        initial-interval: 1000
        max-interval: 2000
        max-attempts: 6
        multiplier: 1.1
```

### Conditional Profiles with Spring Cloud

```java
@Configuration
@ConditionalOnCloudPlatform(CloudPlatform.KUBERNETES)
public class KubernetesConfiguration {
  // Only loaded when running in Kubernetes

  @Bean
  public HealthIndicator kubernetesHealth() {
    return new KubernetesHealthIndicator();
  }
}
```

## Practice Questions & Answers

**Q1: What's the difference between @Profile and @ConditionalOnProperty?**

A: `@Profile` is for environment-specific beans (dev, prod, etc.). `@ConditionalOnProperty` is for feature flags that can change per configuration value. You can have multiple features per environment.

**Q2: How do you test with profiles?**

A: Use `@ActiveProfiles("test")` on test classes to activate specific profiles. This loads the corresponding application-test.yml file.

**Q3: When should you use spring.profiles.include?**

A: When you want to compose multiple profiles. For example, `active=prod` with `include=auth,metrics` loads prod plus auth and metrics configurations.

**Q4: How do you handle secrets in profiles?**

A: Never commit secrets to version control. Use environment variables: `${SECRET_NAME}` in YAML, injected at runtime. Consider Spring Cloud Vault or HashiCorp Vault for production.

## Key Takeaways

1. **Profile resolution**: Command line > System property > Environment variable > application.yml
2. **@Profile annotation**: Conditionally register beans based on active profile
3. **Profile-specific files**: application-{profile}.yml loaded on top of base configuration
4. **Profile composition**: Use spring.profiles.include to combine multiple profiles
5. **@ConditionalOnProperty**: Use for feature flags instead of profiles
6. **Environment variables**: Always use for secrets, never hardcode
7. **Testing profiles**: Use @ActiveProfiles to test with specific profile
8. **Multi-tenant**: Separate profiles per tenant for isolation
9. **Feature flags**: Externalize feature flags to configuration
10. **Documentation**: Always document what each profile does
