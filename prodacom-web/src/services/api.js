const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'http://localhost:3001/api';

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  // Configurações padrão mescladas com as opções específicas da chamada
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // Se o backend retornar status de erro ou { sucesso: false }
    if (!response.ok || data.sucesso === false) {
      throw new Error(data.mensagem || "Ocorreu um erro na comunicação com o servidor.");
    }

    return data;
  } catch (error) {
    console.error(`[API Fetch Error] - Endpoint: ${endpoint} | Motivo: ${error.message}`);
    throw error; // Repassa o erro para o componente que chamou
  }
}

/**
 * Objeto central com todos os serviços da API.
 * Utilizando a sintaxe clássica de funções (sem arrow functions).
 */
export const api = {
  
  async enviarOrcamento(dadosFormulario) {
    return request("/enviar-orcamento", {
      method: "POST",
      body: JSON.stringify(dadosFormulario),
    });
  },


};