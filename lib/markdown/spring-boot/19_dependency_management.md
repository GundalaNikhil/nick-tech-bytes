# Tutorial 19: Dependency Management 📦

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Solution Approach](#solution-approach)
3. [Complete Implementation](#complete-implementation)
4. [Important Considerations](#important-considerations)
5. [Practice Questions](#practice-questions)

---

## 1. Understanding the Question ❓

### What are we trying to achieve?

- **What is Dependency Management?** - Controlling versions and transitive dependencies in Maven/Gradle
- **Why?** - Prevents version conflicts, ensures compatibility, manages vulnerabilities
- **When?** - Every project needs consistent, controlled dependencies
- **How?** - Using pom.xml with parent, BOM (Bill of Materials), dependency management
- **Best practices** - Use Spring Boot parent, version ranges carefully, regular updates

### The Problem It Solves

**Without Dependency Management:**

```xml
<!-- Chaos: each dependency specifies own versions -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>6.0.0</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>5.3.0</version>  <!-- Different version! -->
</dependency>
<!-- Conflict! Components may not work together -->
```

**With Dependency Management:**

```xml
<!-- Clean: Spring Boot manages all versions -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- Version inherited from parent! -->
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
        <!-- Compatible version from parent -->
    </dependency>
</dependencies>
```

---

## 2. Solution Approach 🎯

### Definition

**Dependency Management** in Maven/Gradle is the practice of controlling library versions and their transitive dependencies to ensure consistency, compatibility, and security across projects.

### Maven Dependency Resolution

```
Direct Dependency        Transitive Dependency
    Your Code                   Included by other libs
    spring-web                  spring-core (required by spring-web)
    ↓                           ↓
   Maven resolves:  Which version of spring-core?
```

---

## 3. Complete Implementation 💻

### Example 1: pom.xml with Spring Boot Parent

**Basic pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>

    <!-- Inherit from Spring Boot parent (best practice) -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>  <!-- Lookup parent in repository -->
    </parent>

    <!-- Your project info -->
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>
    <name>My Spring Boot Application</name>
    <description>Demo application for dependency management</description>

    <!-- Java version -->
    <properties>
        <java.version>17</java.version>
        <!-- Custom properties -->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <!-- Override versions if needed (before parent versions) -->
        <postgres.version>42.6.0</postgres.version>
    </properties>

    <!-- Dependencies -->
    <dependencies>
        <!-- Spring Boot Starters (parent manages versions) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <!-- No version specified - inherited from parent -->
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Database driver with specific version -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <version>${postgres.version}</version>  <!-- Use custom property -->
        </dependency>

        <!-- Testing (scope=test) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>  <!-- Only for testing -->
        </dependency>

        <!-- Optional dependency (users must include if needed) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Provided dependency (container provides it) -->
        <dependency>
            <groupId>jakarta.servlet</groupId>
            <artifactId>jakarta.servlet-api</artifactId>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <!-- Build plugins -->
    <build>
        <plugins>
            <!-- Spring Boot Maven Plugin -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

---

### Example 2: BOM (Bill of Materials) Import

**BOM in Parent Project**

```xml
<!-- parent-pom.xml -->
<dependencyManagement>
    <dependencies>
        <!-- Define all versions here -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>3.2.0</version>
            <type>pom</type>
            <scope>import</scope>  <!-- Import all managed versions -->
        </dependency>

        <!-- Custom BOM with your libraries -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>our-bom</artifactId>
            <version>1.0.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <!-- Dependencies inherit versions from BOM -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- Version from imported BOM -->
    </dependency>
</dependencies>
```

**Custom BOM Project**

```xml
<!-- our-bom/pom.xml -->
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>our-bom</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>  <!-- BOM projects use pom -->

    <dependencyManagement>
        <dependencies>
            <!-- Define all corporate library versions -->
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>our-common-lib</artifactId>
                <version>2.5.0</version>
            </dependency>
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>our-security-lib</artifactId>
                <version>1.2.0</version>
            </dependency>
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>our-utils</artifactId>
                <version>3.0.0</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```

**Using Custom BOM**

```xml
<!-- app/pom.xml -->
<dependencyManagement>
    <dependencies>
        <!-- Import our corporate BOM -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>our-bom</artifactId>
            <version>1.0.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <!-- Use libraries from BOM without specifying versions -->
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>our-common-lib</artifactId>
    </dependency>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>our-security-lib</artifactId>
    </dependency>
</dependencies>
```

---

### Example 3: Excluding Transitive Dependencies

**Problem: Unwanted Transitive Dependencies**

```xml
<!-- library-a depends on common-lib:1.0 -->
<!-- library-b depends on common-lib:2.0 -->
<!-- Conflict! Which version gets used? -->

<dependency>
    <groupId>com.some</groupId>
    <artifactId>library-a</artifactId>
    <version>1.0.0</version>
    <!-- Brings in common-lib:1.0 -->
</dependency>

<dependency>
    <groupId>com.other</groupId>
    <artifactId>library-b</artifactId>
    <version>2.0.0</version>
    <!-- Brings in common-lib:2.0 -->
</dependency>
```

**Solution: Explicit Exclusion**

```xml
<dependency>
    <groupId>com.other</groupId>
    <artifactId>library-b</artifactId>
    <version>2.0.0</version>
    <exclusions>
        <!-- Don't include this transitive dependency -->
        <exclusion>
            <groupId>com.some</groupId>
            <artifactId>common-lib</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Now explicitly specify which version of common-lib to use -->
<dependency>
    <groupId>com.some</groupId>
    <artifactId>common-lib</artifactId>
    <version>1.0.0</version>  <!-- You control the version -->
</dependency>
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Always Use Spring Boot Parent

```xml
✅ DO: Inherit from spring-boot-starter-parent
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

❌ DON'T: Manage all versions manually
<!-- Too error-prone, miss compatibility -->

📝 WHY: Spring Boot manages compatible versions, you inherit latest practices
```

#### 2. Use Version Ranges Cautiously

```xml
✅ DO: Pin major versions
<version>3.2.0</version>  <!-- Specific -->
<version>[3.2.0]</version>  <!-- Exact -->

❌ DON'T: Use open-ended ranges in production
<version>[3.2.0,)</version>  <!-- Includes any 3.2.0+ - breaks compatibility! -->
<version>[3.0.0,4.0.0)</version>  <!-- Too broad -->

📝 WHY: Open ranges pull incompatible versions, break builds unexpectedly
```

#### 3. Check for Vulnerabilities

```bash
# Check for vulnerable dependencies
mvn org.owasp:dependency-check-maven:check

# Update to latest versions
mvn versions:display-dependency-updates
mvn versions:use-latest-versions
```

---

### Common Pitfalls

#### Pitfall 1: Transitive Dependency Conflicts

**Problem:**

```
maven says: Two versions of same library required
- spring-security-core:5.7.0 (from library-a)
- spring-security-core:6.0.0 (from library-b)
Which one gets used?

Answer: Maven's conflict resolution (usually nearest)
Result: Subtle bugs if APIs changed between versions
```

**Solution:**

```xml
<!-- Explicitly specify correct version -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-core</artifactId>
            <version>6.0.0</version>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- Or exclude one version -->
<dependency>
    <groupId>com.some</groupId>
    <artifactId>library-a</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

**Explanation:**
Maven picks "nearest" dependency in tree. Resolve conflicts explicitly to avoid hidden bugs.

---

#### Pitfall 2: Unused Dependencies Bloating JAR

**Problem:**

```
JAR file is 50MB with lots of unused libraries
- Slower downloads
- Security vulnerability surface area
- Harder to debug
```

**Solution:**

```bash
# Find unused dependencies
mvn dependency:analyze

# Remove from pom.xml
<dependency>
    <groupId>unused.lib</groupId>
    <artifactId>old-feature</artifactId>
    <!-- Remove if not used -->
</dependency>
```

**Explanation:**
Regularly audit dependencies. Remove unused ones to reduce bloat.

---

## 8. Practice Questions 📝

**Question 1: Why use Spring Boot parent?**

```
Q: What does spring-boot-starter-parent give you?

A: Inheritance of:
   1. Tested, compatible versions of all Spring libs
   2. Common build plugins (spring-boot-maven-plugin)
   3. Resource filtering (profiles)
   4. Java version defaults
   5. UTF-8 encoding

Result: Compatible, secure, best-practice setup automatically!
```

**Question 2: Exclude transitive dependency**

```
Q: library-a brings in unwanted old-lib:1.0
   but you want old-lib:2.0

A:
<dependency>
    <groupId>com.some</groupId>
    <artifactId>library-a</artifactId>
    <exclusions>
        <exclusion>
            <groupId>com.old</groupId>
            <artifactId>old-lib</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Explicitly add desired version -->
<dependency>
    <groupId>com.old</groupId>
    <artifactId>old-lib</artifactId>
    <version>2.0</version>
</dependency>
```

**Question 3: Use custom BOM**

```
Q: Share library versions across 10 projects

A: Create BOM project:

<project>
    <packaging>pom</packaging>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.our</groupId>
                <artifactId>lib1</artifactId>
                <version>1.0</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>

Other projects import it:
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.our</groupId>
            <artifactId>our-bom</artifactId>
            <version>1.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

---

## 🎯 Key Takeaways

1. ✅ **Use Spring Boot parent** - Automatic version management
2. ✅ **Understand transitive dependencies** - Know what gets pulled in
3. ✅ **Exclude conflicting versions** - Resolve conflicts explicitly
4. ✅ **Use BOM for sharing versions** - Central version control
5. ✅ **Regular security updates** - Check for vulnerabilities
6. ✅ **Remove unused dependencies** - Keep JAR lean and secure

---

## Changelog

- **2025-11-23**: Initial creation with BOM and exclusion examples
- **Added**: Transitive dependency resolution patterns

**Congratulations! You now master Dependency Management! 🎉**
