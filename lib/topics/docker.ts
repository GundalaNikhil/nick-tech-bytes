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
      ],
    },
    {
      title: "Docker Operations",
      icon: "⚙️",
      questions: [
        {
          question: "What is a Dockerfile and what are best practices?",
          difficulty: "intermediate",
          answer: {
            text: "A Dockerfile contains all commands to assemble an image.",
            points: [
              "Use Multi-stage Builds: Separate build-time from runtime dependencies",
              "Use specific base image: FROM node:20-alpine instead of FROM node:latest",
              "Minimize Layers: Chain commands with && to reduce layers",
              "Use .dockerignore: Exclude unnecessary files like .git, node_modules",
            ],
            code: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]`,
            language: "dockerfile",
            memoryTechnique:
              "Dockerfile Best Practices = SLIM: Specific base, Layer minimization, Ignore files, Multi-stage",
            simpleExplanation:
              "A Dockerfile is like a construction blueprint for building a house. Multi-stage builds are like having separate contractors for foundation (builder) and finishing (final) - you don't keep the scaffolding in the final house. Using specific versions is like ordering 'exactly 100 bricks' instead of 'some bricks' - you know what you're getting.",
          },
        },
        {
          question: "What is Docker Compose and when is it used?",
          difficulty: "intermediate",
          answer: {
            text: "Docker Compose defines and runs multi-container Docker applications using a YAML file (docker-compose.yml). Used for local development, testing, and staging environments with multiple interconnected services (web app, database, message queue).",
            points: [
              "Single file defines all services, networks, and volumes",
              "Start all services with one command: docker-compose up",
              "Automatic networking between containers",
              "Service discovery by service name",
            ],
            code: `version: '3.8'\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    depends_on:\n      - db\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - db-data:/var/lib/postgresql/data\nvolumes:\n  db-data:`,
            memoryTechnique:
              "Docker Compose = Orchestrate Multiple Services. Think: Conductor for Container Orchestra",
            simpleExplanation:
              "Docker Compose is like a party planner who coordinates everything. Instead of calling the caterer, decorator, and DJ separately (running each container individually), you tell the planner what you need in one list (docker-compose.yml), and they handle everything with one command. All services work together automatically.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <div style="color: #60a5fa; font-weight: bold; font-size: 1.25rem;">Docker Compose Architecture</div>
  </div>
  <div style="display: grid; gap: 1rem;">
    <div style="background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; border-radius: 8px; padding: 1rem; text-align: center;">
      <div style="color: #60a5fa; font-weight: bold; margin-bottom: 0.5rem;">📄 docker-compose.yml</div>
      <div style="color: #94a3b8; font-size: 0.875rem;">Single configuration file</div>
    </div>
    <div style="text-align: center; color: #94a3b8;">↓ docker-compose up</div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; padding: 1rem; text-align: center;">
        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🌐</div>
        <div style="color: #4ade80; font-weight: bold; font-size: 0.875rem;">Web Service</div>
      </div>
      <div style="background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 8px; padding: 1rem; text-align: center;">
        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🗄️</div>
        <div style="color: #c084fc; font-weight: bold; font-size: 0.875rem;">Database</div>
      </div>
      <div style="background: rgba(249, 115, 22, 0.1); border: 2px solid #f97316; border-radius: 8px; padding: 1rem; text-align: center;">
        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📦</div>
        <div style="color: #fb923c; font-weight: bold; font-size: 0.875rem;">Cache</div>
      </div>
    </div>
    <div style="text-align: center; color: #94a3b8; font-size: 0.875rem; margin-top: 0.5rem;">
      All services connected via automatic networking
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "Explain Docker Volumes",
          difficulty: "intermediate",
          answer: {
            text: "Docker Volumes are the preferred mechanism for persisting data generated by containers.",
            points: [
              "Managed by Docker and stored outside container's file system",
              "Independent of container's lifecycle",
              "Data persists even when container is stopped or deleted",
              "Can share data between containers",
            ],
            code: `# Create a volume\ndocker volume create my-data\n\n# Use volume in container\ndocker run -v my-data:/app/data myapp\n\n# List volumes\ndocker volume ls\n\n# Remove volume\ndocker volume rm my-data`,
            memoryTechnique:
              "Volumes = Vault for Data. Think: External storage that survives container death",
            simpleExplanation:
              "Docker Volumes are like external hard drives. When you delete an app from your computer (stop container), you lose the app but not the files on your external drive (volume). You can plug that drive into another computer (mount to another container) and still access your data.",
            visualHtml: `<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 2rem; border-radius: 12px; margin: 1.5rem 0;">
  <div style="display: grid; gap: 1.5rem;">
    <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 8px; padding: 1.5rem;">
      <div style="color: #f87171; font-weight: bold; margin-bottom: 1rem; text-align: center;">❌ Without Volumes</div>
      <div style="display: flex; align-items: center; justify-content: space-around;">
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
          <div style="color: #94a3b8; font-size: 0.875rem;">Container + Data</div>
        </div>
        <div style="color: #94a3b8; font-size: 1.5rem;">→</div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🗑️</div>
          <div style="color: #f87171; font-size: 0.875rem;">Deleted</div>
        </div>
        <div style="color: #94a3b8; font-size: 1.5rem;">→</div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">💔</div>
          <div style="color: #f87171; font-size: 0.875rem;">Data Lost!</div>
        </div>
      </div>
    </div>
    <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 8px; padding: 1.5rem;">
      <div style="color: #4ade80; font-weight: bold; margin-bottom: 1rem; text-align: center;">✅ With Volumes</div>
      <div style="display: flex; align-items: center; justify-content: space-around;">
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📦</div>
          <div style="color: #94a3b8; font-size: 0.875rem;">Container</div>
          <div style="font-size: 1.5rem; margin-top: 0.5rem;">📀</div>
          <div style="color: #4ade80; font-size: 0.875rem;">Volume</div>
        </div>
        <div style="color: #94a3b8; font-size: 1.5rem;">→</div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🗑️</div>
          <div style="color: #94a3b8; font-size: 0.875rem;">Container Deleted</div>
          <div style="font-size: 1.5rem; margin-top: 0.5rem;">📀</div>
          <div style="color: #4ade80; font-size: 0.875rem;">Volume Persists</div>
        </div>
        <div style="color: #94a3b8; font-size: 1.5rem;">→</div>
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">✨</div>
          <div style="color: #4ade80; font-size: 0.875rem;">Data Safe!</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
          },
        },
        {
          question: "What is Docker networking and its types?",
          difficulty: "advanced",
          answer: {
            text: "Docker networking allows containers to communicate with each other and the outside world.",
            points: [
              "Bridge: Default network, containers on same bridge can communicate",
              "Host: Container uses host's network directly, no isolation",
              "None: No networking, completely isolated",
              "Overlay: For multi-host networking in Swarm mode",
            ],
            memoryTechnique:
              "Docker Networks: BHNO = Bridge, Host, None, Overlay. Think: Bridge for isolation, Host for speed",
            simpleExplanation:
              "Docker networks are like different phone plans. Bridge is like having separate phone numbers for each person but they can still call each other (isolated but connected). Host is like everyone sharing the same phone number (fast but no privacy). None is like having no phone at all (complete isolation).",
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
