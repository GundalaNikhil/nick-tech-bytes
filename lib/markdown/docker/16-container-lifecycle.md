# Docker Container Lifecycle

## 1. Introduction

**Question:** What is the lifecycle of a Docker container?

**What we're trying to achieve:** Understand the complete lifecycle of a Docker container from creation to removal, including all intermediate states.

**Goal/Aim:** By the end of this tutorial, you'll understand how containers transition through different states and how to manage them effectively throughout their lifecycle.

---

## 2. How to Solve (Explained Simply)

Think of a Docker container like a smartphone app:

- **Created:** App is installed but not opened yet
- **Running:** App is open and actively being used
- **Paused:** App is temporarily frozen (like minimizing)
- **Stopped:** App is closed but still installed
- **Removed:** App is uninstalled completely

Docker containers follow a similar pattern, with states that determine what the container is doing at any given time.

### Why Understanding Lifecycle Matters:

1. **Resource Management:** Know when containers consume resources
2. **Debugging:** Understand what state a container is in when issues occur
3. **Automation:** Write scripts that handle containers properly
4. **Cost Optimization:** Avoid running unnecessary containers
5. **Data Persistence:** Know when data might be lost

---

## 3. Visual Representation

```
Container Lifecycle Flow:
┌─────────────────────────────────────────────────────────────┐
│                    CONTAINER LIFECYCLE                       │
└─────────────────────────────────────────────────────────────┘

    docker create
         ↓
    ┌─────────┐
    │ CREATED │ ← Container exists but not running
    └─────────┘
         ↓ docker start
    ┌─────────┐
    │ RUNNING │ ← Container is actively executing
    └─────────┘
         ↓
    ┌────┴────┬────────┬──────────┐
    │         │        │          │
docker pause  docker stop  docker kill  Exit normally
    │         │        │          │
    ↓         ↓        ↓          ↓
┌────────┐ ┌─────────┐ ┌─────────┐
│ PAUSED │ │ STOPPED │ │ STOPPED │
└────────┘ └─────────┘ └─────────┘
    ↓         ↓          ↓
docker unpause docker start  docker start
    ↓         ↓          ↓
┌─────────┐ ┌─────────┐ ┌─────────┐
│ RUNNING │ │ RUNNING │ │ RUNNING │
└─────────┘ └─────────┘ └─────────┘
    │         │          │
    └─────────┴──────────┘
            ↓
       docker rm
            ↓
       ┌─────────┐
       │ REMOVED │ ← Container is deleted
       └─────────┘
```

### State Transition Diagram:

```
┌──────────────────────────────────────────────────────────────┐
│                     Container States                          │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────┐  start   ┌─────────┐  pause   ┌────────┐       │
│  │Created │ ──────→  │ Running │ ──────→  │ Paused │       │
│  └────────┘          └─────────┘          └────────┘       │
│      ↑                   ↓  ↑                  ↓            │
│      │                   │  │              unpause          │
│      │                   │  │                  ↓            │
│      │               stop/kill └──────────────────          │
│      │                   ↓                                   │
│      │              ┌─────────┐                             │
│      └──────────────│ Stopped │                             │
│                     └─────────┘                             │
│                          ↓                                   │
│                       remove                                 │
│                          ↓                                   │
│                     ┌─────────┐                             │
│                     │ Removed │                             │
│                     └─────────┘                             │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Requirements / What Needs to Be Gathered

### Prerequisites:

- Docker installed and running
- Basic understanding of containers
- Familiarity with terminal/command line
- Understanding of Docker images

### Conceptual Requirements:

- What is a container state?
- How does Docker manage container processes?
- What happens to data when containers change states?
- Understanding of process signals (SIGTERM, SIGKILL)

### Tools Needed:

- Docker CLI
- Terminal access
- Sample Docker image (nginx, alpine, etc.)

---

## 5. Key Topics to Consider & Plan of Action

### Container States Explained:

1. **Created State**
   - Container is initialized but not started
   - Resources allocated but not consuming CPU/memory
   - Configuration is set up

2. **Running State**
   - Container process is actively executing
   - Consuming system resources
   - Network ports are active
   - Volumes are mounted

3. **Paused State**
   - Process is frozen using cgroups
   - Memory is preserved
   - No CPU cycles used
   - Quick resume possible

4. **Stopped State**
   - Main process has exited
   - Resources released
   - Data in container filesystem preserved
   - Can be restarted

5. **Removed State**
   - Container definition deleted
   - All data lost (unless in volumes)
   - Cannot be recovered
   - Resources fully released

### Understanding Plan:

```
Step 1: Create a Container
↓
Step 2: Start and Monitor
↓
Step 3: Pause and Resume
↓
Step 4: Stop Gracefully
↓
Step 5: Remove and Clean Up
```

---

## 6. Code Implementation

### Complete Lifecycle Demonstration

```bash
# 1. CREATE - Container exists but not running
docker create --name my-nginx nginx:latest
docker ps -a  # Shows container in 'Created' state

