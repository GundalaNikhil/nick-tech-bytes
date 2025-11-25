import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
} from "../interviewTypes";

export const dockerQuestions: InterviewQuestionsMap["Docker"] = {
  icon: "🐳",
  sections: [
    {
      title: "Docker Fundamentals",
      icon: "🎯",
      questions: [
        {
          question: "What is Docker and what problem does it solve?",
          difficulty: "beginner",
          answer: {
            text: "Docker uses OS-level virtualization to deliver software in packages called containers. Solves the 'it works on my machine' problem by ensuring consistent application behavior across all environments (dev, test, production).",
            memoryTechnique:
              "Docker = Delivers Consistent Environments. Think: 'Pack once, run anywhere'",
            simpleExplanation:
              "Docker is like a shipping container for your application. Just as shipping containers hold products that can be transported by ship, truck, or train without repacking, Docker containers hold your app and all its dependencies so it runs the same way on any computer - your laptop, your friend's machine, or a cloud server.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">💻</div>
      <div style="color: #f87171; font-weight: bold; margin-bottom: 0.5rem;">Developer Machine</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Works perfectly</div>
    </div>
    <div style="background: rgba(234, 179, 8, 0.1); border: 2px solid #eab308; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🧪</div>
      <div style="color: #fbbf24; font-weight: bold; margin-bottom: 0.5rem;">Test Environment</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Behaves differently?</div>
    </div>
    <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🚀</div>
      <div style="color: #4ade80; font-weight: bold; margin-bottom: 0.5rem;">Production</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Crashes unexpectedly?</div>
    </div>
  </div>
  <div style="margin-top: 1.5rem; text-align: center;">
    <div style="background: rgba(59, 130, 246, 0.2); border: 2px solid #3b82f6; border-radius: 8px; padding: 1rem;">
      <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem; margin-bottom: 0.5rem;">🐳 Docker Solution</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Same container = Same behavior everywhere!</div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "Differentiate between Docker Image and Container",
          difficulty: "beginner",
          answer: {
            text: "Docker Image: Read-only template with instructions for creating containers. Contains application code, libraries, dependencies, and configuration. Built from Dockerfile and stored in registry.\n\nDocker Container: Runnable instance of an image. The runtime environment where application executes. An isolated process on the host OS.",
            memoryTechnique:
              "Image = Instructions (blueprint), Container = Creation (running instance). Think: Recipe vs Meal",
            simpleExplanation:
              "A Docker Image is like a recipe in a cookbook - it's the instructions and ingredient list. A Docker Container is like the actual meal you cook following that recipe. You can use the same recipe (image) to make multiple meals (containers). The recipe doesn't change, but you can have many plates of food from it.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📦</div>
        <div style="color: #c084fc; font-weight: bold; font-size: 1.25rem;">Docker Image</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        <div style="margin-bottom: 0.5rem;">📝 <strong style="color: #c084fc;">Read-only</strong> template</div>
        <div style="margin-bottom: 0.5rem;">🏗️ Built from <strong style="color: #c084fc;">Dockerfile</strong></div>
        <div style="margin-bottom: 0.5rem;">💾 Stored in <strong style="color: #c084fc;">registry</strong></div>
        <div>📚 Contains <strong style="color: #c084fc;">all dependencies</strong></div>
      </div>
    </div>
    <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">▶️</div>
        <div style="color: #4ade80; font-weight: bold; font-size: 1.25rem;">Docker Container</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        <div style="margin-bottom: 0.5rem;">🏃 <strong style="color: #4ade80;">Running</strong> instance</div>
        <div style="margin-bottom: 0.5rem;">✍️ <strong style="color: #4ade80;">Writable</strong> layer</div>
        <div style="margin-bottom: 0.5rem;">🔒 <strong style="color: #4ade80;">Isolated</strong> process</div>
        <div>⚡ <strong style="color: #4ade80;">Executes</strong> application</div>
      </div>
    </div>
  </div>
  <div style="margin-top: 1.5rem; text-align: center; color: #60a5fa; font-size: 0.875rem;">
    Image → docker run → Container
  </div>
</div>`,
          },
        },
        {
          question: "Explain the Docker Architecture",
          difficulty: "intermediate",
          answer: {
            points: [
              "Docker Client: Command-line tool (docker) for user interaction",
              "Docker Daemon (Engine): Background service managing images, containers, networks, and volumes",
              "Docker Registry: Centralized store for Docker images (e.g., Docker Hub)",
            ],
            memoryTechnique:
              "CDR = Client, Daemon, Registry. Think: Command → Daemon → Repository",
            simpleExplanation:
              "Docker architecture is like ordering food delivery. You (Docker Client) place an order through an app. The restaurant kitchen (Docker Daemon) prepares your food using recipes from their cookbook (Docker Registry). The client sends commands, the daemon does the work, and the registry stores all the blueprints.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; gap: 1.5rem;">
    <div style="background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <div style="font-size: 2rem;">💻</div>
        <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem;">Docker Client</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem;">User interface - sends commands (docker run, docker build, docker pull)</div>
    </div>
    <div style="text-align: center; color: #94a3b8; font-size: 1.5rem;">↓</div>
    <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <div style="font-size: 2rem;">⚙️</div>
        <div style="color: #c084fc; font-weight: bold; font-size: 1.125rem;">Docker Daemon (dockerd)</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Background service - manages containers, images, networks, volumes</div>
    </div>
    <div style="text-align: center; color: #94a3b8; font-size: 1.5rem;">↔️</div>
    <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <div style="font-size: 2rem;">🗄️</div>
        <div style="color: #4ade80; font-weight: bold; font-size: 1.125rem;">Docker Registry (Docker Hub)</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Image repository - stores and distributes Docker images</div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question:
            "What is the difference between Docker and Virtual Machines?",
          difficulty: "beginner",
          answer: {
            text: "Docker containers share the host OS kernel and isolate at the process level, while VMs include a full OS with its own kernel. Containers are lighter, faster to start, and use fewer resources.",
            points: [
              "Containers: Share host kernel, lightweight, start in seconds, MB in size",
              "VMs: Full OS per VM, heavyweight, start in minutes, GB in size",
              "Containers: Better for microservices, scaling, CI/CD",
              "VMs: Better for running different OS, stronger isolation",
            ],
            memoryTechnique:
              "Containers = Lightweight & Fast, VMs = Heavy & Isolated. Think: Apartment vs House",
            simpleExplanation:
              "Containers are like apartments in a building - they share the building's foundation and utilities (host OS kernel) but each apartment is private. VMs are like individual houses - each has its own foundation, utilities, and complete infrastructure. Apartments are cheaper and faster to set up, but houses give you more isolation.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🐳</div>
        <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem;">Docker Containers</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        <div style="margin-bottom: 0.5rem;">✅ Share host OS kernel</div>
        <div style="margin-bottom: 0.5rem;">✅ Lightweight (MBs)</div>
        <div style="margin-bottom: 0.5rem;">✅ Start in seconds</div>
        <div style="margin-bottom: 0.5rem;">✅ Less resource usage</div>
        <div>✅ Better density</div>
      </div>
    </div>
    <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🖥️</div>
        <div style="color: #c084fc; font-weight: bold; font-size: 1.125rem;">Virtual Machines</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        <div style="margin-bottom: 0.5rem;">📦 Full OS per VM</div>
        <div style="margin-bottom: 0.5rem;">📦 Heavy (GBs)</div>
        <div style="margin-bottom: 0.5rem;">📦 Start in minutes</div>
        <div style="margin-bottom: 0.5rem;">📦 More resources needed</div>
        <div>📦 Stronger isolation</div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is a Docker container?",
          difficulty: "beginner",
          answer: {
            text: "A Docker container is a lightweight, standalone, executable package that contains everything needed to run an application - the code, runtime, system tools, libraries, and settings.",
            memoryTechnique:
              "Container = Complete, Consistent, Compact package. Think: All-in-one box",
            simpleExplanation:
              "A Docker container is like a lunchbox. It contains everything you need for lunch - sandwich, fruit, drink - all in one portable package. You don't need to figure out what to bring; it's all there, ready to go anywhere.",
          },
        },
        {
          question: "What is Docker Hub?",
          difficulty: "beginner",
          answer: {
            text: "Docker Hub is the official centralized repository for Docker images. It's like GitHub for Docker images where you can find, download, and share container images.",
            points: [
              "Public registry with millions of images",
              "Official images from Docker and major vendors",
              "Community-contributed images",
              "Free and paid repositories",
              "Automated builds from GitHub/GitLab",
            ],
            memoryTechnique:
              "Docker Hub = Heart Hub - Central repository for all Docker containers",
            simpleExplanation:
              "Docker Hub is like an app store for containers. Instead of downloading apps from an app store, you download container images from Docker Hub using 'docker pull'. You can also share your own images there.",
          },
        },
        {
          question: "Explain the lifecycle of a Docker container",
          difficulty: "beginner",
          answer: {
            text: "A Docker container goes through several states: Created → Running → Paused → Stopped → Removed",
            points: [
              "Created: Container is created but not started",
              "Running: Container is executing",
              "Paused: Container is paused (SIGSTOP signal)",
              "Stopped: Container has stopped (exited)",
              "Removed: Container is deleted, no recovery possible",
            ],
            memoryTechnique:
              "Container Lifecycle = CRPSR: Created, Running, Paused, Stopped, Removed",
            simpleExplanation:
              "A container lifecycle is like a person's daily schedule. Created (wake up), Running (work), Paused (break), Stopped (sleep), Removed (gone forever). Each state has specific commands (docker create, docker start, docker pause, docker stop, docker rm).",
          },
        },
        {
          question:
            "What is the difference between CMD and ENTRYPOINT in Dockerfile?",
          difficulty: "beginner",
          answer: {
            text: "Both CMD and ENTRYPOINT specify what command to run when a container starts, but they behave differently.",
            points: [
              "CMD: Can be overridden by docker run arguments. Sets default command.",
              "ENTRYPOINT: Defines the container's main process. Less likely to be overridden.",
              "Together: ENTRYPOINT provides the main command, CMD provides default arguments",
              "Best practice: Use ENTRYPOINT for the main app, CMD for default arguments",
            ],
            code: `# Using CMD (can be overridden)
FROM node
CMD ["node", "server.js"]
# docker run myapp npm test  -> runs npm test (CMD overridden)

# Using ENTRYPOINT (harder to override)
FROM node
ENTRYPOINT ["node"]
CMD ["server.js"]
# docker run myapp test.js -> runs node test.js (CMD overridden, ENTRYPOINT fixed)`,
            memoryTechnique:
              "CMD = Changeable Default, ENTRYPOINT = Essential (harder to change)",
            simpleExplanation:
              "ENTRYPOINT is like the main actor in a movie (hard to replace), CMD is like the default dialogue (easy to change). You can change what the actor says, but the actor stays the same.",
          },
        },
        {
          question: "What are Docker tags?",
          difficulty: "beginner",
          answer: {
            text: "Docker tags are labels for Docker images that typically represent version numbers or variants of an image.",
            points: [
              "Format: repository:tag (e.g., myapp:1.0, myapp:latest)",
              "Default tag is 'latest' if not specified",
              "Tags help version control and identify image variants",
              "Same image can have multiple tags",
              "Tags can point to the same image layer (aliasing)",
            ],
            code: `# Tagging images
docker build -t myapp:1.0 .
docker build -t myapp:latest .
docker tag myapp:1.0 myapp:stable

# Tagging with registry
docker tag myapp:1.0 docker.io/username/myapp:1.0

# Pushing tagged images
docker push myapp:1.0`,
            memoryTechnique:
              "Tags = Version Tags. Think: Like book editions or app versions",
            simpleExplanation:
              "Docker tags are like version numbers on books. 'Node:14' is like 'Book Edition 14', 'Node:latest' is the most current edition. You can have multiple names for the same thing (book = Edition 2 = Latest Edition).",
          },
        },
        {
          question: "How to remove Docker images and containers?",
          difficulty: "beginner",
          answer: {
            text: "Docker provides commands to clean up images, containers, and unused resources.",
            points: [
              "docker rm <container>: Remove container",
              "docker rmi <image>: Remove image",
              "docker rm $(docker ps -q): Remove all containers",
              "docker system prune: Remove all unused resources",
              "docker system prune -a: Remove all unused including images",
            ],
            code: `# Remove single container
docker rm mycontainer

# Remove stopped containers
docker container prune

# Remove image
docker rmi myimage:tag

# Remove all dangling images (untagged)
docker image prune

# Remove all unused (containers, images, networks, volumes)
docker system prune -a --volumes`,
            memoryTechnique:
              "Remove = rm for containers, rmi for images, prune for cleanup",
            simpleExplanation:
              "Removing containers is like throwing out old magazines (temporary). Removing images is like selling your book collection (permanent). 'prune' is like a garage sale where you get rid of everything unused.",
          },
        },
        {
          question: "What is Docker Swarm?",
          difficulty: "beginner",
          answer: {
            text: "Docker Swarm is Docker's native container orchestration platform that allows you to manage and scale multiple Docker containers across multiple machines.",
            points: [
              "Built-in to Docker Engine",
              "Simpler than Kubernetes",
              "Creates a cluster of Docker nodes",
              "Distribute containers across nodes",
              "Load balancing and automatic restart",
            ],
            memoryTechnique:
              "Swarm = Multiple nodes working together like a bee colony",
            simpleExplanation:
              "Docker Swarm is like a beehive where bees work together. Each bee (container) does its job, and the queen (manager) coordinates everything. If a bee dies, another takes its place automatically.",
          },
        },
        {
          question: "Explain Docker layers",
          difficulty: "beginner",
          answer: {
            text: "Docker images are built in layers, where each command in a Dockerfile creates a new layer on top of the previous one. These layers are stacked read-only layers.",
            points: [
              "Each Dockerfile command creates a layer",
              "Layers are immutable (read-only)",
              "New containers add a writable layer on top",
              "Layers enable efficient storage and caching",
              "Fewer layers = smaller images",
            ],
            code: `FROM ubuntu:20.04           # Layer 1 (base)
RUN apt-get update          # Layer 2
RUN apt-get install -y node # Layer 3
COPY app.js /app/           # Layer 4
CMD ["node", "/app/app.js"] # Layer 5`,
            memoryTechnique:
              "Layers = Lasagna layers - stacked, read-only, with writable top layer",
            simpleExplanation:
              "Docker layers are like making lasagna. You put down base pasta (base image), add sauce (RUN commands), add cheese (COPY files), and seal it (CMD). Each layer is permanent; you just keep adding on top.",
          },
        },
        {
          question: "What is the purpose of .dockerignore file?",
          difficulty: "beginner",
          answer: {
            text: ".dockerignore file specifies which files and directories should be excluded from the Docker build context. It works like .gitignore for Git.",
            points: [
              "Reduces build context size",
              "Speeds up builds by not copying unnecessary files",
              "Improves security by excluding sensitive files",
              "Similar to .gitignore syntax",
              "Common items: node_modules, .git, .env, .DS_Store",
            ],
            code: `# .dockerignore example
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.env.local
.DS_Store
dist
build`,
            memoryTechnique: ".dockerignore = Don't Include list for builds",
            simpleExplanation:
              ".dockerignore is like a packing checklist. You list things you don't want to pack (node_modules, .git), so you don't waste space sending unnecessary items to the docker builder.",
          },
        },
        {
          question: "How to run a Docker container in detached mode?",
          difficulty: "beginner",
          answer: {
            text: "Detached mode runs a container in the background. Use the '-d' flag with docker run.",
            code: `# Run in detached mode
docker run -d -p 8080:80 --name myapp nginx

# View container output later
docker logs myapp

# Attach to running container
docker attach myapp

# Run in foreground (interactive)
docker run -it ubuntu /bin/bash`,
            memoryTechnique:
              "Detached = -d flag, runs in background like a service",
            simpleExplanation:
              "Detached mode is like starting a background service. You start it and don't need to stay connected. Compare to interactive mode which is like having a conversation on the phone (you must stay connected).",
          },
        },
        {
          question: "What is multi-stage build in Docker?",
          difficulty: "beginner",
          answer: {
            text: "Multi-stage builds allow you to use multiple FROM statements in a Dockerfile, enabling smaller final images by discarding build dependencies.",
            code: `FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]`,
            memoryTechnique:
              "Multi-stage = Build stage removes build tools, final stage only includes runtime",
            simpleExplanation:
              "Multi-stage is like building a house. You use heavy machinery (build stage) to construct, then remove the machinery before moving in (final stage). The final house doesn't include cranes and cement mixers!",
          },
        },
        {
          question: "How to expose ports in Docker?",
          difficulty: "beginner",
          answer: {
            text: "Ports are exposed using EXPOSE in Dockerfile and mapped using -p flag in docker run.",
            code: `# In Dockerfile
FROM nginx
EXPOSE 80
EXPOSE 443

# When running container
docker run -d -p 8080:80 -p 8443:443 nginx
# -p hostPort:containerPort

# Expose all exposed ports
docker run -d -P nginx`,
            memoryTechnique: "EXPOSE = document ports, -p = actually map ports",
            simpleExplanation:
              "EXPOSE is like labeling a door in a blueprint (documentation). -p flag is like actually opening the door (creating the connection). You need both for the port to be accessible.",
          },
        },
      ],
    },
    {
      title: "Docker Operations",
      icon: "⚙️",
      questions: [
        {
          question: "What is Docker BuildKit?",
          difficulty: "advanced",
          answer: {
            text: "Docker BuildKit is a modern build engine for Docker that provides performance improvements, new features, and better caching.",
            points: [
              "Faster builds with improved caching",
              "Parallel stage execution",
              "Better error messages",
              "Support for new Dockerfile syntax",
              "Enable with DOCKER_BUILDKIT=1",
            ],
            code: `# Enable BuildKit
export DOCKER_BUILDKIT=1

# Modern Dockerfile syntax (requires BuildKit)
# syntax=docker/dockerfile:1.4

FROM node:20-alpine
WORKDIR /app

# Cache mount example
RUN --mount=type=cache,target=/root/.npm npm ci

# Secrets in build (not in final image)
RUN --mount=type=secret,id=npm_token \\
    npm config set //registry.npmjs.org/:_authToken=$(cat /run/secrets/npm_token) && \\
    npm ci

# Build
docker build --secret npm_token=<token> -t myapp .`,
            memoryTechnique:
              "BuildKit = Better, Intelligent, Lower-Level Docker Kit",
            simpleExplanation:
              "Docker BuildKit is like upgrading from a bicycle to an electric bike. It does the same job but faster, with less effort, and newer features.",
          },
        },
        {
          question: "Explain Docker secrets management",
          difficulty: "advanced",
          answer: {
            text: "Docker secrets management provides a secure way to handle sensitive data like passwords, API keys, and certificates.",
            points: [
              "Use environment variables carefully - visible in logs/inspect",
              "Docker Secrets (Swarm mode) - encrypted, not visible to container env",
              "External secret managers (Vault, AWS Secrets Manager)",
              "Never hardcode secrets in images or Dockerfiles",
              ".env files for development only, not production",
            ],
            code: `# Create Docker secret (Swarm mode)
echo 'my-secret-password' | docker secret create db_password -

# Use in docker-compose (Swarm mode)
services:
  db:
    image: postgres
    secrets:
      - db_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password

secrets:
  db_password:
    external: true

# For development: use .env file
# In docker-compose.yml
services:
  app:
    env_file: .env    # File contains KEY=VALUE pairs`,
            memoryTechnique:
              "Secrets = Never hardcode, use secret manager or secure mounting",
            simpleExplanation:
              "Managing secrets is like managing your password. Don't write it on a sticky note (hardcode), don't shout it (environment variables), store it in a safe (secret manager).",
          },
        },
        {
          question: "What is Docker Swarm mode clustering?",
          difficulty: "advanced",
          answer: {
            text: "Docker Swarm mode allows multiple Docker nodes to form a cluster and manage containers collectively.",
            points: [
              "One or more manager nodes for orchestration",
              "Worker nodes execute containers",
              "Automatic service discovery and load balancing",
              "Declarative service definition",
              "Rolling updates and rollback capabilities",
            ],
            code: `# Initialize Swarm on first node
docker swarm init

# Join other nodes to swarm
docker swarm join --token SWMTKN-xxx <manager-ip>:2377

# Create a service (replicated)
docker service create --replicas 3 -p 8080:80 --name web nginx

# Scale service
docker service scale web=5

# Update service
docker service update --image nginx:latest web

# View services
docker service ls
docker service ps web`,
            memoryTechnique:
              "Swarm = Managers orchestrate, Workers execute, Self-healing cluster",
            simpleExplanation:
              "Swarm mode is like a beehive. Worker bees (nodes) do the work, queen (manager) coordinates, if a bee dies, another is born (auto-restart).",
          },
        },
        {
          question: "What is Docker Stack?",
          difficulty: "advanced",
          answer: {
            text: "Docker Stack is a deployment unit in Swarm mode that groups services together, defined in a Compose file.",
            code: `# docker-compose.yml (compatible with Stack)
version: '3.8'
services:
  web:
    image: myapp:1.0
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
  db:
    image: postgres:15

# Deploy stack
docker stack deploy -c docker-compose.yml myapp

# List stacks
docker stack ls

# View services in stack
docker stack services myapp

# Remove stack
docker stack rm myapp`,
            memoryTechnique:
              "Stack = Collection of services deployed together in Swarm",
            simpleExplanation:
              "A Docker Stack is like a complete meal at a restaurant. A Service is one dish, a Stack is the entire meal with appetizer, main course, and dessert.",
          },
        },
        {
          question: "How to monitor Docker containers?",
          difficulty: "advanced",
          answer: {
            text: "Monitor containers using Docker native tools and external monitoring solutions.",
            code: `# Docker native monitoring
docker stats              # Real-time resource usage
docker stats --no-stream  # One snapshot
docker top mycontainer    # Show running processes
docker events             # Stream Docker events

# Logs
docker logs -f mycontainer      # Follow logs
docker logs --tail 50 mycontainer

# External monitoring tools
# Prometheus + cAdvisor + Grafana
# ELK Stack (Elasticsearch, Logstash, Kibana)
# DataDog
# New Relic`,
            memoryTechnique:
              "Monitoring = stats (resources), logs (output), events (changes)",
            simpleExplanation:
              "Monitoring containers is like monitoring your health. stats = vital signs, logs = symptoms, events = medical history.",
          },
        },
        {
          question: "What tools integrate with Docker for logging?",
          difficulty: "advanced",
          answer: {
            text: "Multiple tools help collect, store, and analyze Docker container logs.",
            points: [
              "ELK Stack: Elasticsearch for storage, Logstash for processing, Kibana for visualization",
              "Splunk: Enterprise-grade log analysis and monitoring",
              "DataDog: Cloud-native monitoring with log aggregation",
              "New Relic: APM and log management",
              "Prometheus: Metrics collection (not logs)",
              "Fluentd: Log aggregation and routing",
            ],
            code: `# Docker JSON file logging driver
docker run -d \\
  --log-driver json-file \\
  --log-opt max-size=10m \\
  --log-opt max-file=3 \\
  myapp

# Splunk logging driver
docker run -d \\
  --log-driver splunk \\
  --log-opt splunk-token=<token> \\
  --log-opt splunk-url=https://splunk.example.com \\
  myapp

# Compose with logging
services:
  app:
    image: myapp
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"`,
            memoryTechnique:
              "Logging tools = ELK (popular), Splunk (enterprise), DataDog (cloud-native)",
            simpleExplanation:
              "Logging tools are like filing cabinets. Some are basic (json-file), some are fancy organized systems (ELK), some are cloud-based (DataDog).",
          },
        },
        {
          question: "Explain multi-architecture builds in Docker",
          difficulty: "advanced",
          answer: {
            text: "Build Docker images for multiple architectures (AMD64, ARM64, ARM) from a single Dockerfile.",
            code: `# Using docker buildx (modern approach)
docker buildx build \\
  --platform linux/amd64,linux/arm64 \\
  -t myapp:latest \\
  --push .

# Using buildx for local testing
docker buildx build \\
  --platform linux/amd64,linux/arm64 \\
  -t myapp:latest \\
  --load .  # Note: only loads first platform

# Building for specific architecture
docker buildx build \\
  --platform linux/arm64 \\
  -t myapp:latest-arm64 \\
  --push .`,
            memoryTechnique:
              "Multi-arch = one dockerfile → multiple platforms (amd64, arm64, etc)",
            simpleExplanation:
              "Multi-architecture builds are like designing clothes in multiple sizes. One pattern (Dockerfile), tailored for different body types (architectures).",
          },
        },
        {
          question: "What is rootless Docker?",
          difficulty: "advanced",
          answer: {
            text: "Rootless Docker allows running Docker daemon without root privileges, improving security.",
            points: [
              "Docker daemon runs as non-root user",
              "Containers inherit user namespace isolation",
              "Improved security posture",
              "Some features unavailable (AppArmor, cgroups v1)",
              "Slower than rootful for some operations",
            ],
            code: `# Install rootless Docker
curl https://get.docker.com/rootless | sh

# Enable rootless mode
$HOME/bin/docker-rootless-extras install

# Use rootless Docker
export DOCKER_HOST=unix://$HOME/.docker/run/docker.sock
docker ps

# Check if running rootless
docker info | grep rootless`,
            memoryTechnique:
              "Rootless = Docker daemon runs as regular user, not root",
            simpleExplanation:
              "Rootless Docker is like living in a house without being the owner. You still have your room (container), but you can't access other tenants' rooms (better isolation).",
          },
        },
        {
          question: "How to implement CI/CD with Docker?",
          difficulty: "advanced",
          answer: {
            text: "Docker integrates with CI/CD pipelines for automated testing, building, and deployment.",
            code: `# .github/workflows/docker.yml (GitHub Actions example)
name: Docker Build
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build image
        run: docker build -t myapp:HASH .
      - name: Run tests
        run: docker run myapp:HASH npm test
      - name: Push to registry
        run: docker push myapp:HASH
      - name: Deploy
        run: docker pull myapp:HASH && docker-compose up -d`,
            memoryTechnique: "CI/CD with Docker = Build → Test → Push → Deploy",
            simpleExplanation:
              "Docker CI/CD is like an assembly line. Code → Build image → Test → Push to registry → Deploy. Fully automated.",
          },
        },
        {
          question: "What is Docker UNION file system?",
          difficulty: "advanced",
          answer: {
            text: "The UNION file system (UnionFS) allows Docker to stack multiple layers into a single file system view.",
            points: [
              "Each Dockerfile command creates a new layer",
              "Layers are stacked read-only except for container's writable layer",
              "Reduces storage by sharing common layers between images",
              "Copy-on-write mechanism for efficient modifications",
              "Enables fast container startup times",
            ],
            code: `# Inspect image layers
docker image inspect myimage

# View image history (shows layers)
docker image history myimage

# Check layer details
docker image inspect --format='{{json .RootFS.Layers}}' myimage | jq`,
            memoryTechnique:
              "UnionFS = Layers stacked, read-only + writable container layer at top",
            simpleExplanation:
              "UnionFS is like transparent overlays. You have a base drawing (base layer), then add transparencies on top (additional layers). You see all of them together, but each layer is separate.",
          },
        },
        {
          question: "How to use Docker with Jenkins?",
          difficulty: "advanced",
          answer: {
            text: "Docker integrates with Jenkins for containerized CI/CD pipelines.",
            code: `# Jenkinsfile example
pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t myapp:latest .'
            }
        }
        stage('Docker Push') {
            steps {
                sh 'docker push myapp:latest'
            }
        }
    }
}`,
            memoryTechnique:
              "Jenkins + Docker = Containerized build agents and artifact delivery",
            simpleExplanation:
              "Jenkins with Docker is like having a factory with modular workstations. Each job runs in its own container (workstation), no interference between jobs, clean setup every time.",
          },
        },
        {
          question: "Explain Docker health checks",
          difficulty: "advanced",
          answer: {
            text: "Health checks monitor container status and allow orchestration systems to manage unhealthy containers.",
            code: `# In Dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# In docker-compose.yml
services:
  web:
    image: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s

# Check container health
docker container ls --format '{{.Names}} {{.Status}}'`,
            memoryTechnique:
              "Health checks = Periodic monitoring of container status",
            simpleExplanation:
              "Health checks are like a doctor checking your pulse. The orchestrator checks if the container is alive and working, and can restart it if it's not feeling well.",
          },
        },
        {
          question:
            "What is the difference between docker run and docker exec?",
          difficulty: "intermediate",
          answer: {
            text: "docker run creates and starts a new container, while docker exec runs a command in an existing running container.",
            code: `# docker run - creates new container and runs command
docker run -d -p 8080:80 --name myapp nginx
# Result: New container 'myapp' created from nginx image and started

# docker exec - runs command in existing container
docker exec -it myapp /bin/bash
# Result: Opens bash shell in already-running 'myapp' container

# Comparison
docker run -it ubuntu ls         # Creates new Ubuntu container, runs ls, exits
docker exec -it container ls     # Runs ls in running 'container', returns to shell`,
            memoryTechnique: "run = create new, exec = command in existing",
            simpleExplanation:
              "docker run is like opening a new browser tab and loading a page. docker exec is like clicking a link on the already-open page.",
          },
        },
        {
          question: "How to handle persistent data in Docker?",
          difficulty: "intermediate",
          answer: {
            text: "Persistent data is managed through volumes, bind mounts, and tmpfs mounts to survive container restarts.",
            points: [
              "Volumes: Preferred for production, Docker-managed storage",
              "Bind mounts: Direct host file system access, useful for development",
              "tmpfs mounts: In-memory storage, data lost on container stop",
              "Named volumes: Easier management and sharing between containers",
            ],
            code: `# Using named volume
docker volume create mydata
docker run -v mydata:/data myapp

# In docker-compose
services:
  db:
    image: postgres
    volumes:
      - db-volume:/var/lib/postgresql/data

volumes:
  db-volume:

# Check volume usage
docker volume inspect mydata
docker volume ls`,
            memoryTechnique:
              "Persistent data = Volumes (production) or Bind mounts (development)",
            simpleExplanation:
              "Persistent data is like a safe deposit box. Store important things there, and they survive even if you close the bank (stop container).",
          },
        },
      ],
    },
    {
      title: "Docker Best Practices & Security",
      icon: "🔒",
      questions: [
        {
          question: "What are Docker security best practices?",
          difficulty: "advanced",
          answer: {
            text: "Security in Docker involves multiple layers: image security, runtime security, and network security.",
            points: [
              "Use official base images from trusted sources",
              "Scan images for vulnerabilities (Trivy, Clair, Snyk)",
              "Run containers as non-root user",
              "Use read-only file systems where possible",
              "Limit container capabilities and resources",
              "Keep images updated and minimal",
            ],
            code: `# Run as non-root user
FROM node:20-alpine
RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -s /bin/sh -D appuser
USER appuser
WORKDIR /app
COPY --chown=appuser:appgroup . .
CMD ["node", "server.js"]

# Limit resources in docker-compose.yml
services:
  web:
    image: myapp
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M`,
            memoryTechnique:
              "Docker Security = RUNS: Run as non-root, Update regularly, Network isolation, Scan images",
            simpleExplanation:
              "Docker security is like home security. You lock your doors (non-root user), install an alarm system (vulnerability scanning), have a fence (network isolation), and keep your locks updated (image updates). You don't leave the master key under the doormat (root access)!",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <div style="color: #ef4444; font-weight: bold; font-size: 1.25rem;">🔒 Docker Security Layers</div>
  </div>
  <div style="display: grid; gap: 1rem;">
    <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 1rem; border-radius: 4px;">
      <div style="color: #f87171; font-weight: bold; margin-bottom: 0.5rem;">👤 User Security</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Run as non-root, least privilege principle</div>
    </div>
    <div style="background: rgba(249, 115, 22, 0.1); border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px;">
      <div style="color: #fb923c; font-weight: bold; margin-bottom: 0.5rem;">🖼️ Image Security</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Scan for vulnerabilities, use trusted sources</div>
    </div>
    <div style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1rem; border-radius: 4px;">
      <div style="color: #4ade80; font-weight: bold; margin-bottom: 0.5rem;">🌐 Network Security</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Isolate networks, limit exposed ports</div>
    </div>
    <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 4px;">
      <div style="color: #60a5fa; font-weight: bold; margin-bottom: 0.5rem;">⚙️ Runtime Security</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Limit resources, capabilities, read-only FS</div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "How do you optimize Docker image size?",
          difficulty: "intermediate",
          answer: {
            text: "Optimizing Docker images reduces build time, storage costs, and improves deployment speed.",
            points: [
              "Use Alpine-based images (smaller base)",
              "Multi-stage builds to exclude build tools from final image",
              "Minimize layers by combining RUN commands",
              "Remove unnecessary files and caches",
              "Use .dockerignore to exclude files from context",
              "Install only production dependencies",
            ],
            code: `# Bad: Multiple layers, large image
FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]

# Good: Multi-stage, optimized
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production \\
    && npm cache clean --force
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
            memoryTechnique:
              "Image Optimization = SMALL: Slim base, Multi-stage, Alpine, Layer reduction, Less files",
            simpleExplanation:
              "Optimizing Docker images is like packing for a trip. Don't pack your entire wardrobe (large base image), use packing cubes (multi-stage), only bring what you'll use (production dependencies), and use a carry-on instead of checked luggage (Alpine images).",
          },
        },
        {
          question:
            "What is Docker Swarm and how does it compare to Kubernetes?",
          difficulty: "advanced",
          answer: {
            text: "Docker Swarm is Docker's native container orchestration tool. It's simpler than Kubernetes but less feature-rich.",
            points: [
              "Swarm: Built into Docker, simpler setup, good for smaller deployments",
              "Kubernetes: More complex, feature-rich, better for large-scale production",
              "Swarm: Easier learning curve, faster deployment",
              "Kubernetes: Better ecosystem, more control, industry standard",
            ],
            memoryTechnique:
              "Swarm vs K8s: Swarm = Simple & Swift, K8s = Complex & Comprehensive",
            simpleExplanation:
              "Docker Swarm is like a local community organizer (simple, quick setup, good for small groups). Kubernetes is like a corporate event planner (complex, powerful, handles thousands of people). Choose based on your party size!",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div style="background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🐝</div>
        <div style="color: #60a5fa; font-weight: bold; font-size: 1.125rem;">Docker Swarm</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        <div style="margin-bottom: 0.5rem;">✅ Simple setup</div>
        <div style="margin-bottom: 0.5rem;">✅ Native to Docker</div>
        <div style="margin-bottom: 0.5rem;">✅ Easy learning curve</div>
        <div style="margin-bottom: 0.5rem;">❌ Limited features</div>
        <div>❌ Smaller ecosystem</div>
      </div>
    </div>
    <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 1rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">☸️</div>
        <div style="color: #c084fc; font-weight: bold; font-size: 1.125rem;">Kubernetes</div>
      </div>
      <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.8;">
        <div style="margin-bottom: 0.5rem;">✅ Feature-rich</div>
        <div style="margin-bottom: 0.5rem;">✅ Industry standard</div>
        <div style="margin-bottom: 0.5rem;">✅ Huge ecosystem</div>
        <div style="margin-bottom: 0.5rem;">❌ Complex setup</div>
        <div>❌ Steeper learning</div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
      ],
    },
    {
      title: "Docker Commands & Troubleshooting",
      icon: "🔧",
      questions: [
        {
          question: "What are essential Docker commands for daily use?",
          difficulty: "beginner",
          answer: {
            text: "Docker CLI provides commands for managing containers, images, networks, and volumes.",
            points: [
              "docker run: Create and start container",
              "docker ps: List running containers (add -a for all)",
              "docker stop/start: Stop/start container",
              "docker logs: View container logs",
              "docker exec: Execute command in running container",
              "docker build: Build image from Dockerfile",
              "docker pull/push: Download/upload images",
            ],
            code: `# Run container with port mapping
docker run -d -p 8080:80 --name myapp nginx

# View logs
docker logs -f myapp

# Execute bash in running container
docker exec -it myapp /bin/bash

# Stop and remove
docker stop myapp && docker rm myapp

# Build image
docker build -t myapp:v1 .

# Remove unused resources
docker system prune -a`,
            memoryTechnique:
              "Docker Commands = RPSLE: Run, PS (list), Stop, Logs, Exec",
            simpleExplanation:
              "Docker commands are like TV remote buttons. 'run' turns on a channel (start container), 'ps' shows what's playing (list containers), 'logs' is the closed captioning (view output), 'exec' lets you change settings (run commands), and 'stop' turns it off.",
          },
        },
        {
          question: "How do you troubleshoot a failing Docker container?",
          difficulty: "intermediate",
          answer: {
            text: "Troubleshooting Docker containers involves checking logs, inspecting configuration, and testing connectivity.",
            points: [
              "Check container logs: docker logs <container>",
              "Inspect container: docker inspect <container>",
              "Check resource usage: docker stats",
              "Test network connectivity: docker exec ping/curl",
              "Review exit code: docker ps -a (check STATUS)",
              "Common issues: port conflicts, missing volumes, network problems, resource limits",
            ],
            code: `# Check why container exited
docker ps -a
docker logs myapp

# Inspect full configuration
docker inspect myapp

# Check resource usage
docker stats myapp

# Debug with interactive shell
docker run -it --entrypoint /bin/sh myapp

# Test network connectivity
docker exec myapp ping google.com
docker exec myapp curl http://api:8080/health`,
            memoryTechnique:
              "Troubleshooting = LINS: Logs, Inspect, Network test, Stats",
            simpleExplanation:
              "Troubleshooting Docker is like fixing a broken appliance. First check the error message (logs), inspect the manual (docker inspect), test if it's plugged in (network), and check if it's overheating (stats). Most problems are simple: wrong plug (port), disconnected wire (network), or overloaded circuit (resources).",
          },
        },
      ],
    },
  ],
};

export const dockerResources: InterviewResourcesMap["Docker"] = {
  icon: "🐳",
  resources: [
    {
      title: "InterviewBit - Docker Questions",
      description:
        "Containers, images, Dockerfile commands, restart policies, Docker networking",
      url: "https://www.interviewbit.com/docker-interview-questions/",
      type: "Free",
    },
  ],
  keyTopics: [
    "Docker Architecture",
    "Dockerfile",
    "Docker Compose",
    "Networking",
    "Container Orchestration",
  ],
};
