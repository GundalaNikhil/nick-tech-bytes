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

### Container Lifecycle Flow

<div style="background: linear-gradient(135deg, #F0F9FF, #E0F2FE); padding: 30px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  
  <!-- Step 1: Created -->
  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="background: linear-gradient(135deg, #3B82F6, #2563EB); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
    <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #3B82F6;">
      <strong style="color: #1E40AF;">CREATED</strong>
      <div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Container exists but not running</div>
      <code style="background: #DBEAFE; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #0369A1;">docker create</code>
    </div>
  </div>
  
  <!-- Arrow -->
  <div style="text-align: center; color: #6B7280; margin: 10px 0;">↓</div>
  
  <!-- Step 2: Running -->
  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
    <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #22C55E;">
      <strong style="color: #15803D;">RUNNING</strong>
      <div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Container is actively executing</div>
      <code style="background: #D1FAE5; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #047857;">docker start</code>
    </div>
  </div>
  
  <!-- Branches -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
    
    <!-- Pause Branch -->
    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B;">
      <strong style="color: #D97706;">PAUSED</strong>
      <div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Process frozen</div>
      <code style="background: #FEF3C7; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #92400E;">docker pause</code>
    </div>
    
    <!-- Stop Branch -->
    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #EF4444;">
      <strong style="color: #DC2626;">STOPPED</strong>
      <div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Graceful shutdown</div>
      <code style="background: #FEE2E2; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #991B1B;">docker stop</code>
    </div>
    
    <!-- Kill Branch -->
    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #991B1B;">
      <strong style="color: #7F1D1D;">KILLED</strong>
      <div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Forceful shutdown</div>
      <code style="background: #FEE2E2; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #991B1B;">docker kill</code>
    </div>
    
  </div>
  
  <!-- Arrow -->
  <div style="text-align: center; color: #6B7280; margin: 10px 0;">↓</div>
  
  <!-- Step 3: Removed -->
  <div style="display: flex; align-items: center;">
    <div style="background: linear-gradient(135deg, #6B7280, #4B5563); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
    <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #6B7280;">
      <strong style="color: #374151;">REMOVED</strong>
      <div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Container is deleted</div>
      <code style="background: #F3F4F6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #1F2937;">docker rm</code>
    </div>
  </div>
  
</div>

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

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Command</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">From State</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">To State</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker create</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">-</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #3B82F6; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Created</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Initialize container</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker start</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Created/Stopped</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Running</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Start container</td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker run</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">-</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Running</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Create and start</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker pause</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Running</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #F59E0B; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Paused</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Freeze container</td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker unpause</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Paused</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Running</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Resume container</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker stop</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Running</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #EF4444; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Stopped</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Graceful shutdown</td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker kill</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Running</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #DC2626; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Stopped</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Force shutdown</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker restart</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Running/Stopped</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Running</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Stop and start</td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker rm</code>
      </td>
      <td style="padding: 16px;">Stopped</td>
      <td style="padding: 16px;">
        <span style="background: #6B7280; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Removed</span>
      </td>
      <td style="padding: 16px;">Delete container</td>
    </tr>
  </tbody>
</table>

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
version: "3.8"
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

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">State</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">CPU Usage</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Memory Usage</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Disk I/O</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Network</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #3B82F6; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Created</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">0%</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #DBEAFE; color: #0369A1; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Minimal</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">None</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">None</span>
      </td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Running</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Active</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Active</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Active</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Active</span>
      </td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #F59E0B; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Paused</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">0%</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEF3C7; color: #92400E; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Preserved</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">None</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">None</span>
      </td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #EF4444; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Stopped</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">0%</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Released</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">None</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">None</span>
      </td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px;">
        <span style="background: #6B7280; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Removed</span>
      </td>
      <td style="padding: 16px;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">0%</span>
      </td>
      <td style="padding: 16px;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Released</span>
      </td>
      <td style="padding: 16px;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Released</span>
      </td>
      <td style="padding: 16px;">
        <span style="background: #D1FAE5; color: #047857; padding: 4px 12px; border-radius: 6px; font-size: 13px;">None</span>
      </td>
    </tr>
  </tbody>
</table>

---

## Summary

The Docker container lifecycle consists of several states: **Created** (initialized but not running), **Running** (actively executing), **Paused** (temporarily frozen), **Stopped** (exited but not removed), and **Removed** (deleted). Understanding these states is crucial for effective container management, debugging, and resource optimization. Containers transition between states using commands like `docker create`, `start`, `pause`, `unpause`, `stop`, `kill`, `restart`, and `rm`. Always prefer graceful shutdowns (`docker stop`) over forceful ones (`docker kill`), use restart policies for production services, and regularly clean up stopped containers. Remember that data in container filesystems is lost when removed unless stored in volumes. Mastering the container lifecycle enables you to build robust, automated container management strategies.
