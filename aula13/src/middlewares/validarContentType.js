const validarContentType = (req, res, next) => {
  if (req.method === 'POST' && !req.is('application/json')) {
    return res.status(400).json({
      status: "REQUISICAO_INVALIDA",
      mensagem: "O cabeçalho Content-Type deve ser application/json."
    });
  }
  next();
};

module.exports = validarContentType;
