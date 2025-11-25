# Docker Compose Basics

## What You'll Learn

- Docker Compose fundamentals
- Writing docker-compose.yml files
- Managing multi-container applications
- Networking and volumes with Compose

---

## Introduction to Docker Compose

### What is Docker Compose?

Docker Compose is a tool for defining and running **multi-container Docker applications**. You describe your entire application stack in a single `docker-compose.yml` file, then bring it up with a single command.

### Why Use Docker Compose?

<div style="overflow-x: auto; margin: 24px 0;">
<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
<thead>
<tr style="background: linear-gradient(135deg, #8B5CF6, #A855F7);">
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">Feature</th>
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">Benefit</th>
</tr>
</thead>
<tbody>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #E9D5FF, #D8B4FE); color: #6B21A8; padding: 6px 12px; border-radius: 6px;">📄 Single File Definition</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; color: #4B5563;">Define entire stack in one file</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px;">⚡ One Command</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; color: #4B5563;">Start all services with <code>docker-compose up</code></td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #DBEAFE, #BFDBFE); color: #1E40AF; padding: 6px 12px; border-radius: 6px;">🌐 Networking</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; color: #4B5563;">Automatic service discovery</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; padding: 6px 12px; border-radius: 6px;">🔧 Environment Management</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; color: #4B5563;">Environment variables and .env files</td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FED7AA, #FDBA74); color: #9A3412; padding: 6px 12px; border-radius: 6px;">💻 Development</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB; color: #4B5563;">Speeds up local development</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151;">
<span style="background: linear-gradient(135deg, #FBCFE8, #F9A8D4); color: #831843; padding: 6px 12px; border-radius: 6px;">💾 Volume Management</span>
</td>
<td style="padding: 14px; color: #4B5563;">Easy persistent data handling</td>
</tr>
</tbody>
</table>
</div>

| Feature                    | Benefit                                     |
| -------------------------- | ------------------------------------------- |
| **Single File Definition** | Define entire stack in one file             |
| **One Command**            | Start all services with `docker-compose up` |
| **Networking**             | Automatic service discovery                 |
| **Environment Management** | Environment variables and .env files        |
| **Development**            | Speeds up local development                 |
| **Volume Management**      | Easy persistent data handling               |

---

## Installation

### macOS & Windows

Docker Compose comes included with Docker Desktop. Verify installation:

```bash
docker-compose --version
docker compose --version  # v2 syntax
```

### Linux

```bash
# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose

# Make executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version
```

---

## Basic docker-compose.yml Structure

### Simple Example

```yaml
version: "3.8"

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: example
```

### Complete Example

```yaml
version: "3.8"

# Services to run
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://db:5432/myapp
    depends_on:
      - db
    volumes:
      - ./src:/app/src
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

# Named volumes
volumes:
  postgres-data:

# Custom networks
networks:
  app-network:
    driver: bridge
```

---

## Common Compose Directives

### Services

Defines containers to run:

```yaml
services:
  myservice:
    # Configuration...
```

### Image vs Build

```yaml
services:
  # Use existing image
  database:
    image: postgres:15-alpine

  # Build from Dockerfile
  web:
    build: .
    # Or specify Dockerfile path
    build:
      context: .
      dockerfile: Dockerfile.prod
      args:
        NODE_ENV: production
```

### Ports

Map ports between host and container:

```yaml
services:
  web:
    ports:
      - "8080:80" # host:container
      - "3000:3000"
      - "127.0.0.1:8000:8000" # host IP:host port:container port
```

### Environment Variables

```yaml
services:
  db:
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
      # Or use env_file
    env_file:
      - .env
      - .env.local
```

### Volumes

```yaml
services:
  web:
    volumes:
      - ./src:/app/src # Bind mount
      - /app/node_modules # Anonymous volume
      - data:/data # Named volume

volumes:
  data:
    # Optional: specify driver or options
    driver: local
```

### Networks

```yaml
services:
  web:
    networks:
      - frontend

  api:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

### Dependencies

```yaml
services:
  web:
    depends_on:
      - db
      - redis
    # Wait for service to be healthy
    depends_on:
      db:
        condition: service_healthy
