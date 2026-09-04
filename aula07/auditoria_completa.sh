#!/bin/bash

LOG_FILE="auditoria.log"

echo "====================================================" > $LOG_FILE
echo " AUDITORIA DE ROTAS DA API - BINÁRIO TECH" >> $LOG_FILE
echo " Data do Teste: $(date)" >> $LOG_FILE
echo "====================================================" >> $LOG_FILE

echo -e "\n[1] GET - Telemetria Scania" >> $LOG_FILE
curl -s http://localhost:3000/api/v1/telemetria/scania | jq . >> $LOG_FILE

echo -e "\n[2] GET - Telemetria Mercedes-Benz" >> $LOG_FILE
curl -s http://localhost:3000/api/v1/telemetria/mercedes | jq . >> $LOG_FILE

echo -e "\n[3] POST - Scania (VIN Válido - 12 chars)" >> $LOG_FILE
curl -s -X POST http://localhost:3000/api/v1/telemetria/scania \
	  -H "Content-Type: application/json" \
	    -d '{"modelo":"R540","vin":"9BS555444333","temperatura_motor":99}' | jq . >> $LOG_FILE

echo -e "\n[4] POST - Scania (VIN Inválido - Middleware Test)" >> $LOG_FILE
curl -s -X POST http://localhost:3000/api/v1/telemetria/scania \
	  -H "Content-Type: application/json" \
	    -d '{"modelo":"R450","vin":"12345","temperatura_motor":88}' | jq . >> $LOG_FILE

echo -e "\n[5] POST - Mercedes-Benz (Temperatura Normal)" >> $LOG_FILE
curl -s -X POST http://localhost:3000/api/v1/telemetria/mercedes \
	  -H "Content-Type: application/json" \
	    -d '{"modelo":"Actros 2548","vin":"9BM777888999","temperatura_motor":90}' | jq . >> $LOG_FILE

echo -e "\n[6] GET - Rota Inexistente (404 Test)" >> $LOG_FILE
curl -s http://localhost:3000/api/v1/telemetria/volvo | jq . >> $LOG_FILE

echo -e "\n====================================================" >> $LOG_FILE
echo " AUDITORIA CONCLUÍDA " >> $LOG_FILE
echo "====================================================" >> $LOG_FILE

echo "Auditoria finalizada! O resultado foi salvo no arquivo '$LOG_FILE'."

