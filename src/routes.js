import express from 'express';

import CardController  from './controllers/CardController.js';

const routes = new express.Router();

// POST / GET / PUT / DELETE
routes.get('/clients', CardController.index);
routes.get('/client/:id', CardController.show);
routes.get('/client_limit/:id', CardController.getLimite);
routes.get('/client_fatura/:id', CardController.getFatura);
routes.get('/client_saldo/:id', CardController.getSaldo);

routes.post('/create_client', CardController.create);

routes.put('/update_client/:id', CardController.update);

routes.delete('/delete_client/:id', CardController.destroy);


export default routes;