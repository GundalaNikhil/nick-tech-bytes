# Docker Build Arguments (ARG)

## 1. Introduction

**Question:** What are Docker build arguments and how do you use them?

**What we're trying to achieve:** Learn to use build arguments (ARG) to create flexible, reusable Dockerfiles that can be customized at build time without modifying the Dockerfile.

**Goal/Aim:** By the end of this tutorial, you'll master using ARG for build-time customization, understand ARG vs ENV differences, and know how to pass build arguments securely.

---

## 2. How to Solve (Explained Simply)

Think of build arguments like a customizable pizza order form:

**Without Build Arguments (Hardcoded):**

- Pizza shop can only make one type of pizza
- Want different size? Need different kitchen
- Want different toppings? Need different recipe
- Very inflexible

**With Build Arguments (Customizable):**

- One recipe/kitchen (one Dockerfile)
- Customer specifies: size, toppings, crust type
- Same recipe, different inputs each time
- "I'll have a LARGE pizza with EXTRA cheese on THIN crust"
- Build arguments: SIZE=large, CHEESE=extra, CRUST=thin

### Why Use Build Arguments?

1. **Flexibility:** One Dockerfile, many variations
2. **Version Control:** Specify dependency versions at build time
3. **Environment-Specific:** Different builds for dev/staging/prod
4. **Reusability:** Share Dockerfiles across projects
5. **Clean Code:** No hardcoded values in Dockerfile

---

## 3. Visual Representation

```
┌────────────────────────────────────────────────────────────┐
│               ARG vs ENV Lifecycle                          │
└────────────────────────────────────────────────────────────┘

ARG (Build-time only):
┌─────────────┐
│   docker    │  --build-arg VERSION=1.2.3
│   build     │  ─────────────────────────┐
└─────────────┘                           │
       │                                  │
       ↓                                  ↓
┌──────────────────────────────────────────────┐
│  Dockerfile (during build)                   │
│  ARG VERSION=1.0.0  ← Default               │
│  FROM node:${VERSION}  ← Uses ARG           │
│  RUN echo "Building v${VERSION}"            │
└──────────────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Final Image (ARG not available!)            │
│  ARG values are NOT in the image            │
└──────────────────────────────────────────────┘


ENV (Runtime):
┌─────────────┐
│   docker    │
│   build     │
└─────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Dockerfile                                   │
│  ENV PORT=3000  ← Set at build               │
└──────────────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Final Image (ENV available)                 │
│  ENV values persist in image                 │
└──────────────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Running Container                            │
│  Environment variables accessible            │
└──────────────────────────────────────────────┘
```

### Build Argument Flow:

```
docker build --build-arg NODE_VERSION=18 .
                           │
                           ↓
                    ┌─────────────┐
                    │  ARG value  │
                    │  passed to  │
                    │  build      │
                    └─────────────┘
                           │
                           ↓
          ┌────────────────┴────────────────┐
          │  Available in Dockerfile        │
          │  FROM node:${NODE_VERSION}      │
          │  RUN npm install                │
          └─────────────────────────────────┘
                           │
                           ↓
                  ┌────────────────┐
                  │  NOT in final  │
                  │  image         │
                  └────────────────┘
```

---

## 4. Requirements / What Needs to Be Gathered

### Prerequisites:

- Dockerfile basics
- Understanding of build process
- Familiarity with docker build command
- Basic shell/environment variable knowledge

### Conceptual Requirements:

- Difference between build-time and runtime
- What is variable substitution?
- Understanding of default values
- Security implications of build args

### Tools Needed:

- Docker
- Text editor
- Sample Dockerfile

---

## 5. Key Topics to Consider & Plan of Action

### ARG Characteristics:

1. **Build-Time Only:** Available during image build
2. **Not Persisted:** Not in final image or running containers
3. **Overridable:** Can be overridden with `--build-arg`
4. **Scope:** Only available after declaration
5. **Default Values:** Can have defaults in Dockerfile

### ARG vs ENV:

