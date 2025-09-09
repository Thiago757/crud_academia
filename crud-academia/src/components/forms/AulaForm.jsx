import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aulaSchema } from '@/lib/validators';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function AulaForm({ aulaParaEditar, onSave }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(aulaSchema),
    defaultValues: aulaParaEditar || {
      descricao: "",
      tipo: "",
      dataHora: "",
      capacidadeMaxima: 10,
      permiteAposInicio: false,
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (onSave) {
      const dadosParaSalvar = {
        ...data,
        status: 'aberta',
        participantes: [],
      };
      await onSave(dadosParaSalvar);
    }
    setIsSubmitting(false);
  };
  
  const modoEdicao = !!aulaParaEditar;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição da Aula</FormLabel>
                <FormControl><Input placeholder="Ex: Cross Training Avançado" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Aula</FormLabel>
                <FormControl><Input placeholder="Ex: Cross, Funcional, Pilates" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="dataHora"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data e Hora</FormLabel>
                <FormControl><Input type="datetime-local" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacidadeMaxima"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacidade Máxima</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="permiteAposInicio"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Permitir agendamento após o início da aula?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : (modoEdicao ? 'Atualizar Aula' : 'Salvar Aula')}
          </Button>
        </div>
      </form>
    </Form>
  );
}