@echo off
REM 🚀 Quick Deploy Script for GitHub Pages (Windows)
REM Run this script to quickly deploy your portfolio

echo 🔄 Starting deployment process...

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git not initialized. Running git init...
    git init
    echo ✅ Git initialized
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No remote origin found.
    echo Please add your GitHub repository URL:
    echo git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
    pause
    exit /b 1
)

REM Add all changes
echo 📁 Adding all files...
git add .

REM Check if there are changes to commit
git diff --staged --quiet
if errorlevel 1 (
    REM Commit changes
    echo 💾 Committing changes...
    set /p commit_msg="Enter commit message (or press Enter for default): "
    if "%commit_msg%"=="" set commit_msg=Update portfolio %date% %time%
    git commit -m "%commit_msg%"
    echo ✅ Changes committed
) else (
    echo ℹ️  No changes to commit
)

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push origin main
if errorlevel 0 (
    echo ✅ Successfully pushed to GitHub!
    echo 🌐 Your website will be available at:
    echo    https://YOUR_USERNAME.github.io/YOUR_REPO
    echo ⏳ GitHub Pages will update in 2-5 minutes
    echo 🔍 Check deployment status in GitHub Actions tab
) else (
    echo ❌ Failed to push to GitHub
    echo Please check your internet connection and GitHub credentials
    pause
    exit /b 1
)

echo 🎉 Deployment process completed!
pause
