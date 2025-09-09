import { create } from 'zustand';
import * as api from '@/services/api';

export const useAppStore = create((set) => ({
  alunos: [],
  classes: [],
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
      const alunoAtualizado = await api.updateAlunos(id, alunoData);
      set((state) => ({
        alunos: state.alunos.map(aluno =>
          aluno.id === id ? alunoAtualizado : aluno
        ),
      }));
    } catch (error) {
      console.error("Falha ao atualizar aluno:", error);
    }
  },
}));