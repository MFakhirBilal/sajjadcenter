# PowerShell Launch Script for Sajjad Cloth House
Write-Host "===================================================" -ForegroundColor Gold
Write-Host " Starting Sajjad Cloth House Local Environment" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Gold

# Check if Node is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not detected on your system PATH." -ForegroundColor Red
    Write-Host "Please download Node.js LTS from https://nodejs.org and restart PowerShell." -ForegroundColor Yellow
    exit
}

Write-Host "1. Installing backend dependencies..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\backend"
npm install
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run seed; npm run dev"

Write-Host "2. Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\frontend"
npm install
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "Launching http://localhost:3000 in your browser..." -ForegroundColor Green
Start-Sleep -Seconds 4
Start-Process "http://localhost:3000"
