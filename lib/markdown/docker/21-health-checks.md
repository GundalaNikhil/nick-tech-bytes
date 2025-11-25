# Docker Health Checks

## 1. Introduction

**Question:** What are Docker health checks and how do you implement them?

**What we're trying to achieve:** Learn to implement container health monitoring to ensure applications are running correctly and enable automatic recovery in orchestration systems.

**Goal/Aim:** By the end of this tutorial, you'll master implementing health checks in Dockerfiles, understand health states, and use health checks with orchestration tools.

---

## 2. How to Solve (Explained Simply)

Think of health checks like a heartbeat monitor in a hospital:

**Without Health Checks:**
- Patient appears to be lying in bed (container is running)
- But you don't know if they're actually alive and well
- Could be unconscious, in pain, or in critical condition
- No one knows until someone manually checks

**With Health Checks:**
- Automatic heartbeat monitor (periodic health check)
- Alerts when something is wrong
- Doctors notified immediately (orchestrator restarts container)
- Patient gets help before it's too late

### Why Health Checks Matter:

1. **Auto-Recovery:** Orchestrators can restart unhealthy containers
2. **Load Balancing:** Don't send traffic to unhealthy containers
3. **Monitoring:** Know when things go wrong
4. **Zero-Downtime:** Replace unhealthy containers automatically
5. **Reliability:** Catch issues before they affect users

---

## 3. Visual Representation

```
┌──────────────────────────────────────────────────────────┐
│              Container Health States                      │
└──────────────────────────────────────────────────────────┘

Container Lifecycle with Health:
┌─────────┐
│ CREATED │
└─────────┘
     ↓ start
┌─────────────┐
│  STARTING   │ ← Health: starting (grace period)
└─────────────┘
     ↓ health check passes
┌─────────────┐
│  HEALTHY    │ ← Health: healthy ✅
└─────────────┘
     ↓ health check fails
┌─────────────┐
│  UNHEALTHY  │ ← Health: unhealthy ❌
└─────────────┘
     ↓ orchestrator action
┌─────────────┐
│   RESTART   │ ← Container restarted
└─────────────┘
```

### Health Check Flow:

```
Time ──────────────────────────────────────────────→

Start Period (grace)         Regular Checks
│◄─────────────►│◄────────────────────────────────►│
│               │                                   │
│  No checks    │  Check every interval             │
│  Container    │  ↓       ↓       ↓       ↓       │
│  starting up  │  OK      OK      FAIL    FAIL    │
│               │  ✅      ✅      ❌  ❌ ❌        │
│               │                  │                 │
│               │                  └─→ UNHEALTHY    │
│               │                      after retries │
```

### Health Check Components:

```
┌────────────────────────────────────────────────────┐
│  HEALTHCHECK Configuration                         │
├────────────────────────────────────────────────────┤
│                                                    │
│  --interval=30s     ← How often to check          │
│  --timeout=3s       ← Max time for check to run   │
│  --start-period=0s  ← Grace period after start    │
│  --retries=3        ← Failures before unhealthy   │
│                                                    │
│  Command:                                          │
│  CMD curl -f http://localhost/health || exit 1    │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 4. Requirements / What Needs to Be Gathered

### Prerequisites:

- Basic Docker knowledge
- Understanding of your application's health endpoints
- Familiarity with Dockerfile syntax
- Basic HTTP/networking concepts

### Conceptual Requirements:

- What makes an application "healthy"?
- How to expose health endpoints
- Understanding of exit codes
- Container orchestration basics

### Tools Needed:

- Docker
- Health checking tool (curl, wget, or custom script)
- Application with health endpoint

---

## 5. Key Topics to Consider & Plan of Action

### Health Check Parameters:

1. **--interval:** Time between checks (default: 30s)
2. **--timeout:** Max time for check to run (default: 30s)
3. **--start-period:** Grace period before checks start (default: 0s)
4. **--retries:** Consecutive failures to mark unhealthy (default: 3)

### Health Check Methods:

1. **HTTP Endpoint:** Most common (curl, wget)
2. **TCP Socket:** Check if port is open
3. **Script:** Custom health validation
4. **Command:** Execute app-specific command

### Understanding Plan:

```
Step 1: Define what "healthy" means for your app
↓
Step 2: Implement health check in Dockerfile
↓
Step 3: Test health check behavior
↓
Step 4: Integrate with orchestration
↓
Step 5: Monitor and adjust thresholds
```

---

## 6. Code Implementation

### Basic HTTP Health Check

```dockerfile
# Simple web application
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/

# Health check using curl
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t healthy-nginx .
docker run -d --name test-health healthy-nginx

# Check health status
docker ps
# Look for "health: starting" or "healthy"

# Detailed health info
docker inspect test-health --format='{{.State.Health.Status}}'

