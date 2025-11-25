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

### Security Levels Comparison

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Method</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Security Level</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Use Case</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #FEE2E2;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Hardcoded</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #DC2626; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">🔴 Very Low</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Never use</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;"><code>ENV PASSWORD=secret</code></td>
    </tr>
    <tr style="background-color: #FED7AA;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: linear-gradient(135deg, #F97316, #FB923C); color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Environment Variables</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #F97316; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">🟠 Low</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Development only</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;"><code>--env-file .env</code></td>
    </tr>
    <tr style="background-color: #FEF3C7;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: linear-gradient(135deg, #EAB308, #CA8A04); color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Docker Secrets</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #EAB308; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">🟡 Medium</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Docker Swarm</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;"><code>docker secret create</code></td>
    </tr>
    <tr style="background-color: #D1FAE5;">
      <td style="padding: 16px;">
        <span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">External Vault</span>
      </td>
      <td style="padding: 16px;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">🟢 High</span>
      </td>
      <td style="padding: 16px;">Production</td>
      <td style="padding: 16px;"><code>Vault, AWS Secrets</code></td>
    </tr>
  </tbody>
</table>

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

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 30px 0;">

  <!-- DO Cards -->
  <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 12px;">
      <span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 600;">✅ DO</span>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Scan images for vulnerabilities</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Run containers as non-root</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Use minimal base images</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Drop unnecessary capabilities</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Use secrets management</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Keep images updated</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Use custom networks</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Enable logging & monitoring</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Sign images (content trust)</strong></li>
      <li style="padding: 8px 0;"><strong>Use security scanners in CI/CD</strong></li>
    </ul>
  </div>

  <!-- DON'T Cards -->
  <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #EF4444; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 12px;">
      <span style="background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 600;">❌ DON'T</span>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't run containers as root</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't hardcode secrets</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't use privileged mode</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't ignore scan warnings</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't use latest tag</strong></li>
      <li style="padding: 8px 0;"><strong>Don't expose unnecessary ports</strong></li>
    </ul>
  </div>

</div>

---

## Next Steps

- [Docker Performance Optimization](/docker-tutorials/13-performance-optimization)
- [Docker Monitoring & Logging](/docker-tutorials/14-monitoring-logging)
- [Kubernetes Fundamentals](./15-kubernetes-basics.md)
