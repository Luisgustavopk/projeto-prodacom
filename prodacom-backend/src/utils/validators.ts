export function validarDadosOrcamento(dados: any) {
  const erros = [];

 
  if (!dados.nome || !dados.email || !dados.mensagem) {
    erros.push("Campos obrigatórios (Nome, E-mail e Mensagem) em falta.");
  }

 
  if (dados.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados.email)) {
      erros.push("O formato do e-mail fornecido é inválido.");
    }
  }

  if (dados.telefone) {
    const telefoneRegex = /^\(?\d{2}\)?\s?(9?\d{4})[-.\s]?(\d{4})$/;
    const apenasNumeros = dados.telefone.replace(/\D/g, ''); 
    
    if (!telefoneRegex.test(dados.telefone) || apenasNumeros.length < 10 || apenasNumeros.length > 11) {
      erros.push("O telefone deve ser válido e conter o DDD (ex: (31) 99999-9999).");
    }
  }

  return erros;
}