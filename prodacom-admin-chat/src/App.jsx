// src/App.jsx
import React, { useState } from 'react';
import { TelaBloqueio } from './components/TelaBloqueio';
import { PainelDeAtendimento } from './components/PainelDeAtendimento';

export default function App() {
  const [autorizado, setAutorizado] = useState(
    localStorage.getItem('prodacom_admin_autenticado') === 'true'
  );

  if (!autorizado) {
    return <TelaBloqueio onAutorizado={setAutorizado} />;
  }

  return <PainelDeAtendimento />;
}