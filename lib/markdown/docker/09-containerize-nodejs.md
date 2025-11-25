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

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid rgba(34, 197, 94, 0.3);">

<h3 style="color: #22C55E; margin-bottom: 20px;">✅ Node.js Containerization Best Practices</h3>

<div style="display: grid; gap: 12px;">

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22C55E;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #16A34A;">Use Alpine base image for smaller size</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Alpine images are 5-10x smaller than regular Node images</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #0EA5E9;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #0EA5E9, #3B82F6); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0284C7;">Use npm ci instead of npm install</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">npm ci is faster and more reliable for CI/CD environments</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #8B5CF6, #A855F7); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #7C3AED;">Run as non-root user</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Improves security by limiting container privileges</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14B8A6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #14B8A6, #06B6D4); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0D9488;">Use multi-stage builds</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Separate build and runtime environments for smaller images</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #10B981;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #10B981, #22C55E); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #059669;">Include health checks</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Enable container health monitoring for production</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #EF4444;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #EF4444, #F97316); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #DC2626;">Use latest tag</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Specify exact versions for reproducible builds</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #F97316;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #F97316, #FB923C); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #EA580C;">Include node_modules in COPY</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Use .dockerignore to exclude node_modules and let npm install them</div>
</div>

</div>

</div>

---

## Next Steps

- [Containerizing Python App](/docker-tutorials/10-containerize-python)
- [Docker Compose Basics](/docker-tutorials/06-docker-compose)
