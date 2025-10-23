#!/bin/bash

# Test Deployment API Script
# This script demonstrates how to use the deployment API

echo "🧪 Testing Deployment API"
echo "=========================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="http://localhost:3002/api"

# Step 1: Check if server is running
echo "1️⃣  Checking if server is running..."
HEALTH_CHECK=$(curl -s ${API_URL}/health)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Server is running${NC}"
else
    echo -e "${RED}❌ Server is not running. Please start the server first.${NC}"
    exit 1
fi
echo ""

# Step 2: Login to get JWT token
echo "2️⃣  Logging in as admin..."
echo -e "${YELLOW}Note: Using default admin credentials (admin/admin123)${NC}"

LOGIN_RESPONSE=$(curl -s -X POST ${API_URL}/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}✅ Login successful${NC}"
    echo "Token: ${TOKEN:0:20}..."
else
    echo -e "${RED}❌ Login failed${NC}"
    echo "Response: $LOGIN_RESPONSE"
    echo ""
    echo -e "${YELLOW}💡 Tip: Make sure you have created an admin user first:${NC}"
    echo "   npm run create-admin"
    exit 1
fi
echo ""

# Step 3: Check deployment configuration status
echo "3️⃣  Checking deployment configuration..."
CONFIG_STATUS=$(curl -s -X GET ${API_URL}/deployment/status \
  -H "Authorization: Bearer ${TOKEN}")

echo "$CONFIG_STATUS" | jq .

IS_CONFIGURED=$(echo $CONFIG_STATUS | jq -r '.configured')
if [ "$IS_CONFIGURED" = "true" ]; then
    echo -e "${GREEN}✅ Deployment is properly configured${NC}"
else
    echo -e "${YELLOW}⚠️  Deployment configuration is incomplete${NC}"
    echo -e "${YELLOW}Please add the following to your .env file:${NC}"
    echo "   GITHUB_TOKEN=ghp_your_token"
    echo "   GITHUB_OWNER=your-username"
    echo "   GITHUB_REPO=your-repo"
    echo "   WORKFLOW_FILE=deploy-admin-frontend.yml"
fi
echo ""

# Step 4: Test deployment trigger (only if configured)
if [ "$IS_CONFIGURED" = "true" ]; then
    echo "4️⃣  Testing deployment trigger..."
    echo -e "${YELLOW}Note: This will trigger an actual deployment!${NC}"
    read -p "Do you want to proceed? (y/N): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        DEPLOY_RESPONSE=$(curl -s -X POST ${API_URL}/deployment/trigger \
          -H "Authorization: Bearer ${TOKEN}" \
          -H "Content-Type: application/json" \
          -d '{"branch": "main"}')
        
        echo "$DEPLOY_RESPONSE" | jq .
        
        DEPLOY_STATUS=$(echo $DEPLOY_RESPONSE | jq -r '.status')
        if [ "$DEPLOY_STATUS" = "success" ]; then
            echo -e "${GREEN}✅ Deployment triggered successfully!${NC}"
        else
            echo -e "${RED}❌ Deployment trigger failed${NC}"
        fi
    else
        echo -e "${YELLOW}⏭️  Skipping deployment trigger${NC}"
    fi
else
    echo "4️⃣  Skipping deployment trigger (not configured)"
fi
echo ""

echo "=========================="
echo "✅ Test completed!"
echo ""
echo "📚 For more information, see DEPLOYMENT_API_GUIDE.md"
