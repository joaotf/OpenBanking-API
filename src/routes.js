import express from 'express';

import auth from './middlewares/auth.js';
import CardController  from './controllers/CardController.js';

const routes = new express.Router();

// Criação de Usuário
routes.post('/create_client', CardController.create);
// Autenticação
routes.post('/auth', CardController.auth);
// Middleware (Autenticação)
routes.use(auth);
// POST / GET / PUT / DELETE
routes.get('/clients', CardController.index);
routes.get('/client/:id', CardController.show);
routes.get('/client_limit/:id', CardController.getLimite);
routes.get('/client_fatura/:id', CardController.getFatura);
routes.get('/client_saldo/:id', CardController.getSaldo);


routes.put('/update_client/:id', CardController.update);

routes.delete('/delete_client/:id', CardController.destroy);


export default routes;