<div style="overflow-x: auto; margin: 24px 0;">
<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
<thead>
<tr style="background: linear-gradient(135deg, #8B5CF6, #A855F7);">
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">Feature</th>
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">🔨 ARG</th>
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">🌍 ENV</th>
</tr>
</thead>
<tbody>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">When</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FED7AA, #FDBA74); color: #9A3412; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Build-time</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Runtime</span>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Availability</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; padding: 6px 12px; border-radius: 6px; font-weight: 500;">During build only</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-weight: 500;">In running containers</span>
</td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Override</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<code style="background: #E9D5FF; color: #6B21A8; padding: 4px 8px; border-radius: 4px;">--build-arg</code>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<code style="background: #DBEAFE; color: #1E40AF; padding: 4px 8px; border-radius: 4px;">-e or ENV</code>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Persisted</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEE2E2, #FECACA); color: #991B1B; padding: 6px 12px; border-radius: 6px; font-weight: 500;">No</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Yes</span>
</td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151;">Use Case</td>
<td style="padding: 14px;">
<span style="background: linear-gradient(135deg, #E9D5FF, #D8B4FE); color: #6B21A8; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Build customization</span>
</td>
<td style="padding: 14px;">
<span style="background: linear-gradient(135deg, #DBEAFE, #BFDBFE); color: #1E40AF; padding: 6px 12px; border-radius: 6px; font-weight: 500;">App configuration</span>
</td>
</tr>
</tbody>
</table>
</div>

| Feature          | ARG                 | ENV                       |
| ---------------- | ------------------- | ------------------------- |
| **When**         | Build-time          | Runtime                   |
| **Availability** | During build only   | In running containers     |
| **Override**     | `--build-arg`       | `-e` or ENV in Dockerfile |
| **Persisted**    | No                  | Yes                       |
| **Use Case**     | Build customization | App configuration         |

### Understanding Plan:

```
Step 1: Identify what should be configurable
↓
Step 2: Add ARG declarations
↓
Step 3: Use ARG in Dockerfile
↓
Step 4: Pass values during build
↓
Step 5: Combine ARG with ENV if needed
```

---

## 6. Code Implementation

### Basic ARG Usage

```dockerfile
# Dockerfile with build arguments
FROM ubuntu:22.04

# Declare build argument with default
ARG APP_VERSION=1.0.0
ARG BUILD_DATE
ARG PYTHON_VERSION=3.11

# Install Python (version from ARG)
RUN apt-get update && \
    apt-get install -y python${PYTHON_VERSION} && \
    rm -rf /var/lib/apt/lists/*

# Set labels using ARG
LABEL version="${APP_VERSION}"
LABEL build_date="${BUILD_DATE}"

WORKDIR /app

CMD ["python3", "--version"]
```

```bash
# Build with default values
docker build -t myapp:default .

# Build with custom values
docker build \
  --build-arg APP_VERSION=2.0.0 \
  --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
  --build-arg PYTHON_VERSION=3.12 \
  -t myapp:2.0.0 .

# Verify labels
docker inspect myapp:2.0.0 --format='{{.Config.Labels}}'
```

### ARG with Base Image Selection

```dockerfile
# Flexible base image selection
ARG NODE_VERSION=18
ARG VARIANT=alpine

FROM node:${NODE_VERSION}-${VARIANT}

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Build with Node 18 Alpine (default)
docker build -t myapp:node18-alpine .

# Build with Node 20 Debian
docker build \
  --build-arg NODE_VERSION=20 \
  --build-arg VARIANT=bullseye \
  -t myapp:node20-debian .

# Build with Node 16 Alpine
docker build \
  --build-arg NODE_VERSION=16 \
  -t myapp:node16 .
```

### Multi-Stage Build with ARG

```dockerfile
# Multi-stage with build arguments
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine AS builder

ARG BUILD_ENV=production
ARG API_URL=https://api.example.com
ARG ENABLE_ANALYTICS=false

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Set environment variables for build
ENV REACT_APP_ENV=${BUILD_ENV}
ENV REACT_APP_API_URL=${API_URL}
ENV REACT_APP_ANALYTICS=${ENABLE_ANALYTICS}

# Build application
COPY . .
RUN npm run build

# Production stage
ARG NGINX_VERSION=alpine
FROM nginx:${NGINX_VERSION}

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Development build
docker build \
  --build-arg BUILD_ENV=development \
  --build-arg API_URL=http://localhost:3001 \
  --build-arg ENABLE_ANALYTICS=false \
  -t myapp:dev .

# Production build
docker build \
  --build-arg BUILD_ENV=production \
  --build-arg API_URL=https://api.production.com \
  --build-arg ENABLE_ANALYTICS=true \
  -t myapp:prod .

# Staging build
docker build \
  --build-arg BUILD_ENV=staging \
  --build-arg API_URL=https://api.staging.com \
  -t myapp:staging .
```

### ARG Scope and Global ARG

```dockerfile
# Global ARG (before FROM)
ARG BASE_IMAGE=node:18-alpine

FROM ${BASE_IMAGE}

# This ARG is only available in this stage
ARG APP_NAME=myapp

WORKDIR /app

# Another FROM - need to redeclare ARG
FROM alpine:latest

# Re-declare global ARG to use it
ARG BASE_IMAGE

RUN echo "Built from ${BASE_IMAGE}"
```

### Converting ARG to ENV

