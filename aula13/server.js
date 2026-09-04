const express = require('express');
const cors = require('cors');
const veiculoRoutes = require('./src/routes/veiculoRoutes');
const gerenciadorErros = require('./src/middlewares/gerenciadorErros');
const validarContentType = require('./src/middlewares/validarContentType');

const app = express();
const PORT = 3000;

app.use(cors());

// 1. O middleware de validação do Content-Type DEVE vir antes do express.json()
app.use(validarContentType);

// 2. Parser de JSON
app.use(express.json());

// 3. Rotas da Aplicação
app.use('/api/v1/veiculos', veiculoRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Endpoint não encontrado na API." });
});

// Middleware Global de Tratamento de Erros
app.use(gerenciadorErros);

app.listen(PORT, () => {
  console.log(`[Binário Tech] Servidor de Validações Aula 13 ativo na porta ${PORT}`);
});
