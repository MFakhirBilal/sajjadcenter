@echo off
echo ===================================================
echo   Starting Sajjad Cloth House (Saja Center) Local Server
echo ===================================================

set PATH=C:\Users\Fakhir\AppData\Local\OpenAI\Codex\runtimes\cua_node\03b1cdac8af3a530\bin;%PATH%

echo Installing backend dependencies...
cd backend
call npm install
start "Backend Express API (Port 5000)" cmd /k "set PATH=C:\Users\Fakhir\AppData\Local\OpenAI\Codex\runtimes\cua_node\03b1cdac8af3a530\bin;%%PATH%% && node server.js"

echo Installing frontend dependencies...
cd ..\frontend
call npm install
start "Frontend Next.js App (Port 3000)" cmd /k "set PATH=C:\Users\Fakhir\AppData\Local\OpenAI\Codex\runtimes\cua_node\03b1cdac8af3a530\bin;%%PATH%% && npm run dev"

echo ===================================================
echo Opening Storefront on http://localhost:3000 ...
echo ===================================================
timeout /t 5
start http://localhost:3000
