#!/bin/bash
echo "------------------------------"
echo " AUDITORIA DE TESTE - AULA 17 "
echo "------------------------------"

echo -e "\n[1] Requisição GET checando rota health..."

curl -s http://localhost:3010/api/v1/health | jq .

curl -s http://localhost:3010/api/v1/health | jq . > health_check.log 
