# Spring Boot Auto-Configuration

## Overview

Auto-configuration is one of Spring Boot's most powerful features. It automatically configures your Spring application based on the dependencies present on the classpath, reducing the need for manual configuration.

## How Auto-Configuration Works

Spring Boot auto-configuration attempts to automatically configure your Spring application based on the jar dependencies you have added. For example, if `spring-boot-starter-data-jpa` is on your classpath, Spring Boot automatically configures a `DataSource`, `EntityManagerFactory`, and `TransactionManager`.

### Key Components

1. **@EnableAutoConfiguration**: Enables auto-configuration mechanism
2. **@Conditional Annotations**: Control when configurations are applied
3. **spring.factories**: Lists all auto-configuration classes
4. **Auto-Configuration Classes**: Pre-built configuration classes

## @EnableAutoConfiguration

The `@EnableAutoConfiguration` annotation tells Spring Boot to "guess" how you want to configure Spring based on the jar dependencies you have added.

```java
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
public class MyConfiguration {
    // Configuration code
}
```

> **Note**: `@SpringBootApplication` already includes `@EnableAutoConfiguration`, so you typically don't need to add it explicitly.

## Conditional Auto-Configuration

Auto-configuration classes use `@Conditional` annotations to determine when they should be applied.

### Common @Conditional Annotations

| Annotation | Description |
|-----------|-------------|
| `@ConditionalOnClass` | Configuration only loaded if specified class is present |
| `@ConditionalOnMissingClass` | Configuration loaded if specified class is NOT present |
| `@ConditionalOnBean` | Configuration loaded if specified bean exists |
| `@ConditionalOnMissingBean` | Configuration loaded if specified bean does NOT exist |
| `@ConditionalOnProperty` | Configuration loaded based on Spring property |
| `@ConditionalOnResource` | Configuration loaded if specified resource exists |
| `@ConditionalOnWebApplication` | Configuration loaded if it's a web application |
| `@ConditionalOnNotWebApplication` | Configuration loaded if it's NOT a web application |

### Example: Custom Auto-Configuration

```java
import org.springframework.boot.autoconfigure.condition.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnClass(MyService.class)
@ConditionalOnProperty(name = "myapp.service.enabled", havingValue = "true", matchIfMissing = true)
public class MyServiceAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    public MyService myService() {
        return new MyServiceImpl();
    }
    
    @Bean
    @ConditionalOnBean(DataSource.class)
    public MyDataService myDataService(DataSource dataSource) {
        return new MyDataService(dataSource);
    }
}
```

## Viewing Auto-Configuration Report

You can view which auto-configurations were applied by enabling debug logging:

### Method 1: application.properties
```properties
debug=true
```

### Method 2: Command Line
```bash
java -jar myapp.jar --debug
```

### Method 3: IDE
```bash
mvn spring-boot:run -Ddebug
```

The report shows:
- **Positive matches**: Auto-configurations that were applied
- **Negative matches**: Auto-configurations that were not applied (and why)
- **Exclusions**: Auto-configurations explicitly excluded
- **Unconditional classes**: Auto-configurations with no conditions

## Creating Custom Auto-Configuration

### Step 1: Create Auto-Configuration Class

```java
package com.example.autoconfigure;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@AutoConfiguration
@ConditionalOnClass(MyLibraryClass.class)
@EnableConfigurationProperties(MyLibraryProperties.class)
public class MyLibraryAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    public MyLibraryService myLibraryService(MyLibraryProperties properties) {
        return new MyLibraryService(properties.getApiKey());
    }
}
```

### Step 2: Create Configuration Properties

```java
package com.example.autoconfigure;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mylibrary")
public class MyLibraryProperties {
    
    private String apiKey;
    private boolean enabled = true;
    private int timeout = 5000;
    
    // Getters and setters
    public String getApiKey() {
        return apiKey;
    }
    
    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }
    
    public boolean isEnabled() {
        return enabled;
    }
    
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
    
    public int getTimeout() {
        return timeout;
    }
    
    public void setTimeout(int timeout) {
        this.timeout = timeout;
    }
}
```

### Step 3: Register Auto-Configuration

Create `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`:

```
com.example.autoconfigure.MyLibraryAutoConfiguration
```

> **Note**: For Spring Boot 2.x, use `META-INF/spring.factories` instead:
> ```properties
> org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
> com.example.autoconfigure.MyLibraryAutoConfiguration
> ```

## Excluding Auto-Configuration

Sometimes you need to disable certain auto-configurations.

### Method 1: Using @SpringBootApplication

