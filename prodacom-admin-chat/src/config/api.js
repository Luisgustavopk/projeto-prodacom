const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://api.prodacom.com.br' // Sua futura URL de produção
  : 'http://localhost:3001';

export default API_URL;