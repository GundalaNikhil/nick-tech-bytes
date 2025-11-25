# Docker Installation & Setup

## Overview

Learn how to install Docker on your operating system and verify that everything is working correctly. This guide covers Windows, macOS, and Linux installation methods.

---

## Installation on macOS

### Option 1: Docker Desktop (Recommended)

Docker Desktop includes the Docker daemon, CLI, and all necessary tools.

```bash
# Install via Homebrew
brew install --cask docker

# Verify installation
docker --version
docker run hello-world
```

**Alternatively**, you can download the installer from [Docker's official website](https://www.docker.com/products/docker-desktop).

### Option 2: Colima (Lightweight Alternative)

Colima is a lightweight container runtime for macOS that uses less memory.

```bash
# Install Colima
brew install colima

# Start Colima
colima start

# Verify
docker ps
```

---

## Installation on Windows

### System Requirements

- Windows 10/11 Pro, Enterprise, or Home (with WSL 2)
- Virtualization enabled in BIOS
- At least 4GB RAM

### Method 1: Docker Desktop with WSL 2

```bash
# Install Docker Desktop
winget install Docker.DockerDesktop

# Or download from https://www.docker.com/products/docker-desktop

# Verify installation
docker --version
docker run hello-world
```

### Method 2: Chocolatey

```bash
# Install via Chocolatey
choco install docker-desktop

# Verify
docker --version
```

### Troubleshooting WSL 2

If you encounter issues, ensure WSL 2 is enabled:

```powershell
# Enable WSL 2
wsl --install

# Set WSL 2 as default
wsl --set-default-version 2

# List WSL distributions
wsl --list --verbose
```

---

## Installation on Linux

### Ubuntu/Debian

```bash
# Update package manager
sudo apt-get update

# Install Docker
sudo apt-get install -y docker.io

# Verify
docker --version

# Enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify by running a test container
docker run hello-world
```

### Fedora/CentOS/RHEL

```bash
# Install Docker
sudo dnf install docker

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify
docker --version
docker run hello-world
```

### Add User to Docker Group (All Linux Distributions)

To avoid using `sudo` for every Docker command:

```bash
# Create docker group
sudo groupadd docker

# Add your user to the docker group
sudo usermod -aG docker $USER

# Activate the group changes
newgrp docker

# Verify (no sudo needed)
docker run hello-world
```

⚠️ **Security Note**: Users in the docker group have equivalent privileges to root. Use with caution.

---

## Post-Installation Steps

### 1. Verify Installation

Run the hello-world container to confirm Docker is working:

```bash
docker run hello-world
```

Expected output indicates successful installation.

### 2. Check Docker Info

```bash
# Display system-wide Docker information
docker info

# Display Docker version details
docker version
```

### 3. Configure Docker Daemon (Optional)

Edit the Docker daemon configuration file:

**macOS/Linux:**

```bash
# Edit Docker daemon config
sudo nano /etc/docker/daemon.json
```

**Windows (Docker Desktop):**

- Open Docker Desktop
- Settings → Docker Engine
- Edit the JSON configuration

### 4. Enable Docker Service on Boot

**Ubuntu/Debian:**

```bash
sudo systemctl enable docker
sudo systemctl enable containerd
```

**macOS (Docker Desktop):**

- Automatically starts on login by default

**Windows (Docker Desktop):**

- Automatically launches on startup by default

---

## Uninstalling Docker

### macOS

```bash
# If installed via Homebrew
brew uninstall docker

# Or use Docker Desktop uninstaller
# Applications → Docker → Drag to Trash
```

### Windows

```powershell
# If installed via Chocolatey
choco uninstall docker-desktop

# Or
winget uninstall Docker.DockerDesktop

# Or manually: Control Panel → Programs → Uninstall a program → Docker Desktop
```

### Linux

**Ubuntu/Debian:**

```bash
sudo apt-get remove docker docker-io containerd runc
sudo apt-get remove docker-ce docker-ce-cli containerd.io
```

**Fedora/CentOS:**

```bash
sudo dnf remove docker containerd runc
```

---

## Troubleshooting

### Docker Daemon Not Running

```bash
# Check Docker daemon status
systemctl status docker

# Start Docker daemon
sudo systemctl start docker

# Or on macOS, restart Docker Desktop from menu bar
```

### Permission Denied Errors

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker

# Or use sudo
sudo docker ps
```

### Port Already in Use

```bash
# List all containers (including stopped ones)
docker ps -a

# Stop conflicting container
docker stop <container-id>

# Remove container if needed
docker rm <container-id>
```

### Disk Space Issues

```bash
# Show Docker disk usage
docker system df

# Remove unused images
docker image prune -a

# Remove unused containers
docker container prune

# Remove unused volumes
docker volume prune

# Clean up everything
docker system prune -a
```

### Container Runtime Errors

```bash
# Check logs
docker logs <container-id>

# Inspect container details
docker inspect <container-id>

# Run in interactive mode for debugging
docker run -it <image-name> /bin/bash
```

---

## Quick Reference

| Command                  | Purpose                   |
| ------------------------ | ------------------------- |
| `docker --version`       | Check Docker version      |
| `docker run hello-world` | Test installation         |
| `docker info`            | Display system info       |
| `docker ps`              | List running containers   |
| `docker images`          | List available images     |
| `docker system df`       | Show disk usage           |
| `docker system prune`    | Clean up unused resources |

---

## Next Steps

- Learn about [Docker Images and Containers](./04-images-containers.md)
- Write your first [Dockerfile](./05-writing-dockerfiles.md)
- Explore [Docker Compose](./06-docker-compose.md)

---

## Resources

- [Official Docker Documentation](https://docs.docker.com/)
- [Docker Installation Guide](https://docs.docker.com/get-docker/)
- [Docker Desktop Download](https://www.docker.com/products/docker-desktop)
- [Docker Engine Release Notes](https://docs.docker.com/engine/release-notes/)
