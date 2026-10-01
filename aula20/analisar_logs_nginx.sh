#!/bin/bash
LOG_FILE="/var/log/nginx/access.log"

if [ ! -f "$LOG_FILE" ]; then
	    echo "Erro: O arquivo de log $LOG_FILE não foi encontrado."
	        exit 1
fi

echo "--- Requisições com status 200 (Últimas 15 linhas) ---"

tail -n 15 "$LOG_FILE" | grep ' 200 '

