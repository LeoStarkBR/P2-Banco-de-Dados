require('./db');
const Aluno = require('./models/Aluno');

const dados = [
  {
    nome: 'Leonardo Gabriel Lopes Gimenes',
    id: 'ALU001',
    telefone: '(17) 99101-0000',
    curso: 'Ciência da Computação',
    endereco: 'Rua das Flores, 100, Votuporanga - SP'
  },
  {
    nome: 'Pegorin',
    id: 'ALU002',
    telefone: '(17) 99202-0000',
    curso: 'Ciência da Computação',
    endereco: 'Av. Brasil, 200, Votuporanga - SP'
  },
  {
    nome: 'Felipe',
    id: 'ALU003',
    telefone: '(17) 99303-0000',
    curso: 'Ciência da Computação',
    endereco: 'Rua XV de Novembro, 300, Votuporanga - SP'
  },
  {
    nome: 'Murilo',
    id: 'ALU004',
    telefone: '(17) 99404-0000',
    curso: 'Ciência da Computação',
    endereco: 'Rua Independência, 400, Votuporanga - SP'
  },
  {
    nome: 'Prof. Gustavo',
    id: 'PROF001',
    telefone: '(17) 99500-0000',
    curso: 'Docente',
    endereco: 'Campus Universitário, s/n, Votuporanga - SP'
  }
];

async function seed() {
  try {
    await Aluno.deleteMany({});
    const inseridos = await Aluno.insertMany(dados);
    console.log(`\n✔ ${inseridos.length} documentos inseridos na coleção Alunos`);
    console.log('  Banco: Avaliacao2 | Coleção: Alunos\n');
    inseridos.forEach(a => console.log(`  - ${a.nome} (${a.id})`));
    console.log('');
    process.exit(0);
  } catch (err) {
    console.error('Erro no seed:', err.message);
    process.exit(1);
  }
}

seed();
