#!/bin/bash
LOG_FILE="crud_result.log"
> "$LOG_FILE"

echo "1. POST (Veiculo 1)" | tee -a "$LOG_FILE"
curl -s -X POST http://localhost:3000/api/v1/veiculos \
	  -H "Content-Type: application/json" \
	    -d '{"placa":"ABC-1234","montadora":"Scania","modelo":"R450"}' | jq . | tee -a "$LOG_FILE"

echo "2. POST (Veiculo 2)" | tee -a "$LOG_FILE"
curl -s -X POST http://localhost:3000/api/v1/veiculos \
	  -H "Content-Type: application/json" \
	    -d '{"placa":"XYZ-9876","montadora":"Mercedes-Benz","modelo":"Actros"}' | jq . | tee -a "$LOG_FILE"

echo "3. PATCH (Atualizar Status Veiculo 1)" | tee -a "$LOG_FILE"
curl -s -X PATCH http://localhost:3000/api/v1/veiculos/1/status \
	  -H "Content-Type: application/json" \
	    -d '{"status":"MANUTENCAO"}' | jq . | tee -a "$LOG_FILE"

echo " 4. DELETE (Remover Veiculo 2) " | tee -a "$LOG_FILE"
curl -s -X DELETE http://localhost:3000/api/v1/veiculos/2 | jq . | tee -a "$LOG_FILE"

