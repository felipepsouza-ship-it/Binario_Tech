#!/bin/bash
echo "--- INICIANDO TESTES CRUD ---" > crud_result.log
echo "$(date)" >> crud_result.log

# Cadastrar 2 veículos
curl -s -X POST http://localhost:3010/api/v1/veiculos -H "Content-Type: application/json" -d '{"placa":"AAA-1111","montadora":"Ford","modelo":"Cargo"}' | jq . >> crud_result.log
curl -s -X POST http://localhost:3010/api/v1/veiculos -H "Content-Type: application/json" -d '{"placa":"BBB-2222","montadora":"Iveco","modelo":"Daily"}' | jq . >> crud_result.log

# Atualizar status do veículo 1
curl -s -X PATCH http://localhost:3010/api/v1/veiculos/5/status -H "Content-Type: application/json" -d '{"status":"EM_ROTA"}' | jq .>> crud_result.log

# Deletar veículo 2
curl -s -X DELETE http://localhost:3010/api/v1/veiculos/5 | jq . >> crud_result.log

echo "--- TESTES CONCLUÍDOS ---" >> crud_result.log
