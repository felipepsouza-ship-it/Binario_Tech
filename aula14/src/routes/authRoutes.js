const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticarToken = require('../middlewares/autenticarToken');
const autorizarPerfil = require('../middlewares/autorizarPerfil');

/* Rotas públicas */
router.post('/register', authController.registrar);
router.post('/login', authController.login);

/* Rota privada genérica */
router.get('/perfil', autenticarToken, authController.perfil);

/* Rota restrita a ADMIN */
router.get('/admin', autenticarToken, autorizarPerfil(['ADMIN']), (req, res) => {
  res.json({ mensagem: "Bem-vindo ao painel administrativo!" });
});

module.exports = router;
