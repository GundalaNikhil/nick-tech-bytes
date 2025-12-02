# Docker Swarm Basics

## 1. Introduction

**Question:** What is Docker Swarm and how do you use it for container orchestration?

**What we're trying to achieve:** Learn to use Docker Swarm for orchestrating containers across multiple hosts, enabling high availability, scaling, and load balancing.

**Goal/Aim:** By the end of this tutorial, you'll understand Docker Swarm architecture, know how to create and manage a swarm cluster, deploy services, and implement rolling updates.

---

## 2. How to Solve (Explained Simply)

Think of Docker Swarm like managing a fleet of delivery trucks:

**Without Swarm (Single Host):**

- One warehouse (server) with one truck (container)
- If the truck breaks down, deliveries stop
- Can't handle increased demand
- One person managing everything manually

**With Docker Swarm (Orchestration):**

- Multiple warehouses (nodes) with many trucks (containers)
- If one truck breaks, others take over automatically
- Add more trucks when demand increases
- Central dispatch system manages everything
- Automatic routing and load balancing

### Why Use Docker Swarm?

1. **High Availability:** If a node fails, containers restart on healthy nodes
2. **Load Balancing:** Distributes traffic across containers automatically
3. **Scaling:** Add or remove containers with one command
4. **Rolling Updates:** Update services with zero downtime
5. **Service Discovery:** Containers find each other automatically
6. **Simple Setup:** Easier than Kubernetes for small to medium deployments

---

## 3. Visual Representation

### Docker Swarm Architecture

<div style="background: linear-gradient(135deg, #F0F9FF, #E0F2FE); padding: 30px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <h3 style="color: #0369A1; margin: 0;">Swarm Cluster Architecture</h3>
  </div>
  
  <!-- Manager Nodes -->
  <div style="background: linear-gradient(135deg, #8B5CF6, #7C3AED); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
    <div style="color: white; font-weight: 600; font-size: 16px; margin-bottom: 15px; text-align: center;">Manager Nodes (Control Plane)</div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
      <div style="background: white; padding: 15px; border-radius: 8px;">
        <div style="font-weight: 600; color: #7C3AED; margin-bottom: 8px;">Manager 1 (Leader)</div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <div style="background: #DBEAFE; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 12px;">Service 1</div>
          <div style="background: #DBEAFE; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 12px;">Service 2</div>
        </div>
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px;">
        <div style="font-weight: 600; color: #7C3AED; margin-bottom: 8px;">Manager 2 (Reachable)</div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <div style="background: #DBEAFE; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 12px;">Service 1</div>
          <div style="background: #DBEAFE; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 12px;">Service 2</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Arrow -->
  <div style="text-align: center; color: #6B7280; font-size: 24px; margin: 10px 0;">↓</div>
  
  <!-- Worker Nodes -->
  <div style="background: linear-gradient(135deg, #22C55E, #10B981); padding: 20px; border-radius: 12px;">
    <div style="color: white; font-weight: 600; font-size: 16px; margin-bottom: 15px; text-align: center;">Worker Nodes (Container Execution)</div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
      <div style="background: white; padding: 15px; border-radius: 8px;">
        <div style="font-weight: 600; color: #10B981; margin-bottom: 8px;">Worker 1</div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 11px;">C1</div>
          <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 11px;">C2</div>
        </div>
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px;">
        <div style="font-weight: 600; color: #10B981; margin-bottom: 8px;">Worker 2</div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 11px;">C3</div>
          <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 11px;">C4</div>
        </div>
      </div>
      <div style="background: white; padding: 15px; border-radius: 8px;">
        <div style="font-weight: 600; color: #10B981; margin-bottom: 8px;">Worker 3</div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 11px;">C5</div>
          <div style="background: #D1FAE5; padding: 8px; border-radius: 4px; flex: 1; text-align: center; font-size: 11px;">C6</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Benefits -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
      <div style="color: #22C55E; font-size: 24px;">✅</div>
      <div style="color: #374151; font-weight: 600; font-size: 14px;">High Availability</div>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
      <div style="color: #22C55E; font-size: 24px;">✅</div>
      <div style="color: #374151; font-weight: 600; font-size: 14px;">Load Balancing</div>
    </div>
    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
      <div style="color: #22C55E; font-size: 24px;">✅</div>
      <div style="color: #374151; font-weight: 600; font-size: 14px;">Auto-Scaling</div>
    </div>
  </div>
  
