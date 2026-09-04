const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ARQUIVO_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

// Função Auxiliar: Ler Arquivo JSON

async function lerOcorrencias() {
    try {
        const dados = await fs.readFile(ARQUIVO_DADOS, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        // Se o arquivo não existir, retorna array vazio e cria o arquivo
        await fs.writeFile(ARQUIVO_DADOS, '[]', 'utf-8');
        return [];
    }
}

// Função Auxiliar: Salvar no arquivo JSON

async function salvarOcorrencias(ocorrencias) {
    await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(ocorrencias, null, 2), 'utf-8');
}

// ROTA: Buscar ocorrências por montadora (Path Parameter)

app.get('/api/vl/ocorrencia/montadora/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const ocorrencias = await lerOcorrencias();

        const filtradas = ocorrencias.filter(item => 
            item && item.montadora && item.montadora.toLowerCase() === nome.toLowerCase()
        );

        res.status(200).json(filtradas);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao filtrar por montadora." });
    }
});

// ROTA 1: Listar todas as ocorrências

app.get('/api/vl/ocorrencias', async (req, res) => {
    try {
        const ocorrencias = await lerOcorrencias();
        res.status(200).json(ocorrencias);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao ler base de dados em disco." });
    }
});

// ROTA 2: Cadastrar nova ocorrência na frota

app.post('/api/vl/ocorrencias', async (req, res) => {
    try {
        const { montadora, placa, descricao, gravidade } = req.body;

        if (!montadora || !placa || !descricao) {
            return res.status(400).json({ erro: "Montadora, placa e descricao sao obrigatorios." });
        }

        const ocorrencias = await lerOcorrencias();
        const novaOcorrencia = {
            id: Date.now(),
            montadora,
            placa,
            descricao,
            gravidade: gravidade || "MEDIA",
            data_registro: new Date().toISOString()
        };

        ocorrencias.push(novaOcorrencia);
        await salvarOcorrencias(ocorrencias);

        res.status(201).json(novaOcorrencia);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao salvar ocorrencia em disco." });
    }
});

// ROTA 3: Remover ocorrência por ID

app.delete('/api/vl/ocorrencias/:id', async (req, res) => {
    
	try {
        const { id } = req.params;
        const ocorrencias = await lerOcorrencias();

        const index = ocorrencias.findIndex(item => item.id === Number(id));

        if (index === -1) {
            return res.status(404).json({ erro: "Ocorrência não encontrada." });
        }

        const [ocorrenciaRemovida] = ocorrencias.splice(index, 1);
        await salvarOcorrencias(ocorrencias);

        return res.status(200).json({
            mensagem: "Ocorrência removida com sucesso.",
            removida: ocorrenciaRemovida
        });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao deletar ocorrência do disco." });
    }
});


app.listen(PORT, () => {
    console.log(`[Binario Tech] API de Ocorrencias ativa na porta ${PORT}`);
});
