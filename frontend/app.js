const API = '/api/alunos';

function setMsg(id, texto, tipo) {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.className = 'msg ' + (tipo || '');
}

// ───── SELECT ─────
async function buscarAlunos() {
  const nome = document.getElementById('busca').value.trim();
  const url = nome ? `${API}?nome=${encodeURIComponent(nome)}` : API;
  try {
    const res = await fetch(url);
    const alunos = await res.json();
    renderTabela(alunos);
  } catch {
    setMsg('msgDelete', 'Erro ao conectar com o servidor.', 'erro');
  }
}

function renderTabela(alunos) {
  const tbody = document.getElementById('corpoTabela');
  if (!alunos.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="vazio">Nenhum registro encontrado.</td></tr>';
    return;
  }
  tbody.innerHTML = '';
  alunos.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${a.nome}</td>
      <td>${a.id}</td>
      <td>${a.telefone || '—'}</td>
      <td>${a.curso || '—'}</td>
      <td>${a.endereco || '—'}</td>
      <td>
        <button class="btn-editar"
          onclick="selecionarParaUpdate('${a._id}','${esc(a.nome)}','${esc(a.id)}','${esc(a.telefone)}','${esc(a.curso)}','${esc(a.endereco)}')">
          Editar
        </button>
        <button class="btn-excluir" onclick="deletar('${a._id}','${esc(a.nome)}')">
          Excluir
        </button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function esc(v) {
  return (v || '').replace(/'/g, "\\'");
}

// ───── INSERT ─────
document.getElementById('formInsert').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    nome:     document.getElementById('nome').value.trim(),
    id:       document.getElementById('id_aluno').value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    curso:    document.getElementById('curso').value.trim(),
    endereco: document.getElementById('endereco').value.trim()
  };
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('msgInsert', `Inserido com sucesso: ${data.nome}`, 'ok');
      e.target.reset();
      buscarAlunos();
    } else {
      setMsg('msgInsert', `Erro: ${data.erro}`, 'erro');
    }
  } catch {
    setMsg('msgInsert', 'Erro ao conectar com o servidor.', 'erro');
  }
});

// ───── UPDATE ─────
function selecionarParaUpdate(_id, nome, id, telefone, curso, endereco) {
  document.getElementById('update_mongoid').value   = _id;
  document.getElementById('update_nome').value      = nome;
  document.getElementById('update_id').value        = id;
  document.getElementById('update_telefone').value  = telefone;
  document.getElementById('update_curso').value     = curso;
  document.getElementById('update_endereco').value  = endereco;
  setMsg('msgUpdate', '', '');
  document.getElementById('sec-update').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('formUpdate').addEventListener('submit', async (e) => {
  e.preventDefault();
  const _id = document.getElementById('update_mongoid').value;
  if (!_id) {
    setMsg('msgUpdate', 'Selecione um registro na tabela primeiro.', 'erro');
    return;
  }
  const body = {
    nome:     document.getElementById('update_nome').value.trim(),
    telefone: document.getElementById('update_telefone').value.trim(),
    curso:    document.getElementById('update_curso').value.trim(),
    endereco: document.getElementById('update_endereco').value.trim()
  };
  try {
    const res = await fetch(`${API}/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      setMsg('msgUpdate', 'Atualizado com sucesso!', 'ok');
      buscarAlunos();
    } else {
      const data = await res.json();
      setMsg('msgUpdate', `Erro: ${data.erro}`, 'erro');
    }
  } catch {
    setMsg('msgUpdate', 'Erro ao conectar com o servidor.', 'erro');
  }
});

// ───── DELETE ─────
async function deletar(_id, nome) {
  if (!confirm(`Confirmar exclusão de "${nome}"?`)) return;
  try {
    const res = await fetch(`${API}/${_id}`, { method: 'DELETE' });
    if (res.ok) {
      setMsg('msgDelete', `"${nome}" excluído com sucesso!`, 'ok');
      buscarAlunos();
    } else {
      setMsg('msgDelete', 'Erro ao excluir.', 'erro');
    }
  } catch {
    setMsg('msgDelete', 'Erro ao conectar com o servidor.', 'erro');
  }
}

// Carrega a tabela ao abrir a página
buscarAlunos();