```

### Health Checks

```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Resource Limits

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
        reservations:
          cpus: "0.25"
          memory: 256M
```

### Restart Policies

```yaml
services:
  web:
    restart_policy:
      condition: on-failure
      delay: 5s
      max_attempts: 5
      window: 120s
    # Or shorthand
    restart_policy: always
```

---

## Practical Examples

### Node.js + PostgreSQL + Redis

```yaml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/myapp
      REDIS_URL: redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./src:/app/src
      - /app/node_modules
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
```

### Full Stack with Frontend

```yaml
version: "3.8"

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://api:5000
    depends_on:
      - api
    networks:
      - app-network

  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/app
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
```

---

## Common Commands

### Starting & Stopping

```bash
# Start services in background
docker-compose up -d

# Start with output
docker-compose up

# Start specific service
docker-compose up web

# Stop services
docker-compose down

# Stop without removing volumes
docker-compose stop

# Restart services
docker-compose restart

# Rebuild and start
docker-compose up --build
```

### Viewing Logs

```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View specific service logs
docker-compose logs web

# Last 100 lines
docker-compose logs --tail=100 web
```

### Executing Commands

```bash
# Run command in service
docker-compose exec web bash

# Run as specific user
docker-compose exec -u root web apt-get update

# Run without allocating TTY
docker-compose exec -T web npm test
```

### Managing Services

```bash
# List running services
docker-compose ps

# Show service images
docker-compose images

# Pull latest images
docker-compose pull

# Remove stopped containers and networks
docker-compose down

# Remove volumes too
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

---

## Environment Variables

### Using .env Files

Create `.env` file:

```
DATABASE_PASSWORD=secretpassword
NODE_ENV=production
PORT=3000
```

Reference in compose:

```yaml
version: "3.8"

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}

  web:
    build: .
    environment:
      NODE_ENV: ${NODE_ENV}
      PORT: ${PORT}
    ports:
      - "${PORT}:${PORT}"
```

---

## Troubleshooting

### Service Won't Start

```bash
# Check logs
docker-compose logs web

# Check service status
docker-compose ps

# Validate compose file
docker-compose config
```

### Network Connectivity Issues

```bash
# Check networks
docker-compose networks ls

# Test connection between services
docker-compose exec web ping db

# Inspect network
docker-compose exec web nslookup db
```

### Volume Permission Issues

```bash
# Check volume mounting
docker-compose exec web ls -la /app

# Run as specific user
docker-compose exec -u 1000:1000 web bash
```

### Port Already in Use

```bash
# Change port in compose file
ports:
  - "8000:80"  # Use 8000 instead

# Or restart other services
docker-compose down
```

---

## Best Practices

✅ **Do:**

- Use meaningful service names
- Pin image versions (not `latest`)
- Use depends_on with health checks
- Separate dev and prod configs
- Use named volumes for persistence
- Document environment variables
- Use .env files for secrets in development

❌ **Don't:**

- Store secrets in docker-compose.yml
- Use `latest` tag in production
- Share volumes between unrelated services
- Ignore health checks
- Run everything as root
- Keep unused volumes and networks

---

## Advanced Topics

### Override Files

Use multiple compose files for different environments:

```bash
# Production with overrides
docker-compose -f docker-compose.yml \
  -f docker-compose.prod.yml up -d
```

### Extends

Reuse configurations:

```yaml
version: "3.8"

services:
  base:
    image: node:18-alpine
    environment:
      NODE_ENV: production

  web:
    extends: base
    build: .
    ports:
      - "3000:3000"
```

---

## Quick Reference

| Command                        | Purpose                      |
| ------------------------------ | ---------------------------- |
| `docker-compose up -d`         | Start services in background |
| `docker-compose down`          | Stop and remove services     |
| `docker-compose logs -f`       | View live logs               |
| `docker-compose exec web bash` | Execute shell in service     |
| `docker-compose ps`            | List running services        |
| `docker-compose config`        | Validate compose file        |

---

## Next Steps

- [Docker Networking](/docker-tutorials/07-docker-networking)
- [Docker Volumes & Data Persistence](/docker-tutorials/08-docker-volumes)
- [Containerizing Node.js App](/docker-tutorials/09-containerize-nodejs)
