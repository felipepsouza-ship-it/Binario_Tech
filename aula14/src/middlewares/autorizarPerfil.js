const autorizarPerfil = (perfisPermitidos) => {
  return (req, res, next) => {
    // O middleware autenticarToken insere req.usuario
    if (!req.usuario || !perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({
        status: "ERRO",
        mensagem: "Acesso negado. Perfil não autorizado para esta rota."
      });
    }
    next();
  };
};

module.exports = autorizarPerfil;
