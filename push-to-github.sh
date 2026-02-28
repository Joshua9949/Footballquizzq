#!/bin/bash
# GitHub Push Script for FootballIQ
# Run this after authenticating with GitHub

echo "🚀 Pushing FootballIQ to GitHub..."

# Check if already authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Not authenticated with GitHub"
  echo "Please run: gh auth login"
  echo "Or: setup_github_environment in the sandbox"
  exit 1
fi

# Get current user
GH_USER=$(gh api user --jq .login 2>/dev/null)
echo "✅ Logged in as: $GH_USER"

# Create repo if it doesn't exist
echo "📦 Creating GitHub repository..."
gh repo create footballiq --public --description "⚽ FootballIQ - The Ultimate Football Quiz App" --source=. --remote=origin --push

echo "✅ Code pushed to: https://github.com/$GH_USER/footballiq"
