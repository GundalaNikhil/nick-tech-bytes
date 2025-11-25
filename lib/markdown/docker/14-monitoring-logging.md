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

## Logging Drivers

### Available Logging Drivers

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Driver</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Use Case</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Performance</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Best For</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #DBEAFE;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: linear-gradient(135deg, #3B82F6, #2563EB); color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">json-file</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Default local storage</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Fast</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Development</td>
    </tr>
    <tr style="background-color: #FEE2E2;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">syslog</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Unix syslog daemon</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Fast</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Linux systems</td>
    </tr>
    <tr style="background-color: #DBEAFE;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: linear-gradient(135deg, #8B5CF6, #7C3AED); color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">splunk</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Splunk logging</td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #EAB308; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Medium</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Enterprise</td>
    </tr>
    <tr style="background-color: #FEE2E2;">
      <td style="padding: 16px;">
        <span style="background: linear-gradient(135deg, #F97316, #EA580C); color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">awslogs</span>
      </td>
      <td style="padding: 16px;">AWS CloudWatch</td>
      <td style="padding: 16px;">
        <span style="background: #EAB308; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px;">Medium</span>
      </td>
      <td style="padding: 16px;">AWS deployments</td>
    </tr>
  </tbody>
</table>

### View Container Logs

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

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 30px 0;">

  <!-- DO Cards -->
  <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 12px;">
      <span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 600;">✅ DO</span>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Enable structured logging</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Set appropriate log retention</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Monitor resource usage</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Implement health checks</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Use centralized logging</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Set up alerts</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Monitor error rates</strong></li>
      <li style="padding: 8px 0;"><strong>Track performance metrics</strong></li>
    </ul>
  </div>

  <!-- DON'T Cards -->
  <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #EF4444; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 12px;">
      <span style="background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 600;">❌ DON'T</span>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't log sensitive data</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't ignore error logs</strong></li>
      <li style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Don't set unlimited retention</strong></li>
      <li style="padding: 8px 0;"><strong>Don't skip health checks</strong></li>
    </ul>
  </div>

</div>

---

## Quick Reference

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Command</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker logs -f container</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">View live logs</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker stats</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">Monitor resource usage</td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker inspect container</code>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">View health status</td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px;">
        <code style="background: #E0F2FE; padding: 4px 8px; border-radius: 4px; color: #0369A1;">docker events</code>
      </td>
      <td style="padding: 16px;">Monitor events</td>
    </tr>
  </tbody>
</table>

---

## Next Steps

- [Kubernetes Fundamentals](/docker-tutorials/15-kubernetes-basics)
- [Container Security Best Practices](/docker-tutorials/12-container-security)
