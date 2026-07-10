#  Ecossistema Digital - Prodacom

Este repositório centraliza a presença digital e as ferramentas de suporte da **Prodacom**. O projeto foi arquitetado em um modelo de Monorepo para separar de forma inteligente a experiência institucional do usuário, a operação interna da equipe e a inteligência de dados.

## 🏛️Componentes da Solução

* **`prodacom-web` (Website Institucional)** O produto principal voltado ao público. Desenvolvido para apresentar a empresa, seus serviços, portfólio e posicionamento de mercado. Conta com uma ferramenta de chat integrada de forma nativa para que os visitantes iniciem contato direto com o suporte.

* **`prodacom-admin-chat` (Painel de Atendimento)** Uma SPA (Single Page Application) exclusiva para os operadores internos da Prodacom. Permite gerenciar a fila de atendimentos, centralizar o histórico e responder aos clientes em tempo real através de uma interface otimizada de alta performance.

* **`prodacom-backend` (Engine em Tempo Real)** O coração de microsserviço que sustenta a operação. Desenvolvido em Node.js com TypeScript e WebSockets (Socket.io), ele orquestra a comunicação bidirecional de dados em tempo real e consolida de forma inteligente o histórico de conversas em nuvem com o MongoDB Atlas.

## 🛠️ Stack Tecnológica

* **Frontend:** React (Componentização), Vite (Build rápido), Tailwind CSS v4 (Estilização baseada em tokens utilitários).
* **Backend & Banco:** Node.js, TypeScript, Express, Socket.io (Mensageria), Mongoose (Persistência assíncrona).

---
💼 *Solução desenvolvida sob medida para a modernização dos canais de atendimento e comunicação institucional da Prodacom.*
