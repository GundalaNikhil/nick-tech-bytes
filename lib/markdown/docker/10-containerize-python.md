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

✅ **Use python:slim for smaller images**
✅ **Use pip install --no-cache-dir**
✅ **Pin requirements versions**
✅ **Use multi-stage builds for optimization**
✅ **Run as non-root user**
❌ **Don't use latest Python version in production**
❌ **Don't include venv in Docker**
❌ **Don't forget requirements.txt**

---

## Next Steps

- [Docker Registry & Image Management](./11-docker-registry.md)
- [Container Security Best Practices](./12-container-security.md)
