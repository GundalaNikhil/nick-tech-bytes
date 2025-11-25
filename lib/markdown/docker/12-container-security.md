# Container Security Best Practices

## Overview

Secure your Docker containers and images with proper configurations, scanning, and runtime security measures.

---

## Image Security

### Don't Store Secrets

```dockerfile
# ❌ WRONG: Never hardcode secrets
ENV DATABASE_PASSWORD=secret123

# ✅ CORRECT: Use environment variables or secrets management
ENV DATABASE_PASSWORD=${DB_PASSWORD}
```

### Use Minimal Base Images

```dockerfile
# ❌ Larger attack surface
FROM ubuntu:22.04

# ✅ Minimal and secure
FROM alpine:3.18
FROM python:3.11-slim
FROM node:18-alpine
```

### Keep Images Updated

```bash
# Regular updates
docker pull node:18-alpine

# Rebuild images with latest base
docker build --pull -t myapp:1.0 .

# Scan for vulnerabilities
docker scout cves myapp:1.0
```

### Remove Unnecessary Tools

```dockerfile
# ❌ Includes unnecessary packages
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y curl wget git vim

# ✅ Minimal and secure
FROM python:3.11-slim
RUN pip install --no-cache-dir -r requirements.txt
```

---

## Runtime Security

### Run as Non-Root User

```dockerfile
# ❌ Running as root
FROM node:18-alpine
WORKDIR /app
COPY . .
CMD ["node", "app.js"]

# ✅ Running as non-root
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs
CMD ["node", "app.js"]
```

### Read-Only Root Filesystem

```bash
# Run container with read-only root
docker run --read-only \
  --tmpfs /tmp \
  myapp:1.0
```

### Limit Capabilities

```bash
# Drop all capabilities, add only needed ones
docker run --cap-drop=all \
  --cap-add=NET_BIND_SERVICE \
  myapp:1.0
```

### No Privileged Mode

```bash
# ❌ WRONG: Privileged mode
docker run --privileged myapp:1.0

# ✅ CORRECT: Regular mode
docker run myapp:1.0
```

---

## Network Security

### Use Custom Networks

```bash
# Create custom network
docker network create app-network

# Connect containers
docker run -d --network app-network --name web nginx
docker run -d --network app-network --name api myapp:1.0

# Containers can communicate but are isolated
```

### Expose Only Necessary Ports

```dockerfile
# Document which ports are needed
EXPOSE 3000

# Don't expose unnecessary ports
```

---

## Secret Management

### Environment Variables (Development)

```bash
# Use .env file (development only)
docker run --env-file .env myapp:1.0
```

### Docker Secrets (Swarm)

```bash
# Create secret
echo "password123" | docker secret create db_password -

# Use in service
docker service create \
  --secret db_password \
  myapp:1.0
```

### External Secret Management

```bash
# Use Vault, AWS Secrets Manager, etc.
docker run \
  -e VAULT_TOKEN=$VAULT_TOKEN \
  -e VAULT_ADDR=https://vault.example.com \
  myapp:1.0
```

---

## Container Scanning

### Trivy Vulnerability Scanner

```bash
# Scan image
trivy image myapp:1.0

# Scan with severity filter
trivy image --severity HIGH,CRITICAL myapp:1.0

# Generate JSON report
trivy image -f json -o report.json myapp:1.0
```

### Docker Scout

```bash
# View vulnerabilities
docker scout cves myapp:1.0

# View recommendations
docker scout recommendations myapp:1.0

# Compare images
docker scout compare myapp:1.0 myapp:2.0
```

---

## Logging and Monitoring

### Enable Security Logging

```bash
# View audit logs
docker events --filter type=container

# Log container access
docker logs container-id

# Monitor resource usage
docker stats
```

---

## Security Checklist

✅ **Scan images for vulnerabilities**
✅ **Run containers as non-root**
✅ **Use minimal base images**
✅ **Drop unnecessary capabilities**
✅ **Use secrets management for sensitive data**
✅ **Keep images and base OS updated**
✅ **Use custom networks**
✅ **Enable logging and monitoring**
✅ **Sign images (content trust)**
✅ **Use security scanners in CI/CD**

❌ **Don't run containers as root**
❌ **Don't hardcode secrets**
❌ **Don't use privileged mode**
❌ **Don't ignore scan warnings**
❌ **Don't use latest tag (hard to track)**
❌ **Don't expose unnecessary ports**

---

## Next Steps

- [Docker Performance Optimization](/docker-tutorials/13-performance-optimization)
- [Docker Monitoring & Logging](/docker-tutorials/14-monitoring-logging)
- [Kubernetes Fundamentals](./15-kubernetes-basics.md)
