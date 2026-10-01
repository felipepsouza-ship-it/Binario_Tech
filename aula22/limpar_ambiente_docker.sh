#!/bin/bash
echo "=================================================="
echo "    LIMPEZA DE AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

echo "[1/3] A parar containers inativos/exited..."
docker ps -a --filter "status=exited" -q | xargs -r docker stop 2>/dev/null

echo "[2/3] A remover containers inativos..."
docker rm $(docker ps -a --filter "status=exited" -q) 2>/dev/null || docker container prune -f

echo "[3/3] A remover imagens pendentes (dangling)..."
docker rmi $(docker images --filter "dangling=true" -q) 2>/dev/null || docker image prune -f

echo "=================================================="
echo "Limpeza concluída com sucesso!"
echo "=================================================="
