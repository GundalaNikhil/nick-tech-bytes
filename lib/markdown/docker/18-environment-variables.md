# Docker Environment Variables

## 1. Introduction

**Question:** What are Docker environment variables and how do you use them?

**What we're trying to achieve:** Understand how to use environment variables to configure containers without hardcoding values, making applications portable and secure.

**Goal/Aim:** By the end of this tutorial, you'll master using environment variables in Docker for configuration, secrets management, and making your containers flexible across different environments.

---

## 2. How to Solve (Explained Simply)

Think of environment variables like switches and dials on a machine:

**Without Environment Variables:**
- You build a coffee machine that's hardcoded to make "Medium, Regular coffee"
- To change it, you need to rebuild the entire machine
- Different offices need different machines

**With Environment Variables:**
- You build ONE coffee machine with adjustable settings
- SIZE=Large, TYPE=Decaf (just change the dials)
- Same machine works everywhere, just adjust the settings

### Why Use Environment Variables?

1. **Configuration:** Different settings for dev/staging/production
2. **Secrets:** Database passwords, API keys (never hardcode!)
3. **Portability:** Same image works in different environments
4. **Flexibility:** Change behavior without rebuilding images
5. **Security:** Keep sensitive data out of source code

---

## 3. Visual Representation

```
┌──────────────────────────────────────────────────────────┐
│          Environment Variables Flow                       │
└──────────────────────────────────────────────────────────┘

Without Environment Variables:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│     DEV      │     │   STAGING    │     │     PROD     │
│              │     │              │     │              │
│  Image v1    │     │  Image v2    │     │  Image v3    │
│ DB=localhost │     │ DB=stage-db  │     │ DB=prod-db   │
│ PORT=3000    │     │ PORT=4000    │     │ PORT=5000    │
└──────────────┘     └──────────────┘     └──────────────┘
   3 different images needed!


With Environment Variables:
┌──────────────────────────────────────────────────────────┐
│                   Same Image                              │
│            myapp:1.0 (one image)                         │
└──────────────────────────────────────────────────────────┘
         ↓              ↓              ↓
    ┌────────┐     ┌────────┐     ┌────────┐
    │  DEV   │     │ STAGING│     │  PROD  │
    │────────│     │────────│     │────────│
    │ENV vars│     │ENV vars│     │ENV vars│
    │────────│     │────────│     │────────│
    │DB=local│     │DB=stage│     │DB=prod │
    │PORT=300│     │PORT=400│     │PORT=500│
    └────────┘     └────────┘     └────────┘
```

### Environment Variable Priority:

```
Priority (Highest to Lowest):
┌────────────────────────────────────┐
│ 1. docker run -e (command line)    │ ← Highest priority
├────────────────────────────────────┤
│ 2. docker-compose.yml environment  │
├────────────────────────────────────┤
│ 3. .env file                       │
├────────────────────────────────────┤
│ 4. Dockerfile ENV                  │ ← Lowest priority
└────────────────────────────────────┘
```

---

## 4. Requirements / What Needs to Be Gathered

### Prerequisites:

- Docker basics
- Understanding of shell environment variables
- Basic application configuration knowledge
- Familiarity with Dockerfile

### Conceptual Requirements:

- What are environment variables?
- How applications read configuration
- Security considerations for secrets
- Different environments (dev/staging/prod)

### Tools Needed:

- Docker
- Text editor
- Sample application

---

## 5. Key Topics to Consider & Plan of Action

### Ways to Set Environment Variables:

1. **In Dockerfile** (defaults)
2. **Command line** with `-e` or `--env`
3. **Environment file** with `--env-file`
4. **Docker Compose** in YAML
5. **.env file** with Docker Compose

### Variable Scope:

- **Build-time:** ARG (only during image build)
- **Run-time:** ENV (in running container)

### Understanding Plan:

```
Step 1: Define defaults in Dockerfile
↓
Step 2: Override with docker run
↓
Step 3: Use environment files
↓
Step 4: Implement in Docker Compose
↓
Step 5: Handle secrets securely
```

---

## 6. Code Implementation

### Method 1: Dockerfile ENV

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Set environment variables (defaults)
ENV NODE_ENV=production
ENV PORT=3000
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV LOG_LEVEL=info

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Use environment variable in CMD
CMD ["node", "server.js"]
```

```javascript
// server.js - Using environment variables
const express = require('express');
const app = express();

// Read from environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_HOST = process.env.DB_HOST;

console.log(`Starting server in ${NODE_ENV} mode`);
console.log(`Database: ${DB_HOST}:${process.env.DB_PORT}`);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Method 2: Command Line with -e

```bash
# Single environment variable
docker run -e NODE_ENV=development myapp

# Multiple environment variables
docker run \
  -e NODE_ENV=production \
  -e PORT=8080 \
  -e DB_HOST=db.example.com \
  -e DB_PORT=5432 \
  myapp

# Set from host environment variable
docker run -e AWS_ACCESS_KEY_ID myapp
# Passes the value from host's $AWS_ACCESS_KEY_ID
```

### Method 3: Environment File

