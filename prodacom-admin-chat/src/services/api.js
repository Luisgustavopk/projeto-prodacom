// const API_URL = import.meta.env.VITE_API_URL 
//   ? `${import.meta.env.VITE_API_URL}/api` 
//   : 'http://localhost:3001/api';
const API_URL =  'http://localhost:3001/api'; 
async function efetuarLoginAdmin(codigo) {
  try {
    const resposta = await fetch(`${API_URL}/verificar-codigo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: codigo })
    });

    const dados = await resposta.json();

    // Se a resposta for OK (status 200) e o backend autorizou
    if (resposta.ok && dados.autorizado) {
      localStorage.setItem('prodacom_admin_autenticado', 'true');
      return { sucesso: true };
    }

    // Se o backend recusou (status 401 ou 400), devolve a mensagem dele
    return { 
      sucesso: false, 
      mensagem: dados.mensagem || 'Código incorreto, por favor tente novamente.' 
    };

  } catch (error) {
    console.error(" Erro na requisição de login:", error);
    return { 
      sucesso: false, 
      mensagem: 'Servidor indisponível. Tente novamente mais tarde.' 
    };
  }
}

export const apiService = {
  efetuarLoginAdmin
};