# View health check logs
docker inspect test-health --format='{{json .State.Health}}' | jq
```

### Node.js Application with Health Endpoint

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Expose port
EXPOSE 3000

# Health check that calls our /health endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "server.js"]
```

```javascript
// server.js
const express = require('express');
const app = express();

let isHealthy = true;
let dbConnected = false;

// Simulate DB connection
setTimeout(() => {
  dbConnected = true;
  console.log('Database connected');
}, 5000);

// Health endpoint
app.get('/health', (req, res) => {
  if (!isHealthy || !dbConnected) {
    return res.status(503).json({
      status: 'unhealthy',
      database: dbConnected ? 'connected' : 'disconnected'
    });
  }
  
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Readiness endpoint (for Kubernetes)
app.get('/ready', (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ status: 'not ready' });
  }
  res.json({ status: 'ready' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

```javascript
// healthcheck.js - Custom health check script
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const healthCheck = http.request(options, (res) => {
  console.log(`Health check status: ${res.statusCode}`);
  
  if (res.statusCode === 200) {
    process.exit(0); // Healthy
  } else {
    process.exit(1); // Unhealthy
  }
});

healthCheck.on('error', (err) => {
  console.error('Health check failed:', err.message);
  process.exit(1); // Unhealthy
});

healthCheck.end();
```

### Python Flask Application

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

# Health check using wget (smaller than curl)
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["python", "app.py"]
```

```python
# app.py
from flask import Flask, jsonify
import psutil
import time

app = Flask(__name__)
start_time = time.time()

@app.route('/health')
def health():
    """Health check endpoint"""
    try:
        # Check if we have enough memory
        memory = psutil.virtual_memory()
        if memory.percent > 90:
            return jsonify({
                'status': 'unhealthy',
                'reason': 'high memory usage',
                'memory_percent': memory.percent
            }), 503
        
        # Check if we have enough disk space
        disk = psutil.disk_usage('/')
        if disk.percent > 90:
            return jsonify({
                'status': 'unhealthy',
                'reason': 'low disk space',
                'disk_percent': disk.percent
            }), 503
        
        # All checks passed
        return jsonify({
            'status': 'healthy',
            'uptime_seconds': time.time() - start_time,
            'memory_percent': memory.percent,
            'disk_percent': disk.percent
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 503

@app.route('/ready')
def ready():
    """Readiness check endpoint"""
    # Check if dependencies are ready
    # e.g., database connection, external APIs, etc.
    return jsonify({'status': 'ready'}), 200

@app.route('/')
def index():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Database Container Health Check

```dockerfile
# PostgreSQL with health check
FROM postgres:15

# Health check using pg_isready
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
  CMD pg_isready -U postgres || exit 1

# Or more thorough check with actual query
# HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
#   CMD psql -U postgres -c "SELECT 1" || exit 1
```

### Redis Container Health Check

```dockerfile
# Redis with health check
FROM redis:7-alpine

# Health check using redis-cli
HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=3 \
  CMD redis-cli ping || exit 1
```

### Docker Compose with Health Checks

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: ./web
    ports:
      - "8080:80"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      api:
        condition: service_healthy
      
  api:
    build: ./api
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      database:
        condition: service_healthy
      redis:
        condition: service_healthy
      
  database:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    volumes:
      - db_data:/var/lib/postgresql/data
      
  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 3

volumes:
  db_data:
```

### Advanced Health Check with Shell Script

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache curl jq

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Copy health check script
COPY healthcheck.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/healthcheck.sh

EXPOSE 3000

# Use custom health check script
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD /usr/local/bin/healthcheck.sh

CMD ["node", "server.js"]
```

```bash
#!/bin/sh
# healthcheck.sh - Comprehensive health check

# Check if process is running
if ! pgrep -f "node server.js" > /dev/null; then
    echo "Process not running"
    exit 1
fi

# Check HTTP endpoint
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health)
if [ "$HTTP_CODE" != "200" ]; then
    echo "HTTP health check failed: $HTTP_CODE"
    exit 1
fi

