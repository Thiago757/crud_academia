import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { AlunoForm } from "@/components/forms/AlunoForm";

export function AlunoFormPage() {
  const navigate = useNavigate();
  const addAluno = useAppStore((state) => state.addAluno);

  const handleSave = async (data) => {
    console.log('2. [Página] HandleSave foi chamado.');
    await addAluno(data);
    navigate('/alunos');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Cadastrar Novo Aluno</h1>
      <p className="text-muted-foreground mb-8">Preencha os campos abaixo para registrar um novo aluno.</p>
      <AlunoForm onSave={handleSave} />
    </div>
  );
}