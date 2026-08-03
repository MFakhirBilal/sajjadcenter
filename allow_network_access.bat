@echo off
echo =======================================================
echo   SajjadCenter - Allow Wi-Fi Network Devices Access
echo =======================================================
echo.
echo Adding Windows Firewall rules for Port 3000 and Port 5000...
echo.

netsh advfirewall firewall add rule name="SajjadCenter Frontend 3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="SajjadCenter Backend 5000" dir=in action=allow protocol=TCP localport=5000

echo.
echo SUCCESS! Windows Firewall rules added.
echo Now open this IP on your Mobile Phone / Tablet:
echo.
echo    http://10.98.133.40:3000
echo.
pause
