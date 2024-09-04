@echo off

REM Get the current date in YYYY-MM-DD format
for /f "tokens=1-3 delims=/- " %%a in ("%date%") do (
    set day=%%a
    set month=%%b
    set year=%%c
)

REM Get the current time in HH-MM-SS format
for /f "tokens=1-3 delims=: " %%a in ("%time%") do (
    set hour=%%a
    set minute=%%b
    set second=%%c
)

REM Remove leading space in hour if necessary
if "%hour:~0,1%" == " " set hour=0%hour:~1,1%

REM Create a folder name with the current date and time
set folderName=%year%-%month%-%day%_%hour%-%minute%-%second%

REM Output the folder name for verification
@echo %folderName%

REM Create the folder in the backup directory
set backupDir=D:\EjobIndia\final_project\database\%folderName%
mkdir %backupDir%

REM Export the MongoDB database to the created folder
mongodump --uri="mongodb://localhost:27017/tourist-app" --out=%backupDir%

@echo Backup completed successfully!
pause