# Check response time
RESPONSE_TIME=$(curl -s -w "%{time_total}" -o /dev/null http://localhost:3000/health)
if [ "$(echo "$RESPONSE_TIME > 5" | bc)" -eq 1 ]; then
    echo "Response time too slow: ${RESPONSE_TIME}s"
    exit 1
fi

# Check memory usage
MEMORY_PERCENT=$(ps -o %mem -p $(pgrep -f "node server.js") | tail -1 | tr -d ' ')
if [ "$(echo "$MEMORY_PERCENT > 80" | bc)" -eq 1 ]; then
    echo "Memory usage too high: ${MEMORY_PERCENT}%"
    exit 1
fi

echo "All health checks passed"
exit 0
```

### TCP Socket Health Check

```dockerfile
# Check if port is accepting connections
FROM myapp:latest

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD nc -z localhost 8080 || exit 1
```

---

## 7. Things to Consider

### Best Practices:

1. **Implement Proper Health Endpoints**
   ```javascript
   // ✅ Good - comprehensive check
   app.get('/health', async (req, res) => {
     try {
       await db.ping(); // Check database
       await cache.ping(); // Check Redis
       // Check other dependencies
       res.json({ status: 'healthy' });
     } catch (error) {
       res.status(503).json({ status: 'unhealthy', error: error.message });
     }
   });
   ```

2. **Set Appropriate Timeouts**
   ```dockerfile
   # ✅ Good timing
   HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3
   
   # ❌ Too aggressive
   HEALTHCHECK --interval=5s --timeout=1s --start-period=0s --retries=1
   ```

3. **Use Start Period for Slow Startups**
   ```dockerfile
   # ✅ Good - adequate startup time
   HEALTHCHECK --start-period=60s CMD ...
   
   # For databases
   HEALTHCHECK --start-period=120s CMD ...
   ```

4. **Return Proper Exit Codes**
   ```bash
   # ✅ Healthy
   exit 0
   
   # ❌ Unhealthy
   exit 1
   ```

### Common Pitfalls:

❌ **No start period** (marks healthy apps as unhealthy during startup)
✅ Set adequate `--start-period` for initialization

❌ **Too frequent checks** (unnecessary overhead)
✅ Use reasonable intervals (30s is good default)

❌ **Timeout too short** (false positives)
✅ Allow enough time for health check to complete

❌ **Checking only process existence** (doesn't verify functionality)
✅ Check actual application functionality

### Health vs Readiness:

| Type | Purpose | When to Fail | Example |
|------|---------|--------------|---------|
| **Health** | Is app functioning? | App crash, deadlock | Process check, /health |
| **Readiness** | Can app serve traffic? | DB down, warming up | /ready endpoint |

```javascript
// Health - application itself
app.get('/health', (req, res) => {
  if (processIsHealthy()) {
    res.status(200).send('OK');
  } else {
    res.status(503).send('Unhealthy');
  }
});

// Readiness - dependencies ready
app.get('/ready', async (req, res) => {
  if (await allDependenciesReady()) {
    res.status(200).send('Ready');
  } else {
    res.status(503).send('Not Ready');
  }
});
```

---

## 8. Additional Helpful Sections

### Monitoring Health Status

```bash
# View health status
docker inspect myapp --format='{{.State.Health.Status}}'

# View full health history
docker inspect myapp --format='{{json .State.Health}}' | jq

# Watch health status in real-time
watch -n 1 'docker inspect myapp --format="{{.State.Health.Status}}"'

# Filter containers by health
docker ps --filter health=healthy
docker ps --filter health=unhealthy
```

### Health Check Events

```bash
# Monitor health check events
docker events --filter type=container --filter event=health_status

# Sample output:
# 2024-01-15T10:30:00 container health_status: healthy (container_id)
# 2024-01-15T10:30:30 container health_status: unhealthy (container_id)
```

### Integration with Orchestration

**Docker Swarm:**
```yaml
version: '3.8'

services:
  web:
    image: myapp:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
# Swarm won't route traffic to unhealthy replicas
```

**Kubernetes (converted):**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
  - name: myapp
    image: myapp:latest
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 40
      periodSeconds: 30
      timeoutSeconds: 10
      failureThreshold: 3
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 10
      periodSeconds: 10
```

### Debugging Failed Health Checks

```bash
# Run health check manually
docker exec myapp curl -f http://localhost/health

# View health check logs
docker inspect myapp --format='{{range .State.Health.Log}}{{.Output}}{{end}}'

# Check last health check result
docker inspect myapp --format='{{(index .State.Health.Log 0).ExitCode}}'

# Test health check outside container
curl -v http://localhost:8080/health
```

---

## Summary

Docker health checks monitor container health by periodically executing commands and marking containers as healthy or unhealthy based on exit codes. Implement health checks using `HEALTHCHECK` in Dockerfiles with four key parameters: `--interval` (check frequency), `--timeout` (max execution time), `--start-period` (grace period), and `--retries` (failures before unhealthy). Use exit code 0 for healthy and 1 for unhealthy states. Create dedicated `/health` endpoints that check critical dependencies like databases and external APIs. Health checks enable orchestrators to automatically restart failing containers, prevent traffic routing to unhealthy instances, and ensure high availability. Always set adequate start periods for slow-starting applications, use reasonable check intervals (30s default), and validate actual functionality rather than just process existence. Health checks are essential for production deployments and zero-downtime updates.
