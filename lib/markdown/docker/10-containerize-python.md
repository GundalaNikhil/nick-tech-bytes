# Containerizing a Python Application

## Overview

Learn how to containerize Python applications including Flask, Django, and data science projects.

---

## Basic Python Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m appuser
USER appuser

EXPOSE 5000

CMD ["python", "app.py"]
```

---

## Flask Application

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

---

## Django Application

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi"]
```

---

## Docker Compose Example

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      FLASK_ENV: production
      DATABASE_URL: postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

---

## Multi-Stage Build (Data Science)

```dockerfile
# Build stage
FROM python:3.11-slim AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH

CMD ["python", "model_server.py"]
```

---

## Best Practices

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 211, 238, 0.1)); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid rgba(34, 197, 94, 0.3);">

<h3 style="color: #22C55E; margin-bottom: 20px;">✅ Python Containerization Best Practices</h3>

<div style="display: grid; gap: 12px;">

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22C55E;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #22C55E, #10B981); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #16A34A;">Use python:slim for smaller images</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Slim images are much smaller than full Python images</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #0EA5E9;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #0EA5E9, #3B82F6); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0284C7;">Use pip install --no-cache-dir</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Reduces image size by not storing pip cache</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #8B5CF6, #A855F7); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #7C3AED;">Pin requirements versions</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Specify exact package versions in requirements.txt</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14B8A6;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #14B8A6, #06B6D4); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #0D9488;">Use multi-stage builds</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Optimize image size for data science projects</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #10B981;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #10B981, #22C55E); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">✅ DO</span>
<strong style="color: #059669;">Run as non-root user</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Create and use a dedicated application user</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #EF4444;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #EF4444, #F97316); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #DC2626;">Use latest Python version in production</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Specify exact Python version for stability</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #F97316;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #F97316, #FB923C); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #EA580C;">Include venv in Docker</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Docker provides isolation, no need for virtual environments</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #DC2626;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
<span style="background: linear-gradient(135deg, #DC2626, #EF4444); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 14px;">❌ DON'T</span>
<strong style="color: #B91C1C;">Forget requirements.txt</strong>
</div>
<div style="color: #6B7280; font-size: 14px; padding-left: 12px;">Always specify dependencies in requirements.txt</div>
</div>

</div>

</div>

---

## Next Steps

- [Docker Registry & Image Management](/docker-tutorials/11-docker-registry)
- [Container Security Best Practices](/docker-tutorials/12-container-security)
