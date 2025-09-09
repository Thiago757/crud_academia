const ALUNOS_STORAGE_KEY = 'academia:alunos'; 
const AULAS_STORAGE_KEY = 'academia:aulas';

let alunos = [];

try {
  const dadosSalvos = localStorage.getItem(ALUNOS_STORAGE_KEY);
  if (dadosSalvos) {
    alunos = JSON.parse(dadosSalvos);
  } else {
    alunos = [
      { id: '1', nome: 'Thiago Silveira Mazuco', dataNascimento: '2005-08-12', plano: 'Anual', cidade: 'Cocal do Sul', status: 'ativo' },
      { id: '2', nome: 'Helem da Silva Pereira', dataNascimento: '2006-05-03', plano: 'Mensal', cidade: 'Criciúma', status: 'ativo' },
    ];
    localStorage.setItem(ALUNOS_STORAGE_KEY, JSON.stringify(alunos));
  }
} catch (error) {
  console.error("Falha ao carregar dados do localStorage", error);
  alunos = [];
}

let classes = [];

try {
  const dadosSalvos = localStorage.getItem(AULAS_STORAGE_KEY);
  if (dadosSalvos) {
    classes = JSON.parse(dadosSalvos);
  } else {
    const hoje = new Date();
    classes = [
      { id: '101', descricao: 'Cross Training Intenso', tipo: 'Cross', dataHora: new Date(hoje.setHours(8, 0, 0)).toISOString(), capacidadeMaxima: 10, status: 'aberta', permiteAposInicio: false, participantes: ['1'] },
      { id: '102', descricao: 'Funcional para Iniciantes', tipo: 'Funcional', dataHora: new Date(hoje.setHours(9, 30, 0)).toISOString(), capacidadeMaxima: 12, status: 'aberta', permiteAposInicio: true, participantes: ['2'] },
    ];
    localStorage.setItem(AULAS_STORAGE_KEY, JSON.stringify(classes));
  }
} catch (error) {
  console.error("Falha ao carregar dados das aulas do localStorage", error);
  classes = [];
}

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

export const toggleStatusAluno = async (id) => {
  return new Promise(resolve => {
    let alunoParaModificar = alunos.find(s => s.id === id);
    if (alunoParaModificar) {
      alunoParaModificar.status = alunoParaModificar.status === 'ativo' ? 'inativo' : 'ativo';
      alunos = alunos.map(s => s.id === id ? alunoParaModificar : s);
      localStorage.setItem(ALUNOS_STORAGE_KEY, JSON.stringify(alunos));
      setTimeout(() => resolve(alunoParaModificar), LATENCY);
    } else {
      setTimeout(() => resolve(undefined), LATENCY);
    }
  });
};

export const getAulas = async () => {
  return new Promise(resolve => setTimeout(() => resolve([...classes]), LATENCY));
};

export const createAula = async (data) => {
  return new Promise(resolve => {
    const novaAula = { ...data, id: Date.now().toString(), participantes: [] };
    classes.push(novaAula);
    localStorage.setItem(AULAS_STORAGE_KEY, JSON.stringify(classes));
    setTimeout(() => resolve(novaAula), LATENCY);
  });
};

export const finalizarAula = async (id) => {
  return new Promise(resolve => {
    let aulaParaFinalizar = classes.find(a => a.id === id);

    if (aulaParaFinalizar) {
      aulaParaFinalizar.status = 'concluida';
      classes = classes.map(a => a.id === id ? aulaParaFinalizar : a);
      localStorage.setItem(AULAS_STORAGE_KEY, JSON.stringify(classes));
      setTimeout(() => resolve(aulaParaFinalizar), LATENCY);
    } else {
      setTimeout(() => resolve(undefined), LATENCY);
    }
  });
};