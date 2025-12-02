# CMD vs ENTRYPOINT in Dockerfile

## 1. Introduction

**Question:** What is the difference between CMD and ENTRYPOINT in Dockerfile?

**What we're trying to achieve:** Understand when to use CMD vs ENTRYPOINT, how they work together, and how to override them when running containers.

**Goal/Aim:** By the end of this tutorial, you'll master the subtle but important differences between CMD and ENTRYPOINT, and know exactly which one to use in different scenarios.

---

## 2. How to Solve (Explained Simply)

Think of CMD and ENTRYPOINT like restaurant ordering:

**ENTRYPOINT** = The main course you must order

- "This is a pizza restaurant" - you're getting pizza
- Can't change the main item, only customize it

**CMD** = Default toppings/sides

- "By default, you get pepperoni pizza"
- You can easily change it to vegetarian or Hawaiian

**Together:**

- ENTRYPOINT: "You're ordering pizza"
- CMD: "Default is pepperoni"
- Customer can say: "I want Hawaiian instead" (overriding CMD)
- Customer can't say: "Give me sushi instead" (can't change ENTRYPOINT easily)

### Key Differences:

1. **CMD:** Provides defaults that can be easily overridden
2. **ENTRYPOINT:** Defines the main executable that's harder to override
3. **Together:** ENTRYPOINT + CMD = executable + default arguments

---

## 3. Visual Representation

```
┌────────────────────────────────────────────────────────────┐
│                   CMD vs ENTRYPOINT                         │
└────────────────────────────────────────────────────────────┘

Using CMD only:
┌──────────────────────┐
│ Dockerfile           │
│ FROM ubuntu          │
│ CMD ["echo", "Hello"]│
└──────────────────────┘
         ↓
docker run myimage
    → Output: Hello

docker run myimage echo "Goodbye"
    → Output: Goodbye (CMD completely replaced)


Using ENTRYPOINT only:
┌──────────────────────────┐
│ Dockerfile               │
│ FROM ubuntu              │
│ ENTRYPOINT ["echo"]      │
└──────────────────────────┘
         ↓
docker run myimage "Hello"
    → Output: Hello

docker run myimage "Goodbye"
    → Output: Goodbye (added as argument)


Using ENTRYPOINT + CMD:
┌──────────────────────────┐
│ Dockerfile               │
│ FROM ubuntu              │
│ ENTRYPOINT ["echo"]      │
│ CMD ["Hello"]            │
└──────────────────────────┘
         ↓
docker run myimage
    → Output: Hello (uses CMD default)

docker run myimage "Goodbye"
    → Output: Goodbye (CMD overridden)
```

### Override Comparison:

```
┌─────────────────────────────────────────────────────────────┐
│                    Override Behavior                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CMD:                                                        │
│  docker run myimage [new_command]  ← Easily overridden      │
│                                                              │
│  ENTRYPOINT:                                                 │
│  docker run --entrypoint [new] myimage  ← Needs flag        │
│                                                              │
│  ENTRYPOINT + CMD:                                           │
│  docker run myimage [args]  ← Overrides CMD, keeps ENTRY    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Requirements / What Needs to Be Gathered

### Prerequisites:

- Basic Dockerfile knowledge
- Understanding of command-line arguments
- Familiarity with shell commands
- Docker installed

### Conceptual Requirements:

- How Linux/Unix commands work
- What are command arguments?
- Understanding of executables vs arguments
- Shell form vs exec form syntax

### Tools Needed:

- Docker
- Text editor
- Terminal

---

## 5. Key Topics to Consider & Plan of Action

### Understanding Two Forms:

1. **Shell Form**

   ```dockerfile
   CMD echo "Hello"
   ENTRYPOINT echo "Hello"
   ```

   - Runs in a shell (`/bin/sh -c`)
   - Variable substitution works
   - Signals not properly handled

2. **Exec Form (Recommended)**
   ```dockerfile
   CMD ["echo", "Hello"]
   ENTRYPOINT ["echo", "Hello"]
   ```
   - Runs directly, no shell
   - Proper signal handling
   - No variable substitution
   - Preferred for production

### When to Use What:

| Scenario             | Use              | Reason                            |
| -------------------- | ---------------- | --------------------------------- |
| Flexible command     | CMD              | Easy to override                  |
| Fixed executable     | ENTRYPOINT       | Ensures specific tool runs        |
| CLI tool             | ENTRYPOINT + CMD | Tool fixed, args flexible         |
| Script with defaults | Both             | Script is ENTRY, defaults are CMD |
| Simple container     | CMD              | Simplicity                        |

---

## 6. Code Implementation

### Example 1: CMD Only

```dockerfile
# Dockerfile
FROM ubuntu:22.04

