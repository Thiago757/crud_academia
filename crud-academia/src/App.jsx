import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { AgendaPage } from './pages/AgendaPage';
import { AlunosListPage } from './pages/AlunosListPage';
import { AlunoFormPage } from './pages/AlunoFormPage';
import { AlunoEditPage } from './pages/AlunoEditPage';
import { AulaCreatePage } from './pages/AulaCreatePage';

function App() {
  const fetchAlunos = useAppStore((state) => state.fetchAlunos);

  useEffect(() => {
      console.log("APP INICIALIZADO: Buscando lista de alunos...");
      fetchAlunos();
    }, [fetchAlunos]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AgendaPage />} />
        <Route path="alunos" element={<AlunosListPage />} />
        <Route path="alunos/novo" element={<AlunoFormPage />} />
        <Route path="alunos/:id/editar" element={<AlunoEditPage />} />
        <Route path="aulas/nova" element={<AulaCreatePage />} />
      </Route>
    </Routes>
  );
}

export default App;