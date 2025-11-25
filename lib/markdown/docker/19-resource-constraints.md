# Docker Resource Constraints (CPU & Memory Limits)

## 1. Introduction

**Question:** How do you set resource constraints (CPU and memory limits) in Docker?

**What we're trying to achieve:** Learn to control container resource usage to prevent resource exhaustion, ensure fair allocation, and optimize performance.

**Goal/Aim:** By the end of this tutorial, you'll master setting CPU and memory limits, understand resource allocation strategies, and know how to monitor and troubleshoot resource issues.

---

## 2. How to Solve (Explained Simply)

Think of Docker containers like tenants in an apartment building:

**Without Resource Limits:**
- One tenant blasts music 24/7 (uses all CPU)
- Another fills every room with stuff (uses all memory)
- Other tenants suffer (other containers crash)
- The whole building might collapse (server crashes)

**With Resource Limits:**
- Each tenant gets a fair share of space and utilities
- No one can hog all the resources
- Building stays stable and everyone coexists peacefully
- Landlord (Docker) enforces the rules

### Why Set Resource Limits?

1. **Prevent Resource Hogging:** One container can't consume everything
2. **Stability:** Protect host system from crashing
3. **Fair Allocation:** Multiple containers share resources fairly
4. **Cost Optimization:** Right-size resources for cloud deployments
5. **Predictable Performance:** Know exactly what resources are available

---

## 3. Visual Representation

```
┌──────────────────────────────────────────────────────────┐
│              Without Resource Limits                      │
└──────────────────────────────────────────────────────────┘

Host Machine: 8 CPU cores, 16GB RAM
┌────────────────────────────────────────────────────────┐
│  Container A: Uses 7 cores, 12GB RAM (greedy!)        │
│  Container B: Uses 0.5 cores, 2GB RAM (starved)       │
│  Container C: Uses 0.5 cores, 2GB RAM (starved)       │
│  System: Crashes or becomes unresponsive              │
└────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────┐
│              With Resource Limits                         │
└──────────────────────────────────────────────────────────┘

Host Machine: 8 CPU cores, 16GB RAM
┌────────────────────────────────────────────────────────┐
│  Container A: Max 2 cores, Max 4GB RAM ✅              │
│  Container B: Max 2 cores, Max 4GB RAM ✅              │
│  Container C: Max 2 cores, Max 4GB RAM ✅              │
│  System: Stable, reserved resources for OS ✅          │
└────────────────────────────────────────────────────────┘
```

### Memory Limit Hierarchy:

```
Memory Limits:
┌─────────────────────────────────────────┐
│  Hard Limit (--memory)                  │
│  Container cannot exceed this           │
│  Exceeding → Container is killed (OOM)  │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  Soft Limit (--memory-reservation)      │
│  Container should try to stay under     │
│  Can exceed if host has free memory     │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│  Swap (--memory-swap)                   │
│  Memory + Swap total limit              │
└─────────────────────────────────────────┘
```

---

## 4. Requirements / What Needs to Be Gathered

### Prerequisites:

- Docker basics
- Understanding of CPU and memory concepts
- Familiarity with docker run command
- Basic Linux/Unix knowledge

### Conceptual Requirements:

- What are CPU cores and threads?
- How does memory allocation work?
- What is OOM (Out of Memory) killer?
- Understanding of cgroups (control groups)

### Tools Needed:

- Docker installed
- Monitoring tools (docker stats, htop)
- Sample applications to test

---

## 5. Key Topics to Consider & Plan of Action

### Resource Types:

1. **Memory (RAM)**
   - Hard limit (`--memory`)
   - Soft limit (`--memory-reservation`)
   - Swap (`--memory-swap`)
   - OOM behavior

2. **CPU**
   - CPU shares (`--cpu-shares`)
   - CPU count (`--cpus`)
   - CPU affinity (`--cpuset-cpus`)
   - CPU quota and period

3. **Other Resources**
   - Disk I/O
   - Network bandwidth
   - PIDs (process limits)

### Understanding Plan:

```
Step 1: Understand resource types
↓
Step 2: Set memory limits
↓
Step 3: Configure CPU limits
↓
Step 4: Monitor resource usage
↓
Step 5: Optimize and troubleshoot
```

---

## 6. Code Implementation

### Memory Limits

```bash
# Set memory limit (hard limit)
docker run -d --name limited-app \
  --memory="512m" \
  nginx

# Memory with reservation (soft limit)
docker run -d --name app-with-reservation \
  --memory="1g" \
  --memory-reservation="750m" \
  nginx

# Memory with swap
docker run -d --name app-with-swap \
  --memory="512m" \
  --memory-swap="1g" \
  nginx
# Total: 512MB RAM + 512MB Swap = 1GB

# Disable swap
docker run -d --name no-swap-app \
  --memory="512m" \
  --memory-swap="512m" \
  nginx

# Memory units: b, k, m, g (bytes, kilobytes, megabytes, gigabytes)
docker run --memory="100m" myapp   # 100 megabytes
docker run --memory="2g" myapp     # 2 gigabytes
```

