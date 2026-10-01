#!/bin/bash
echo "-------------------------------------"
echo " AUDITORIA DE EXECUÇÃO DE PROCESSOS  "
echo "-------------------------------------"

echo "Listando status de execucao dos processos Node.js"
ps aux | grep node >> ./processos.log
 
echo "Resultado da Lista:"
cat processos.log




