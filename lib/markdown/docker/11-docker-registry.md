# Docker Registry & Image Management

## Overview

Learn how to manage Docker images using registries, push/pull images, and work with private registries.

---

## Docker Hub

### Login to Docker Hub

```bash
# Login
docker login

# Logout
docker logout

# Tag image
docker tag myapp:1.0 username/myapp:1.0

# Push to Docker Hub
docker push username/myapp:1.0

# Pull from Docker Hub
docker pull username/myapp:1.0
```

---

## Private Registries

### Docker Registry (Self-Hosted)

```bash
# Run registry container
docker run -d -p 5000:5000 --name registry registry:2

# Tag and push
docker tag myapp:1.0 localhost:5000/myapp:1.0
docker push localhost:5000/myapp:1.0

# Pull from private registry
docker pull localhost:5000/myapp:1.0
```

### Private Docker Hub Repository

```bash
# Make repository private
# Via Docker Hub UI

# Push to private repo
docker tag myapp:1.0 username/private-repo:1.0
docker push username/private-repo:1.0

# Pull from private repo (requires authentication)
docker pull username/private-repo:1.0
```

---

## Image Scanning

### Built-in Scanning

```bash
# Scan with Docker Scout
docker scout cves myapp:1.0

# View detailed report
docker scout recommendations myapp:1.0
```

### Trivy Scanner

```bash
# Install Trivy
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh

# Scan image
trivy image myapp:1.0

# Generate report
trivy image --severity HIGH,CRITICAL myapp:1.0
```

---

## Image Management

### Cleanup Old Images

```bash
# Remove dangling images
docker image prune

# Remove all unused images
docker image prune -a

# Remove images older than 24 hours
docker image prune --filter "until=24h"
```

### Backup and Restore

```bash
# Save image to file
docker save myapp:1.0 | gzip > myapp-1.0.tar.gz

# Load image from file
docker load < myapp-1.0.tar.gz
```

---

## Best Practices

✅ **Use version tags instead of latest**
✅ **Scan images for vulnerabilities**
✅ **Use private registries for sensitive images**
✅ **Implement image retention policies**
✅ **Sign images for security**
❌ **Don't push secrets in images**
❌ **Don't use latest tag in production**
❌ **Don't ignore scan warnings**

---

## Next Steps

- [Container Security Best Practices](./12-container-security.md)
- [Docker Monitoring & Logging](./14-monitoring-logging.md)
