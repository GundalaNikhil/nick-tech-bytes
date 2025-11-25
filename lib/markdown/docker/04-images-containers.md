# Understanding Docker Images and Containers

## What You'll Learn

- The fundamental differences between Docker images and containers
- How to work with images and containers
- Essential Docker commands for images and containers
- Best practices for managing Docker resources

---

## Docker Images Explained

### What is a Docker Image?

A Docker image is a **lightweight, standalone, executable package** that contains everything needed to run an application:

- Application code
- Runtime environment
- System tools and libraries
- Environment variables
- Default commands

### Key Characteristics of Images

| Aspect           | Details                                                          |
| ---------------- | ---------------------------------------------------------------- |
| **Immutability** | Images are read-only; changes create new layers                  |
| **Portability**  | Same image runs identically on any system                        |
| **Reusability**  | One image can create multiple containers                         |
| **Layered**      | Built from multiple filesystem layers (like layers in Photoshop) |
| **Versioning**   | Can be tagged with versions (e.g., `myapp:1.0`, `myapp:latest`)  |

### Image Structure

```
Docker Image
├── Layer 1 (Base OS - e.g., Ubuntu)
├── Layer 2 (Runtime - e.g., Node.js)
├── Layer 3 (Dependencies - npm packages)
├── Layer 4 (Application code)
└── Layer 5 (Configuration & startup instructions)
```

### Common Image Sources

```bash
# Pull from Docker Hub (official images)
docker pull ubuntu:22.04
docker pull node:18-alpine
docker pull nginx:latest

# Pull from private registry
docker pull registry.example.com/myapp:1.0

# Build from Dockerfile
docker build -t myapp:1.0 .
```

---

## Docker Containers Explained

### What is a Docker Container?

A Docker container is a **running instance of a Docker image**. It's similar to how an object is an instance of a class in programming.

Think of it like:

- **Image** = Class definition
- **Container** = Object instance created from that class

### Key Characteristics of Containers

| Aspect          | Details                                    |
| --------------- | ------------------------------------------ |
| **Ephemeral**   | Can be created and destroyed quickly       |
| **Isolated**    | Separate filesystem, network, process tree |
| **Stateful**    | Can have writable layer and changes        |
| **Lightweight** | Shares host OS kernel                      |
| **Fast**        | Starts in milliseconds to seconds          |

### Container Lifecycle

```
┌─────────┐
│  Image  │
└────┬────┘
     │ docker run
     ↓
┌─────────────────┐
│   Container     │
│   (Created)     │
└────┬────────────┘
     │ docker start/run
     ↓
┌─────────────────┐
│   Container     │
│   (Running)     │
└────┬────────────┘
     │ docker stop
     ↓
┌─────────────────┐
│   Container     │
│   (Stopped)     │
└────┬────────────┘
     │ docker rm
     ↓
   (Deleted)
```

---

## Working with Images

### Listing Images

```bash
# List all images
docker images

# List with specific format
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Search for images
docker search nginx
docker search --filter "stars=100" ubuntu
```

### Pulling Images

```bash
# Pull latest version
docker pull ubuntu

# Pull specific version
docker pull ubuntu:22.04

# Pull from specific registry
docker pull gcr.io/project-id/image:tag
```

### Building Images

```bash
# Build from Dockerfile in current directory
docker build -t myapp:1.0 .

# Build with build arguments
docker build \
  --build-arg NODE_ENV=production \
  -t myapp:1.0 .

# Build from URL
docker build https://github.com/user/repo.git#branch
```

### Tagging Images

```bash
# Tag an image
docker tag myapp:1.0 myapp:latest

# Tag for registry
docker tag myapp:1.0 registry.example.com/myapp:1.0

# Tag with multiple names
docker tag myapp:1.0 \
  myapp:latest \
  registry.example.com/myapp:1.0
```

### Pushing Images

```bash
# Push to Docker Hub
docker push username/myapp:1.0

# Push to private registry
docker push registry.example.com/myapp:1.0
```

### Removing Images

```bash
# Remove image by name or ID
docker rmi myapp:1.0

# Remove multiple images
docker rmi image1:tag1 image2:tag2

# Force remove (even if used)
docker rmi -f myapp:1.0

# Remove all unused images
docker image prune

# Remove all images
docker rmi $(docker images -q)
```

### Inspecting Images

```bash
# View image details
docker inspect myapp:1.0

# View image history (layers)
docker history myapp:1.0

# View image properties
docker image ls --digests
```

---

## Working with Containers

### Creating and Running Containers

