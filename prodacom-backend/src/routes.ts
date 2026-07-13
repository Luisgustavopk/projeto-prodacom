import { Router } from 'express';
import { verificarCodigo } from './controllers/adminController';
import { limitadorCodigo } from './middlewares/rateLimiter';

const routes = Router();

//AdminController
routes.post('/api/verificar-codigo', limitadorCodigo, verificarCodigo);


export default routes;