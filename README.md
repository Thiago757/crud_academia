# Sistema de Agendamento de Academia - Desafio Front-End Junior

Este projeto é a implementação de um desafio técnico para uma vaga de Front-End, focado na construção de uma interface performática e escalável para o sistema de agendamento de uma rede de academias. A aplicação foi desenvolvida com ênfase na experiência do usuário em dispositivos móveis (85% do público-alvo) e na capacidade de lidar com grandes volumes de dados.

## ✨ Features Implementadas

### Gestão de Alunos (CRUD Completo)
-   **Listagem de Alunos:** Visualização de todos os alunos cadastrados.
-   **Cadastro e Edição:** Formulário completo para criar e atualizar dados dos alunos.
-   **Validação de Formulário:** Validação robusta e segura utilizando Zod.
-   **Status Ativo/Inativo (Soft Delete):** Em vez de excluir, os alunos podem ser inativados, preservando o histórico de dados — uma abordagem alinhada a sistemas reais.
-   **Persistência de Dados:** Todos os dados dos alunos são salvos localmente no navegador (`localStorage`), simulando um banco de dados e persistindo entre sessões.

### Gestão de Aulas e Agenda
-   **Listagem de Aulas:** A tela principal da aplicação, apresentando as aulas em formato de cards informativos.
-   **Otimização de Performance:** A lista de aulas é renderizada usando **virtualização de lista** (`@tanstack/react-virtual`), garantindo uma rolagem fluida e performática mesmo com milhares de registros.
-   **Cadastro de Aulas:** Formulário para criação de novas aulas com campos para descrição, tipo, data/hora, capacidade e regras de negócio.
-   **Modal de Detalhes da Aula:**
    -   Visualização detalhada das informações da aula.
    -   Gerenciamento de participantes em tempo real (adicionar e remover).
    -   Funcionalidade para "Finalizar" uma aula, alterando seu status.
-   **Regras de Negócio no Front-End:**
    -   Validação de capacidade máxima.
    -   Bloqueio de ações em aulas já finalizadas.
    -   Regra para agendamentos após o início da aula.
-   **Persistência de Dados:** As aulas também são salvas no `localStorage`.

## 🚀 Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React.js** | Biblioteca principal para a construção da interface. |
| **Vite** | Ferramenta de build moderna e de alta performance. |
| **Zustand** | Gerenciador de estado global, leve e sem boilerplate. |
| **Tailwind CSS** | Framework CSS Utility-First para estilização rápida e responsiva. |
| **Shadcn/UI** | Biblioteca de componentes acessíveis e customizáveis. |
| **React Hook Form** | Gerenciamento de formulários performático e eficiente. |
| **Zod** | Validação de schemas de dados. |
| **TanStack Virtual**| Implementação da virtualização de lista para performance. |
| **Lucide React** | Biblioteca de ícones. |

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Thiago757/crud_academia
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-da-pasta-do-projeto
    ```

3.  **Instale as dependências:**
    *(Recomendado usar pnpm, mas funciona com npm)*
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Abra a aporta indicada no seu navegador para ver a aplicação.

---
_Projeto desenvolvido por Thiago Silveira Mazuco como parte de um processo seletivo._