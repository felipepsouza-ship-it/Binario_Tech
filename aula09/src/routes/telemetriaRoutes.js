const express = require('express');
const router = express.Router();
const telemetriaController = require('../controllers/telemetriaController');
const db = require('../database/connection');

router.post('/veiculo-teste', async (req, res) => {
	  try {
		      const { placa, montadora, modelo } = req.body;
		      
		      const veiculoExistente = await db('veiculos').where({ placa }).first();
		      if (veiculoExistente) {
			            return res.status(200).json(veiculoExistente);
			          }

		      const [id] = await db('veiculos').insert({ placa, montadora, modelo });
		      return res.status(201).json({ id, placa, montadora, modelo });
		    } catch (error) {
			        return res.status(500).json({ erro: error.message });
			      }
});

router.post('/', telemetriaController.registrarLeitura);
router.get('/relatorio', telemetriaController.listarRelatorioCompleto);
router.get('/veiculo/:id', telemetriaController.buscarPorVeiculo);

module.exports = router;
