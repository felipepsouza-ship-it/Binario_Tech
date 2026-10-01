const mongoose = require('mongoose');

const itemPecaSchema = new mongoose.Schema({
  nomePeca: {
    type: String,
    required: [true, 'O nome da peça é obrigatório.']
  },
  quantidade: {
    type: Number,
    required: [true, 'A quantidade é obrigatória.'],
    min: [1, 'A quantidade deve ser pelo menos 1.']
  },
  custoUnitario: {
    type: Number,
    required: [true, 'O custo unitário é obrigatório.'],
    min: [0, 'O custo unitário não pode ser negativo.']
  }
});

const manutencaoSchema = new mongoose.Schema({
  veiculoPlaca: { type: String, required: true },
  tipoManutencao: { type: String, required: true },
  custoTotal: { type: Number, required: true },
  pecasSubstituidas: [itemPecaSchema],
  status: { type: String, default: 'PENDENTE' }
}, { timestamps: true });

module.exports = mongoose.model('Manutencao', manutencaoSchema);
