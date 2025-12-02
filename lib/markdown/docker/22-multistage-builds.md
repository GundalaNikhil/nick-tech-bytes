# Docker Multi-Stage Builds

## 1. Introduction

**Question:** What is multi-stage build in Docker and why is it important?

**What we're trying to achieve:** Learn to create optimized Docker images by separating build and runtime environments, dramatically reducing image sizes and improving security.

**Goal/Aim:** By the end of this tutorial, you'll master multi-stage builds to create production-ready images that are smaller, faster, and more secure.

---

## 2. How to Solve (Explained Simply)

Think of multi-stage builds like building a house:

**Without Multi-Stage (Single Stage):**

- You bring ALL construction equipment to the house
- Cement mixers, scaffolding, tools stay permanently
- The house is huge because it contains build materials
- Visitors see all the messy construction equipment

**With Multi-Stage:**

- Stage 1: Build the house with all equipment
- Stage 2: Copy only the finished house
- Leave behind cement mixers, scaffolding, tools
- Result: Clean, small, production-ready house

### Why Multi-Stage Builds?

1. **Smaller Images:** Don't include build dependencies in final image
2. **Security:** Fewer packages = smaller attack surface
3. **Clean Separation:** Build tools separate from runtime
4. **Faster Deployments:** Smaller images download faster
5. **Cost Savings:** Less storage and bandwidth

---

## 3. Visual Representation

### Image Size Comparison

<div style="background: linear-gradient(135deg, #F0F9FF, #E0F2FE); padding: 30px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <h3 style="color: #0369A1; margin: 0;">Single-Stage vs Multi-Stage Builds</h3>
  </div>
  
  <!-- Single Stage -->
  <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #EF4444;">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
      <h4 style="color: #DC2626; margin: 0;">❌ Single-Stage Build</h4>
      <span style="background: #FEE2E2; color: #991B1B; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 18px;">1.2 GB</span>
    </div>
    
    <div style="background: linear-gradient(to right, #FEE2E2, #DC2626); height: 40px; border-radius: 6px; margin-bottom: 15px;"></div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
      <div style="background: #FEE2E2; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">Node.js 18</div>
      <div style="background: #FEE2E2; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">Source Code</div>
      <div style="background: #FEE2E2; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">node_modules</div>
      <div style="background: #FEE2E2; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">Build Tools</div>
      <div style="background: #FEE2E2; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">Dev Dependencies</div>
      <div style="background: #FEE2E2; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">Build Artifacts</div>
    </div>
  </div>
  
  <!-- Multi Stage -->
  <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #22C55E;">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
      <h4 style="color: #15803D; margin: 0;">✅ Multi-Stage Build</h4>
      <span style="background: #D1FAE5; color: #166534; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 18px;">150 MB</span>
    </div>
    
    <div style="background: linear-gradient(to right, #D1FAE5, #22C55E); height: 40px; border-radius: 6px; width: 12.5%; margin-bottom: 15px;"></div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
      <div style="background: #D1FAE5; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">Node.js Slim</div>
      <div style="background: #D1FAE5; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">Built Files</div>
      <div style="background: #D1FAE5; padding: 10px; border-radius: 6px; text-align: center; font-size: 13px;">Prod Dependencies</div>
    </div>
    
    <div style="margin-top: 15px; padding: 12px; background: #ECFDF5; border-radius: 6px; text-align: center; color: #166534; font-weight: 600;">
      🎉 87% Size Reduction!
    </div>
  </div>
  
</div>

### Multi-Stage Build Flow

<div style="background: linear-gradient(135deg, #F0F9FF, #E0F2FE); padding: 24px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  
  <!-- Stage 1: Build -->
  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="background: linear-gradient(135deg, #8B5CF6, #7C3AED); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
    <div style="flex: 1; background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
      <strong style="color: #7C3AED; font-size: 16px;">BUILD Stage</strong>
      <div style="color: #6B7280; font-size: 14px; margin-top: 8px;">Full development environment</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-top: 12px;">
        <div style="background: #F3E8FF; padding: 8px; border-radius: 4px; font-size: 12px;">Install ALL dependencies</div>
        <div style="background: #F3E8FF; padding: 8px; border-radius: 4px; font-size: 12px;">Compile/Build app</div>
        <div style="background: #F3E8FF; padding: 8px; border-radius: 4px; font-size: 12px;">Run tests</div>
        <div style="background: #F3E8FF; padding: 8px; border-radius: 4px; font-size: 12px;">Create artifacts</div>
      </div>
    </div>
  </div>
  
  <!-- Arrow -->
  <div style="text-align: center; color: #6B7280; margin: 15px 0; font-size: 14px;">
    ↓ COPY only artifacts
  </div>
  
  <!-- Stage 2: Production -->
  <div style="display: flex; align-items: center;">
    <div style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
    <div style="flex: 1; background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E;">
      <strong style="color: #15803D; font-size: 16px;">PRODUCTION Stage</strong>
      <div style="color: #6B7280; font-size: 14px; margin-top: 8px;">Minimal runtime environment</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-top: 12px;">
        <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; font-size: 12px;">Minimal base image</div>
        <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; font-size: 12px;">Runtime deps only</div>
        <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; font-size: 12px;">Built artifacts only</div>
        <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; font-size: 12px;">No build tools</div>
      </div>
    </div>
  </div>
  
  <!-- Result -->
  <div style="text-align: center; margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 2px solid #22C55E;">
    <span style="font-size: 16px; font-weight: 600; color: #15803D;">✨ Final Image: Small & Secure ✨</span>
  </div>
  
