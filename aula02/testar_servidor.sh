#!/bin/bash

echo "=== INICIANDO TESTES DO SERVIDOR DA BINÁRIO TECH ==="
echo "Data e Hora atual: $(date '+%Y-%m-%d %H:%M:%S')"
echo "----------------------------------------------------"

echo "[TESTE 1/3] Rota /status em $(date '+%H:%M:%S'):"
curl -s http://localhost:3000/status | jq .
echo ""

echo "[TESTE 2/3] Rota /scania/info em $(date '+%H:%M:%S'):"
curl -s http://localhost:3000/scania/info | jq .
echo ""

echo "[TESTE 3/3] Rota /vw/info em $(date '+%H:%M:%S'):"
curl -s http://localhost:3000/vw/info | jq .
echo ""

echo "=== TESTES CONCLUÍDOS COM SUCESSO ==="
