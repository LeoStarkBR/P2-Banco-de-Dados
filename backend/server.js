const express = require('express');
const cors = require('cors');
const path = require('path');
require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/alunos', require('./routes/alunos'));

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
