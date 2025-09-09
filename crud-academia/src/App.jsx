import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { AgendaPage } from './pages/AgendaPage';
import { AlunosListPage } from './pages/AlunosListPage';
import { AlunoFormPage } from './pages/AlunoFormPage';
import { AlunoEditPage } from './pages/AlunoEditPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AgendaPage />} />
        <Route path="alunos" element={<AlunosListPage />} />
        <Route path="alunos/novo" element={<AlunoFormPage />} />
        <Route path="alunos/:id/editar" element={<AlunoEditPage />} />
      </Route>
    </Routes>
  );
}

export default App;