# Tutorial 22: @ComponentScan Deep Dive 🔍

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [How ComponentScan Works](#how-componentscan-works)
3. [Configuration Options](#configuration-options)
4. [Advanced Scanning](#advanced-scanning)
5. [Common Patterns](#common-patterns)
6. [Best Practices](#best-practices)
7. [Practice Questions](#practice-questions)

---

## Understanding the Question ❓

### What are we trying to achieve?

`@ComponentScan` answers the question: **"Where should Spring look for @Component classes?"**

Without proper configuration, Spring might:

- Miss components that exist
- Scan too broadly (performance issue)
- Scan the wrong packages
- Include unwanted components

### The Discovery Process

```
Spring Boot Startup:
1. Loads @SpringBootApplication class
   ├── @EnableAutoConfiguration
   ├── @Configuration
   └── @ComponentScan ← This one!
2. Scans for @Component classes
3. Creates beans for all found
4. Wires dependencies

@ComponentScan determines WHERE to scan.
```

---

## How ComponentScan Works

### Default Behavior

```java
@SpringBootApplication
public class MyappApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyappApplication.class, args);
    }
}

// @SpringBootApplication = @EnableAutoConfiguration
//                        + @Configuration
//                        + @ComponentScan

// Default @ComponentScan behavior:
// Scan THIS package and all subpackages
// Package: com.example.myapp
// Scans: com.example.myapp and all below
//        ├── com.example.myapp.controller
//        ├── com.example.myapp.service
//        ├── com.example.myapp.repository
//        └── ... all subpackages

// But NOT:
// ├── com.example (sibling)
// ├── com.other (different package)
// └── org.springframework (framework)
```

### Package Structure Example

```
com.example.myapp/                    ← Main package (scanned)
├── MyappApplication.java             ← @SpringBootApplication
├── controller/                       ← Scanned
│   ├── UserController.java           ← @RestController (found!)
│   └── BookController.java           ← @RestController (found!)
├── service/                          ← Scanned
│   ├── UserService.java              ← @Service (found!)
│   └── BookService.java              ← @Service (found!)
├── repository/                       ← Scanned
│   ├── UserRepository.java           ← @Repository (found!)
│   └── BookRepository.java           ← @Repository (found!)
└── config/                           ← Scanned
    └── AppConfig.java                ← @Configuration (found!)

com.example.utils/                    ← NOT scanned (different package)
└── UtilityClass.java                 ← @Component (not found!)
```

---

## Configuration Options

### Option 1: Scan Specific Packages

```java
@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.myapp",
    "com.example.shared",
    "com.example.utils"
})
public class MyappApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyappApplication.class, args);
    }
}

// Now scans:
// ├── com.example.myapp and subpackages
// ├── com.example.shared and subpackages
// └── com.example.utils and subpackages
```

### Option 2: Scan by Base Package Classes

```java
// Instead of strings, use actual classes
@SpringBootApplication
@ComponentScan(basePackageClasses = {
    UserController.class,    // Scans from com.example.myapp.controller
    BookService.class,       // Scans from com.example.myapp.service
    ConfigClass.class        // Scans from com.example.myapp.config
})
public class MyappApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyappApplication.class, args);
    }
}

// Why this is better:
// ✅ If you move UserController to different package, scan updates automatically
// ✅ No hardcoded strings (less error-prone)
// ✅ IDE can refactor class references easily
```

### Option 3: Include/Exclude Filters

```java
@SpringBootApplication
@ComponentScan(
    basePackages = "com.example.myapp",
    includeFilters = {
        // Only scan classes matching these criteria
        @ComponentScan.Filter(
            type = FilterType.ANNOTATION,
            classes = RestController.class
        ),
        @ComponentScan.Filter(
            type = FilterType.ASSIGNABLE_TYPE,
            classes = BaseService.class
        )
    },
    excludeFilters = {
        // Never scan these
        @ComponentScan.Filter(
            type = FilterType.ANNOTATION,
            classes = Deprecated.class
        )
    }
)
public class MyappApplication {}

// This scans:
// ✅ Classes annotated with @RestController
// ✅ Classes assignable to (extending/implementing) BaseService
// ❌ Classes annotated with @Deprecated (even if they match above)
```

### Option 4: Using Regex Patterns

```java
@ComponentScan(
    basePackages = "com.example.myapp",
    includeFilters = {
        @ComponentScan.Filter(
            type = FilterType.REGEX,
            pattern = ".*Repository$"  // Include *Repository classes
        )
    }
)
public class MyappApplication {}

// Scans: UserRepository, BookRepository, ProductRepository, etc.
```

---

## Advanced Scanning

### Custom Filter Implementation

```java
/**
 * Custom filter for @ComponentScan
 */
public class FeatureToggleFilter implements TypeFilter {

    @Override
    public boolean match(MetadataReader reader,
                        MetadataReaderFactory factory)
            throws IOException {

        // Get the class being examined
        ClassMetadata classMetadata = reader.getClassMetadata();
        String className = classMetadata.getClassName();

        // Check if class has @Feature annotation
        AnnotationMetadata annotationMetadata = reader.getAnnotationMetadata();

        if (annotationMetadata.hasAnnotation(Feature.class.getName())) {
            // Check if feature is enabled
            Feature feature = // Get Feature annotation details

            return isFeatureEnabled(feature.name());
        }

        return false;
    }

    private boolean isFeatureEnabled(String featureName) {
        // Get from feature toggle service
        return true;  // Simplified
    }
}

/**
 * @Feature annotation
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Feature {
    String name();
}

/**
 * Use custom filter
 */
@SpringBootApplication
@ComponentScan(
    basePackages = "com.example.myapp",
    includeFilters = {
        @ComponentScan.Filter(
            type = FilterType.CUSTOM,
            classes = FeatureToggleFilter.class
        )
    }
)
public class MyappApplication {}

/**
 * Classes with @Feature annotation only loaded if enabled
 */
@Component
@Feature(name = "new-payment-system")
public class NewPaymentProcessor {
    // Only created if feature enabled
}

@Component
@Feature(name = "legacy-payment-system")
public class LegacyPaymentProcessor {
    // Only created if feature enabled
}
```

### Multi-Tenant Component Scanning

```java
/**
 * Custom filter for multi-tenant applications
 */
public class TenantFilter implements TypeFilter {

    @Autowired(required = false)
    private TenantContext tenantContext;

    @Override
    public boolean match(MetadataReader reader,
                        MetadataReaderFactory factory)
            throws IOException {

        AnnotationMetadata metadata = reader.getAnnotationMetadata();

        // Check if class has @TenantScoped annotation
        if (metadata.hasAnnotation(TenantScoped.class.getName())) {

            if (tenantContext == null) {
                return false;  // No tenant context, don't load
            }

            // Get required tenants for this class
            String requiredTenant = // Extract from annotation

            // Only load if matches current tenant
            return tenantContext.getCurrentTenant()
                .equals(requiredTenant);
        }

        return false;
    }
}

/**
 * @TenantScoped annotation
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface TenantScoped {
    String value();  // Tenant name
}

/**
 * Tenant-specific components
 */
@Component
@TenantScoped("us-org")
public class USPaymentProcessor { }

@Component
@TenantScoped("eu-org")
public class EUPaymentProcessor { }

@Component
@TenantScoped("apac-org")
public class APACPaymentProcessor { }

// Depending on which tenant is active,
// only the relevant processor is loaded!
```

---

## Common Patterns

### Pattern 1: Modular Monolith

```java
// com.example.users.config.UsersModule
@Configuration
@ComponentScan(basePackages = "com.example.users")
public class UsersModule {
    // Module configuration
}

// com.example.orders.config.OrdersModule
@Configuration
@ComponentScan(basePackages = "com.example.orders")
public class OrdersModule {
    // Module configuration
}

// com.example.myapp.MyappApplication
@SpringBootApplication
@Import({
    UsersModule.class,
    OrdersModule.class
})
public class MyappApplication {
    // Each module scans its own package independently
}

// Structure:
// com.example.myapp/
// ├── MyappApplication.java
// ├── users/
// │   ├── config/UsersModule.java
// │   ├── controller/UserController.java
// │   ├── service/UserService.java
// │   └── repository/UserRepository.java
// └── orders/
//     ├── config/OrdersModule.java
//     ├── controller/OrderController.java
//     ├── service/OrderService.java
//     └── repository/OrderRepository.java
```

### Pattern 2: Environment-Specific Scanning

```java
@Configuration
@Profile("production")
@ComponentScan(
    basePackages = "com.example.myapp",
    excludeFilters = {
        @ComponentScan.Filter(
            type = FilterType.ANNOTATION,
            classes = {
                DebugEndpoint.class,
                DevelopmentService.class
            }
        )
    }
)
public class ProductionConfig {
    // Exclude debug components in production
}

@Configuration
@Profile("development")
@ComponentScan(
    basePackages = "com.example.myapp"
)
public class DevelopmentConfig {
    // Include everything, including debug components
}

@Component
@Development
public class DebugEndpoint {
    @GetMapping("/debug")
    public Map debug() {
        // Only available in development
    }
}
```

### Pattern 3: Plugin Architecture

```java
/**
 * Plugin interface
 */
public interface PaymentPlugin {
    void process(Payment payment);
}

/**
 * Plugin implementations
 */
@Component
@Plugin(name = "stripe")
public class StripePlugin implements PaymentPlugin {
    @Override
    public void process(Payment payment) { }
}

@Component
@Plugin(name = "paypal")
public class PayPalPlugin implements PaymentPlugin {
    @Override
    public void process(Payment payment) { }
}

/**
 * Custom annotation
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Plugin {
    String name();
}

/**
 * Plugin registry
 */
@Component
public class PluginRegistry {

    private final Map<String, PaymentPlugin> plugins;

    @Autowired
    public PluginRegistry(
            List<PaymentPlugin> availablePlugins) {
        // Autowire finds all PaymentPlugin implementations
        this.plugins = availablePlugins.stream()
            .collect(Collectors.toMap(
                plugin -> getPluginName(plugin),
                plugin -> plugin
            ));
    }

    public PaymentPlugin getPlugin(String name) {
        return plugins.get(name);
    }

    private String getPluginName(PaymentPlugin plugin) {
        return plugin.getClass()
            .getAnnotation(Plugin.class)
            .name();
    }
}
```

---

## Best Practices

### ✅ DO: Keep Default Package Structure

```java
// ✅ Good - Follow standard structure
com.example.myapp/
├── MyappApplication.java
├── controller/
├── service/
├── repository/
└── config/

// Default @ComponentScan scans everything automatically
@SpringBootApplication  // That's all you need!
public class MyappApplication {}
```

### ✅ DO: Use basePackageClasses for Safety

```java
// ✅ Good - Refactoring-safe
@ComponentScan(basePackageClasses = {
    UserController.class,
    UserService.class
})
public class MyappApplication {}

// If you move UserController.java, scan updates automatically
// IDE can refactor references

// ❌ Avoid - String-based (easy to break)
@ComponentScan(basePackages = "com.example.myapp.controller")
```

### ❌ DON'T: Scan Too Broadly

```java
// ❌ Bad - Scans entire org package
@ComponentScan(basePackages = "org")

// ❌ Bad - Scans everything
@ComponentScan(basePackages = "")

// ✅ Good - Specific to your app
@ComponentScan(basePackages = "com.example.myapp")
```

### ✅ DO: Use Filters for Exclusions

```java
// ✅ Good - Exclude by annotation
@ComponentScan(
    basePackages = "com.example.myapp",
    excludeFilters = {
        @ComponentScan.Filter(
            type = FilterType.ANNOTATION,
            classes = Deprecated.class
        )
    }
)
public class MyappApplication {}

// ✅ Good - Include only specific types
@ComponentScan(
    basePackages = "com.example.myapp",
    includeFilters = {
        @ComponentScan.Filter(
            type = FilterType.ASSIGNABLE_TYPE,
            classes = Service.class
        )
    },
    useDefaultFilters = false  // Don't scan everything
)
public class MyappApplication {}
```

### ✅ DO: Document Your Scanning Strategy

```java
/**
 * Application main class
 *
 * Component Scanning Strategy:
 * - Scans: com.example.myapp (application code)
 * - Includes: @Component, @Service, @Repository, @RestController
 * - Excludes: @Deprecated classes
 * - Modules: UserModule, OrderModule (explicit imports)
 *
 * This ensures:
 * 1. All production components are loaded
 * 2. Deprecated code is not used
 * 3. Modules are cleanly separated
 * 4. Framework packages are not scanned
 */
@SpringBootApplication
@Import({UserModule.class, OrderModule.class})
public class MyappApplication {}
```

---

## Practice Questions

### Question 1: What's the Default ComponentScan Behavior?

**Q**: If I don't specify @ComponentScan, what happens?

**A**: Spring scans the package where @SpringBootApplication is located and all subpackages:

```java
// Package: com.example.myapp
@SpringBootApplication
public class MyappApplication {}

// Scans: com.example.myapp and below
// Does NOT scan: com.example, com.other, org.springframework
```

### Question 2: When Should You Override ComponentScan?

**Q**: When do you need to explicitly configure @ComponentScan?

**A**: Override when:

- Components are in different packages
- Using modular architecture
- Need custom filters
- Want to exclude certain components
- Building a library/framework

**Don't override if:**

- Standard package structure
- Everything is in one tree

### Question 3: Can You Have Multiple ComponentScans?

**Q**: What if I need to scan different packages with different filters?

**A**: Yes! Use multiple @Configuration classes with different @ComponentScan:

```java
@Configuration
@ComponentScan(
    basePackages = "com.example.users",
    excludeFilters = {...}
)
public class UsersConfig {}

@Configuration
@ComponentScan(
    basePackages = "com.example.orders",
    excludeFilters = {...}
)
public class OrdersConfig {}

@SpringBootApplication
@Import({UsersConfig.class, OrdersConfig.class})
public class MyappApplication {}
```

---

## Key Takeaways

1. **@ComponentScan finds Spring components** - Classes with @Component, @Service, @Repository, @RestController
2. **Default scans your package** - MyappApplication's package and all subpackages
3. **Explicit configuration for complex setups** - Use basePackages or basePackageClasses
4. **Filters for advanced control** - Include/exclude by annotation, type, or custom logic
5. **basePackageClasses is safer** - Refactoring-proof compared to strings
6. **Can combine with @Import** - For modular applications
7. **Performance matters** - Don't scan unnecessary packages
8. **Document your strategy** - Future developers need to understand
9. **Standard structure first** - Override only when necessary
10. **Keep it simple** - Complex scanning often indicates design issues