</div>

---

## 4. Requirements / What Needs to Be Gathered

### Prerequisites:

- Docker installed on multiple hosts (or use Docker Desktop)
- Basic Docker knowledge
- Understanding of networking basics
- Terminal access to all nodes

### Conceptual Requirements:

- What is container orchestration?
- Understanding of services vs tasks
- Concepts of replication and scaling
- Basic load balancing knowledge

### Tools Needed:

- Docker Engine (Swarm mode built-in)
- Multiple hosts/VMs (or Docker Desktop for testing)
- Network connectivity between nodes

---

## 5. Key Topics to Consider & Plan of Action

### Swarm Concepts:

1. **Node Types:**

   - Manager Nodes: Control plane, maintain cluster state
   - Worker Nodes: Execute containers

2. **Services:**

   - Replicated: Specified number of identical tasks
   - Global: One task per node

3. **Tasks:**

   - Individual container instances
   - Scheduled by managers onto workers

4. **Overlay Networks:**
   - Multi-host networking
   - Secure container communication

### Understanding Plan:

```
Step 1: Initialize Swarm
↓
Step 2: Add nodes to cluster
↓
Step 3: Deploy services
↓
Step 4: Scale and manage
↓
Step 5: Implement updates
```

---

## 6. Code Implementation

### Initialize a Swarm

```bash
# On the manager node
docker swarm init

# Output:
# Swarm initialized: current node (xyz) is now a manager.
# To add a worker to this swarm, run the following command:
#     docker swarm join --token SWMTKN-1-xxx... 192.168.1.100:2377

# Check swarm status
docker info | grep Swarm
# Swarm: active

# View nodes
docker node ls
# ID        HOSTNAME   STATUS   AVAILABILITY   MANAGER STATUS
# abc123    manager1   Ready    Active         Leader
```

### Add Worker Nodes

```bash
# On worker nodes, use the token from swarm init
docker swarm join \
  --token SWMTKN-1-xxx... \
  192.168.1.100:2377

# On manager, verify nodes
docker node ls
# ID        HOSTNAME   STATUS   AVAILABILITY   MANAGER STATUS
# abc123    manager1   Ready    Active         Leader
# def456    worker1    Ready    Active
# ghi789    worker2    Ready    Active
```

### Deploy a Simple Service

```bash
# Create a service with 3 replicas
docker service create \
  --name web \
  --replicas 3 \
  --publish published=8080,target=80 \
  nginx:alpine

# List services
docker service ls
# ID        NAME   MODE        REPLICAS   IMAGE
# xyz123    web    replicated  3/3        nginx:alpine

# Inspect service
docker service ps web
# ID        NAME     IMAGE          NODE      DESIRED STATE   CURRENT STATE
# abc       web.1    nginx:alpine   manager1  Running         Running 1 min
# def       web.2    nginx:alpine   worker1   Running         Running 1 min
# ghi       web.3    nginx:alpine   worker2   Running         Running 1 min
```

### Scaling Services

```bash
# Scale up to 5 replicas
docker service scale web=5

# Scale down to 2 replicas
docker service scale web=2

# Scale multiple services
docker service scale web=3 api=5

# View scaling in action
watch docker service ps web
```

### Service with Environment Variables

```bash
# Create service with env vars
docker service create \
  --name api \
  --replicas 3 \
  --env NODE_ENV=production \
  --env PORT=3000 \
  --env DB_HOST=db.example.com \
  --publish 3000:3000 \
  myapp/api:latest

# Update environment variables
docker service update \
  --env-add LOG_LEVEL=debug \
  api
```

### Service with Volumes

```bash
# Create service with volume
docker service create \
  --name db \
  --replicas 1 \
  --mount type=volume,source=db-data,target=/var/lib/postgresql/data \
  --env POSTGRES_PASSWORD=secret \
  postgres:15

# With bind mount
docker service create \
  --name web \
  --replicas 3 \
  --mount type=bind,source=/host/path,target=/container/path \
  nginx:alpine
```

### Overlay Network

```bash
# Create overlay network
docker network create \
  --driver overlay \
  --attachable \
  my-network

# Create services on the network
docker service create \
  --name frontend \
  --network my-network \
  --replicas 3 \
  myapp/frontend:latest

docker service create \
  --name backend \
  --network my-network \
  --replicas 5 \
  myapp/backend:latest

# Services can communicate using service names
# frontend can reach backend at "http://backend:port"
```

