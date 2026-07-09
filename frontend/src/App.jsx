import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminChat from './pages/AdminChat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A Rota Principal: Quando o cliente acessar prodacom.com.br/ */}
        <Route path="/" element={<Home />} />

        {/* A Rota do Painel: Quando o vendedor acessar prodacom.com.br/admin */}
        <Route path="/admin" element={<AdminChat />} />

        {/* Bônus: Rota de Erro (Opcional, para links quebrados) */}
        <Route path="*" element={<div className="h-screen flex items-center justify-center text-xl">Página não encontrada 😕</div>} />
      </Routes>
    </BrowserRouter>
  );
}