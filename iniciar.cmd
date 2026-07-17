@echo off
title JuliJo Carteras - Inicio Rapido
echo ========================================
echo   👜 JuliJo Carteras - Inicio Rapido
echo ========================================
echo.

echo 1. Iniciando PostgreSQL en WSL...
wsl -d Ubuntu -u root service postgresql start
echo    ✅ PostgreSQL listo
echo.

echo 2. Verificando conexion...
cd /d %~dp0
node -e "const{Pool}=require('pg');const p=new Pool({connectionString:'postgresql://julijo:julijo123@localhost:5433/julijo_carteras',connectionTimeoutMillis:3000});p.query('SELECT 1').then(r=>{console.log('   ✅ DB conectada');process.exit(0)}).catch(e=>{console.log('   ⚠️  DB no disponible');process.exit(0)})" 2>&1
echo.

echo 3. Iniciando servidor Next.js...
echo    Abri http://localhost:3001 en tu navegador
echo.
start http://localhost:3001
npx next dev -p 3001

pause
