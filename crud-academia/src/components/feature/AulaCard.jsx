import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Clock } from 'lucide-react';

export function AulaCard({ aula }) {
  const formatarHora = (dataHoraISO) => {
    const data = new Date(dataHoraISO);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatarData = (dataHoraISO) => {
    const hoje = new Date();
    const amanha = new Date();
    amanha.setDate(hoje.getDate() + 1);
    
    const dataAula = new Date(dataHoraISO);

    hoje.setHours(0, 0, 0, 0);
    amanha.setHours(0, 0, 0, 0);
    dataAula.setHours(0, 0, 0, 0);

    if (dataAula.getTime() === hoje.getTime()) {
      return 'Hoje';
    }
    if (dataAula.getTime() === amanha.getTime()) {
      return 'Amanhã';
    }
    return new Date(dataHoraISO).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };
  
  const lotacaoPercentual = (aula.participantes.length / aula.capacidadeMaxima) * 100;
  const statusVariante = aula.status === 'aberta' ? 'default' : 'secondary';

  return (
    <div className={`border rounded-lg p-4 bg-card text-card-foreground shadow-sm hover:shadow-md transition-all cursor-pointer ${aula.status === 'concluida' ? 'opacity-60 hover:shadow-sm' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-x-2 mb-1">
            <Badge variant={statusVariante} className="capitalize">{aula.status}</Badge>
            <span className="text-sm font-medium text-muted-foreground">{aula.tipo}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm font-medium text-muted-foreground">{formatarData(aula.dataHora)}</span>
          </div>
          <h3 className="text-lg font-semibold">{aula.descricao}</h3>
        </div>

        <div className="flex items-center gap-1 text-lg font-mono bg-secondary text-secondary-foreground px-2 py-1 rounded">
          <Clock className="h-5 w-5" />
          {formatarHora(aula.dataHora)}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Lotação</span>
          </div>
          <span className="font-semibold">{aula.participantes.length} / {aula.capacidadeMaxima}</span>
        </div>
        <Progress value={lotacaoPercentual} className="h-2 [&>div]:bg-sky-400" />
      </div>
    </div>
  );
}