</div>

---

## 4. Requirements / What Needs to Be Gathered

### Prerequisites:

- Dockerfile basics
- Understanding of build vs runtime dependencies
- Familiarity with your application's build process
- Docker installed

### Conceptual Requirements:

- What are build dependencies?
- What are runtime dependencies?
- Understanding of image layers
- Build process of your application

### Tools Needed:

- Docker
- Text editor
- Sample application to containerize

---

## 5. Key Topics to Consider & Plan of Action

### Multi-Stage Concepts:

1. **Multiple FROM Statements**

   - Each FROM starts a new stage
   - Stages can be named
   - Previous stages are discarded

2. **COPY --from**

   - Copy files from previous stages
   - Copy only what's needed
   - Leave build artifacts behind

3. **Stage Naming**
   - Name stages for clarity
   - Reference by name, not number
   - Easier to maintain

### Understanding Plan:

```
Step 1: Identify build vs runtime needs
↓
Step 2: Create builder stage
↓
Step 3: Create production stage
↓
Step 4: Copy only necessary files
↓
Step 5: Compare image sizes
```

---

## 6. Code Implementation

### Example 1: Simple Node.js App

**Single-Stage (Before):**

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install  # Installs ALL dependencies

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/server.js"]

# Image size: ~1.1 GB
```

**Multi-Stage (After):**

```dockerfile
# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install  # All dependencies including devDependencies

COPY . .
RUN npm run build
RUN npm test  # Run tests during build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production  # Only production dependencies

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]

# Image size: ~150 MB (87% reduction!)
```

```bash
# Build
docker build -t myapp:multistage .

# Compare sizes
docker images myapp
```

### Example 2: React Application

```dockerfile
# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Final size: ~25 MB (vs 300+ MB single stage)
```

### Example 3: Go Application (Best Example!)

```dockerfile
# Stage 1: Build
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Stage 2: Production
FROM alpine:latest

# Add ca-certificates for HTTPS
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy only the binary from builder
COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]

# Final size: ~15 MB (vs 800+ MB with golang image!)
```

### Example 4: Python Application

```dockerfile
# Stage 1: Build dependencies
FROM python:3.11 AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Production
FROM python:3.11-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /root/.local /root/.local

# Copy application code
COPY . .

# Update PATH
ENV PATH=/root/.local/bin:$PATH

EXPOSE 5000
CMD ["python", "app.py"]

# Size reduction: ~900 MB → ~180 MB
```

### Example 5: Java Spring Boot

```dockerfile
# Stage 1: Build with Maven
FROM maven:3.8-openjdk-17 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Runtime with JRE
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy jar from builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# Size: ~280 MB (vs 700+ MB with full JDK)
```

### Example 6: Multiple Builds in One Dockerfile

```dockerfile
# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage 2: Build backend
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build

# Stage 3: Production
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules

# Copy frontend build to serve
COPY --from=frontend-builder /app/frontend/build ./public

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Example 7: Development vs Production Stages

```dockerfile
# Base stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build
RUN npm test

# Production stage
FROM base AS production
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
CMD ["node", "dist/server.js"]
```

```bash
# Build for development
docker build --target development -t myapp:dev .

# Build for production (default)
docker build -t myapp:prod .

# Build for testing
docker build --target build -t myapp:test .
```

### Example 8: Using External Images in Stages

```dockerfile
# Stage 1: Get tools from official image
FROM hashicorp/terraform:latest AS terraform

# Stage 2: Get kubectl
FROM bitnami/kubectl:latest AS kubectl

# Stage 3: Final image with both tools
FROM alpine:latest

COPY --from=terraform /bin/terraform /usr/local/bin/
COPY --from=kubectl /opt/bitnami/kubectl/bin/kubectl /usr/local/bin/

# Now you have both terraform and kubectl
```

### Advanced: Named Build Arguments

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder

ARG BUILD_ENV=production
ARG API_URL

ENV REACT_APP_ENV=${BUILD_ENV}
ENV REACT_APP_API_URL=${API_URL}

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

ARG VERSION=unknown
LABEL version=${VERSION}

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

```bash
# Build with arguments
docker build \
  --build-arg BUILD_ENV=production \
  --build-arg API_URL=https://api.example.com \
  --build-arg VERSION=1.2.3 \
  -t myapp:1.2.3 .
```

---

## 7. Things to Consider

### Best Practices:

1. **Order Stages Logically**

   ```dockerfile
   # ✅ Good order
   FROM base AS dependencies
   FROM dependencies AS build
   FROM dependencies AS test
   FROM alpine AS production
   ```