### Rolling Updates

```bash
# Update service to new image
docker service update \
  --image myapp:v2 \
  web

# Update with controlled rollout
docker service update \
  --image myapp:v2 \
  --update-parallelism 1 \
  --update-delay 10s \
  web

# Rollback to previous version
docker service rollback web

# Update with constraints
docker service update \
  --constraint-add node.labels.environment==production \
  web
```

### Docker Stack (Multi-Service Deployment)

```yaml
# docker-compose.yml (stack file)
version: "3.8"

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
    networks:
      - frontend

  api:
    image: myapp/api:latest
    deploy:
      replicas: 5
      placement:
        constraints:
          - node.role == worker
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
        reservations:
          cpus: "0.25"
          memory: 256M
    environment:
      - NODE_ENV=production
    networks:
      - frontend
      - backend

  database:
    image: postgres:15
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.labels.db == true
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend

networks:
  frontend:
    driver: overlay
  backend:
    driver: overlay

volumes:
  db-data:

secrets:
  db_password:
    external: true
```

```bash
# Create secret
echo "mysecretpassword" | docker secret create db_password -

# Deploy stack
docker stack deploy -c docker-compose.yml mystack

# List stacks
docker stack ls

# List services in stack
docker stack services mystack

# View stack details
docker stack ps mystack

# Remove stack
docker stack rm mystack
```

### Service Placement Constraints

```bash
# Run only on manager nodes
docker service create \
  --name admin \
  --constraint node.role==manager \
  admin-app:latest

# Run on nodes with specific label
docker service create \
  --name gpu-app \
  --constraint node.labels.gpu==true \
  ml-app:latest

# Add label to node
docker node update --label-add gpu=true worker1

# Run on specific hostname
docker service create \
  --name special-app \
  --constraint node.hostname==worker2 \
  myapp:latest
```

### Global Services

```bash
# Deploy one container per node
docker service create \
  --name monitoring \
  --mode global \
  --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
  monitoring-agent:latest

# Good for: logging, monitoring, security agents
```

### Health Checks in Swarm

```bash
# Create service with health check
docker service create \
  --name web \
  --replicas 3 \
  --health-cmd "curl -f http://localhost/health || exit 1" \
  --health-interval 30s \
  --health-timeout 10s \
  --health-retries 3 \
  myapp:latest

# Swarm will restart unhealthy tasks automatically
```

### Service Logs

```bash
# View service logs
docker service logs web

# Follow logs
docker service logs -f web

# Logs from specific task
docker service logs web.1

# Last 100 lines
docker service logs --tail 100 web
```

### Draining and Removing Nodes

```bash
# Drain node (move containers away)
docker node update --availability drain worker1

# View effect
docker node ls
# worker1 shows "Drain" availability

# Bring node back
docker node update --availability active worker1

# Remove node from swarm
# First, on worker node:
docker swarm leave

# Then on manager:
docker node rm worker1
```

---

## 7. Things to Consider

### Best Practices:

1. **Use Odd Number of Managers**

   ```bash
   # ✅ Good - 1, 3, 5, or 7 managers
   # Maintains quorum for high availability

   # ❌ Avoid - 2, 4, 6 managers
   # No benefit, higher split-brain risk
   ```

2. **Separate Manager and Worker Roles**

   ```bash
   # Prevent containers on managers
   docker node update --availability drain manager1
   ```

3. **Use Docker Secrets for Sensitive Data**

   ```bash
   # ✅ Good
   echo "password" | docker secret create db_pass -

   # ❌ Avoid - environment variables for secrets
   --env DB_PASSWORD=mysecret
   ```

4. **Implement Health Checks**
   ```yaml
   # In stack file
   healthcheck:
     test: ["CMD", "curl", "-f", "http://localhost/health"]
     interval: 30s
     timeout: 10s
     retries: 3
   ```

### Common Pitfalls:

