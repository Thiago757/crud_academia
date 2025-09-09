import { useEffect, useState, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { AulaCard } from '@/components/feature/AulaCard';
import { AulaDetalhesModal } from '@/components/feature/AulaDetalhesModal';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useVirtualizer } from '@tanstack/react-virtual';

export function AgendaPage() {
  const { aulas, isLoading, fetchAulas } = useAppStore();
  const [idAulaSelecionada, setIdAulaSelecionada] = useState(null);

  useEffect(() => {
    if (aulas.length === 0) {
      fetchAulas();
    }
  }, [fetchAulas, aulas.length]);

  const parentRef = useRef(null);
  const aulasOrdenadas = aulas.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

  const virtualizer = useVirtualizer({
    count: aulasOrdenadas.length, 
    getScrollElement: () => parentRef.current,
    estimateSize: () => 124 + 16, 
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const handleCardClick = (aulaId) => {
    setIdAulaSelecionada(aulaId);
  };

  const handleModalClose = () => {
    setIdAulaSelecionada(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-80px)] px-4">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agenda de Aulas</h1>
            <p className="text-muted-foreground mt-2">Veja e gerencie as aulas programadas.</p>
          </div>
          <Button asChild><Link to="/aulas/nova">Criar Nova Aula</Link></Button>
        </div>

        {isLoading && <p className="text-center text-muted-foreground flex-1">Carregando aulas...</p>}
        {!isLoading && aulas.length > 0 && (
          <div ref={parentRef} className="flex-1 overflow-y-auto">
            <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
              {virtualItems.map((virtualItem) => {
                const aula = aulasOrdenadas[virtualItem.index];
                return (
                  <div
                    key={virtualItem.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                      marginBottom: '16px',
                    }}
                    onClick={() => handleCardClick(aula.id)}
                  >
                    <AulaCard aula={aula} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <AulaDetalhesModal 
        aulaId={idAulaSelecionada} 
        isOpen={!!idAulaSelecionada} 
        onOpenChange={handleModalClose} 
      />
    </>
  );
}