# Install required package
RUN apt-get update && apt-get install -y curl

# Default command
CMD ["curl", "https://api.github.com"]
```

```bash
# Build
docker build -t cmd-example .

# Run with default
docker run cmd-example
# Executes: curl https://api.github.com

# Override completely
docker run cmd-example echo "Hello World"
# Executes: echo "Hello World" (curl command replaced)

# Run different curl command
docker run cmd-example curl https://google.com
# Executes: curl https://google.com
```

### Example 2: ENTRYPOINT Only

```dockerfile
# Dockerfile
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y curl

# Fixed executable
ENTRYPOINT ["curl"]
```

```bash
# Build
docker build -t entry-example .

# Run - requires argument
docker run entry-example https://api.github.com
# Executes: curl https://api.github.com

# Add curl flags
docker run entry-example -I https://google.com
# Executes: curl -I https://google.com

# Can't easily run other commands
docker run entry-example echo "Hello"
# Tries to execute: curl echo "Hello" (fails)

# Override ENTRYPOINT (requires flag)
docker run --entrypoint bash entry-example
# Now runs bash instead
```

### Example 3: ENTRYPOINT + CMD (Best Practice)

```dockerfile
# Dockerfile
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y curl

# Fixed executable
ENTRYPOINT ["curl"]

# Default arguments
CMD ["https://api.github.com"]
```

```bash
# Build
docker build -t entry-cmd-example .

# Run with defaults
docker run entry-cmd-example
# Executes: curl https://api.github.com

# Override CMD (add different URL)
docker run entry-cmd-example https://google.com
# Executes: curl https://google.com

# Override CMD (add flags and URL)
docker run entry-cmd-example -I https://google.com
# Executes: curl -I https://google.com

# ENTRYPOINT still enforced
```

### Example 4: Practical Web Server

```dockerfile
# Dockerfile
FROM nginx:alpine

# Copy custom config
COPY nginx.conf /etc/nginx/nginx.conf

# ENTRYPOINT ensures nginx always runs
ENTRYPOINT ["nginx"]

# Default arguments for nginx
CMD ["-g", "daemon off;"]
```

```bash
# Run normally
docker run -p 8080:80 my-nginx
# Executes: nginx -g "daemon off;"

# Run with debug mode
docker run -p 8080:80 my-nginx -g "daemon off;" -e stderr
# Executes: nginx -g "daemon off;" -e stderr
```

### Example 5: Python Application

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .

# Python interpreter is fixed
ENTRYPOINT ["python"]

# Default script to run
CMD ["app.py"]
```

```bash
# Run default script
docker run my-python-app
# Executes: python app.py

# Run different script
docker run my-python-app test.py
# Executes: python test.py

# Run with flags
docker run my-python-app -u app.py
# Executes: python -u app.py (unbuffered output)
```

### Example 6: Node.js Application

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Use exec form with environment variable
ENTRYPOINT ["node"]

# Default entry point
CMD ["server.js"]
```

```bash
# Run normally
docker run -p 3000:3000 my-node-app
# Executes: node server.js

# Run different file
docker run my-node-app worker.js
# Executes: node worker.js

# Run with node flags
docker run my-node-app --inspect=0.0.0.0 server.js
# Executes: node --inspect=0.0.0.0 server.js
```

### Example 7: Using Shell Form (Be Careful!)

```dockerfile
# Dockerfile - Shell Form
FROM ubuntu:22.04

