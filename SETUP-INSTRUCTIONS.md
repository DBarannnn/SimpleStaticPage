# 🚀 ГМК Student Portal - Setup Instructions

## Quick Setup (For Recipients)

### 1. Download & Extract
```bash
# Extract the package
tar -xzf gmk-student-portal-package.tar.gz
cd gmk-student-portal/
```

### 2. Load Docker Image
```bash
# Load the compressed image
gunzip -c gmk-portal.tar.gz | docker load
```

### 3. Run the Application
```bash
# Option A: Simple run
docker run -d -p 3000:80 --name gmk-portal gmk-student-portal

# Option B: Use docker-compose (if available)
docker-compose up -d

# Option C: Use quick-start script
./quick-start.sh
```

### 4. Access the Portal
Open your browser and go to: **http://localhost:3000**

## What You'll See
- ⏰ **Час** - Real-time clock with class periods
- 📅 **Розклад** - Weekly schedule (Чисельник/Знаменник)
- 🔗 **Сервіси** - University services and links
- 📋 **Посилання** - Academic resources and tools

## Management Commands
```bash
# Stop the application
docker stop gmk-portal

# Start the application
docker start gmk-portal

# Remove the application
docker rm -f gmk-portal

# View logs
docker logs gmk-portal
```

## Troubleshooting

### Port Already in Use?
```bash
# Use different port
docker run -d -p 8080:80 --name gmk-portal gmk-student-portal
# Then access at: http://localhost:8080
```

### Check if Running
```bash
docker ps | grep gmk-portal
```

### Compatibility Check
```bash
./check-compatibility.sh
```

## System Requirements
- Docker installed
- 50MB free disk space
- Port 3000 available (or change to another port)

## Features
- ✅ Works on Intel/AMD and Apple Silicon Macs
- ✅ Real-time clock and schedule
- ✅ Interactive navigation
- ✅ Mobile-responsive design
- ✅ Ukrainian language support

---
Created by: ГМК Student Portal Team