```bash
# .env.production
NODE_ENV=production
PORT=8080
DB_HOST=prod-db.example.com
DB_PORT=5432
DB_NAME=myapp_prod
DB_USER=app_user
# Comments are supported
LOG_LEVEL=error
API_KEY=super-secret-key
```

```bash
# Use environment file
docker run --env-file .env.production myapp

# Combine with additional variables
docker run \
  --env-file .env.production \
  -e DEBUG=true \
  myapp
```

### Method 4: Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    image: myapp:latest
    # Method 1: Inline environment variables
    environment:
      NODE_ENV: production
      PORT: 8080
      DB_HOST: db
      
  api:
    image: myapi:latest
    # Method 2: Array format
    environment:
      - NODE_ENV=production
      - PORT=3000
      
  database:
    image: postgres:15
    # Method 3: Environment file
    env_file:
      - .env.database
      
  worker:
    image: myworker:latest
    # Method 4: Multiple env files
    env_file:
      - .env.common
      - .env.worker
    environment:
      # Override specific variable
      LOG_LEVEL: debug
```

### Method 5: Using .env with Docker Compose

```bash
# .env (automatically loaded by docker-compose)
COMPOSE_PROJECT_NAME=myapp
NODE_VERSION=18
DB_VERSION=15

# These can be used in docker-compose.yml
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    image: node:${NODE_VERSION}-alpine
    environment:
      NODE_ENV: ${NODE_ENV:-production}  # Default to production
      
  db:
    image: postgres:${DB_VERSION}
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
```

```bash
# Run with .env file
docker-compose up -d
```

### Example: Complete Web Application

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Build-time variable (only during build)
ARG APP_VERSION=1.0.0

# Runtime variables with defaults
ENV FLASK_APP=app.py \
    FLASK_ENV=production \
    DATABASE_URL=sqlite:///app.db \
    SECRET_KEY=change-me-in-production \
    MAX_WORKERS=4 \
    PORT=5000

# Set build version as env var
ENV VERSION=${APP_VERSION}

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE ${PORT}

CMD gunicorn -w ${MAX_WORKERS} -b 0.0.0.0:${PORT} app:app
```

```python
# app.py
import os
from flask import Flask

app = Flask(__name__)

# Read environment variables
app.config['DATABASE_URL'] = os.getenv('DATABASE_URL')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['MAX_WORKERS'] = int(os.getenv('MAX_WORKERS', 4))

@app.route('/config')
def show_config():
    return {
        'environment': os.getenv('FLASK_ENV'),
        'version': os.getenv('VERSION'),
        'database': os.getenv('DATABASE_URL'),
        'workers': os.getenv('MAX_WORKERS')
    }

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

```bash
# Development
docker build --build-arg APP_VERSION=1.0.0 -t myapp:1.0.0 .
docker run \
  -e FLASK_ENV=development \
  -e DATABASE_URL=postgresql://localhost/dev \
  -e SECRET_KEY=dev-secret \
  -p 5000:5000 \
  myapp:1.0.0

# Production
docker run \
  -e FLASK_ENV=production \
  -e DATABASE_URL=postgresql://prod-db/myapp \
  -e SECRET_KEY=$(cat /secure/secret.key) \
  -e MAX_WORKERS=8 \
  -e PORT=8080 \
  -p 8080:8080 \
  myapp:1.0.0
```

### Example: Multi-Stage Build with ARG and ENV

```dockerfile
# Dockerfile with build arguments
FROM node:18-alpine AS builder

# Build-time arguments
ARG BUILD_ENV=production
ARG API_URL
ARG ENABLE_ANALYTICS=false

# Set as environment variables for build
ENV REACT_APP_ENV=${BUILD_ENV}
ENV REACT_APP_API_URL=${API_URL}
ENV REACT_APP_ANALYTICS=${ENABLE_ANALYTICS}

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
# Build uses the environment variables
RUN npm run build

# Production stage
FROM nginx:alpine

# Runtime environment variables
ENV NGINX_PORT=80
ENV NGINX_HOST=localhost

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE ${NGINX_PORT}
```

```bash
# Build with custom arguments
docker build \
  --build-arg BUILD_ENV=production \
  --build-arg API_URL=https://api.example.com \
  --build-arg ENABLE_ANALYTICS=true \
  -t myapp:prod .

# Build for staging
docker build \
  --build-arg BUILD_ENV=staging \
  --build-arg API_URL=https://staging-api.example.com \
  -t myapp:staging .
```

### Example: Environment-Specific Configurations

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      args:
        - BUILD_ENV=${BUILD_ENV}
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - API_URL=${API_URL}
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
      
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/postgresql/data
      
  redis:
    image: redis:7-alpine
    
volumes:
  db_data:
```

```bash
# .env.development
NODE_ENV=development
BUILD_ENV=development
API_URL=http://localhost:3000
DB_NAME=myapp_dev
DB_USER=dev_user
DB_PASSWORD=dev_password
DEBUG=true

# .env.production
NODE_ENV=production
BUILD_ENV=production
API_URL=https://api.production.com
DB_NAME=myapp_prod
DB_USER=prod_user
DB_PASSWORD=super-secure-password
DEBUG=false
```

