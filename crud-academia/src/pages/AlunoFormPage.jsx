import { AlunoForm } from "@/components/forms/AlunoForm";

export function AlunoFormPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Cadastrar Novo Aluno</h1>
      <p className="text-muted-foreground mb-8">Preencha os campos abaixo para registrar um novo aluno.</p>
      <AlunoForm />
    </div>
  );
}