```dockerfile
# Use ARG during build, persist as ENV
FROM node:18-alpine

# Build argument
ARG APP_VERSION=1.0.0
ARG NODE_ENV=production

# Convert to environment variable (persisted in image)
ENV APP_VERSION=${APP_VERSION}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Now APP_VERSION and NODE_ENV are available at runtime
CMD ["node", "server.js"]
```

```bash
# Build
docker build --build-arg APP_VERSION=2.1.0 -t myapp:2.1.0 .

# Run - environment variables are available
docker run myapp:2.1.0 printenv APP_VERSION
# Output: 2.1.0
```

### Conditional Logic with ARG

```dockerfile
FROM ubuntu:22.04

# Build argument for environment
ARG ENVIRONMENT=production

# Install different tools based on environment
RUN if [ "$ENVIRONMENT" = "development" ]; then \
        apt-get update && apt-get install -y \
        vim \
        curl \
        git \
        build-essential; \
    else \
        apt-get update && apt-get install -y \
        curl; \
    fi && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Different commands based on environment
RUN if [ "$ENVIRONMENT" = "development" ]; then \
        echo "Development mode enabled"; \
    else \
        echo "Production mode"; \
    fi
```

```bash
# Development build
docker build --build-arg ENVIRONMENT=development -t myapp:dev .

# Production build
docker build --build-arg ENVIRONMENT=production -t myapp:prod .
```

### Real-World Example: Python Application

```dockerfile
# Flexible Python app Dockerfile
ARG PYTHON_VERSION=3.11
FROM python:${PYTHON_VERSION}-slim

# Build arguments
ARG APP_VERSION=1.0.0
ARG BUILD_DATE
ARG VCS_REF
ARG INSTALL_DEV=false

# Labels
LABEL org.opencontainers.image.version="${APP_VERSION}" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.revision="${VCS_REF}"

WORKDIR /app

# Copy requirements
COPY requirements.txt requirements-dev.txt ./

# Install dependencies based on INSTALL_DEV
RUN pip install --no-cache-dir -r requirements.txt && \
    if [ "$INSTALL_DEV" = "true" ]; then \
        pip install --no-cache-dir -r requirements-dev.txt; \
    fi

# Copy application
COPY . .

# Persist version as ENV
ENV APP_VERSION=${APP_VERSION}

EXPOSE 5000

CMD ["python", "app.py"]
```

```bash
# Production build
docker build \
  --build-arg PYTHON_VERSION=3.11 \
  --build-arg APP_VERSION=1.2.3 \
  --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  --build-arg INSTALL_DEV=false \
  -t myapp:1.2.3 .

# Development build
docker build \
  --build-arg PYTHON_VERSION=3.12 \
  --build-arg INSTALL_DEV=true \
  -t myapp:dev .
```

### Using Build Arguments from File

```bash
# build-args.txt
NODE_VERSION=20
APP_VERSION=3.0.0
BUILD_ENV=production
API_URL=https://api.example.com
```

```bash
# Load from file (using xargs)
cat build-args.txt | xargs -I {} docker build --build-arg {} -t myapp .

# Or create a script
#!/bin/bash
# build.sh

while IFS='=' read -r key value; do
  BUILD_ARGS="$BUILD_ARGS --build-arg $key=$value"
done < build-args.txt

docker build $BUILD_ARGS -t myapp .
```

### Docker Compose with Build Arguments

```yaml
# docker-compose.yml
version: "3.8"

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - NODE_VERSION=18
        - BUILD_ENV=production
        - API_URL=${API_URL} # From .env file
    image: myapp:latest

  api:
    build:
      context: ./api
      args:
        PYTHON_VERSION: "3.11"
        APP_VERSION: "2.0.0"
        INSTALL_DEV: "false"
    image: myapi:2.0.0
```

```bash
# .env file
API_URL=https://api.production.com
```

```bash
# Build with docker-compose
docker-compose build

# Override build args
docker-compose build --build-arg NODE_VERSION=20
```

---

## 7. Things to Consider

### Best Practices:

1. **Provide Defaults**

   ```dockerfile
   # ✅ Good - has default
   ARG NODE_VERSION=18

   # ❌ Avoid - no default (fails if not provided)
   ARG NODE_VERSION
   ```

2. **Document ARG Usage**

   ```dockerfile
   # Application version (default: 1.0.0)
   ARG APP_VERSION=1.0.0

   # Node.js version to use (16, 18, 20)
   ARG NODE_VERSION=18
   ```

3. **Use ARG for Build Configuration**

   ```dockerfile
   # ✅ Good - build-time configuration
   ARG ENVIRONMENT=production
   ARG INSTALL_DEV_TOOLS=false

   # ❌ Avoid - runtime configuration (use ENV)
   ARG DATABASE_PASSWORD  # Use ENV instead!
   ```