```bash
# Development
docker-compose --env-file .env.development up

# Production
docker-compose --env-file .env.production up -d
```

---

## 7. Things to Consider

### Best Practices:

1. **Never Hardcode Secrets**
   ```dockerfile
   # ❌ BAD - Secret in Dockerfile
   ENV DB_PASSWORD=mysecretpassword
   
   # ✅ GOOD - Secret from environment
   # Set at runtime: docker run -e DB_PASSWORD=$SECRET
   ```

2. **Provide Sensible Defaults**
   ```dockerfile
   # Good defaults for non-sensitive values
   ENV NODE_ENV=production \
       PORT=3000 \
       LOG_LEVEL=info
   ```

3. **Use ARG for Build-Time, ENV for Runtime**
   ```dockerfile
   # Build-time only
   ARG NODE_VERSION=18
   FROM node:${NODE_VERSION}
   
   # Runtime variable
   ENV PORT=3000
   ```

4. **Document Required Variables**
   ```dockerfile
   # Required environment variables:
   # - DB_HOST: Database hostname
   # - DB_PASSWORD: Database password (required)
   # - API_KEY: External API key (required)
   ```

### Security Considerations:

```bash
# ❌ BAD - Secrets in plain text files
echo "DB_PASSWORD=secret123" > .env
git add .env  # NEVER DO THIS!

# ✅ GOOD - Use .env.example for template
echo "DB_PASSWORD=your-password-here" > .env.example
echo ".env" >> .gitignore

# ✅ GOOD - Use Docker secrets (Swarm/Kubernetes)
echo "mysecret" | docker secret create db_password -

# ✅ GOOD - Use secret management tools
docker run -e DB_PASSWORD=$(aws secretsmanager get-secret-value ...)
```

### Common Pitfalls:

❌ **Committing .env files with secrets**
✅ Always add `.env` to `.gitignore`

❌ **Not validating required variables**
✅ Check for required vars in entrypoint script

❌ **Using ARG for runtime configuration**
✅ ARG is only for build-time, use ENV for runtime

❌ **Hardcoding environment-specific values**
✅ Use environment variables for all config

---

## 8. Additional Helpful Sections

### Environment Variable Validation

```bash
#!/bin/bash
# docker-entrypoint.sh

# Validate required environment variables
required_vars=("DB_HOST" "DB_PASSWORD" "API_KEY")

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

# Start application
exec "$@"
```

```dockerfile
# Dockerfile
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "server.js"]
```

### Variable Substitution in Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    image: myapp:${VERSION:-latest}
    ports:
      - "${HOST_PORT:-8080}:${CONTAINER_PORT:-80}"
    environment:
      # Use default if not set
      - LOG_LEVEL=${LOG_LEVEL:-info}
      # Required variable (no default)
      - API_KEY=${API_KEY}
      # Conditional based on environment
      - DEBUG=${DEBUG:-false}
```

### Inspecting Environment Variables

```bash
# View environment variables in running container
docker exec mycontainer env

# View specific variable
docker exec mycontainer printenv NODE_ENV

# View all variables
docker inspect mycontainer --format='{{.Config.Env}}'

# Interactive shell to check
docker exec -it mycontainer sh
printenv
```

### Real-World Example: Complete Application

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    image: myapp/frontend:${VERSION}
    environment:
      - REACT_APP_API_URL=${API_URL}
      - REACT_APP_ENV=production
    ports:
      - "80:80"
      
  backend:
    image: myapp/backend:${VERSION}
    env_file:
      - .env.backend
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=database
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - REDIS_URL=redis://cache:6379
      - JWT_SECRET=${JWT_SECRET}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    depends_on:
      - database
      - cache
      
  database:
    image: postgres:15
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/postgresql/data
      
  cache:
    image: redis:7-alpine
    
volumes:
  db_data:
```

```bash
# .env (not committed to git)
VERSION=1.2.0
API_URL=https://api.example.com
DB_NAME=myapp_prod
DB_USER=app_user
DB_PASSWORD=very-secure-password
JWT_SECRET=super-secret-jwt-key
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### Quick Reference: ENV vs ARG

| Feature | ENV | ARG |
|---------|-----|-----|
| **When** | Runtime | Build-time only |
| **Scope** | In running container | During image build |
| **Override** | `docker run -e` | `docker build --build-arg` |
| **In Dockerfile** | Available everywhere | Only after declaration |
| **Use Case** | App configuration | Build configuration |
| **Persistence** | Saved in image | Not saved in image |

---

## Summary

Docker environment variables are the primary way to configure containers without hardcoding values. Use **ENV** in Dockerfiles for runtime configuration, **ARG** for build-time variables, and override them using `-e` flags, `--env-file`, or Docker Compose configurations. Always keep secrets out of Dockerfiles and source control—use environment files that are gitignored or secret management tools. Follow the priority order: command-line flags override Docker Compose, which overrides environment files, which override Dockerfile ENV. For production, validate required variables in entrypoint scripts, use sensible defaults for non-sensitive values, and leverage tools like Docker Secrets or cloud secret managers for credentials. Environment variables make your containers portable, secure, and easy to configure across different environments.
