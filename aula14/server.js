require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* Mapeia as rotas na raiz e no caminho completo da API */
app.use('/', authRoutes);
app.use('/api/v1/auth', authRoutes);

/* Tratamento para rotas inexistentes */
app.use((req, res) => {
  res.status(404).json({
    status: "NAO_ENCONTRADO",
    mensagem: "Endpoint não encontrado na API."
  });
});

app.listen(PORT, () => {
  console.log(`[Binário Tech] Servidor de Autenticação JWT Aula 14 ativo na porta ${PORT}`);
});
