#!/bin/bash

echo "🔧 Building GMK Student Portal for ARM64 architecture..."

# Remove existing image if it exists
if docker image inspect gmk-student-portal >/dev/null 2>&1; then
    echo "🗑️  Removing existing image..."
    docker rmi gmk-student-portal
fi

# Check if buildx is available
if ! docker buildx version >/dev/null 2>&1; then
    echo "❌ Docker buildx is not available. Installing..."
    # Create and use buildx builder
    docker buildx create --name multiarch --driver docker-container --use 2>/dev/null || true
    docker buildx inspect --bootstrap
fi

# Build for ARM64 platform using buildx
echo "🏗️  Building for linux/arm64 using buildx..."
docker buildx build --platform=linux/arm64 --load -t gmk-student-portal .

if [ $? -eq 0 ]; then
    echo "✅ Build successful for ARM64!"
    echo ""
    echo "🚀 To run the application:"
    echo "   docker-compose up -d"
    echo ""
    echo "🌐 Then access at: http://localhost:3000"
    echo ""
    echo "🔍 To verify platform:"
    echo "   docker image inspect gmk-student-portal --format '{{.Os}}/{{.Architecture}}'"
    echo ""
    echo "📦 To create transfer package:"
    echo "   ./create-transfer-package.sh"
else
    echo "❌ Build failed!"
    exit 1
fi