# Check status
docker inspect my-nginx --format='{{.State.Status}}'
# Output: created

# 2. START - Move to running state
docker start my-nginx
docker ps  # Shows running container

# Check status again
docker inspect my-nginx --format='{{.State.Status}}'
# Output: running

# 3. PAUSE - Freeze the container
docker pause my-nginx
docker ps  # Shows 'Paused' status

# Container is frozen but still in memory
docker inspect my-nginx --format='{{.State.Status}}'
# Output: paused

# 4. UNPAUSE - Resume execution
docker unpause my-nginx
docker ps  # Back to 'Running'

# 5. STOP - Graceful shutdown (SIGTERM)
docker stop my-nginx
# Waits 10 seconds for graceful shutdown
docker ps -a  # Shows 'Exited' status

# 6. START AGAIN - Restart stopped container
docker start my-nginx

# 7. KILL - Forceful shutdown (SIGKILL)
docker kill my-nginx
docker ps -a  # Shows 'Exited' status

# 8. RESTART - Stop and start in one command
docker restart my-nginx

# 9. REMOVE - Delete container
docker stop my-nginx
docker rm my-nginx
# Container no longer exists
```

### Using docker run (Create + Start)

```bash
# docker run = create + start in one command

# Run in foreground (attached)
docker run nginx:latest

# Run in background (detached)
docker run -d --name web-server nginx:latest

# Run with automatic removal after stop
docker run --rm --name temp-container nginx:latest

# Run with restart policy
docker run -d --restart=always --name persistent-app nginx:latest
```

### Monitoring Container Lifecycle

```bash
# View all containers (all states)
docker ps -a

# View only running containers
docker ps

# View specific container details
docker inspect container_name

# View container logs
docker logs container_name

# Follow logs in real-time
docker logs -f container_name

# View resource usage
docker stats container_name

# View container processes
docker top container_name
```

### Practical Example: Web Application Lifecycle

```bash
# 1. Create a complete web application
docker run -d \
  --name my-web-app \
  -p 8080:80 \
  -v $(pwd)/html:/usr/share/nginx/html \
  nginx:latest

# 2. Verify it's running
curl http://localhost:8080

# 3. View logs
docker logs my-web-app

# 4. Temporary pause (maintenance mode)
docker pause my-web-app
# Website becomes unavailable
curl http://localhost:8080  # Will hang/timeout

# 5. Resume service
docker unpause my-web-app
curl http://localhost:8080  # Works again

# 6. Graceful shutdown
docker stop my-web-app

# 7. Restart after updates
docker start my-web-app

# 8. Clean removal
docker stop my-web-app
docker rm my-web-app
```

### Advanced Lifecycle Management

```bash
# Create container with health check
docker run -d \
  --name healthy-app \
  --health-cmd="curl -f http://localhost/ || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  nginx:latest

# Monitor health status
docker inspect healthy-app --format='{{.State.Health.Status}}'

# Auto-restart on failure
docker run -d \
  --name resilient-app \
  --restart=on-failure:3 \
  nginx:latest

# Stop with custom timeout
docker stop -t 30 my-app  # Wait 30 seconds before SIGKILL

# Remove with force (kills if running)
docker rm -f my-app

# Remove all stopped containers
docker container prune

