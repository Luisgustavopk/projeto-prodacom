// src/components/TelaBloqueio.jsx
import React, { useState } from 'react';
import { apiService } from '../services/api';
import logoProdacom from '../assets/images/logo-prodacom-6.jpg';

export function TelaBloqueio(props) {
  const [codigoInput, setCodigoInput] = useState('');
  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);
    setErro(false);

  
    const resultado = await apiService.efetuarLoginAdmin(codigoInput);

    if (resultado.sucesso) {
      props.onAutorizado(true);
    } else {
      setErro(true);
      setMensagemErro(resultado.mensagem);
    }

    setCarregando(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian text-ghost p-4 font-display">
      <div className="w-full max-w-md bg-[#161920] p-8 rounded-xl border border-slate_mist/10 shadow-2xl">
        <div className="text-center mb-6">
          <img 
            src={logoProdacom} 
            alt="Logo Prodacom" 
            className="mx-auto h-16 w-auto object-contain invert mix-blend-screen opacity-90" 
        />
          <p className="text-sm text-slate_mist/60 mt-1">Painel Restrito de Atendimento</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate_mist/40 font-semibold mb-2">
              Código de Acesso
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={codigoInput}
              disabled={carregando}
              onChange={function(e) { 
                setCodigoInput(e.target.value); setErro(false); }}
              className="w-full bg-obsidian border border-slate_mist/20 rounded-lg px-4 py-3 text-center text-lg tracking-widest text-ghost focus:outline-none focus:border-cobalt transition-colors disabled:opacity-50"
            />
          </div>

          {erro && (
            <p className="text-red-500 text-xs text-center font-medium animate-pulse">
               {mensagemErro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-cobalt hover:bg-cobalt/90 text-ghost font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {carregando ? 'Verificando...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}