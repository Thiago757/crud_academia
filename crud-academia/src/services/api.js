const ALUNOS_STORAGE_KEY = 'academia:alunos'; 

let alunos = [];

try {
  const dadosSalvos = localStorage.getItem(ALUNOS_STORAGE_KEY);
  if (dadosSalvos) {
    alunos = JSON.parse(dadosSalvos);
  } else {
    alunos = [
      { id: '1', nome: 'Thiago Silveira Mazuco', dataNascimento: '2005-08-12', plano: 'Anual', cidade: 'Cocal do Sul' },
      { id: '2', nome: 'Helem da Silva Pereira', dataNascimento: '2006-05-03', plano: 'Mensal', cidade: 'Criciúma' },
    ];
    localStorage.setItem(ALUNOS_STORAGE_KEY, JSON.stringify(alunos));
  }
} catch (error) {
  console.error("Falha ao carregar dados do localStorage", error);
  alunos = [];
}


let classes = [];
const LATENCY = 200; 


export const getAlunos = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...alunos]), LATENCY);
  });
};

export const getAlunosPorId = async (id) => {
  return new Promise(resolve => {
    const aluno = alunos.find(s => s.id === id);
    setTimeout(() => resolve(aluno), LATENCY);
  });
};

export const createAluno = async (data) => {
  return new Promise(resolve => {
    const novoAluno = { ...data, id: Date.now().toString() };
    alunos.push(novoAluno);
    localStorage.setItem(ALUNOS_STORAGE_KEY, JSON.stringify(alunos));
    setTimeout(() => resolve(novoAluno), LATENCY);
  });
};

export const updateAluno = async (id, data) => {
  return new Promise(resolve => {
    let alunoParaAtualizar = alunos.find(s => s.id === id);

    if (alunoParaAtualizar) {
      alunoParaAtualizar = { ...alunoParaAtualizar, ...data };
      alunos = alunos.map(s => s.id === id ? alunoParaAtualizar : s);
      localStorage.setItem(ALUNOS_STORAGE_KEY, JSON.stringify(alunos));
      setTimeout(() => resolve(alunoParaAtualizar), LATENCY);
    } else {
      setTimeout(() => resolve(undefined), LATENCY);
    }
  });
};

export const deleteAluno = async (id) => {
  return new Promise(resolve => {
    alunos = alunos.filter(s => s.id !== id);
    localStorage.setItem(ALUNOS_STORAGE_KEY, JSON.stringify(alunos));
    setTimeout(() => resolve(true), LATENCY);
  });
};

export const getClasses = async () => {
  return new Promise (resolve => {
    setTimeout(() => resolve([...classes]), LATENCY);
  });
};