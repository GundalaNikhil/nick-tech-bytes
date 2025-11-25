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

✅ **Use custom bridge networks for container-to-container communication**
✅ **Use host network for performance-critical applications**
✅ **Use overlay networks for distributed applications**
❌ **Avoid using host network with multiple containers on same port**
❌ **Don't rely on auto-generated default bridge network**

---

## Next Steps

- [Docker Volumes & Data Persistence](./08-docker-volumes.md)
- [Containerizing Node.js App](./09-containerize-nodejs.md)
