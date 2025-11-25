# Containerizing a Node.js Application

## Overview

Learn how to containerize a Node.js application with best practices and optimization techniques.

---

## Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

CMD ["npm", "start"]
```

---

## Step 2: Create .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
dist
build
```

---

## Step 3: Build Image

```bash
# Build image
docker build -t my-node-app:1.0 .

# Run container
docker run -d -p 3000:3000 my-node-app:1.0

# Verify
curl http://localhost:3000
```

---

## Multi-Stage Build Example

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
USER node
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Docker Compose Example

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://user:pass@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  db-data:
```

---

## Best Practices

✅ **Use Alpine base image for smaller size**
✅ **Use npm ci instead of npm install in Docker**
✅ **Run as non-root user**
✅ **Use multi-stage builds**
✅ **Include health checks**
❌ **Don't use latest tag**
❌ **Don't include node_modules in COPY**

---

## Next Steps

- [Containerizing Python App](./10-containerize-python.md)
- [Docker Compose Basics](./06-docker-compose.md)
