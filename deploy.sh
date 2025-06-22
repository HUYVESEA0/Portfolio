#!/bin/bash

# 🚀 Quick Deploy Script for GitHub Pages
# Run this script to quickly deploy your portfolio

echo "🔄 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Running git init..."
    git init
    echo "✅ Git initialized"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found."
    echo "Please add your GitHub repository URL:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/portfolio.git"
    exit 1
fi

# Add all changes
echo "📁 Adding all files..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit changes
    echo "💾 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Update portfolio $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    git commit -m "$commit_msg"
    echo "✅ Changes committed"
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
if git push origin main; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Your website will be available at:"
    
    # Try to get the GitHub username from remote URL
    remote_url=$(git remote get-url origin)
    if [[ $remote_url =~ github\.com[:/]([^/]+)/([^/\.]+) ]]; then
        username="${BASH_REMATCH[1]}"
        repo="${BASH_REMATCH[2]}"
        echo "   https://$username.github.io/$repo"
    else
        echo "   https://YOUR_USERNAME.github.io/YOUR_REPO"
    fi
    
    echo "⏳ GitHub Pages will update in 2-5 minutes"
    echo "🔍 Check deployment status: https://github.com/$username/$repo/actions"
else
    echo "❌ Failed to push to GitHub"
    echo "Please check your internet connection and GitHub credentials"
    exit 1
fi

echo "🎉 Deployment process completed!"
