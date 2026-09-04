#!/bin/bash

URL="http://localhost:3000/api/v1/motoristas"
LOG="audit_seguranca.log"

echo "===== AUDITORIA DE SEGURANÇA =====" > "$LOG"
echo "Data: $(date)" >> "$LOG"
echo "" >> "$LOG"

echo "Tentativa 1 - Sem API Key" >> "$LOG"
curl -s -i "$URL" >> "$LOG"
echo -e "\n" >> "$LOG"

echo "Tentativa 2 - Sem API Key" >> "$LOG"
curl -s -i "$URL" >> "$LOG"
echo -e "\n" >> "$LOG"

echo "Tentativa 3 - Sem API Key" >> "$LOG"
curl -s -i "$URL" >> "$LOG"
echo -e "\n" >> "$LOG"

echo "Tentativa 4 - Com API Key válida" >> "$LOG"
curl -s -i -H "X-API-KEY: binario-tech-secret-2026" "$URL" >> "$LOG"
echo -e "\n" >> "$LOG"

echo "===== FIM DA AUDITORIA =====" >> "$LOG"

echo "Testes concluídos. Resultado salvo em $LOG"
