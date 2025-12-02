# Writing Dockerfiles

## What You'll Learn

- Dockerfile syntax and instructions
- Best practices for efficient Dockerfiles
- Multi-stage builds for optimization
- Common patterns and examples

---

## Dockerfile Basics

### What is a Dockerfile?

A Dockerfile is a text file containing instructions to build a Docker image. Each instruction creates a new layer in the image.

### Dockerfile Structure

```dockerfile
# Comment: Use a base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Run commands
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Default command
CMD ["npm", "start"]
```

---

## Common Dockerfile Instructions

### FROM

Specifies the base image to build upon.

```dockerfile
# Use specific version
FROM ubuntu:22.04

# Use lightweight Alpine Linux
FROM node:18-alpine

# Use specific digest for reproducibility
FROM node:18-alpine@sha256:abc123...
```

### WORKDIR

Sets the working directory for subsequent instructions.

```dockerfile
WORKDIR /app

# Creates directory if it doesn't exist
WORKDIR /app/src

# Absolute vs relative paths
WORKDIR /app
WORKDIR src  # This is /app/src
```

### COPY vs ADD

Copy files from build context to container.

```dockerfile
# COPY: Preferred for most cases
COPY package.json .
COPY . /app/

# ADD: Can also extract archives (less preferred)
ADD app.tar.gz /app/
ADD https://example.com/file.txt /tmp/
```

### RUN

Execute commands during build.

```dockerfile
# Single command
RUN apt-get update && apt-get install -y curl

# Multiple commands
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean

# Use shell form
RUN npm install

# Use exec form (recommended)
RUN ["npm", "install"]
```

### ENV

Set environment variables.

```dockerfile
# Single variable
ENV NODE_ENV=production

# Multiple variables
ENV NODE_ENV=production \
    PORT=3000 \
    LOG_LEVEL=info
```

### EXPOSE

Document which ports the container listens on.

```dockerfile
# Expose port
EXPOSE 3000

# Expose multiple ports
EXPOSE 3000 5432 6379
```

> Note: EXPOSE doesn't actually publish ports; use `-p` flag when running container.

### CMD

Default command to run when container starts.

```dockerfile
# Shell form (less preferred)
CMD npm start

# Exec form (preferred)
CMD ["npm", "start"]

# JSON array format
CMD ["node", "app.js"]
```

### ENTRYPOINT

Configure container as an executable.

```dockerfile
# Shell form
ENTRYPOINT echo "Hello"

# Exec form (preferred)
ENTRYPOINT ["echo", "Hello"]

# Combined with CMD
ENTRYPOINT ["node"]
CMD ["app.js"]
```

### USER

Run container as specific user.

```dockerfile
# Create user
RUN useradd -m appuser

# Switch to user
USER appuser

# Default: root
```

### VOLUME

Specify mount points for persistent data.

```dockerfile
VOLUME /data
VOLUME ["/data", "/logs"]
```

### ARG

Build-time variables.

```dockerfile
ARG NODE_ENV=development
ARG VERSION=1.0.0

RUN echo "Building version $VERSION"
```

---

## Best Practices

### 1. Use Specific Base Image Versions

<div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(34, 197, 94, 0.05)); border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #6366F1;">

<h4 style="color: #6366F1; margin-bottom: 20px;">📋 Dockerfile Best Practices</h4>

<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="background: linear-gradient(135deg, #FEE2E2, #FED7AA);">
<th style="padding: 14px; text-align: left; color: #991B1B; font-weight: 600; border-bottom: 2px solid #FCA5A5;">❌ Avoid</th>
<th style="padding: 14px; text-align: left; color: #065F46; font-weight: 600; border-bottom: 2px solid #6EE7B7;">✅ Better Approach</th>
</tr>
</thead>
<tbody>
<tr style="background: rgba(255, 255, 255, 0.5);">
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; vertical-align: top;">
<strong style="color: #DC2626;">1. Vague Base Images</strong>
<div style="margin-top: 8px;"><code style="background: #FEE2E2; color: #991B1B; padding: 4px 8px; border-radius: 4px;">FROM node:latest</code></div>
<div style="color: #6B7280; font-size: 13px; margin-top: 6px;">Unpredictable, breaks over time</div>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; vertical-align: top;">
<strong style="color: #16A34A;">Specific Version Tags</strong>
<div style="margin-top: 8px;"><code style="background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 4px;">FROM node:18-alpine</code></div>
<div style="color: #6B7280; font-size: 13px; margin-top: 6px;">Predictable, reproducible builds</div>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; vertical-align: top;">
<strong style="color: #DC2626;">2. Multiple RUN Layers</strong>
<div style="margin-top: 8px;"><code style="background: #FEE2E2; color: #991B1B; padding: 4px 8px; border-radius: 4px; display: block; margin: 4px 0;">RUN apt-get update</code></div>
<div style="margin-top: 4px;"><code style="background: #FEE2E2; color: #991B1B; padding: 4px 8px; border-radius: 4px; display: block;">RUN apt-get install curl</code></div>
<div style="color: #6B7280; font-size: 13px; margin-top: 6px;">Creates unnecessary layers</div>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; vertical-align: top;">
<strong style="color: #16A34A;">Chain Commands</strong>
<div style="margin-top: 8px;"><code style="background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 4px; display: block;">RUN apt-get update && \</code></div>
<div style="margin-top: 4px;"><code style="background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 4px; display: block; margin-left: 12px;">apt-get install -y curl</code></div>
<div style="color: #6B7280; font-size: 13px; margin-top: 6px;">Single layer, smaller image</div>
</td>
</tr>
<tr style="background: rgba(255, 255, 255, 0.5);">
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; vertical-align: top;">
<strong style="color: #DC2626;">3. Large Base Images</strong>
<div style="margin-top: 8px;"><code style="background: #FEE2E2; color: #991B1B; padding: 4px 8px; border-radius: 4px;">FROM ubuntu:22.04</code></div>
<div style="color: #6B7280; font-size: 13px; margin-top: 6px;">~600MB, slow builds</div>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; vertical-align: top;">
<strong style="color: #16A34A;">Alpine Linux</strong>
<div style="margin-top: 8px;"><code style="background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 4px;">FROM node:18-alpine</code></div>
<div style="color: #6B7280; font-size: 13px; margin-top: 6px;">~100MB, faster builds</div>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; vertical-align: top;">
<strong style="color: #DC2626;">4. Running as Root</strong>
<div style="margin-top: 8px;"><code style="background: #FEE2E2; color: #991B1B; padding: 4px 8px; border-radius: 4px;">CMD ["npm", "start"]</code></div>
<div style="color: #6B7280; font-size: 13px; margin-top: 6px;">Security risk</div>
</td>
<td style="padding: 14px; vertical-align: top;">
<strong style="color: #16A34A;">Non-Root User</strong>
<div style="margin-top: 8px;"><code style="background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 4px; display: block; margin: 4px 0;">RUN adduser -S appuser</code></div>
<div style="margin-top: 4px;"><code style="background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 4px; display: block;">USER appuser</code></div>
<div style="color: #6B7280; font-size: 13px; margin-top: 6px;">Better security</div>
</td>
</tr>
</tbody>
</table>

