const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
  nome:     { type: String, required: true },
  id:       { type: String, required: true, unique: true },
  telefone: { type: String },
  curso:    { type: String },
  endereco: { type: String }
}, { collection: 'Alunos' });

module.exports = mongoose.model('Aluno', AlunoSchema);
