# Kubernetes Fundamentals

## Overview

Introduction to Kubernetes orchestration for deploying, managing, and scaling containers at scale.

---

## What is Kubernetes?

Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.

### Key Features

- **Automated Deployment**: Deploy containers across a cluster
- **Self-Healing**: Restart failed containers, replace nodes
- **Scaling**: Scale applications up/down based on demand
- **Load Balancing**: Distribute traffic automatically
- **Storage Orchestration**: Mount storage systems
- **Updates**: Rolling updates with zero downtime

---

## Core Concepts

### Pods

The smallest deployable unit in Kubernetes.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: myapp
      image: myapp:1.0
      ports:
        - containerPort: 3000
```

### Deployments

Manages replicas of pods.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: myapp:1.0
          ports:
            - containerPort: 3000
```

### Services

Exposes pods to network traffic.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

### ConfigMaps & Secrets

Manage configuration and sensitive data.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_HOST: "postgres"
  DEBUG: "false"

---
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
stringData:
  DATABASE_PASSWORD: "secret123"
```

---

## Kubernetes Architecture

### Master Components

- **API Server**: Central management point
- **Scheduler**: Assigns pods to nodes
- **Controller Manager**: Manages controllers
- **etcd**: Distributed key-value store

### Node Components

- **kubelet**: Runs containers on nodes
- **kube-proxy**: Network proxy
- **Container Runtime**: Runs containers (Docker, containerd)

---

## Getting Started

### Install Kubernetes

```bash
# Docker Desktop (includes Kubernetes)
# Enable Kubernetes in Docker Desktop preferences

# Or use Minikube for local development
brew install minikube
minikube start

# Or use Kind (Kubernetes in Docker)
brew install kind
kind create cluster
```

### Deploy Application

```bash
# Create deployment
kubectl create deployment myapp --image=myapp:1.0

# Expose service
kubectl expose deployment myapp --port=80 --target-port=3000

# Scale deployment
kubectl scale deployment myapp --replicas=3

# Check status
kubectl get pods
kubectl get services
```

### Using YAML Manifests

```bash
# Apply manifests
kubectl apply -f deployment.yaml

# View deployments
kubectl get deployments

# View pods
kubectl get pods

# View logs
kubectl logs pod-name

# Forward port
kubectl port-forward service/myapp 8080:80
```

---

## Common Commands

```bash
# Get resources
kubectl get pods
kubectl get services
kubectl get deployments
kubectl get nodes

# Describe resource
kubectl describe pod pod-name
kubectl describe service service-name

# Execute command
kubectl exec -it pod-name -- /bin/bash

# Logs
kubectl logs pod-name
kubectl logs -f pod-name

# Delete resource
kubectl delete pod pod-name
kubectl delete deployment deployment-name
```

---

## Advantages Over Docker Compose

| Feature                | Docker Compose | Kubernetes        |
| ---------------------- | -------------- | ----------------- |
| **Scaling**            | Manual         | Automatic (HPA)   |
| **Self-Healing**       | No             | Yes               |
| **Rolling Updates**    | Manual         | Automatic         |
| **Multi-Host**         | No             | Yes               |
| **Load Balancing**     | Manual         | Built-in          |
| **Persistent Storage** | Volumes        | PersistentVolumes |

---

## When to Use Kubernetes

✅ **Use Kubernetes when:**

- Deploying at scale (many containers)
- Need auto-scaling capabilities
- Multi-host/multi-datacenter deployments
- Complex orchestration needs
- Need high availability

❌ **Use Docker Compose when:**

- Single machine/development environment
- Simple applications
- Quick prototyping
- Learning Docker basics

---

## Next Steps

- Learn **StatefulSets** for databases
- Study **Ingress** for routing
- Master **Helm** for package management
- Explore **Service Mesh** (Istio, Linkerd)

---

## Resources

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
- [Play with Kubernetes](https://labs.play-with-k8s.com/)
