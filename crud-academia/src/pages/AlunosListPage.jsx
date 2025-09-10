import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';

export function AlunosListPage() {
  const { alunos, isLoading, toggleStatusAluno } = useAppStore();
  const [mostrarInativos, setMostrarInativos] = useState(false);

  const formatarData = (data) => {
    if (!data) return 'Data não informada';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };
  
  const alunosFiltrados = alunos.filter(aluno => {
    if (mostrarInativos) {
      return aluno.status === 'inativo';
    }
    return aluno.status === 'ativo';
  });
  
  if (isLoading && alunos.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">Carregando alunos...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Alunos Cadastrados</h1>
          <p className="text-muted-foreground">Veja e gerencie todos os alunos.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="mostrar-inativos"
              checked={mostrarInativos}
              onCheckedChange={setMostrarInativos}
            />
            <Label htmlFor="mostrar-inativos">Apenas inativos</Label>
          </div>
          <Button asChild>
            <Link to="/alunos/novo">Adicionar Novo Aluno</Link>
          </Button>
        </div>
      </div>

      {alunosFiltrados.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            {mostrarInativos ? "Nenhum aluno cadastrado." : "Nenhum aluno ativo encontrado."}
          </p>
          <Button variant="link" asChild className="mt-2">
            <Link to="/alunos/novo">Cadastrar novo aluno</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {alunosFiltrados.map(aluno => (
            <div key={aluno.id} className={`p-4 border rounded-lg shadow-sm bg-card flex justify-between items-center transition-opacity ${aluno.status === 'inativo' ? 'opacity-60' : ''}`}>
              <div>
                <div className="flex items-center gap-x-3 mb-1">
                  <p className="font-semibold text-lg text-card-foreground">{aluno.nome}</p>
                  <Badge variant={aluno.status === 'ativo' ? 'default' : 'destructive'}>
                    {aluno.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                  <span>Plano: <span className="font-medium text-primary">{aluno.plano}</span></span>
                  <span className="hidden md:inline">|</span>
                  <span>Nascimento: {formatarData(aluno.dataNascimento)}</span>
                </div>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/alunos/${aluno.id}/editar`}>Editar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleStatusAluno(aluno.id)}>
                      {aluno.status === 'ativo' ? 'Inativar' : 'Reativar'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}