import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ChevronsUpDown, X } from "lucide-react";

export function AulaDetalhesModal({ aulaId, isOpen, onOpenChange }) {

  const { aulas, alunos, adicionarParticipante, removerParticipante, finalizarAula} = useAppStore();
  const [openCombobox, setOpenCombobox] = useState(false)
  const [alunoSelecionado, setAlunoSelecionado] = useState("")
  const aula = aulas.find(a => a.id === aulaId);

  if (!aula) {
    return null; 
  }

  const isAulaFinalizada = aula.status === 'concluida';
  const listaDeParticipantes = alunos.filter(aluno => aula.participantes.includes(aluno.id));
  const alunosDisponiveis = alunos.filter(aluno => !aula.participantes.includes(aluno.id));

  const handleFinalizarAula = () => {
    finalizarAula(aula.id);
    onOpenChange(false);
  };

  const handleAdicionarAluno = () => {
    if (alunoSelecionado) {
      adicionarParticipante(aula.id, alunoSelecionado);
      setAlunoSelecionado(""); 
    }
  };

  const formatarDataCompleta = (dataHoraISO) => {
    const data = new Date(dataHoraISO);
    return data.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };
   const formatarHora = (dataHoraISO) => {
    const data = new Date(dataHoraISO);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <DialogTitle className="text-2xl">{aula.descricao}</DialogTitle>
            <DialogDescription>
                 {aula.tipo} • {formatarDataCompleta(aula.dataHora)} às {formatarHora(aula.dataHora)}
            </DialogDescription>
          </div>
          <Badge
            variant={isAulaFinalizada ? 'secondary' : 'default'}
            className="capitalize text-sm mt-1"
          >
            {aula.status}
          </Badge>
        </div>
      </DialogHeader>

      <div className="grid gap-6 py-4">
        <div>
          <h4 className="font-semibold mb-3">
            Participantes ({listaDeParticipantes.length} / {aula.capacidadeMaxima})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {listaDeParticipantes.length > 0 ? (
              listaDeParticipantes.map(participante => (
                <div
                  key={participante.id}
                  className="flex items-center justify-between text-sm p-2 bg-muted rounded-md"
                >
                  <span>{participante.nome}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removerParticipante(aula.id, participante.id)}
                    disabled={isAulaFinalizada}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum participante adicionado.
              </p>
            )}
          </div>
        </div>
        {!isAulaFinalizada && (
            <div className="mt-2">
              <h4 className="font-semibold mb-2">Adicionar Participante</h4>
              <div className="flex items-center gap-2">
              <Popover
                open={openCombobox}
                onOpenChange={setOpenCombobox}
                className="flex-1"
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCombobox}
                    className="flex-1 justify-between"
                  >
                    {alunoSelecionado
                      ? alunos.find(aluno => aluno.id === alunoSelecionado)?.nome
                      : 'Selecione um aluno...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar aluno..." />
                    <CommandList>
                      <CommandEmpty>Nenhum aluno encontrado.</CommandEmpty>
                      <CommandGroup>
                        {alunosDisponiveis.map(aluno => (
                          <CommandItem
                            key={aluno.id}
                            value={aluno.id}
                            onSelect={(currentValue) => {
                              setAlunoSelecionado(currentValue);
                              setOpenCombobox(false);
                            }}
                          >
                            {aluno.nome}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Button
                className="shrink-0 px-4"
                onClick={handleAdicionarAluno}
              >
                Adicionar
              </Button>
            </div>
          </div>
        )}
      </div>

      <DialogFooter className="sm:justify-between mt-4">
        <Button
          variant="destructive"
          onClick={handleFinalizarAula}
          disabled={isAulaFinalizada}
        >
          {isAulaFinalizada ? 'Aula Finalizada' : 'Finalizar Aula'}
        </Button>
        <Button onClick={() => onOpenChange(false)}>Fechar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

}