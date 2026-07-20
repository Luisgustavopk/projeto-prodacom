import { Router } from 'express';
import { verificarCodigo } from './controllers/adminController';
import { enviarOrcamento } from './controllers/emailController';
import { limitadorCodigo, limitadorEmail } from './middlewares/rateLimiter';

const routes = Router();

//AdminController
routes.post('/api/verificar-codigo', limitadorCodigo, verificarCodigo);

//Orçamentos - email
routes.post('/api/enviar-orcamento', limitadorEmail, enviarOrcamento);

export default routes;