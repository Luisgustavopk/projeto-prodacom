import React from "react";
import NavBar from "../components/prodacom/NavBar";
import Footer from "../components/prodacom/Footer";
import ChatWidget from "../components/prodacom/ChatWidget";

export function SiteLayout(props) {
  return (
    <div className="min-h-screen bg-ghost flex flex-col justify-between">
      {/* 1. Topo fixo do site */}
      <NavBar onNavigateHome={props.onNavigateHome} />

      {/* 2. Conteúdo dinâmico da página atual */}
      <main className="flex-grow">
        {props.children}
      </main>

      {/* 3. Chat flutuante nativo */}
      <ChatWidget />

      {/* 4. Rodapé fixo */}
      <Footer />
    </div>
  );
}