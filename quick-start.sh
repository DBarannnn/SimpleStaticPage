#!/bin/bash

echo "🚀 Quick build and run for ГМК Student Portal"
echo ""

# Stop and remove ALL existing containers related to this project
echo "🛑 Stopping and removing existing containers..."
docker-compose down 2>/dev/null || true
docker stop gmk-portal gmk-portal-test landing-student-portal 2>/dev/null || true
docker rm gmk-portal gmk-portal-test landing-student-portal 2>/dev/null || true

# Remove existing images to force fresh build
echo "�️ Removing old images..."
docker rmi gmk-student-portal landing-student-portal 2>/dev/null || true

# Build the image with no cache to include latest changes
echo "🔨 Building fresh Docker image..."
docker build --no-cache -t gmk-student-portal .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Start with docker-compose first
    echo "🏃 Starting application with docker-compose..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 ГМК Student Portal is now running!"
        echo ""
        echo "🌐 Access at: http://localhost:3000"
        echo ""
        echo "📋 Management commands:"
        echo "   docker-compose logs -f    # View logs"
        echo "   docker-compose down       # Stop application"
        echo "   docker-compose restart    # Restart application"
        echo ""
        echo "📦 To create transfer package:"
        echo "   ./create-transfer-package.sh"
    else
        echo "❌ Failed to start with docker-compose"
        echo "💡 Trying direct Docker run..."
        
        # Clean up any containers that might be using port 3000
        docker stop $(docker ps -q --filter "publish=3000") 2>/dev/null || true
        
        docker run -d -p 3000:80 --name gmk-portal gmk-student-portal
        if [ $? -eq 0 ]; then
            echo "✅ Started with Docker run"
            echo "🌐 Access at: http://localhost:3000"
        else
            echo "❌ Failed to start application"
            echo "💡 Check if port 3000 is already in use:"
            echo "   lsof -i :3000"
        fi
    fi
else
    echo "❌ Build failed!"
    exit 1
fi