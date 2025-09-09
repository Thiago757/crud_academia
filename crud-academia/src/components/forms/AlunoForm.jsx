import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { alunoSchema } from '@/lib/validators'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const alunoPlans = ['Mensal', 'Trimestral', 'Anual'];

export function AlunoForm({ alunoParaEditar, onSave }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(alunoSchema),
    defaultValues: alunoParaEditar || {
      nome: "",
      dataNascimento: "",
      plano: "",
      cpf: "",
      cidade: "",
      bairro: "",
      endereco: "",
    }
  });

  useEffect(() => {
    if (alunoParaEditar) {
      form.reset(alunoParaEditar);
    }
  }, [alunoParaEditar?.id]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (onSave) {
      await onSave(data);
    }
    setIsSubmitting(false);
  };
  
  const modoEdicao = !!alunoParaEditar;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl><Input placeholder="Ex: João da Silva" {...field} disabled={isSubmitting} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="dataNascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl><Input type="date" {...field} disabled={isSubmitting}/></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plano"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Plano</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecione um plano" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {alunoPlans.map(plan => (<SelectItem key={plan} value={plan}>{plan}</SelectItem>))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF (Opcional)</FormLabel>
                <FormControl><Input placeholder="000.000.000-00" {...field} disabled={isSubmitting}/></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade (Opcional)</FormLabel>
                <FormControl><Input placeholder="Ex: Criciúma" {...field} disabled={isSubmitting}/></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro (Opcional)</FormLabel>
                <FormControl><Input placeholder="Ex: Centro" {...field} disabled={isSubmitting}/></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço (Opcional)</FormLabel>
                <FormControl><Input placeholder="Ex: Rua das Flores, 123" {...field} disabled={isSubmitting}/></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : (modoEdicao ? 'Atualizar Aluno' : 'Salvar Aluno')}
          </Button>
        </div>
      </form>
    </Form>
  );
}