const express = require('express');
const router = express.Router();

let manutencoes = [
    {
        id: 1,
        veiculo: "Caminhão Volvo FH",
        placa: "ABC1D23",
        descricao: "Troca de óleo e filtros",
        valor: 850.00,
        status: "PENDENTE"
    },
    {
        id: 2,
        veiculo: "Caminhão Scania R450",
        placa: "XYZ9E87",
        descricao: "Revisão dos freios",
        valor: 1200.00,
        status: "APROVADO"
    }
];

// GET /api/v1/manutencoes
// Lista todas as manutenções
router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});

// POST /api/v1/manutencoes
// Cadastra uma nova manutenção
router.post('/', (req, res) => {
    const { veiculo, placa, descricao, valor } = req.body;

    // Validação dos campos obrigatórios
    if (!veiculo || !placa || !descricao || valor === undefined) {
        return res.status(400).json({
            erro: "Campos 'veiculo', 'placa', 'descricao' e 'valor' são obrigatórios."
        });
    }

    const novaManutencao = {
        id: manutencoes.length + 1,
        veiculo,
        placa,
        descricao,
        valor,
        status: "PENDENTE"
    };

    manutencoes.push(novaManutencao);

    res.status(201).json(novaManutencao);
});

module.exports = router;


