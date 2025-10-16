#!/bin/bash
# ================================
# Create GitHub repo and push code
# ================================

# ==== USER CONFIG ====
GITHUB_USERNAME="ByteByAbhay"
GITHUB_EMAIL="prajapatiabhay.p22@gmail.com"
GITHUB_TOKEN="${GITHUB_TOKEN}"   # never share this publicly!
REPO_NAME="rahulladumor-backend"
DESCRIPTION="rahulladumor-backend"
PRIVATE=false                # true for private repo
LOCAL_PATH="/Users/root1/Documents/company-project/rahulladumor/rahulladumor-backend"   # path to your project folder
# ======================

# --- Step 1: Create repo on GitHub ---
echo "📦 Creating GitHub repository '$REPO_NAME'..."

CREATE_REPO_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
  -u "$GITHUB_USERNAME:$GITHUB_TOKEN" \
  -X POST https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\", \"description\":\"$DESCRIPTION\", \"private\":$PRIVATE}")

if [ "$CREATE_REPO_RESPONSE" -eq 201 ]; then
  echo "✅ Repository '$REPO_NAME' created successfully."
elif [ "$CREATE_REPO_RESPONSE" -eq 422 ]; then
  echo "⚠️ Repository '$REPO_NAME' already exists."
else
  echo "❌ Failed to create repository (HTTP $CREATE_REPO_RESPONSE)"
  exit 1
fi

# --- Step 2: Initialize local repo ---
echo "📂 Initializing local git repository in $LOCAL_PATH..."
cd "$LOCAL_PATH" || { echo "❌ Folder not found: $LOCAL_PATH"; exit 1; }

if [ ! -d ".git" ]; then
  git init
fi

git add .
git commit -m "Initial commit" || echo "⚠️ No changes to commit."

# --- Step 3: Add remote and push ---
REMOTE_URL="https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$REPO_NAME.git"

git config user.name "$GITHUB_USERNAME"
git config user.email "$GITHUB_EMAIL"
git branch -M main
git remote remove origin 2>/dev/null
git remote add origin "$REMOTE_URL"

echo "🚀 Pushing code to GitHub..."
git push -u origin main

echo "✅ Done! Repo available at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
