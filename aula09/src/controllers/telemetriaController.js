
const db = require('../database/connection');

async function registrarLeitura(req, res) {
  try {
    const { veiculo_id, velocidade, temperatura_motor } = req.body;

    // EXERCÍCIO 2: Verifica se o veículo existe no banco
    const veiculoExiste = await db('veiculos').where({ id: veiculo_id }).first();

    if (!veiculoExiste) {
      return res.status(404).json({ mensagem: "Veículo não encontrado para registrar telemetria" });
    }

    const [id] = await db('telemetrias').insert({
      veiculo_id,
      velocidade,
      temperatura_motor
    });

    return res.status(201).json({
      id,
      veiculo_id,
      velocidade,
      temperatura_motor,
      mensagem: "Leitura registrada com sucesso!"
    });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

async function listarRelatorioCompleto(req, res) {
  try {
    const { alerta } = req.query;

    let query = db('telemetrias')
      .join('veiculos', 'veiculos.id', '=', 'telemetrias.veiculo_id')
      .select(
        'telemetrias.id as telemetria_id',
        'veiculos.placa',
        'veiculos.montadora',
        'veiculos.modelo',
        'telemetrias.velocidade',
        'telemetrias.temperatura_motor',
        db.raw("strftime('%Y-%m-%d %H:%M:%S', telemetrias.created_at) as capturado_em")
      );

    // EXERCÍCIO 3: Filtra temperatura > 95 se alerta=true
    if (alerta === 'true') {
      query = query.where('telemetrias.temperatura_motor', '>', 95);
    }

    const relatorio = await query;
    return res.json(relatorio);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

async function buscarPorVeiculo(req, res) {
  try {
    const { id } = req.params;
    
    const leituras = await db('telemetrias')
      .where({ veiculo_id: id });

    return res.status(200).json(leituras);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

module.exports = {
	  registrarLeitura,
	  listarRelatorioCompleto,
	  buscarPorVeiculo
};
