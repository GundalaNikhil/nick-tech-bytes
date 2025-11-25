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

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid rgba(34, 197, 94, 0.3);">

<h3 style="color: #22C55E; margin-bottom: 20px;">✅ Docker Registry Best Practices</h3>

<div style="display: grid; gap: 12px;">

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22C55E;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #16A34A;">Use version tags instead of latest</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Specify exact versions for reproducible deployments</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #0EA5E9;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #0EA5E9, #3B82F6); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0284C7;">Scan images for vulnerabilities</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Regular security scanning with Docker Scout or Trivy</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #8B5CF6, #A855F7); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #7C3AED;">Use private registries for sensitive images</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Keep proprietary code secure in private registries</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14B8A6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #14B8A6, #06B6D4); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0D9488;">Implement image retention policies</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Clean up old images to save storage space</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #10B981;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #10B981, #22C55E); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #059669;">Sign images for security</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Use Docker Content Trust for image signing</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #EF4444;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #EF4444, #F97316); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #DC2626;">Push secrets in images</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Never include passwords, API keys, or tokens in images</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #F97316;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #F97316, #FB923C); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #EA580C;">Use latest tag in production</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Always pin specific versions for stability</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #DC2626;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #DC2626, #EF4444); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #B91C1C;">Ignore scan warnings</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Address security vulnerabilities found in scans</div>
</div>

</div>

</div>

---

## Next Steps

- [Container Security Best Practices](/docker-tutorials/12-container-security)
- [Docker Monitoring & Logging](/docker-tutorials/14-monitoring-logging)
