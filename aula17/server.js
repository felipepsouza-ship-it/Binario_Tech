require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_simulado';

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido ou expirado' });
    }
    req.usuario = usuario;
    next();
  });
}

app.get('/api/v1/health', (req, res) => {
  return res.status(200).json({
    status: 'PRONTO_PARA_EXAME',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/v1/auth/token-teste', (req, res) => {
  const payload = {
    id: 'usr_simulado_123',
    nome: 'Aluno Simulado',
    perfil: 'OPERADOR'
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });

  return res.status(200).json({ token });
});

app.get('/api/v1/simulado/status', autenticarToken, (req, res) => {
  return res.status(200).json({
    mensagem: 'Acesso autorizado',
    usuario: req.usuario
  });
});

app.listen(3010, () => {
  console.log('[Binário Tech] Servidor da Aula 17 ativo na porta 3010');
});
