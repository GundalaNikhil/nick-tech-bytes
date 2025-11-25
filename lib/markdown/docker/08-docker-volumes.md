# Docker Volumes & Data Persistence

## Overview

Volumes are the recommended way to persist data generated and used by Docker containers. This guide covers volume types and best practices.

---

## Volume Types

### Named Volumes

Managed by Docker and stored on the host machine.

```bash
# Create named volume
docker volume create my-data

# Use in container
docker run -v my-data:/data myapp

# List volumes
docker volume ls

# Inspect volume
docker volume inspect my-data

# Remove volume
docker volume rm my-data
```

### Bind Mounts

Maps a host directory to a container directory.

```bash
# Mount host directory
docker run -v /host/path:/container/path myapp

# Read-only mount
docker run -v /host/path:/container/path:ro myapp
```

### tmpfs Mounts

In-memory storage for temporary data.

```bash
# Mount tmpfs
docker run --tmpfs /tmp myapp
```

---

## Best Practices

✅ **Use named volumes for production data**
✅ **Use bind mounts for development**
✅ **Backup important volumes regularly**
✅ **Use volume drivers for cloud storage**
❌ **Don't store important data in containers**
❌ **Don't use bind mounts with inconsistent permissions**

---

## Next Steps

- [Containerizing Node.js App](/docker-tutorials/09-containerize-nodejs)
- [Containerizing Python App](/docker-tutorials/10-containerize-python)
