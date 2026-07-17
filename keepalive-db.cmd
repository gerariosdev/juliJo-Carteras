@echo off
:: Keepalive para PostgreSQL en WSL
:: Corre cada 5 minutos para evitar que la DB se duerma
wsl -d Ubuntu -u root service postgresql status > nul 2>&1
if errorlevel 1 (
    wsl -d Ubuntu -u root service postgresql start > nul 2>&1
)
