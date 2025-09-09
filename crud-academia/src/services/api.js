let alunos = [
    {id: '1', nome: 'Thiago Silveira Mazuco', dataNascimento: '12-08-2005', plano: 'Anual', cidade: 'Cocal do Sul'},
    {id: '2', nome: 'Helem da Silva Pereira', dataNascimento: '03-05-2006', plano: 'Mensal', cidade: 'Cricíuma'},
];

let classes = [];

const LATENCY = 500;

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
    const newAluno = { ...data, id: Date.now().toString() };
    alunos.push(newAluno);
    console.log('API: Aluno adicionado. Lista atual:', alunos); 
    setTimeout(() => resolve(newAluno), LATENCY);
  });
};

export const updateAlunos = async (id, data) => {
    return  new Promise(resolve => {
        let alunosToUpdate = alunos.find(s => s.id === id);

        if (alunosToUpdate) {
          alunosToUpdate = {...alunosToUpdate, ...data};
          alunos = alunos.map(s => s.id === id ? alunosToUpdate : s);  
          setTimeout(() => resolve(alunosToUpdate), LATENCY);    
        } else {
            setTimeout(() => resolve(undefined), LATENCY);
        }

    });
};

export const getClasses = async () => {
    return new Promise (resolve => {
        setTimeout(() => resolve([...classes]), LATENCY);
    });
};