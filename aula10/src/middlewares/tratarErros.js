function tratarErros(err, req, res, next) {
  console.error(`[ERRO LOG]: ${err.message}`);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      erro: "Formato JSON inválido no corpo da requisição. Verifique a sintaxe de aspas e vírgulas." 
    });
  }

  if (err.message && err.message.includes('UNIQUE constraint failed')) {
    return res.status(409).json({ erro: "Conflito de dados: Registro já existe com este valor único (ex: Placa)." });
  }

  if (err.message && err.message.includes('FOREIGN KEY constraint failed')) {
    return res.status(400).json({ erro: "Erro interno no servidor da Binário Tech." });
  }

  return res.status(500).json({ erro: "Erro interno no servidor da Binário Tech." });
}

module.exports = tratarErros;
