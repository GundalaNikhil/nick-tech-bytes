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

<div style="overflow-x: auto; margin: 24px 0;">
<table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
<thead>
<tr style="background: linear-gradient(135deg, #6366F1, #8B5CF6);">
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">Feature</th>
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">🐳 Docker Compose</th>
<th style="padding: 16px; text-align: left; color: white; font-weight: 600;">☸️ Kubernetes</th>
</tr>
</thead>
<tbody>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Scaling</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Manual</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Automatic (HPA)</span>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Self-Healing</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEE2E2, #FECACA); color: #991B1B; padding: 6px 12px; border-radius: 6px; font-weight: 500;">No</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Yes</span>
</td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Rolling Updates</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Manual</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Automatic</span>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Multi-Host</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEE2E2, #FECACA); color: #991B1B; padding: 6px 12px; border-radius: 6px; font-weight: 500;">No</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Yes</span>
</td>
</tr>
<tr style="background: rgba(249, 250, 251, 0.5);">
<td style="padding: 14px; font-weight: 600; color: #374151; border-bottom: 1px solid #E5E7EB;">Load Balancing</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #FEF3C7, #FDE68A); color: #92400E; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Manual</span>
</td>
<td style="padding: 14px; border-bottom: 1px solid #E5E7EB;">
<span style="background: linear-gradient(135deg, #D1FAE5, #A7F3D0); color: #065F46; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Built-in</span>
</td>
</tr>
<tr style="background: white;">
<td style="padding: 14px; font-weight: 600; color: #374151;">Persistent Storage</td>
<td style="padding: 14px;">
<span style="background: linear-gradient(135deg, #DBEAFE, #BFDBFE); color: #1E40AF; padding: 6px 12px; border-radius: 6px; font-weight: 500;">Volumes</span>
</td>
<td style="padding: 14px;">
<span style="background: linear-gradient(135deg, #DBEAFE, #BFDBFE); color: #1E40AF; padding: 6px 12px; border-radius: 6px; font-weight: 500;">PersistentVolumes</span>
</td>
</tr>
</tbody>
</table>
</div>

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

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0;">

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; padding: 24px; border: 2px solid rgba(34, 197, 94, 0.3);">
<h4 style="color: #22C55E; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
<span style="font-size: 24px;">☸️</span> Use Kubernetes When
</h4>
<ul style="list-style: none; padding: 0; margin: 0;">
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #22C55E;">
<strong style="color: #16A34A;">Scale:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Deploying many containers</div>
</li>
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #10B981;">
<strong style="color: #059669;">Auto-scaling:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Need dynamic scaling capabilities</div>
</li>
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #14B8A6;">
<strong style="color: #0D9488;">Multi-host:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Multi-datacenter deployments</div>
</li>
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #06B6D4;">
<strong style="color: #0891B2;">Orchestration:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Complex orchestration needs</div>
</li>
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #0EA5E9;">
<strong style="color: #0284C7;">High Availability:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Need maximum uptime</div>
</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(251, 146, 60, 0.1)); border-radius: 12px; padding: 24px; border: 2px solid rgba(239, 68, 68, 0.3);">
<h4 style="color: #EF4444; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
<span style="font-size: 24px;">🐳</span> Use Docker Compose When
</h4>
<ul style="list-style: none; padding: 0; margin: 0;">
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #F97316;">
<strong style="color: #EA580C;">Single Machine:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Development environment</div>
</li>
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #FB923C;">
<strong style="color: #F97316;">Simple Apps:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Simple applications</div>
</li>
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #FDBA74;">
<strong style="color: #FB923C;">Prototyping:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Quick prototyping</div>
</li>
<li style="padding: 10px; margin: 8px 0; background: white; border-radius: 8px; border-left: 4px solid #F59E0B;">
<strong style="color: #D97706;">Learning:</strong>
<div style="color: #6B7280; font-size: 14px; margin-top: 4px;">Learning Docker basics</div>
</li>
</ul>
</div>

</div>

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