### CPU Limits

```bash
# Limit to specific number of CPUs
docker run -d --name cpu-limited \
  --cpus="1.5" \
  nginx
# Container can use up to 1.5 CPU cores

# CPU shares (relative weight)
docker run -d --name high-priority \
  --cpu-shares=1024 \
  nginx

docker run -d --name low-priority \
  --cpu-shares=512 \
  nginx
# high-priority gets 2x CPU compared to low-priority

# Pin to specific CPU cores
docker run -d --name pinned-app \
  --cpuset-cpus="0,2" \
  nginx
# Only use CPU cores 0 and 2

# CPU quota and period (advanced)
docker run -d --name quota-app \
  --cpu-quota=50000 \
  --cpu-period=100000 \
  nginx
# 50% of one CPU (50000/100000)
```

### Combined Resource Limits

```bash
# Comprehensive resource constraints
docker run -d \
  --name production-app \
  --memory="2g" \
  --memory-reservation="1.5g" \
  --memory-swap="3g" \
  --cpus="2" \
  --cpu-shares=1024 \
  --pids-limit=100 \
  -p 8080:80 \
  myapp:latest
```

### Docker Compose with Resource Limits

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    image: nginx:latest
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    ports:
      - "8080:80"
      
  database:
    image: postgres:15
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db_data:/var/lib/postgresql/data
      
  api:
    image: myapi:latest
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
      # Restart if OOM killed
      restart_policy:
        condition: on-failure
        max_attempts: 3

volumes:
  db_data:
```

```bash
# Deploy with resource limits
docker-compose up -d

# For Docker Swarm
docker stack deploy -c docker-compose.yml mystack
```

### Monitoring Resource Usage

```bash
# View resource usage of all containers
docker stats

# Specific container
docker stats my-container

# Format output
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# No streaming (one-time snapshot)
docker stats --no-stream

# View specific containers
docker stats web database api
```

### Example Output:
```
CONTAINER    CPU %   MEM USAGE / LIMIT     MEM %   NET I/O      
web          0.50%   45.2MiB / 512MiB      8.83%   1.2kB / 0B   
database     2.35%   1.5GiB / 2GiB         75%     2.4kB / 0B   
api          1.20%   750MiB / 1GiB         73.24%  5.1kB / 1kB  
```

### Testing Memory Limits

```dockerfile
# Dockerfile for memory test
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y stress

# Script to consume memory
CMD ["stress", "--vm", "1", "--vm-bytes", "1G", "--vm-hang", "0"]
```

```bash
# Build
docker build -t memory-stress .

# Test with 512MB limit (should get killed)
docker run --name test1 --memory="512m" memory-stress

# Check if it was OOM killed
docker inspect test1 --format='{{.State.OOMKilled}}'
# Output: true

# View exit code
docker inspect test1 --format='{{.State.ExitCode}}'
# Output: 137 (OOM killed)

# Test with 2GB limit (should work)
docker run --name test2 --memory="2g" memory-stress
```

### Testing CPU Limits

```dockerfile
# Dockerfile for CPU stress test
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y stress

# Consume all available CPU
CMD ["stress", "--cpu", "4"]
```

```bash
# Build
docker build -t cpu-stress .

# Run without limits (uses all CPUs)
docker run --name unlimited cpu-stress

# Run with 1 CPU limit
docker run --name limited --cpus="1" cpu-stress

# Monitor in another terminal
docker stats unlimited limited
```

### Real-World Application Example

```yaml
# docker-compose.production.yml
version: '3.8'

services:
  frontend:
    image: myapp/frontend:latest
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    ports:
      - "80:80"
      
  backend:
    image: myapp/backend:latest
    deploy:
      replicas: 5
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    environment:
      - NODE_ENV=production
      - MAX_OLD_SPACE_SIZE=768  # Node.js heap limit
    depends_on:
      - database
      - cache
      
  database:
    image: postgres:15
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 8G
        reservations:
          cpus: '2'
          memory: 4G
    environment:
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/postgresql/data
      
  cache:
    image: redis:7-alpine
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
    command: redis-server --maxmemory 400mb --maxmemory-policy allkeys-lru

volumes:
  db_data:
```

### Updating Resource Limits on Running Containers

```bash
# Update memory limit
docker update --memory="1g" my-container

# Update CPU shares
docker update --cpu-shares=512 my-container

# Update multiple containers
docker update --memory="512m" --cpus="0.5" container1 container2

