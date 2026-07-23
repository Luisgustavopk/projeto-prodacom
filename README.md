# 🌐 Ecossistema Digital - Prodacom

Este repositório centraliza a nova presença digital e a infraestrutura de suporte da **Prodacom**, especialista em soluções de controle de ponto e acesso. O projeto foi arquitetado em um modelo modular para separar de forma inteligente a experiência institucional do cliente corporativo, a operação interna da equipe comercial e a inteligência de dados no servidor.

## 🏛️ Componentes da Solução

* **`prodacom-web` (Plataforma Institucional)**
  O produto principal voltado ao público B2B. Desenvolvido não apenas para apresentar o catálogo de soluções (Relógios de Ponto, Catracas, Controle de Acesso e Softwares), mas também para gerar conversões. Conta com um sistema fluido de solicitação de orçamentos diretos e um *widget* de chat integrado de forma nativa para que os visitantes iniciem o contato imediato.

* **`prodacom-admin-chat` (Painel de Atendimento)**
  Painel de controle restrito para os operadores internos da Prodacom. Com uma interface focada em produtividade, permite gerenciar a fila de atendimentos em tempo real, identificar rapidamente os clientes (por ID e Telefone) e centralizar todo o histórico de conversas, garantindo um suporte ágil e humanizado.

* **`prodacom-backend` (API & WebSockets)**
  O coração de microsserviços que sustenta a operação. Desenvolvido em Node.js com TypeScript, desempenha um papel duplo: orquestra a comunicação bidirecional de dados em tempo real para o chat (via Socket.io) e gerencia o processamento e envio seguro das solicitações de orçamento por e-mail, consolidando o histórico de dados na nuvem através do MongoDB Atlas.

## 🛠️ Stack Tecnológica

* **Frontend (Web & Admin):** React, Vite, Framer Motion (animações), Tailwind CSS v4.
* **Backend:** Node.js, TypeScript, Express, Socket.io (WebSockets), Nodemailer.
* **Banco de Dados & Infra:** MongoDB (Mongoose).

---
💼 *Solução desenvolvida sob medida para a modernização dos canais de vendas, atendimento e comunicação institucional da Prodacom.*
