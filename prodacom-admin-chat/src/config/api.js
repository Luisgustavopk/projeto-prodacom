const API_URL = import.meta.env.MODE === 'production' 
  ? 'http://localhost:3001' // Sua futura URL de produção
  : 'http://localhost:3001';

export default API_URL;