```java
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class
})
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### Method 2: Using application.properties

```properties
spring.autoconfigure.exclude=\
  org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
  org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
```

### Method 3: Using @EnableAutoConfiguration

```java
@Configuration
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
public class MyConfiguration {
}
```

## Common Auto-Configurations

### Web Auto-Configuration
```java
// Automatically configured when spring-boot-starter-web is present
- DispatcherServlet
- Embedded Tomcat
- Jackson (JSON processing)
- Error handling
```

### Data Auto-Configuration
```java
// Automatically configured when spring-boot-starter-data-jpa is present
- DataSource
- EntityManagerFactory
- TransactionManager
- JPA repositories
```

### Security Auto-Configuration
```java
// Automatically configured when spring-boot-starter-security is present
- Default security configuration
- Basic authentication
- CSRF protection
- Security filter chain
```

## Auto-Configuration Ordering

You can control the order in which auto-configurations are applied:

```java
@AutoConfiguration
@AutoConfigureBefore(DataSourceAutoConfiguration.class)
@AutoConfigureAfter(MyOtherAutoConfiguration.class)
public class MyAutoConfiguration {
    // Configuration
}
```

### Ordering Annotations

| Annotation | Purpose |
|-----------|---------|
| `@AutoConfigureBefore` | Run this configuration before specified classes |
| `@AutoConfigureAfter` | Run this configuration after specified classes |
| `@AutoConfigureOrder` | Specify numeric order (lower values = higher priority) |

## Best Practices

### 1. Use @ConditionalOnMissingBean for Default Beans

```java
@Bean
@ConditionalOnMissingBean
public MyService myService() {
    return new DefaultMyService();
}
```

This allows users to provide their own implementation by defining a bean.

### 2. Provide Configuration Properties

```java
@ConfigurationProperties(prefix = "myapp")
public class MyAppProperties {
    private boolean enabled = true;
    private String apiUrl;
    // getters and setters
}
```

### 3. Use Specific @Conditional Annotations

```java
@Bean
@ConditionalOnClass(name = "javax.sql.DataSource")
@ConditionalOnProperty(name = "spring.datasource.url")
public DataSource dataSource() {
    // Configure DataSource
}
```

### 4. Document Your Auto-Configuration

Create `META-INF/spring-configuration-metadata.json`:

```json
{
  "properties": [
    {
      "name": "myapp.enabled",
      "type": "java.lang.Boolean",
      "description": "Enable MyApp features",
      "defaultValue": true
    },
    {
      "name": "myapp.api-url",
      "type": "java.lang.String",
      "description": "API endpoint URL"
    }
  ]
}
```

### 5. Test Your Auto-Configuration

```java
import org.springframework.boot.autoconfigure.AutoConfigurations;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.junit.jupiter.api.Test;

class MyAutoConfigurationTest {
    
    private final ApplicationContextRunner contextRunner = 
        new ApplicationContextRunner()
            .withConfiguration(AutoConfigurations.of(MyAutoConfiguration.class));
    
    @Test
    void testAutoConfiguration() {
        contextRunner.run(context -> {
            assertThat(context).hasSingleBean(MyService.class);
        });
    }
    
    @Test
    void testWhenDisabled() {
        contextRunner
            .withPropertyValues("myapp.enabled=false")
            .run(context -> {
                assertThat(context).doesNotHaveBean(MyService.class);
            });
    }
}
```

## Troubleshooting

### Issue: Configuration Not Applied

**Solution**: Check conditions with debug mode:
```properties
debug=true
logging.level.org.springframework.boot.autoconfigure=DEBUG
```

### Issue: Wrong Bean Selected

**Solution**: Use `@Primary` or `@Qualifier`:
```java
@Bean
@Primary
public MyService primaryMyService() {
    return new PrimaryMyServiceImpl();
}
```

### Issue: Circular Dependencies

**Solution**: Use `@Lazy` or refactor configuration:
```java
@Bean
@Lazy
public MyService myService(OtherService otherService) {
    return new MyServiceImpl(otherService);
}
```

## Summary

- Auto-configuration automatically sets up your application based on classpath dependencies
- Uses `@Conditional` annotations to determine when to apply configurations
- Can be customized, excluded, or overridden as needed
- Enable debug mode to see which auto-configurations are applied
- Create custom auto-configurations for reusable library configuration
- Always provide default values and make configurations optional when possible

## Next Steps

- Learn about [Configuration Management](11_configuration_management.md)
- Explore [Spring Boot Starters](14_spring_boot_starters.md)
- Study [Profiles Advanced](28_profiles_advanced.md)
