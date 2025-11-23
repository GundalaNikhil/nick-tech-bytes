# Tutorial 30: Security Implementation 🔐

## 📋 Table of Contents

1. [Understanding the Question](#understanding-the-question)
2. [Solution Approach](#solution-approach)
3. [Prerequisites & Requirements](#prerequisites--requirements)
4. [Key Topics & Plan of Action](#key-topics--plan-of-action)
5. [Complete Implementation](#complete-implementation)
6. [Important Considerations](#important-considerations)
7. [Practice Questions](#practice-questions)

---

## 1. Understanding the Question ❓

### What are we trying to achieve?

- **What is Spring Security?** - Framework for providing authentication, authorization, and protection against common attacks
- **Why does it exist?** - Applications need robust security without reinventing the wheel
- **When to use it?** - Always in production applications handling user data
- **How does it work?** - Uses filters, authentication providers, and access control mechanisms
- **What are best practices?** - Use passwords hashing, HTTPS, CSRF protection, input validation, principle of least privilege

### The Problem It Solves

**Before Security:**

```java
// Unsecured endpoint - anyone can access
@GetMapping("/admin/users")
public List<User> getAllUsers() {
    return userRepository.findAll();  // NO authentication check!
}

// Password stored as plaintext - CRITICAL VULNERABILITY
user.setPassword("password123");  // EXPOSED if database breached!

// No protection against CSRF attacks
// Attackers can forge requests on behalf of users
```

**With Spring Security:**

```java
// Secured endpoint - requires ADMIN role
@GetMapping("/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public List<User> getAllUsers() {
    return userRepository.findAll();
}

// Password automatically hashed with bcrypt
passwordEncoder.encode("password123");  // Hashed securely

// CSRF protection automatic
// Form tokens prevent cross-site forgery
```

---

## 2. Solution Approach 🎯

### Definition

**Spring Security** is a powerful and customizable authentication and access control framework for Java applications, providing protection against common vulnerabilities like CSRF, session fixation, and clickjacking.

### Core Components

1. **Authentication**: Who are you? (login, credentials verification)
2. **Authorization**: What can you do? (permissions, roles)
3. **Protection**: Security filters, CSRF tokens, HTTPS, headers
4. **Cryptography**: Password encoding, encryption
5. **Audit**: Logging security events

---

## 3. Complete Implementation 💻

### Example 1: Basic Security Configuration

**pom.xml**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

**SecurityConfig.java**

```java
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // Enable @PreAuthorize, @PostAuthorize
public class SecurityConfig {

    /**
     * Configure which URLs require authentication
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
            .authorizeHttpRequests()
                // Public endpoints
                .requestMatchers("/", "/public/**", "/auth/login", "/auth/register").permitAll()
                // Admin only
                .requestMatchers("/admin/**").hasRole("ADMIN")
                // User endpoints - require authentication
                .requestMatchers("/user/**").authenticated()
                // Everything else requires auth
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/auth/login")
                .defaultSuccessUrl("/dashboard")
                .and()
            .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .and()
            .exceptionHandling()
                .accessDeniedPage("/error/403");

        return http.build();
    }

    /**
     * Password encoder - never store plaintext passwords!
     * BCrypt: Slow hashing algorithm resistant to brute force
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**AuthenticationController.java**

```java
package com.example.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        // Hash password before storing
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRoles(Set.of(new Role("ROLE_USER")));

        userService.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Spring Security handles authentication
        // This is usually form-based or JWT-based
        return ResponseEntity.ok("Login handled by Spring Security");
    }
}
```

**Method Level Security**

```java
package com.example.service;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    /**
     * Only ADMIN role can delete users
     */
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * User can only view their own data
     */
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public User getUserData(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    /**
     * Deny access to specific role
     */
    @PreAuthorize("!hasRole('BANNED')")
    public void accessService() {
        // Banned users cannot access this
    }
}
```

---

### Example 2: JWT-Based Authentication

**JwtTokenProvider.java**

```java
package com.example.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.security.jwt.secret}")
    private String jwtSecret;

    @Value("${app.security.jwt.expiration}")
    private long jwtExpirationMs;

    /**
     * Generate JWT token for authenticated user
     */
    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .claim("roles", userPrincipal.getAuthorities())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }

    /**
     * Validate and parse JWT token
     */
    public String getUserNameFromJWT(String token) {
        return Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    /**
     * Check if token is valid and not expired
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

**JwtAuthenticationFilter.java**

```java
package com.example.security;

import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            String jwt = getJwtFromRequest(request);

            if (jwt != null && tokenProvider.validateToken(jwt)) {
                String username = tokenProvider.getUserNameFromJWT(jwt);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Could not validate JWT", e);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

---

### Example 3: Role-Based Authorization

**User and Role Entities**

```java
@Entity
@Data
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;  // Hashed!
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue
    private Long id;
    private String name;  // ADMIN, USER, MODERATOR
}
```

**UserDetailsService Implementation**

```java
package com.example.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Convert roles to Spring Security authorities
        Set<GrantedAuthority> authorities = user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),  // Hashed password stored in DB
            authorities
        );
    }
}
```

---

## 6. Important Considerations ⚠️

### Best Practices

#### 1. Always Hash Passwords

```java
✅ DO: Use BCryptPasswordEncoder
PasswordEncoder encoder = new BCryptPasswordEncoder();
user.setPassword(encoder.encode(plainPassword));

❌ DON'T: Store plaintext passwords
user.setPassword(plainPassword);  // CRITICAL VULNERABILITY!

📝 WHY: If DB is breached, plaintext passwords are compromised immediately
```

#### 2. Use HTTPS in Production

```properties
✅ DO: Force HTTPS in production
server.ssl.enabled=true
security.require-https=true

❌ DON'T: Use HTTP for authentication
# Credentials transmitted in plaintext over network!

📝 WHY: HTTPS encrypts data in transit, prevents man-in-the-middle attacks
```

#### 3. Implement CSRF Protection

```java
✅ DO: Enable CSRF tokens for form submissions
http.csrf()
    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())

❌ DON'T: Disable CSRF protection in production
// http.csrf().disable();  // INSECURE!

📝 WHY: CSRF tokens prevent attackers from forging requests
```

---

### Security Checklist

- [ ] Password hashing with BCrypt or PBKDF2
- [ ] HTTPS/TLS in production
- [ ] CSRF protection enabled
- [ ] Authorization on all endpoints
- [ ] Input validation and sanitization
- [ ] No sensitive data in logs
- [ ] Security headers (X-Frame-Options, X-Content-Type-Options)
- [ ] Rate limiting on auth endpoints
- [ ] Account lockout after failed attempts
- [ ] Password reset with email verification
- [ ] Audit logging of security events
- [ ] Regular security updates

---

## Practice Questions 📝

**Question 1: Why hash passwords?**

```
Q: Why not store passwords in plaintext?

A: If DB is breached:
   - Plaintext: Attacker immediately has all passwords
   - Hashed: Attacker cannot reverse hashes to passwords

Use BCrypt: Slow algorithm (milliseconds per password)
            Makes brute force attacks infeasible
```

**Question 2: Secure an admin endpoint**

```
Q: Only admins can delete users

A:
@DeleteMapping("/users/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    userRepository.deleteById(id);
    return ResponseEntity.noContent().build();
}
```

**Question 3: JWT token validation**

```
Q: How do you validate JWT tokens?

A:
@Component
public class JwtTokenProvider {
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token);  // Will throw if invalid
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
```

---

## 🎯 Key Takeaways

1. ✅ **Always hash passwords** - Use BCryptPasswordEncoder
2. ✅ **HTTPS in production** - Encrypt data in transit
3. ✅ **Enable CSRF protection** - Prevent request forgery
4. ✅ **Authorization on endpoints** - Use @PreAuthorize
5. ✅ **Principle of least privilege** - Grant minimum necessary permissions
6. ✅ **Audit security events** - Log authentication/authorization

---

## Changelog

- **2025-11-23**: Initial creation with JWT and role-based examples
- **Added**: Password hashing and CSRF protection patterns
- **Added**: Security configuration and best practices

**Congratulations! You now master Spring Security! 🎉**

_Implement security from day one in your applications!_