2. **Name Your Stages**

   ```dockerfile
   # ✅ Good - named stages
   FROM node:18 AS builder
   FROM node:18-slim AS production

   # ❌ Avoid - unnamed stages
   FROM node:18
   FROM node:18-slim
   ```

3. **Use Minimal Base Images**

   ```dockerfile
   # ✅ Good - minimal
   FROM node:18-alpine
   FROM python:3.11-slim

   # ❌ Avoid - full images
   FROM node:18  # Too large
   FROM python:3.11  # Too large
   ```

4. **Copy Only What's Needed**

   ```dockerfile
   # ✅ Good - specific files
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/node_modules ./node_modules

   # ❌ Avoid - everything
   COPY --from=builder /app .
   ```

### Common Pitfalls:

❌ **Copying entire workspace** (includes build artifacts)
✅ Copy only production files from builder

❌ **Using full images for production** (unnecessary size)
✅ Use alpine or slim variants

❌ **Not running tests in build stage**
✅ Run tests before creating production image

❌ **Installing dev dependencies in production**
✅ Use `npm ci --only=production` or `pip install --no-dev`

### Size Comparison Examples:

<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin: 20px 0;">
  <thead>
    <tr style="background: linear-gradient(135deg, #0EA5E9, #6366F1);">
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Application</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Single-Stage</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Multi-Stage</th>
      <th style="color: white; padding: 16px; text-align: left; font-weight: 600;">Reduction</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #DBEAFE; color: #0369A1; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Node.js</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">1.1 GB</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #166534; padding: 4px 12px; border-radius: 6px; font-size: 13px;">150 MB</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">86%</span>
      </td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #DBEAFE; color: #0369A1; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">React</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">350 MB</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #166534; padding: 4px 12px; border-radius: 6px; font-size: 13px;">25 MB</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">93%</span>
      </td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #DBEAFE; color: #0369A1; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Go</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">800 MB</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #166534; padding: 4px 12px; border-radius: 6px; font-size: 13px;">15 MB</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">98%</span>
      </td>
    </tr>
    <tr style="background-color: #FFFFFF;">
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #DBEAFE; color: #0369A1; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Python</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">900 MB</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #D1FAE5; color: #166534; padding: 4px 12px; border-radius: 6px; font-size: 13px;">180 MB</span>
      </td>
      <td style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">80%</span>
      </td>
    </tr>
    <tr style="background-color: #F9FAFB;">
      <td style="padding: 16px;">
        <span style="background: #DBEAFE; color: #0369A1; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 500;">Java</span>
      </td>
      <td style="padding: 16px;">
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 6px; font-size: 13px;">700 MB</span>
      </td>
      <td style="padding: 16px;">
        <span style="background: #D1FAE5; color: #166534; padding: 4px 12px; border-radius: 6px; font-size: 13px;">280 MB</span>
      </td>
      <td style="padding: 16px;">
        <span style="background: #22C55E; color: white; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">60%</span>
      </td>
    </tr>
  </tbody>
</table>

---

## 8. Additional Helpful Sections

### Debugging Multi-Stage Builds

```bash
# Build and stop at specific stage
docker build --target builder -t myapp:builder .

# Inspect builder stage
docker run -it myapp:builder sh

# See all stages
docker build --target=builder .
docker build --target=test .
docker build --target=production .

# View build output
docker build --progress=plain .
```

### Build Cache Optimization

```dockerfile
# ✅ Optimized for cache
FROM node:18-alpine AS builder
WORKDIR /app

# These change rarely - cached
COPY package*.json ./
RUN npm install

# These change often - rebuilt
COPY src ./src
RUN npm run build

# ❌ Poor cache usage
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .  # Everything copied at once
RUN npm install && npm run build
```

### Real-World Complete Example

```dockerfile
# Multi-stage build for production-ready Node.js app
# Stage 1: Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Stage 2: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run lint && \
    npm run test && \
    npm run build

# Stage 3: Production
FROM node:18-alpine
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy dependencies from dependencies stage
COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy built application from build stage
COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --chown=nodejs:nodejs package.json ./

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/server.js"]
```

### Docker Compose with Multi-Stage

```yaml
# docker-compose.yml
version: "3.8"

services:
  app-dev:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development

  app-prod:
    build:
      context: .
      target: production
    environment:
      - NODE_ENV=production
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
```

### Analyzing Image Layers

```bash
# View layers
docker history myapp:latest

# Detailed layer information
docker image inspect myapp:latest

# Compare before and after
docker images | grep myapp
```

---

## Summary

Multi-stage builds dramatically reduce Docker image sizes by separating build and runtime environments. Use multiple `FROM` statements to create stages, name them with `AS`, and use `COPY --from=stage` to copy artifacts between stages. The builder stage includes all development tools and dependencies, while the final stage contains only the runtime essentials. This approach results in smaller images (often 80-90% size reduction), improved security (fewer packages), and faster deployments. Always use minimal base images like `alpine` or `slim` variants for production stages, and leverage build caching by copying dependency files before source code. Multi-stage builds are a Docker best practice that should be used in virtually all production Dockerfiles.