❌ **Not using overlay networks** (containers can't communicate across nodes)
✅ Create overlay networks for multi-host communication

❌ **No resource limits** (one service can consume all resources)
✅ Set CPU and memory limits in deploy section

❌ **Ignoring update strategies** (all replicas update at once)
✅ Use update_config for controlled rollouts

❌ **Publishing ports on global services** (port conflicts)
✅ Use host mode or routing mesh carefully

### Swarm vs Kubernetes:

| Feature            | Docker Swarm | Kubernetes   |
| ------------------ | ------------ | ------------ |
| **Setup**          | Very easy    | Complex      |
| **Learning Curve** | Gentle       | Steep        |
| **Ecosystem**      | Smaller      | Massive      |
| **Use Case**       | Small-medium | Medium-large |
| **Auto-scaling**   | Basic        | Advanced     |
| **Community**      | Good         | Excellent    |

---

## 8. Additional Helpful Sections

### Monitoring Swarm

```bash
# Node information
docker node inspect manager1

# Service details
docker service inspect web

# Real-time events
docker events --filter type=service

# Stack services status
watch docker stack ps mystack
```

### Backup and Restore

```bash
# Backup swarm state (on manager)
sudo systemctl stop docker
sudo tar -czf swarm-backup.tar.gz /var/lib/docker/swarm
sudo systemctl start docker

# Restore (on new manager)
sudo systemctl stop docker
sudo rm -rf /var/lib/docker/swarm
sudo tar -xzf swarm-backup.tar.gz -C /
sudo systemctl start docker
docker swarm init --force-new-cluster
```

### Troubleshooting

```bash
# Service not starting
docker service ps web --no-trunc

# Check task logs
docker service logs web

# Inspect failed task
docker inspect <task-id>

# Network issues
docker network inspect my-network

# Node connectivity
docker node ls
docker node inspect worker1
```

### Production Example

```yaml
# production-stack.yml
version: "3.8"

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
      restart_policy:
        condition: any
        delay: 5s
        max_attempts: 3
      placement:
        constraints:
          - node.role == worker
    networks:
      - frontend
    configs:
      - source: nginx_config
        target: /etc/nginx/nginx.conf

  app:
    image: myapp:${VERSION:-latest}
    deploy:
      replicas: 10
      update_config:
        parallelism: 2
        delay: 10s
      resources:
        limits:
          cpus: "1"
          memory: 1G
        reservations:
          cpus: "0.5"
          memory: 512M
    environment:
      - NODE_ENV=production
    secrets:
      - db_password
      - api_key
    networks:
      - frontend
      - backend
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.labels.storage == ssd
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend

networks:
  frontend:
    driver: overlay
  backend:
    driver: overlay
    internal: true

volumes:
  db-data:

secrets:
  db_password:
    external: true
  api_key:
    external: true

configs:
  nginx_config:
    file: ./nginx.conf
```

```bash
# Deploy to production
docker stack deploy -c production-stack.yml prod
```

### Quick Commands Reference

```bash
# Swarm Management
docker swarm init                    # Initialize swarm
docker swarm join                    # Join swarm
docker swarm leave                   # Leave swarm
docker node ls                       # List nodes
docker node inspect <node>           # Node details

# Service Management
docker service create                # Create service
docker service ls                    # List services
docker service ps <service>          # Service tasks
docker service logs <service>        # Service logs
docker service scale <service>=N     # Scale service
docker service update                # Update service
docker service rm <service>          # Remove service

# Stack Management
docker stack deploy -c <file> <name> # Deploy stack
docker stack ls                      # List stacks
docker stack services <stack>        # Stack services
docker stack ps <stack>              # Stack tasks
docker stack rm <stack>              # Remove stack

# Secrets
docker secret create <name> <file>   # Create secret
docker secret ls                     # List secrets
docker secret inspect <secret>       # Secret details
docker secret rm <secret>            # Remove secret
```

---

## Summary

Docker Swarm is Docker's native container orchestration solution that enables deploying and managing containerized applications across multiple hosts. Initialize a swarm with `docker swarm init` on a manager node, add workers with `docker swarm join`, and deploy services using `docker service create` or `docker stack deploy`. Swarm provides built-in load balancing, service discovery, rolling updates, and high availability. Use overlay networks for multi-host communication, implement health checks for automatic recovery, and leverage Docker secrets for secure credential management. While simpler than Kubernetes, Swarm is powerful enough for small to medium-scale production deployments. Key features include automatic container distribution, scaling with a single command, zero-downtime updates with rollback capabilities, and seamless integration with Docker Compose files. Docker Swarm is ideal when you need orchestration but want to avoid Kubernetes' complexity.
