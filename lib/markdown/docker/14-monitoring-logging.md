# Docker Monitoring & Logging

## Overview

Implement comprehensive monitoring and logging for Docker containers using various tools and strategies.

---

## Container Logging

### View Container Logs

```bash
# View logs
docker logs container-id

# Follow logs (live)
docker logs -f container-id

# Last 100 lines
docker logs --tail 100 container-id

# Timestamp logs
docker logs -t container-id

# Since/Until
docker logs --since 2024-01-01 container-id
docker logs --until 2024-01-31 container-id
```

### Logging Drivers

```bash
# JSON file driver (default)
docker run --log-driver json-file myapp:1.0

# Syslog driver
docker run --log-driver syslog \
  --log-opt syslog-address=udp://localhost:514 \
  myapp:1.0

# Splunk driver
docker run --log-driver splunk \
  --log-opt splunk-token=$SPLUNK_TOKEN \
  --log-opt splunk-url=https://splunk-server:8088 \
  myapp:1.0

# Awslogs driver
docker run --log-driver awslogs \
  --log-opt awslogs-group=/ecs/myapp \
  --log-opt awslogs-region=us-east-1 \
  myapp:1.0
```

---

## Application-Level Logging

### Structured Logging with JSON

```javascript
// Node.js example
const logger = {
  log: (level, message, meta = {}) => {
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level,
        message,
        ...meta,
      })
    );
  },
};

logger.log("info", "Server started", { port: 3000 });
logger.log("error", "Database connection failed", { error: err.message });
```

### Logging in Docker Compose

```yaml
version: "3.8"

services:
  app:
    build: .
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
        labels: "service=myapp"

  db:
    image: postgres:15-alpine
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

---

## Container Monitoring

### Docker Stats

```bash
# Real-time resource usage
docker stats

# Specific container
docker stats mycontainer

# No-stream (snapshot)
docker stats --no-stream

# Format output
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
```

### Health Checks

```dockerfile
# Define health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

```bash
# Check health status
docker ps  # Shows health status
docker inspect mycontainer  # Shows detailed health info
```

---

## Prometheus Monitoring

### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "docker"
    static_configs:
      - targets: ["localhost:9323"]

  - job_name: "containers"
    static_configs:
      - targets: ["localhost:9100"]
```

### Docker with Prometheus

```bash
# Run Prometheus
docker run -d \
  -p 9090:9090 \
  -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus

# Run Node Exporter (for system metrics)
docker run -d \
  -p 9100:9100 \
  prom/node-exporter
```

---

## ELK Stack (Elasticsearch, Logstash, Kibana)

### Docker Compose Setup

```yaml
version: "3.8"

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:8.0.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5000:5000"
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

  app:
    build: .
    logging:
      driver: splunk
      options:
        splunk-token: ${SPLUNK_TOKEN}
        splunk-url: http://localhost:8088
    depends_on:
      - elasticsearch
```

---

## DataDog Integration

```bash
# Run container with DataDog agent
docker run -d \
  -e DD_API_KEY=$DD_API_KEY \
  -e DD_SITE=datadoghq.com \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  datadog/agent:latest
```

---

## New Relic Integration

```dockerfile
FROM node:18-alpine

# Install New Relic agent
RUN npm install newrelic

# Copy agent config
COPY newrelic.js ./

COPY . .

# Require agent first
CMD ["node", "-r", "newrelic", "app.js"]
```

---

## Monitoring Best Practices

✅ **Enable structured logging**
✅ **Set appropriate log retention**
✅ **Monitor resource usage**
✅ **Implement health checks**
✅ **Use centralized logging**
✅ **Set up alerts**
✅ **Monitor error rates**
✅ **Track performance metrics**

❌ **Don't log sensitive data**
❌ **Don't ignore error logs**
❌ **Don't set unlimited log retention**
❌ **Don't skip health checks**

---

## Quick Reference

| Command                    | Purpose                |
| -------------------------- | ---------------------- |
| `docker logs -f container` | View live logs         |
| `docker stats`             | Monitor resource usage |
| `docker inspect container` | View health status     |
| `docker events`            | Monitor events         |

---

## Next Steps

- [Kubernetes Fundamentals](./15-kubernetes-basics.md)
- [Container Security Best Practices](./12-container-security.md)