# View container events in real-time
docker events --filter 'type=container'
```

---

## 7. Things to Consider

### Best Practices:

1. **Graceful Shutdown**
   ```bash
   # Always prefer stop over kill
   docker stop my-app  # Gives app time to clean up
   # Avoid: docker kill my-app  # Immediate termination
   ```

2. **Use Restart Policies**
   ```bash
   # For production services
   docker run -d --restart=unless-stopped my-app
   
   # For critical services
   docker run -d --restart=always my-app
   ```

3. **Clean Up Regularly**
   ```bash
   # Remove stopped containers
   docker container prune
   
   # Remove with auto-removal
   docker run --rm temp-container
   ```

4. **Monitor Health**
   ```bash
   # Implement health checks
   --health-cmd="command to check health"
   --health-interval=30s
   ```

### Common Pitfalls:

❌ **Not cleaning up stopped containers** (disk space fills up)
✅ Use `docker container prune` or `--rm` flag

❌ **Using kill instead of stop** (data corruption risk)
✅ Use `docker stop` for graceful shutdown

❌ **Not understanding data persistence** (data loss)
✅ Use volumes for important data

❌ **Ignoring restart policies** (manual intervention needed)
✅ Set appropriate restart policies for production

### State-Specific Considerations:

**Created State:**
- Container initialized but not consuming resources
- Good for preparing containers before deployment
- Configuration can still be modified

**Running State:**
- Actively consuming CPU and memory
- Network ports are accessible
- Logs are being generated
- Can receive signals and commands

**Paused State:**
- Memory is preserved but frozen
- No CPU cycles consumed
- Quick to resume
- Use for temporary maintenance
- Not suitable for long-term storage

**Stopped State:**
- Process exited (code 0 for success, non-zero for error)
- Container filesystem preserved
- Can be restarted
- Still takes disk space
- Restart resumes from initial state, not paused state

**Removed State:**
- Container definition deleted
- All data in container lost (unless in volumes)
- Cannot be recovered
- Frees all resources

---

## 8. Additional Helpful Sections

### Container Lifecycle Commands Reference

| Command | From State | To State | Description |
|---------|-----------|----------|-------------|
| `docker create` | - | Created | Initialize container |
| `docker start` | Created/Stopped | Running | Start container |
| `docker run` | - | Running | Create and start |
| `docker pause` | Running | Paused | Freeze container |
| `docker unpause` | Paused | Running | Resume container |
| `docker stop` | Running | Stopped | Graceful shutdown |
| `docker kill` | Running | Stopped | Force shutdown |
| `docker restart` | Running/Stopped | Running | Stop and start |
| `docker rm` | Stopped | Removed | Delete container |

### Exit Codes and Their Meanings

```bash
# Check container exit code
docker inspect my-app --format='{{.State.ExitCode}}'

# Common exit codes:
# 0   - Success, normal exit
# 1   - Application error
# 125 - Docker daemon error
# 126 - Command cannot execute
# 127 - Command not found
# 137 - SIGKILL (killed by kill command)
# 143 - SIGTERM (graceful shutdown)
```

### Real-World Scenarios:

**Scenario 1: Deploying Updates**
```bash
# 1. Pull new image
docker pull myapp:v2

# 2. Stop old container
docker stop myapp-v1

# 3. Start new container
docker run -d --name myapp-v2 myapp:v2

# 4. Verify new version works
curl http://localhost:8080/health

# 5. Remove old container
docker rm myapp-v1
```

**Scenario 2: Debugging a Failed Container**
```bash
# Container keeps crashing
docker ps -a
# Shows container in 'Exited' state

# Check exit code
docker inspect my-app --format='{{.State.ExitCode}}'

# View logs
docker logs my-app

# Try to start in interactive mode for debugging
docker start -i my-app
```

**Scenario 3: Maintenance Window**
```bash
# Pause services during maintenance
docker pause web-app
docker pause api-server

# Perform maintenance
# ... updates, backups, etc ...

# Resume services
docker unpause api-server
docker unpause web-app
```

### Automation with Lifecycle Events

```bash
# Monitor specific container events
docker events --filter 'container=my-app' \
  --filter 'event=start' \
  --filter 'event=stop' \
  --filter 'event=die'

# Script to restart on failure
#!/bin/bash
while true; do
  if [ "$(docker inspect -f '{{.State.Running}}' my-app)" != "true" ]; then
    echo "Container stopped. Restarting..."
    docker start my-app
  fi
  sleep 10
done
```

### Docker Compose Lifecycle

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    image: nginx
    restart: unless-stopped
    
  db:
    image: postgres
    restart: always
```

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose stop

# Pause specific service
docker-compose pause web

# Resume specific service
docker-compose unpause web

# Remove all containers
docker-compose down

# Remove with volumes
docker-compose down -v
```

### Performance Impact by State

| State | CPU Usage | Memory Usage | Disk I/O | Network |
|-------|-----------|--------------|----------|---------|
| Created | 0% | Minimal | None | None |
| Running | Active | Active | Active | Active |
| Paused | 0% | Preserved | None | None |
| Stopped | 0% | Released | None | None |
| Removed | 0% | Released | Released | None |

---

## Summary

The Docker container lifecycle consists of several states: **Created** (initialized but not running), **Running** (actively executing), **Paused** (temporarily frozen), **Stopped** (exited but not removed), and **Removed** (deleted). Understanding these states is crucial for effective container management, debugging, and resource optimization. Containers transition between states using commands like `docker create`, `start`, `pause`, `unpause`, `stop`, `kill`, `restart`, and `rm`. Always prefer graceful shutdowns (`docker stop`) over forceful ones (`docker kill`), use restart policies for production services, and regularly clean up stopped containers. Remember that data in container filesystems is lost when removed unless stored in volumes. Mastering the container lifecycle enables you to build robust, automated container management strategies.