# Update all containers
docker update --restart=unless-stopped $(docker ps -q)
```

---

## 7. Things to Consider

### Best Practices:

1. **Always Set Limits in Production**
   ```yaml
   # ✅ Good - explicit limits
   deploy:
     resources:
       limits:
         memory: 1G
         cpus: '1'
   ```

2. **Set Reservations for Critical Services**
   ```yaml
   # Guarantees minimum resources
   deploy:
     resources:
       reservations:
         memory: 512M
         cpus: '0.5'
   ```

3. **Monitor and Adjust**
   ```bash
   # Regular monitoring
   docker stats --no-stream > resource-usage.log
   ```

4. **Use Appropriate Units**
   ```bash
   # Be explicit with units
   --memory="512m"   # 512 megabytes
   --memory="2g"     # 2 gigabytes
   ```

### Common Pitfalls:

❌ **No limits set** (one container can crash the host)
✅ Always set memory limits in production

❌ **Limits too restrictive** (application can't function)
✅ Test and monitor before setting final limits

❌ **Ignoring OOM kills** (container keeps restarting)
✅ Investigate and increase memory or optimize app

❌ **Setting swap too high** (poor performance)
✅ Limit or disable swap for production containers

### Memory Limit Behaviors:

```bash
# Hard limit - container killed if exceeded
--memory="512m"

# Soft limit - best effort
--memory-reservation="256m"

# Disable swap completely
--memory="512m" --memory-swap="512m"

# Allow unlimited swap (not recommended)
--memory="512m" --memory-swap="-1"
```

### CPU Shares vs CPUs:

| Option | Behavior | Use Case |
|--------|----------|----------|
| `--cpu-shares` | Relative weight | Multiple containers sharing CPU |
| `--cpus` | Absolute limit | Fixed CPU allocation |
| `--cpuset-cpus` | Pin to cores | NUMA optimization |

---

## 8. Additional Helpful Sections

### Troubleshooting OOM (Out of Memory)

```bash
# Check if container was OOM killed
docker inspect my-app --format='{{.State.OOMKilled}}'

# View exit code (137 = OOM killed)
docker inspect my-app --format='{{.State.ExitCode}}'

# Check container logs
docker logs my-app --tail=100

# Monitor memory usage in real-time
docker stats my-app

# Solutions:
# 1. Increase memory limit
docker run --memory="2g" my-app

# 2. Optimize application memory usage
# 3. Add swap (temporary solution)
docker run --memory="1g" --memory-swap="2g" my-app
```

### Resource Monitoring Tools:

```bash
# Built-in Docker stats
docker stats

# cAdvisor (Google)
docker run -d \
  --name=cadvisor \
  -p 8080:8080 \
  -v /:/rootfs:ro \
  -v /var/run:/var/run:rw \
  -v /sys:/sys:ro \
  -v /var/lib/docker/:/var/lib/docker:ro \
  google/cadvisor:latest

# Access at http://localhost:8080

# Prometheus + Grafana for production
```

### Advanced: PID Limits

```bash
# Limit number of processes
docker run --pids-limit=100 my-app

# Prevent fork bombs
docker run --pids-limit=50 suspicious-app
```

### Advanced: Block I/O Limits

```bash
# Limit read/write speed
docker run \
  --device-read-bps /dev/sda:1mb \
  --device-write-bps /dev/sda:1mb \
  my-app

# Limit read/write operations per second
docker run \
  --device-read-iops /dev/sda:1000 \
  --device-write-iops /dev/sda:1000 \
  my-app
```

### Real-World Scenarios:

**Scenario 1: Memory Leak Detection**
```bash
# Monitor container over time
watch -n 5 'docker stats my-app --no-stream'

# If memory keeps increasing → memory leak
# Set hard limit to prevent host crash
docker update --memory="2g" my-app
```

**Scenario 2: Microservices Resource Allocation**
```yaml
services:
  # High priority, more resources
  payment-service:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
  
  # Medium priority
  user-service:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
  
  # Low priority, fewer resources
  analytics-service:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Quick Reference Table:

| Resource | Flag | Example | Description |
|----------|------|---------|-------------|
| Memory limit | `--memory` | `--memory="1g"` | Hard memory limit |
| Memory reservation | `--memory-reservation` | `--memory-reservation="512m"` | Soft limit |
| Swap | `--memory-swap` | `--memory-swap="2g"` | Memory + Swap total |
| CPU count | `--cpus` | `--cpus="1.5"` | Number of CPUs |
| CPU shares | `--cpu-shares` | `--cpu-shares=512` | Relative CPU weight |
| CPU affinity | `--cpuset-cpus` | `--cpuset-cpus="0-3"` | Pin to specific cores |
| PID limit | `--pids-limit` | `--pids-limit=100` | Max processes |

---

## Summary

Setting resource constraints in Docker is essential for stability, performance, and cost optimization. Use `--memory` for hard memory limits, `--memory-reservation` for soft limits, and `--cpus` to limit CPU usage. Always set limits in production to prevent resource exhaustion and ensure fair allocation among containers. Monitor resource usage with `docker stats` and adjust limits based on actual needs. Remember that exceeding memory limits triggers the OOM killer (exit code 137), while CPU limits throttle performance. Use Docker Compose `deploy.resources` for declarative resource management. Resource constraints combined with proper monitoring create stable, predictable container environments that can handle varying loads without impacting the host system or other containers.
