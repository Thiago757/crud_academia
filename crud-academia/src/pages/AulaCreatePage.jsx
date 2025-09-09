import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { AulaForm } from "@/components/forms/AulaForm";

export function AulaCreatePage() {
  const navigate = useNavigate();
  const addAula = useAppStore((state) => state.addAula);

  const handleSave = async (data) => {
    console.log('Dados da nova aula para salvar:', data);
    await addAula(data);
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Cadastrar Nova Aula</h1>
      <p className="text-muted-foreground mb-8">Preencha os campos para criar uma nova aula na agenda.</p>
      <AulaForm onSave={handleSave} />
    </div>
  );
}