#!/bin/bash

# Cria ou limpa o arquivo de log no início da execução
LOG_FILE="resultado.log"
echo "=== INÍCIO DOS TESTES DE SEGURANÇA ===" > "$LOG_FILE"

echo "1. Testando Health Check..." | tee -a "$LOG_FILE"
curl -s -i http://localhost:3000/api/v1/health | tee -a "$LOG_FILE"
echo -e "\n----------------------------------------\n" >> "$LOG_FILE"

echo "2. Testando Acesso Negado (Sem API Key)..." | tee -a "$LOG_FILE"
curl -s -i http://localhost:3000/api/v1/motoristas | tee -a "$LOG_FILE"
echo -e "\n----------------------------------------\n" >> "$LOG_FILE"

echo "3. Testando Sucesso com API Key..." | tee -a "$LOG_FILE"
curl -s -i -H "X-API-KEY: binario-tech-secret-2026" http://localhost:3000/api/v1/motoristas | tee -a "$LOG_FILE"
echo -e "\n----------------------------------------\n" >> "$LOG_FILE"

echo "4. Testando Validação de CNH Inválida (400 Bad Request)..." | tee -a "$LOG_FILE"
curl -s -i -X POST http://localhost:3000/api/v1/motoristas \
  -H "X-API-KEY: binario-tech-secret-2026" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste Fail","cnh":"123","categoria":"A"}' | tee -a "$LOG_FILE"
echo -e "\n----------------------------------------\n" >> "$LOG_FILE"

echo "5. Testando Rota Inexistente (404 Not Found)..." | tee -a "$LOG_FILE"
curl -s -i http://localhost:3000/api/v1/rota-que-nao-existe | tee -a "$LOG_FILE"
echo -e "\n=== FIM DOS TESTES ===" >> "$LOG_FILE"

echo -e "\nTestes finalizados! Todos os resultados foram salvos em '$LOG_FILE'."

