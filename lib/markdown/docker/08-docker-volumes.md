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

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid rgba(34, 197, 94, 0.3);">

<h3 style="color: #22C55E; margin-bottom: 20px;">✅ Docker Volumes Best Practices</h3>

<div style="display: grid; gap: 12px;">

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22C55E;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #16A34A;">Use named volumes for production data</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Named volumes are managed by Docker and persist across container restarts</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #0EA5E9;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #0EA5E9, #3B82F6); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0284C7;">Use bind mounts for development</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Bind mounts enable live code updates without rebuilding</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #8B5CF6, #A855F7); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #7C3AED;">Backup important volumes regularly</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Prevent data loss with regular backups</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14B8A6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #14B8A6, #06B6D4); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0D9488;">Use volume drivers for cloud storage</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Leverage cloud storage for distributed systems</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #EF4444;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #EF4444, #F97316); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #DC2626;">Store important data in containers</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Container data is ephemeral and will be lost when container is removed</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #F97316;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #F97316, #FB923C); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #EA580C;">Use bind mounts with inconsistent permissions</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Permission issues can cause access problems across different hosts</div>
</div>

</div>

</div>

---

## Next Steps

- [Containerizing Node.js App](/docker-tutorials/09-containerize-nodejs)
- [Containerizing Python App](/docker-tutorials/10-containerize-python)
