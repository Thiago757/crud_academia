import { create } from 'zustand';
import * as api from '@/services/api';

export const useAppStore = create((set, get) => ({
  alunos: [],
  aulas: [],
  isLoading: false,

  fetchAlunos: async () => {
    set({ isLoading: true });
    try {
      const alunos = await api.getAlunos();
      set({ alunos, isLoading: false });
    } catch (error) {
      console.error("Falha ao buscar alunos!", error);
      set({ isLoading: false });
    }
  },

  fetchAlunoPorId: async (id) => {
    const aluno = await api.getAlunosPorId(id);
    return aluno;
  },

  addAluno: async (alunoData) => {
    try {
      const novoAluno = await api.createAluno(alunoData);
      set((state) => ({
        alunos: [...state.alunos, novoAluno]
      }));
    } catch (error) {
      console.error("Falha ao adicionar aluno:", error);
    }
  },

  updateAluno: async (id, alunoData) => {
    try {
      const alunoAtualizado = await api.updateAluno(id, alunoData);
      set((state) => ({
        alunos: state.alunos.map(aluno =>
          aluno.id === id ? alunoAtualizado : aluno
        ),
      }));
    } catch (error) {
      console.error("Falha ao atualizar aluno:", error);
    }
  },

  toggleStatusAluno: async (alunoId) => {
    try {
      const alunoModificado = await api.toggleStatusAluno(alunoId);
      if (alunoModificado) {
        set(state => ({
          alunos: state.alunos.map(aluno =>
            aluno.id === alunoId ? alunoModificado : aluno
          ),
        }));
      }
    } catch (error) {
      console.error("Falha ao modificar status do aluno:", error);
    }
  },

fetchAulas: async () => {
    set({ isLoading: true });
    try {
      const aulas = await api.getAulas();
      set({ aulas, isLoading: false });
    } catch (error) {
      console.error("Falha ao buscar aulas!", error);
      set({ isLoading: false });
    }
  },

  addAula: async (aulaData) => {
    try {
      const novaAula = await api.createAula(aulaData);
      set((state) => ({
        aulas: [...state.aulas, novaAula]
      }));
    } catch (error) {
      console.error("Falha ao adicionar aula:", error);
    }
  },

  adicionarParticipante: (aulaId, alunoId) => {
    const { aulas } = get();
    const aulaAlvo = aulas.find(a => a.id === aulaId);

    if (!aulaAlvo) {
      console.error("Aula não encontrada!");
      return;
    }
    if (aulaAlvo.status === 'concluida') {
      alert("Não é possível adicionar participantes a uma aula já concluída.");
      return;
    }
    if (aulaAlvo.participantes.length >= aulaAlvo.capacidadeMaxima) {
      alert("A capacidade máxima da aula foi atingida.");
      return;
    }
    if (aulaAlvo.participantes.includes(alunoId)) {
      alert("Este aluno já está na aula.");
      return;
    }

    const agora = new Date();
    const horaDaAula = new Date(aulaAlvo.dataHora);

    if (agora > horaDaAula && !aulaAlvo.permiteAposInicio) {
      alert("Não é possível adicionar participantes após o início de uma aula que não permite agendamento tardio.");
      return;
    }

    set(state => ({
      aulas: state.aulas.map(aula =>
        aula.id === aulaId
          ? { ...aula, participantes: [...aula.participantes, alunoId] }
          : aula
      ),
      }));
    },

     removerParticipante: (aulaId, alunoId) => {
    set(state => ({
      aulas: state.aulas.map(aula =>
        aula.id === aulaId
          ? { ...aula, participantes: aula.participantes.filter(id => id !== alunoId) }
          : aula
      ),
    }));
  },

  finalizarAula: async (aulaId) => {
    try {
      const aulaFinalizada = await api.finalizarAula(aulaId);
      if (aulaFinalizada) {
        set(state => ({
          aulas: state.aulas.map(aula =>
            aula.id === aulaId ? aulaFinalizada : aula
          ),
        }));
      }
    } catch (error) {
      console.error("Falha ao finalizar aula:", error);
    }
  },

}));