# Shell form - runs in /bin/sh -c
CMD echo "The USER is $USER"
```

```bash
# Variables work in shell form
docker run shell-example
# Output: The USER is root
```

```dockerfile
# Dockerfile - Exec Form with Variable
FROM ubuntu:22.04

ENV USER=appuser

# Exec form - no variable substitution
CMD ["echo", "The USER is $USER"]
# This will print literally: The USER is $USER

# Solution: Use shell explicitly
CMD ["sh", "-c", "echo The USER is $USER"]
# This will print: The USER is appuser
```

### Example 8: Wrapper Script Pattern

```dockerfile
# Dockerfile
FROM postgres:15

# Copy custom entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Script handles initialization
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command passed to script
CMD ["postgres"]
```

```bash
# docker-entrypoint.sh
#!/bin/bash
set -e

# Custom initialization
echo "Running custom setup..."
# ... setup logic ...

# Execute the CMD
exec "$@"
```

### Example 9: CLI Tool Container

```dockerfile
# Dockerfile for AWS CLI
FROM amazon/aws-cli:latest

# AWS CLI is the fixed command
ENTRYPOINT ["aws"]

# Default subcommand
CMD ["--help"]
```

```bash
# Show help (default)
docker run my-aws-cli

# List S3 buckets
docker run my-aws-cli s3 ls

# Describe EC2 instances
docker run my-aws-cli ec2 describe-instances
```

---

## 7. Things to Consider

### Best Practices:

1. **Use Exec Form**

   ```dockerfile
   # ✅ Good - exec form
   CMD ["nginx", "-g", "daemon off;"]

   # ❌ Avoid - shell form
   CMD nginx -g daemon off;
   ```

2. **ENTRYPOINT for Tools, CMD for Defaults**

   ```dockerfile
   # For CLI tools
   ENTRYPOINT ["aws"]
   CMD ["--help"]

   # For applications
   ENTRYPOINT ["python"]
   CMD ["app.py"]
   ```

3. **Make Scripts Executable**

   ```dockerfile
   COPY entrypoint.sh /
   RUN chmod +x /entrypoint.sh
   ENTRYPOINT ["/entrypoint.sh"]
   ```

4. **Handle Signals Properly**

   ```dockerfile
   # Use exec to replace shell process
   CMD ["exec", "node", "server.js"]

   # Or in script:
   # exec "$@"  # This is important!
   ```

### Common Pitfalls:

❌ **Using shell form** (poor signal handling)
✅ Use exec form: `CMD ["executable", "arg1"]`

❌ **Not using exec in scripts** (PID 1 problem)
✅ Use `exec "$@"` at end of entrypoint scripts

❌ **Mixing forms incorrectly**
✅ Be consistent with exec or shell form

❌ **Hardcoding everything in ENTRYPOINT**
✅ Use CMD for defaults that might change

### Shell vs Exec Form Comparison:

<div style="overflow-x: auto; margin: 24px 0;">
<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
<thead>
<tr style="background: linear-gradient(135deg, #8B5CF6, #A855F7);">
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">Aspect</th>
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">🐚 Shell Form</th>
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">⚡ Exec Form</th>
</tr>
</thead>
<tbody>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Syntax</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<code style="background: #FEF3C7; color: #92400E; padding: 4px 8px; border-radius: 4px;">CMD command arg</code>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<code style="background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 4px;">CMD ["command", "arg"]</code>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Process</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: #FEF3C7; color: #92400E; padding: 6px 12px; border-radius: 6px; font-size: 13px;">/bin/sh -c "command arg"</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: #D1FAE5; color: #065F46; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Direct execution</span>
</td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">PID 1</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEE2E2, #FECACA); color: #991B1B; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Shell process</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Your process</span>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Signals</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEE2E2, #FECACA); color: #991B1B; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Not passed correctly</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Handled properly</span>
</td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Variables</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-size: 13px;">$VAR works</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Need explicit shell</span>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Performance</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Slower (shell overhead)</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Faster</span>
</td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151;">Preferred</td>
<td style="padding: 14px;">
<span style="background: linear-gradient(135deg, #FEE2E2, #FECACA); color: #991B1B; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Rarely</span>
</td>
<td style="padding: 14px;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-size: 13px;">Always for production</span>
</td>
</tr>
</tbody>
</table>
</div>

| Aspect      | Shell Form                 | Exec Form                |
| ----------- | -------------------------- | ------------------------ |
| Syntax      | `CMD command arg`          | `CMD ["command", "arg"]` |
| Process     | `/bin/sh -c "command arg"` | Direct execution         |
| PID 1       | Shell process              | Your process             |
| Signals     | Not passed correctly       | Handled properly         |
| Variables   | `$VAR works`               | Need explicit shell      |
| Performance | Slower (shell overhead)    | Faster                   |
| Preferred   | Rarely                     | Always for production    |

---

## 8. Additional Helpful Sections

### Decision Tree: CMD vs ENTRYPOINT

```
Do you want the command to be easily changeable?
│
├─ Yes → Use CMD only
│   Example: docker run myimage python script.py
│
└─ No → Is there a fixed executable?
    │
    ├─ Yes → Use ENTRYPOINT (+ CMD for defaults)
    │   Example: ENTRYPOINT ["python"]
    │            CMD ["app.py"]
    │
    └─ No → Use CMD
        Example: CMD ["python", "app.py"]
