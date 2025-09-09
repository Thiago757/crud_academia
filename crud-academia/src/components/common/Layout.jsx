import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Layout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <header className="p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Academia System
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/">Agenda</Link>
            <Link to="/alunos">Alunos</Link>
            <Button asChild>
              <Link to="/alunos/novo">Novo Aluno</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}