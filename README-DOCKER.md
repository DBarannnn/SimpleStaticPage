# ГМК Student Portal - Docker Setup

This document explains how to run the ГМК Student Portal using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)

## Quick Start

### Option 1: Multi-Platform Build (Recommended)

1. Navigate to the project directory:
   ```bash
   cd /path/to/landing
   ```

2. Build multi-platform image:
   ```bash
   ./build-multiplatform.sh
   ```

3. Start the application:
   ```bash
   docker-compose up -d
   ```

4. Access the application at: http://localhost:3000

### Option 2: Using Docker Compose (Simple)

1. Build and start:
   ```bash
   docker-compose up -d
   ```

2. Access at: http://localhost:3000

### Option 3: Using Docker directly

1. Build the Docker image:
   ```bash
   docker build -t gmk-student-portal .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:80 --name gmk-portal gmk-student-portal
   ```

3. Access the application at: http://localhost:3000

## Architecture Compatibility

### Check Compatibility
```bash
./check-compatibility.sh
```

### Supported Platforms
- ✅ Intel/AMD processors (linux/amd64)
- ✅ Apple Silicon M1/M2/M3 (linux/arm64)
- ✅ Cross-platform Docker images

## Management Commands

### Stop the application:
```bash
docker-compose down
```

### View logs:
```bash
docker-compose logs -f
```

### Restart the application:
```bash
docker-compose restart
```

### Update the application:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Sharing with Other PCs

### Method 1: Docker Hub (Public)
1. Tag your image:
   ```bash
   docker tag gmk-student-portal your-username/gmk-student-portal:latest
   ```

2. Push to Docker Hub:
   ```bash
   docker push your-username/gmk-student-portal:latest
   ```

3. On other PCs, pull and run:
   ```bash
   docker run -d -p 3000:80 your-username/gmk-student-portal:latest
   ```

### Method 2: Save/Load Docker Image
1. Save the image to a file:
   ```bash
   docker save gmk-student-portal > gmk-portal.tar
   ```

2. Transfer the file to another PC and load it:
   ```bash
   docker load < gmk-portal.tar
   docker run -d -p 3000:80 gmk-student-portal
   ```

### Method 3: Private Registry
Set up a private Docker registry for your organization.

## Network Access

To access from other devices on your network:
1. Find your machine's IP address
2. Access via: http://YOUR_IP_ADDRESS:3000

## Customization

### Change Port
Edit `docker-compose.yml` and modify the ports section:
```yaml
ports:
  - "8080:80"  # Change 3000 to desired port
```

### Environment Variables
Add environment variables in `docker-compose.yml`:
```yaml
environment:
  - TZ=Europe/Kiev
  - CUSTOM_VAR=value
```

## Troubleshooting

### Container won't start:
```bash
docker logs gmk-student-portal
```

### Port already in use:
Change the port in docker-compose.yml or stop the conflicting service.

### Permission issues:
Run Docker commands with `sudo` on Linux systems.

## Features

- ✅ Nginx web server for optimal performance
- ✅ Gzip compression enabled
- ✅ Security headers configured
- ✅ Static asset caching
- ✅ Health checks
- ✅ Auto-restart on failure
- ✅ Lightweight Alpine Linux base

## File Structure

```
/landing/
├── Dockerfile              # Docker build instructions
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx web server configuration
├── .dockerignore           # Files to exclude from Docker build
├── index.html              # Main application file
├── styles.css              # Application styles
├── script.js               # Application JavaScript
└── README-DOCKER.md        # This file
```