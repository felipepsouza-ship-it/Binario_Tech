const express = require('express');
const router = express.Router();

let manutencoes = [
    { id: 1, veiculoId: 1, descricao: "Troca de oleo", custo: 1200.00, status: "CONCLUIDO" }
];

// GET /api/v1/manutencoes
router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});

// POST /api/v1/manutencoes
router.post('/', (req, res) => {
    const { veiculoId, descricao, custo, status } = req.body;

    if (!veiculoId || !descricao || !custo || !status) {
        return res.status(400).json({ erro: "Todos os campos sao obrigatorios." });
    }

    const novaManutencao = {
        id: manutencoes.length + 1,
        veiculoId,
        descricao,
        custo,
        status: status.toUpperCase()
    };

    manutencoes.push(novaManutencao);
    res.status(201).json(novaManutencao);
});

module.exports = router;
