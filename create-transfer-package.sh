#!/bin/bash

echo "📦 Creating transfer package for ГМК Student Portal..."
echo ""

# Save Docker image to tar file
echo "💾 Saving Docker image..."
docker save gmk-student-portal > gmk-portal.tar

if [ $? -eq 0 ]; then
    echo "✅ Image saved successfully"
    
    # Compress the tar file
    echo "🗜️  Compressing image..."
    gzip gmk-portal.tar
    
    # Create complete package with instructions
    echo "📋 Creating complete package..."
    tar -czf gmk-student-portal-package.tar.gz \
        gmk-portal.tar.gz \
        docker-compose.yml \
        README-DOCKER.md \
        quick-start.sh \
        build-arm64.sh
    
    # Get file sizes
    PACKAGE_SIZE=$(ls -lh gmk-student-portal-package.tar.gz | awk '{print $5}')
    IMAGE_SIZE=$(ls -lh gmk-portal.tar.gz | awk '{print $5}')
    
    echo ""
    echo "🎉 Transfer package created successfully!"
    echo ""
    echo "📊 File sizes:"
    echo "   • Compressed image: $IMAGE_SIZE (gmk-portal.tar.gz)"
    echo "   • Complete package: $PACKAGE_SIZE (gmk-student-portal-package.tar.gz)"
    echo ""
    echo "📤 Send this file: gmk-student-portal-package.tar.gz"
    echo ""
    echo "💬 Instructions for recipient:"
    echo "   1. Download: gmk-student-portal-package.tar.gz"
    echo "   2. Extract: tar -xzf gmk-student-portal-package.tar.gz"
    echo "   3. Load image: gunzip -c gmk-portal.tar.gz | docker load"
    echo "   4. Run: docker run -d -p 3000:80 gmk-student-portal"
    echo "   5. Access: http://localhost:3000"
    echo ""
    echo "🔧 Or use the quick-start script:"
    echo "   ./quick-start.sh (after loading the image)"
    
else
    echo "❌ Failed to save Docker image"
    exit 1
fi