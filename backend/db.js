const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/Avaliacao2';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB — banco: Avaliacao2'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err.message));

module.exports = mongoose;