```bash
# Run a container
docker run ubuntu:22.04 echo "Hello World"

# Run with a name
docker run --name mycontainer ubuntu:22.04

# Run in interactive mode
docker run -it ubuntu:22.04 /bin/bash

# Run in background (detached)
docker run -d nginx:latest

# Run with port mapping
docker run -d -p 8080:80 nginx:latest

# Run with environment variables
docker run -d \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgres://... \
  myapp:1.0

# Run with volume mount
docker run -d \
  -v /local/path:/container/path \
  -v myvolume:/data \
  myapp:1.0

# Run with resource limits
docker run -d \
  --memory=512m \
  --cpus=1 \
  myapp:1.0

# Run with custom command
docker run -d \
  --entrypoint npm \
  myapp:1.0 start
```

### Listing Containers

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List container IDs only
docker ps -q

# Custom format output
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"

# Show last N containers
docker ps -n 5
```

### Container Lifecycle

```bash
# Start a stopped container
docker start <container-id>

# Stop a running container
docker stop <container-id>

# Restart a container
docker restart <container-id>

# Pause a container
docker pause <container-id>

# Unpause a container
docker unpause <container-id>

# Kill a container (forcefully)
docker kill <container-id>
```

### Managing Containers

```bash
# View container logs
docker logs <container-id>

# Follow logs (live)
docker logs -f <container-id>

# View last N lines
docker logs --tail 100 <container-id>

# Execute command in running container
docker exec -it <container-id> /bin/bash

# Copy files to/from container
docker cp <container-id>:/path/to/file ./local/path
docker cp ./local/file <container-id>:/path/to/

# View container resource usage
docker stats

# View container processes
docker top <container-id>

# Inspect container details
docker inspect <container-id>

# Get container IP address
docker inspect -f '{{.NetworkSettings.IPAddress}}' <container-id>
```

### Removing Containers

```bash
# Remove a stopped container
docker rm <container-id>

# Remove multiple containers
docker rm container1 container2 container3

# Force remove a running container
docker rm -f <container-id>

# Remove all stopped containers
docker container prune

# Remove all containers (running and stopped)
docker rm -f $(docker ps -aq)
```

---

## Common Workflows

### Development Workflow

```bash
# 1. Pull base image
docker pull node:18-alpine

# 2. Create Dockerfile
# (See Dockerfile section)

# 3. Build image
docker build -t myapp:dev .

# 4. Run container in interactive mode
docker run -it \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  myapp:dev npm start

# 5. Open shell to debug
docker exec -it <container-id> /bin/bash
```

### Production Workflow

```bash
# 1. Build image for production
docker build -t myapp:1.0 .

# 2. Test locally
docker run -d -p 8080:3000 myapp:1.0

# 3. Tag for registry
docker tag myapp:1.0 registry.example.com/myapp:1.0

# 4. Push to registry
docker push registry.example.com/myapp:1.0

# 5. Deploy to production
docker run -d \
  --restart=always \
  --memory=512m \
  --cpus=1 \
  -e NODE_ENV=production \
  registry.example.com/myapp:1.0
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs <container-id>

# Run in interactive mode to see errors
docker run -it myapp:1.0

# Inspect container configuration
docker inspect <container-id>
```

### High Memory Usage

```bash
# View resource usage
docker stats

# Run with memory limit
docker run -d --memory=256m myapp:1.0

# Stop unused containers
docker stop $(docker ps -q)
```

### Port Already in Use

```bash
# Check what's using the port
docker ps -a

# Use different port
docker run -d -p 9000:80 nginx:latest

# Or stop the conflicting container
docker stop <container-id>
```

---

## Best Practices

✅ **Do:**

- Use specific image versions instead of `latest`
- Give containers meaningful names
- Use volumes for persistent data
- Set resource limits (memory, CPU)
- Clean up unused images and containers
- Use `.dockerignore` to exclude files from build

❌ **Don't:**

- Run containers as root (when avoidable)
- Store secrets in Dockerfile
- Use `latest` tag for production
- Run multiple services in one container
- Ignore container logs
- Leave containers running with sensitive data

---

## Quick Command Reference

| Command                          | Purpose                     |
| -------------------------------- | --------------------------- |
| `docker build -t name:tag .`     | Build image from Dockerfile |
| `docker run -d -p 8080:80 image` | Run container in background |
| `docker ps`                      | List running containers     |
| `docker logs -f container`       | View live container logs    |
| `docker exec -it container bash` | Execute shell in container  |
| `docker stop container`          | Stop running container      |
| `docker rm container`            | Remove stopped container    |
| `docker images`                  | List all images             |
| `docker inspect container`       | View container details      |
| `docker stats`                   | Show resource usage         |

---

## Next Steps

- [Writing Dockerfiles](/docker-tutorials/05-writing-dockerfiles)
- [Docker Compose Basics](/docker-tutorials/06-docker-compose)
- [Docker Networking](./07-docker-networking.md)
