# Docker Performance Optimization

## Overview

Optimize container performance by reducing image sizes, implementing caching strategies, and improving runtime efficiency.

---

## Image Size Optimization

### Base Image Size Comparison

<div style="background: linear-gradient(135deg, #F0F9FF, #E0F2FE); padding: 24px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
    
    <!-- Ubuntu -->
    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="font-size: 18px; font-weight: 600; color: #DC2626; margin-bottom: 12px;">Ubuntu 22.04</div>
      <div style="background: linear-gradient(to right, #EF4444, #DC2626); height: 40px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; margin-bottom: 8px;">
        ~77 MB
      </div>
      <div style="color: #6B7280; font-size: 14px;">❌ Large attack surface</div>
    </div>
    
    <!-- Debian Slim -->
    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="font-size: 18px; font-weight: 600; color: #F59E0B; margin-bottom: 12px;">Debian Slim</div>
      <div style="background: linear-gradient(to right, #F59E0B, #D97706); height: 30px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; margin-bottom: 8px;">
        ~40 MB
      </div>
      <div style="color: #6B7280; font-size: 14px;">⚖️ Good compromise</div>
    </div>
    
    <!-- Alpine -->
    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="font-size: 18px; font-weight: 600; color: #22C55E; margin-bottom: 12px;">Alpine 3.18</div>
      <div style="background: linear-gradient(to right, #22C55E, #10B981); height: 15px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; margin-bottom: 8px;">
        ~7 MB
      </div>
      <div style="color: #6B7280; font-size: 14px;">✅ Minimal & secure</div>
    </div>
    
  </div>
  
</div>

### Use Minimal Base Images

```dockerfile
# ❌ Large: ~77 MB
FROM ubuntu:22.04

# ✅ Small: ~7 MB
FROM alpine:3.18

# ✅ Compromise: ~40 MB
FROM debian:bookworm-slim
```

### Multi-Stage Builds

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Remove Cache and Temp Files

```dockerfile
# Install and clean in same layer
RUN apt-get update && \
    apt-get install -y package && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Use --no-cache-dir for pip
RUN pip install --no-cache-dir -r requirements.txt
```

### Layer Optimization

```dockerfile
# ❌ Multiple layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git

# ✅ Single layer
RUN apt-get update && \
    apt-get install -y curl git && \
    apt-get clean
```

---

## Build Caching

### Order Instructions by Change Frequency

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Dependencies (rarely changes)
COPY package*.json ./
RUN npm ci --only=production

# Code (frequently changes)
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### Use .dockerignore

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
coverage
.next
```

### Leverage BuildKit Cache

```bash
# Use BuildKit for better caching
DOCKER_BUILDKIT=1 docker build -t myapp:1.0 .

# Enable inline cache
DOCKER_BUILDKIT=1 docker build \
  --push \
  --cache-from type=registry,ref=myregistry/myapp:buildcache \
  -t myregistry/myapp:1.0 \
  .
```

---

## Runtime Performance

### Resource Limits

```bash
# Set memory limit
docker run -m 512m myapp:1.0

# Set CPU limit
docker run --cpus 1 myapp:1.0

# Set both
docker run -m 512m --cpus 1 myapp:1.0
```

### Volume Performance

```bash
# Use named volumes (best performance)
docker run -v app-data:/data myapp:1.0

# Bind mount for development
docker run -v $(pwd):/app myapp:1.0

# Avoid slow bind mounts on macOS/Windows
# Consider using named volumes instead
```

### Network Performance

```bash
# Use host network (not recommended for security)
docker run --network host myapp:1.0

# Use bridge network (default, good performance)
docker run --network my-network myapp:1.0
```

---

## Monitoring Performance

### Check Image Size

```bash
# List images with size
docker images

# View layer sizes
docker history myapp:1.0

# Get detailed breakdown
docker inspect myapp:1.0
```

### Monitor Container Performance

```bash
# Real-time stats
docker stats

# Export stats
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# Monitor specific container
docker stats mycontainer
```

### Profiling

```bash
# Check build time
time docker build -t myapp:1.0 .

# Profile container startup
docker run --name myapp myapp:1.0
docker inspect myapp --format='{{.State.StartedAt}}'
```

---

## Docker Compose Optimization

```yaml
version: "3.8"

services:
  app:
    build:
      context: .
      cache_from:
        - myapp:latest
    image: myapp:1.0
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 3s
      retries: 3
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 512M

  db:
    image: postgres:15-alpine
    deploy:
      resources:
        limits:
          cpus: "0.25"
          memory: 256M
```

---

## Performance Checklist

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 30px 0;">

  <!-- DO Cards -->
  <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 12px;">
      <span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 600;">✅ DO</span>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Use minimal base images</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Implement multi-stage builds</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Clean up cache and temp files</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Order Dockerfile efficiently</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Use .dockerignore</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Enable BuildKit caching</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Set resource limits</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Monitor performance metrics</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Use named volumes</strong></li>
      <li style="padding: 8px 0;"><strong>Profile and benchmark</strong></li>
    </ul>
  </div>

  <!-- DON'T Cards -->
  <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #EF4444; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 12px;">
      <span style="background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 600;">❌ DON'T</span>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't use latest tag</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't skip layer caching</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't ignore image size</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't run without limits</strong></li>
      <li style="padding: 8px 0;"><strong>Don't use host network</strong></li>
    </ul>
  </div>

</div>

---

## Benchmarking Example

```bash
#!/bin/bash

echo "Building image..."
time docker build -t myapp:1.0 .

echo "Running container..."
time docker run myapp:1.0

echo "Image size:"
docker images myapp:1.0 --format "{{.Size}}"

echo "Startup time:"
docker run --rm -e STARTUP=true myapp:1.0 time node app.js
```

---

## Next Steps

- [Docker Monitoring & Logging](/docker-tutorials/14-monitoring-logging)
- [Kubernetes Fundamentals](/docker-tutorials/15-kubernetes-basics)
