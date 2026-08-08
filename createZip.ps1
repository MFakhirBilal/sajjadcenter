$items = Get-ChildItem "d:\sajjadcenter" -Recurse | Where-Object { $_.FullName -notlike "*\node_modules\*" -and $_.FullName -notlike "*\.next\*" -and $_.FullName -notlike "*\.git\*" -and $_.FullName -notlike "*.zip" }
Compress-Archive -Path $items.FullName -DestinationPath "d:\sajjadcenter_project_files.zip" -Force
Write-Host "ZIP Created Successfully"
