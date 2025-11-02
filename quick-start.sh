#!/bin/bash

echo "🚀 Quick build and run for ГМК Student Portal"
echo ""

# Build the image
echo "🔨 Building Docker image..."
docker build -t gmk-student-portal .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Start with docker-compose
    echo "🏃 Starting application..."
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
        echo "   docker save gmk-student-portal > gmk-portal.tar"
    else
        echo "❌ Failed to start with docker-compose"
        echo "💡 Trying direct Docker run..."
        docker run -d -p 3000:80 --name gmk-portal gmk-student-portal
        if [ $? -eq 0 ]; then
            echo "✅ Started with Docker run"
            echo "🌐 Access at: http://localhost:3000"
        else
            echo "❌ Failed to start application"
        fi
    fi
else
    echo "❌ Build failed!"
    exit 1
fi