</div>

### 2. Minimize Layer Count

```dockerfile
# ❌ Multiple layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# ✅ Single layer
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean
```

### 3. Order Instructions Efficiently

```dockerfile
# Frequently changing layers should come last
FROM node:18-alpine
WORKDIR /app

# Dependencies layer (rarely changes)
COPY package*.json ./
RUN npm install

# Code layer (frequently changes)
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### 4. Use .dockerignore

Create a `.dockerignore` file:

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
dist
build
```

### 5. Multi-Stage Builds

Use multiple `FROM` instructions to reduce final image size:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

### 6. Use Alpine for Smaller Images

```dockerfile
# ❌ Large image (~600MB)
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y nodejs npm

# ✅ Small image (~100MB)
FROM node:18-alpine
```

### 7. Run as Non-Root User

```dockerfile
FROM node:18-alpine
RUN useradd -m appuser
USER appuser

# This improves security
```

---

## Practical Examples

### Node.js Application

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build (if needed)
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["npm", "start"]
```

### Python Application

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m appuser
USER appuser

EXPOSE 5000

CMD ["python", "app.py"]
```

### Static Website (Nginx)

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## Building Images

### Basic Build

```bash
# Build with tag
docker build -t myapp:1.0 .

# Build with multiple tags
docker build -t myapp:1.0 -t myapp:latest .

# Build from URL
docker build https://github.com/user/repo.git#main
```

### Build Arguments

```dockerfile
# In Dockerfile
ARG NODE_ENV=development
ARG VERSION=1.0.0

RUN echo "NODE_ENV=$NODE_ENV"
```

```bash
# Pass build arguments
docker build \
  --build-arg NODE_ENV=production \
  --build-arg VERSION=1.0.0 \
  -t myapp:1.0 .
```

### Build Optimization

```bash
# Use buildkit for faster builds (requires Docker 19.03+)
DOCKER_BUILDKIT=1 docker build -t myapp:1.0 .

# Specify build context
docker build -f Dockerfile.prod -t myapp:prod .

# No cache
docker build --no-cache -t myapp:1.0 .
```

---

## Troubleshooting

### Build Fails

```bash
# See full build output
docker build --progress=plain -t myapp:1.0 .

# Debug intermediate layers
docker run -it <layer-id> /bin/bash
```

### Large Image Size

```bash
# Check image layers
docker history myapp:1.0

# Use multi-stage builds (see above)
```

### Slow Builds

```bash
# 1. Order instructions properly (see best practices)
# 2. Use .dockerignore
# 3. Combine RUN commands
# 4. Use BuildKit cache
DOCKER_BUILDKIT=1 docker build -t myapp:1.0 .
```

---

## Quick Reference

| Instruction  | Purpose               |
| ------------ | --------------------- |
| `FROM`       | Base image            |
| `WORKDIR`    | Working directory     |
| `COPY/ADD`   | Copy files            |
| `RUN`        | Execute commands      |
| `ENV`        | Environment variables |
| `EXPOSE`     | Document ports        |
| `CMD`        | Default command       |
| `ENTRYPOINT` | Container executable  |
| `USER`       | Run as user           |
| `ARG`        | Build-time variables  |

---

## Next Steps

- [Docker Compose Basics](/docker-tutorials/06-docker-compose)
- [Containerizing Node.js App](/docker-tutorials/09-containerize-nodejs)
- [Container Security](/docker-tutorials/12-container-security)