```

### Override Examples:

```bash
# Override CMD (easy)
docker run myimage new-command args

# Override ENTRYPOINT (requires flag)
docker run --entrypoint new-command myimage args

# Override both
docker run --entrypoint new-command myimage new-args

# In docker-compose
services:
  app:
    image: myimage
    command: new-command args  # Overrides CMD
    entrypoint: new-entrypoint # Overrides ENTRYPOINT
```

### Real-World Patterns:

**Pattern 1: Web Server**

```dockerfile
FROM nginx:alpine
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
```

**Pattern 2: Database**

```dockerfile
FROM postgres:15
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
```

**Pattern 3: CLI Tool**

```dockerfile
FROM python:3.11
ENTRYPOINT ["python", "-m"]
CMD ["myapp.cli"]
```

**Pattern 4: Application**

```dockerfile
FROM node:18
ENTRYPOINT ["npm"]
CMD ["start"]
```

### Debugging Tips:

```bash
# See what command will run
docker inspect myimage --format='{{.Config.Cmd}}'
docker inspect myimage --format='{{.Config.Entrypoint}}'

# Run with shell for debugging
docker run -it --entrypoint /bin/sh myimage

# See what's actually executing
docker run myimage ps aux
```

### Common Use Cases:

| Use Case    | Pattern            | Example                                   |
| ----------- | ------------------ | ----------------------------------------- |
| Web app     | ENTRY + CMD        | `ENTRYPOINT ["npm"]` `CMD ["start"]`      |
| Database    | Script ENTRY + CMD | `ENTRYPOINT ["init.sh"]` `CMD ["mysqld"]` |
| CLI tool    | ENTRY + help CMD   | `ENTRYPOINT ["aws"]` `CMD ["--help"]`     |
| Batch job   | CMD only           | `CMD ["python", "job.py"]`                |
| Development | CMD only           | `CMD ["npm", "run", "dev"]`               |

---

## Summary

**CMD** and **ENTRYPOINT** serve different purposes in Docker: CMD provides default commands that are easily overridden, while ENTRYPOINT defines a fixed executable that makes the container behave like a command-line tool. Use **CMD only** when you want flexibility, **ENTRYPOINT only** for CLI tools, and **both together** when you have a fixed executable with configurable arguments (best practice). Always prefer **exec form** `["cmd", "arg"]` over shell form for production to ensure proper signal handling. Remember: ENTRYPOINT sets the main command (hard to override), CMD provides default arguments (easy to override), and together they create powerful, flexible container configurations. The pattern `ENTRYPOINT ["executable"]` + `CMD ["default", "args"]` is the recommended approach for most applications.
