// Docker Tutorials Topics Configuration
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface DockerTutorial {
  title: string;
  slug: string;
  difficulty: DifficultyLevel;
  description: string;
  tags: string[];
  estimatedTime: string;
  rating: number;
  companies: string[];
}

export const dockerTutorials: DockerTutorial[] = [
  // Beginner Level
  {
    title: "What is Docker?",
    slug: "01-what-is-docker",
    difficulty: "beginner",
    description:
      "Understand Docker fundamentals, containers, and how Docker solves the 'it works on my machine' problem.",
    tags: ["Fundamentals", "Containers", "Getting Started"],
    estimatedTime: "20 min",
    rating: 4.8,
    companies: ["Google", "Netflix", "Amazon"],
  },
  {
    title: "Docker vs Virtual Machines",
    slug: "02-docker-vs-vms",
    difficulty: "beginner",
    description:
      "Learn the key differences between Docker containers and virtual machines, and when to use each technology.",
    tags: ["Architecture", "Comparison", "VMs"],
    estimatedTime: "18 min",
    rating: 4.7,
    companies: ["Netflix", "Microsoft", "Spotify"],
  },
  {
    title: "Docker Installation & Setup",
    slug: "03-docker-installation",
    difficulty: "beginner",
    description:
      "Step-by-step guide to install Docker on Windows, Mac, and Linux, plus verifying your installation.",
    tags: ["Setup", "Installation", "Configuration"],
    estimatedTime: "15 min",
    rating: 4.5,
    companies: ["GitHub", "GitLab", "Heroku"],
  },
  {
    title: "Understanding Images & Containers",
    slug: "04-images-containers",
    difficulty: "beginner",
    description:
      "Master the relationship between Docker images and containers, and learn how to create, run, and manage them.",
    tags: ["Images", "Containers", "Docker Commands"],
    estimatedTime: "22 min",
    rating: 4.6,
    companies: ["Google", "Amazon", "Uber"],
  },

  // Intermediate Level
  {
    title: "Writing Dockerfiles",
    slug: "05-writing-dockerfiles",
    difficulty: "intermediate",
    description:
      "Learn to write efficient Dockerfiles with multi-stage builds, best practices, and optimization techniques.",
    tags: ["Dockerfile", "Best Practices", "Optimization"],
    estimatedTime: "28 min",
    rating: 4.7,
    companies: ["Netflix", "Airbnb", "Shopify"],
  },
  {
    title: "Docker Compose Basics",
    slug: "06-docker-compose",
    difficulty: "intermediate",
    description:
      "Define and run multi-container applications with Docker Compose, including networks and volumes.",
    tags: ["Docker Compose", "Multi-container", "Networking"],
    estimatedTime: "25 min",
    rating: 4.8,
    companies: ["Spotify", "Twitch", "Pinterest"],
  },
  {
    title: "Docker Networking",
    slug: "07-docker-networking",
    difficulty: "intermediate",
    description:
      "Understand Docker networking modes, bridge networks, overlay networks, and container communication.",
    tags: ["Networking", "Communication", "Isolation"],
    estimatedTime: "26 min",
    rating: 4.6,
    companies: ["Google Cloud", "Azure", "AWS"],
  },
  {
    title: "Docker Volumes & Data Persistence",
    slug: "08-docker-volumes",
    difficulty: "intermediate",
    description:
      "Learn how to manage data persistence in Docker using volumes, bind mounts, and tmpfs mounts.",
    tags: ["Volumes", "Data Persistence", "Storage"],
    estimatedTime: "24 min",
    rating: 4.7,
    companies: ["MongoDB", "Redis", "PostgreSQL"],
  },

  // Intermediate - Practical
  {
    title: "Containerizing a Node.js App",
    slug: "09-containerize-nodejs",
    difficulty: "intermediate",
    description:
      "Step-by-step guide to containerize a Node.js application with best practices and optimization.",
    tags: ["Node.js", "Web Apps", "Practical"],
    estimatedTime: "30 min",
    rating: 4.7,
    companies: ["Facebook", "LinkedIn", "Slack"],
  },
  {
    title: "Containerizing a Python App",
    slug: "10-containerize-python",
    difficulty: "intermediate",
    description:
      "Learn to containerize Python applications including Flask, Django, and data science projects.",
    tags: ["Python", "Flask", "Django"],
    estimatedTime: "28 min",
    rating: 4.6,
    companies: ["Instagram", "Dropbox", "Spotify"],
  },

  // Advanced Level
  {
    title: "Docker Registry & Image Management",
    slug: "11-docker-registry",
    difficulty: "advanced",
    description:
      "Work with Docker registries, push/pull images, private registries, and image scanning.",
    tags: ["Registry", "Images", "Docker Hub"],
    estimatedTime: "32 min",
    rating: 4.8,
    companies: ["GitHub", "GitLab", "Docker Inc"],
  },
  {
    title: "Container Security Best Practices",
    slug: "12-container-security",
    difficulty: "advanced",
    description:
      "Secure your containers with proper configurations, scanning, and runtime security measures.",
    tags: ["Security", "Best Practices", "Hardening"],
    estimatedTime: "35 min",
    rating: 4.9,
    companies: ["Google Cloud", "Microsoft Azure", "AWS"],
  },
  {
    title: "Docker Performance Optimization",
    slug: "13-performance-optimization",
    difficulty: "advanced",
    description:
      "Optimize container performance, reduce image sizes, and implement caching strategies.",
    tags: ["Performance", "Optimization", "Caching"],
    estimatedTime: "30 min",
    rating: 4.7,
    companies: ["Uber", "Airbnb", "Netflix"],
  },
  {
    title: "Docker Monitoring & Logging",
    slug: "14-monitoring-logging",
    difficulty: "advanced",
    description:
      "Implement comprehensive monitoring and logging for Docker containers using ELK, Prometheus, and more.",
    tags: ["Monitoring", "Logging", "Observability"],
    estimatedTime: "33 min",
    rating: 4.8,
    companies: ["DataDog", "New Relic", "Elastic"],
  },
  {
    title: "Kubernetes Fundamentals",
    slug: "15-kubernetes-basics",
    difficulty: "advanced",
    description:
      "Introduction to Kubernetes orchestration, deploying containers at scale with K8s.",
    tags: ["Kubernetes", "Orchestration", "DevOps"],
    estimatedTime: "40 min",
    rating: 4.9,
    companies: ["Google", "Amazon", "Microsoft"],
  },

  // Additional Beginner Topics
  {
    title: "Container Lifecycle",
    slug: "16-container-lifecycle",
    difficulty: "beginner",
    description:
      "Master the complete lifecycle of Docker containers from creation to removal, including all states and transitions.",
    tags: ["Lifecycle", "Container States", "Management"],
    estimatedTime: "25 min",
    rating: 4.7,
    companies: ["Docker Inc", "AWS", "Google Cloud"],
  },
  {
    title: "CMD vs ENTRYPOINT",
    slug: "17-cmd-vs-entrypoint",
    difficulty: "intermediate",
    description:
      "Understand the critical differences between CMD and ENTRYPOINT, and learn when to use each in your Dockerfiles.",
    tags: ["Dockerfile", "Best Practices", "Commands"],
    estimatedTime: "22 min",
    rating: 4.8,
    companies: ["Netflix", "Spotify", "Uber"],
  },
  {
    title: "Environment Variables",
    slug: "18-environment-variables",
    difficulty: "intermediate",
    description:
      "Learn to use environment variables for flexible configuration, secrets management, and multi-environment deployments.",
    tags: ["Configuration", "Environment", "Secrets"],
    estimatedTime: "26 min",
    rating: 4.7,
    companies: ["Amazon", "Microsoft", "GitLab"],
  },
  {
    title: "Resource Constraints",
    slug: "19-resource-constraints",
    difficulty: "intermediate",
    description:
      "Control CPU, memory, and other resources to optimize container performance and prevent resource exhaustion.",
    tags: ["Resources", "Performance", "Limits"],
    estimatedTime: "24 min",
    rating: 4.6,
    companies: ["Google Cloud", "Kubernetes", "AWS"],
  },
  {
    title: "Docker Swarm Basics",
    slug: "20-docker-swarm",
    difficulty: "advanced",
    description:
      "Introduction to Docker Swarm for container orchestration, creating clusters, and deploying services at scale.",
    tags: ["Swarm", "Orchestration", "Clustering"],
    estimatedTime: "35 min",
    rating: 4.7,
    companies: ["Docker Inc", "Digital Ocean", "Azure"],
  },
  {
    title: "Health Checks",
    slug: "21-health-checks",
    difficulty: "intermediate",
    description:
      "Implement container health checks to ensure reliability, automatic recovery, and better orchestration.",
    tags: ["Health Checks", "Monitoring", "Reliability"],
    estimatedTime: "20 min",
    rating: 4.6,
    companies: ["AWS", "Google Cloud", "Kubernetes"],
  },
  {
    title: "Multi-Stage Builds",
    slug: "22-multistage-builds",
    difficulty: "intermediate",
    description:
      "Optimize Docker images using multi-stage builds to reduce size, improve security, and separate build dependencies.",
    tags: ["Optimization", "Best Practices", "Image Size"],
    estimatedTime: "28 min",
    rating: 4.8,
    companies: ["Google", "Netflix", "Airbnb"],
  },
  {
    title: "Docker Build Arguments",
    slug: "23-build-arguments",
    difficulty: "intermediate",
    description:
      "Use build arguments (ARG) to create flexible Dockerfiles that can be customized at build time.",
    tags: ["ARG", "Build-time", "Customization"],
    estimatedTime: "18 min",
    rating: 4.5,
    companies: ["GitHub", "GitLab", "CircleCI"],
  },
  {
    title: "Container Debugging",
    slug: "24-debugging",
    difficulty: "intermediate",
    description:
      "Learn techniques and tools for debugging Docker containers, troubleshooting issues, and analyzing logs.",
    tags: ["Debugging", "Troubleshooting", "Logs"],
    estimatedTime: "30 min",
    rating: 4.7,
    companies: ["DataDog", "New Relic", "Splunk"],
  },
  {
    title: "CI/CD with Docker",
    slug: "25-cicd-docker",
    difficulty: "advanced",
    description:
      "Implement continuous integration and deployment pipelines using Docker with Jenkins, GitLab CI, and GitHub Actions.",
    tags: ["CI/CD", "Automation", "DevOps"],
    estimatedTime: "38 min",
    rating: 4.9,
    companies: ["GitHub", "GitLab", "Jenkins"],
  },
];
