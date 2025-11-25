# Docker Networking

## Overview

Docker networking allows containers to communicate with each other and with the host system. This guide covers different network types, container communication, and best practices.

---

## Network Types

### Bridge Network (Default)

The default network type for standalone containers.

```bash
# Create custom bridge network
docker network create my-network

# Connect container to network
docker run -d --network my-network --name web nginx

# Connect existing container
docker network connect my-network container-id
```

### Host Network

Container uses the host's network stack.

```bash
docker run -d --network host nginx
```

### Overlay Network

For swarm and Kubernetes - enables multi-host networking.

```bash
docker network create --driver overlay my-overlay-network
```

---

## Container Communication

### DNS Service Discovery

Containers can communicate using service names as hostnames:

```bash
# In docker-compose.yml
services:
  web:
    image: nginx

  api:
    image: myapi
    # Access web via: http://web:80
```

### Exposing Ports

```bash
# Expose port to host
docker run -d -p 8080:80 nginx

# Expose port to specific IP
docker run -d -p 127.0.0.1:8080:80 nginx
```

---

## Best Practices

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid rgba(34, 197, 94, 0.3);">

<h3 style="color: #22C55E; margin-bottom: 20px;">✅ Docker Networking Best Practices</h3>

<div style="display: grid; gap: 12px;">

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22C55E;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #16A34A;">Use custom bridge networks</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">For container-to-container communication with DNS resolution</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #0EA5E9;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #0EA5E9, #3B82F6); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0284C7;">Use host network sparingly</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Only for performance-critical applications that need direct host access</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #8B5CF6, #A855F7); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #7C3AED;">Use overlay networks</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">For distributed applications across multiple hosts</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #EF4444;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #EF4444, #F97316); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #DC2626;">Use host network carelessly</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Avoid with multiple containers on same port - causes conflicts</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #F97316;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #F97316, #FB923C); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #EA580C;">Rely on default bridge</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Don't use auto-generated default bridge - create custom networks instead</div>
</div>

</div>

</div>

---

## Next Steps

- [Docker Volumes & Data Persistence](/docker-tutorials/08-docker-volumes)
- [Containerizing Node.js App](/docker-tutorials/09-containerize-nodejs)
