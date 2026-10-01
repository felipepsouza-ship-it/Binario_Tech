require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());

// Rota Interna para inspeção do Header de Proxy enviado pelo Nginx
<<<<<<< HEAD

app.get('/api/v1/proxy/info', (req, res) => {
  res.json({
    status: "SUCESSO",
    mensagem: "Requisição processada pelo Express via Nginx Proxy!",
    clientIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    hostHeader: req.headers['host'],
    portaInternaNode: PORT,
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`[Binário Tech] API Interna de Proxy rodando na porta ${PORT}`);
});
=======
 
app.get('/api/v1/proxy/info', (req, res) => { 
	res.json({
		status: "SUCESSO",
		mensagem: "Requisição processada pelo Express via NginxProxy!",
		clientIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		hostHeader: req.headers['host'],
		portaInternaNode: PORT,
		timestamp: new date()
	});
});

app.listen(PORT, () => {
	console.log(`[Binário Tech] API Interna de Proxy rodando na porta ${PORT}`);
});

>>>>>>> 5420017f504226b9600f060c20987354e5f0544a