4. **Secure Sensitive Data**

   ```dockerfile
   # ❌ NEVER - secrets visible in build history
   ARG SECRET_KEY=my-secret

   # ✅ Use Docker secrets or ENV at runtime
   ```

### Common Pitfalls:

❌ **Using ARG for secrets** (visible in docker history)
✅ Use ENV at runtime or Docker secrets

❌ **Forgetting to redeclare ARG after FROM**
✅ Redeclare ARG in each stage that needs it

❌ **No default values**
✅ Always provide sensible defaults

❌ **Using ARG for runtime config**
✅ Use ENV for values needed at runtime

### Security Considerations:

```bash
# ⚠️ Build args are visible in image history
docker history myapp

# ⚠️ Anyone can see build args
docker inspect myapp --format='{{.Config}}}'

# ✅ For secrets, use runtime ENV or Docker secrets
docker run -e SECRET_KEY=$SECRET myapp

# ✅ Or use multi-stage and don't persist secrets
```

---

## 8. Additional Helpful Sections

### Viewing Build Arguments

```bash
# See build arguments used
docker history myapp --no-trunc

# Inspect image metadata
docker inspect myapp --format='{{.ContainerConfig.Labels}}'

# During build, print ARG values
```

```dockerfile
# Dockerfile - print ARG values during build
ARG NODE_VERSION=18
ARG APP_VERSION=1.0.0

RUN echo "Building with Node ${NODE_VERSION}, version ${APP_VERSION}"
```

### Pre-defined Build Arguments

Docker provides some built-in ARGs:

```dockerfile
# These ARGs are automatically available
ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG FTP_PROXY
ARG NO_PROXY

# Use them
RUN if [ -n "$HTTP_PROXY" ]; then \
        echo "Using proxy: $HTTP_PROXY"; \
    fi
```

```bash
# Set proxy for build
docker build \
  --build-arg HTTP_PROXY=http://proxy.example.com:8080 \
  -t myapp .
```

### ARG with Dynamic Values

```bash
# Use command substitution
docker build \
  --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
  --build-arg GIT_COMMIT=$(git rev-parse HEAD) \
  --build-arg VERSION=$(cat VERSION) \
  -t myapp:$(cat VERSION) .
```

### Complete CI/CD Example

```dockerfile
# Dockerfile
ARG CI_COMMIT_SHA
ARG CI_COMMIT_TAG
ARG CI_PIPELINE_ID
ARG BUILD_DATE

FROM node:18-alpine

# Metadata labels
LABEL git.commit="${CI_COMMIT_SHA}" \
      git.tag="${CI_COMMIT_TAG}" \
      pipeline.id="${CI_PIPELINE_ID}" \
      build.date="${BUILD_DATE}"

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Persist build info as ENV
ENV BUILD_INFO="commit=${CI_COMMIT_SHA},tag=${CI_COMMIT_TAG}"

CMD ["node", "server.js"]
```

```yaml
# .gitlab-ci.yml
build:
  script:
    - docker build \
      --build-arg CI_COMMIT_SHA=$CI_COMMIT_SHA \
      --build-arg CI_COMMIT_TAG=$CI_COMMIT_TAG \
      --build-arg CI_PIPELINE_ID=$CI_PIPELINE_ID \
      --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
      -t $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG .
```

### Quick Reference

| Scenario      | Command                           | Use Case                   |
| ------------- | --------------------------------- | -------------------------- |
| Default value | `ARG NAME=value`                  | Fallback if not provided   |
| No default    | `ARG NAME`                        | Required from command line |
| Override      | `--build-arg NAME=value`          | Custom build               |
| Multiple args | `--build-arg A=1 --build-arg B=2` | Multiple values            |
| From env      | `--build-arg VAR`                 | Use host's $VAR            |
| Persist       | `ENV VAR=${ARG_VAR}`              | Make available at runtime  |

---

## Summary

Docker build arguments (ARG) enable build-time customization of Dockerfiles without modifying the file itself. Use `ARG` to declare build arguments with optional defaults, and pass values using `--build-arg` during docker build. ARG is build-time only and not persisted in the final image, unlike ENV which is runtime and persisted. Common use cases include selecting base image versions, setting build environments, and injecting metadata. Always provide default values for ARG declarations, never use ARG for secrets (they're visible in image history), and convert ARG to ENV if values are needed at runtime. Build arguments make Dockerfiles flexible and reusable across different environments and configurations while keeping the Dockerfile DRY (Don't Repeat Yourself). For multi-stage builds, remember that ARG scope is limited to the stage where it's declared unless redeclared in subsequent stages.
