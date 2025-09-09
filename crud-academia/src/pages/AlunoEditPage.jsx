import { useEffect, useState, useCallback } from 'react'; // 1. Importe o useCallback
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { AlunoForm } from '@/components/forms/AlunoForm';

export function AlunoEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAlunoPorId = useAppStore((state) => state.fetchAlunoPorId);
  const updateAluno = useAppStore((state) => state.updateAluno);
  const carregarDadosDoAluno = useCallback(async () => {
    setIsLoading(true);
    const dadosDoAluno = await fetchAlunoPorId(id);
    if (dadosDoAluno) {
      setAluno(dadosDoAluno);
    }
    setIsLoading(false);
  }, [id, fetchAlunoPorId]);

  useEffect(() => {
    carregarDadosDoAluno();
  }, [carregarDadosDoAluno]);

  const handleSave = async (data) => {
    await updateAluno(id, data);
    navigate('/alunos');
  };

  if (isLoading) {
    return <p className="text-center text-muted-foreground mt-8">Carregando dados do aluno...</p>;
  }

  if (!aluno) {
    return <p className="text-center text-muted-foreground mt-8">Aluno não encontrado.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Editar Aluno</h1>
      <p className="text-muted-foreground mb-8">Altere os dados abaixo e salve as modificações.</p>
      <AlunoForm alunoParaEditar={aluno} onSave={handleSave} />
    </div>
  );
}