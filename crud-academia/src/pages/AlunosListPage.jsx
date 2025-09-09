import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';

export function AlunosListPage() {
  const { alunos = [], isLoading, fetchAlunos } = useAppStore();

  useEffect(() => {
    if (alunos.length === 0) {
      fetchAlunos();
    }
  }, [fetchAlunos, alunos.length]);

  const formatarData = (data) => {
    if (!data) return 'Data não informada';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Alunos Cadastrados</h1>
          <p className="text-muted-foreground">Veja e gerencie todos os alunos.</p>
        </div>
        <Button asChild>
          <Link to="/alunos/novo">Adicionar Novo Aluno</Link>
        </Button>
      </div>
      {isLoading && <p className="text-center text-muted-foreground">Carregando alunos...</p>}
      {!isLoading && alunos.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Nenhum aluno cadastrado ainda.</p>
          <Button variant="link" asChild className="mt-2">
            <Link to="/alunos/novo">Seja o primeiro a cadastrar!</Link>
          </Button>
        </div>
      )}
      {!isLoading && alunos.length > 0 && (
        <div className="space-y-4">
          {alunos.map(aluno => (
            <div key={aluno.id} className="p-4 border rounded-lg shadow-sm bg-card flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg text-card-foreground">{aluno.nome}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span>Plano: <span className="font-medium text-primary">{aluno.plano}</span></span>
                  <span>|</span>
                  <span>Nascimento: {formatarData(aluno.dataNascimento)}</span>
                  <span>|</span>
                  <span>Cidade: {aluno.cidade || 'Não informada'}</span>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/alunos/${aluno.id}/editar`}>Editar</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}