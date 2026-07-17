#!/bin/bash
# Iniciar JuliJo Carteras local
# Correr con: bash start-dev.sh

echo "🚀 Iniciando JuliJo Carteras..."

# 1. Asegurar que PostgreSQL en WSL esté corriendo
echo "📦 Iniciando PostgreSQL..."
wsl -d Ubuntu bash -c "sudo service postgresql start" 2>/dev/null

# 2. Verificar conexión
echo "🔍 Verificando conexión..."
node -e "
const {Pool} = require('pg');
const p = new Pool({
  connectionString: 'postgresql://julijo:julijo123@localhost:5433/julijo_carteras',
  connectionTimeoutMillis: 3000
});
p.query('SELECT 1').then(r => { console.log('✅ DB conectada'); p.end(); process.exit(0); })
 .catch(e => { console.log('❌ DB no disponible:', e.message); p.end(); process.exit(1); });
" 2>&1

if [ $? -ne 0 ]; then
  echo ""
  echo "⚠️  La base de datos no está disponible."
  echo "   Las páginas que requieren DB mostrarán datos de placeholder."
fi

# 3. Iniciar Next.js
echo ""
echo "🌐 Iniciando servidor en http://localhost:3001"
npx next dev -p 3001
