import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A Rota Principal: Quando o cliente acessar prodacom.com.br/ */}
        <Route path="/" element={<Home />} />

        {/* Bônus: Rota de Erro (Opcional, para links quebrados) */}
        <Route path="*" element={<div className="h-screen flex items-center justify-center text-xl">Página não encontrada 😕</div>} />
      </Routes>
    </BrowserRouter>
  );
}