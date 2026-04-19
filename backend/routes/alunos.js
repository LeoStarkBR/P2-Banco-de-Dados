const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');

// SELECT — listar todos ou filtrar por nome
router.get('/', async (req, res) => {
  try {
    const filtro = {};
    if (req.query.nome) filtro.nome = new RegExp(req.query.nome, 'i');
    const alunos = await Aluno.find(filtro);
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// INSERT — criar novo aluno
router.post('/', async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.status(201).json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// UPDATE — atualizar por _id
router.put('/:_id', async (req, res) => {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    if (!atualizado) return res.status(404).json({ erro: 'Não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// DELETE — excluir por _id
router.delete('/:_id', async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params._id);
    res.json({ mensagem: 'Excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
