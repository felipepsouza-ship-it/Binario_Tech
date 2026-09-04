#!/bin/bash

echo "=========================================="
echo "    Iniciando Limpeza do Ambiente         "
echo "=========================================="

# 1. Encerra qualquer processo do Node.js
echo "[1/2] Encerrando processos do Node.js..."
pkill -9 -f node 2>/dev/null

# 2. Exclui o arquivo de banco de dados JSON
echo "[2/2] Removendo arquivo ocorrencias.json..."
if [ -f "ocorrencias.json" ]; then
    rm -f ocorrencias.json
    echo "  -> Arquivo 'ocorrencias.json' removido com sucesso."
else
    echo "  -> Arquivo 'ocorrencias.json' não encontrado."
fi

echo "=========================================="
echo "    Ambiente resetado com sucesso!        "
echo "=========================================="
